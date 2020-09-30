/*
 * @Author: nutter
 * @Date: 2020-09-24 15:35:02
 * @LastEditors: nutter
 * @LastEditTime: 2020-09-24 15:42:23
 * @FilePath: \nutter-ui\__tests__\axios\flatArray.js
 */
import flatArray from '../../packages/plugins/axios/src/transformRequest/src/flatArray'

test('flatArray', () => {
    let a = {
        x: 1,
        y: [1, 2, 3]
    };
    let b = {
        x: 1,
        y: '1,2,3'
    }
    expect(flatArray(a).toBe(b))
})