var previousMouseX = 0;
var previousMouseY = 0;
var facilityDisplayed = 0;
var mouseDownX = 0;
var mouseDownY = 0;


var indicatorBoxX = window.innerWidth * 0.5;
var indicatorBoxY = window.innerHeight * 0.875;
var indicatorBoxWidth = 0;
var indicatorBoxHeight = 0;
var trueIndicatorBoxX = window.innerWidth * 0.5;
var trueIndicatorBoxY = window.innerHeight * 0.875;
var trueIndicatorBoxWidth = 0;
var trueIndicatorBoxHeight = 0;
var shownIndicatorBoxWidth = 0;
var shownIndicatorBoxHeight = 0;

var indicatorBoxXDifference = 0;
var indicatorBoxYDifference = 0;
var indicatorBoxWidthDifference = 0;
var indicatorBoxHeightDifference = 0;
var indicatorBoxTransitionTimer = 0;

var lockedIndicatorBoxX = 0;
var lockedIndicatorBoxY = 0;

var interactBlockBoxLeft = document.createElement("div")
var interactBlockBoxRight = document.createElement("div")
var interactBlockBoxTop = document.createElement("div")
var interactBlockBoxBottom = document.createElement("div")

interactBlockBoxLeft.innerHTML = "&nbsp;"
interactBlockBoxRight.innerHTML = "&nbsp;"
interactBlockBoxTop.innerHTML = "&nbsp;"
interactBlockBoxBottom.innerHTML = "&nbsp;"

interactBlockBoxLeft.className = "interactBlockBox"
interactBlockBoxRight.className = "interactBlockBox"
interactBlockBoxTop.className = "interactBlockBox"
interactBlockBoxBottom.className = "interactBlockBox"

document.body.appendChild(interactBlockBoxLeft)
document.body.appendChild(interactBlockBoxRight)
document.body.appendChild(interactBlockBoxTop)
document.body.appendChild(interactBlockBoxBottom)

