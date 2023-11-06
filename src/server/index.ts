import { router } from "./trpc";
import { usersService } from './services/users';

export const appRouter = router({ 
  ...usersService 
});

export type AppRouter = typeof appRouter;