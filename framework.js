//NOTE TO SELF
//Valves that allow you to control how oil is distributed among your facilities or manually controlled
//Oil prices fluctuate depending on what is happening in the world and you can hold oil until there is more demand
//Oil production fluctuates, it will make sense to save oil in warehouses to prepare for shortages
//Computerized valve that can change flow depending on any variable


var game = new Game("game");
var framesElapsed = 0;

game.addLayer("oil")
game.getLayer("oil").clearFrames = false;
game.addLayer("terrain")
game.getLayer("terrain").clearFrames = false;
game.addLayer("main")


game.addTexture("grass", "/assets/grass.png")
game.addTexture("water", "/assets/water.png")


game.addTexture("pipe_h", "/assets/pipe_h.png")//1
game.addTexture("pipe_v", "/assets/pipe_v.png")//2
game.addTexture("pipe_tl", "/assets/pipe_tl.png")//3
game.addTexture("pipe_tr", "/assets/pipe_tr.png")//4
game.addTexture("pipe_bl", "/assets/pipe_bl.png")//5
game.addTexture("pipe_br", "/assets/pipe_br.png")//6
game.addTexture("pipe_xt", "/assets/pipe_xt.png")//7
game.addTexture("pipe_xr", "/assets/pipe_xr.png")//8
game.addTexture("pipe_xb", "/assets/pipe_xb.png")//9
game.addTexture("pipe_xl", "/assets/pipe_xl.png")//0
game.addTexture("pipe_x", "/assets/pipe_x.png")//X
game.addTexture("pipe_et", "/assets/pipe_et.png")//T
game.addTexture("pipe_er", "/assets/pipe_er.png")//R
game.addTexture("pipe_eb", "/assets/pipe_eb.png")//B
game.addTexture("pipe_el", "/assets/pipe_el.png")//L
game.addTexture("pipe_dot", "/assets/pipe_dot.png")//O

game.addTexture("ship", "/assets/ship.png")//R
game.addTexture("warehouse", "/assets/warehouse.png")//B
game.addTexture("refinery", "/assets/refinery.png")

game.addTexture("selector", "/assets/selector.png")

var pipeSet = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "X", "T", "R", "B", "L", "O", "p"]
var mouseDownPreviously = false;
var beginMouseHold = false;
var endMouseHold = false;
var previousPipeX = 0;
var previousPipeY = 0;
var neighbourX = 0;
var neighbourY = 0;

var debugging = true;
var logPipes = false;

function toggleMenu(menu){
  if(document.getElementById(menu).style.display == "none"){
    document.getElementById(menu).style.display = "block"
    document.getElementById(menu + "Arrow").innerHTML = "ᐯ "
  }else{
    document.getElementById(menu).style.display = "none"
    document.getElementById(menu + "Arrow").innerHTML = "ᐳ "
  }
}

