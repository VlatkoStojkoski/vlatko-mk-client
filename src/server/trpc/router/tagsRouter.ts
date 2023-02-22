import type { AxiosInstance } from 'axios';
import { AxiosError } from 'axios';
import qs from 'qs';
import type { infer as ZodInfer } from 'zod';
import { z } from 'zod';

import type { IsAxiosError } from '../error';
import { StrapiOrAxiosError } from '../error';
import { router, publicProcedure } from '../trpc';

const tagScheme = z.object({
	attributes: z.object({
		name: z.string(),
		color: z.string(),
	}),
});

const projectsDataScheme = z.object({
	data: z.array(tagScheme),
});

export const getTags = async ({ axios }: { axios: AxiosInstance }) => {
	let data: unknown | null = null;

	try {
		const query = qs.stringify(
			{
				populate: '*',
				sort: 'name:asc',
			},
			{
				encodeValuesOnly: true,
			}
		);

		const res = await axios.get(`/tags?${query}`);
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
		const dataTagsAsAnyScheme = z.object({
			data: z.array(z.any()),
		});
		type DataTagsAsAny = ZodInfer<typeof dataTagsAsAnyScheme>;

		dataTagsAsAnyScheme.parse(data);

		(data as DataTagsAsAny).data = (data as DataTagsAsAny).data.filter((project: unknown) => (
			tagScheme.safeParse(project).success
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

export const tagsRouter = router({
	getAll: publicProcedure
		.query(async ({ ctx }) => {
			let data: ZodInfer<typeof projectsDataScheme> | null = null;

			try {
				data = await getTags({ axios: ctx.axios });
				return data;
			} catch (error) {
				console.error(error);
				return {
					data: [],
				};
			}
		}),
});
