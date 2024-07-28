import { defineConfig } from '@tb-dev/eslint-config';

export default defineConfig({
  project: ['./tsconfig.json'],
  overrides: {
    typescript: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
});
