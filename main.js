var previousMouseX = 0;
var previousMouseY = 0;
var facilityDisplayed = 0;

game.window.addEventListener('keydown', function (e) {
  if(e.keyCode != 9){return;}
  var hotbarButtons = document.getElementsByClassName("hotbarButton")
  for(var i = 0, l = hotbarButtons.length; i < l; i++){
    if(hotbarButtons[i].id.split("_")[0] == conduitSelected){
      if(i == l - 1){
        hotbarButtons[0].click();
        return;
      }else{
        hotbarButtons[i + 1].click();
        return;
      }
    }
  }
})

game.window.addEventListener('click', function (e) {
  if(conduitSelected == "erase"){return}

  var facilityString = JSON.stringify([Math.floor((game.mouseX/windowScale + scrollX)/(16)), Math.floor((game.mouseY/windowScale + scrollY)/(16))])

  var facilityID = undefined

  for(var i = 0, l = areas[areaIndex][4].length; i < l; i++){
    if(areas[areaIndex][4][i][0] != "pipeSegment"){
      var areaString = JSON.stringify(areas[areaIndex][4][i][1])
      if(areaString.includes(facilityString)){
        facilityID = i
        facilityDisplayed = i;
        break;
      }
    }
  }

  if(facilityID === undefined){
    return;
  }

  var str = areas[areaIndex][4][facilityID][0]

  document.getElementById('facilityShownImage').src="docs/assets/" + str + ".png"
  document.getElementById('facilityShown').innerHTML = str.charAt(0).toUpperCase() + str.slice(1);



  document.getElementById('centerDisplay').style.top = "30%"
  document.getElementById('centerDisplay').style.left = "30%"
  document.getElementById('centerDisplay').style.opacity = "1"

})


