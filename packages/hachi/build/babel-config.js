export const babelClientOpts = {
    presets: [
      '@babel/preset-typescript',
      [
        '@babel/preset-env',
        {
          modules: 'commonjs',
          targets: {
            esmodules: true,
          },
          bugfixes: true,
          loose: true,
          // This is handled by the Next.js webpack config that will run next/babel over the same code.
          exclude: [
            'transform-typeof-symbol',
            'transform-async-to-generator',
            'transform-spread',
          ],
        },
      ],
      ['@babel/preset-react', { useBuiltIns: true }],
    ],
    plugins: [
      // workaround for @taskr/esnext bug replacing `-import` with `-require(`
      // eslint-disable-next-line no-useless-concat
      '@babel/plugin-syntax-dynamic-impor' + 't',
      ['@babel/plugin-proposal-class-properties', { loose: true }],
    ],
    overrides: [
      {
        test: /\.tsx?$/,
        plugins: [require('@babel/plugin-proposal-numeric-separator').default],
      },
    ],
  }
  
export const babelServerOpts = {
    presets: [
      '@babel/preset-typescript',
      ['@babel/preset-react', { useBuiltIns: true }],
      [
        '@babel/preset-env',
        {
          modules: 'commonjs',
          targets: {
            node: '8.3',
          },
          loose: true,
          exclude: [
            'transform-typeof-symbol',
            'transform-async-to-generator',
            'transform-spread',
          ],
        },
      ],
    ],
    plugins: [
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      'babel-plugin-dynamic-import-node',
      ['@babel/plugin-proposal-class-properties', { loose: true }],
    ],

}