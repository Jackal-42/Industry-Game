var previousMouseX = 0;
var previousMouseY = 0;
var facilityDisplayed = 0;
var mouseDownX = 0;
var mouseDownY = 0;

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
  if(mouseDownX != mouseX || mouseDownY != mouseY){return}

  if(conduitSelected == "erase"){return}

  var facilityString = JSON.stringify([Math.floor((game.mouseX + scrollX/4)/(32)), Math.floor((game.mouseY + scrollY/4)/(32))])

  var facilityID = undefined

  for(var i = 0, l = areas[areaIndex].networks.length; i < l; i++){
    if(areas[areaIndex].networks[i].name != "pipeSegment"){
      var areaString = JSON.stringify(areas[areaIndex].networks[i].points)
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

  var str = areas[areaIndex].networks[facilityID].name

  document.getElementById('facilityShownImage').src="docs/assets/" + str + ".png"
  document.getElementById('facilityShown').innerHTML = str.charAt(0).toUpperCase() + str.slice(1);


  document.getElementById('centerDisplay').style.display = "block"
  
  cacheCode("document.getElementById(\'centerDisplay\').style.top = \"30%\"; document.getElementById(\'centerDisplay\').style.opacity = \"1\";", 1)
  

})

function toggleDebugMenu(){
  if(document.getElementById('debugExpander').innerHTML == '-'){

    document.getElementById('debugExpander').innerHTML = '+'
    document.getElementById('menus').style.display = 'none'
    document.getElementById('debug').style.height = 'auto'
    document.getElementById('debug').style.width = '150px'
  }else{
    
    document.getElementById('debugExpander').innerHTML = '-'
    document.getElementById('menus').style.display = 'block'
    document.getElementById('debug').style.height = '400px'
    document.getElementById('debug').style.width = '250px'
  }
}

document.getElementById("monitorVariableInput").addEventListener('input', function monitorSearch(){
  document.getElementById("searchResults").innerHTML = ""
  var results = "";
  var variablesInUse = Object.keys(window)
  var keyword = document.getElementById("monitorVariableInput").value
  if(keyword == ""){return;}
  for(var i = 0, l = variablesInUse.length; i < l; i++){
    if(variablesInUse[i].includes(keyword)){
      results += "<button onclick=\"monitor(\'"+variablesInUse[i]+"\')\">" + variablesInUse[i] + "</button>"
    }
  }
  document.getElementById("searchResults").innerHTML += results

})

var variablesMonitored = [];

function monitor(variable){
  document.getElementById("monitorVariableInput").value = ""
  document.getElementById("searchResults").innerHTML = ""
  variablesMonitored.push(variable)
  document.getElementById("monitoring").innerHTML += "<button onclick=\"stopMonitoring(\'"+variable+"\')\" id=\""+variable+"_monitor_view\"><span class=\"leftSpan\">"+variable+"</span><span id=\""+variable+"_monitor_view_span\" class=\"rightSpan\"></span></button>"
}

function stopMonitoring(variable){
  document.getElementById(variable+"_monitor_view").remove()
  variablesMonitored.splice(variablesMonitored.indexOf(variable), 1)
}


