import { AxiosError } from 'axios';
import type { AxiosInstance } from 'axios';
import qs from 'qs';
import type { infer as ZodInfer } from 'zod';
import { z } from 'zod';

import { StrapiOrAxiosError } from '../error';
import { router, publicProcedure } from '../trpc';

const blogPostScheme = z.object({
	attributes: z.object({
		title: z.string(),
		content: z.string(),
		createdAt: z.string(),
		updatedAt: z.string(),
		publishedAt: z.string(),
		short: z.string(),
		slug: z.string(),
	}),
});

const blogPostsDataScheme = z.object({
	data: z.array(blogPostScheme),
});

export const getBlogPosts = async ({ axios }: { axios: AxiosInstance }) => {
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

		const res = await axios.get(`/blog-posts?${query}`);
		data = res.data;
	} catch (error: unknown) {
		if (!(error instanceof AxiosError))
			throw new Error('Unknown error');

		const errInfo: Partial<Pick<AxiosError, 'status'>> & { isAxiosError: true; message: string; data: unknown } = {
			message: error.message,
			isAxiosError: true,
			data: error.response?.data ?? null,
		};

		if (error.status) errInfo.status = error.status;

		throw new StrapiOrAxiosError(errInfo);
	}

	try {
		const dataBlogPostsAsAnyScheme = z.object({
			data: z.array(z.any()),
		});
		type DataBlogPostsAsAny = ZodInfer<typeof dataBlogPostsAsAnyScheme>;

		dataBlogPostsAsAnyScheme.parse(data);

		(data as DataBlogPostsAsAny).data = (data as DataBlogPostsAsAny).data.filter((project: unknown) => (
			blogPostScheme.safeParse(project).success
		));

		blogPostsDataScheme.parse(data);
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

	return data as ZodInfer<typeof blogPostsDataScheme>;
};

export const blogPostsRouter = router({
	getAll: publicProcedure
		.query(async ({ ctx }) => {
			let data: ZodInfer<typeof blogPostsDataScheme> | null = null;

			try {
				data = await getBlogPosts({ axios: ctx.axios });
				return data;
			} catch (error) {
				console.error(error);
				return {
					data: [],
				};
			}
		}),
	getBySlug: publicProcedure
		.input(z.object({ slug: z.string() }))
		.query(async ({ input, ctx }) => {
			let data: ZodInfer<typeof blogPostScheme> | null = null;

			try {
				const query = qs.stringify(
					{
						'filters[slug]': input.slug,
						populate: '*',
					},
					{
						encodeValuesOnly: true,
					}
				);

				console.log('query', query);

				const res = await ctx.axios.get(`/blog-posts?${query}`);
				data = res.data.data[0];
				return data;
			}

			catch (error: unknown) {
				if (!(error instanceof AxiosError))
					throw new Error('Unknown error');

				const errInfo: Partial<Pick<AxiosError, 'status'>> & { isAxiosError: true; message: string; data: unknown } = {
					message: error.message,
					isAxiosError: true,
					data: error.response?.data ?? null,
				};

				if (error.status) errInfo.status = error.status;

				throw new StrapiOrAxiosError(errInfo);
			}
		}),
});
