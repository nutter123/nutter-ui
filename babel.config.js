module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": false // Babel 会在 Rollup 有机会做处理之前，将我们的模块转成 CommonJS，导致 Rollup 的一些处理失败。
                // "useBuiltIns": "usage",
                // "corejs": "2.6.10",
                // "targets": {
                //   "ie": 10
                // }
            }
        ]
    ],
    "plugins": [
        [
            "module-resolver",
            {
                "root": ["packages/"]
            }
        ],
        // 解决多个地方使用相同代码导致打包重复的问题
        ["@babel/plugin-transform-runtime"],
        ["import",//解决按需引入
            {
                // 组件库的名字,可以根据你发布的库的package.json的name自行更改
                "libraryName": "nutterUi",

                // 默认打包是lib,不用更改
                "libraryDirectory": "dist",

                // 如果有样式文件,因为打包后样式统一放在/lib/theme下,所以需要稍微转换下
                // "style": (name, file) => {
                //     const libDirIndex = name.lastIndexOf("/")
                //     const libDir = name.substring(0, libDirIndex)
                //     const fileName = name.substr(libDirIndex + 1)
                //     return `${libDir}/${fileName}.css`;
                // }
            }
        ]
    ],
    "ignore": [
        "node_modules/**"
    ]
}