// craco.config.js
const path = require("path");
const eslintConfig = require("./.eslintrc.js"); // 引入 ESLint 配置文件
module.exports = {
  devServer: {
    // 这里可以配置开发服务器选项
    port: 3000, // 你希望的端口号
  },
  // 其他Craco配置，可以根据需要添加
  eslint: {
    enable: false, // 启用 ESLint
    mode: "extends", // 使用 "extends" 模式
    configure: () => eslintConfig, // 应用外部的 ESLint 配置
  },
  babel: {
    plugins: [
      // 这里可以添加Babel插件配置
    ],
  },
  webpack: {
    alias: {
      // 这里可以添加Webpack别名配置
      "@": path.resolve(__dirname, "src"),
    },
    plugins: [
      // 这里可以添加Webpack插件配置
    ],
    //postcss-loader 是一个处理器(loader)，而不是插件(plugin)
    configure: (webpackConfig, { env, paths }) => {
      // 修改构建输出目录
      paths.appBuild = path.join(path.dirname(paths.appBuild), "dist");
      webpackConfig.output = {
        ...webpackConfig.output,
        path: paths.appBuild,
      };
          // 打印 Webpack 配置，用于调试
          console.log("1---webpackConfig:", webpackConfig);
      // 找到处理 SCSS 的规则，添加 postcss-loader
      const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf);
      console.log("2---oneOfRule:", oneOfRule);
      const scssRule = oneOfRule.oneOf.find(
        (rule) => rule.test &&  rule.test instanceof RegExp && rule.test.test('.scss')
      );
      if (scssRule) {
        console.log("3---scssRule:", scssRule);
 
        scssRule.use.splice(2, 0, {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              config: path.join(__dirname, "postcss.config.js"),
            },
          },
        });
        console.log("4---postcss-loader added to scssRule---",scssRule);
      }else{
        console.error("3---scssRule not found");
      }
      return webpackConfig;
    },
  }

};
