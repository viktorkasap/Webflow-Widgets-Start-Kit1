import fs from 'fs';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

import tsconfigPaths from 'vite-tsconfig-paths';
import cssInjectedByJs from 'vite-plugin-css-injected-by-js';

const env = loadEnv('development', process.cwd(), '');

// Minimize output code and impacts on the wrapToIIFE function
const isDevMode = process.env.NODE_ENV === 'development';
const wrapToIIFE = (isDevMode: boolean) => {
  return {
    // Wrapped into IIFE format - `(() => {})()`
    // Source: https://stackoverflow.com/a/74367415
    name: 'wrap-in-iife',
    generateBundle(_outputOptions: any, bundle: { [x: string]: any }) {
      Object.keys(bundle).forEach((fileName) => {
        const file = bundle[fileName];

        // 1) Exclude lib files (fileName: 'lib/swiper')
        // 2) Exclude index.js
        const isNotExcludedFiles = !fileName.startsWith('lib') && fileName !== 'index.js';

        if (isNotExcludedFiles && fileName.slice(-3) === '.js' && 'code' in file) {
          // 1) Split import parts from code
          let imports = [];
          if (isDevMode) {
            imports = file.code.match(/import\s*{.*?}\s*from\s*['"].*?['"];/gm) || [];
          } else {
            imports = file.code.match(/^import .*;$/gm) || [];
          }

          // 2) Remove all imports from code
          let codeWithoutImports = '';
          if (isDevMode) {
            codeWithoutImports = file.code.replaceAll(/import\s*{.*?}\s*from\s*['"].*?['"];/g, '');
          } else {
            codeWithoutImports = file.code.replaceAll(/\n?^import .*;$/gm, '');
          }

          // 3) Wrapping code into IIFE format
          const wrappedCode = `(function (){${codeWithoutImports}})();`;
          // 4) Add all imports + rest of code
          file.code = imports.join('\n') + '\n' + wrappedCode;
        }
      });
    },
  };
};

function getInputEntries(baseDir: string) {
  const widgetDir = path.resolve(__dirname, baseDir);
  const widgetFolders = fs
    .readdirSync(widgetDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const inputEntries: { [key: string]: string } = {};
  widgetFolders.forEach((folder) => {
    const entryPath = path.resolve(widgetDir, `${folder}/index.ts`);
    if (fs.existsSync(entryPath)) {
      inputEntries[folder] = entryPath;
    }
  });

  return inputEntries;
}

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    // Insert styles within index.js
    // Then adds styles inside <head></head>
    cssInjectedByJs({
      jsAssetsFilterFunction: (outputChunk) => {
        return outputChunk.fileName == 'index.js';
      },
    }),
  ],
  server: {
    open: true,
    proxy: {
      '^(?!/src/|/@vite/|/node_modules/)': {
        target: env.VITE_DEV_WEBFLOW_SITE_URL,
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\//, '');
        },
      },
    },
  },
  build: {
    minify: !isDevMode,
    cssCodeSplit: false,
    manifest: 'manifest.json',
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'src/index.ts'),
        features: path.resolve(__dirname, 'src/features/index.ts'),
        ...getInputEntries('src/widgets'),
      },
      output: {
        preserveModules: false,
        entryFileNames: '[name].js',
        chunkFileNames: 'lib/[hash].js',
        assetFileNames: '[name].[ext]',
      },
      plugins: [
        // Experimental
        wrapToIIFE(!isDevMode),
      ],
    },
  },
});
