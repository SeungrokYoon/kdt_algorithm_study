class MaxHeap {
  constructor() {
    this.heap = []
  }
  insert(v) {
    this.heap.push(v)
    this.upHeap(this.heap.length - 1)
  }
  upHeap(pos) {
    while (this.heap[pos] > this.heap[parseInt((pos - 1) / 2)]) {
      const temp = this.heap[pos]
      this.heap[pos] = this.heap[parseInt((pos - 1) / 2)]
      this.heap[parseInt((pos - 1) / 2)] = temp
      pos = parseInt((pos - 1) / 2)
    }
  }
  getMax() {
    if (this.heap.length === 0) return 0
    if (this.heap.length === 1) {
      const max = this.heap[0]
      this.heap.pop()
      return max
    }
    const max = this.heap[0]
    this.heap[0] = this.heap[this.heap.length - 1]
    this.heap.pop()
    this.downHeap(0)
    return max
  }
  downHeap(pos) {
    while (pos < Math.floor(this.heap.length / 2)) {
      let childIndex = pos * 2 + 1 //왼쪽자식의 인덱스 pos 가 Math.floor(this.heap.length/2) 라 무조건 왼쪽 자식은 있음
      //자식 중 더 큰 자식 구하기,
      if (childIndex + 1 < this.heap.length && this.heap[childIndex] < this.heap[childIndex + 1])
        childIndex++ //오른쪽 자식이 존재하고, 오른쪽 자식이 더 크면 오른쪽을 선택
      if (this.heap[pos] >= this.heap[childIndex]) break
      //만약 선택된 노드값이 교환할 수 없다면 break
      const temp = this.heap[pos]
      this.heap[pos] = this.heap[childIndex]
      this.heap[childIndex] = temp
      pos = childIndex
    }
  }
  print() {
    console.log(this.heap)
  }
  size() {
    console.log(this.heap.length)
  }
}

const input = require('fs')
  .readFileSync(__dirname + '/test.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number)

const N = input.shift()
const heap = new MaxHeap()
let result = ''
for (let i = 0; i < N; i++) {
  if (input[i] === 0) {
    result += `${heap.getMax()}\n`
  } else {
    heap.insert(input[i])
  }
  heap.print()
}
console.log(result.trim())
