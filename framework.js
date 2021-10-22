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

function getMapData(x, y){
  try{return game.getObject("activeLayer").mapData[y].charAt(x)}catch{return 0}
}

function changeMapData(x, y, data){
  // console.log(x + ", " + y + ", " + data)
  game.getObject("activeLayer").mapData[y] = game.getObject("activeLayer").mapData[y].replaceAt(x, data)
}

var pipeConnections = [["1", "lr"], ["2", "bt"], ["3", "bl"], ["4", "br"], ["5", "rt"], ["6", "lt"], ["T", "b"], ["B", "t"], ["L", "r"], ["R", "l"]]

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
  var pipe1Connections = getPipeConnections(x1, y1)
  var pipe2Connections = getPipeConnections(x2, y2)
  var pipesToReplace = [];

  if(x1 > x2 && y1 == y2){
    
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
  changeMapData(x1, y1, getPipeId(pipe1Connections))
  var pipe2Id = getPipeId(pipe2Connections)
  if(pipe2Id == "O"){
    changeMapData(x2, y2, "-")
  }else{
    changeMapData(x2, y2, pipe2Id)
  }
  
}



var crossingPipe = false;
function addPipe(x, y){
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
  if(beginMouseHold || endMouseHold){}
  if((beginMouseHold || endMouseHold) && "TLBRO".includes(getMapData(x, y))){
    // if("TLBR".includes(getMapData(x+(x-neighbourX), y+(y-neighbourY)))){
    //   // console.log(x + ", " + neighbourX + "\n" + y + ", " + neighbourY)
    //   console.log("FORWARD")
    //   connectPipes(x, y, x+(x-neighbourX), y+(y-neighbourY))
    // }else if("TLBR".includes(getMapData(x+(y-neighbourY), y+(x-neighbourX)))){
    //   console.log("LEFT")
    //   connectPipes(x, y, x+(y-neighbourY), y+(x-neighbourX))
    // }else if("TLBR".includes(getMapData(x+(neighbourY-y), y+(neighbourX-x)))){
    //   console.log("RIGHT")
    //   connectPipes(x, y, x+(neighbourY-y), y+(neighbourX-x))
    // }else if(getMapData(x, y) == "O"){
    //   changeMapData(x, y, "-")
    // }
  }
  if(crossingPipe){
    beginMouseHold = false;
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

function getNetworkArea(x, y){
  var area = [];
  var queue = [[x, y]];

  while(queue.length > 0){
    if(area.length > 200){
      console.log(area);
      break;
    }
    if(pipeSet.includes(getMapData(queue[0][0], queue[0][1])) && (JSON.stringify(area).indexOf(JSON.stringify(queue[0]))) == -1){
      area.push(queue[0])
      var directionals = getPipeConnections(queue[0][0], queue[0][1])
      if(directionals.includes("t")){
        queue.push([queue[0][0], queue[0][1]-1])
      }
      if(directionals.includes("b")){
        queue.push([queue[0][0], queue[0][1]+1])
      }
      if(directionals.includes("l")){
        queue.push([queue[0][0]-1, queue[0][1]])
      }
      if(directionals.includes("r")){
        queue.push([queue[0][0]+1, queue[0][1]])
      }
    }
    queue.shift();
  }
  return area;
}

function getNetwork(id){
  for(var i = 0, l = networks.length; i < l; i++){
    if(networks[i][3] == id){
      return networks[i]
    }
  }
}

function createNetwork(x, y){
  if(getMapData(x, y) == "r"){
    networks.push(["refinery", [[x, y], [x+1, y], [x, y+1], [x+1, y+1]], [], networkTotal])
  }
  if(getMapData(x, y) == "W"){
    networks.push(["warehouse", [[x, y], [x+1, y], [x, y+1], [x+1, y+1]], [], networkTotal])
  }
  if(pipeSet.includes(getMapData(x, y))){
    var networkArea = getNetworkArea(x, y)
    var connections = [];
    for(var i = 0, l = networks.length; i < l; i++){
      if(networks[i][0] != "pipe"){
        for(var j = 0, ll = networks[i][1].length; j < ll; j++){
          if((JSON.stringify(networkArea).indexOf(JSON.stringify(networks[i][1][j]))) != -1){
            connections.push(networks[i][3])
          }
        }
      }
    }
    // console.log(connections)
    var facilityTypes = [];
    for(var i = 0, l = connections.length; i < l; i++){
      if(facilityTypes.includes(getNetwork(connections[i])[0])){
        alert("You may not connect two facilities of the same type")
        game.mouseDown = false;
        return true;
      }else{
        facilityTypes.push(getNetwork(connections[i])[0])
      }
      
    }
    networks.push(["pipe", getNetworkArea(x,y), [], networkTotal])
  }
  networkTotal++
  return false;
}

function updateNetwork(x, y){
  
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
