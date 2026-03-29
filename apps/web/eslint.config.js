import { config } from '@repo/eslint-config/react-internal'

export default [
  ...config,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
]
