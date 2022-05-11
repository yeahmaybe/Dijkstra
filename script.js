
import * as dijkstra from './dijkstra.js'; 
import {Edge} from './dijkstra.js';

function createNewLine(index, distance) {
   let msg = `Расстояние до вершины ${index} равно ${distance}`;
   if(distance == Infinity) {
      msg = `Пути в вершину ${index} не существует`;
   }
   
   let prev = document.getElementById("line"+index);
   
   if(prev != null) {
      prev.innerText = msg;
   }
   else {
      let line = document.createElement("p");
      line.id = "line"+index;
      line.className = "line";
      line.innerText = msg;
      document.body.appendChild(line);
   }
}

function createStartVertexLabel(start_vertex) {

   let beginning = "Расстояние от вершины ";
   let ending = " до всех остальных:";
   let SVL = document.getElementById("start_vertex_label");
   if(SVL != null) {
      SVL.innerText = beginning + start_vertex.toString() + ending;
   }
   else {
      SVL = document.createElement("p");
      SVL.id = "start_vertex_label";
      SVL.className = "line";
      SVL.innerText = beginning + start_vertex.toString() + ending;
      document.body.appendChild(SVL);
   }

}
function getStartVertex() {
   return document.getElementById("start").value;
}

function getVertNum() {
   return document.getElementById("vertices").value;
}

function notInRange(x) {
   if(x >= 1 && x <= getVertNum()) {
      return false;
   }
   else return true;
}

function throwInvalidInput() {
   alert("Неверный формат данных");
}

function getEdgeList() {
   let notValid = false;
   let text = document.getElementById("edges").value;
   let edges = text.split("\n");
   let edges1 = [];
   edges.forEach(edge => {
      let arr = edge.split(" ")
      if(notInRange(arr[0]) || notInRange(arr[1]) || arr[2] < 0) {
         notValid = true;
      }
      let newEdge = new Edge(arr[0], arr[1], arr[2])
      edges1.push(newEdge);
   });

   if(notValid) {
      return null;
   }
   else { 
      console.log(edges1);
      return edges1;
   }
}


function main() {
   let vertNum = getVertNum();
   let edgeList = getEdgeList();
   let startVertex = getStartVertex();

   if(vertNum != null && startVertex != null && startVertex <= vertNum && startVertex >= 1) {
      createStartVertexLabel(getStartVertex());
      let distances = 
         dijkstra.getDistances(
            vertNum,
            edgeList,
            startVertex
         );
      for(let i = 0; i < vertNum; i++) {
         if(i+1 != startVertex)
            createNewLine(i+1, distances[i]);
      }
   }
   else {
      alert("Неверный формат входных данных");
   }

}

document.getElementById('count').addEventListener('click', main);