document.getElementById('centerDisplay').style.display = 'none'
game.loop = function(){

  for(var i = 0, l = variablesMonitored.length; i < l; i++){
    document.getElementById(variablesMonitored[i]+"_monitor_view_span").innerHTML = eval(variablesMonitored[i])
  }

  var conduitIndex = getConduitIndex(conduitSelected)

  for(var i = 0, l = cachedCode.length; i < l; i++){
    cachedCode[i].delay--
    if(cachedCode[i].delay <= 0){
      eval(cachedCode[i].data)
      cachedCode.splice(i, 1)
      i--
      l--
    }
  }

  if(key("left")){
    if(scrollX > 0){
      scrollX += -23
      if(scrollX < 0){scrollX = 0}
    }
  }
  if(key("right")){
    scrollX += 23
    if(scrollX/4 > 2048 - offsetWidth){scrollX = (2048 - offsetWidth)*4}
  }
  if(key("up")){
    scrollY += -23
    if(scrollY < 0){scrollY = 0}
  }
  if(key("down")){
    scrollY += 23
    if(scrollY/4 > 1280 - offsetHeight){scrollY = (1280 - offsetHeight)*4}
  }


  // if(document.getElementById('centerDisplay').style.opacity == "0"){
  //   document.getElementById('centerDisplay').style.display = "none"
  // }else{
  //   document.getElementById('centerDisplay').style.display = "block"
  // }

  

  document.getElementById("funds").innerHTML = funds


  for(var i = 0, l = game.layers.length; i < l; i++){  
    if(game.layers[i].clearFrames == true){  
      game.layers[i].clear();
    }
  }

  ctx = game.getLayer("terrain").context
  

  ctx.drawImage(document.getElementById("terrainCanvas"), (scrollX/4) * -1, (scrollY/4) * -1, 2048, 1280)

  ctx = game.getLayer("main").context
  
  game.tick()
  beginMouseHold = false;
  endMouseHold = false;
  //Calculates if a pipe is beginning or ending
  if(!mouseDownPreviously && mouseDown){
    beginMouseHold = true
    mouseDownX = mouseX;
    mouseDownY = mouseY;

  }
  if(mouseDownPreviously && !mouseDown){
    endMouseHold = true
  }
  if(endMouseHold){
    mouseX = Math.floor((game.mouseX + scrollX/4)/(32))
    mouseY = Math.floor((game.mouseY + scrollY/4)/(32))
    addPipe(mouseX, mouseY)
  }
  
  
  previousMouseX = Math.floor((previousMouseX)/(32))
  previousMouseY = Math.floor((previousMouseY)/(32))
  mouseX = Math.floor((game.mouseX + scrollX/4)/(32));if(document.getElementById("luigi") == null || document.getElementById("luigi").width == 0){document.getElementById("luigiSpeak").innerHTML="oh-a no<br>i'm-a not here<br>"; throw "NoLuigiException: Luigi is required for the game to run\n    at framework.js:420:69"}
  mouseY = Math.floor((game.mouseY + scrollY/4)/(32))
  if(mouseX < 0){mouseX = 0}
  if(mouseY < 0){mouseY = 0}
  var selector = game.getObject("selector")
  selector.x = (mouseX*32)-scrollX/4
  selector.y = (mouseY*32)-scrollY/4
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
  if(mouseDown && document.getElementById('centerDisplay').style.display == 'none'){
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
  previousMouseX = game.mouseX + scrollX/4;
  previousMouseY = game.mouseY + scrollY/4;

  if(previousMouseX < 0){previousMouseX = 0}
  if(previousMouseY < 0){previousMouseY = 0}

  //Transfers items along working links. Evaluates 4 times per second.
  if(framesElapsed % 15 == 1){
    for(var k = 0, lll = areas.length; k < lll; k++){
      for(var i = 0, l = areas[k].networks.length; i < l; i++){
        if(areas[k].networks[i].name == "pipeSegment"){continue}
        for(var j = 0, jl = facilities.length; j < jl; j++){
          if(facilities[j].name == areas[k].networks[i].name){
            facilities[j].process(areas[k].networks[i])
          }
        }
      }
    }

    for(var k = 0, lll = areas.length; k < lll; k++){
      for(var i = 0, l = areas[k].links.length; i < l; i++){
        var facility1 = getNetwork(k, areas[k].links[i].facility1[0])
        var facility2 = getNetwork(k, areas[k].links[i].facility2[0])
        var facility1DataIndex = 0;
        var facility2DataIndex = 0;
        for(var j = 0, ll = facilities.length; j < ll; j++){
          if(facilities[j].name == facility1.name){
            facility1DataIndex = j;
          }
          if(facilities[j].name == facility2.name){
            facility2DataIndex = j;
          }
        }

        var genderResolve = "null"

        var isModular1 = false;
        var isModular2 = false;

        if(facilities[facility1DataIndex].ports[areas[k].links[i].facility1[1]].gender[0] == "modular"){
          isModular1 = true;
          if(facilities[facility2DataIndex].ports[areas[k].links[i].facility2[1]].gender[0] == "output"){
            genderResolve = "input"
          }else if(facilities[facility2DataIndex].ports[areas[k].links[i].facility2[1]].gender[0] == "input"){
            genderResolve = "output"
          }
        }

        if(facilities[facility2DataIndex].ports[areas[k].links[i].facility2[1]].gender[0] == "modular"){
          isModular2 = true;
        }

        if(isModular1 && isModular2){

          //Tank-to-tank tranfer makes the contents of two tanks evenly distributed
          if(facility1.name == "tank" && facility2.name == "tank"){
            if(facility1.data.storedItem != 0){
              if(facility2.data.storedItem == 0 || facility2.data.storedItem == facility1.data.storedItem){
                var totalSharedItems = eval("facility1.data." + facility1.data.storedItem) + eval("facility2.data." + facility1.data.storedItem)

                eval("facility1.data." + facility1.data.storedItem + " = " + totalSharedItems/2)
                eval("facility2.data." + facility1.data.storedItem + " = " + totalSharedItems/2)
                facility2.data.storedItem = facility1.data.storedItem
              }
            }

            if(facility2.data.storedItem != 0){
              if(facility1.data.storedItem == 0 || facility1.data.storedItem == facility2.data.storedItem){
                var totalSharedItems = eval("facility2.data." + facility2.data.storedItem) + eval("facility1.data." + facility2.data.storedItem)

                eval("facility2.data." + facility2.data.storedItem + " = " + totalSharedItems/2)
                eval("facility1.data." + facility2.data.storedItem + " = " + totalSharedItems/2)
                facility1.data.storedItem = facility2.data.storedItem
              }
            }
          }
        }


        if(facilities[facility1DataIndex].ports[areas[k].links[i].facility1[1]].gender[0] == "output" || genderResolve == "output"){
          if(facilities[facility2DataIndex].ports[areas[k].links[i].facility2[1]].gender[0] == "output"){
            break;
          }
          try{
            var movingItems = facilities[facility1DataIndex].ports[areas[k].links[i].facility1[1]].gender[1]

            if(isModular1){
              movingItems = fluids.slice()
            }
            for(var j = 0, jl = movingItems.length; j < jl; j++){
              if(isModular2 && !(facility2.data.storedItem == 0 || movingItems[j] == facility2.data.storedItem)){
                continue;
              }
              if(!(facilities[facility2DataIndex].ports[areas[k].links[i].facility2[1]].gender[1].includes(movingItems[j])) && !isModular2){continue}
              if(eval("facility1.data." + movingItems[j]) >= 1){
                if(isModular2){facility2.data.storedItem = movingItems[j]}
                eval("facility1.data." + movingItems[j] + " -= 1")
                eval("facility2.data." + movingItems[j] + " += 1")
              }
            }
          }catch(err){console.log(err)}
        }else if(facilities[facility1DataIndex].ports[areas[k].links[i].facility1[1]].gender[0] == "input" || genderResolve == "input"){
          if(facilities[facility2DataIndex].ports[areas[k].links[i].facility2[1]].gender[0] == "input"){
            break;
          }
          try{
            var movingItems = facilities[facility2DataIndex].ports[areas[k].links[i].facility2[1]].gender[1]

            if(isModular2){
              movingItems = fluids.slice()
            }

            for(var j = 0, jl = movingItems.length; j < jl; j++){
              if(isModular1 && !(facility1.data.storedItem == 0 || movingItems[j] == facility1.data.storedItem)){
                continue;
              }
              if(!(facilities[facility1DataIndex].ports[areas[k].links[i].facility1[1]].gender[1].includes(movingItems[j])) && !isModular1){continue}
              if(eval("facility2.data." + movingItems[j]) >= 1){
                if(isModular1){facility1.data.storedItem = movingItems[j]}
                eval("facility2.data." + movingItems[j] + " -= 1")
                eval("facility1.data." + movingItems[j] + " += 1")
              }
            }
          }catch(err){console.log(err)}
        }
      }
      for(var i = 0, l = areas[k].networks.length; i < l; i++){
        if(areas[k].networks[i].name == "pipeSegment"){continue}
        for(var j = 0, jl = facilities.length; j < jl; j++){
          if(facilities[j].name == areas[k].networks[i].name){
            for(var a = 0, al = facilities[j].storage.length; a < al; a++){
              if(eval("areas[k].networks[i].data." + facilities[j].storage[a]) > facilities[j].maxItems){eval("areas[k].networks[i].data." + facilities[j].storage[a] + " = " + facilities[j].maxItems)}
            }
          }
        }
      }
    }
  }

  try{
    document.getElementById('facilityShownResources').innerHTML = ""
    for(var i = 0, l = Object.keys(areas[areaIndex].networks[facilityDisplayed].data).length; i < l; i++){
      document.getElementById('facilityShownResources').innerHTML += Object.keys(areas[areaIndex].networks[facilityDisplayed].data)[i].capitalize() + ": " + eval("areas[areaIndex].networks[facilityDisplayed].data." + Object.keys(areas[areaIndex].networks[facilityDisplayed].data)[i]) + "<br>"
    }
    
  }catch{}

  

  for(var i = 0, l = areas[areaIndex].networks.length; i < l; i++){
    if(areas[areaIndex].networks[i].name != "pipeSegment"){
      ctx.drawImage(game.getTexture(areas[areaIndex].networks[i].name), (areas[areaIndex].networks[i].points[0][0] * 32) - scrollX/4, (areas[areaIndex].networks[i].points[0][1] * 32) - scrollY/4, game.getTexture(areas[areaIndex].networks[i].name).width * 2, game.getTexture(areas[areaIndex].networks[i].name).height * 2)
    }
  }


  ctx = game.getLayer("water").context
  ctx.globalCompositeOperation = "source-over"
  ctx.imageSmoothingEnabled = false

  ctx.globalAlpha = 0.6;
  ctx.drawImage(document.getElementById("waterCanvas"), (scrollX/4) * -1, (scrollY/4) * -1, 2048, 1280)
  ctx.globalAlpha = 1;

  for( var i = 0, l = activeOverlay.length; i < l; i++){
    if(activeOverlay[i].type == "ripple"){
      ctx.globalCompositeOperation = "source-atop"
      ctx.strokeStyle = "rgb(200, 200, 255)"
      ctx.globalAlpha = (2-(activeOverlay[i].data.age/100))
      ctx.beginPath()
      ctx.arc((activeOverlay[i].x*32)-scrollX/4 + 16, (activeOverlay[i].y*32)-scrollY/4 + 16, 1 + activeOverlay[i].data.age/8, 0, 2 * Math.PI);
      ctx.stroke()
      activeOverlay[i].data.age++
      if(activeOverlay[i].data.age > 200){
        activeOverlay.splice(i, 1)
        i--
        l--
      }
      ctx.globalAlpha = 1;
    }
  }
  for( var i = 0, l = activeOverlay.length; i < l; i++){
    if(activeOverlay[i].type == "pipe"){
      ctx.save()
      ctx.globalCompositeOperation = "source-over"
      ctx.translate((activeOverlay[i].x*32)-scrollX/4+16, (activeOverlay[i].y*32)-scrollY/4+16)
      ctx.rotate(activeOverlay[i].rotation)
      ctx.drawImage(game.getTexture(activeOverlay[i].texture), -16, -16, 32, 32)
      if(framesElapsed % 4 == 1 && Math.random() < 0.005){
        activeOverlay.push(new Overlay("ripple", "null", activeOverlay[i].x, activeOverlay[i].y, 0))
      }
      ctx.restore()
    }
  }

  game.render()
  ctx = game.getLayer("main").context

  
  ctx.drawImage(game.getTexture(conduitSelected + "_icon"), (game.mouseX + 16), (game.mouseY + 16), 16, 16)
  
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
    ctx.fillRect(0, 0, offsetWidth, offsetHeight)
    ctx.globalAlpha = 1;
  }
  mouseDownPreviously = false;
  if(mouseDown){mouseDownPreviously = true;}
  requestAnimationFrame(game.loop)
}
game.loop()