var tutorial = [
  {
    text: "<p>Welcome to INSERTNAME, where you step into the shoes of an oil manufacturer after the Industrial Revolution. This tutorial will show you the ropes of oil production.</p> <br> <button onclick=\"tutorialNext()\">Next</button>",
    action: function(){
      //0
      trueIndicatorBoxX = (window.innerWidth/50) + 1
      trueIndicatorBoxY = (window.innerHeight/50) + 9
      trueIndicatorBoxWidth = 60
      trueIndicatorBoxHeight = 60
      shownIndicatorBoxWidth = 60
      shownIndicatorBoxHeight = 60
    },
  },

  {
    text: "<p>Click on the hammer icon to open the Build Menu.</p>",
    //1
    action: function(){
      trueIndicatorBoxX = (window.innerWidth/50) + 1
      trueIndicatorBoxY = (window.innerHeight/50) + 199 + 9
      trueIndicatorBoxWidth = 60
      trueIndicatorBoxHeight = 60
      shownIndicatorBoxWidth = 60
      shownIndicatorBoxHeight = 60
    },
  },

  {
    text: "<p>Then, expand the Facilities sub-menu.</p>",
    action: function(){
      //2
      trueIndicatorBoxX = (window.innerWidth/50) + 1 + 66
      trueIndicatorBoxY = (window.innerHeight/50) + 199 + 9
      trueIndicatorBoxWidth = 60
      trueIndicatorBoxHeight = 60
      shownIndicatorBoxWidth = 60
      shownIndicatorBoxHeight = 60
    },
  },

  {
    text: "<p>Click this button to select the Distiller facility. It processes crude oil into many products.</p>",
    action: function(){
      //3
      lockIndicatorBox = true
      lockedIndicatorBoxX = 26
      lockedIndicatorBoxY = 11
      trueIndicatorBoxWidth = 32
      trueIndicatorBoxHeight = 32
      shownIndicatorBoxWidth = 32
      shownIndicatorBoxHeight = 32
    },
  },

  {
    text: "<p>Place the distiller down by clicking on the map. Use arrow keys to scroll.</p>",
    action: function(){
      //4
      lockIndicatorBox = false
      trueIndicatorBoxX = (window.innerWidth/50) + 1
      trueIndicatorBoxY = (window.innerHeight/50) + 67 + 9
      trueIndicatorBoxWidth = 60
      trueIndicatorBoxHeight = 60
      shownIndicatorBoxWidth = 60
      shownIndicatorBoxHeight = 60
    },
  },

  {
    text: "<p>Next, navigate to the cursor tool.</p>",
    action: function(){
      //5
      lockIndicatorBox = false
      trueIndicatorBoxX = (window.innerWidth/50) + 66 + 1
      trueIndicatorBoxY = (window.innerHeight/50) + 67 + 9
      trueIndicatorBoxWidth = 60
      trueIndicatorBoxHeight = 60
      shownIndicatorBoxWidth = 60
      shownIndicatorBoxHeight = 60
    },
  },

  {
    text: "<p>Next, navigate to the cursor tool.</p>",
    action: function(){
      //6
      lockIndicatorBox = true
      lockedIndicatorBoxX = 26
      lockedIndicatorBoxY = 11
      trueIndicatorBoxWidth = 32
      trueIndicatorBoxHeight = 64
      shownIndicatorBoxWidth = 32
      shownIndicatorBoxHeight = 64
    },
  },

  {
    text: "<p>Click on the placed distiller to see its properties</p>",
    action: function(){
      //7
      lockIndicatorBox = false
      trueIndicatorBoxX = window.innerWidth * 0.3 + 4;
      trueIndicatorBoxY = window.innerHeight * 0.3 + 4;
      trueIndicatorBoxWidth = window.innerWidth * 0.4 - 4;
      trueIndicatorBoxHeight = window.innerHeight * 0.4 - 4;
      shownIndicatorBoxWidth = window.innerWidth * 0.4 - 4;
      shownIndicatorBoxHeight = window.innerHeight * 0.4 - 4;
    },
  },

  {
    text: "<p>This is the Distiller's Infographic. Each of the arrows corresponds to either an input or an output port. Click on each of the oil drop icons to see what resources they input or output.</p> <br> <button onclick=\"tutorialNext()\">Next</button>",
    action: function(){
      //8
      
    },
  },

  {
    text: "<p>You can see that because the only arrows that point into the distiller show crude oil, the distiller needs a crude oil input to work.</p> <br> <button onclick=\"tutorialNext()\">Next</button>",
    action: function(){
      //9
      var rect = document.getElementById("closeCenterDisplay").getBoundingClientRect()
      trueIndicatorBoxX = rect.left;
      trueIndicatorBoxY = rect.top;
      trueIndicatorBoxWidth = window.innerHeight * 0.04
      trueIndicatorBoxHeight = window.innerHeight * 0.04
      shownIndicatorBoxWidth = window.innerHeight * 0.04
      shownIndicatorBoxHeight = window.innerHeight * 0.04
    },
  },

  {
    text: "<p>Navigate to the Oil Pump</p>",
    action: function(){
      //10
      trueIndicatorBoxX = (window.innerWidth/50) + 1
      trueIndicatorBoxY = (window.innerHeight/50) + 265 + 9
      trueIndicatorBoxWidth = 60
      trueIndicatorBoxHeight = 60
      shownIndicatorBoxWidth = 60
      shownIndicatorBoxHeight = 60
    },
  },

  {
    text: "<p>Navigate to the Oil Pump</p>",
    action: function(){
      //11
      trueIndicatorBoxX = (window.innerWidth/50) + 1 + 66
      trueIndicatorBoxY = (window.innerHeight/50) + 265 + 9
      trueIndicatorBoxWidth = 60
      trueIndicatorBoxHeight = 60
      shownIndicatorBoxWidth = 60
      shownIndicatorBoxHeight = 60
    },
  },

  {
    text: "<p>Navigate to the Oil Pump</p>",
    action: function(){
      //12
      lockIndicatorBox = true
      lockedIndicatorBoxX = 22
      lockedIndicatorBoxY = 11
      trueIndicatorBoxWidth = 32
      trueIndicatorBoxHeight = 32
      shownIndicatorBoxWidth = 32
      shownIndicatorBoxHeight = 32
    },
  },

  {
    text: "<p>Place it near the distiller.</p>",
    action: function(){
      //13
      lockIndicatorBox = false
      trueIndicatorBoxX = (window.innerWidth/50) + 1
      trueIndicatorBoxY = (window.innerHeight/50) + 133 + 9
      trueIndicatorBoxWidth = 60
      trueIndicatorBoxHeight = 60
      shownIndicatorBoxWidth = 60
      shownIndicatorBoxHeight = 60
    },
  },

  {
    text: "<p>Select the Pipe Tool</p>",
    action: function(){
      //14
      lockIndicatorBox = false
      trueIndicatorBoxX = (window.innerWidth/50) + 1 + 66
      trueIndicatorBoxY = (window.innerHeight/50) + 133 + 9
      trueIndicatorBoxWidth = 60
      trueIndicatorBoxHeight = 60
      shownIndicatorBoxWidth = 60
      shownIndicatorBoxHeight = 60
    },
  },

  {
    text: "<p>Select the Pipe Tool</p>",
    action: function(){
      //15
      lockIndicatorBox = true
      lockedIndicatorBoxX = 22
      lockedIndicatorBoxY = 11
      trueIndicatorBoxWidth = 160
      trueIndicatorBoxHeight = 32
      shownIndicatorBoxWidth = 160
      shownIndicatorBoxHeight = 32
    },
  },

  {
    text: "<p>And drag between the two to link them up!</p>",
    action: function(){
      //16
      lockIndicatorBox = true
      lockedIndicatorBoxX = 26
      lockedIndicatorBoxY = 11
      trueIndicatorBoxWidth = 32
      trueIndicatorBoxHeight = 64
      shownIndicatorBoxWidth = 32
      shownIndicatorBoxHeight = 64
    },
  },

  {
    text: "<p>Let's check on the infographic. (Clicking on it with the pipe tool works just like the cursor)</p>",
    action: function(){
      //17
      lockIndicatorBox = false
      trueIndicatorBoxX = window.innerWidth * 0.3 + 4;
      trueIndicatorBoxY = window.innerHeight * 0.3 + 4;
      trueIndicatorBoxWidth = window.innerWidth * 0.4 - 4;
      trueIndicatorBoxHeight = window.innerHeight * 0.4 - 4;
      shownIndicatorBoxWidth = window.innerWidth * 0.4 - 4;
      shownIndicatorBoxHeight = window.innerHeight * 0.4 - 4;
    },
  },

  {
    text: "<p>The arrow we linked the pipe to turned green! That's a good sign. Click on the red drop of oil to see more information about that.</p> <br> <button onclick=\"tutorialNext()\">Next</button>",
    action: function(){
      //18
    },
  },

  {
    text: "<p>We need to refine that naphtha before we can sell it and make money.</p> <br> <button onclick=\"tutorialNext()\">Next</button>",
    action: function(){
      //19
      var rect = document.getElementById("closeCenterDisplay").getBoundingClientRect()
      trueIndicatorBoxX = rect.left;
      trueIndicatorBoxY = rect.top;
      trueIndicatorBoxWidth = window.innerHeight * 0.04
      trueIndicatorBoxHeight = window.innerHeight * 0.04
      shownIndicatorBoxWidth = window.innerHeight * 0.04
      shownIndicatorBoxHeight = window.innerHeight * 0.04
    },
  },

  {
    text: "<p>Grab a hydrotreater</p>",
    action: function(){
      //20
      lockIndicatorBox = false
      trueIndicatorBoxX = (window.innerWidth/50) + 1 + 264
      trueIndicatorBoxY = (window.innerHeight/50) + 9 + 199
      trueIndicatorBoxWidth = 60
      trueIndicatorBoxHeight = 60
      shownIndicatorBoxWidth = 60
      shownIndicatorBoxHeight = 60
    },
  },

  {
    text: "<p>Grab a hydrotreater</p>",
    action: function(){
      //21
      lockIndicatorBox = true
      lockedIndicatorBoxX = 29
      lockedIndicatorBoxY = 11
      trueIndicatorBoxWidth = 32
      trueIndicatorBoxHeight = 32
      shownIndicatorBoxWidth = 32
      shownIndicatorBoxHeight = 32
    },
  },

  {
    text: "<p>Grab a hydrotreater</p>",
    action: function(){
      //22
      lockIndicatorBox = false
      trueIndicatorBoxX = (window.innerWidth/50) + 1 + 132
      trueIndicatorBoxY = (window.innerHeight/50) + 265 + 9
      trueIndicatorBoxWidth = 60
      trueIndicatorBoxHeight = 60
      shownIndicatorBoxWidth = 60
      shownIndicatorBoxHeight = 60
    },
  },

  {
    text: "<p>And a hydrogen pump</p>",
    action: function(){
      //23
      lockIndicatorBox = true
      lockedIndicatorBoxX = 29
      lockedIndicatorBoxY = 8
      trueIndicatorBoxWidth = 32
      trueIndicatorBoxHeight = 32
      shownIndicatorBoxWidth = 32
      shownIndicatorBoxHeight = 32
    },
  },

  {
    text: "<p>And a hydrogen pump</p>",
    action: function(){
      //24
      lockIndicatorBox = false
      trueIndicatorBoxX = (window.innerWidth/50) + 1 + 66
      trueIndicatorBoxY = (window.innerHeight/50) + 133 + 9
      trueIndicatorBoxWidth = 60
      trueIndicatorBoxHeight = 60
      shownIndicatorBoxWidth = 60
      shownIndicatorBoxHeight = 60
    },
  },

  {
    text: "<p>Finally, connect them all together.</p>",
    action: function(){
      //25
      lockIndicatorBox = true
      lockedIndicatorBoxX = 29
      lockedIndicatorBoxY = 8
      trueIndicatorBoxWidth = 32
      trueIndicatorBoxHeight = 128
      shownIndicatorBoxWidth = 32
      shownIndicatorBoxHeight = 128
    },
  },

  {
    text: "<p>Finally, connect them all together.</p>",
    action: function(){
      //26
      lockIndicatorBox = true
      lockedIndicatorBoxX = 26
      lockedIndicatorBoxY = 11
      trueIndicatorBoxWidth = 128
      trueIndicatorBoxHeight = 32
      shownIndicatorBoxWidth = 128
      shownIndicatorBoxHeight = 32
    },
  },

  {
    text: "<p>Finally, connect them all together.</p>",
    action: function(){
      //27
      lockIndicatorBox = true
      lockedIndicatorBoxX = 30
      lockedIndicatorBoxY = 11
      trueIndicatorBoxWidth = 256
      trueIndicatorBoxHeight = 32
      shownIndicatorBoxWidth = 256
      shownIndicatorBoxHeight = 32
    },
  },

  {
    text: "<p>Finally, connect them all together.</p>",
    action: function(){
      //28
      lockIndicatorBox = false
      trueIndicatorBoxX = window.innerWidth * 0.5;
      trueIndicatorBoxY = window.innerHeight * 0.875;
      trueIndicatorBoxWidth = 0
      trueIndicatorBoxHeight = 0
      shownIndicatorBoxWidth = 0
      shownIndicatorBoxHeight = 0
    },
  },

  {
    text: "<p>You've just connected a pipe up to the tanker ship, where the naphtha you produced is being sold for a profit. You can pump oil into the six ports on either side of the ship.</p> <br> <button onclick=\"tutorialNext()\">Next</button>",
    action: function(){
      //29
      
    },
  },

  {
    text: "<p>The distiller produces more than just naphtha. Make sure to fully utilize all of its outputs, and make the most of tooltips and the infigraphic menus. That's all for the tutorial. Have fun!</p> <br> <button onclick=\"tutorialNext()\">Next</button>",
    action: function(){
      //29
      lockIndicatorBox = false
      drawIndicatorLine = false
      trueIndicatorBoxX = 16 + window.innerWidth * 0.5;
      trueIndicatorBoxY = 16 + window.innerHeight * 0.5;
      trueIndicatorBoxWidth = 32
      trueIndicatorBoxHeight = 32
      shownIndicatorBoxWidth = 32
      shownIndicatorBoxHeight = 32
      document.getElementById("tutorialDisplay").style.top = "120%"
      mouseDown = false
      setTimeout(function(){
        trueIndicatorBoxX = -20
        trueIndicatorBoxY = -20
        trueIndicatorBoxWidth = window.innerWidth + 40
        trueIndicatorBoxHeight = window.innerHeight + 40
        shownIndicatorBoxWidth = window.innerWidth + 40
        shownIndicatorBoxHeight = window.innerHeight + 40
        doingTutorial = false
        mouseDown = false
      }, 1000)
      
    },
  },

  {
    text: "<p>toodles</p>",
    action: function(){
      //28
    },
  },
]

