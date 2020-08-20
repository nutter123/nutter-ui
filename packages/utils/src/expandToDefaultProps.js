import eachOwn from './eachOwn'

/**
 * 将options的 key-value 扩展为 key-{default: value}
 * 方便配置组件的props默认值
 */
export default (options = {}) => {
  let props = {}
  eachOwn(options, (value, key) => {
    props[key] = {
      default: value
    }
  })
  return props
}
