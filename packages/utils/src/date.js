let fmt = {
    /**
     * 格式化日期
     * @param {any} date
     * @param {string} [format='yyyy-MM-dd hh:mm:ss']
     * @returns
     */
    date(date, format) {
        if (!date) {
            return date
        } else if (date instanceof Date) {
            return fmt.dateFormat(date, format)
        } else if (/^\d+$/.test(date)) {
            // java格式的timestamp
            return fmt.dateFormat(new Date(date), format)
        } else if (typeof date === 'object' && date.time) {
            // java格式的日期object
            return fmt.dateFormat(new Date(date.time), format)
        } else if ((/date/i).test(date)) {
            // .net格式的timestamp
            return fmt.dateFormat(new Date(date.match(/\d+/)[0]), format)
        } else if (date && typeof date === 'string' && /\.\d$/.test(date)) {
            // mysql字符串格式转化
            return fmt.dateFormat(new Date(date.replace(/\.\d$/, '').replace(/-/g, '/')), format)
        }
        return date
    },
    /**
     * 格式化日期
     * @param {any} date
     * @param {any} format
     * @returns
     */
    dateFormat(date, format) {
        let o = {
            'M+': date.getMonth() + 1, // month
            'd+': date.getDate(), // day
            'h+': date.getHours(), // hour
            'm+': date.getMinutes(), // minute
            's+': date.getSeconds(), // second
            'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
            'S': date.getMilliseconds() // millisecond
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length === 1 ?
                    o[k] :
                    ('00' + o[k]).substr(('' + o[k]).length))
            }
        }
        return format
    },
    /**
     * 取对象的值
     * @param {any} obj
     * @param {any} key
     * @param {any} defaultValue
     * @returns
     */
    value(key, obj, defaultValue) {
        if (defaultValue == null) {
            defaultValue = ''
        }
        if (typeof key === 'object') {
            key = arguments[1]
            obj = arguments[0]
        }
        obj = obj || {}
        var value = obj[key]
        return value == null ? defaultValue : value
    },
    /**
     * 取对象深层属性的值
     * @param {any} propStr
     * @param {any} obj
     * @param {string} [defaultValue='']
     * @returns
     */
    prop(propStr, obj, defaultValue = '') {
        if (typeof propStr !== 'string') {
            propStr = arguments[1]
            obj = arguments[0]
        }
        let props = propStr.split('.')
        let target = obj || {}
        for (let i = 0, l = props.length; i < l; i++) {
            if ((target = target[props[i]]) == null) {
                return defaultValue
            }
        }
        return target
    }
}

export default fmt