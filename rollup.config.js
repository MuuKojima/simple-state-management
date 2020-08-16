import babel from '@rollup/plugin-babel';
import pkg from './package.json';

export default {
  input: './src/index.ts',
  output: [{
    file: pkg.main,
    format: 'esm',
  }],
  plugins: [
    babel({
      extensions: ['.ts'],
      babelHelpers: 'bundled',
      include: ['src/**/*'],
    }),
  ]
};