var tutorialIndex = -1;
function tutorialNext(){
  tutorialIndex++
  document.getElementById("tutorialContent").innerHTML = tutorial[tutorialIndex].text
  try{tutorial[tutorialIndex-1].action()}catch{}
}
tutorialNext()

window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  console.log(errorObj)
  game.loop()
}

function debug(){
  if(debugging){
    debugging = false
    document.getElementById("debug").style.display = "none"
  }else{
    debugging = true
    document.getElementById("debug").style.display = "block"
  }
}

//Rotates the facility placement cursor when tapping R or Z
document.addEventListener("keydown", function (e) {
  if(doingTutorial){return}
  if(e.keyCode == 82 || e.keyCode == 90){
    facilityRotation += 90
    if(facilityRotation > 270){
      facilityRotation = 0
    }
    updateFacilitySelected()
  }
  if(e.keyCode == 188){
    placeableIndex--
    checkPlaceableIndex()
    selectPlaceable(previousPlaceables[placeableIndex], true)
  }
  if(e.keyCode == 190){
    placeableIndex++
    checkPlaceableIndex()
    selectPlaceable(previousPlaceables[placeableIndex], true)
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
  if(tutorialIndex == 16 || tutorialIndex == 26 || tutorialIndex == 27 || tutorialIndex == 28){
    return;
  }
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
    if(tutorialIndex == 4 || tutorialIndex == 13 || tutorialIndex == 22 || tutorialIndex == 24){tutorialNext()}
        
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
  if(facilityDisplayedData.width == 2 && facilityDisplayedData.height == 2){
    facilityShownWidth = rangeSubHeight
    facilityShownHeight = rangeSubHeight
    arrowWidth = rangeSubHeight*0.5
  }
  
  if(facilityDisplayedData.width == 1 && facilityDisplayedData.height == 1){
    facilityShownWidth = rangeSubHeight*0.6
    facilityShownHeight = rangeSubHeight*0.6
    arrowWidth = rangeSubHeight*0.6
  }

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

  document.getElementById("facilityShownWarnings").innerHTML = ""


  if(areas[areaIndex].networks[facilityID].warnings.length >= 1){
    for(var i = 0, l = areas[areaIndex].networks[facilityID].warnings.length; i < l; i++){
      document.getElementById("facilityShownWarnings").innerHTML += "<img src=\'docs/assets/warning.png\'>" + areas[areaIndex].networks[facilityID].warnings[i][0] + "<br>"
    }
  }

  if(areas[areaIndex].networks[facilityID].name == "any_source"){
    document.getElementById('facilityShownDescription').innerHTML = "<input id=\"anySourceTypeSet\" type=\"text\" value=\""+areas[areaIndex].networks[facilityID].data.sourceType+"\"><br><button onclick=\"areas[areaIndex].networks["+facilityID+"].data.sourceType = document.getElementById(\'anySourceTypeSet\').value\">Set Type</button>"
  }

  if(tutorialIndex == 7 || tutorialIndex == 17){tutorialNext()}

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

function toggleGuidebook(){
  if(lockIndicatorBox){return}
  if(document.getElementById('guidebookExpander').innerHTML == '-'){

    document.getElementById('guidebookExpander').innerHTML = '+'
    document.getElementById('guidebook').style.display = 'none'
  }else{
    
    document.getElementById('guidebookExpander').innerHTML = '-'
    document.getElementById('guidebook').style.display = 'block'
  }
}

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

  if(tutorialIndex == 16){
    if(getMapData(23, 11) == "~" && getMapData(24, 11) == "~" && getMapData(25, 11) == "~"){
      tutorialNext()
    }
  }
  if(tutorialIndex == 26){
    if(getMapData(29, 9) == "1" && getMapData(29, 10) == "1"){
      tutorialNext()
    }
  }
  if(tutorialIndex == 27){
    if(getMapData(27, 11) == "~" && getMapData(28, 11) == "~"){
      tutorialNext()
    }
  }
  if(tutorialIndex == 28){
    if(getMapData(31, 11) == "~" && getMapData(32, 11) == "~" && getMapData(33, 11) == "~" && getMapData(34, 11) == "~" && getMapData(35, 11) == "~" && getMapData(36, 11) == "~"){
      tutorialNext()
    }
  }

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

    if(facilityShownWidth == 200 && facilityShownWidth == 200 && arrowWidth == 200){
      facilityShownWidth = 120
      facilityShownHeight = 120
      arrowWidth = 120
    }
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
      if(facilityDisplayedData.ports[i].gender[1].length == 1 && facilityDisplayedData.ports[i].gender[1][0] != "null"){portTypeImage = facilityDisplayedData.ports[i].gender[1][0] + "_icon"}else{portTypeImage = "any_oil_icon"}
      if(facilityDisplayedData.ports[i].gender[0] == "output" || (facilityDisplayedData.ports[i].gender[0] == "modular" && (framesElapsed/20) % (Math.PI*2) < (Math.PI))){
        facilityShownCanvas.getContext("2d").rotate(180*(Math.PI/180))
        if(areas[areaIndex].networks[facilityDisplayedIndex].data.portsInUse[i]){
          facilityShownCanvas.getContext("2d").drawImage(game.getTexture("active_facility_arrow"), (arrowWidth/-2), (arrowWidth/-3.7) + Math.sin(framesElapsed/20)*(arrowWidth/20), arrowWidth, arrowWidth)
        }else{
          facilityShownCanvas.getContext("2d").drawImage(game.getTexture("facility_arrow"), (arrowWidth/-2), (arrowWidth/-3.7) + Math.sin(framesElapsed/20)*(arrowWidth/20), arrowWidth, arrowWidth)
        }

        if(facilityDisplayedData.ports[i].gender[0] == "modular"){
          facilityShownCanvas.getContext("2d").translate(0, (arrowWidth/-4.7) + Math.sin(framesElapsed/20)*(arrowWidth/20) - (arrowWidth/4))
        }else{
          facilityShownCanvas.getContext("2d").translate(0, (arrowWidth/-3.7) + Math.sin(framesElapsed/20)*(arrowWidth/20) - (arrowWidth/4))
        }

        facilityShownCanvas.getContext("2d").rotate(arrowRotation*-1)
        facilityShownCanvas.getContext("2d").rotate(180*(Math.PI/180))

        facilityShownCanvas.getContext("2d").drawImage(game.getTexture(portTypeImage), (arrowWidth/-2), (arrowWidth/-2), arrowWidth, arrowWidth)
      }else{
        if(areas[areaIndex].networks[facilityDisplayedIndex].data.portsInUse[i]){
          facilityShownCanvas.getContext("2d").drawImage(game.getTexture("active_facility_arrow"), (arrowWidth/-2), (arrowWidth/-1.7) + Math.sin(framesElapsed/20)*(arrowWidth/20), arrowWidth, arrowWidth)
        }else{
          facilityShownCanvas.getContext("2d").drawImage(game.getTexture("facility_arrow"), (arrowWidth/-2), (arrowWidth/-1.7) + Math.sin(framesElapsed/20)*(arrowWidth/20), arrowWidth, arrowWidth)
        }

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
    if(lockIndicatorBox){mouseDown = false}
    if(scrollX > 0){
      scrollX += -23
      if(scrollX < 0){scrollX = 0}
    }
  }
  if(key("right")){
    if(lockIndicatorBox){mouseDown = false}
    scrollX += 23
    if(scrollX/4 > 2048 - offsetWidth){scrollX = (2048 - offsetWidth)*4}
  }
  if(key("up")){
    if(lockIndicatorBox){mouseDown = false}
    scrollY += -23
    if(scrollY < 0){scrollY = 0}
  }
  if(key("down")){
    if(lockIndicatorBox){mouseDown = false}
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

  if(lockIndicatorBox){
    trueIndicatorBoxX = (lockedIndicatorBoxX*32)-scrollX/4
    trueIndicatorBoxY = (lockedIndicatorBoxY*32)-scrollY/4
  }

  if(indicatorBoxX != trueIndicatorBoxX || indicatorBoxY != trueIndicatorBoxY){
    indicatorBoxXDifference = trueIndicatorBoxX - indicatorBoxX
    indicatorBoxYDifference = trueIndicatorBoxY - indicatorBoxY
    if(indicatorBoxXDifference < 10 && indicatorBoxYDifference < 10 && lockIndicatorBox){
      indicatorBoxX = trueIndicatorBoxX
      indicatorBoxY = trueIndicatorBoxY
      indicatorBoxWidth = shownIndicatorBoxWidth
      indicatorBoxHeight = shownIndicatorBoxHeight
    }else{
      indicatorBoxWidthDifference = shownIndicatorBoxWidth - indicatorBoxWidth
      indicatorBoxHeightDifference = shownIndicatorBoxHeight - indicatorBoxHeight
      indicatorBoxTransitionTimer = 4
    }
  }
  if(indicatorBoxTransitionTimer > 0){
    indicatorBoxTransitionTimer--
    indicatorBoxX += indicatorBoxXDifference/4
    indicatorBoxY += indicatorBoxYDifference/4
    indicatorBoxWidth += indicatorBoxWidthDifference/4
    indicatorBoxHeight += indicatorBoxHeightDifference/4
  }else{
    indicatorBoxX = trueIndicatorBoxX
    indicatorBoxY = trueIndicatorBoxY
    indicatorBoxWidth = shownIndicatorBoxWidth
    indicatorBoxHeight = shownIndicatorBoxHeight
  }

  interactBlockBoxLeft.style.left = trueIndicatorBoxX - window.innerWidth + "px"
  interactBlockBoxRight.style.left = trueIndicatorBoxX + trueIndicatorBoxWidth + "px"
  interactBlockBoxTop.style.top = trueIndicatorBoxY - window.innerWidth + "px"
  interactBlockBoxBottom.style.top = trueIndicatorBoxY + trueIndicatorBoxHeight + "px"


  ctx = game.getLayer("tutorial").context
  ctx.globalAlpha = 0.75
  ctx.fillStyle="black"
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
  ctx.globalAlpha = 1
  ctx.fillStyle = "rgb(255, 255, "+(Math.sin(framesElapsed/10)*60)+")"
  ctx.strokeStyle = ctx.fillStyle
  ctx.imageSmoothingEnabled = true;

  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(window.innerWidth * 0.5, window.innerHeight * 0.875)
  ctx.lineTo(indicatorBoxX + indicatorBoxWidth/2, indicatorBoxY + indicatorBoxHeight/2)
  if(drawIndicatorLine){ctx.stroke()}

  ctx.fillRect(indicatorBoxX - Math.sin(framesElapsed/10) - 4, indicatorBoxY - Math.sin(framesElapsed/10) - 4, indicatorBoxWidth + Math.sin(framesElapsed/10)*2 + 8, indicatorBoxHeight + Math.sin(framesElapsed/10)*2 + 8)
  ctx.clearRect(indicatorBoxX - Math.sin(framesElapsed/10), indicatorBoxY - Math.sin(framesElapsed/10), indicatorBoxWidth + Math.sin(framesElapsed/10)*2, indicatorBoxHeight + Math.sin(framesElapsed/10)*2)


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
    guideArrowsShown = false
    for(var i = 0, l = activeOverlay.length; i < l; i++){
      if(activeOverlay[i].type == "arrow"){
        activeOverlay.splice(i, 1)
        i--
        l--
      }
    }
  }
  //Connects to the nearest pipe when letting go of the mouse button
  if(endMouseHold && conduitSelected != "facility" && conduitSelected != "pointer"){
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
  
  //All righty-o, it seems that the code in this block actually prevents the game from functioning properly, so the variable updates have been commented out but I am keeping it just in case. Maybe a code remnant
  if(conduitSelected != "erase" && conduitSelected != "facility"){
    if(conduits[conduitIndex].endPoints.includes(getMapData(mouseX, mouseY))){
      // previousPipeX = mouseX;
      // previousPipeY = mouseY;
    }
  }

  //Determines if the mouse has moved more than one tile in a frame, and adds or removes pipes in a line from the mouse's previous position to the current one, making sure to fill in any corners
  if(mouseDown && document.getElementById('centerDisplay').style.display == 'none' && conduitSelected != "facility" && conduitSelected != "pointer"){
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
  

  if((framesElapsed + 5) % 15 == 1){
    checkUpgrades()
  }

  //Transfers items along working links. Evaluates 4 times per second.
  if(framesElapsed % 15 == 1){
    for(var k = 0, lll = areas.length; k < lll; k++){
      for(var i = 0, l = areas[k].networks.length; i < l; i++){
        areas[areaIndex].networks[i].warnings = []
        if(areas[k].networks[i].name == "pipeSegment"){continue}
        for(var j = 0, jl = areas[k].networks[i].data.portsInUse.length; j < jl; j++){
          areas[k].networks[i].data.portsInUse[j] = false
        }
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
            facility1.warnings = [];
            facility1.warnings.push(["An output port is connected to another facility\'s output port. Instead connect it to an input port.", areas[k].links[i].facility1[1]])
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
            var invalidInput = false
            var invalidInputType = ""
            var invalidInputPort = ""
            for(var j = 0, jl = movingItems.length; j < jl; j++){
              if(isModular2 && !(facility2.data.storedItem == 0 || movingItems[j] == facility2.data.storedItem || eval("facility2.data." + facility2.data.storedItem + " < 1"))){
                continue;
              }
              if(!(facilities[facility2DataIndex].ports[areas[k].links[i].facility2[1]].gender[1].includes(movingItems[j])) && !(facilities[facility2DataIndex].ports[areas[k].links[i].facility2[1]].gender[1][0] == "null")){if(eval("facility1.data." + movingItems[j]) >= 1){invalidInput = true; invalidInputType = movingItems[j]; invalidInputPort = facilities[facility2DataIndex].ports[areas[k].links[i].facility2[1]].gender[1].slice()}; continue}

              facility1.data.portsInUse[areas[k].links[i].facility1[1]] = true
              facility2.data.portsInUse[areas[k].links[i].facility2[1]] = true

              if(eval("facility1.data." + movingItems[j]) >= 1){
                if(isModular2){facility2.data.storedItem = movingItems[j]}
                if(eval("facility2.data." + movingItems[j]+ ">=" + facilities[facility2DataIndex].maxItems)){continue}
                eval("facility1.data." + movingItems[j] + " -= " + amountTransferred)
                eval("facility2.data." + movingItems[j] + " += " + amountTransferred)
              }
            }
          }catch(err){console.log(err)}

          facility2.warnings = []
          if(invalidInput){
            if(facility1.name == "any_source"){continue}
            var errorName = invalidInputType.split("_")

            for(var b = 0, bl = errorName.length; b < bl; b++){
              errorName[b] = errorName[b][0].toUpperCase() + errorName[b].substr(1);
            }

            errorName = errorName.join(" ")

            for(var a = 0, al = invalidInputPort.length; a < al; a++){
              var invalidPortName = invalidInputPort[a].split("_")

              for(var b = 0, bl = invalidPortName.length; b < bl; b++){
                invalidPortName[b] = invalidPortName[b][0].toUpperCase() + invalidPortName[b].substr(1);
              }
              invalidPortName = invalidPortName.join(" ")

              invalidInputPort[a] = invalidPortName

              if(a == al - 1 && al != 1){
                invalidInputPort[a] = "and " + invalidPortName
              }

            }

            invalidInputPort = invalidInputPort.join(", ")

            errorName = "A port is recieving " + errorName + ", but that port can only accept " + invalidInputPort
            if(!checkDuplicate(facility2.warnings, errorName)){
              facility2.warnings.push([errorName, areas[k].links[i].supportingConduit])
            }
            if(facility2.warnings.length == 0){
              facility2.warnings.push([errorName, areas[k].links[i].supportingConduit])
            }
            var invalidInputType = ""
            var invalidInputPort = ""
          }
        }else if(facilities[facility1DataIndex].ports[areas[k].links[i].facility1[1]].gender[0] == "input" || genderResolve == "input"){
          if(facilities[facility2DataIndex].ports[areas[k].links[i].facility2[1]].gender[0] == "input"){
            facility1.warnings = [];
            facility1.warnings.push(["An input port is connected to another facility\'s input port. Instead connect it to an output port.", areas[k].links[i].facility1[1]])
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
            var invalidInput = false

            facility1.data.portsInUse[areas[k].links[i].facility1[1]] = true
            facility2.data.portsInUse[areas[k].links[i].facility2[1]] = true

            var invalidInputType = "";
            var invalidInputPort = "";
            for(var j = 0, jl = movingItems.length; j < jl; j++){

              if(isModular1 && !(facility1.data.storedItem == 0 || movingItems[j] == facility1.data.storedItem || eval("facility1.data." + facility1.data.storedItem + " < 1"))){
                continue;
              }
              if(!(facilities[facility1DataIndex].ports[areas[k].links[i].facility1[1]].gender[1].includes(movingItems[j])) && !(facilities[facility1DataIndex].ports[areas[k].links[i].facility1[1]].gender[1][0] == "null")){if(eval("facility2.data." + movingItems[j]) >= 1){invalidInput = true; invalidInputType = movingItems[j]; invalidInputPort = facilities[facility1DataIndex].ports[areas[k].links[i].facility1[1]].gender[1].slice()}; continue}

              
              if(eval("facility2.data." + movingItems[j]) >= 1){

                if(isModular1){facility1.data.storedItem = movingItems[j]}
                if(eval("facility1.data." + movingItems[j] + ">=" + facilities[facility1DataIndex].maxItems)){continue}
                eval("facility2.data." + movingItems[j] + " -= " + amountTransferred)
                eval("facility1.data." + movingItems[j] + " += " + amountTransferred)
              }
            }
          }catch(err){console.log(err)}

          facility1.warnings = []
          if(invalidInput){
            if(facility2.name == "any_source"){continue}
            var errorName = invalidInputType.split("_")

            for(var b = 0, bl = errorName.length; b < bl; b++){
              errorName[b] = errorName[b][0].toUpperCase() + errorName[b].substr(1);
            }

            errorName = errorName.join(" ")

            for(var a = 0, al = invalidInputPort.length; a < al; a++){
              var invalidPortName = invalidInputPort[a].split("_")

              for(var b = 0, bl = invalidPortName.length; b < bl; b++){
                invalidPortName[b] = invalidPortName[b][0].toUpperCase() + invalidPortName[b].substr(1);
              }
              invalidPortName = invalidPortName.join(" ")

              invalidInputPort[a] = invalidPortName

              if(a == al - 1 && al != 1){
                invalidInputPort[a] = "and " + invalidPortName
              }

            }

            invalidInputPort = invalidInputPort.join(", ")

            errorName = "A port is recieving " + errorName + ", but that port can only accept " + invalidInputPort
            if(!checkDuplicate(facility1.warnings, errorName)){
              facility1.warnings.push([errorName, areas[k].links[i].supportingConduit])
            }
            if(facility1.warnings.length == 0){
              facility1.warnings.push([errorName, areas[k].links[i].supportingConduit])
            }

            var invalidInputType = ""
            var invalidInputPort = ""
          }
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
      if(areas[areaIndex].networks[i].name == "ship"){
        continue;
      }
      ctx.save()
      ctx.translate(((areas[areaIndex].networks[i].points[0][0] * 32) - scrollX/4) + 16, ((areas[areaIndex].networks[i].points[0][1] * 32) - scrollY/4) + 16)
      if(areas[areaIndex].networks[i].name == "ship"){
        ctx.translate(0, -32)
      }
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
      ctx.save()
      if(areas[areaIndex].networks[i].warnings.length >= 1){
        ctx.translate(((areas[areaIndex].networks[i].points[0][0] * 32) - scrollX/4), ((areas[areaIndex].networks[i].points[0][1] * 32) - scrollY/4))
        for(var j = 0, jl = facilities.length; j < jl; j++){
          if(facilities[j].name == areas[areaIndex].networks[i].name){
            if(areas[areaIndex].networks[i].rotation == 0){  
              ctx.drawImage(game.getTexture("warning"), -8 + facilities[j].width*32, -8, 16, 16)
            }
            if(areas[areaIndex].networks[i].rotation == 90){  
              ctx.drawImage(game.getTexture("warning"), 24, -8, 16, 16)
            }
            if(areas[areaIndex].networks[i].rotation == 180){  
              ctx.drawImage(game.getTexture("warning"), 24, 24 - facilities[j].height*32, 16, 16)
            }
            if(areas[areaIndex].networks[i].rotation == 270){  
              ctx.drawImage(game.getTexture("warning"), -8 + facilities[j].height*32, 24 - facilities[j].width*32, 16, 16)
            }
          }
        }
      }
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
      if(activeOverlay[i].rotation !== 0){
        ctx.arc((activeOverlay[i].x*32)-scrollX/4 + 16, (activeOverlay[i].y*32)-scrollY/4 + 16, (1 + activeOverlay[i].data.age/8)*4, 0, 2 * Math.PI);
      }else{
        ctx.arc((activeOverlay[i].x*32)-scrollX/4 + 16, (activeOverlay[i].y*32)-scrollY/4 + 16, 1 + activeOverlay[i].data.age/8, 0, 2 * Math.PI);
      }
      ctx.stroke()
      if(activeOverlay[i].rotation !== 0){
        activeOverlay[i].data.age += 0.4
      }else{ 
        activeOverlay[i].data.age += 0.6
      }
      
      if(activeOverlay[i].data.age > 200){
        activeOverlay.splice(i, 1)
        i--
        l--
      }
      ctx.globalAlpha = 1;
    }
  }

  ctx.globalCompositeOperation = "source-over"
  for(var i = 0, l = areas[areaIndex].networks.length; i < l; i++){
    if(areas[areaIndex].networks[i].name != "pipeSegment"){
      if(areas[areaIndex].networks[i].name != "ship"){
        continue;
      }
      ctx.save()
      ctx.translate(((areas[areaIndex].networks[i].points[0][0] * 32) - scrollX/4) + 16, ((areas[areaIndex].networks[i].points[0][1] * 32) - scrollY/4) + 16)
      if(areas[areaIndex].networks[i].name == "ship"){
        ctx.translate(0, -32)
      }
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
      if(framesElapsed % 4 == 1 && Math.random() < 0.015){
        activeOverlay.push(new Overlay("ripple", "null", areas[areaIndex].networks[i].points[0][0] + 0.5, areas[areaIndex].networks[i].points[0][1] + 0.5, 1))
      }
      ctx.save()
      if(areas[areaIndex].networks[i].warnings.length >= 1){
        ctx.translate(((areas[areaIndex].networks[i].points[0][0] * 32) - scrollX/4), ((areas[areaIndex].networks[i].points[0][1] * 32) - scrollY/4))
        for(var j = 0, jl = facilities.length; j < jl; j++){
          if(facilities[j].name == areas[areaIndex].networks[i].name){
            if(areas[areaIndex].networks[i].rotation == 0){  
              ctx.drawImage(game.getTexture("warning"), -8 + facilities[j].width*32, -8, 16, 16)
            }
            if(areas[areaIndex].networks[i].rotation == 90){  
              ctx.drawImage(game.getTexture("warning"), 24, -8, 16, 16)
            }
            if(areas[areaIndex].networks[i].rotation == 180){  
              ctx.drawImage(game.getTexture("warning"), 24, 24 - facilities[j].height*32, 16, 16)
            }
            if(areas[areaIndex].networks[i].rotation == 270){  
              ctx.drawImage(game.getTexture("warning"), -8 + facilities[j].height*32, 24 - facilities[j].width*32, 16, 16)
            }
          }
        }
      }
      ctx.restore()
    }
  }

  for( var i = 0, l = activeOverlay.length; i < l; i++){
    if(activeOverlay[i].type == "pipe" || activeOverlay[i].type == "arrow"){
      ctx.save()
      ctx.globalCompositeOperation = "source-over"

      ctx.translate((activeOverlay[i].x*32)-scrollX/4+16, (activeOverlay[i].y*32)-scrollY/4+16)

      ctx.rotate(activeOverlay[i].rotation)
      if(activeOverlay[i].type == "arrow"){ctx.translate(0, Math.sin(framesElapsed/20)*(2))}
      ctx.drawImage(game.getTexture(activeOverlay[i].texture), -16, -16, 32, 32)
      if(framesElapsed % 4 == 1 && Math.random() < 0.005 && activeOverlay[i].type == "pipe"){
        activeOverlay.push(new Overlay("ripple", "null", activeOverlay[i].x, activeOverlay[i].y, 0))
      }
      ctx.restore()
    }
  }

  game.render()

  
  ctx = game.getLayer("water").context
  ctx.globalCompositeOperation = "source-over"

  ctx.globalAlpha = (Math.sin(framesElapsed/8) + 1.6)/3
  
  ctx.fillStyle = "yellow"

  var cursorWidth = 32;
  var cursorHeight = 32;

  //Draws the cursor or an image of the selected facility
  if(conduitSelected == "facility"){
    rotationDisplay.style.display = "block"
    var facilitySelectedData = getFacility(facilitySelected)

    var arrowWidth = 32
    var facilityShownWidth = 32
    var facilityShownHeight = 32
    ctx.imageSmoothingEnabled = false
    ctx.save()
    ctx.translate((mouseX*32)-scrollX/4 + 16, (mouseY*32)-scrollY/4 + 16)
    ctx.rotate(facilityRotation * (Math.PI/180))

    for(var i = 0, l = facilitySelectedData.ports.length; i < l; i++){
      ctx.save()
      ctx.translate(((facilityShownWidth/-2)) + arrowWidth*facilitySelectedData.ports[i].x + (arrowWidth/2), ((facilityShownHeight/-2)) + arrowWidth*facilitySelectedData.ports[i].y + (arrowWidth/2))

      var arrowRotation = 0;
      if(facilitySelectedData.ports[i].x == facilitySelectedData.width){arrowRotation = (270*(Math.PI/180))}else if(facilitySelectedData.ports[i].x == -1){arrowRotation = (90*(Math.PI/180))}else if(facilitySelectedData.ports[i].y == -1){arrowRotation = (180*(Math.PI/180))}

      ctx.rotate(arrowRotation)

      var portTypeImage;
      if(facilitySelectedData.ports[i].gender[1].length == 1 && facilitySelectedData.ports[i].gender[1][0] != "null"){portTypeImage = facilitySelectedData.ports[i].gender[1][0] + "_icon"}else{portTypeImage = "any_oil_icon"}
      if(facilitySelectedData.ports[i].gender[0] == "output" || (facilitySelectedData.ports[i].gender[0] == "modular" && (framesElapsed/20) % (Math.PI*2) < (Math.PI))){
        ctx.rotate(180*(Math.PI/180))

        ctx.drawImage(game.getTexture("facility_arrow"), (arrowWidth/-2), (arrowWidth/-3.7) + Math.sin(framesElapsed/20)*(arrowWidth/20), arrowWidth, arrowWidth)

        if(facilitySelectedData.ports[i].gender[0] == "modular"){
          ctx.translate(0, (arrowWidth/-4.7) + Math.sin(framesElapsed/20)*(arrowWidth/20) - (arrowWidth/4))
        }else{
          ctx.translate(0, (arrowWidth/-3.7) + Math.sin(framesElapsed/20)*(arrowWidth/20) - (arrowWidth/4))
        }

        ctx.rotate(arrowRotation*-1)
        ctx.rotate(180*(Math.PI/180))

        ctx.drawImage(game.getTexture(portTypeImage), (arrowWidth/-2), (arrowWidth/-2), arrowWidth, arrowWidth)
      }else{

        ctx.drawImage(game.getTexture("facility_arrow"), (arrowWidth/-2), (arrowWidth/-1.7) + Math.sin(framesElapsed/20)*(arrowWidth/20), arrowWidth, arrowWidth)

        ctx.translate(0, (arrowWidth/-1.7) + Math.sin(framesElapsed/20)*(arrowWidth/20) + (arrowWidth))

        ctx.rotate(arrowRotation*-1)

        ctx.drawImage(game.getTexture(portTypeImage), (arrowWidth/-2), (arrowWidth/-2), arrowWidth, arrowWidth)
      }
      ctx.restore()
    }
    ctx.restore()





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
