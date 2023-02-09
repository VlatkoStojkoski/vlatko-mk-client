import { router } from '../trpc';

import { blogPostsRouter } from './blogRouter';
import { projectsRouter } from './projectsRouter';

export const appRouter = router({
	projects: projectsRouter,
	blogPosts: blogPostsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
