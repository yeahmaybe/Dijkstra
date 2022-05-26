import {Heap} from './BinaryHeap.js';

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
         return this.DijkstraOnHeap(start);
      }
      else {
         console.log("Расчет производится по наивной реализации")
         return this.DijkstraNaive(start);
      }
     
   }

   DijkstraOnHeap(start) {
      let vertex = new Array(this.vertNum);
      for(let i=0; i< this.vertNum; i++) {
         vertex[i] = new Node(i);
      }
      vertex[start].way = 0;

      let query = new Heap();
      query.push(vertex[start]);

      while(!query.empty()) {

         let current = query.pop();
         if(current.isChecked)
            continue;

         let cur = current.index;
         vertex[cur].isChecked = true;

         for(let child = 0; child < this.vertNum; child++) {
            if(vertex[child].isChecked == false) {
               if(this.matrix[cur][child] > -1 && vertex[child].way > vertex[cur].way + this.matrix[cur][child]) {
                     vertex[child].way = vertex[cur].way + this.matrix[cur][child];
                     vertex[child].parent = cur;
                     query.push(vertex[child]);
               }
            }
         }
      }
      
      let result = [];
      for(let i=0; i< this.size(); i++) {
         result.push(vertex[i].way);
      }
      return result;
   }

   findNearestVertex(vertices) {
      let minDistance = Infinity;
      let index = null;
   
      for(let i=0; i < vertices.length; i++) {
         let node = vertices[i];
         if(!node.isChecked && node.way < minDistance) {
            index = i;
            minDistance = node.way;
         }
      }
      return index;
    }
   
   DijkstraNaive(start) {
      let vertex = new Array(this.vertNum);
      for(let i=0; i< this.vertNum; i++) {
         vertex[i] = new Node(i);
      }
      vertex[start].way = 0;

      let current = start;

      while(current != null) {
         vertex[current].isChecked = true;
         for(let child = 0; child < this.vertNum; child++) {
            
            if(vertex[child].isChecked == false) {
               if(this.matrix[current][child] > -1 && vertex[child].way > vertex[current].way + this.matrix[current][child]) {
                     vertex[child].way = vertex[current].way + this.matrix[current][child];
                     vertex[child].parent = current;
               }
            }
         }
         current = this.findNearestVertex(vertex);
      }
   
      let result = [];
      for(let i = 0; i<vertex.length; i++) {
         result.push(vertex[i].way);
      }
      return result;
   }
}