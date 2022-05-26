import {Graph} from './Graph.js';
import {Edge} from './Graph.js';

function addEdgesFromList(edgeList, graph) {
   for(let i = 0; i<edgeList.length; i++) {
      let edge = new Edge(edgeList[i].from-1, edgeList[i].to-1, edgeList[i].weight);
      graph.addEdge(edge);
   }
}

export function getDistances(vertNum, edgeList, start) {
   let graph = new Graph(vertNum);
   addEdgesFromList(edgeList, graph);
   return graph.countDistancesFrom(start-1);
}