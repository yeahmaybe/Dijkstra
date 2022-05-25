
import * as dijkstra from './dijkstra.js'; 
import {Edge} from './dijkstra.js';
import {createEdge} from './edge.js'
import {deleteEdge} from './edge.js'

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
      let wrapper = document.getElementById("wrapper");
      wrapper.appendChild(line);
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
      let wrapper = document.getElementById("wrapper");
      wrapper.appendChild(SVL);
   }

}
function getStartVertex() {
   return document.getElementById("start").value-0;
}

function getVertNum() {
   return document.getElementById("vertices").value-0;
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
   let fromList = document.getElementsByClassName("from");
   let toList = document.getElementsByClassName("to");
   let weightList = document.getElementsByClassName("weight");
   let edges1 = [];

   for(let i=0; i<fromList.length; i++) {
      let from = fromList[i].value;
      let to = toList[i].value;
      let weight = weightList[i].value;
      
      if(notInRange(from) || notInRange(to) || weight < 0) {
         notValid = true;
      }
      let newEdge = new Edge(from, to, weight)
      edges1.push(newEdge);
   }

   if(notValid) {
      return false;
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

   if(vertNum != null && startVertex != null && startVertex <= vertNum && startVertex >= 1 && edgeList !== false) {
      createStartVertexLabel(getStartVertex());
      let distances = 
         dijkstra.getDistances(
            vertNum,
            edgeList,
            startVertex
         );


      for(let i = 0; i < vertNum; i++) {
         createNewLine(i+1, distances[i]);
      }
   }
   else {
      throwInvalidInput();
   }

}

document.getElementById('count').addEventListener('click', main);
document.getElementById('addButton').addEventListener('click', createEdge)

document.addEventListener('keydown', function(event) {
   if (event.code == 'ArrowDown' && (event.shiftKey || event.ctrlKey || event.metaKey)) {
      createEdge();
   }
});

document.addEventListener('keydown', function(event) {
   if (event.code == 'ArrowUp' && (event.shiftKey || event.ctrlKey || event.metaKey)) {
      deleteEdge();
   }
});