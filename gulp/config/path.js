// Получаем имя папки проэкта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist',
      srcFolder = './src';

export const path = {
  build: {
    fonts: `${buildFolder}/fonts/`,
    html:  `${buildFolder}/`,
    scss:  `${buildFolder}/css/`,
    js:    `${buildFolder}/js/`,
    images:`${buildFolder}/img/`,
  },

  src: {
    fonts: `${srcFolder}/fonts/**/*.*`,
    html:  `${srcFolder}/*.html`,
    scss:  `${srcFolder}/+(sass|scss)/*.+(scss|sass)`,
    js:    `${srcFolder}/js/*.js`,
    images:`${srcFolder}/img/**/*.{jpg,jpeg,gif,png,webp}`,
    svg:   `${srcFolder}/img/**/*.svg`,
  },

  watch: {
    fonts: `${srcFolder}/fonts/**/*.*`,
    html:  `${srcFolder}/**/*.html`,
    scss:  `${srcFolder}/+(sass|scss)/**/*.+(scss|sass|css)`,
    js:    `${srcFolder}/js/**/*.js`,
    images:`${srcFolder}/img/**/*.{jpg,jpeg,gif,png,ico,svg,webp}`,
  },

  clean: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: '',
};