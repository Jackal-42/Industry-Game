var previousMouseX = 0;
var previousMouseY = 0;
var facilityDisplayed = 0;
var mouseDownX = 0;
var mouseDownY = 0;

//Rotates the facility placement cursor when tapping Z
document.addEventListener("keydown", function (e) {
  if(e.keyCode == 82){
    facilityRotation += 90
    if(facilityRotation > 270){
      facilityRotation = 0
    }
    updateFacilitySelected()
  }
})

//Checks if the mouse has moved away from the temporary tooltip
game.window.addEventListener("mousemove", function(){
  for(var i = 0, l = temporaryTooltips.length; i < l; i++){
    var elementRect = temporaryTooltips[i].getBoundingClientRect()
    if(elementRect.left > game.mouseX + 12 || elementRect.right < game.mouseX - 6 || elementRect.top > game.mouseY + 12 || elementRect.bottom < game.mouseY - 6){
      if(document.getElementsByClassName("tooltip").length == 1){
        temporaryTooltips[i].remove()
      }
      temporaryTooltips.splice(i, 1)
      i--
      l--
      checkTemporaryTooltip()
    }
  }
})

var facilityDisplayedData;
var facilityDisplayedIndex;

//Checks for a couple things, listed below
game.window.addEventListener("click", function (e) {
  try{
  var tooltipsActive = document.getElementsByClassName("tooltip")
  //Deletes all tooltips if they are clicked off of
  if(checkTooltipClick < 0){
    for(var i = 0, l = tooltipsActive.length; i < l; i++){
      tooltipsActive[0].remove()
    }
  }else{
    if(checkTooltipClick === undefined){checkTooltipClick = 0}
    var incrementer = 0
    for(var i = 0, l = tooltipsActive.length; i < l; i++){
      if(tooltipsActive[incrementer].name > checkTooltipClick){  
        tooltipsActive[incrementer].remove()
      }else{
        incrementer++
      }
    }
    checkTooltipClick = -1
  }
  if((mouseDownX != mouseX || mouseDownY != mouseY) && conduitSelected != "facility"){return}

  //Tries to place a facility on the map
  if(conduitSelected == "facility" && canPlaceFacility){
        
    var facilityPlotX = Math.floor((game.mouseX + scrollX/4)/(32))
    var facilityPlotY = Math.floor((game.mouseY + scrollY/4)/(32))

    // for(var k = 0, kl = facilitySelectedLayout.length; k < kl; k++){

    //   if(getMapData(facilityPlotX + facilitySelectedLayout[k][0], facilityPlotY + facilitySelectedLayout[k][1], "activeLayer") != "-" || getTile("terrain", getMapData(facilityPlotX + facilitySelectedLayout[k][0], facilityPlotY + facilitySelectedLayout[k][1], "baseLayer"))[0].substring(0, 5) != "grass"){
    //     return;
    //   }
    // }

    var facilitySelectedData = getFacility(facilitySelected)

    for(var k = 0, kl = facilitySelectedLayout.length; k < kl; k++){
      if(facilitySelectedData.pseudoPipe == true){
        if(!(conduits[0].segments + "-").includes(getMapData(facilityPlotX + facilitySelectedLayout[k][0], facilityPlotY + facilitySelectedLayout[k][1], "activeLayer"))){
          return;
        }
      }else{
        if(getMapData(facilityPlotX + facilitySelectedLayout[k][0], facilityPlotY + facilitySelectedLayout[k][1], "activeLayer") != "-" || getTile("terrain", getMapData(facilityPlotX + facilitySelectedLayout[k][0], facilityPlotY + facilitySelectedLayout[k][1], "baseLayer"))[0].substring(0, 5) != "grass"){
          return;
        }
      }
    }
    addPipe(facilityPlotX, facilityPlotY, "erase")
    createNetwork(facilityPlotX, facilityPlotY, facilitySelected, ("rotation = " + facilityRotation))
    return;
  }

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

  if(areas[areaIndex].networks[facilityID].name == "t_valve"){
    if(areas[areaIndex].networks[facilityID].data.direction == "left"){
      areas[areaIndex].networks[facilityID].data.direction = "right"
    }else{
      areas[areaIndex].networks[facilityID].data.direction = "left"
    }
    return;
  }
  if(areas[areaIndex].networks[facilityID].name == "one_way_pipe"){
    return;
  }

  var str = areas[areaIndex].networks[facilityID].name 
  document.getElementById('facilityShown').innerHTML = str.charAt(0).toUpperCase() + str.slice(1);

  facilityDisplayedData = getFacility(str)
  facilityDisplayedIndex = facilityID

  try{
    document.getElementById('facilityShownDescription').innerHTML = ""
    for(var i = 0, l = tooltips.length; i < l; i++){
      if(tooltips[i].name == "hotbar_" + facilityDisplayedData.name)
      document.getElementById('facilityShownDescription').innerHTML = tooltips[i].text
    }


    
  }catch{}

  var tooltipRanges = document.getElementsByClassName("tooltipRange")
  for(var i = 0, l = tooltipRanges.length; i < l; i++){
    tooltipRanges[0].remove()
  }

  var rangeHeight = ((window.innerWidth*0.4) * 0.3)/2
  var rangeSubHeight = ((window.innerWidth*0.4) * 0.3)/2.5

  var facilityShownWidth = rangeSubHeight
  var facilityShownHeight = rangeSubHeight
  var arrowWidth = rangeSubHeight

  if(facilityDisplayedData.width > facilityDisplayedData.height){
    facilityShownHeight = rangeSubHeight/(facilityDisplayedData.width/facilityDisplayedData.height)
    arrowWidth = facilityShownHeight
  }
  if(facilityDisplayedData.height > facilityDisplayedData.width){
    facilityShownWidth = rangeSubHeight/(facilityDisplayedData.height/facilityDisplayedData.width)
    arrowWidth = facilityShownWidth
  }
  if(facilityDisplayedData.width == 2 && facilityDisplayedData.height == 2){arrowWidth = ((window.innerHeight*0.4) * 0.6)/4}

  var newTooltipRange;
  for(var i = 0, l = facilityDisplayedData.ports.length; i < l; i++){
    newTooltipRange = document.createElement("button")
    newTooltipRange.classList.add("tooltipRange")

    newTooltipRange.style.left = (rangeHeight + (facilityShownWidth/-2)) + arrowWidth*facilityDisplayedData.ports[i].x + (arrowWidth/6) + "px"

    newTooltipRange.style.top = (rangeHeight + (facilityShownHeight/-2)) + arrowWidth*facilityDisplayedData.ports[i].y + (arrowWidth/8) + ((window.innerHeight*0.9)/100)*6 + "px"

    newTooltipRange.style.height = arrowWidth + "px"
    newTooltipRange.style.width = arrowWidth + "px"

    if(facilityDisplayedData.ports[i].x == facilityDisplayedData.width){
      newTooltipRange.style.width = arrowWidth*1.5 + "px"
    }else if(facilityDisplayedData.ports[i].x == -1){
      newTooltipRange.style.width = arrowWidth*1.5 + "px"
      newTooltipRange.style.left = (rangeHeight + (facilityShownWidth/-2)) + arrowWidth*facilityDisplayedData.ports[i].x + (arrowWidth/6) - arrowWidth*0.5 + "px"
    }else if(facilityDisplayedData.ports[i].y == -1){
      newTooltipRange.style.height = arrowWidth*1.5 + "px"
      newTooltipRange.style.top = (rangeHeight + (facilityShownHeight/-2)) + arrowWidth*facilityDisplayedData.ports[i].y + (arrowWidth/8) - arrowWidth*0.5 + ((window.innerHeight*0.9)/100)*6 + "px"
    }else{
      newTooltipRange.style.height = arrowWidth*1.5 + "px"
    }

    if(facilityDisplayedData.ports[i].gender[1].length == 1){
      if(facilityDisplayedData.ports[i].gender[1][0] == "null"){
        var genderString = ""
        if(facilityDisplayedData.ports[i].gender[0] == "output"){genderString = "output"}else if(facilityDisplayedData.ports[i].gender[0] == "input"){genderString = "receive"}else if(facilityDisplayedData.ports[i].gender[0] == "modular"){genderString = "output OR receive"}
        eval("newTooltipRange.onclick = function(){createCustomTooltip(\"<p style=\\\"margin-left: 3px; font-family: \\\'Pixellari\\\'; color: rgb(69, 69, 69);\\\">This port can "+genderString+" any item</p>\")}")
      }else{
        eval("newTooltipRange.onclick = function(){createTooltip(\"" + facilityDisplayedData.ports[i].gender[1][0] + "\")}")
      }
    }else{
      var rangeContent = "<p style=\\\"margin-left: 3px; font-family: \\\'Pixellari\\\'; color: rgb(69, 69, 69);\\\">"
      if(facilityDisplayedData.ports[i].gender[0] == "input"){
        rangeContent += "This port can receive:"
      }
      if(facilityDisplayedData.ports[i].gender[0] == "output"){
        rangeContent += "This port can output:"
      }
      rangeContent += "</p>" 

      for(var k = 0, kl = facilityDisplayedData.ports[i].gender[1].length; k < kl; k++){
        var rangeTitle = facilityDisplayedData.ports[i].gender[1][k].split("_")

        for(var j = 0, jl = rangeTitle.length; j < jl; j++){
          rangeTitle[j] = rangeTitle[j][0].toUpperCase() + rangeTitle[j].substr(1);
        }

        rangeTitle = rangeTitle.join(" ")

        rangeContent += "<button onclick=\\\"createTooltip(\\\'"+ facilityDisplayedData.ports[i].gender[1][k] +"\\\')\\\" class=\\\"tooltipBannerButton\\\"><img src=\\\"docs/assets/"+ facilityDisplayedData.ports[i].gender[1][k] +"_icon.png\\\"><span style=\\\"position: absolute; margin-top: 4px;\\\">"+rangeTitle+"</span></button>"
      }

      eval("newTooltipRange.onclick = function(){createCustomTooltip(\"" + rangeContent + "\")}")
    }

    document.getElementById("facilityShownRange").appendChild(newTooltipRange)
  }

  checkFacilityShownResources()
  document.getElementById('centerDisplay').style.display = "block"
  
  cacheCode("document.getElementById(\'centerDisplay\').style.top = \"30%\"; document.getElementById(\'centerDisplay\').style.opacity = \"1\";", 1)
  
  }catch(err){console.log(err)}

})

