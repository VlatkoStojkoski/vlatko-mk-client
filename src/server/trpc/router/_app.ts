import { router } from '../trpc';

import { blogPostsRouter } from './blogRouter';
import { projectsRouter } from './projectsRouter';
import { tagsRouter } from './tagsRouter';

export const appRouter = router({
	projects: projectsRouter,
	blogPosts: blogPostsRouter,
	tags: tagsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
