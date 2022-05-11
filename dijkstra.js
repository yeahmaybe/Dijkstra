function Node(parent=null, way=1000001, isChecked=false) {
   this.parent = parent;
   this.way = way;
   this.isChecked = isChecked;
}

export function Edge(from, to, weight) {
   this.from = from;
   this.to = to;
   this.weight = weight-0;
}

function getMatrixFromList(edgeList, vertNum) {

   let result = [];
   for(let i=0; i<vertNum; i++) {
      result.push([]);
      for(let j=0; j<vertNum; j++) {
         result[i].push(-1);
      }
   }

   if(edgeList == null) {
      return result;
   }

   for(let i = 0; i<edgeList.length; i++) {
      let edge = edgeList[i];
      result[edge.from-1][edge.to-1] = edge.weight;
      
   }
   console.log(result);
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

export function getDistances(vertNum, edgeList, start) {

   start--;
   let vertex = [];
   for(let i=0; i<vertNum; i++) {
      vertex.push(new Node(null, Infinity, false));
   }
   let matrix = getMatrixFromList(edgeList, vertNum);

   vertex[start].way = 0;
   let current = start;

   while(current != null) {
      console.log(current);
      vertex[current].isChecked = true;
      console.log(vertex);
      for(let child = 0; child < vertNum; child++) {
         
         if(vertex[child].isChecked == false) {
            if(matrix[current][child] > -1 && vertex[child].way > vertex[current].way + matrix[current][child]) {
                  vertex[child].way = vertex[current].way + matrix[current][child];
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

/* 
1 2 1
1 3 1
2 1 4
2 3 1
3 1 2
3 2 1
*/