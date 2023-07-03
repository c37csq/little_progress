### eslint圈复杂度配置
代码复杂度：圈复杂度
V(G) = e - n + 2
V(G) = R

e // 流程图边数
n // 流程图中节点数
R //流程图被分为多少个区域

"rules": {
  "complexity": ["error", 10] // 圈复杂度10
}