import { router } from '../trpc';

import { projectsRouter } from './projectsRouter';

export const appRouter = router({
	projects: projectsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
