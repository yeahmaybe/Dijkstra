import {Graph} from './Graph.js';
import {Node} from './Graph.js';
import {Heap} from './BinaryHeap.js';

export function DijkstraOnHeap(G, start) {
   let vertex = G.vertices;
   for(let i=0; i< G.vertNum; i++) {
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

      for(let child = 0; child < G.vertNum; child++) {
         if(vertex[child].isChecked == false) {
            if(G.matrix[cur][child] > -1 && vertex[child].way > vertex[cur].way + G.matrix[cur][child]) {
                  vertex[child].way = vertex[cur].way + G.matrix[cur][child];
                  vertex[child].parent = cur;
                  query.push(vertex[child]);
            }
         }
      }
   }
   
   let result = [];
   for(let i=0; i< G.size(); i++) {
      result.push(vertex[i].way);
   }
   return result;
}

function findNearestVertex(vertices) {
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

export function DijkstraNaive(G, start) {
   let vertex = new Array(G.vertNum);
   for(let i=0; i< G.vertNum; i++) {
      vertex[i] = new Node(i);
   }
   vertex[start].way = 0;

   let current = start;

   while(current != null) {
      vertex[current].isChecked = true;
      for(let child = 0; child < G.vertNum; child++) {
         
         if(vertex[child].isChecked == false) {
            if(G.matrix[current][child] > -1 && vertex[child].way > vertex[current].way + G.matrix[current][child]) {
                  vertex[child].way = vertex[current].way + G.matrix[current][child];
                  vertex[child].parent = current;
            }
         }
      }
      current = findNearestVertex(vertex);
   }

   let result = [];
   for(let i = 0; i<vertex.length; i++) {
      result.push(vertex[i].way);
   }
   return result;
}