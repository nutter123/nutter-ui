/*
 * @Author: nutter
 * @Date: 2020-05-28 11:19:27
 * @LastEditors: nutter
 * @LastEditTime: 2020-08-19 11:14:31
 * @FilePath: \nutter-ui\packages\utils\src\requireContext.js
 */
const flatRequireContext = context => {
  return Object.assign({}, context, context.default || {})
}

/**
 * 将require.context读取的模块数组化
 * @param {*} requireContext require.context()
 * @param {*} excludeObjKeyOrArr 排除的context
 * @param {*} flatContext 展开export default
 */
const requireContext = (requireContext, excludeObjKeyOrArr = [], flatContext = true) => {
  if (!Array.isArray(excludeObjKeyOrArr)) {
    excludeObjKeyOrArr = [excludeObjKeyOrArr]
  }
  return requireContext.keys().filter(key => {
    return excludeObjKeyOrArr.indexOf(key) === -1
  }).map(key => {
    let context = requireContext(key)
    return flatContext ? flatRequireContext(context) : context
  })
}

/**
 * 将require.context读取的模块对象话
 * @param {*} requireContext require.context()
 * @param {*} excludeObjKeyOrArr 排除的context
 * @param {*} flatContext 展开export default
 */
const requireContextToObj = (requireContext, excludeObjKeyOrArr = [], flatContext = true) => {
  if (!Array.isArray(excludeObjKeyOrArr)) {
    excludeObjKeyOrArr = [excludeObjKeyOrArr]
  }
  let requireContextObj = {}
  requireContext.keys().filter(key => {
    return excludeObjKeyOrArr.indexOf(key) === -1
  }).forEach(key => {
    let context = requireContext(key)
    requireContextObj[key.replace(/^\.\//, '').replace(/\.js$/, '')] = flatContext ? flatRequireContext(context) : context
  })
  return requireContextObj
}

export {
  requireContext,
  requireContextToObj
}

export default requireContext