/**
 * 生成普通数独的函数
 *
 * @returns 最终 NumberPlace
 */
function NumberPlaceCreate() {
  // 1 初始化参数
  // 可选数字
  const NumberList = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  // 当前循环行及尝试次数
  const Calling = { y: 0, time: 0 }
  // 尝试次数阈值
  const Maximum = 10
  // 最终结果
  const NumberPlace = []

  // 2 每个数字建立
  /**
   * 逐行逐个尝试数字的函数
   * 本函数认为，前行数据指导后行排列，前行随机排列下一定有后行可用排列
   *
   * @param {Number} lastY 位置循环的起始行，用于重算时的起始行数
   * @returns NumberPlace
   */
  function create(lastY) {
    // 2.1 位置循环，行
    for (let y = lastY || 1; y <= 9; y++) {
      // 2.1.1 记录当前循环行及尝试次数
      if (y !== Calling.y) {
        Calling.y = y
        Calling.time = 0
      }

      // 2.1.2 逐个尝试，个
      for (let x = 1; x <= 9; x++) {
        const z = Math.ceil(x / 3) + (Math.floor((y - 1) / 3) * 3)

        // 2.1.2.1 本格子可选数字
        const canBe = [...NumberList]

        NumberPlace.forEach(num => {
          if (num.x === x || num.y === y || num.z === z) {
            const index = canBe.findIndex(number => number === num.num)
            if (index >= 0) canBe.splice(index, 1)
          }
        })

        // 2.1.2.2 某格没有可选数，本行重算
        if (canBe.length === 0) {
          // 2.1.2.2.1 删掉本行数据
          for (let r = 1; r < x; r++) {
            NumberPlace.pop()
          }

          // 2.1.2.2.2 如果重算次数大于阈值，删除上行数据，重算上一行
          if (Calling.time >= Maximum) {
            for (let r = 0; r < 9; r++) {
              NumberPlace.pop()
            }
            return create(y - 1)
          }

          // 2.1.2.2.3 重算次数累加
          Calling.time += 1
          return create(y)
        }

        // 2.1.2.3 选一个数字
        const index = Math.floor(Math.random() * canBe.length)
        const num = {
          x,
          y,
          z,
          num: canBe[index],
        }

        NumberPlace.push(num)
      }
    }

    // 2.2 成功后渲染成表格
    let rendery = -1
    let renderx = []

    NumberPlace.map(num => {
      if (num.y - 1 !== rendery) {
        rendery += 1
        renderx.push([])
      }
      renderx[rendery].push(num.num)
    })

    for (let i = 0; i < renderx.length; i++) {
      console.log(renderx[i])
    }

    // 2.3 返回结果
    return NumberPlace
  }

  // 3 执行
  return create()
}

NumberPlaceCreate()
