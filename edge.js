export function getEdgeDiv() {
   let edgeDiv = document.createElement('div');
   edgeDiv.className = "edge";
   //<input type="number" id="vertices" class="input" min="1">
   let fromInput = getInput("from");
   let toInput = getInput("to");
   let weightInput = getInput("weight");

   edgeDiv.appendChild(fromInput);
   edgeDiv.appendChild(toInput);
   edgeDiv.appendChild(weightInput);


   return edgeDiv;
}

export function createEdge() {
   let Edge = getEdgeDiv();
   let edgeList = document.getElementById("edgeList");
   edgeList.appendChild(Edge);
}

export function deleteEdge() {
   let edgeList = document.getElementById("edgeList");
   if(edgeList.lastChild.className == "edge")
      edgeList.removeChild(edgeList.lastChild);
}

function getInput(name) {
   
   let input = document.createElement('input');
   input.className = name;
   input.type = "number";

   return input;
}