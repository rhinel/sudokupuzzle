function NumberPlaceCreate() {
  const NumberList = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const NumberPlace = []
  const Maximum = 10
  const Calling = { y: 0, time: 0 }

  function create(lastY) {
    // 位置循环
    for (let y = lastY || 1; y <= 9; y++) {
      // 记录当前循环行
      if (y !== Calling.y) {
        Calling.y = y
        Calling.time = 0
      }

      for (let x = 1; x <= 9; x++) {
        const z = Math.ceil(x / 3) + (Math.floor((y - 1) / 3) * 3)

        // 本格子可选数字
        const canBe = [...NumberList]

        NumberPlace.forEach(num => {
          if (num.x === x || num.y === y || num.z === z) {
            const index = canBe.findIndex(number => number === num.num)
            if (index >= 0) canBe.splice(index, 1)
          }
        })

        // console.log(canBe)
        // console.log(x, y, z, NumberPlace.length)

        // 某格没有可选数，本行重算
        if (canBe.length === 0) {
          // 删掉本行数据
          for (let r = 1; r < x; r++) {
            NumberPlace.pop()
          }

          // 如果重算次数大于阈值，删除上行数据，重算上一行
          if (Calling.time >= Maximum) {
            for (let r = 0; r < 9; r++) {
              NumberPlace.pop()
            }
            return NumberPlaceCreate(y - 1)
          }

          // 重算次数累加
          Calling.time += 1
          return NumberPlaceCreate(y)
        }

        // 选一个数字
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

    // 渲染成表格
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

    return NumberPlace
  }

  return create()
}

NumberPlaceCreate()