// Make the DIV element draggable:
dragElement(document.getElementById("debug"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "Header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function lg(expression){
  if(expression == "robert sux"){
    document.getElementById('evalOutput').innerHTML = "he really do tho";
  }else{
    document.getElementById('evalOutput').innerHTML = expression;
  }
  
}



function getMapData(x, y){
  try{return game.getObject("activeLayer").mapData[y].charAt(x)}catch{return 0}
}

function changeMapData(x, y, data){
  if(logPipes && debugging && data != "O" & data != "-"){
    document.getElementById("pipeLog").innerHTML += "Changed data at (" + x + ", " + y + ") to " + data + "<br>" 
  }
  // console.log(x + ", " + y + ", " + data)
  game.getObject("activeLayer").mapData[y] = game.getObject("activeLayer").mapData[y].replaceAt(x, data)
}

var pipeConnections = [["1", "lr"], ["2", "bt"], ["3", "bl"], ["4", "br"], ["5", "rt"], ["6", "lt"], ["T", "b"], ["B", "t"], ["L", "r"], ["R", "l"], ["X", "blrt"]]

function getPipeConnections(x, y){
  var data = getMapData(x,y)

  for(var i = 0, l = pipeConnections.length; i < l; i++){
    if(pipeConnections[i][0] == data){
      return pipeConnections[i][1];
    }
  }

  return "";
}

function getPipeId(connections){
  // console.log(">" + connections)
  connections = connections.split('').sort().join('').trim();
  for(var i = 0, l = pipeConnections.length; i < l; i++){
    if(pipeConnections[i][1] == connections){
      return pipeConnections[i][0];
    }
  }
  return "O"
}

function connectPipes(x1, y1, x2, y2){
  var joinEmptyNetwork = false;
  if("3456".includes(getMapData(x2, y2))){return;}
  if("TLBR".includes(getMapData(x1, y1)) && "TLBR".includes(getMapData(x2, y2))){
    joinEmptyNetwork = true;
  }
  var pipe1Connections = getPipeConnections(x1, y1)
  var pipe2Connections = getPipeConnections(x2, y2)
  if(pipe2Connections == "lr" || pipe2Connections == "tb"){
    return;
  }
  var endPoints = [];
  for(var j = 0; j < l; j++){
    if(networks[j][0] == 'pipeSegment'){
      endPoints.push(networks[j][1][0])
      endPoints.push(networks[j][1][1])
    }
  }
  for(var i = 0, l = networks.length; i < l; i++){
    if(networks[i][0] == 'pipeSegment'){
      
      var stringArray2 = JSON.stringify([x2, y2])
      if(JSON.stringify(networks[i][1]).includes(stringArray2)){
        if(JSON.stringify(endPoints).includes(JSON.stringify([x1, y1]))){
          // console.log(endPoints)
          var stringArray1 = JSON.stringify([x1, y1])
          for(var j = 0; j < l; j++){
            // console.log(stringArray1)
            // console.log(networks[j][1])
            if(JSON.stringify(networks[j][1][0]) == stringArray1){
              
              if(JSON.stringify(networks[i][1][0]) == stringArray2){
                networks[j][1][0] = networks[i][1][1]
              }else{
                networks[j][1][0] = networks[i][1][0]
              }
              networks.splice(i, 1)
              i--
              l--
            }else if(JSON.stringify(networks[j][1][1]) == stringArray1){
             
              if(JSON.stringify(networks[i][1][0]) == stringArray2){
                networks[j][1][1] = networks[i][1][1]
              }else{
                networks[j][1][1] = networks[i][1][0]
              }
              networks.splice(i, 1)
              i--
              l--
            }
          }
        }else{
          for(var j = 0; j < 2; j++){
            if(JSON.stringify(networks[i][1][j]) == stringArray2){
              networks[i][1][j] = [x1, y1]
              break;
            }
          }
          break;
        }
        
        // for(var j = 0; j < l; j++){
        //   if(networks[j][1].includes([x1, y1])){
        //     networks[j][networks[j][1].indexOf([x1, y1])] = networks[i][Math.abs(networks[i][1].indexOf([x2, y2]) - 1)]
        //   }
        // }



      }
    }
  }
  var pipesToReplace = [];

  if(x1 > x2 && y1 == y2){
    // console.log("Connected " + x1 + ", " + y1 + " and " + x2 + ", " + y2)
    
    pipesToReplace = [];
    if(x1 > x2+1){
      var crossingMidsection = true;
      for(var i = x1-1; i > x2; i--){
        if("12".includes(getMapData(i, y1))){
          pipesToReplace.push([i, y1])
          // changeMapData(i, y1, "X")
          if(x1-x2 == pipesToReplace.length +1){
            for(var i = 0, l = pipesToReplace.length; i<l; i++){
              changeMapData(pipesToReplace[i][0], pipesToReplace[i][1], "X")
            }
          }
        }else{
          crossingMidsection = false
          break;
        }
      }
      if(crossingMidsection){
        pipe1Connections = pipe1Connections.concat("l")
        pipe2Connections = pipe2Connections.concat("r")
      }
    }else{
      pipe1Connections = pipe1Connections.concat("l")
      pipe2Connections = pipe2Connections.concat("r")
    }
  }
  if(x1 < x2 && y1 == y2){
    // console.log("Connected " + x1 + ", " + y1 + " and " + x2 + ", " + y2)

    pipesToReplace = [];
    if(x1 < x2-1){
      var crossingMidsection = true;
      for(var i = x1+1; i < x2; i++){
        if("12".includes(getMapData(i, y1))){
          pipesToReplace.push([i, y1])
          // changeMapData(i, y1, "X")
        }else{
          crossingMidsection = false
          break;
        }
      }
      if(x2-x1 == pipesToReplace.length +1){
        for(var i = 0, l = pipesToReplace.length; i<l; i++){
          changeMapData(pipesToReplace[i][0], pipesToReplace[i][1], "X")
        }
      }
      if(crossingMidsection){
        pipe1Connections = pipe1Connections.concat("r")
        pipe2Connections = pipe2Connections.concat("l")
      }
    }else{
      pipe1Connections = pipe1Connections.concat("r")
      pipe2Connections = pipe2Connections.concat("l")
    }
  }
  if(y1 > y2 && x1 == x2){
    // console.log("Connected " + x1 + ", " + y1 + " and " + x2 + ", " + y2)
    // pipe1Connections = pipe1Connections.concat("t")
    // pipe2Connections = pipe2Connections.concat("b")
    // if(y1 == y2+2){
    //   changeMapData(x1, y1-1, "X")
    // }
    pipesToReplace = [];
    if(y1 > y2+1){
      var crossingMidsection = true;
      for(var i = y1-1; i > y2; i--){
        if("12".includes(getMapData(x1, i))){
          pipesToReplace.push([x1, i])
          // changeMapData(x1, i, "X")
        }else{
          crossingMidsection = false
          break;
        }
      }
      if(y1-y2 == pipesToReplace.length +1){
        for(var i = 0, l = pipesToReplace.length; i<l; i++){
          changeMapData(pipesToReplace[i][0], pipesToReplace[i][1], "X")
        }
      }
      if(crossingMidsection){
        pipe1Connections = pipe1Connections.concat("t")
        pipe2Connections = pipe2Connections.concat("b")
      }
    }else{
      pipe1Connections = pipe1Connections.concat("t")
      pipe2Connections = pipe2Connections.concat("b")
    }
  }
  if(y1 < y2 && x1 == x2){
    // console.log("Connected " + x1 + ", " + y1 + " and " + x2 + ", " + y2)
    
    pipesToReplace = [];
    if(y1 < y2-1){
      var crossingMidsection = true;
      for(var i = y1+1; i < y2; i++){
        if("12".includes(getMapData(x1, i))){
          pipesToReplace.push([x1, i])
          // changeMapData(x1, i, "X")
        }else{
          crossingMidsection = false
          break;
        }
      }
      if(y2-y1 == pipesToReplace.length +1){
        for(var i = 0, l = pipesToReplace.length; i<l; i++){
          changeMapData(pipesToReplace[i][0], pipesToReplace[i][1], "X")
        }
      }
      if(crossingMidsection){
        pipe1Connections = pipe1Connections.concat("b")
        pipe2Connections = pipe2Connections.concat("t")
      }
    }else{
      pipe1Connections = pipe1Connections.concat("b")
      pipe2Connections = pipe2Connections.concat("t")
    }
  }
  if(getPipeId(pipe1Connections) != "O" && !"rW&p".includes(getMapData(x1, y1))){
    changeMapData(x1, y1, getPipeId(pipe1Connections))
  }
  var pipe2Id = getPipeId(pipe2Connections)
  if(getMapData(x2, y2) != "p"){
    if(pipe2Id == "O"){
      changeMapData(x2, y2, "-")
    }else{
      changeMapData(x2, y2, pipe2Id)
      if(logPipes && debugging){document.getElementById("pipeLog").innerHTML += "Joined (" + x1 + ", " + y1 + ") and (" + x2 + ", " + y2 + ")<br>"}
    }
  }
  if(getMapData(x2, y2) == "p" || getMapData(x1, y1) == "p"){
    if(getMapData(x1, y1) == "p"){
      var endPoints = updateNetwork(x2, y2)
    }else{
      var endPoints = updateNetwork(x1, y1)
    }
    // console.log(x1 + ", " + y1)
    // console.log(x2 + ", " + y2)
    if(JSON.stringify(endPoints[0]) != JSON.stringify(endPoints[1])){
      var pos = 0;
      if(endPoints[0][0] == x1 && endPoints[0][1] == y1){
        pos = 1;
      }
      // console.log(pos)
      if(getMapData(endPoints[pos][0], endPoints[pos][1] - 1) == "p" || getMapData(endPoints[pos][0] - 1, endPoints[pos][1]) == "p" || getMapData(endPoints[pos][0] + 1, endPoints[pos][1]) == "p"){

        addPipeNetwork(endPoints)
        
        // networkTotal++
        // networks.push(["pipeSegment", endPoints, [], networkTotal])
        if(debugging){updateNetworkLog()}
      }
    }
  }

  if(joinEmptyNetwork){
    var endPoints = updateNetwork(x1, y1)
    var endX = endPoints[0][0]
    var endY = endPoints[0][1]
    var connections = getPipeConnections(endX, endY)
    if((connections.includes("t") && getMapData(endX, endY-1) == "p") || (connections.includes("l") && getMapData(endX - 1, endY) == "p") || (connections.includes("r") && getMapData(endX + 1, endY) == "p")){
      endX = endPoints[1][0]
      endY = endPoints[1][1]
      connections = getPipeConnections(endX, endY)
      if((connections.includes("t") && getMapData(endX, endY-1) == "p") || (connections.includes("l") && getMapData(endX - 1, endY) == "p") || (connections.includes("r") && getMapData(endX + 1, endY) == "p")){
        addPipeNetwork(endPoints)
        // networkTotal++
        // networks.push(["pipeSegment", endPoints, [], networkTotal])
      }
    }
  }
  
}

function addPipeNetwork(endPoints){
  // console.log(endPoints)
  var endX = endPoints[0][0]
  var endY = endPoints[0][1]
  var connections = getPipeConnections(endX, endY)
  var facility1X = 0;
  var facility1Y = 0;
  var facility2X = 0;
  var facility2Y = 0;
  if((connections.includes("t") && getMapData(endX, endY-1) == "p")){
    facility1X = endX
    facility1Y = endY - 1
  }else if((connections.includes("l") && getMapData(endX-1, endY) == "p")){
    facility1X = endX - 1
    facility1Y = endY
  }else if((connections.includes("r") && getMapData(endX+1, endY) == "p")){
    facility1X = endX + 1
    facility1Y = endY
  }

  endX = endPoints[1][0]
  endY = endPoints[1][1]
  connections = getPipeConnections(endX, endY)
  if((connections.includes("t") && getMapData(endX, endY-1) == "p")){
    facility2X = endX
    facility2Y = endY - 1
  }else if((connections.includes("l") && getMapData(endX-1, endY) == "p")){
    facility2X = endX - 1
    facility2Y = endY
  }else if((connections.includes("r") && getMapData(endX+1, endY) == "p")){
    facility2X = endX + 1
    facility2Y = endY
  }

  var facility1String = JSON.stringify([facility1X, facility1Y])
  var facility2String = JSON.stringify([facility2X, facility2Y])
  var facilityIDs = [];
  for(var i = 0, l = networks.length; i < l; i++){
    if(networks[i][0] != "pipeSegment"){
      var areaString = JSON.stringify(networks[i][1])
      if(areaString.includes(facility1String) || areaString.includes(facility2String)){
        facilityIDs.push(networks[i][3])
      }
    }
  }

  //NOTE TO FUTURE SELF

  //PLEASE FIX

  //For some reason, the function is unable to identify the facilities located at the ends of the pipe. The problem could lie with this function, or possibly the updateNetwork() function, but most likely with both functions. Also, sometimes it seems to believe that a pipe end segment lies within a factory. Also, the pipe network function works fine for now. Also also, work on adding a function to switch between different areas of the map while still keeping the links for the current are open. Also also also, Good Luck!
  
  if(facilityIDs[1] != undefined){
    networkTotal++

    // console.log(facility1String)
    // console.log(facility2String)
    links.push([facilityIDs[0], facilityIDs[1], networkTotal])

    networks.push(["pipeSegment", endPoints, [facilityIDs[0], facilityIDs[1]], networkTotal])
  }

}

var updateDirection = "";

function updatePipe(x, y){
  var mapData = getMapData(x, y)
  if("prW&".includes(mapData)){
    return;
  }
  
  
  if(mapData == "X"){
    if(updateDirection == "x" || updateDirection == ""){
      if("T234".includes(getMapData(x, y-1)) || "B256".includes(getMapData(x, y+1))){
        changeMapData(x, y, "2")
        updateDirection = "x"
        updatePipe(x-1, y)
        updatePipe(x+1, y)
      }
    }

    if(updateDirection == "y" || updateDirection == ""){
      if("L135".includes(getMapData(x-1, y)) || "R146".includes(getMapData(x+1, y))){
        changeMapData(x, y, "1")
        updateDirection = "y"
        updatePipe(x, y-1)
        updatePipe(x, y+1)
      }
    }
  }else{
    var connections = getPipeConnections(x, y)
    var stableConnections = ""
    if(connections.includes("b")){
      if("23456BXp".includes(getMapData(x, y+1))){
        stableConnections += "b"
      }
    }
    if(connections.includes("l")){
      if("13456LXp".includes(getMapData(x-1, y))){
        stableConnections += "l"
      }
    }
    if(connections.includes("r")){
      if("13456RXp".includes(getMapData(x+1, y))){
        stableConnections += "r"
      }
    }
    if(connections.includes("t")){
      if("23456TXp".includes(getMapData(x, y-1))){
        stableConnections += "t"
      }
    }
    if(stableConnections != ""){
      var newPipe = getPipeId(stableConnections)
      if(getMapData(x, y) != newPipe){
        changeMapData(x, y, newPipe)
      }
    }else{
      changeMapData(x, y, "-")
    }
  
  }


}


function killNetwork(x, y){
  var stringified = JSON.stringify([x, y])
  for(var i = 0, l = networks.length; i < l; i++){
    if(networks[i][0] == "pipeSegment"){
      if(JSON.stringify(networks[i][1][0]) == stringified || JSON.stringify(networks[i][1][1]) == stringified){
        for(var k = 0, ll = links.length; k < ll; k++){
          if(links[k][2] == networks[i][3]){
            links.splice(k, 1)
            k--
            ll--
          }
        }

        networks.splice(i, 1)
        i--
        l--
        
      }
    }
  }
}


var crossingPipe = false;
function addPipe(x, y){
  if(key(16)){
    var mapData = getMapData(x, y)
    if("rWp&".includes(mapData)){
      var coordString = JSON.stringify([x, y])
      for(var i = 0, l = networks.length; i < l; i++){
        if(JSON.stringify(networks[i][1]).includes(coordString)){
          x = networks[i][1][0][0]
          y = networks[i][1][0][1]
          for(var k = 0, ll = networks.length; k < ll; k++){
            if(networks[k][0] == "pipeSegment"){
              if(networks[k][2][0] == networks[i][3] || networks[k][2][1] == networks[i][3]){
                killNetwork(networks[k][1][0][0], networks[k][1][0][1])
                k--
                ll--
              }
            }
          }
          networks.splice(i, 1)
          break;
        }
      }
      changeMapData(x, y, "-")
      changeMapData(x+1, y, "-")
      changeMapData(x, y+1, "-")
      changeMapData(x+1, y+1, "-")

      updatePipe(x, y-1)
      updatePipe(x+1, y-1)

      updatePipe(x+2, y)
      updatePipe(x+2, y+1)

      updatePipe(x, y+2)
      updatePipe(x+1, y+2)

      updatePipe(x-1, y)
      updatePipe(x-1, y+1)
      
    }else{
      var directionals = ""
      if(mapData == "1"){
        directionals = "lr"
      }
      if(mapData == "2"){
        directionals = "tb"
      }
      if(mapData == "3"){
        directionals = "br"
      }
      if(mapData == "4"){
        directionals = "bl"
      }
      if(mapData == "5"){
        directionals = "tr"
      }
      if(mapData == "6"){
        directionals = "tl"
      }

      updateDirection = "";

      changeMapData(x, y, "-")
      updatePipe(x, y-1)
      updatePipe(x, y+1)
      updatePipe(x-1, y)
      updatePipe(x+1, y)

      var armEndPoints = [];
      var endPoints = [];
      for(var j = 0, l = networks.length; j < l; j++){
        if(networks[j][0] == 'pipeSegment'){
          endPoints.push(networks[j][1][0])
          endPoints.push(networks[j][1][1])
        }
      }
      endPoints = JSON.stringify(endPoints)
      if(directionals.includes("t")){
        if("TLBR123456X".includes(getMapData(x, y-1))){
          armEndPoints = updateNetwork(x, y-1)
          if(endPoints.includes(JSON.stringify(armEndPoints[0]))){
            killNetwork(armEndPoints[0][0], armEndPoints[0][1])
          }
          if(endPoints.includes(JSON.stringify(armEndPoints[1]))){
            // console.log(armEndPoints[1][0] + ", " + armEndPoints[1][1])
            killNetwork(armEndPoints[1][0], armEndPoints[1][1])
          }
        }
      }
      if(directionals.includes("b")){
        if("TLBR123456X".includes(getMapData(x, y+1))){
          armEndPoints = updateNetwork(x, y+1)
          if(endPoints.includes(JSON.stringify(armEndPoints[0]))){
            killNetwork(armEndPoints[0][0], armEndPoints[0][1])
          }
          if(endPoints.includes(JSON.stringify(armEndPoints[1]))){
            // console.log(armEndPoints[1][0] + ", " + armEndPoints[1][1])
            killNetwork(armEndPoints[1][0], armEndPoints[1][1])
          }
        }
      }
      if(directionals.includes("l")){
        if("TLBR123456X".includes(getMapData(x-1, y))){
          armEndPoints = updateNetwork(x-1, y)
          if(endPoints.includes(JSON.stringify(armEndPoints[0]))){
            killNetwork(armEndPoints[0][0], armEndPoints[0][1])
          }
          if(endPoints.includes(JSON.stringify(armEndPoints[1]))){
            // console.log(armEndPoints[1][0] + ", " + armEndPoints[1][1])
            killNetwork(armEndPoints[1][0], armEndPoints[1][1])
          }
        }
      }
      if(directionals.includes("r")){
        if("TLBR123456X".includes(getMapData(x+1, y))){
          armEndPoints = updateNetwork(x+1, y)
          if(endPoints.includes(JSON.stringify(armEndPoints[0]))){
            killNetwork(armEndPoints[0][0], armEndPoints[0][1])
          }
          if(endPoints.includes(JSON.stringify(armEndPoints[1]))){
            // console.log(armEndPoints[1][0] + ", " + armEndPoints[1][1])
            killNetwork(armEndPoints[1][0], armEndPoints[1][1])
          }
        }
      }
      if(debugging){updateNetworkLog()}

      // changeMapData(x, y, "-")
      // updatePipe(x, y-1)
      // updatePipe(x, y+1)
      // updatePipe(x-1, y)
      // updatePipe(x+1, y)
    }
    
  }else{
    document.getElementById("display1").innerHTML = previousPipeX
    document.getElementById("display2").innerHTML = neighbourX
    document.getElementById("display3").innerHTML = previousPipeY
    document.getElementById("display4").innerHTML = neighbourY
    crossingPipe = false;
    if((previousPipeX != x || previousPipeY != y) && "TLBR123456".includes(getMapData(x, y))){
      beginMouseHold = true
        
      crossingPipe = true
    }
    
    if(getMapData(x, y) == "-"){
      changeMapData(x, y, "O")
      if(!beginMouseHold){
        connectPipes(x, y, previousPipeX, previousPipeY)
      }else{
        if(getMapData(x, y-1) == "B" || getMapData(x, y-1) == "p"){
          connectPipes(x, y, x, y-1)
        }else if(getMapData(x, y+1) == "T" || getMapData(x, y+1) == "p"){
          connectPipes(x, y, x, y+1)
        }else if(getMapData(x-1, y) == "R" || getMapData(x-1, y) == "p"){
          connectPipes(x, y, x-1, y)
        }else if(getMapData(x+1, y) == "L" || getMapData(x+1, y) == "p"){
          connectPipes(x, y, x+1, y)
        }
      }
      


      if(getMapData(x, y) == "O"){
        changeMapData(x, y, "-")
      }
      if(previousPipeX != x || previousPipeY != y){
        neighbourX = previousPipeX;
        neighbourY = previousPipeY;
      }
      previousPipeX = x;
      previousPipeY = y;
    }
    if(endMouseHold && !"123456".includes(getMapData(x, y))){
      if(getMapData(x, y-1) == "B" || getMapData(x, y-1) == "p"){
        connectPipes(x, y, x, y-1)
      }else if(getMapData(x, y+1) == "T" || getMapData(x, y+1) == "p"){
        connectPipes(x, y, x, y+1)
      }else if(getMapData(x-1, y) == "R" || getMapData(x-1, y) == "p"){
        connectPipes(x, y, x-1, y)
      }else if(getMapData(x+1, y) == "L" || getMapData(x+1, y) == "p"){
        connectPipes(x, y, x+1, y)
      }
    }

    if("TLBRp".includes(getMapData(x, y)) && "TLBRp".includes(getMapData(previousPipeX, previousPipeY)) && (Math.abs(x-previousPipeX) == 1 || Math.abs(y-previousPipeY) == 1)){
      connectPipes(x, y, previousPipeX, previousPipeY)
      previousPipeX = x;
      previousPipeY = y;
    }
    
    
    if(crossingPipe){
      beginMouseHold = false;
    }
  }
}

function addFacility(x, y, type){
  if(type == "r"){
    changeMapData(x, y, "r")
    changeMapData(x+1, y, "&")
    changeMapData(x, y+1, "p")
    changeMapData(x+1, y+1, "p")
    createNetwork(x, y)
    
  }
  if(type == "W"){
    changeMapData(x, y, "W")
    changeMapData(x+1, y, "&")
    changeMapData(x, y+1, "p")
    changeMapData(x+1, y+1, "p")
    createNetwork(x, y)
  }
  
}

var networks = [];
var networkTotal = 0;
var links = [];


function getNetwork(id){
  for(var i = 0, l = networks.length; i < l; i++){
    if(networks[i][3] == id){
      return networks[i]
    }
  }
}

function createNetwork(x, y){
  networkTotal++
  var mapData = getMapData(x, y)
  if(mapData == "r"){
    networks.push(["refinery", [[x, y], [x+1, y], [x, y+1], [x+1, y+1]], [100], networkTotal])
  }
  if(mapData == "W"){
    networks.push(["warehouse", [[x, y], [x+1, y], [x, y+1], [x+1, y+1]], [0], networkTotal])
  }

  if(debugging){updateNetworkLog()}
  //SCRAP
  if(pipeSet.includes(mapData)){
    addPipeNetwork(updateNetwork(x, y))
    networks.push(["pipeSegment", updateNetwork(x, y), [], networkTotal])
  }
}

function updateNetworkLog(){
  document.getElementById("networkLog").innerHTML = ""
  for(var i = 0, l = networks.length; i < l; i++){
    document.getElementById("networkLog").innerHTML += networks[i][0] + " " + JSON.stringify(networks[i][1]) + " " + JSON.stringify(networks[i][2]) + " : " + networks[i][3] + "<br>"
  }
}

function updateNetwork(x, y){
  var targetX = x;
  var targetY = y;
  var cachedX = -1;
  var cachedY = -1;
  var secondSide = false;
  var cachedXMotion = 0;
  var cachedYMotion = 0;
  var connections = getPipeConnections(x, y)
  if(connections.length > 1){
    if(connections.includes("b")){
      if(cachedX == -1){
        cachedX = -2
      }else{
        cachedX = x
        cachedY = y + 1
        cachedYMotion = 1
      }
    }
    if(connections.includes("l")){
      if(cachedX == -1){
        cachedX = -2
      }else{
        cachedX = x - 1
        cachedY = y
        cachedXMotion = -1      
      }
    }
    if(connections.includes("r")){
      if(cachedX == -1){
        cachedX = -2
      }else{
        cachedX = x + 1
        cachedY = y
        cachedXMotion = 1
      }
    }
    if(connections.includes("t")){
      if(cachedX == -1){
        cachedX = -2
      }else{
        cachedX = x
        cachedY = y - 1
        cachedYMotion = -1
      }
    }
  }
  var xMotion = 0;
  var yMotion = 0;
  var endPoints = [[x, y],[0, 0]]
  var counter = 0;

  while(counter < 10000){
    counter++
    // console.log(targetX + ", " + targetY)
    var connections = getPipeConnections(targetX, targetY)
    if(getMapData(targetX, targetY) == "X"){
      targetX += xMotion;
      targetY += yMotion;
      continue;
    }
    
    if(connections.includes("b") && "123456TLBRX".includes(getMapData(targetX, targetY+1)) && yMotion != -1){
      // if(secondSide){console.log("b")}
      targetY += 1;
      xMotion = 0;
      yMotion = 1;
      continue;
    }
    if(connections.includes("l") && "123456TLBRX".includes(getMapData(targetX-1, targetY)) && xMotion != 1){
      // if(secondSide){console.log("l")}
      targetX -= 1;
      xMotion = -1;
      yMotion = 0;
      continue;
    }
    if(connections.includes("r") && "123456TLBRX".includes(getMapData(targetX+1, targetY)) && xMotion != -1){
      // if(secondSide){console.log("r")}
      targetX += 1;
      xMotion = 1;
      yMotion = 0;
      continue;
    }
    if(connections.includes("t") && "123456TLBRX".includes(getMapData(targetX, targetY-1)) && yMotion != 1){
      // if(secondSide){console.log("t")}
      targetY -= 1;
      xMotion = 0;
      yMotion = -1;
      continue;
    }
    if(cachedX >= 0){
      if(getMapData(cachedX, cachedY) != "p"){
        endPoints[1][0] = targetX;
        endPoints[1][1] = targetY;
        targetX = cachedX;
        targetY = cachedY;
        // console.log(cachedX + ", " + cachedY + " : " + cachedYMotion)
        cachedX = -1;
        xMotion = cachedXMotion;
        yMotion = cachedYMotion;
        secondSide = true;
        continue;
      }
      
    }
    break;
  }
  if(secondSide){
    if(!(endPoints[1][0] == targetX && endPoints[1][1] == targetY)){
      endPoints[0][0] = targetX;
      endPoints[0][1] = targetY;
    }
  }else{
    endPoints[1][0] = targetX;
    endPoints[1][1] = targetY;
  }
  

  return endPoints;
}

var framesElapsed = 0;

//World Maps are 32 x 20
game.addTemplate("terrain", [
  ["x", 0],
  ["y", 0],
  ["momentumX", 0],
  ["momentumY", 0],
  ["width", 0],
  ["height", 0],
  ["spriteWidth", 0],
  ["spriteHeight", 0],
  ["spriteOffsetX", 0],
  ["spriteOffsetY", 0],
  ["rotation", 0],
  ["refresh", true],
  ["render", true],
  ["layerId", "main"],
  ["mapData", [
    "gggggggggggggggggggggggggggggwww",
    "ggggggggggggggggggggggggggggwwww",
    "gggggggggggggggggggggggggggwwwww",
    "gggggggggggggggggggggggggggwwwww",
    "ggggggggggggggggggggggggggwwwwww",
    "gggggggggggggggggggggggggwwwwwww",
    "wwwwggggggwwwwggggggggggwwwwwwww",
    "wwwwwwwwwwwwwwwwwgggwwwwwwwwwwww",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "gggwwwggggggwwwwwwwwwwwwwwwwwwww",
    "ggggggggggggggggwwwgggwwwwwwwwww",
    "gggggggggggggggggggggggwwwwwwwww",
    "gggggggggggggggggggggggwwwwwwwww",
    "ggggggggggggggggggggggwwwwwwwwww",
    "gggggggggggggggggggggwwwwwwwwwww",
    "gggggggggggggggggggggwwwwwwwwwww",
    "ggggggggggggggggggggwwwwwwwwwwww",
    "ggggggggggggggggggwwwwwwwwwwwwww",
    "ggggggggggggggwwwwwwwwwwwwwwwwww",
    
    ]],
  ["role", `
    
    ctx = game.getLayer(self.layerId).context;
    
    
    ctx.imageSmoothingEnabled = false;
    if(self.refresh || self.render){
      for(var j = 0, ll = this.objects[i].mapData.length; j < ll; j++){
        var row = this.objects[i].mapData[j].split("");
        for(var k = 0, lll = row.length; k < lll; k++){
          if(row[k] == "g"){ 
            ctx.drawImage(this.getTexture("grass"), k*32, j*32, 32, 32)
          }
          if(row[k] == "w"){ 
            ctx.globalAlpha = 0.4;
            ctx.drawImage(this.getTexture("water"), k*32, j*32, 32, 32)
            ctx.globalAlpha = 1;
          }
          if(row[k] == "1"){ 
            ctx.drawImage(this.getTexture("pipe_h"), k*32, j*32, 32, 32)
          }
          if(row[k] == "2"){ 
            ctx.drawImage(this.getTexture("pipe_v"), k*32, j*32, 32, 32)
          }
          if(row[k] == "3"){ 
            ctx.drawImage(this.getTexture("pipe_tl"), k*32, j*32, 32, 32)
          }
          if(row[k] == "4"){ 
            ctx.drawImage(this.getTexture("pipe_tr"), k*32, j*32, 32, 32)
          }
          if(row[k] == "5"){ 
            ctx.drawImage(this.getTexture("pipe_bl"), k*32, j*32, 32, 32)
          }
          if(row[k] == "6"){ 
            ctx.drawImage(this.getTexture("pipe_br"), k*32, j*32, 32, 32)
          }
          if(row[k] == "7"){ 
            ctx.drawImage(this.getTexture("pipe_xt"), k*32, j*32, 32, 32)
          }
          if(row[k] == "8"){ 
            ctx.drawImage(this.getTexture("pipe_xr"), k*32, j*32, 32, 32)
          }
          if(row[k] == "9"){ 
            ctx.drawImage(this.getTexture("pipe_xb"), k*32, j*32, 32, 32)
          }
          if(row[k] == "0"){ 
            ctx.drawImage(this.getTexture("pipe_xl"), k*32, j*32, 32, 32)
          }
          if(row[k] == "X"){ 
            ctx.drawImage(this.getTexture("pipe_x"), k*32, j*32, 32, 32)
          }
          if(row[k] == "T"){ 
            ctx.drawImage(this.getTexture("pipe_et"), k*32, j*32, 32, 32)
          }
          if(row[k] == "L"){ 
            ctx.drawImage(this.getTexture("pipe_el"), k*32, j*32, 32, 32)
          }
          if(row[k] == "B"){ 
            ctx.drawImage(this.getTexture("pipe_eb"), k*32, j*32, 32, 32)
          }
          if(row[k] == "R"){ 
            ctx.drawImage(this.getTexture("pipe_er"), k*32, j*32, 32, 32)
          }
          if(row[k] == "O"){ 
            ctx.drawImage(this.getTexture("pipe_dot"), k*32, j*32, 32, 32)
          }
          if(row[k] == "r"){ 
            ctx.drawImage(this.getTexture("refinery"), k*32, j*32, 64, 64)
          }
          if(row[k] == "W"){
            ctx.drawImage(this.getTexture("warehouse"), k*32, j*32, 64, 64)
            
          }
          if(row[k] == "s"){ 
            ctx.drawImage(this.getTexture("ship"), k*32, j*32, 32, 32)
          }
        }
      }
    }
    self.render = false;
  
  
  
  
  
  `],
  ["layer", "terrain"],
  ["zindex", 1],
  ["alpha", 1],
]);
game.addTemplate("selector", [
  ["x", 0],
  ["y", 0],
  ["id", "selector"],
  ["momentumX", 0],
  ["momentumY", 0],
  ["width", 32],
  ["height", 32],
  ["spriteWidth", 32],
  ["spriteHeight", 32],
  ["spriteOffsetX", 0],
  ["spriteOffsetY", 0],
  ["rotation", 0],
  ["movementDelay", 0],
  ["acceleration", 0],
  ["controls", "mouse"],
  ["role", `
    this.objects[i].movementDelay--
    if(this.objects[i].movementDelay < -2){
      this.objects[i].acceleration = 0;
    }
    framesElapsed++
    this.objects[i].alpha = (Math.sin(framesElapsed/8) + 2)/4;
    if(this.objects[i].controls == "keyboard"){
      if(key("down") && key("left") && this.objects[i].movementDelay <= 0){
        this.objects[i].y += 32
        this.objects[i].x -= 32
        this.objects[i].movementDelay = 10 - this.objects[i].acceleration
        if(this.objects[i].acceleration < 5){  
          this.objects[i].acceleration += 1
        }
      }
      if(key("down") && key("right") && this.objects[i].movementDelay <= 0){
        this.objects[i].y += 32
        this.objects[i].x += 32
        this.objects[i].movementDelay = 10 - this.objects[i].acceleration
        if(this.objects[i].acceleration < 5){  
          this.objects[i].acceleration += 1
        }
      }
      if(key("up") && key("left") && this.objects[i].movementDelay <= 0){
        this.objects[i].y -= 32
        this.objects[i].x -= 32
        this.objects[i].movementDelay = 10 - this.objects[i].acceleration
        if(this.objects[i].acceleration < 5){  
          this.objects[i].acceleration += 1
        }
      }
      if(key("up") && key("right") && this.objects[i].movementDelay <= 0){
        this.objects[i].y -= 32
        this.objects[i].x += 32
        this.objects[i].movementDelay = 10 - this.objects[i].acceleration
        if(this.objects[i].acceleration < 5){  
          this.objects[i].acceleration += 1
        }
      }
      if(key("down") && this.objects[i].movementDelay <= 0){
        this.objects[i].y += 32
        this.objects[i].movementDelay = 10 - this.objects[i].acceleration
        if(this.objects[i].acceleration < 5){  
          this.objects[i].acceleration += 1
        }
      }
      if(key("up") && this.objects[i].movementDelay <= 0){
        this.objects[i].y -= 32
        this.objects[i].movementDelay = 10 - this.objects[i].acceleration
        if(this.objects[i].acceleration < 5){  
          this.objects[i].acceleration += 1
        }
      }
      if(key("left") && this.objects[i].movementDelay <= 0){
        this.objects[i].x -= 32
        this.objects[i].movementDelay = 10 - this.objects[i].acceleration
        if(this.objects[i].acceleration < 5){  
          this.objects[i].acceleration += 1
        }
      }
      if(key("right") && this.objects[i].movementDelay <= 0){
        this.objects[i].x += 32
        this.objects[i].movementDelay = 10 - this.objects[i].acceleration
        if(this.objects[i].acceleration < 5){  
          this.objects[i].acceleration += 1
        }
      }
    }else if(self.controls == "mouse"){
      self.x = Math.floor(this.mouseX / 32) * 32
      self.y = Math.floor(this.mouseY / 32) * 32
    }
    if(this.objects[i].x < 0){
      this.objects[i].x = 0
    }
    if(this.objects[i].y < 0){
      this.objects[i].y = 0
    }
    if(this.objects[i].x > 988){
      this.objects[i].x = 992
    }
    if(this.objects[i].y > 608){
      this.objects[i].y = 608
    }
    
  `],
  ["layer", "main"],
  ["texture", "selector"],
  ["zindex", 1],
  ["alpha", 1],
]);
game.window.style.backgroundColor = "aqua"
game.addTemplate("dynamicOil", [
  ["x", 0],
  ["y", 0],
  ["id", "dynamicOil"],
  ["momentumX", 0],
  ["momentumY", 0],
  ["width", 1024],
  ["height", 600],
  ["spriteWidth", 0],
  ["spriteHeight", 0],
  ["spriteOffsetX", 0],
  ["spriteOffsetY", 0],
  ["droplets", []],
  ["addDroplet", function(x, y){
    this.droplets.push([x, y, 8, 1]);
  }],
  ["role", `
    if(framesElapsed % 10 == 1){
      if(framesElapsed % 60 == 1){
        game.getObject("dynamicOil").addDroplet(20 + (Math.random()-0.5)*20, 280 + (Math.random()-0.5)*20)
      }
      var ctx = game.getLayer("oil").context;
      game.getLayer("oil").clear()
      for(var j = 0; j<self.droplets.length; j++){
        ctx.globalAlpha = self.droplets[j][3];
        ctx.beginPath();
        ctx.arc(self.droplets[j][0], self.droplets[j][1], self.droplets[j][2], 0, 2 * Math.PI, false);
        ctx.fillStyle = 'black';
        ctx.fill();
        self.droplets[j][0] += 0.2
        self.droplets[j][2] += 0.06
        self.droplets[j][3] -= 0.003
        if(self.droplets[j][3] < 0.005){
          // console.log(self.droplets)
          self.droplets.splice(j, 1)
          // console.log(self.droplets)
          j--
        }
      }
    }
  `]
]);


// game.addTexture("player", "/assets/test1.png")
// game.addTexture("ground", "/assets/rolling-hills.png")
// game.addTemplate("player", [
//   ["x", 200],
//   ["y", 0],
//   ["momentumX", 0],
//   ["momentumY", 0],
//   ["width", 40],
//   ["height", 80],
//   ["spriteWidth", 80],
//   ["spriteHeight", 80],
//   ["spriteOffsetX", 0],
//   ["spriteOffsetY", 4],
//   ["rotation", 0],
//   ["role", `
    
//     if(key("down")){
//       this.objects[i].y += 2
//     }
//     if(key("left")){
//       this.objects[i].x -= 2
//     }
//     if(key("right")){
//       this.objects[i].x += 2
//     }
//     this.objects[i].momentumY += 0.2
//     this.objects[i].momentumY *= 0.98
//     game.boxCollision(this.objects[i], "player")
//     if(game.pixelCollision(this.objects[i], "solid")){
//       if(key("up")){
//         this.objects[i].momentumY -= 8
//       }
//     }
    
//     this.objects[i].y += this.objects[i].momentumY
//   `],
//   ["texture", "player"],
//   ["layer", "main"],
//   ["zindex", 1],
//   ["alpha", 1],
// ]);

// game.addObject("player")
// game.addObject("player", "this.role = \`"+`
//   if(key("s")){
//     this.objects[i].y += 2
//   }
//   if(key("a")){
//     this.objects[i].x -= 2
//   }
//   if(key("d")){
//     this.objects[i].x += 2
//   }
//   this.objects[i].momentumY += 0.2
//   this.objects[i].momentumY *= 0.98
//   this.objects[i].y += this.objects[i].momentumY
//   if(game.pixelCollision(this.objects[i], "solid")){
//     if(key("w")){
//       this.objects[i].momentumY -= 8
//     }
//   }
// ` + "\`")

//this.objects[i].rotation = pointTo(this.objects[i], 0,0)
