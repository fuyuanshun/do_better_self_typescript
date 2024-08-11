const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:"./src/index.ts",
    output:{
        //当前目录下的dist目录. 
        path: path.resolve(__dirname, "dist"),
        filename:'index.js'
    },
    module:{
        rules:[
            {
                //正则表达式，对哪些文件生效
                test:/\.css$/,
                //loader执行顺序从下到上
                //①通过css-loader，将css编译到js中
                //②通过style-loader，创建style标签将css添加到js中
                use:['style-loader','css-loader']
            },
            {
                test:/\.s[ac]ss$/,
                use:['style-loader','css-loader', 'sass-loader']
            },
            {
                test:/\.ts$/,
                use:['ts-loader']
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            //还需要在html中添加 <title><%= htmlWebpackPlugin.options.title %></title> 才可使标题生效
            title:"主页",
            //打包的文件名
            filename:"index.html",
            //模板
            template:"./src/index.html",
        })
    ],
    devServer:{
        host:"localhost",
        port:3000,
        //是否自动打开浏览器
        open:true
    },
    mode:"development"
}