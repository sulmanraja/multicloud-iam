export const appConfig = {
  appName: "RoleLens",
  demoMode: process.env.NEXT_PUBLIC_DEMO_MODE !== "false",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"
};
