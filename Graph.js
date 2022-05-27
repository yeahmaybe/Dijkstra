import {Heap} from './BinaryHeap.js';
import * as dijkstra from './Dijkstra.js';

export class Edge {
   constructor(from, to, weight) {
      this.from = from - 0;
      this.to = to - 0;
      this.weight = weight - 0;
   }
}

export class Node {
   constructor(index, way = Infinity, parent = null, isChecked = false) {
      this.index = index;
      this.way = way;
      this.parent = parent;
      this.isChecked = isChecked;
   }
}

export class Graph {
   constructor(vertNum) {
      this.vertNum = vertNum;
      this.edgeNum = 0;
      
      this.vertices = new Array(vertNum);
      for(let i=0; i<vertNum; i++) {
         this.vertices[i] = new Node(i);
      }

      this.matrix = [];
      for(let i=0; i < vertNum; i++) {
         this.matrix.push([]);
         for(let j=0; j < vertNum; j++) {
            this.matrix[i].push(-1);
         }
      }
   }

   size() {
      return this.vertNum;
   }

   addEdge(edge) {
      if(typeof(edge) == typeof(new Edge())) {
         this.matrix[edge.from][edge.to] = edge.weight;
      }
      this.edgeNum++;
   }

   countDistancesFrom(start) {
      let E = this.edgeNum;
      let V = this.vertNum;
      if(E < 0.8 * V*(V-1)) {
         console.log("Расчет производится по реализации на бинарной куче")
         return dijkstra.DijkstraOnHeap(this, start);
      }
      else {
         console.log("Расчет производится по наивной реализации")
         return dijkstra.DijkstraNaive(this, start);
      }
     
   }
}