game.loop = function(){
  var conduitIndex = getConduitIndex(conduitSelected)

  if(key("left")){
    if(scrollX > 0){
      scrollX += -3
      game.getObject("baseLayer").render = true;
    }
  }
  if(key("right")){
    if(scrollX < 510){
      scrollX += 3
      game.getObject("baseLayer").render = true;
    }
  }
  if(key("up")){
    if(scrollY > 0){
      scrollY += -3
      game.getObject("baseLayer").render = true;
    }
  }
  if(key("down")){
    if(scrollY < 318){
      scrollY += 3
      game.getObject("baseLayer").render = true;
    }
  }

  try{
    document.getElementById('facilityShownResources').innerHTML = "Oil: " + areas[areaIndex][4][facilityDisplayed][2]
  }catch{}

  for(var i = 0, l = game.layers.length; i < l; i++){  
    if(game.layers[i].clearFrames == true){  
      game.layers[i].clear();
    }
  }

  game.tick()
  beginMouseHold = false;
  endMouseHold = false;
  //Calculates if a pipe is beginning or ending
  if(!mouseDownPreviously && game.mouseDown){
    beginMouseHold = true
  }
  if(mouseDownPreviously && !game.mouseDown){
    endMouseHold = true
  }
  if(endMouseHold){
    mouseX = Math.floor((game.mouseX/windowScale + scrollX)/(16))
    mouseY = Math.floor((game.mouseY/windowScale + scrollY)/(16))
    addPipe(mouseX, mouseY)
  }
  
  
  previousMouseX = Math.floor((previousMouseX)/(16))
  previousMouseY = Math.floor((previousMouseY)/(16))
  mouseX = Math.floor((game.mouseX/windowScale + scrollX)/(16))
  mouseY = Math.floor((game.mouseY/windowScale + scrollY)/(16))
  if(mouseX < 0){mouseX = 0}
  if(mouseY < 0){mouseY = 0}
  var selector = game.getObject("selector")
  selector.x = (mouseX*16)-scrollX
  selector.y = (mouseY*16)-scrollY
  if(debugging){
    document.getElementById("cursorX").innerHTML = mouseX
    document.getElementById("cursorY").innerHTML = mouseY
    document.getElementById("dataAtCursor").innerHTML = tiles[tileIds.indexOf(getMapData(mouseX, mouseY))][0]
  }
  
  if(conduitSelected != "erase"){
    if(conduits[conduitIndex].endPoints.includes(getMapData(mouseX, mouseY))){
      previousPipeX = mouseX;
      previousPipeY = mouseY;
    }
  }

  //Determines if the mouse has moved more than one tile in a frame, and adds pipes in a line from the mouse's previous position to the current one, making sure to fill in any corners
  if(game.mouseDown){
    var distanceX = previousMouseX - mouseX
    var distanceY = previousMouseY - mouseY
    var slope = distanceY/distanceX
    var multiplier = 1;
    var extender = 1;

    if(distanceX > 0){multiplier = -1}
    if(distanceY > 0){extender = -1}
    for(var i = 0; i < Math.abs(distanceX); i++){
      if(slope > 1 || slope < -1){
        for(var k = 0; k < (Math.abs(Math.floor((i+(1)) * slope) - Math.floor(i * slope)))+1; k++){
          addPipe(previousMouseX + i * multiplier, previousMouseY + Math.floor(i*slope * multiplier)+k*extender)
        }
      }else if(slope <= 1 || slope >= -1){
        addPipe(previousMouseX + i * multiplier, previousMouseY + Math.floor(multiplier*i*slope))
        if(Math.floor(multiplier*(i+1)*slope) > Math.floor(multiplier*i*slope) || Math.floor(multiplier*(i+1)*slope) < Math.floor(multiplier*i*slope)){
          addPipe((previousMouseX + i * multiplier)+1*multiplier, previousMouseY + Math.floor(multiplier*i*slope))
        }
      }
    }
    if(distanceX == 0){
      for(var i = 0; i < Math.abs(distanceY); i++){
        addPipe(mouseX, (i * extender + previousMouseY))
      }
    }
    addPipe(mouseX, mouseY)
  }
  previousMouseX = game.mouseX/windowScale + scrollX;
  previousMouseY = game.mouseY/windowScale + scrollY;

  if(previousMouseX < 0){previousMouseX = 0}
  if(previousMouseY < 0){previousMouseY = 0}

  //Transfers items along working links. Evaluates 4 times per second.
  if(framesElapsed % 15 == 1){
    for(var k = 0, lll = areas.length; k < lll; k++){
      for(var i = 0, l = areas[k][5].length; i < l; i++){
        var facility1 = getNetwork(k, areas[k][5][i][0])
        var facility2 = getNetwork(k, areas[k][5][i][1])
        var types = [[facility1[0], 1], [facility2[0], 2]].sort();
        if(types[0][0] == "refinery" && types[1][0] == "warehouse"){
          var index1 = 0;
          var index2 = 0;
          for(var j = 0, ll = areas[k][4].length; j < ll; j++){
            if(areas[k][4][j][3] == facility1[3]){
              index1 = j
            }else if(areas[k][4][j][3] == facility2[3]){
              index2 = j
            }
          }
          if(areas[k][4][index1][2][0] > 0){
            areas[k][4][index1][2][0] -= 1
            areas[k][4][index2][2][0] += 1
            if(debugging){updateNetworkLog()}
          }
        }
      }
    }
  }


  game.render()
  ctx = game.getLayer("main").context
  ctx.drawImage(game.getTexture(conduitSelected + "_icon"), (game.mouseX + 16)/windowScale, (game.mouseY + 16)/windowScale, 16, 16)
  if(fadeOpacity > 0 || fading){
    if(fading){
      fadeOpacity += 0.1
    }else{
      fadeOpacity -= 0.1
    }
    if(fadeOpacity >= 1){
      fading = false;
      eval(evalOnFade)
      evalOnFade = ""
    }
    
    if(fadeOpacity > 0){
      ctx.globalAlpha = fadeOpacity
    }else{ctx.globalAlpha = 0}
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, 512, 320)
    ctx.globalAlpha = 1;
  }
  mouseDownPreviously = false;
  if(game.mouseDown){mouseDownPreviously = true;}
  requestAnimationFrame(game.loop)
}
game.loop()
