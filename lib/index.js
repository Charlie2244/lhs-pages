const { src, dest, parallel, series, watch } = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const del = require('del');
const plugins = loadPlugins();
const browserSync = require('browser-sync');
const bs = browserSync.create();
const cwd = process.cwd();
let config = {
  // default config
  build: {
    src: 'src',
    dist: 'dist',
    temp: 'dists',
    public: 'public',
    paths: {
      styles: 'assets/styles/*.scss',
      scripts: 'assets/scripts/*.js',
      pages: ['*.html', '**/*.html'],
      images: 'assets/images/**',
      fonts: 'assets/fonts/**',
    },
  },
};
try {
  const basicConfig = require(`${cwd}/config.gulp.js`);
  config = Object.assign({}, config, basicConfig);
} catch (e) {}
// 实现这个项目的构建任务
// 获取资源存放路径
const {
  build: {
    src: srcs,
    dist: dists,
    temp: temps,
    public: publics,
    paths: { styles, scripts, pages, images, fonts },
  },
} = config;
const clean = () => {
  return del([dists, temps]);
};
const image = () => {
  return (
    src(images, { base: srcs, cwd: srcs })
      // gulp-imagemin 8.0用不来了, 改成了 7.1
      .pipe(plugins.imagemin())
      .pipe(dest(dists))
      .pipe(bs.reload({ stream: true }))
  );
};
const page = () => {
  return (
    src(pages, { base: srcs, cwd: srcs })
      // swig 转译模版引擎
      .pipe(plugins.swig({ data: config.data }))
      .pipe(dest(temps))
      .pipe(bs.reload({ stream: true }))
  );
};
const font = () => {
  return (
    src(fonts, { base: srcs, cwd: srcs })
      // gulp-imagemin 8.0用不来了, 改成了 7.1
      .pipe(plugins.imagemin())
      .pipe(dest(dists))
  );
};
const style = () => {
  return (
    // base: 可以保存 编译过后文件夹结构还是一致的, cwd: 生成绝对路径
    src(styles, { base: srcs, cwd: srcs })
      .pipe(plugins.sass(require('sass'))())
      .pipe(dest(temps))
      .pipe(bs.reload({ stream: true })) // 文件改变 后会重新刷新浏览器
  );
};
const extra = () => {
  return src('**', { base: publics, cwd: publics }).pipe(dest(temps));
};
const script = () => {
  return src(scripts, { base: srcs, cwd: srcs })
    .pipe(plugins.babel({ presets: [require('@babel/preset-env')] }))
    .pipe(dest(temps));
};
const serve = () => {
  watch(styles, { cwd: srcs }, style); // 监听到文件变化重新编译
  watch(scripts, { cwd: srcs }, script);
  watch(pages, { cwd: srcs }, page);
  // watch(fonts, { cwd: srcs }, font);
  // watch(images, { cwd: srcs }, image);
  // watch(publics, { cwd: srcs }, extra);
  // 监听静态资源变化重新加载
  watch([fonts, images, publics], bs.reload);
  bs.init({
    notify: false,
    port: 2080,
    open: false,
    // files: 'dist/**',
    server: {
      baseDir: [temps, srcs, publics, dists],
      // 考虑到 node_modules不在 dist里面, 用这种方式可以加载
      routes: {
        '/node_modules': 'node_modules',
      },
    },
  });
};
// 在 html 中 的一些注释, 包的引用转换
const useref = () => {
  return (
    src(pages, { base: temps, cwd: temps })
      // 在 dist 目录找 html,
      .pipe(plugins.useref({ searchPath: [dists, '.'] }))
      // html js css
      .pipe(plugins.if(/\.js$/, plugins.uglify())) // 压缩 js
      .pipe(plugins.if(/\.css$/, plugins.cleanCss())) // 压缩 css
      .pipe(
        plugins.if(
          /\.html$/,
          plugins.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
          })
        )
      ) // 压缩 html
      .pipe(dest(dists))
  );
};
const compile = parallel(style, page, script);
const develop = series(compile, serve);
const build = series(
  clean,
  parallel(series(compile, useref), extra, font, image)
);
module.exports = { build, clean, develop };
