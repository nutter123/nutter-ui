/**
 * call or apply
 * @param context 执行上下文
 * @param fn 函数
 * @param argsArr 参数数组
 */
export default (context, fn, argsArr) => {
  if (argsArr.length <= 2) {
    fn.call(context, argsArr[0], argsArr[1])
  } else {
    fn.apply(context, argsArr)
  }
}
