//文件操作
export const requireContentFolderObj = (r, exinclude) => {
    let contents = {}
    const paths = r.keys().filter((p) => {
        return exinclude.indexOf(p) == -1
    })
    for (let path of paths) {
        let pArray = path.split('/').slice(1),
            l = pArray.length,
            fn = r(path).default || r(path),
            utilObj = contents
        pArray[l - 1] = pArray[l - 1].match(/(\w+-?\w+).js$/)[1]

        for (let i = 0; i < l; i++) {
            let p = pArray[i]
            if (i < l - 1) {
                if (!contents[p]) {
                    contents[p] = {}
                }
                utilObj = contents[p]
            } else if (i == l - 1) {
                utilObj[p] = fn
            }
        }
    }
    return contents
}