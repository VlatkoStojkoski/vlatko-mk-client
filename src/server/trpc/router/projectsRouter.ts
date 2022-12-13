import qs from 'qs';
import { z } from 'zod';

import { router, publicProcedure } from '../trpc';

export const projectsRouter = router({
	getAll: publicProcedure
		.query(async ({ ctx }) => {
			try {
				const query = qs.stringify(
					{
						populate: '*',
					},
					{
						encodeValuesOnly: true,
					}
				);

				const { data } = await ctx.axios.get(`/projects?${query}`);

				return data;
			} catch (error: any) {
				if (error.response) {
					console.log(error.response.data);
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log('Error', error.message);
				}
			}
		}),
	getById: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(({ input, ctx }) => {
			return {
				greeting: 'Hello, World!',
				id: input.id,
			};
		}),
});
