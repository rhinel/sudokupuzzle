// 普通数独题目
const questionD = [
  [4, 0, 8, 2, 0, 0, 0, 0, 0],
  [0, 3, 0, 1, 9, 0, 0, 0, 0],
  [0, 7, 0, 0, 0, 8, 4, 0, 0],
  [0, 0, 6, 0, 0, 0, 7, 0, 1],
  [0, 8, 0, 0, 0, 0, 2, 6, 4],
  [3, 4, 1, 0, 0, 0, 0, 5, 0],
  [8, 0, 0, 0, 3, 0, 0, 7, 0],
  [0, 0, 0, 4, 0, 0, 5, 0, 8],
  [0, 0, 0, 7, 0, 5, 0, 4, 0]
]

// x数独题目
const questionX = [
  [0, 0, 0, 0, 7, 0, 5, 0, 1],
  [0, 0, 5, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 5, 0, 0, 0, 0, 6],
  [3, 1, 0, 9, 8, 0, 0, 5, 0],
  [5, 0, 6, 0, 0, 7, 0, 0, 4],
  [9, 0, 0, 0, 0, 0, 6, 0, 0],
  [0, 4, 0, 3, 6, 0, 0, 0, 7],
  [0, 0, 0, 0, 0, 0, 3, 0, 0],
  [0, 0, 0, 7, 0, 0, 0, 0, 0]
]

// 不规则数独题目
const questionZ = [
  [0, 0, 0, 0, 3, 8, 5, 0, 0],
  [0, 0, 0, 3, 0, 0, 0, 1, 0],
  [0, 0, 9, 0, 0, 6, 0, 0, 4],
  [8, 6, 0, 2, 0, 0, 9, 0, 1],
  [4, 0, 1, 0, 0, 0, 0, 0, 7],
  [0, 1, 6, 4, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 9, 4, 0, 0],
  [0, 0, 0, 7, 9, 0, 2, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0]
]

// 不规则数独的z定位
const questionZPos = [
  1, 1, 1, 2, 2, 2, 2, 3, 3,
  1, 1, 1, 4, 2, 3, 3, 3, 3,
  1, 4, 4, 4, 2, 2, 5, 5, 3,
  1, 4, 4, 2, 2, 5, 5, 5, 3,
  1, 4, 4, 5, 5, 5, 5, 6, 3,
  7, 7, 4, 7, 6, 6, 6, 6, 6,
  7, 7, 7, 7, 8, 8, 8, 8, 6,
  7, 7, 9, 9, 9, 9, 8, 8, 6,
  9, 9, 9, 9, 9, 8, 8, 8, 6
]

/**
 * 解题数独的函数
 *
 * @param {string} [type=''] 需要解题的数独类型，
 *   默认'' = 普通， 'x' = X数独， 'z' = 不规则数独， 'xz' = X不规则数独
 * @returns 最终 NumberPlace
 */
function NumberPlaceAnswer(type = '') {
  // 1 初始化参数
  const NumberList = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const NumberPlace = []
  const Maximum = 10
  let CallingLine = 0
  const Calling = (function() {
    const obj = {}
    for (let i = 1; i <= 9; i++) {
      obj[i] = { time: 0 }
    }
    return obj
  })()
  const NumberQuerstion = []

  // 2 处理输入数字
  const question = (function() {
    if (!type) return questionD
    if (type === 'x') return questionX
    if (type === 'z' || type === 'xz') return questionZ
    return []
  })()

  question.forEach((line, y) => {
    line.forEach((number, x) => {
      NumberPlace.push({
        x: x + 1,
        y: y + 1,
        z: !type.includes('z')
          // 规则数独的z定位
          ? Math.ceil((x + 1) / 3) + (Math.floor(y / 3) * 3)
          // 不规则数独的z定位
          : questionZPos[y * 9 + x],
        s: !type.includes('x')
          // 非X 数独无需增加参数
          ? 0
          // x 数独增加的额外参数
          : x === y ? 1 : (x + y === 8 ? 2 : 0),
        num: number
      })
      NumberQuerstion.push(!!number)
    })
  })

  // 3 每个数字尝试
  function answer(lastY) {
    // 3.1 逐行尝试
    for (let y = (lastY || lastY > 1) ? lastY : 1; y <= 9; y++) {
      // 3.1.1 记录当前循环行
      if (y > CallingLine) {
        Calling[y].time = 0
      }

      if (y !== CallingLine) {
        CallingLine = y
      }

      // 3.1.2 如果重算次数大于阈值，删除上行数据，重算上一行
      if (Calling[y].time >= Maximum) {
        for (let r = 1; r <= 9; r++) {
          const numDel = NumberPlace.find((num, numIndex) => (
            !NumberQuerstion[numIndex] &&
            num.x === r &&
            num.y === y - 1
          ))

          if (numDel) numDel.num = 0
        }

        if (y !== 1) {
          Calling[y - 1].time += 1
          return Promise.resolve(y - 1).then(answer)
        }

        Calling[1].time = 0
        return Promise.resolve().then(answer)
      }

      // 3.1.3 逐个尝试
      for (let x = 1; x <= 9; x++) {
        const numPlace = NumberPlace.find(num => (
          num.x === x && num.y === y
        ))

        // 有值跳过
        if (numPlace.num) continue

        // 本格子可选数字
        const canBe = [...NumberList]

        NumberPlace.forEach(num => {
          if (!num.num) return
          if (
            num.x === numPlace.x ||
            num.y === numPlace.y ||
            num.z === numPlace.z
            // x 数独增加的额外判断
            || (
              type.includes('x') &&
              numPlace.s && num.s &&
              numPlace.s === num.s
            )
          ) {
            const index = canBe.findIndex(number => number === num.num)
            if (index >= 0) canBe.splice(index, 1)
          }
        })

        // console.log(canBe)
        // if (y > 7) console.log(x, y, numPlace.z)

        // 某格没有可选数，本行重算
        if (canBe.length === 0) {
          // 删掉本行数据
          for (let r = 1; r < x; r++) {
            const numDel = NumberPlace.find((num, numIndex) => (
              !NumberQuerstion[numIndex] &&
              num.x === r &&
              num.y === y
            ))

            if (numDel) numDel.num = 0
          }

          // 重算次数累加
          Calling[y].time += 1
          return Promise.resolve(y).then(answer)
        }

        // 选一个数字
        const index = Math.floor(Math.random() * canBe.length)
        numPlace.num = canBe[index]
      }
    }

    // 3.2 渲染成表格
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

    // 3.3 返回结果
    return NumberPlace
  }

  //  4 执行
  return answer()
}

NumberPlaceAnswer()
