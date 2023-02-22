import type { AxiosInstance } from 'axios';
import { AxiosError } from 'axios';
import qs from 'qs';
import type { infer as ZodInfer } from 'zod';
import { z } from 'zod';

import type { IsAxiosError } from '../error';
import { StrapiOrAxiosError } from '../error';
import { router, publicProcedure } from '../trpc';

const projectScheme = z.object({
	attributes: z.object({
		title: z.string(),
		tags: z.object({
			data: z.array(z.object({
				attributes: z.object({
					name: z.string(),
					color: z.string(),
				}),
			})),
		}),
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
		links: z.array(z.array(z.string()).length(2)),
		short: z.string(),
	}),
});

const projectsDataScheme = z.object({
	data: z.array(projectScheme),
});

export const getProjects = async ({ axios, query: qsQuery }: { axios: AxiosInstance, query?: any }) => {
	let data: unknown | null = null;

	try {
		const query = qs.stringify(
			{
				populate: '*',
				sort: 'priority:asc',
				...(qsQuery || {}),
			},
			{
				encodeValuesOnly: true,
			}
		);

		const res = await axios.get(`/projects?${query}`);
		console.log('res.data', JSON.stringify(res.data, null, 2));
		console.log('tags', JSON.stringify(res.data.data.map((p: any) => p.attributes.tags), null, 2));
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
				data = await getProjects({
					axios: ctx.axios,
				});
				return data;
			} catch (error) {
				console.error(error);
				return {
					data: [],
				};
			}
		}),
	getBySlugs: publicProcedure
		.input(z.object({
			tags: z.array(z.string()),
		}))
		.mutation(async ({ ctx, input }) => {
			let data: ZodInfer<typeof projectsDataScheme> | null = null;

			try {
				data = await getProjects({
					axios: ctx.axios,
					query: {
						filters: {
							tags: {
								$or: [
									...input.tags.map((tag: string) => ({
										name: {
											$eq: tag,
										},
									})),
								],
							},
						},
					},
				});
				return data;
			} catch (error) {
				console.error(error);
				return {
					data: [],
				};
			}
		}),
});
