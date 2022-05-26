import {Node} from './Graph.js'

export class Heap {
   constructor() {
      this.nodes = new Array();
   }

   swap(a, b) {
      let tmp = this.nodes[a];
      this.nodes[a] = this.nodes[b];
      this.nodes[b] = tmp;
   }

   heapify() {
      let n = this.nodes.length;
      for(let i = ~~(n/2-1); i >= 0; i--) {
         let smallest = i;
         let leftChild = this.nodes[2*i+1];
         let rightChild = this.nodes[2*i+2];
         if(leftChild != null && this.nodes[smallest] != null  && leftChild.way < this.nodes[smallest].way) {
            smallest = 2*i+1;
         }
         if(rightChild != null && this.nodes[smallest] != null && rightChild.way < this.nodes[smallest].way) {
            smallest = 2*i+2;
         }
         this.swap(i, smallest);
      }
   }

   min() {
      return this.nodes[0].way;
   }

   push(node) {
      this.nodes.push(node);
      this.heapify();
   }

   pop() {
      this.swap(0, this.nodes.length-1);
      let res = this.nodes.pop();
      this.heapify();
      return res;
   }

   empty() {
      return this.nodes.length == 0;
   }
}


