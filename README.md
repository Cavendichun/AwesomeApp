1.确保安装cpm
2.执行顺序
    (1) npm install  首次
    (2) npm run pre-build  首次
    (3) npm start
    (4) npm run app

3.项目结构：
    {
        preBuild {  //预构建目录
            dist //页面打包成静态文件后自动放到这个文件夹
            packaged  //打包成可执行文件的输出目录
            packager.js  //执行打包时要用到的electron配置（更改根目录的electron.js需要同时更改这个文件）
        }
        src {
            Components {   //这个文件夹放所有的高度复用的组件
                //每个组件一个文件夹，包含自己的js文件和样式文件
            }
            Pages {
                components {   //这个文件夹放页面布局层级的组件（只在一个地方使用，如侧边栏，状态栏）
                    //每个组件一个文件夹，包含自己的js文件和样式文件
                }
                ... {
                    //每个静态页面一个组件，包含自己的js文件和样式文件
                }
            }
            Styles { //这个文件夹放全局样式，和图片等样式资源
                //结构自定
            }
            Util {  //这个页面放公用方法，如网络请求，全局提示等
                // 结构自定
            }
            Lib {  //放一些第三方的库
                // 结构自定
            }
            Static {  //静态文件，安装包，模板文件等
                //结构自定
            }
        }
        webpack {
            webpack.config.dev.js  //开发环境的webpack配置
            webpack.config.dist.js  //打包用到的webpack配置
        }
        .babelrc  //babel转码配置
        config.json  //项目全局配置文件，启动时会读取
        electronEntry.js  //electron入口文件
        index.dist.html  //页面打包时的html模板
        index.html  //开发时的html模板
    }