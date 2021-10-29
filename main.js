var previousMouseX = 0;
var previousMouseY = 0;


game.loop = function(){
  // framesElapsed++
  for(var i = 0, l = game.layers.length; i < l; i++){  
    if(game.layers[i].clearFrames == true){  
      game.layers[i].clear();
    }
  }
  game.tick()
  beginMouseHold = false;
  endMouseHold = false;
  if(!mouseDownPreviously && game.mouseDown){
    beginMouseHold = true
  }
  if(mouseDownPreviously && !game.mouseDown){
    endMouseHold = true
  }
  if(endMouseHold){
    mouseX = Math.floor(game.mouseX/32)
    mouseY = Math.floor(game.mouseY/32)
    addPipe(mouseX, mouseY)
  }
  
  // document.getElementById("display1").innerHTML = endMouseHold
  
  previousMouseX = Math.floor(previousMouseX/32)
  previousMouseY = Math.floor(previousMouseY/32)
  mouseX = Math.floor(game.mouseX/32)
  mouseY = Math.floor(game.mouseY/32)
  
  if("TLBR".includes(getMapData(mouseX, mouseY))){
    previousPipeX = mouseX;
    previousPipeY = mouseY;
  }

  if(game.mouseDown){
    var distanceX = previousMouseX - mouseX
    var distanceY = previousMouseY - mouseY
    var slope = distanceY/distanceX
    var multiplier = 1;
    var extender = 1;

    if(distanceX > 0){multiplier = -1}
    if(distanceY > 0){extender = -1}
    // document.getElementById("slope").innerHTML = slope
    // document.getElementById("multiplier").innerHTML = multiplier
    for(var i = 0; i < Math.abs(distanceX); i++){
      if(slope > 1 || slope < -1){
        for(var k = 0; k < (Math.abs(Math.floor((i+(1)) * slope) - Math.floor(i * slope)))+1; k++){
          addPipe(previousMouseX + i * multiplier, previousMouseY + Math.floor(i*slope * multiplier)+k*extender)
          // game.getObject("activeLayer").mapData[previousMouseY + Math.floor(i*slope * multiplier)+k*extender] = game.getObject("activeLayer").mapData[previousMouseY + Math.floor(i*slope * multiplier)+k*extender].replaceAt(previousMouseX + i * multiplier, "p")
        }
      }else if(slope <= 1 || slope >= -1){
        addPipe(previousMouseX + i * multiplier, previousMouseY + Math.floor(multiplier*i*slope))
        // game.getObject("activeLayer").mapData[previousMouseY + Math.floor(multiplier*i*slope)] = game.getObject("activeLayer").mapData[previousMouseY + Math.floor(multiplier*i*slope)].replaceAt(previousMouseX + i * multiplier, "p")
        if(Math.floor(multiplier*(i+1)*slope) > Math.floor(multiplier*i*slope) || Math.floor(multiplier*(i+1)*slope) < Math.floor(multiplier*i*slope)){
          addPipe((previousMouseX + i * multiplier)+1*multiplier, previousMouseY + Math.floor(multiplier*i*slope))
          // game.getObject("activeLayer").mapData[previousMouseY + Math.floor(multiplier*i*slope)] = game.getObject("activeLayer").mapData[previousMouseY + Math.floor(multiplier*i*slope)].replaceAt((previousMouseX + i * multiplier)+1*multiplier, "p");
        }
      }
    }
    if(distanceX == 0){
      for(var i = 0; i < Math.abs(distanceY); i++){
        addPipe(mouseX, (i * extender + previousMouseY))
        // game.getObject("activeLayer").mapData[(i * extender + previousMouseY)] = game.getObject("activeLayer").mapData[(i * extender + previousMouseY)].replaceAt(mouseX, "p");
      }
    }
    addPipe(mouseX, mouseY)
    // game.getObject("activeLayer").mapData[mouseY] = game.getObject("activeLayer").mapData[mouseY].replaceAt(mouseX, "p")
  }
  previousMouseX = game.mouseX;
  previousMouseY = game.mouseY;

  // previousMouseX = 0;
  // previousMouseY = 0;


  // if(game.mouseDown){
  //   if(previousMouseX <= )
  //   game.getObject("activeLayer").mapData[Math.floor(game.mouseY/32)] = game.getObject("activeLayer").mapData[Math.floor(game.mouseY/32)].replaceAt(Math.floor(game.mouseX/32), "p")
  // }
  game.render()
  mouseDownPreviously = false;
  if(game.mouseDown){mouseDownPreviously = true;}
  requestAnimationFrame(game.loop)
}
game.loop()
