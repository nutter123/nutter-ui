let model = [
  'abcdefghijklmnopqrstuvwxyz',
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  '1234567890'
]

/**
 * 设置数据模
 * @param {*} newModel 新数据模
 */
export const setModel = (newModel = []) => {
  model = newModel.slice()
}

/**
 * 取得[最小值， 最大值]之间的随机数
 * @param {*} min 最小值
 * @param {*} max 最大值
 */
export const randRange = (min, max) => {
  return Math.floor(Math.max(min, Math.random() * (max + 1)))
}

/**
 * 根据数据模生成随机字符串
 * @param len 字符串长度
 */
export default (len) => {
  let text = ''
  let modelLength = model.length - 1
  while (len--) {
    let step = randRange(0, modelLength)
    text += model[step].charAt(randRange(0, model[step].length))
  }
  return text
}
