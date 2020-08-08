import babel from '@rollup/plugin-babel';
import pkg from './package.json';

const extensions = [
  '.ts',
];

export default {
  input: './src/index.ts',
  plugins: [
    babel({
      extensions,
      babelHelpers: 'bundled',
      include: ['src/**/*'],
    }),
  ],
  output: [{
    file: pkg.main,
    format: 'esm',
  }],
};
