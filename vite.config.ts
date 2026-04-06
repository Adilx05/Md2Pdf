import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const repository =
    (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.GITHUB_REPOSITORY?.split(
      '/'
    )[1];
  const isUserPageRepo = repository?.toLowerCase().endsWith('.github.io');
  const fallbackBase = repository && !isUserPageRepo ? `/${repository}/` : '/';

  return {
    base: env.VITE_BASE_PATH || fallbackBase,
    plugins: [react()]
  };
});
