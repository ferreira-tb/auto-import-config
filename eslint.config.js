import config from '@tb-dev/eslint-config';

export default config({
  project: ['./tsconfig.json'],
  overrides: {
    typescript: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
});
