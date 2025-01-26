import { config as configEnv } from 'dotenv';

//don't use it if code will be invoked by front end. e.g. handlers.ts -> browser.ts(which will be used by src/standalone-mock.ts)
//only use it in unit test scenarios for convienance. e.g. __tests__/components/dashboard/DashboardConfig.spec.tsx
export const env_config = configEnv({ path: './.env.standalonemock' }).parsed;