//Collapses and expands the debug menu
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
toggleDebugMenu()

//updates the search bar in the monitor variables tab
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

//Adds the button for monitoring a variable
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

function checkFacilityShownResources(){
  document.getElementById('facilityShownResources').innerHTML = ""
  try{
    if(facilityDisplayedData.name == "tank"){
      var str = areas[areaIndex].networks[facilityDisplayedIndex].data.storedItem.split("_")

      for(var j = 0, jl = str.length; j < jl; j++){
        str[j] = str[j][0].toUpperCase() + str[j].substr(1);
      }

      str = str.join(" ")



      document.getElementById('facilityShownResources').innerHTML = "<span class=\"tooltipLink\" onclick=\"createTooltip(\'"+ areas[areaIndex].networks[facilityDisplayedIndex].data.storedItem +"\')\">" + str + "</span>: " + eval("areas[areaIndex].networks[facilityDisplayedIndex].data." + areas[areaIndex].networks[facilityDisplayedIndex].data.storedItem)
    }
  }catch(err){}
}


document.getElementById('centerDisplay').style.display = 'none'

//The code that is executed each frame
game.loop = function(){

  canPlaceFacility = true

  //Updates monitored variables
  for(var i = 0, l = variablesMonitored.length; i < l; i++){
    document.getElementById(variablesMonitored[i]+"_monitor_view_span").innerHTML = eval(variablesMonitored[i])
  }

  //Renders the facility and arrows tutorial on the center display and adds the clickable tooltip spawners
  if(document.getElementById('centerDisplay').style.display == "block"){
    facilityShownCanvas.getContext("2d").clearRect(0, 0, 500, 500)
    var facilityShownWidth = 200
    var facilityShownHeight = 200
    var arrowWidth = 200
    if(facilityDisplayedData.width > facilityDisplayedData.height){
      facilityShownHeight = 200/(facilityDisplayedData.width/facilityDisplayedData.height)
      arrowWidth = facilityShownHeight
    }
    if(facilityDisplayedData.height > facilityDisplayedData.width){
      facilityShownWidth = 200/(facilityDisplayedData.height/facilityDisplayedData.width)
      arrowWidth = facilityShownWidth
    }
    if(facilityDisplayedData.width == 2 && facilityDisplayedData.height == 2){arrowWidth = 100}
    facilityShownCanvas.getContext("2d").imageSmoothingEnabled = false
    facilityShownCanvas.getContext("2d").save()
    facilityShownCanvas.getContext("2d").translate(250, 250)

    facilityShownCanvas.getContext("2d").drawImage(game.getTexture(facilityDisplayedData.name), facilityShownWidth/-2, facilityShownHeight/-2, facilityShownWidth, facilityShownHeight)

    facilityShownCanvas.getContext("2d").restore()
    for(var i = 0, l = facilityDisplayedData.ports.length; i < l; i++){
      facilityShownCanvas.getContext("2d").save()
      facilityShownCanvas.getContext("2d").translate((250 + (facilityShownWidth/-2)) + arrowWidth*facilityDisplayedData.ports[i].x + (arrowWidth/2), (250 + (facilityShownHeight/-2)) + arrowWidth*facilityDisplayedData.ports[i].y + (arrowWidth/2))

      var arrowRotation = 0;
      if(facilityDisplayedData.ports[i].x == facilityDisplayedData.width){arrowRotation = (270*(Math.PI/180))}else if(facilityDisplayedData.ports[i].x == -1){arrowRotation = (90*(Math.PI/180))}else if(facilityDisplayedData.ports[i].y == -1){arrowRotation = (180*(Math.PI/180))}

      facilityShownCanvas.getContext("2d").rotate(arrowRotation)

      var portTypeImage;
      if(facilityDisplayedData.ports[i].gender[1].length == 1 && facilityDisplayedData.ports[i].gender[0] != "modular"){portTypeImage = facilityDisplayedData.ports[i].gender[1][0] + "_icon"}else{portTypeImage = "any_oil_icon"}
      if(facilityDisplayedData.ports[i].gender[0] == "output" || (facilityDisplayedData.ports[i].gender[0] == "modular" && (framesElapsed/20) % (Math.PI*2) < (Math.PI))){
        facilityShownCanvas.getContext("2d").rotate(180*(Math.PI/180))
        facilityShownCanvas.getContext("2d").drawImage(game.getTexture("facility_arrow"), (arrowWidth/-2), (arrowWidth/-3.7) + Math.sin(framesElapsed/20)*(arrowWidth/20), arrowWidth, arrowWidth)

        if(facilityDisplayedData.ports[i].gender[0] == "modular"){
          facilityShownCanvas.getContext("2d").translate(0, (arrowWidth/-4.7) + Math.sin(framesElapsed/20)*(arrowWidth/20) - (arrowWidth/4))
        }else{
          facilityShownCanvas.getContext("2d").translate(0, (arrowWidth/-3.7) + Math.sin(framesElapsed/20)*(arrowWidth/20) - (arrowWidth/4))
        }

        facilityShownCanvas.getContext("2d").rotate(arrowRotation*-1)
        facilityShownCanvas.getContext("2d").rotate(180*(Math.PI/180))

        facilityShownCanvas.getContext("2d").drawImage(game.getTexture(portTypeImage), (arrowWidth/-2), (arrowWidth/-2), arrowWidth, arrowWidth)
      }else{
        facilityShownCanvas.getContext("2d").drawImage(game.getTexture("facility_arrow"), (arrowWidth/-2), (arrowWidth/-1.7) + Math.sin(framesElapsed/20)*(arrowWidth/20), arrowWidth, arrowWidth)

        facilityShownCanvas.getContext("2d").translate(0, (arrowWidth/-1.7) + Math.sin(framesElapsed/20)*(arrowWidth/20) + (arrowWidth))

        facilityShownCanvas.getContext("2d").rotate(arrowRotation*-1)

        facilityShownCanvas.getContext("2d").drawImage(game.getTexture(portTypeImage), (arrowWidth/-2), (arrowWidth/-2), arrowWidth, arrowWidth)
      }
      facilityShownCanvas.getContext("2d").restore()
    }
  }

  var conduitIndex = getConduitIndex(conduitSelected)

  //Executes the cached code if it has been long enough
  for(var i = 0, l = cachedCode.length; i < l; i++){
    cachedCode[i].delay--
    if(cachedCode[i].delay <= 0){
      eval(cachedCode[i].data)
      cachedCode.splice(i, 1)
      i--
      l--
    }
  }

  //Scrolling on the map
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
  
  //Updates all the game objects
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
  //Connects to the nearest pipe when letting go of the mouse button
  if(endMouseHold && conduitSelected != "facility"){
    mouseX = Math.floor((game.mouseX + scrollX/4)/(32))
    mouseY = Math.floor((game.mouseY + scrollY/4)/(32))
    addPipe(mouseX, mouseY)
  }
  
  
  previousMouseX = Math.floor((previousMouseX)/(32))
  previousMouseY = Math.floor((previousMouseY)/(32))
  //nothing to see here
  mouseX = Math.floor((game.mouseX + scrollX/4)/(32));if(document.getElementById("luigi") == null || document.getElementById("luigi").width == 0){document.getElementById("luigiSpeak").innerHTML="oh-a no<br>i'm-a not here<br>"; throw "NoLuigiException: Luigi is required for the game to run\n    at framework.js:420:69"}
  mouseY = Math.floor((game.mouseY + scrollY/4)/(32))
  if(mouseX < 0){mouseX = 0}
  if(mouseY < 0){mouseY = 0}

  if(debugging){
    document.getElementById("cursorX").innerHTML = mouseX
    document.getElementById("cursorY").innerHTML = mouseY
    document.getElementById("dataAtCursor").innerHTML = tiles[tileIds.indexOf(getMapData(mouseX, mouseY))][0]
  }
  
  if(conduitSelected != "erase" && conduitSelected != "facility"){
    if(conduits[conduitIndex].endPoints.includes(getMapData(mouseX, mouseY))){
      previousPipeX = mouseX;
      previousPipeY = mouseY;
    }
  }

  //Determines if the mouse has moved more than one tile in a frame, and adds or removes pipes in a line from the mouse's previous position to the current one, making sure to fill in any corners
  if(mouseDown && document.getElementById('centerDisplay').style.display == 'none' && conduitSelected != "facility"){
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

        if(facility1.name == "t_valve"){
          if(facilities[facility1DataIndex].ports[areas[k].links[i].facility1[1]].direction != facility1.data.direction && facilities[facility1DataIndex].ports[areas[k].links[i].facility1[1]].direction != "center"){
            continue;
          }
        }

        if(facility2.name == "t_valve"){
          if(facilities[facility2DataIndex].ports[areas[k].links[i].facility2[1]].direction != facility2.data.direction && facilities[facility2DataIndex].ports[areas[k].links[i].facility2[1]].direction != "center"){
            continue;
          }
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

          if(facility1.name == "valve" || facility2.name == "valve"){

            if(facility1.data.outputs == 0){facility1.data.outputs = 1}

            if(facility2.data.outputs == 0){facility2.data.outputs = 1}


            if(!(facility1.data.inputs === undefined) && !(facility2.data.inputs === undefined)){
              if(facility1.data.storedItem == 0 && facility2.data.storedItem == 0){continue;}

              if(facility1.data.storedItem == 0 && facility2.data.canDistribute){
                facility2.data.outputs++
                eval("facility2.data." + facility2.data.storedItem + " -= " + 1/(facility2.data.outputs))
                eval("facility1.data." + facility2.data.storedItem + " += " + 1/(facility2.data.outputs))
                facility1.data.storedItem = facility2.data.storedItem
              }
              if(facility2.data.storedItem == 0 && facility1.data.canDistribute){
                facility1.data.outputs++
                eval("facility1.data." + facility1.data.storedItem + " -= " + 1/(facility1.data.outputs))
                eval("facility2.data." + facility1.data.storedItem + " += " + 1/(facility1.data.outputs))
                facility2.data.storedItem = facility1.data.storedItem
              }
              if(facility1.data.storedItem == facility2.data.storedItem){
                if(facility1.data.inputs >= 1 && facility2.data.inputs == 0){
                  facility1.data.outputCheck++

                  if(eval("facility2.data." + facility1.data.storedItem + " >= " + facilities[facility1DataIndex].maxItems)){continue}

                  if(facility1.data.canDistribute){
                    eval("facility1.data." + facility1.data.storedItem + " -= " + 1/(facility1.data.outputs))
                    eval("facility2.data." + facility1.data.storedItem + " += " + 1/(facility1.data.outputs))
                  }
                }
                if(facility2.data.inputs >= 1 && facility1.data.inputs == 0){
                  facility2.data.outputCheck++

                  if(eval("facility1.data." + facility2.data.storedItem + " >= " + facilities[facility2DataIndex].maxItems)){continue}

                  if(facility2.data.canDistribute){
                    eval("facility2.data." + facility2.data.storedItem + " -= " + 1/(facility2.data.outputs))
                    eval("facility1.data." + facility2.data.storedItem + " += " + 1/(facility2.data.outputs))
                  }
                }
              }
            }
            if(!(facility1.data.inputs === undefined) && (facility2.data.inputs === undefined)){
              if(facility1.data.storedItem != 0){
                if(facility2.data.storedItem != 0 && facility2.data.storedItem != facility1.data.storedItem){continue}
                facility1.data.outputCheck++

                if(!(facility1.data.canDistribute)){continue}

                facility2.data.storedItem = facility1.data.storedItem

                if(eval("facility2.data." + facility2.data.storedItem + ">=" +  facilities[facility2DataIndex].maxItems)){
                  continue;
                }

                eval("facility1.data." + facility1.data.storedItem + " -= " + 1/facility1.data.outputs)
                eval("facility2.data." + facility1.data.storedItem + " += " + 1/facility1.data.outputs)
                facility2.data.storedItem = facility1.data.storedItem
              }else{
                facility1.data.storedItem = facility2.data.storedItem

                if(facility2.data.storedItem == 0 || eval("facility1.data." + facility1.data.storedItem + ">=" +  facilities[facility1DataIndex].maxItems)){
                  continue;
                }
                eval("facility2.data." + facility2.data.storedItem + " -= " + 1)
                eval("facility1.data." + facility2.data.storedItem + " += " + 1)

                
              }
            }
            if(!(facility2.data.inputs === undefined) && (facility1.data.inputs === undefined)){
              if(facility2.data.storedItem != 0){

                if(facility1.data.storedItem != 0 && facility1.data.storedItem != facility2.data.storedItem){continue}

                facility2.data.outputCheck++

                if(!(facility2.data.canDistribute)){continue}

                facility1.data.storedItem = facility2.data.storedItem

                if(eval("facility1.data." + facility1.data.storedItem + ">=" +  facilities[facility1DataIndex].maxItems)){
                  continue;
                }

                eval("facility2.data." + facility2.data.storedItem + " -= " + 1/facility2.data.outputs)
                eval("facility1.data." + facility2.data.storedItem + " += " + 1/facility2.data.outputs)
              }else{
                facility2.data.storedItem = facility1.data.storedItem

                if(facility1.data.storedItem == 0 || eval("facility2.data." + facility2.data.storedItem + ">=" +  facilities[facility2DataIndex].maxItems)){
                  continue;
                }
                eval("facility1.data." + facility1.data.storedItem + " -= " + 1)
                eval("facility2.data." + facility1.data.storedItem + " += " + 1)
              }
            }
          }
        }


        if(facilities[facility1DataIndex].ports[areas[k].links[i].facility1[1]].gender[0] == "output" || genderResolve == "output"){
          if(facilities[facility2DataIndex].ports[areas[k].links[i].facility2[1]].gender[0] == "output"){
            break;
          }
          try{
            if(facilities[facility2DataIndex].name == "valve"){facility2.data.inputCheck++}

            var movingItems = facilities[facility1DataIndex].ports[areas[k].links[i].facility1[1]].gender[1]

            if(facilities[facility1DataIndex].ports[areas[k].links[i].facility1[1]].gender[1][0] == "null"){
              movingItems = fluids.slice()
            }
            
            var amountTransferred = 1;
            if(facility1.name == "valve"){
              facility1.data.outputCheck++
              
              amountTransferred = 1/facility1.data.outputs
            }
            for(var j = 0, jl = movingItems.length; j < jl; j++){
              if(isModular2 && !(facility2.data.storedItem == 0 || movingItems[j] == facility2.data.storedItem || eval("facility2.data." + facility2.data.storedItem + " < 1"))){
                continue;
              }
              if(!(facilities[facility2DataIndex].ports[areas[k].links[i].facility2[1]].gender[1].includes(movingItems[j])) && !(facilities[facility2DataIndex].ports[areas[k].links[i].facility2[1]].gender[1][0] == "null")){continue}

              if(eval("facility1.data." + movingItems[j]) >= 1){
                if(isModular2){facility2.data.storedItem = movingItems[j]}
                if(eval("facility2.data." + movingItems[j]+ ">=" + facilities[facility2DataIndex].maxItems)){continue}
                eval("facility1.data." + movingItems[j] + " -= " + amountTransferred)
                eval("facility2.data." + movingItems[j] + " += " + amountTransferred)
              }
            }
          }catch(err){console.log(err)}
        }else if(facilities[facility1DataIndex].ports[areas[k].links[i].facility1[1]].gender[0] == "input" || genderResolve == "input"){
          if(facilities[facility2DataIndex].ports[areas[k].links[i].facility2[1]].gender[0] == "input"){
            break;
          }
          try{

            if(facilities[facility1DataIndex].name == "valve"){facility1.data.inputCheck++}

            var movingItems = facilities[facility2DataIndex].ports[areas[k].links[i].facility2[1]].gender[1]

            if(facilities[facility2DataIndex].ports[areas[k].links[i].facility2[1]].gender[1][0] == "null"){
              movingItems = fluids.slice()
            }

            var amountTransferred = 1;
            if(facility2.name == "valve"){
              facility2.data.outputCheck++
              
              amountTransferred = 1/facility2.data.outputs
            }
            for(var j = 0, jl = movingItems.length; j < jl; j++){
              if(isModular1 && !(facility1.data.storedItem == 0 || movingItems[j] == facility1.data.storedItem || eval("facility1.data." + facility1.data.storedItem + " < 1"))){
                continue;
              }
              if(!(facilities[facility1DataIndex].ports[areas[k].links[i].facility1[1]].gender[1].includes(movingItems[j])) && !(facilities[facility1DataIndex].ports[areas[k].links[i].facility1[1]].gender[1][0] == "null")){continue}
              
              if(eval("facility2.data." + movingItems[j]) >= 1){

                if(isModular1){facility1.data.storedItem = movingItems[j]}
                if(eval("facility1.data." + movingItems[j] + ">=" + facilities[facility1DataIndex].maxItems)){continue}
                eval("facility2.data." + movingItems[j] + " -= " + amountTransferred)
                eval("facility1.data." + movingItems[j] + " += " + amountTransferred)
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
              if(eval("areas[k].networks[i].data." + facilities[j].storage[a] + ">" + facilities[j].maxItems)){eval("areas[k].networks[i].data." + facilities[j].storage[a] + " = " + facilities[j].maxItems)}
            }
          }
        }
      }
    }


    checkFacilityShownResources()
  }

  if(facilitySelected == "one_way_pipe"){
    if(tiles[tileIds.indexOf(getMapData(mouseX, mouseY))][0].slice(-2) == "hh"){
      if(facilityRotation == 0){
        facilityRotation = 90
      }
      if(facilityRotation == 180){
        facilityRotation = 270
      }
    }else if(tiles[tileIds.indexOf(getMapData(mouseX, mouseY))][0].slice(-2) == "vv"){
      if(facilityRotation == 90){
        facilityRotation = 180
      }
      if(facilityRotation == 270){
        facilityRotation = 0
      }
    }
  }

  //Draws each of the facilities
  for(var i = 0, l = areas[areaIndex].networks.length; i < l; i++){
    if(areas[areaIndex].networks[i].name != "pipeSegment"){
      ctx.save()
      ctx.translate(((areas[areaIndex].networks[i].points[0][0] * 32) - scrollX/4) + 16, ((areas[areaIndex].networks[i].points[0][1] * 32) - scrollY/4) + 16)
      ctx.rotate(areas[areaIndex].networks[i].rotation * (Math.PI/180))
      var facilityTextureName = areas[areaIndex].networks[i].name
      if(areas[areaIndex].networks[i].name == "t_valve"){
        if(areas[areaIndex].networks[i].data.direction == "left"){
          facilityTextureName = "t_valve_left"
        }else{
          facilityTextureName = "t_valve_right"
        }
      }
      var facilityTexture = game.getTexture(facilityTextureName)
      ctx.drawImage(facilityTexture, -16, -16, facilityTexture.width * 2, facilityTexture.height * 2)
      ctx.restore()
    }
  }

  
  //Draws the water layer
  ctx = game.getLayer("water").context
  ctx.globalCompositeOperation = "source-over"
  ctx.imageSmoothingEnabled = false

  ctx.globalAlpha = 0.6;
  ctx.drawImage(document.getElementById("waterCanvas"), (scrollX/4) * -1, (scrollY/4) * -1, 2048, 1280)
  ctx.globalAlpha = 1;

  //Randomly spawns ripples
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

  
  ctx = game.getLayer("water").context
  ctx.globalCompositeOperation = "source-over"

  ctx.globalAlpha = (Math.sin(framesElapsed/8) + 2)/4
  
  ctx.fillStyle = "yellow"

  var cursorWidth = 32;
  var cursorHeight = 32;

  //Draws the cursor or an image of the selected facility
  if(conduitSelected == "facility"){
    rotationDisplay.style.display = "block"
    var facilitySelectedData = getFacility(facilitySelected)
    cursorWidth = facilitySelectedData.width*32
    cursorHeight = facilitySelectedData.height*32
    ctx.save()
    ctx.translate((mouseX*32)-scrollX/4 + 16, (mouseY*32)-scrollY/4 + 16)
    ctx.rotate(facilityRotation * (Math.PI/180))
    var facilityPlotX = Math.floor((game.mouseX + scrollX/4)/(32))
    var facilityPlotY = Math.floor((game.mouseY + scrollY/4)/(32))
    var validPlot = true;

    for(var k = 0, kl = facilitySelectedLayout.length; k < kl; k++){
      if(facilitySelectedData.pseudoPipe == true){
        if(!(conduits[0].segments + "-").includes(getMapData(facilityPlotX + facilitySelectedLayout[k][0], facilityPlotY + facilitySelectedLayout[k][1], "activeLayer"))){
          validPlot = false;
        }
      }else{
        if(getMapData(facilityPlotX + facilitySelectedLayout[k][0], facilityPlotY + facilitySelectedLayout[k][1], "activeLayer") != "-" || getTile("terrain", getMapData(facilityPlotX + facilitySelectedLayout[k][0], facilityPlotY + facilitySelectedLayout[k][1], "baseLayer"))[0].substring(0, 5) != "grass"){
          validPlot = false;
        }
      }
    }

    var facilitySelectedTexture = facilitySelected

    if(facilitySelectedData.name == "t_valve"){
      facilitySelectedTexture = "t_valve_left"
    }

    if(validPlot){
      ctx.drawImage(game.getTexture(facilitySelectedTexture), -16, -16, cursorWidth, cursorHeight)
    }else{
      ctx.drawImage( tint( facilitySelectedTexture, "red", 0.5), -16, -16, cursorWidth, cursorHeight)
    }
    
    
    ctx.restore()
  }else{
    rotationDisplay.style.display = "none"
    ctx.fillRect((mouseX*32)-scrollX/4, (mouseY*32)-scrollY/4, cursorWidth, cursorHeight)
  }

  ctx = game.getLayer("water").context


  
  //The fade screen transition that occurs when switching areas
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
      fadeOpacity = 1
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
  framesElapsed++
  requestAnimationFrame(game.loop)
}
game.loop()
