# JS 数独

> 最近被说没有计算机思维，[算法](https://github.com/f2e-awesome/knowledge#%E7%AE%97%E6%B3%95)思想，我也不知道啥是算法思想。
> 但是喜欢数学，想起以前读书的时候喜欢玩的数独，就写了点数独算法。

数独的种类：[普通数独](http://www.cn.sudokupuzzle.org/), [X对角线数独](https://shudu.one/x-sudoku.php), [不规则数独](https://shudu.one/jigsaw-sudoku.php), [X对角线不规则数独](https://shudu.one/jigsaw-x-sudoku.php)，难度递增。

计算规则的核心思想就是：根据数独规则逐行逐个进行随机尝试。计算方式采取递归方式，在判断上增加一点点优化减少运算量。代码还有很大的优化空间，有兴趣的可以讨论一下。

当然，如果游戏的方式解题还有更多规则可以参考，减少计算量，只是实现这些规则还较有难度，后续继续研究。

目前本项目只有数独生产算法、和解题算法。

生成普通数独：

* `[Done] exited with code=0 in 0.075 seconds`

解题算法可以解上面4种类型的数独，只不过解题时间递增（根据题目是否适合计算机穷举有关）：

* [普通数独] `[Done] exited with code=0 in 0.09 seconds`

* [X对角线数独] `[Done] exited with code=0 in 0.514 seconds`

* [不规则数独] `[Done] exited with code=0 in 1.124 seconds`

* ...

有时间补充一下生成各个级别题目的算法。

```shell
# 生成 普通数独

node create.js

# 2种解题思路 数独：自己在文件内写入题目

# 随机度较大，可能会更早获得结果，但也可能陷入随机中无法自拔
node answer.js
# 逐个尝试并记录错误，更稳定
node answer2.js

```

## preview

```JSON
// console
[ 9, 4, 2, 8, 3, 6, 1, 7, 5 ]
[ 5, 6, 1, 2, 7, 4, 9, 3, 8 ]
[ 3, 8, 7, 1, 9, 5, 6, 4, 2 ]
[ 4, 5, 6, 7, 8, 3, 2, 9, 1 ]
[ 1, 7, 3, 6, 2, 9, 8, 5, 4 ]
[ 2, 9, 8, 5, 4, 1, 3, 6, 7 ]
[ 7, 1, 4, 9, 6, 8, 5, 2, 3 ]
[ 8, 3, 9, 4, 5, 2, 7, 1, 6 ]
[ 6, 2, 5, 3, 1, 7, 4, 8, 9 ]

```
