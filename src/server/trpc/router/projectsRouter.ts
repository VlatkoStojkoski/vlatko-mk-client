import type { AxiosInstance } from 'axios';
import { AxiosError } from 'axios';
import qs from 'qs';
import type { infer as ZodInfer } from 'zod';
import { z } from 'zod';

import { router, publicProcedure } from '../trpc';

type IsAxiosError = {
	isAxiosError: true;
	status?: number;
}

type IsStrapiError = {
	isStrapiError: true;
	issues?: z.ZodIssue[];
}

class StrapiOrAxiosError extends Error {
	isAxiosError = false;
	isStrapiError = false;
	message = '';
	status = 0;
	data: unknown = null;
	issues: z.ZodIssue[] = [];

	constructor(errorObj: {
		message: string;
		data: unknown;
	} & (IsAxiosError | IsStrapiError)) {
		super(errorObj.message);

		Object.setPrototypeOf(this, StrapiOrAxiosError.prototype);

		this.message = errorObj.message;
		this.data = errorObj.data;

		if ('isAxiosError' in errorObj && errorObj.isAxiosError) {
			this.name = 'AxiosError';
			this.isAxiosError = true;
			if (errorObj.status) this.status = errorObj.status;
			if (errorObj.data) this.data = errorObj.data;
		}

		if ('isStrapiError' in errorObj && errorObj.isStrapiError) {
			this.name = 'StrapiError';
			this.isStrapiError = true;
			this.issues = errorObj.issues ?? [];
		}
	}
}

const projectScheme = z.object({
	attributes: z.object({
		title: z.string(),
		tags: z.string(),
		thumbnail: z.object({
			data: z.object({
				attributes: z.object({
					formats: z.object({
						small: z.object({
							url: z.string(),
						}),
					}),
				}),
			}),
		}),
		blog_post: z.object({
			data: z.object({
				attributes: z.object({
					short: z.string(),
				}),
			}),
		}),
		links: z.string(),
	}),
});

const projectsDataScheme = z.object({
	data: z.array(projectScheme),
});

export const getProjects = async ({ axios }: { axios: AxiosInstance }) => {
	let data: unknown | null = null;

	try {
		const query = qs.stringify(
			{
				populate: '*',
			},
			{
				encodeValuesOnly: true,
			}
		);

		const res = await axios.get(`/projects?${query}`);
		data = res.data;
	} catch (error: unknown) {
		if (!(error instanceof AxiosError))
			throw new Error('Unknown error');

		const errInfo: Partial<Pick<IsAxiosError, 'status'>> & { isAxiosError: true; message: string; data: unknown } = {
			message: error.message,
			isAxiosError: true,
			data: error.response?.data ?? null,
		};

		if (error.status) errInfo.status = error.status;

		throw new StrapiOrAxiosError(errInfo);
	}

	try {
		const dataProjectsAsAnyScheme = z.object({
			data: z.array(z.any()),
		});
		type DataProjectsAsAny = ZodInfer<typeof dataProjectsAsAnyScheme>;

		dataProjectsAsAnyScheme.parse(data);

		(data as DataProjectsAsAny).data = (data as DataProjectsAsAny).data.filter((project: unknown) => (
			projectScheme.safeParse(project).success
		));

		projectsDataScheme.parse(data);
	} catch (err: unknown) {
		if (!(err instanceof z.ZodError))
			throw new Error('Unknown error');

		if (!err.issues.some(issue => issue.code === z.ZodIssueCode.invalid_type))
			throw new Error('Unknown error');

		console.log('err', err.issues.map(issue => issue.path));

		throw new StrapiOrAxiosError({
			message: 'Invalid data from Strapi',
			isStrapiError: true,
			issues: err.issues,
			data,
		});
	}

	return data as ZodInfer<typeof projectsDataScheme>;
};

export const projectsRouter = router({
	getAll: publicProcedure
		.query(async ({ ctx }) => {
			let data: ZodInfer<typeof projectsDataScheme> | null = null;

			try {
				data = await getProjects({ axios: ctx.axios });
				return data;
			} catch (error) {
				console.error(error);
				return {
					data: [],
				};
			}
		}),
	getById: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(({ input }) => {
			return {
				greeting: 'Hello, World!',
				id: input.id,
			};
		}),
});
