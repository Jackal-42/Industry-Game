//NOTE TO SELF
//Valves that allow you to control how oil is distributed among your facilities or manually controlled
//Oil prices fluctuate depending on what is happening in the world and you can hold oil until there is more demand
//Oil production fluctuates, it will make sense to save oil in warehouses to prepare for shortages
//Computerized valve that can change flow depending on any variable




//ignore
var funkymode = false;

var framesElapsed = 0;
var mouseDown = false;
var count = 0;

game.addLayer("oil")
game.getLayer("oil").clearFrames = false;
game.addLayer("terrain")
game.getLayer("terrain").canvas.getContext("2d").imageSmoothingEnabled = false
game.getLayer("terrain").clearFrames = false;

game.addLayer("main")
game.addLayer("water")

game.addLayer("effects")
game.getLayer("effects").clearFrames = false;
game.getLayer("effects").canvas.style.zIndex = 1
game.getLayer("effects").canvas.addEventListener("mousedown", function(){mouseDown = true;})
game.getLayer("effects").canvas.addEventListener("mouseup", function(){mouseDown = false;})

game.addLayer("tutorial")
game.getLayer("tutorial").canvas.style.zIndex = 5
game.getLayer("tutorial").canvas.style.pointerEvents = "none"

var doingTutorial = true;
var lockIndicatorBox = false;
var drawIndicatorLine = true;

//stats
var lifetimeProducts = {};
for(var i = 0, l = fluids.length; i < l; i++){
  eval("lifetimeProducts."+fluids[i]+" = 0");
}
var lifetimeUpgrades = 0;


//KEEP
game.addTexture("selector", "docs/assets/selector.png")
game.addTexture("pointer", "docs/assets/pointer.png")
game.addTexture("null", "docs/assets/null.png")

game.addTexture("pipe_icon", "docs/assets/pipe_icon.png")//R
game.addTexture("rail_icon", "docs/assets/rail_icon.png")//B
game.addTexture("erase_icon", "docs/assets/erase_icon.png")
game.addTexture("warning", "docs/assets/warning.png")
game.addTexture("alert", "docs/assets/alert.png")

game.addTexture("flower_0", "docs/assets/flower_0.png");
game.addTexture("flower_1", "docs/assets/flower_1.png");
game.addTexture("flower_2", "docs/assets/flower_2.png");
game.addTexture("flower_3", "docs/assets/flower_3.png");
game.addTexture("flower_4", "docs/assets/flower_4.png");
game.addTexture("flower_5", "docs/assets/flower_5.png");
game.addTexture("flower_6", "docs/assets/flower_6.png");
game.addTexture("flower_7", "docs/assets/flower_7.png");
game.addTexture("grass_overlay_0", "docs/assets/grass_overlay_0.png");
game.addTexture("grass_overlay_1", "docs/assets/grass_overlay_1.png");

var flavorOverlay = ["flower_0", "flower_1", "flower_2", "flower_3", "flower_4", "flower_5", "flower_6", "flower_7"];

var tileIds = ("X-p&" + "~1234567890=qwertyuio[]asdfghjklzxcvbnm,./!@#$%^*()_+QWERTYUIOP{}|ASDFGHJKL:ZCVBNM<>?").split("")

//RESERVED: [ X ] [ - ] [ p ] [ & ]


//Returns an array consisting of the internal name of a tile and the url of the texture of that tile based on the tile's ID and the layer it appears in
function getTile(layer, id){
  if(layer == "terrain"){
    var requestedTile = terrain[tileIds.indexOf(id)]
    if(requestedTile === undefined){
      return ["null", "docs/assets/null.png"]
    }else{
      return requestedTile
    }
  }else{
    var requestedTile = tiles[tileIds.indexOf(id)]
    if(requestedTile === undefined){

      return ["null", "docs/assets/null.png"]
    }else{
      return requestedTile
    }
  }
}

//Returns the ID of a conduit tile based on the type of conduit and its connections
function getTileId(layer, type, connections){
  for(var i = 0, l = eval(layer + ".length"); i < l; i++){
    if(eval(layer)[i][0] == type + connections){
      return tileIds[i]
    }
  }
  return conduits[getConduitIndex(conduitSelected)].stub
}

//Look, I know that the placeholders are bad game design because I didn't want to make a way to account for the utility tiles when rendering terrain. But it works, so deal with it

var terrain = [
  ["placeholder", "docs/assets/null.png"],
  ["placeholder", "docs/assets/null.png"],
  ["placeholder", "docs/assets/null.png"],
  ["placeholder", "docs/assets/null.png"],
  ["grass_0", "docs/assets/grass_0.png"],
  ["grass_1", "docs/assets/grass_1.png"],
  ["grass_2", "docs/assets/grass_2.png"],
  ["grass_tli", "docs/assets/grass_tli.png"],
  ["grass_tlo", "docs/assets/grass_tlo.png"],
  ["grass_tri", "docs/assets/grass_tri.png"],
  ["grass_tro", "docs/assets/grass_tro.png"],
  ["grass_bli", "docs/assets/grass_bli.png"],
  ["grass_blo", "docs/assets/grass_blo.png"],
  ["grass_bri", "docs/assets/grass_bri.png"],
  ["grass_bro", "docs/assets/grass_bro.png"],
  ["grass_b", "docs/assets/grass_b.png"],
  ["grass_t", "docs/assets/grass_t.png"],
  ["grass_l", "docs/assets/grass_l.png"],
  ["grass_r", "docs/assets/grass_r.png"],
  ["sand", "docs/assets/sand.png"],
  ["sand_tli", "docs/assets/sand_tli.png"],
  ["sand_tlo", "docs/assets/sand_tlo.png"],
  ["sand_tri", "docs/assets/sand_tri.png"],
  ["sand_tro", "docs/assets/sand_tro.png"],
  ["sand_bli", "docs/assets/sand_bli.png"],
  ["sand_blo", "docs/assets/sand_blo.png"],
  ["sand_bri", "docs/assets/sand_bri.png"],
  ["sand_bro", "docs/assets/sand_bro.png"],
  ["seafloor", "docs/assets/seafloor.png"],
  ["sand_b", "docs/assets/sand_b.png"],
  ["sand_t", "docs/assets/sand_t.png"],
  ["sand_l", "docs/assets/sand_l.png"],
  ["sand_r", "docs/assets/sand_r.png"],
  ["water", "docs/assets/water.png"],
  ["water_tli", "docs/assets/water_tli.png"],
  ["water_tlo", "docs/assets/water_tlo.png"],
  ["water_tri", "docs/assets/water_tri.png"],
  ["water_tro", "docs/assets/water_tro.png"],
  ["water_bli", "docs/assets/water_bli.png"],
  ["water_blo", "docs/assets/water_blo.png"],
  ["water_bri", "docs/assets/water_bri.png"],
  ["water_bro", "docs/assets/water_bro.png"],
  ["water_b", "docs/assets/water_b.png"],
  ["water_t", "docs/assets/water_t.png"],
  ["water_l", "docs/assets/water_l.png"],
  ["water_r", "docs/assets/water_r.png"],
]

var tiles = [
  ["overlap", "docs/assets/null.png"],
  ["air", "docs/assets/null.png"],
  ["connector", "docs/assets/null.png"],
  ["filler", "docs/assets/null.png"],
];

var facility

var conduits = [];
var conduitSelected = "pipe"
var facilitySelected = "distiller"
var facilityRotation = 0
var facilitySelectedLayout = [];


//Updates the facilitySelectedLayout variable to accound for the current selected facility and its rotation. The facilitySelectedLayout variable is a shortcut to checking whether the tile you are hovering over is a valid placement spot
function updateFacilitySelected(){
  var rotatedLayout = []
  for(var i = 0, l = facilities.length; i < l; i++){
    if(facilities[i].name == facilitySelected){
      for(var k = 0, kl = facilities[i].layout.length; k < kl; k++){
        if(facilityRotation == 90){
          rotatedLayout.push([facilities[i].layout[k][1] * -1, facilities[i].layout[k][0]])
        }else if(facilityRotation == 180){
          rotatedLayout.push([facilities[i].layout[k][0] * -1, facilities[i].layout[k][1] * -1])
        }else if(facilityRotation == 270){
          rotatedLayout.push([facilities[i].layout[k][1], facilities[i].layout[k][0] * -1])
        }else{
          rotatedLayout.push([facilities[i].layout[k][0], facilities[i].layout[k][1]])
        }
      }
    }
  }

  facilitySelectedLayout = rotatedLayout
}


//Creates a set of textures corresponding to every segment of a specified conduit and adds them to the tiles variable (used for checking tile IDs). Also creates a conduit object, explained below
function addConduit(id){
  conduits.push(new Conduit(id, tiles.length))
  // tiles.push([id, "docs/assets/" + id + ".png"])
  tiles.push([id + "_hh", "docs/assets/" + id + "_hh.png"])
  tiles.push([id + "_vv", "docs/assets/" + id + "_vv.png"])
  tiles.push([id + "_tl", "docs/assets/" + id + "_tl.png"])
  tiles.push([id + "_tr", "docs/assets/" + id + "_tr.png"])
  tiles.push([id + "_bl", "docs/assets/" + id + "_bl.png"])
  tiles.push([id + "_br", "docs/assets/" + id + "_br.png"])
  tiles.push([id + "_el", "docs/assets/" + id + "_el.png"])
  tiles.push([id + "_er", "docs/assets/" + id + "_er.png"])
  tiles.push([id + "_eb", "docs/assets/" + id + "_eb.png"])
  tiles.push([id + "_et", "docs/assets/" + id + "_et.png"])
  tiles.push([id + "_stub", "docs/assets/" + id + "_stub.png"])
}

addConduit("pipe")
addConduit("rail")

//The conduits that are allowed to intersect other conduits
var intersectors = ["pipe"]

//Creates an object with a lot of shortcut attributes to different types of conduit tiles, used later in pipe connection calculations
function Conduit(id, index){
  this.id = id;
  this.endPoints = tileIds[index + 6] + tileIds[index + 7] + tileIds[index + 8] + tileIds[index + 9]
  this.stub = tileIds[index + 10]
  this.corners = tileIds[index + 2] + tileIds[index + 3] + tileIds[index + 4] + tileIds[index + 5]
  this.segments = this.endPoints + tileIds[index] + tileIds[index + 1] + this.corners

  this.left = tileIds[index + 6]
  this.right = tileIds[index + 7]
  this.bottom = tileIds[index + 8]
  this.top = tileIds[index + 9]
  this.tl = tileIds[index + 2]
  this.tr = tileIds[index + 3]
  this.bl = tileIds[index + 4]
  this.br = tileIds[index + 5]
  this.h = tileIds[index]
  this.v = tileIds[index + 1]
  this.hv = tileIds[index] + tileIds[index + 1]
}

//gets the index of a type of conduit in the conduits variable
function getConduitIndex(id){
  for(var i = 0, l = conduits.length; i < l; i++){
    if(conduits[i].id == id){
      return i
    }
  }
  return 0
}

for(var i = 0, l = tiles.length; i < l; i++){
  game.addTexture(tiles[i][0], tiles[i][1])
}
for(var i = 0, l = terrain.length; i < l; i++){
  game.addTexture(terrain[i][0], terrain[i][1])
}

game.addTexture("pipe_submerge", "docs/assets/pipe_submerge.png")
game.addTexture("pipe_corner", "docs/assets/pipe_corner.png")

game.addTexture("ship", "docs/assets/ship.png")
game.addTexture("tank", "docs/assets/tank.png")
game.addTexture("valve", "docs/assets/valve.png")
game.addTexture("t_valve_left", "docs/assets/t_valve_left.png")
game.addTexture("t_valve_right", "docs/assets/t_valve_right.png")
game.addTexture("one_way_pipe", "docs/assets/one_way_pipe.png")
game.addTexture("warehouse", "docs/assets/warehouse.png")
game.addTexture("refinery", "docs/assets/refinery.png")
game.addTexture("distiller", "docs/assets/distiller.png")
game.addTexture("residue_processor", "docs/assets/residue_processor.png")
game.addTexture("gas_processor", "docs/assets/gas_processor.png")
game.addTexture("hydrotreater", "docs/assets/hydrotreater.png")
game.addTexture("crude_source", "docs/assets/crude_source.png")
game.addTexture("any_source", "docs/assets/any_source.png")
game.addTexture("hydrogen_source", "docs/assets/hydrogen_source.png")
game.addTexture("asphalt_mixer", "docs/assets/asphalt_mixer.png")
game.addTexture("gasoline_mixer", "docs/assets/gasoline_mixer.png")
game.addTexture("diesel_mixer", "docs/assets/diesel_mixer.png")
game.addTexture("fuel_oil_mixer", "docs/assets/fuel_oil_mixer.png")

game.addTexture("crude_oil_icon", "docs/assets/crude_oil_icon.png")
game.addTexture("gasoline_icon", "docs/assets/gasoline_icon.png")
game.addTexture("water_icon", "docs/assets/water_icon.png")
game.addTexture("crude_vapor_icon", "docs/assets/crude_vapor_icon.png")
game.addTexture("kerosene_icon", "docs/assets/kerosene_icon.png")
game.addTexture("any_oil_icon", "docs/assets/any_oil_icon.png")
game.addTexture("crude_kerosene_icon", "docs/assets/crude_kerosene_icon.png")
game.addTexture("asphalt_icon", "docs/assets/asphalt_icon.png")

// temporary textures for newly added fluids
game.addTexture("light_oil_icon","docs/assets/light_oil_icon.png")
game.addTexture("heavy_oil_icon","docs/assets/heavy_oil_icon.png")
game.addTexture("crude_light_oil_icon","docs/assets/crude_light_oil_icon.png")
game.addTexture("crude_heavy_oil_icon","docs/assets/crude_heavy_oil_icon.png")
game.addTexture("crude_butane_icon","docs/assets/crude_butane_icon.png")
game.addTexture("butane_icon","docs/assets/butane_icon.png")
game.addTexture("crude_propane_icon","docs/assets/crude_propane_icon.png")
game.addTexture("propane_icon","docs/assets/propane_icon.png")
game.addTexture("gasoline_icon", "docs/assets/gasoline_icon.png")
game.addTexture("crude_gasoline_icon", "docs/assets/crude_gasoline_icon.png")
game.addTexture("diesel_icon", "docs/assets/diesel_icon.png")
game.addTexture("crude_diesel_icon", "docs/assets/crude_diesel_icon.png")
game.addTexture("fuel_oil_icon", "docs/assets/fuel_oil_icon.png")
game.addTexture("crude_fuel_oil_icon", "docs/assets/crude_fuel_oil_icon.png")

game.addTexture("naphtha_icon", "docs/assets/naphtha_icon.png")
game.addTexture("crude_naphtha_icon", "docs/assets/crude_naphtha_icon.png")

game.addTexture("hydrogen_icon", "docs/assets/hydrogen_icon.png")
game.addTexture("residue_icon", "docs/assets/residue_icon.png")
game.addTexture("facility_arrow", "docs/assets/facility_arrow.png")
game.addTexture("active_facility_arrow", "docs/assets/active_facility_arrow.png")
game.addTexture("facility_double_arrow", "docs/assets/facility_double_arrow.png")

//Returns a facility template by name
function getFacility(name){
  for(var i = 0, l = facilities.length; i < l; i++){
    if(facilities[i].name == name){
      return facilities[i]
    }
  }
}

//The little textures of pipes entering the water and used for the ripple effect
var activeOverlay = [];

//Creates either a submerging pipe or a ripple
function Overlay(type, texture, x, y, rotation, data){
  this.texture = texture;
  this.x = x;
  this.y = y;
  this.rotation = rotation * (Math.PI/180);
  this.type = type;
  this.data = {};
  if(type == "ripple"){
    this.data = {age: 0}
  }
}

//For testing new textures without deleting the old ones
function overrideTexture(name, src){
  var img = document.createElement("img")
  img.style.display = "none"
  img.src = src
  img.alt = ""
  for(var i = 0, l = game.textures.length; i < l; i++){
    if(game.textures[i][0] == name){

      game.textures[i][1] = img
    }
  }
  game.getObject("baseLayer").render = true;
}


//stackoverflow go brrrrrrrrr

Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

function commas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var mouseDownPreviously = false;
var beginMouseHold = false;
var endMouseHold = false;
var previousPipeX = 0;
var previousPipeY = 0;
var neighbourX = 0;
var neighbourY = 0;
var scrollX = 0;
var scrollY = 0;

var areas = [];
var areaLoaded = "shore";
var areaIndex = 0;
var fadeOpacity = 0;
var fading = false;
var evalOnFade = "";

var debugging = false;
var logPipes = false;

//progression
var upgradeNotified = false
var firstView = false
var firstBuy = false


if(!debugging){
  document.getElementById("debug").style.display = "none"
}

var funds = 0;

var cachedCode = [];

function CodeBlock(data, delay){
  this.data = data;
  this.delay = delay;
}

//Waits delay milliseconds before executing the data
function cacheCode(data, delay){
  cachedCode.push(new CodeBlock(data, delay))
}

var stopAreaInteraction = false


//Changes the area of the map and hides it with a fade
function loadArea(id){
  scrollX = 0;
  scrollY = 0;
  let zoomBackup = zoom;
  zoom = 1;
  if(!firstView && id != "shore"){
    firstView = true;
    addPoliticsButton("<button class=\"politicsButton\" onclick=\"this.remove(); document.getElementById(\'slideMenuRight\').style.left = \'70%\'; document.getElementById(\'fundsWrapper\').style.marginLeft = \'-15%\'\"><b>How to get back</b><br><i>Click the \'Go to factory\' button under Pebblefellow Industries</i></button>")
  }
  for(var i = 0, l = areas.length; i < l; i++){
    if(areas[i].name == areaLoaded){
      areas[i].baseLayer = game.getObject("baseLayer").mapData
      areas[i].waterLayer = game.getObject("waterLayer").mapData
      areas[i].activeLayer = game.getObject("activeLayer").mapData
      areas[i].overlay = activeOverlay
    }
  }
  for(var i = 0, l = areas.length; i < l; i++){
    if(areas[i].name == id){
      areaLoaded = id
      areaIndex = i
      game.getObject("baseLayer").mapData = areas[i].baseLayer
      game.getObject("waterLayer").mapData = areas[i].waterLayer
      game.getObject("activeLayer").mapData = areas[i].activeLayer
      activeOverlay = areas[i].overlay
    }
  }
  if(corporations[0].owns.includes(id)){
    if(!firstBuy && id != "shore"){
      firstBuy = true;
      addPoliticsButton("<button class=\"politicsButton\" onclick=\"this.remove();\"><b>Congratulations!</b><br><i>You've just acquired your first rival corporation. You're moving up in the world!</i></button>")
    }
    document.getElementById("hotbarMenuVertical").style.display = "block"
    stopAreaInteraction = false
  }else{
    conduitSelected = "pointer"
    document.getElementById("hotbarMenuVertical").style.display = "none"
    stopAreaInteraction = true
    for(var i = 0, l = corporations.length; i < l; i++){
      if(corporations[i].owns.includes(id)){
        notify("You are viewing the " + corporations[i].name + " factory", 300)
      }
    }
  }
  game.getObject('baseLayer').render = true;
  game.getObject('waterLayer').render = true;
  zoom = zoomBackup;
  if(logPipes){updateNetworkLog()};
}

//Only used in the debug menu
function toggleMenu(menu){
  if(lockIndicatorBox){return}
  if(document.getElementById(menu).style.display == "none"){
    document.getElementById(menu).style.display = "block"
    document.getElementById(menu + "Arrow").innerHTML = "ᐯ "
  }else{
    document.getElementById(menu).style.display = "none"
    document.getElementById(menu + "Arrow").innerHTML = "ᐳ "
  }
}

var offsetHeight = 0;
var offsetWidth = 0;
window.addEventListener('resize', setWindowScale)

//Keeps track of the size of the window and scales the canvas accordingly to make sure that the game does not render more than it needs to
function setWindowScale(){
  offsetWidth = game.window.offsetWidth*(window.devicePixelRatio/1.5)
  offsetHeight = game.window.offsetHeight*(window.devicePixelRatio/1.5)

  for(var i = 0, l = game.layers.length; i < l; i++){
    game.layers[i].canvas.width = offsetWidth
    game.layers[i].canvas.height = offsetHeight
  }
}
setWindowScale()
for(var i = 0, l = game.layers.length; i < l; i++){
  game.layers[i].canvas.width = offsetWidth
  game.layers[i].canvas.height = offsetHeight
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

//Logs the result of an expression to the debug menu
function lg(expression){
  if(expression == "robert chad"){
    document.getElementById('evalOutput').innerHTML = "he really is tho";
  }else{
    document.getElementById('evalOutput').innerHTML = expression;
  }

}

function Area(name, baseLayer, waterLayer, activeLayer, networks, links, overlay){
  this.name = name;
  this.baseLayer = baseLayer;
  this.waterLayer = waterLayer;
  this.activeLayer = activeLayer;
  this.networks = networks;
  this.links = links;
  this.overlay = overlay;
}

function Network(name, rotation, points, data, pseudoPipe, index){
  this.name = name;
  this.rotation = rotation;
  this.points = points;
  this.data = data;
  this.pseudoPipe = pseudoPipe;
  this.warnings = [];
  this.alerts = [];
  this.index = index;
}

game.window.style.overflow = "hidden"

//I AM KEEPING THIS HERE JUST IN CASE DO NOT JUDGE ME

// var leftMenu = document.createElement('div')
// leftMenu.id = "slideMenuLeft"

// leftMenu.innerHTML = `<button style=\"position: absolute; right: 0px; height: 100%; border: none; background-color: tan; cursor: pointer; width: 14%;\" onclick=\"if(document.getElementById(\'slideMenuLeft\').style.right == \'98%\'){document.getElementById(\'slideMenuLeft\').style.right = \'86%\'}else{document.getElementById(\'slideMenuLeft\').style.right = \'98%\'}\"> </button>

// <button id="pipe_hotbar" onclick="pressHotbarButton('pipe')" class="hotbarButton" style="margin-top: 14px;"><img src="docs/assets/pipe_icon.png"></button>

// <button id="rail_hotbar" onclick="pressHotbarButton('rail')" class="hotbarButton"><img src="docs/assets/rail_icon.png"></button>

// <button id="erase_hotbar" onclick="pressHotbarButton('erase')" class="hotbarButton"><img src="docs/assets/erase_icon.png"></button>

// `

// game.window.appendChild(leftMenu)

//Used for extending and retracting the hammer hotbar menu
function toggleVerticalHotbarMenu(id){
  if(lockIndicatorBox){return}
  for(var i = 0, l = document.getElementById(id).children.length; i < l; i++){
    if(document.getElementById(id).children[i].style.top == "0px"){
      document.getElementById(id).children[i].style.top = document.getElementById(id).children[i].getAttribute("savestate")
      if(key(16) && document.getElementById(id).children[i].className == "hotbarMenuHorizontal"){
        toggleHorizontalHotbarMenu(document.getElementById(id).children[i].id)
      }
    }else{
      if(document.getElementById(id).children[i].className == "hotbarMenuHorizontal"){
        document.getElementById(id).children[i].style.top = "0px";
        toggleHorizontalHotbarMenu(document.getElementById(id).children[i].id)
      }
    }
  }
}

//Expands and retracts the submenus
function toggleHorizontalHotbarMenu(id){
  if(lockIndicatorBox){return}
  for(var i = 0, l = document.getElementById(id).children.length; i < l; i++){
    if(document.getElementById(id).children[i].style.left == "0px" || document.getElementById(id).children[i].style.left == "68px"){
      if(document.getElementById(id).style.top == "0px"){return;}
      document.getElementById(id).children[i].style.left = document.getElementById(id).children[i].getAttribute("savestate")
    }else{
      document.getElementById(id).children[i].style.left = "0px";
      var hotbarButtonName = document.getElementById(id).children[i].id.split("_")
      hotbarButtonName = [hotbarButtonName.shift(), hotbarButtonName.join("_")][1]
      if(hotbarButtonName == conduitSelected || (hotbarButtonName == facilitySelected && conduitSelected == "facility")){
        document.getElementById(id).children[i].style.left = "68px";
      }
    }
  }
}

//Generates the little bob upon clicking a hotbar button and changes the variables that determine what you draw with the mouse

var canPlaceFacility = true

var placeableIndex = -1
var previousPlaceables = []

function checkPlaceableIndex(){
  if(placeableIndex < 0){placeableIndex = 0}
  if(placeableIndex > previousPlaceables.length - 1){placeableIndex = previousPlaceables.length - 1}
}

function selectPlaceable(id, keepOrder){
  if(lockIndicatorBox){return}
  if(keepOrder == undefined){keepOrder = false}

  canPlaceFacility = false
  var hotbarButtons = document.getElementsByClassName("hotbarButton")
  var elementID = "hotbar_" + id
  var elementIndex = -1
  for(var i = 0, l = hotbarButtons.length; i < l; i++){
    if(hotbarButtons[i].id == elementID){
      elementIndex = i
    }
  }
  if(elementIndex == -1){return}

  if(document.getElementById("hotbar_" + id).style.backgroundColor == "rgba(1, 1, 1, 0)"){return}


  hotbarButtons[elementIndex].childNodes[0].classList.remove('clickityElement'); // reset animation
  void hotbarButtons[elementIndex].childNodes[0].offsetWidth; // trigger reflow
  hotbarButtons[elementIndex].childNodes[0].classList.add('clickityElement'); // start animation

  if(id.includes("menu")){return}

  facilityRotation = 0

  if(!keepOrder){
    if(previousPlaceables.includes(id)){
      previousPlaceables.splice(previousPlaceables.indexOf(id), 1)
    }
    previousPlaceables.push(id)

    placeableIndex = previousPlaceables.length - 1
  }

  for(var i = 0, l = hotbarButtons.length; i < l; i++){
    if(hotbarButtons[i].id == elementID){
      // hotbarButtons[i].style.backgroundColor = "rgb(251, 255, 0)"
      hotbarButtons[i].style.backgroundImage = "url(\"docs/assets/button_box_active.png\")"

      if(hotbarButtons[i].style.left == "0px"){
        hotbarButtons[i].style.left = "68px"
      }
    }else{
      if(hotbarButtons[i].style.backgroundImage == "url(\"docs/assets/button_box_active.png\")"){
        hotbarButtons[i].style.backgroundImage = "url(\"docs/assets/button_box.png\")"
        // hotbarButtons[i].style.backgroundColor = "rgb(100, 100, 111)"
        // hotbarButtons[i].style.border = "3px solid black"
      }
    }
    if(hotbarButtons[i].style.left == "68px" && !(hotbarButtons[i].id == elementID)){hotbarButtons[i].style.left = "0px"}
  }

  for(var i = 0, l = conduits.length; i < l; i++){
    if(conduits[i].id == id){
      conduitSelected = id
    }
  }

  for(var i = 0, l = facilities.length; i < l; i++){
    if(facilities[i].name == id){
      conduitSelected = "facility"
      facilitySelected = id
      updateFacilitySelected()
    }
  }
  if(id == "erase"){
    conduitSelected = "erase"
  }
  if(id == "pointer"){
    conduitSelected = "pointer"
  }
}

function rotate(cx, cy, x, y, angle) {
  var radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
    ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return [Math.round(nx), Math.round(ny)];
}

//The hotbar menu

var hotbarMenu = document.createElement('div')
hotbarMenu.id = "hotbarMenuVertical"
hotbarMenu.className = "hotbarMenuVertical"

hotbarMenu.innerHTML = `

<button id="hotbar_hammer_menu" savestate="1px" style="top: 1px; z-index: 4;" class="hotbarButton" onclick="selectPlaceable('hammer_menu'); toggleVerticalHotbarMenu('hotbarMenuVertical'); if(tutorialIndex == 1){tutorialNext()}"><img class="clickityElement" src="docs/assets/hammer.png"></button>

<div class="hotbarMenuHorizontal" savestate="67px" style="top: 67px; z-index: 3;" id="hotbarMenu0">

<button id="hotbar_edit_menu" class="hotbarButton"  style="z-index: 3;" onclick="selectPlaceable('edit_menu'); toggleHorizontalHotbarMenu('hotbarMenu0'); if(tutorialIndex == 5){tutorialNext()}"><img class="clickityElement" src="docs/assets/more_icon.png"></button>

<button id="hotbar_pointer" savestate="66px" style="left: 66px;" class="hotbarButton" onclick="selectPlaceable('pointer'); if(tutorialIndex == 6){tutorialNext()}"><img class="clickityElement" src="docs/assets/pointer.png"></button>

<button id="hotbar_erase" savestate="132px" style="left: 132px;" class="hotbarButton" onclick="selectPlaceable('erase')"><img class="clickityElement" src="docs/assets/erase.png"></button>

</div>


<div class="hotbarMenuHorizontal" savestate="133px" style="top: 133px; z-index: 3;" id="hotbarMenu1">

<button id="hotbar_pipe_menu" class="hotbarButton"  style="z-index: 3;" onclick="selectPlaceable('pipe_menu'); toggleHorizontalHotbarMenu('hotbarMenu1'); if(tutorialIndex == 14){tutorialNext()}"><img class="clickityElement" src="docs/assets/pipe_x.png"></button>

<button id="hotbar_pipe" savestate="66px" style="left: 66px;" class="hotbarButton" onclick="selectPlaceable('pipe'); if(tutorialIndex == 15 || tutorialIndex == 25){tutorialNext()}"><img class="clickityElement" src="docs/assets/pipe_icon.png"></button>

<button id="hotbar_rail" savestate="132px" style="left: 132px;" class="hotbarButton" onclick="selectPlaceable('rail')"><img class="clickityElement" src="docs/assets/rail_icon.png"></button>

<button id="hotbar_valve" savestate="198px" style="left: 198px;" class="hotbarButton" onclick="selectPlaceable('valve')"><img class="clickityElement" src="docs/assets/valve.png"></button>

<button id="hotbar_tank" savestate="264px" style="left: 264px;" class="hotbarButton" onclick="selectPlaceable('tank')"><img class="clickityElement" src="docs/assets/tank.png"></button>

<button id="hotbar_t_valve" savestate="330px" style="left: 330px;" class="hotbarButton" onclick="selectPlaceable('t_valve')"><img class="clickityElement" src="docs/assets/t_valve_left.png"></button>

<button id="hotbar_one_way_pipe" savestate="396px" style="left: 396px;" class="hotbarButton" onclick="selectPlaceable('one_way_pipe')"><img class="clickityElement" src="docs/assets/one_way_pipe.png"></button>

</div>



<div class="hotbarMenuHorizontal" savestate="199px" style="top: 199px; z-index: 3;" id="hotbarMenu2">

<button id="hotbar_facilities_menu" class="hotbarButton"  style="z-index: 3;" onclick="selectPlaceable('facilities_menu'); toggleHorizontalHotbarMenu('hotbarMenu2'); if(tutorialIndex == 2){tutorialNext()}"><img class="clickityElement" src="docs/assets/gear.png"></button>

<button id="hotbar_distiller" savestate="66px" style="left: 66px;" class="hotbarButton" onclick="selectPlaceable('distiller')"><img class="clickityElement" src="docs/assets/distiller.png" style="width: 40%; height: 80%;"></button>

<button id="hotbar_residue_processor" savestate="132px" style="left: 132px;" class="hotbarButton" onclick="selectPlaceable('residue_processor')"><img class="clickityElement" src="docs/assets/residue_processor.png" style="width: 40%; height: 80%;"></button>

<button id="hotbar_gas_processor" savestate="198px" style="left: 198px;" class="hotbarButton" onclick="selectPlaceable('gas_processor')"><img class="clickityElement" src="docs/assets/gas_processor.png" style="width: 40%; height: 80%;"></button>

<button id="hotbar_hydrotreater" savestate="264px" style="left: 264px;" class="hotbarButton" onclick="selectPlaceable('hydrotreater'); if(tutorialIndex == 21){tutorialNext()}"><img class="clickityElement" src="docs/assets/hydrotreater.png" style="height: 40%; width: 80%;"></button>

<button id="hotbar_fuel_oil_mixer" savestate="330px" style="left: 330px;" class="hotbarButton" onclick="selectPlaceable('fuel_oil_mixer')"><img class="clickityElement" src="docs/assets/fuel_oil_mixer.png" style=""></button>

<button id="hotbar_gasoline_mixer" savestate="396px" style="left: 396px;" class="hotbarButton" onclick="selectPlaceable('gasoline_mixer')"><img class="clickityElement" src="docs/assets/gasoline_mixer.png" style="height: 40%; width: 80%;"></button>

<button id="hotbar_asphalt_mixer" savestate="462px" style="left: 462px;" class="hotbarButton" onclick="selectPlaceable('asphalt_mixer'); if(tutorialIndex == 3){tutorialNext()}"><img class="clickityElement" src="docs/assets/asphalt_mixer.png" style=""></button>

<button id="hotbar_diesel_mixer" savestate="528px" style="left: 528px;" class="hotbarButton" onclick="selectPlaceable('diesel_mixer')"><img class="clickityElement" src="docs/assets/diesel_mixer.png" style="height: 40%; width: 80%;"></button>

</div>

<div class="hotbarMenuHorizontal" savestate="265px" style="top: 265px; z-index: 3;" id="hotbarMenu3">

<button id="hotbar_extra_menu" class="hotbarButton" style="z-index: 3;" onclick="selectPlaceable('extra_menu'); toggleHorizontalHotbarMenu('hotbarMenu3'); if(tutorialIndex == 11){tutorialNext()}"><img class="clickityElement" src="docs/assets/any_source.png"></button>

<button id="hotbar_crude_source" savestate="66px" style="left: 66px;" class="hotbarButton" onclick="selectPlaceable('crude_source'); if(tutorialIndex == 12){tutorialNext()}"><img class="clickityElement" src="docs/assets/crude_source.png"></button>

<button id="hotbar_hydrogen_source" savestate="132px" style="left: 132px;" class="hotbarButton" onclick="selectPlaceable('hydrogen_source'); if(tutorialIndex == 23){tutorialNext()}"><img class="clickityElement" src="docs/assets/hydrogen_source.png"></button>

<!-- <button id="hotbar_any_source" savestate="198px" style="left: 198px;" class="hotbarButton" onclick="selectPlaceable('any_source')"><img class="clickityElement" src="docs/assets/any_source.png"></button> -->

</div>
`

game.window.appendChild(hotbarMenu)

toggleVerticalHotbarMenu('hotbarMenuVertical')

var hotbarButtonOver = "none"

//Generates all the event listeners that determine which hotbar button is currently being hovered over and for how long, used for generating tooltips
function assignHotbarButtonListeners(){
  var hotbarButtonsActive = document.getElementsByClassName("hotbarButton")
  for(var i = 0, l = hotbarButtonsActive.length; i < l; i++){
    eval("$("+hotbarButtonsActive[i].id+").hover(function(){hotbarButtonOver = \""+hotbarButtonsActive[i].id+"\"; checkTemporaryTooltip()}, function(){hotbarButtonOver = \"none\"})")
    hotbarButtonsActive[i].style.backgroundColor = "rgba(1, 1, 1, 0)"
    // hotbarButtonsActive[i].style.borderColor = "darkgray"
  }
}

assignHotbarButtonListeners()

function unlockHotbarButton(id){
  document.getElementById(id).style.backgroundColor = "transparent"
  // document.getElementById(id).style.borderColor = "black"
  document.getElementById(id).style.filter = "grayscale(0)"
  document.getElementById(id).children[0].style.filter = "blur(0px)"
}
unlockHotbarButton("hotbar_hammer_menu")
unlockHotbarButton("hotbar_edit_menu")
unlockHotbarButton("hotbar_pipe_menu")
unlockHotbarButton("hotbar_facilities_menu")
unlockHotbarButton("hotbar_extra_menu")
unlockHotbarButton("hotbar_pointer")
unlockHotbarButton("hotbar_erase")
unlockHotbarButton("hotbar_pipe")
unlockHotbarButton("hotbar_distiller")
unlockHotbarButton("hotbar_gas_processor")
unlockHotbarButton("hotbar_residue_processor")
unlockHotbarButton("hotbar_hydrotreater")
unlockHotbarButton("hotbar_crude_source")
unlockHotbarButton("hotbar_hydrogen_source")
// unlockHotbarButton("hotbar_any_source")



unlockHotbarButton("hotbar_asphalt_mixer")
// unlockHotbarButton("hotbar_gasoline_mixer")
// unlockHotbarButton("hotbar_diesel_mixer")
// unlockHotbarButton("hotbar_fuel_oil_mixer")


selectPlaceable("pointer")

var hotbarOverCheck = "none"
var mouseOverCheckX = 0
var mouseOverCheckY = 0

//See if the mouse has been still long enough to spawn a tooltip
function checkTemporaryTooltip(){
  hotbarOverCheck = hotbarButtonOver
  mouseOverCheckX = game.mouseX
  mouseOverCheckY = game.mouseY
  setTimeout(createTemporaryTooltip, 400)
}

var temporaryTooltips = []

//Just like a normal tooltip except it despawns when the mouse moves too far away instead of on click
function createTemporaryTooltip(){
  if(doingTutorial){return}
  if(document.getElementsByClassName("tooltip").length != 0){return}
  if(hotbarOverCheck == hotbarButtonOver){
    if(mouseOverCheckX == game.mouseX && mouseOverCheckY == game.mouseY){
      var tooltip = document.createElement("div")
      tooltip.classList.add("tooltip")

      tooltip.name = document.getElementsByClassName("tooltip").length

      eval("tooltip.onclick = function(){checkTooltipClick = "+ (document.getElementsByClassName("tooltip").length) +"}")

      //Finds the correct data to generate the tooltip
      var tooltipIndex = 0
      for(var i = 0, l = tooltips.length; i < l; i++){
        if(tooltips[i].name == hotbarButtonOver){
          tooltipIndex = i
          break;
        }
      }
      if(tooltipIndex == 0){return}
      tooltip.innerHTML = "<p style=\"font-size: 24px; margin-left: 2px; font-family: \'Pixellari\'; \">" + tooltips[tooltipIndex].title +  "</p><p style=\"margin-left: 3px; font-family: \'Pixellari\'; color: rgb(69, 69, 69);\">" + tooltips[tooltipIndex].text + "</p>"
      game.window.appendChild(tooltip)
      if(game.mouseX > window.innerWidth - 250){tooltipSpawnDirectionX = -1}
      if(game.mouseX < 250){tooltipSpawnDirectionX = 0}
      if(game.mouseY > window.innerHeight - tooltip.offsetHeight){tooltipSpawnDirectionY = -1}
      if(game.mouseY < tooltip.offsetHeight){tooltipSpawnDirectionY = 0}
      tooltip.style.left = game.mouseX + 8 + (250*tooltipSpawnDirectionX) + "px"
      tooltip.style.top = game.mouseY + 8 + (tooltip.offsetHeight * tooltipSpawnDirectionY) + "px"

      temporaryTooltips.push(tooltip)
    }else{
      checkTemporaryTooltip()
    }
  }
}



var rightMenu = document.createElement('div')
rightMenu.id = "slideMenuRight"

rightMenu.innerHTML = `
<div id="guidebookWrapper" style="position: absolute; left: -61%; width: 50%; top: 2%; background-color: rgb(236, 210, 175); border: 1px solid black; overflow: scroll; max-height: 400px;">


  <button id="guidebookExpander" style="position: absolute; right: 3px; top: 3px;" onclick="toggleGuidebook()">-</button>

  <p id="guidebookTitle" style=\"font-family: \'Pixellari\'; font-size: 24px; font-smooth: never; padding-top: 4%; width: 101%; margin-bottom: 0px; padding-bottom: 0px; text-align: center; margin-top: -4px; background-color: gray;\">GUIDEBOOK</p>

  <div id="guidebook">


    <p class="selector" onclick="toggleMenu('controls')"><span id="controlsArrow">ᐳ </span>Controls</p>

    <div id="controls" class="menu" style="display:none;">
      <p>Arrow Keys: Move</p>
      <p>Z/R: Rotate Clockwise</p>
      <p>X/Shift+R: Rotate Counterclockwise</p>
      <p>E: Toggle Inventory</p>
      <p>Shift+E: Toggle Full Inventory</p>
      <p>>/<: Recently Used Items</p>
      <p>+/-: Zoom</p>
      <p>P: Pipe Tool</p>
      <p>Shift+Click (With Pipe Tool): Erase</p>
    </div>

    <p class="selector" onclick="toggleMenu('basics')"><span id="basicsArrow">ᐳ </span>Facilities / Pipes</p>

    <div id="basics" class="menu" style="display:none;">
      <p>FACILITIES</p>
      <p class="subtext">Hover over the icon of each button in the inventory to read a brief description of them. You may rotate the facilities before placing it using Z or R. The side of the facility that you connect a pipe to matters. Make sure to utilize every output of your facilities!</p>

      <br>

      <p>PIPES</p>
      <p class="subtext">You may intersect pipes by dragging straight over a segment. Connect your pipes to the ship to sell your items. Items flow along pipes instantaneously to the next facility at a constant rate, but the facilities take a moment to process them. Pipes may go under the water but facilities cannot.</p>
    </div>


  </div>

</div>


<div id="politicsButtonWrapper" style="position: absolute; left: -61%; width: 60%; bottom: 2%;">

</div>




<button style=\"position: absolute; left: 0px; height: 100%; border: none; background-color: tan; cursor: pointer; width: 14%;\" onclick=\"if(document.getElementById(\'slideMenuRight\').style.left == \'96%\'){document.getElementById(\'slideMenuRight\').style.left = \'70%\'; document.getElementById(\'fundsWrapper\').style.marginLeft = \'-15%\'}else{document.getElementById(\'slideMenuRight\').style.left = \'96%\'; document.getElementById(\'fundsWrapper\').style.marginLeft = \'0%\'}\"> <img src=\"docs/assets/expand_arrow.png\" style=\"width: 90%; transform: rotate(90deg)\"> </button>

<p style=\"font-family: \'Pixellari\'; font-size: 24px; font-smooth: never; margin-top: 4%; margin-left: 20%; width: 75%; margin-bottom: 0px; padding-bottom: 0px; text-align: center;\">UPGRADES<br><br>
<div id="upgrades" style="margin-top: -4%; height: 22vw;">


<button class="upgradeButton">placeholder</button>

<button class="upgradeButton">placeholder</button>

<button class="upgradeButton">placeholder</button>


</div>


<p style=\"font-family: \'Pixellari\'; font-size: 24px; font-smooth: never; margin-top: 4%; margin-left: 20%; width: 75%; margin-bottom: 0px; padding-bottom: 0px; text-align: center;\">STOCK MARKET<br>

<div id="stockMarket">
<div class="stockButton"><p class="upgradeTitle">Pebblefellow Industries</p><button class="smallButton" onclick="evalOnFade = \'loadArea(\\\'shore\\\')\'; fading = true; notifyTimeout = 1;">Go to factory</button></div>
<div class="stockButton"><p class="upgradeTitle">Western Gas & Oil</p><button class="smallButton" onclick="evalOnFade = \'loadArea(\\\'island\\\')\'; fading = true">View Factory</button><button class="smallButton">Acquire ($15,000)</button></div>

<div class="stockButton">Robtech Corporation</div>

</div>
<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
<p>e</p>

`

game.window.appendChild(rightMenu)

document.getElementById('slideMenuRight').style.left = '96%'


var upgradeIndexes = []

function updateUpgrades(){
  var upgradeDiv = document.getElementById("upgrades")
  var upgradeButtonIndex = 0
  upgradeIndexes = []
  for(var i = 0, l = upgrades.length; i < l; i++){
    var costString = "$" + commas(upgrades[i].cost)
    if(upgrades[i].cost == 0){costString = ""}
    if(!upgrades[i].unlocked){
      upgradeDiv.children[upgradeButtonIndex].innerHTML = "<p class=\"upgradeTitle\">"+upgrades[i].name+"</p>  <p class=\"upgradeText\">"+upgrades[i].text+"</p> <p class=\"upgradeCost\">" + costString + "</p>"
      eval("upgradeDiv.children[upgradeButtonIndex].onclick = function(){if(funds >= " + upgrades[i].cost + "){funds -= "+ upgrades[i].cost +";" + upgrades[i].unlock + "; upgrades["+i+"].unlocked = true; updateUpgrades(); lifetimeUpgrades++}}")
      upgradeIndexes.push(i)
      upgradeButtonIndex++
    }
    if(upgradeButtonIndex >= 3){
      break;
    }
  }
  checkUpgrades()
}

updateUpgrades()

function checkUpgrades(){
  var upgradeDiv = document.getElementById("upgrades")
  for(var i = 0; i < upgradeIndexes.length; i++){
    if(upgrades[upgradeIndexes[i]].cost > funds || upgrades[upgradeIndexes[i]].cost == 0){
      upgradeDiv.children[i].style.filter = "opacity(0.5)"
    }else{
      upgradeDiv.children[i].style.filter = "opacity(1)"
    }
  }
}

function updateStockMarket(){
  document.getElementById("stockMarket").innerHTML = ""
  for(var i = 0, l = corporations.length; i < l; i++){
    if(corporations[i].owned){
      document.getElementById("stockMarket").innerHTML += "<div class=\"stockButton\"><p class=\"upgradeTitle\">"+ corporations[i].name +"</p><button class=\"smallButton\" onclick=\"fadeToArea(\'"+corporations[i].owns[0]+"\')\">Go to factory</button></div>"
    }else{
      document.getElementById("stockMarket").innerHTML += "<div class=\"stockButton\"><p class=\"upgradeTitle\">"+ corporations[i].name +"</p><button class=\"smallButton\" onclick=\"fadeToArea(\'"+corporations[i].owns[0]+"\')\">View Factory</button><button class=\"smallButton\" onclick=\"if(funds >= "+ corporations[i].worth +"){corporations["+i+"].owned = true; corporations[0].owns.push(\'"+corporations[i].owns[0]+"\'); funds -= "+corporations[i].worth+"; updateStockMarket()}\">Acquire ($"+commas(corporations[i].worth)+")</button></div>"
    }
  }
}
updateStockMarket()

function fadeToArea(name){
  evalOnFade = 'loadArea(\"'+ name +'\")';
  fading = true;
}



var fundsDisplay = document.createElement('div')

fundsDisplay.innerHTML = `<p id="fundsWrapper" style=\"font-family: \'Pixellari\'; font-size: 48px; font-smooth: never; position: absolute; width: 100%;  text-align: center; margin-top: 16px; user-select: none; color: white; margin-left: 0%;\">Funds: $<span id=\"funds\">0</span> </p>`

game.window.appendChild(fundsDisplay)


var rotationDisplay = document.createElement('div')

rotationDisplay.innerHTML = `<p style=\"font-family: \'Pixellari\'; font-size: 32px; font-smooth: never; position: absolute; text-align: center; bottom: 0px; left: 0px; width: 100%; user-select: none; color: white;\">R/Z: Rotate Facility</p>`

game.window.appendChild(rotationDisplay)

function addPoliticsButton(content){
  document.getElementById("politicsButtonWrapper").innerHTML += content
}



var centerDisplay = document.createElement('div')
centerDisplay.id = "centerDisplay"

centerDisplay.innerHTML = `
<button id="closeCenterDisplay" onclick="if(!doingTutorial || tutorialIndex == 10 || tutorialIndex == 27){if(tutorialIndex == 10 || tutorialIndex == 27){tutorialNext()};document.getElementById(\'centerDisplay\').style.top = \'35%\'; document.getElementById(\'centerDisplay\').style.opacity = \'0\'; cacheCode(\'document.getElementById(\\\'centerDisplay\\\').style.display = \\\'none\\\' \', 12)}" style='width: 4vh; padding-top: 4vh; position: absolute; top: 1%; right: 1%; background-color: tan; border: 1px solid black; cursor: pointer;'><img src='docs/assets/x_button.png' style='position: absolute; width: 100%; left: 0px; top: 0px; image-rendering: auto;'></button>

<div id="facilityShownRange">
<canvas id="facilityShownCanvas" width="500" height="500" style="width: 30%; border: 1px solid black; position: absolute; top: 6vh; left: 1%; background-color: rgb(100, 100, 133)"></canvas>
</div>

<p id="facilityShown" style="font-family: \'Pixellari\'; font-size: 6vh; margin-top: 0%; position: absolute;">Refinery</p>

<p id="facilityShownDescription" style="font-family: \'Pixellari\'; margin-left: 32%; margin-top: 6vh; color: rgb(69, 69, 69)"></p>

<p id="facilityShownResources" style="font-family: \'Pixellari\'; margin-left: 32%; margin-top: 1%;"></p>

<p id="facilityShownWarnings" style="font-family: \'Pixellari\'; margin-left: 32%; margin-top: 1%;"></p>


`


game.window.appendChild(centerDisplay)

var objectiveDisplay = document.createElement('div')
objectiveDisplay.id = "objectiveDisplay"

objectiveDisplay.innerHTML = `

<div id="objectiveMax">
  <button id="closeObjectiveDisplay" onclick="if(!doingTutorial && !eval(objectives[objectivesScored].condition)){document.getElementById(\'objectiveDisplay\').style.bottom = \'1%\'; document.getElementById(\'objectiveDisplay\').style.left = \'1%\'; document.getElementById(\'objectiveDisplay\').style.boxShadow = \'0px 0px 0px 1600px rgba(0, 0, 0, 0)\'; document.getElementById(\'objectiveDisplay\').style.width = \'15%\'; document.getElementById(\'objectiveDisplay\').style.height = \'6vw\'; document.getElementById(\'objectiveMax\').style.display = \'none\'; document.getElementById(\'objectiveMin\').style.display = \'block\';document.getElementById(\'objectiveDisplay\').style.cursor = \'pointer\';setTimeout(function(){document.getElementById(\'objectiveDisplay\').onclick=function(){expandObjectiveDisplay()}}, 20)}" style='width: 4vh; padding-top: 4vh; position: absolute; top: 1%; right: 1%; background-color: tan; border: 1px solid black; cursor: pointer;'><img src='docs/assets/x_button.png' style='position: absolute; width: 100%; left: 0px; top: 0px; image-rendering: auto; z-index: 4;'></button>

  <p style="font-family: \'Pixellari\'; font-size: 4vh; margin-top: 0%; width: 100%; text-align: center; color: rgb(42, 42, 42);">Current Objective</p>
  <p id="currentObjective" style="font-family: \'Pixellari\'; font-size: 6vh; margin-top: 0vh; width: 100%; text-align: center;">placeholder</p>
  <p id="objectiveDescription" style="font-family: \'Pixellari\'; margin-top: 0vh; font-size: 3vh; width: 100%; text-align: center; color: rgb(69, 69, 69);">lorem ipsum dolor sit amet</p>
  <p style="font-family: \'Pixellari\'; font-size: 3vh; width: 100%; text-align: center; margin-top: 4vh;">Rewards:<br><span id="objectiveRewards"></span></p>
  <button id="claimObjective" style="position: absolute; left: 20%; width: 60%; bottom: 2%; border: 2px solid black; font-family: \'Pixellari\'; font-size: 5vh; cursor: pointer; transition: opacity 300ms;" onclick="eval(objectives[objectivesScored].reward);objectivesScored++;updateObjectives();">Claim Reward</button>
</div>

<div id="objectiveMin" style="display: none;">
  <p style="font-family: \'Pixellari\'; width: 100%; text-align: center;"><b>Current Objective</b></p>
  <p id="currentObjectiveMin" style="font-family: \'Pixellari\'; width: 100%; text-align: center;">placeholder</p>
  <p style="font-family: \'Pixellari\'; width: 100%; text-align: center;"><i>Click to open expanded view</i></p>
</div>

`

game.window.appendChild(objectiveDisplay)

function expandObjectiveDisplay(){
  document.getElementById('objectiveDisplay').style.bottom = '30%'; document.getElementById('objectiveDisplay').style.left = '30%'; document.getElementById('objectiveDisplay').style.boxShadow = '0px 0px 0px 1600px rgba(0, 0, 0, 0.6)'; document.getElementById('objectiveDisplay').style.width = '40%'; document.getElementById('objectiveDisplay').style.height = '40%'; document.getElementById('objectiveMax').style.display = 'block';
  document.getElementById('objectiveMin').style.display = 'none';
  document.getElementById('objectiveDisplay').style.cursor = '';
  document.getElementById('objectiveDisplay').onclick = function(){};
}

function updateObjectives(){
  if(objectivesScored == objectives.length){document.getElementById('objectiveDisplay').style.display = "none"; return}
  document.getElementById("currentObjective").innerHTML = objectives[objectivesScored].name
  document.getElementById("currentObjectiveMin").innerHTML = objectives[objectivesScored].name
  document.getElementById("objectiveDescription").innerHTML = objectives[objectivesScored].description
  document.getElementById("objectiveRewards").innerHTML = objectives[objectivesScored].rewardText
}
updateObjectives()

var facilityShownCanvas = document.getElementById("facilityShownCanvas")
facilityShownCanvas.getContext("2d").fillRect(20, 20, 20, 20)

var checkTooltipClick = -1
var tooltipSpawnDirectionX = 0
var tooltipSpawnDirectionY = 0

var tooltip;

//Generates a tooltip that disappears when clicking away from it
function createTooltip(name){
  tooltip = document.createElement("div")
  tooltip.classList.add("tooltip")

  tooltip.name = document.getElementsByClassName("tooltip").length

  eval("tooltip.onclick = function(){checkTooltipClick = "+ (document.getElementsByClassName("tooltip").length) +"}")
  var tooltipIndex = 0
  for(var i = 0, l = tooltips.length; i < l; i++){
    if(tooltips[i].name == name){
      tooltipIndex = i
      break;
    }
  }
  tooltip.innerHTML = "<p style=\"font-size: 24px; margin-left: 2px; font-family: \'Pixellari\'; \">" + tooltips[tooltipIndex].title +  "</p><p style=\"margin-left: 3px; font-family: \'Pixellari\'; color: rgb(69, 69, 69);\">" + tooltips[tooltipIndex].text + "</p>"
  var sellable = false
  for(var i = 0, l = products.length; i < l; i++){
    if(products[i].name == name){
      sellable = true
      tooltip.innerHTML += "<br><p style=\"margin-left: 3px; font-family: \'Pixellari\'; color: rgb(69, 69, 69);\">Sell Price: $" + products[i].price + "</p>"
    }
  }
  if(!sellable && !(name.includes("hotbar") || name.includes("help"))){
    tooltip.innerHTML += "<br><p style=\"margin-left: 3px; font-family: \'Pixellari\'; color: rgb(69, 69, 69);\">Cannot Be Sold</p>"
  }
  setTimeout(appendTooltip, 1)
}

//The same as createTooltip() but the parameter is HTML code instead of a template ID
function createCustomTooltip(content){
  tooltip = document.createElement("div")
  tooltip.classList.add("tooltip")

  tooltip.name = document.getElementsByClassName("tooltip").length

  eval("tooltip.onclick = function(){checkTooltipClick = "+ (document.getElementsByClassName("tooltip").length) +"}")

  tooltip.innerHTML = content
  setTimeout(appendTooltip, 1)
}

//Adds the tooltip to the page and gives it the correct dimensions
function appendTooltip(){
  game.window.appendChild(tooltip)
  if(game.mouseX > window.innerWidth - 250){tooltipSpawnDirectionX = -1}
  if(game.mouseX < 250){tooltipSpawnDirectionX = 0}
  if(game.mouseY > window.innerHeight - tooltip.offsetHeight){tooltipSpawnDirectionY = -1}
  if(game.mouseY < tooltip.offsetHeight){tooltipSpawnDirectionY = 0}
  tooltip.style.left = game.mouseX + 8 + (250*tooltipSpawnDirectionX) + "px"
  tooltip.style.top = game.mouseY + 8 + (tooltip.offsetHeight * tooltipSpawnDirectionY) + "px"
}

//what the hell does this function do

//Apparently it is used for determining which sides of a terrain tile are touching a different type of tile
function getTerrainBorders(array, x, y, type){
  var defaultTexture = ""
  if(type == "g"){
    // var grassTextureEndings = ["_0"]
    // defaultTexture = grassTextureEndings[Math.floor(Math.random()*grassTextureEndings.length)]
    defaultTexture = "_0"
  }
  var waterEdge = false;
  if(type == "W"){type = "w"; waterEdge = true;}
  try{var top = (array[y - 1].charAt(x) == type) ? true : false}catch{var top = true}

  try{var bottom = (array[y + 1].charAt(x) == type) ? true : false}catch{var bottom = true}

  try{var left = (array[y].charAt(x-1) == type) ? true : false}catch{var left = true}

  try{var right = (array[y].charAt(x+1) == type) ? true : false}catch{var right = true}

  if(x == 0){
    left = true;
  }
  if(type == "w" && !waterEdge){
    try{if(array[y - 1].charAt(x) == "g"){
      top = true
    }}catch{}
    try{if(array[y + 1].charAt(x) == "g"){
      bottom = true
    }}catch{}
    try{if(array[y].charAt(x - 1) == "g"){
      left = true
    }}catch{}
    try{if(array[y].charAt(x + 1) == "g"){
      right = true
    }}catch{}
  }
  if(waterEdge){
    try{if(array[y - 1].charAt(x) == "W"){
      top = true
    }}catch{}
    try{if(array[y + 1].charAt(x) == "W"){
      bottom = true
    }}catch{}
    try{if(array[y].charAt(x - 1) == "W"){
      left = true
    }}catch{}
    try{if(array[y].charAt(x + 1) == "W"){
      right = true
    }}catch{}
  }


  if(top && bottom && left && right){
    if(x == 0){return defaultTexture}
    if(type == "w" && !waterEdge){
      try{if(array[y-1].charAt(x-1) != type && array[y-1].charAt(x-1) != "g"){return "_tli"}}catch{}
      try{if(array[y-1].charAt(x+1) != type && array[y-1].charAt(x+1) != "g"){return "_tri"}}catch{}
      try{if(array[y+1].charAt(x-1) != type && array[y+1].charAt(x-1) != "g"){return "_bli"}}catch{}
      try{if(array[y+1].charAt(x+1) != type && array[y+1].charAt(x+1) != "g"){return "_bri"}}catch{}
    }else if(waterEdge){
      try{if(array[y-1].charAt(x-1) != type && array[y-1].charAt(x-1) != "W"){return "_tli"}}catch{}
      try{if(array[y-1].charAt(x+1) != type && array[y-1].charAt(x+1) != "W"){return "_tri"}}catch{}
      try{if(array[y+1].charAt(x-1) != type && array[y+1].charAt(x-1) != "W"){return "_bli"}}catch{}
      try{if(array[y+1].charAt(x+1) != type && array[y+1].charAt(x+1) != "W"){return "_bri"}}catch{}
    }else{
      try{if(array[y-1].charAt(x-1) != type){return "_tli"}}catch{}
      try{if(array[y-1].charAt(x+1) != type){return "_tri"}}catch{}
      try{if(array[y+1].charAt(x-1) != type){return "_bli"}}catch{}
      try{if(array[y+1].charAt(x+1) != type){return "_bri"}}catch{}
    }


    return defaultTexture
  }
  if(bottom && left && right){
    return "_t"
  }
  if(top && left && right){
    return "_b"
  }
  if(top && bottom && right){
    return "_l"
  }
  if(top && bottom && left){
    return "_r"
  }
  if(top && left){
    return "_bro"
  }
  if(top && right){
    return "_blo"
  }
  if(bottom && left){
    return "_tro"
  }
  if(bottom && right){
    return "_tlo"
  }
  return defaultTexture
}

//Takes a map of only grass sand and seafloor tiles and rounds out the edges and adds water into the water layer
function sanitizeMap(array){
  var sanitized = [];
  var sanitizedWater = [];
  var sanitizedOverlay = [];
  for(var i = 0, l = array.length; i < l; i++){
    sanitized.push("")
    sanitizedWater.push("")
    for(var k = 0, kl = array[i].length; k < kl; k++){
      if(array[i].charAt(k) == "g"){
        var edgeType = getTerrainBorders(array, k, i, "g")
        sanitized[i] += getTileId("terrain", "grass" + edgeType, "")
        if(edgeType == "_0"){
          if((noise.simplex3(k/15, i/30, 0.5))/15 + Math.random() > 0.94){
            sanitizedOverlay.push(new Overlay("flavor", flavorOverlay[Math.floor(Math.random()*flavorOverlay.length)], (k*32)+(Math.random()-0.5)*8, (i*32)+(Math.random()-0.5)*8, 0))
          }
        }
        sanitizedWater[i] += "-"
      }else if(array[i].charAt(k) == "w"){
        sanitized[i] += getTileId("terrain", "sand" + getTerrainBorders(array, k, i, "w"), "")
        sanitizedWater[i] += getTileId("terrain", "water" + getTerrainBorders(array, k, i, "W"), "")
      }else if(array[i].charAt(k) == "W"){
        sanitized[i] += getTileId("terrain", "seafloor", "")
        sanitizedWater[i] += getTileId("terrain", "water", "")
      }
    }
  }

  return {ground: sanitized, water: sanitizedWater, overlay: sanitizedOverlay};
}

//Returns the tile at the specified coords
function getMapData(x, y, layer){
  if(layer === undefined){layer = "activeLayer"}
  try{return game.getObject(layer).mapData[y].charAt(x)}catch{return 0}
}

//Changes a tile and nothing else. Logs it if enabled.
function changeMapData(x, y, data){
  if(logPipes && debugging && data != conduits[getConduitIndex(conduitSelected)].stub && data != "-"){
    document.getElementById("pipeLog").innerHTML += "Changed data at (" + x + ", " + y + ") to " + data + "<br>"
  }
  game.getObject("activeLayer").mapData[y] = game.getObject("activeLayer").mapData[y].replaceAt(x, data)
}

var pipeConnections = [["_hh", "lr"], ["_vv", "bt"], ["_tr", "bl"], ["_tl", "br"], ["_bl", "rt"], ["_br", "lt"], ["_et", "b"], ["_eb", "t"], ["_el", "r"], ["_er", "l"]]

//Returns all the places a pipe SHOULD be connected
function getPipeConnections(x, y){
  var data = getTile("tiles", getMapData(x,y))[0].slice(-3)

  for(var i = 0, l = pipeConnections.length; i < l; i++){
    if(pipeConnections[i][0] == data){
      return pipeConnections[i][1];
    }
  }

  if(getMapData(x,y) == "X"){
    return "blrt"
  }

  return "";
}

//Get pipe tile ID based on connections
function getPipeId(connections, index){
  if(index === undefined){index = getConduitIndex(conduitSelected)}
  connections = connections.split('').sort().join('').trim();
  for(var i = 0, l = pipeConnections.length; i < l; i++){
    if(pipeConnections[i][1] == connections){
      return getTileId("tiles", conduits[index].id, pipeConnections[i][0]);
    }
  }
  return conduits[index].stub
}

//Generates the little image of a pipe enterimg the water
function createPipeOverlay(x1, y1, x2, y2){
  var pipeRotation = 0;

  //PIPE CORNER IS BOTTOM LEFT

  try{
    if(getTile("terrain", getMapData(x1, y1, "waterLayer"))[0].substring(0, 6) == "water_"){
      if(getTile("terrain", getMapData(x2, y2, "baseLayer"))[0].substring(0, 5) == "grass"){
        lg(1)
        if(x2 > x1){
          pipeRotation = -90
        }else if(x2 < x1){
          pipeRotation = 90
        }else if(y2 < y1){
          pipeRotation = 180
        }
        var submergedCorner = false;
        for(var i = 0, l = activeOverlay.length; i < l; i++){
          if(activeOverlay[i].type == "pipe" && activeOverlay[i].x == x1 && activeOverlay[i].y == y1){
            submergedCorner = true;
            break;
          }
        }
        activeOverlay.push(new Overlay("pipe", "pipe_submerge", x1, y1, pipeRotation))
        activeOverlay.push(new Overlay("ripple", "null", x1, y1, 0))
        if(submergedCorner){
          var cornerRotation = 0;
          if(pipeRotation + activeOverlay[i].rotation / (Math.PI/180) == 90){
            if(pipeRotation == 0 || activeOverlay[i].rotation / (Math.PI/180) == 0){
              cornerRotation = 180;
            }
          }else if(pipeRotation + activeOverlay[i].rotation / (Math.PI/180) == 270){
            cornerRotation = 270;
          }else{
            cornerRotation = 90;
          }
          activeOverlay.push(new Overlay("pipe", "pipe_corner", x1, y1, cornerRotation))
        }
      }
    }
  }catch{};
  try{
    if(getTile("terrain", getMapData(x1, y1, "baseLayer"))[0].substring(0, 5) == "grass"){
      if(getTile("terrain", getMapData(x2, y2, "waterLayer"))[0].substring(0, 6) == "water_"){
        lg(2)
        if(x1 > x2){
          pipeRotation = -90
        }else if(x1 < x2){
          pipeRotation = 90
        }else if(y1 < y2){
          pipeRotation = 180
        }
        var submergedCorner = false;
        for(var i = 0, l = activeOverlay.length; i < l; i++){
          if(activeOverlay[i].type == "pipe" && activeOverlay[i].x == x2 && activeOverlay[i].y == y2){
            submergedCorner = true;
            break;
          }
        }
        activeOverlay.push(new Overlay("pipe", "pipe_submerge", x2, y2, pipeRotation))
        activeOverlay.push(new Overlay("ripple", "null", x2, y2, 0))
        if(submergedCorner){
          var cornerRotation = 0;
          if(pipeRotation + activeOverlay[i].rotation / (Math.PI/180) == 90){
            if(pipeRotation == 0 || activeOverlay[i].rotation / (Math.PI/180) == 0){
              cornerRotation = 180;
            }
          }else if(pipeRotation + activeOverlay[i].rotation / (Math.PI/180) == 270){
            cornerRotation = 270;
          }else{
            cornerRotation = 90;
          }
          activeOverlay.push(new Overlay("pipe", "pipe_corner", x2, y2, cornerRotation))
        }
      }
    }
  }catch{}
}

var guideArrowsShown = false

//Creates a connection between two adjacent pipes
function connectPipes(x1, y1, x2, y2){
  var conduitIndex = getConduitIndex(conduitSelected)
  var joinEmptyNetwork = false;
  if(conduits[conduitIndex].corners.includes(getMapData(x2, y2))){return;}

  if(conduits[conduitIndex].endPoints.includes(getMapData(x1, y1)) && conduits[conduitIndex].endPoints.includes(getMapData(x2, y2))){
    joinEmptyNetwork = true;
  }
  var pipe1Connections = getPipeConnections(x1, y1)
  var pipe2Connections = getPipeConnections(x2, y2)
  if((pipe1Connections == "l" && x1-1 == x2) || (pipe1Connections == "r" && x1+1 == x2) || (pipe1Connections == "t" && y1-1 == y2) || (pipe1Connections == "b" && y1+1 == y2)){
    return;
  }


  if(pipe2Connections == "lr" || pipe2Connections == "tb"){
    return;
  }

  // clank.currentTime = 0;
  // clank.play()

  var waterX = x1
  var waterY = y1
  var landX = x2
  var landY = y2

  if(getTile("terrain", getMapData(x2, y2, "waterLayer"))[0].substring(0, 6) == "water_"){
    var waterX = x2
    var waterY = y2
    var landX = x1
    var landY = y1
  }

  if((Math.abs(waterX - landX) <= 1 && Math.abs(waterY - landY) == 0) || (Math.abs(waterY - landY) <= 1 && Math.abs(waterX - landX) == 0)){
    if(getMapData(waterX, waterY) != "p" && (conduits[conduitIndex].endPoints.includes(getMapData(landX, landY)))){createPipeOverlay(x1, y1, x2, y2)}
    if(getMapData(landX, landY) != "p" && (conduits[conduitIndex].endPoints.includes(getMapData(waterX, waterY)))){createPipeOverlay(x1, y1, x2, y2)}
  }

  var endPoints = [];

  for(var i = 0, l = areas[areaIndex].networks.length; i < l; i++){
    if(areas[areaIndex].networks[i].name == 'pipeSegment'){
      endPoints.push(areas[areaIndex].networks[i].points[0])
      endPoints.push(areas[areaIndex].networks[i].points[1])

      // var stringArray2 = JSON.stringify([x2, y2])
      // if(JSON.stringify(areas[areaIndex].networks[i].points).includes(stringArray2)){
      //   if(JSON.stringify(endPoints).includes(JSON.stringify([x1, y1]))){
      //     var stringArray1 = JSON.stringify([x1, y1])
      //     for(var j = 0; j < l; j++){
      //       if(JSON.stringify(areas[areaIndex].networks[j].points[0]) == stringArray1){

      //         if(JSON.stringify(areas[areaIndex].networks[i].points[0]) == stringArray2){
      //           areas[areaIndex].networks[j].points[0] = areas[areaIndex].networks[i].points[1]
      //         }else{
      //           areas[areaIndex].networks[j].points[0] = areas[areaIndex].networks[i].points[0]
      //         }
      //         areas[areaIndex].networks.splice(i, 1)
      //         i--
      //         l--
      //       }else if(JSON.stringify(areas[areaIndex].networks[j].points[1]) == stringArray1){

      //         if(JSON.stringify(areas[areaIndex].networks[i].points[0]) == stringArray2){
      //           areas[areaIndex].networks[j].points[1] = areas[areaIndex].networks[i].points[1]
      //         }else{
      //           areas[areaIndex].networks[j].points[1] = areas[areaIndex].networks[i].points[0]
      //         }
      //         areas[areaIndex].networks.splice(i, 1)
      //         i--
      //         l--
      //       }
      //     }
      //   }else{
      //     for(var j = 0; j < 2; j++){
      //       if(JSON.stringify(areas[areaIndex].networks[i].points[j]) == stringArray2){
      //         areas[areaIndex].networks[i].points[j] = [x1, y1]
      //         break;
      //       }
      //     }
      //     break;
      //   }



      // }
    }
  }
  var pipesToReplace = [];

  var intersectString = "_hh"
  var intersectId = conduits[getConduitIndex(intersectors[j])].h

  if(y1 == y2){
    intersectString = "_vv"
    intersectId = conduits[getConduitIndex(intersectors[j])].v
  }

  if(x1 > x2 && y1 == y2){

    pipesToReplace = [];
    if(x1 > x2+1){
      var crossingMidsection = true;
      for(var i = x1-1; i > x2; i--){
        for(var j = 0, ll = intersectors.length; j < ll; j++){
          if(intersectId.includes(getMapData(i, y1)) || (intersectors.includes(conduitSelected) && ((getTile("tiles", getMapData(i, y1))[0].slice(-3) == intersectString)))){
            pipesToReplace.push([i, y1])
            if(x1-x2 == pipesToReplace.length +1){
              for(var i = 0, l = pipesToReplace.length; i<l; i++){
                changeMapData(pipesToReplace[i][0], pipesToReplace[i][1], "X")

                createPipeOverlay(pipesToReplace[i][0], pipesToReplace[i][1], pipesToReplace[i][0] - 1, pipesToReplace[i][1])
                createPipeOverlay(pipesToReplace[i][0], pipesToReplace[i][1], pipesToReplace[i][0] + 1, pipesToReplace[i][1])
              }
            }
          }else{
            crossingMidsection = false
            break;
          }
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
        for(var j = 0, ll = intersectors.length; j < ll; j++){
          if(intersectId.includes(getMapData(i, y1)) || (intersectors.includes(conduitSelected) && ((getTile("tiles", getMapData(i, y1))[0].slice(-3) == intersectString)))){
            pipesToReplace.push([i, y1])
          }else{
            crossingMidsection = false
            break;
          }
        }
      }
      if(x2-x1 == pipesToReplace.length +1){
        for(var i = 0, l = pipesToReplace.length; i<l; i++){
          changeMapData(pipesToReplace[i][0], pipesToReplace[i][1], "X")

          createPipeOverlay(pipesToReplace[i][0], pipesToReplace[i][1], pipesToReplace[i][0] + 1, pipesToReplace[i][1])
          createPipeOverlay(pipesToReplace[i][0], pipesToReplace[i][1], pipesToReplace[i][0] - 1, pipesToReplace[i][1])
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
    pipesToReplace = [];
    if(y1 > y2+1){
      var crossingMidsection = true;
      for(var i = y1-1; i > y2; i--){
        for(var j = 0, ll = intersectors.length; j < ll; j++){
          if(intersectId.includes(getMapData(x1, i)) || (intersectors.includes(conduitSelected) && ((getTile("tiles", getMapData(x1, i))[0].slice(-3) == intersectString)))){
            pipesToReplace.push([x1, i])
          }else{
            crossingMidsection = false
            break;
          }
        }
      }
      if(y1-y2 == pipesToReplace.length +1){
        for(var i = 0, l = pipesToReplace.length; i<l; i++){
          changeMapData(pipesToReplace[i][0], pipesToReplace[i][1], "X")

          createPipeOverlay(pipesToReplace[i][0], pipesToReplace[i][1], pipesToReplace[i][0], pipesToReplace[i][1] - 1)
          createPipeOverlay(pipesToReplace[i][0], pipesToReplace[i][1], pipesToReplace[i][0], pipesToReplace[i][1] + 1)
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
        for(var j = 0, ll = intersectors.length; j < ll; j++){
          if(intersectId.includes(getMapData(x1, i)) || (intersectors.includes(conduitSelected) && ((getTile("tiles", getMapData(x1, i))[0].slice(-3) == intersectString)))){
            pipesToReplace.push([x1, i])
          }else{
            crossingMidsection = false
            break;
          }
        }
      }
      if(y2-y1 == pipesToReplace.length +1){
        for(var i = 0, l = pipesToReplace.length; i<l; i++){
          changeMapData(pipesToReplace[i][0], pipesToReplace[i][1], "X")

          createPipeOverlay(pipesToReplace[i][0], pipesToReplace[i][1], pipesToReplace[i][0], pipesToReplace[i][1] + 1)
          createPipeOverlay(pipesToReplace[i][0], pipesToReplace[i][1], pipesToReplace[i][0], pipesToReplace[i][1] - 1)
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



  var previousMapData1 = getMapData(x1, y1)
  var previousMapData2 = getMapData(x2, y2)
  if(getPipeId(pipe1Connections) != conduits[conduitIndex].stub && !"&p".includes(getMapData(x1, y1))){
    changeMapData(x1, y1, getPipeId(pipe1Connections))
  }
  var pipe2Id = getPipeId(pipe2Connections)
  if(getMapData(x2, y2) != "p"){
    if(pipe2Id == conduits[conduitIndex].stub){
      changeMapData(x2, y2, "-")
    }else{
      changeMapData(x2, y2, pipe2Id)

      if(logPipes && debugging){document.getElementById("pipeLog").innerHTML += "Joined (" + x1 + ", " + y1 + ") and (" + x2 + ", " + y2 + ")<br>"}
    }
  }

  if((getMapData(x2, y2) == "p") || getMapData(x1, y1) == "p"){

    if(getMapData(x1, y1) == "p"){
      var endPointsSource = updateNetwork(x2, y2, false)
    }else{
      var endPointsSource = updateNetwork(x1, y1, false)
    }
    var endPoints = endPointsSource[0]
    var portEndPoints = endPointsSource[1]

    // console.log(endPoints)
    var pos = 0;
    if(endPoints[0][0] == x1 && endPoints[0][1] == y1){
      pos = 1;
    }
    // if(getMapData(endPoints[pos][0], endPoints[pos][1] - 1) == "p" || getMapData(endPoints[pos][0] - 1, endPoints[pos][1]) == "p" || getMapData(endPoints[pos][0] + 1, endPoints[pos][1]) == "p" || getMapData(endPoints[pos][0], endPoints[pos][1] + 1) == "p"){
    if(addPipeNetwork(endPoints, true, portEndPoints)){
      notify("That part of the facility cannot be connected to", 240)
      changeMapData(x1, y1, previousMapData1)
      changeMapData(x2, y2, previousMapData2)
    }


    if(getMapData(x2, y2) == "p" && getMapData(x1, y1) == "p"){
      if(Math.abs(x1-x2) > 1 || Math.abs(y1-y2) > 1){

        if(x1 > x2){
          var endPoints = [[x1-1, y1], [x2+1, y2]]
        }
        if(x2 > x1){
          var endPoints = [[x1+1, y1], [x2-1, y2]]
        }
        if(y1 > y2){
          var endPoints = [[x1, y1-1], [x2, y2+1]]
        }
        if(y2 > y1){
          var endPoints = [[x1, y1+1], [x2, y2-1]]
        }

        var facilityIDs = []
        var facility1String = JSON.stringify([x1, y1])
        var facility2String = JSON.stringify([x2, y2])
        for(var i = 0, l = areas[areaIndex].networks.length; i < l; i++){
          if(areas[areaIndex].networks[i].name != "pipeSegment"){
            var areaString = JSON.stringify(areas[areaIndex].networks[i].points)
            if(areaString.includes(facility1String)){
              facilityIDs.push(areas[areaIndex].networks[i].index)
            }
          }
        }


        for(var i = 0, l = areas[areaIndex].networks.length; i < l; i++){
          if(areas[areaIndex].networks[i].name != "pipeSegment"){
            var areaString = JSON.stringify(areas[areaIndex].networks[i].points)
            if(areaString.includes(facility2String)){
              facilityIDs.push(areas[areaIndex].networks[i].index)
            }
          }
        }

        var facility1X = getNetwork(areaIndex, facilityIDs[0]).points[0][0]
        var facility1Y = getNetwork(areaIndex, facilityIDs[0]).points[0][1]
        var facility2X = getNetwork(areaIndex, facilityIDs[1]).points[0][0]
        var facility2Y = getNetwork(areaIndex, facilityIDs[1]).points[0][1]

        networkTotal++

        var facility1PortIndex = 0;
        var facility2PortIndex = 0;
        var facility1TemplateID = 0;
        var facility2TemplateID = 0;

        for(var i = 0, l = facilities.length; i < l; i++){
          if(facilities[i].name == getNetwork(areaIndex, facilityIDs[0]).name){
            facility1TemplateID = i
          }

          if(facilities[i].name == getNetwork(areaIndex, facilityIDs[1]).name){
            facility2TemplateID = i
          }
        }

        var rotatedEndPoints = [rotate(facility1X, facility1Y, endPoints[0][0], endPoints[0][1], getNetwork(areaIndex, facilityIDs[0]).rotation), rotate(facility2X, facility2Y, endPoints[1][0], endPoints[1][1], getNetwork(areaIndex, facilityIDs[1]).rotation)]

        var rotatedPorts = []

        for(var c = 0, cl = facilities[facility1TemplateID].ports.length; c < cl; c++){
          rotatedPorts.push(rotate(0, 0, facilities[facility1TemplateID].ports[c].x, facilities[facility1TemplateID].ports[c].y, 0))
        }

        for(var c = 0, cl = rotatedPorts.length; c < cl; c++){

          if(getNetwork(areaIndex, facilityIDs[0]).points[0][0] + rotatedPorts[c][0] == rotatedEndPoints[0][0] && getNetwork(areaIndex, facilityIDs[0]).points[0][1] + rotatedPorts[c][1] == rotatedEndPoints[0][1]){
            facility1PortIndex = c
          }
        }

        var rotatedPorts = []

        for(var c = 0, cl = facilities[facility2TemplateID].ports.length; c < cl; c++){
          rotatedPorts.push(rotate(0, 0, facilities[facility2TemplateID].ports[c].x, facilities[facility2TemplateID].ports[c].y, 0))
        }

        for(var c = 0, cl = rotatedPorts.length; c < cl; c++){
          if(getNetwork(areaIndex, facilityIDs[1]).points[0][0] + rotatedPorts[c][0] == rotatedEndPoints[1][0] && getNetwork(areaIndex, facilityIDs[1]).points[0][1] + rotatedPorts[c][1] == rotatedEndPoints[1][1]){
            facility2PortIndex = c
          }
        }

        areas[areaIndex].links.push({facility1: [facilityIDs[0], facility1PortIndex], facility2: [facilityIDs[1], facility2PortIndex], supportingConduit: networkTotal})

        areas[areaIndex].networks.push(new Network("pipeSegment", 0, endPoints, {connectedFacilities: [facilityIDs[0], facilityIDs[1]]}, false, networkTotal))
        document.getElementById("pipeLog").innerHTML += "Added pipe connecting " + facilityIDs[0] + " and " + facilityIDs[1] + "<br>"
      }
    }

    if(logPipes){updateNetworkLog()}
  }

  if(!guideArrowsShown && !endMouseHold){
    guideArrowsShown = true
    var endPoints = updateNetwork(x1, y1)[1]
    var endPoint1Connections = getPipeConnections(endPoints[0][0], endPoints[0][1])
    var endPoint2Connections = getPipeConnections(endPoints[1][0], endPoints[1][1])


    var checkFacility1 = false;
    var facility1X = endPoints[0][0]
    var facility1Y = endPoints[0][1]
    if(endPoint1Connections.includes("l")){
      if(getMapData(endPoints[0][0] - 1, endPoints[0][1]) == "p"){
        checkFacility1 = true;
        facility1X = endPoints[0][0] - 1
      }
    }
    if(endPoint1Connections.includes("r")){
      if(getMapData(endPoints[0][0] + 1, endPoints[0][1]) == "p"){
        checkFacility1 = true;
        facility1X = endPoints[0][0] + 1
      }
    }
    if(endPoint1Connections.includes("t")){
      if(getMapData(endPoints[0][0], endPoints[0][1] - 1) == "p"){
        checkFacility1 = true;
        facility1Y = endPoints[0][1] - 1
      }
    }
    if(endPoint1Connections.includes("b")){
      if(getMapData(endPoints[0][0], endPoints[0][1] + 1) == "p"){
        checkFacility1 = true;
        facility1Y = endPoints[0][1] + 1
      }
    }



    var checkFacility2 = false;
    var facility2X = endPoints[1][0]
    var facility2Y = endPoints[1][1]
    if(endPoint2Connections.includes("l")){
      if(getMapData(endPoints[1][0] - 1, endPoints[1][1]) == "p"){
        checkFacility2 = true;
        facility2X = endPoints[1][0] - 1
      }
    }
    if(endPoint2Connections.includes("r")){
      if(getMapData(endPoints[1][0] + 1, endPoints[1][1]) == "p"){
        checkFacility2 = true;
        facility2X = endPoints[1][0] + 1
      }
    }
    if(endPoint2Connections.includes("t")){
      if(getMapData(endPoints[1][0], endPoints[1][1] - 1) == "p"){
        checkFacility2 = true;
        facility2Y = endPoints[1][1] - 1
      }
    }
    if(endPoint2Connections.includes("b")){
      if(getMapData(endPoints[1][0], endPoints[1][1] + 1) == "p"){
        checkFacility2 = true;
        facility2Y = endPoints[1][1] + 1
      }
    }

    if(JSON.stringify(endPoints[0]) == JSON.stringify(endPoints[1])){
      checkFacility2 = false
    }

    if(!(checkFacility1 && checkFacility2)){
      var pipeSourceIndex = 0;
      if(checkFacility1){
        var pipeSourceCoords = JSON.stringify([facility1X, facility1Y])
        for(var i = 0, l = areas[areaIndex].networks.length; i < l; i++){
          if(areas[areaIndex].networks[i].name == "pipeSegment"){continue}
          if(JSON.stringify(areas[areaIndex].networks[i].points).includes(pipeSourceCoords)){
            pipeSourceIndex = i
            break;
          }
        }
      }

      if(checkFacility2){
        var pipeSourceCoords = JSON.stringify([facility2X, facility2Y])
        for(var i = 0, l = areas[areaIndex].networks.length; i < l; i++){
          if(areas[areaIndex].networks[i].name == "pipeSegment"){continue}
          if(JSON.stringify(areas[areaIndex].networks[i].points).includes(pipeSourceCoords)){
            pipeSourceIndex = i
            break;
          }
        }
      }

      if(checkFacility1){
        generateArrowOverlay(pipeSourceIndex, [endPoints[0][0], endPoints[0][1]])
      }
      if(checkFacility2){
        generateArrowOverlay(pipeSourceIndex, [endPoints[1][0], endPoints[1][1]])
      }
    }
  }

  //If both ends of pipe connect to facilities, create a new network and links.
  if(joinEmptyNetwork){
    var previousMapData1 = getMapData(x1, y1)
    var previousMapData2 = getMapData(x2, y2)
    var endPoints = updateNetwork(x1, y1)[1]
    var endX = endPoints[0][0]
    var endY = endPoints[0][1]
    var connections = getPipeConnections(endX, endY)
    if((connections.includes("t") && getMapData(endX, endY-1) == "p") || (connections.includes("l") && getMapData(endX - 1, endY) == "p") || (connections.includes("r") && getMapData(endX + 1, endY) == "p") || (connections.includes("b") && getMapData(endX, endY + 1) == "p")){
      endX = endPoints[1][0]
      endY = endPoints[1][1]
      connections = getPipeConnections(endX, endY)
      if((connections.includes("t") && getMapData(endX, endY-1) == "p") || (connections.includes("l") && getMapData(endX - 1, endY) == "p") || (connections.includes("r") && getMapData(endX + 1, endY) == "p") || (connections.includes("b") && getMapData(endX, endY + 1) == "p")){
        if(addPipeNetwork(endPoints)){
          notify("That part of the facility cannot be connected to", 240)
          changeMapData(x1, y1, previousMapData1)
          changeMapData(x2, y2, previousMapData2)
        }
      }
    }
  }

}

function generateArrowOverlay(index, coords){
  var facilityTemplateID = 0
  for(var i = 0, l = facilities.length; i < l; i++){
    if(facilities[i].name == areas[areaIndex].networks[index].name){
      facilityTemplateID = i
    }
  }

  var rotatedPorts = []

  for(var c = 0, cl = facilities[facilityTemplateID].ports.length; c < cl; c++){
    rotatedPorts.push(rotate(0, 0, facilities[facilityTemplateID].ports[c].x, facilities[facilityTemplateID].ports[c].y, areas[areaIndex].networks[index].rotation * -1))
  }

  var differenceX = coords[0] - areas[areaIndex].networks[index].points[0][0]
  var differenceY = coords[1] - areas[areaIndex].networks[index].points[0][1]

  var portIndex = 0;
  for(var i = 0, l = rotatedPorts.length; i < l; i++){
    if(rotatedPorts[i][0] == differenceX && rotatedPorts[i][1] == differenceY){
      portIndex = i
    }
  }
  var outputtedItems = facilities[facilityTemplateID].ports[portIndex].gender[1]
  var outputtedGender = facilities[facilityTemplateID].ports[portIndex].gender[0]

  if(outputtedGender == "output"){

    for(var i = 0, l = outputtedItems.length; i < l; i++){
      try{
        if(eval("areas[areaIndex].networks[index].data." + outputtedItems[i]) >= 1 || eval("areas[areaIndex].networks[index].data.crude_" + outputtedItems[i]) >= 1){
          outputtedItems = [outputtedItems[i]]
        }
      }catch{}
    }
    if(outputtedItems.length > 1){
      outputtedItems = []
    }
  }

  for(var i = 0, l = areas[areaIndex].networks.length; i < l; i++){
    if(areas[areaIndex].networks[i].name == "pipeSegment"){continue}
    var facilityTemplate = getFacility(areas[areaIndex].networks[i].name)
    for(var k = 0, kl = facilityTemplate.ports.length; k < kl; k++){
      if(facilityTemplate.ports[k].gender[0] == outputtedGender && outputtedGender != "modular"){continue}
      for(var j = 0, jl = outputtedItems.length; j < jl; j++){
        if(facilityTemplate.ports[k].gender[1].includes(outputtedItems[j]) && ((eval("areas[areaIndex].networks[i].data." + outputtedItems[j]) >= 1) || facilityTemplate.ports[k].gender[0] != "output")){
          var rotatedPort = rotate(0, 0, facilityTemplate.ports[k].x, facilityTemplate.ports[k].y, areas[areaIndex].networks[i].rotation * -1)
          if(getMapData(areas[areaIndex].networks[i].points[0][0] + rotatedPort[0], areas[areaIndex].networks[i].points[0][1] + rotatedPort[1]) != "-"){continue}
          var arrowRotation = 0
          if(rotatedPort[1] < 0){
            arrowRotation = 180
          }
          if(areas[areaIndex].networks[i].rotation == 180 || (areas[areaIndex].networks[i].rotation == 90 && getFacility(areas[areaIndex].networks[i].name).height > 1)){
            if(rotatedPort[0] > 0){
              arrowRotation = 90
            }
          }else{
            if(rotatedPort[0] < 0){
              arrowRotation = 90
            }
          }
          if(areas[areaIndex].networks[i].rotation == 90 || areas[areaIndex].networks[i].rotation == 270){
            if(rotatedPort[0] >= getFacility(areas[areaIndex].networks[i].name).height){
              arrowRotation = 270
            }
          }else{
            if(rotatedPort[0] >= getFacility(areas[areaIndex].networks[i].name).width){
              arrowRotation = 270
            }
          }
          if(outputtedGender == "input"){arrowRotation += 180}
          activeOverlay.push(new Overlay("arrow", "active_facility_arrow", areas[areaIndex].networks[i].points[0][0] + rotatedPort[0], areas[areaIndex].networks[i].points[0][1] + rotatedPort[1], arrowRotation))
        }
      }
    }
  }
}

//Creates a new pipe network and links from a set of coordinates (anywhere on the target pipe)
function addPipeNetwork(endPoints, useTrueCoords, portEndPoints){
  if(useTrueCoords){
    var portEndPointSave = portEndPoints[1]
    portEndPoints[1] = portEndPoints[0]
    portEndPoints[0] = portEndPointSave
  }
  if(useTrueCoords == undefined){
    useTrueCoords = false
  }
  var endX = endPoints[0][0]
  var endY = endPoints[0][1]
  var connections = getPipeConnections(endX, endY)
  if(JSON.stringify(endPoints[0]) == JSON.stringify(endPoints[1])){
    if(connections.length == 1 || connections.length == 0){
      // return;
    }
  }
  if(useTrueCoords){
    var facility1X = endPoints[0][0]
    var facility1Y = endPoints[0][1]
    var facility2X = endPoints[1][0]
    var facility2Y = endPoints[1][1]
  }else{
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
    }else if((connections.includes("b") && getMapData(endX, endY+1) == "p")){
      facility1X = endX
      facility1Y = endY + 1
    }

    endX = endPoints[1][0]
    endY = endPoints[1][1]
    connections = getPipeConnections(endX, endY)
    if((connections.includes("t") && getMapData(endX, endY-1) == "p") && !((endY - 1 == facility1Y) && (endX == facility1X))){
      facility2X = endX
      facility2Y = endY - 1
    }else if((connections.includes("l") && getMapData(endX-1, endY) == "p") && !((endY == facility1Y) && (endX - 1 == facility1X))){
      facility2X = endX - 1
      facility2Y = endY
    }else if((connections.includes("r") && getMapData(endX+1, endY) == "p") && !((endY == facility1Y) && (endX + 1 == facility1X))){
      facility2X = endX + 1
      facility2Y = endY
    }else if((connections.includes("b") && getMapData(endX, endY+1) == "p") && !((endY + 1 == facility1Y) && (endX == facility1X))){
      facility2X = endX
      facility2Y = endY + 1
    }
  }
  var facility1String = JSON.stringify([facility1X, facility1Y])
  var facility2String = JSON.stringify([facility2X, facility2Y])
  var facilityIDs = [];


  for(var i = 0, l = areas[areaIndex].networks.length; i < l; i++){
    if(areas[areaIndex].networks[i].name != "pipeSegment"){
      var areaString = JSON.stringify(areas[areaIndex].networks[i].points)
      if(areaString.includes(facility1String)){
        facilityIDs.push(areas[areaIndex].networks[i].index)
      }
    }
  }


  for(var i = 0, l = areas[areaIndex].networks.length; i < l; i++){
    if(areas[areaIndex].networks[i].name != "pipeSegment"){
      var areaString = JSON.stringify(areas[areaIndex].networks[i].points)
      if(areaString.includes(facility2String)){
        facilityIDs.push(areas[areaIndex].networks[i].index)
      }
    }
  }
  if(useTrueCoords){
    endPoints = portEndPoints
  }

  // console.log(facility1String + ", " + facility2String + " : " + endPoints[0] + ", " + endPoints[1])
  if(facilityIDs.length == 0){return false}


  if(facilityIDs[1] != undefined && facilityIDs[0] != facilityIDs[1]){
    // console.log(endPoints)
    // console.log(portEndPoints)
    facility1X = getNetwork(areaIndex, facilityIDs[0]).points[0][0]
    facility1Y = getNetwork(areaIndex, facilityIDs[0]).points[0][1]
    facility2X = getNetwork(areaIndex, facilityIDs[1]).points[0][0]
    facility2Y = getNetwork(areaIndex, facilityIDs[1]).points[0][1]


    networkTotal++

    var facility1PortIndex = 0;
    var facility2PortIndex = 0;
    var facility1TemplateID = 0;
    var facility2TemplateID = 0;

    for(var i = 0, l = facilities.length; i < l; i++){
      if(facilities[i].name == getNetwork(areaIndex, facilityIDs[0]).name){
        facility1TemplateID = i
      }

      if(facilities[i].name == getNetwork(areaIndex, facilityIDs[1]).name){
        facility2TemplateID = i
      }
    }


    var rotatedEndPoints = [rotate(facility1X, facility1Y, endPoints[0][0], endPoints[0][1], getNetwork(areaIndex, facilityIDs[0]).rotation), rotate(facility2X, facility2Y, endPoints[1][0], endPoints[1][1], getNetwork(areaIndex, facilityIDs[1]).rotation)]

    // var rotatedEndPoints = endPoints.slice()
    var rotatedPorts = []

    for(var c = 0, cl = facilities[facility1TemplateID].ports.length; c < cl; c++){
      rotatedPorts.push(rotate(0, 0, facilities[facility1TemplateID].ports[c].x, facilities[facility1TemplateID].ports[c].y, 0))
    }

    for(var c = 0, cl = rotatedPorts.length; c < cl; c++){

      if(getNetwork(areaIndex, facilityIDs[0]).points[0][0] + rotatedPorts[c][0] == rotatedEndPoints[0][0] && getNetwork(areaIndex, facilityIDs[0]).points[0][1] + rotatedPorts[c][1] == rotatedEndPoints[0][1]){
        facility1PortIndex = c
      }
    }

    var rotatedPorts = []

    for(var c = 0, cl = facilities[facility2TemplateID].ports.length; c < cl; c++){
      rotatedPorts.push(rotate(0, 0, facilities[facility2TemplateID].ports[c].x, facilities[facility2TemplateID].ports[c].y, 0))
    }

    for(var c = 0, cl = rotatedPorts.length; c < cl; c++){
      if(getNetwork(areaIndex, facilityIDs[1]).points[0][0] + rotatedPorts[c][0] == rotatedEndPoints[1][0] && getNetwork(areaIndex, facilityIDs[1]).points[0][1] + rotatedPorts[c][1] == rotatedEndPoints[1][1]){
        facility2PortIndex = c
      }
    }
    areas[areaIndex].links.push({facility1: [facilityIDs[0], facility1PortIndex], facility2: [facilityIDs[1], facility2PortIndex], supportingConduit: networkTotal})

    areas[areaIndex].networks.push(new Network("pipeSegment", 0, endPoints, {connectedFacilities: [facilityIDs[0], facilityIDs[1]]}, false, networkTotal))
    document.getElementById("pipeLog").innerHTML += "Added pipe connecting " + facilityIDs[0] + " and " + facilityIDs[1] + "<br>"
  }

  if(facilityIDs[1] == undefined){facilityIDs[1] = facilityIDs[0]}

  facility1X = getNetwork(areaIndex, facilityIDs[0]).points[0][0]
  facility1Y = getNetwork(areaIndex, facilityIDs[0]).points[0][1]
  facility2X = getNetwork(areaIndex, facilityIDs[1]).points[0][0]
  facility2Y = getNetwork(areaIndex, facilityIDs[1]).points[0][1]


  networkTotal++

  var facility1PortIndex = 0;
  var facility2PortIndex = 0;
  var facility1TemplateID = 0;
  var facility2TemplateID = 0;

  for(var i = 0, l = facilities.length; i < l; i++){
    if(facilities[i].name == getNetwork(areaIndex, facilityIDs[0]).name){
      facility1TemplateID = i
    }

    if(facilities[i].name == getNetwork(areaIndex, facilityIDs[1]).name){
      facility2TemplateID = i
    }
  }


  var rotatedEndPoints = [rotate(facility1X, facility1Y, endPoints[0][0], endPoints[0][1], getNetwork(areaIndex, facilityIDs[0]).rotation), rotate(facility2X, facility2Y, endPoints[1][0], endPoints[1][1], getNetwork(areaIndex, facilityIDs[1]).rotation)]

  var facility1Break = false
  var facility2Break = false

  // var rotatedEndPoints = endPoints.slice()
  var rotatedPorts = []

  for(var c = 0, cl = facilities[facility1TemplateID].ports.length; c < cl; c++){
    rotatedPorts.push(rotate(0, 0, facilities[facility1TemplateID].ports[c].x, facilities[facility1TemplateID].ports[c].y, 0))
  }

  for(var c = 0, cl = rotatedPorts.length; c < cl; c++){

    if(getNetwork(areaIndex, facilityIDs[0]).points[0][0] + rotatedPorts[c][0] == rotatedEndPoints[0][0] && getNetwork(areaIndex, facilityIDs[0]).points[0][1] + rotatedPorts[c][1] == rotatedEndPoints[0][1]){
      if(facilities[facility1TemplateID].ports[c].gender[0] == "breaker"){facility1Break = true}
    }
  }

  var rotatedPorts = []

  for(var c = 0, cl = facilities[facility2TemplateID].ports.length; c < cl; c++){
    rotatedPorts.push(rotate(0, 0, facilities[facility2TemplateID].ports[c].x, facilities[facility2TemplateID].ports[c].y, 0))
  }

  for(var c = 0, cl = rotatedPorts.length; c < cl; c++){
    if(getNetwork(areaIndex, facilityIDs[1]).points[0][0] + rotatedPorts[c][0] == rotatedEndPoints[1][0] && getNetwork(areaIndex, facilityIDs[1]).points[0][1] + rotatedPorts[c][1] == rotatedEndPoints[1][1]){
      if(facilities[facility2TemplateID].ports[c].gender[0] == "breaker"){facility2Break = true}
    }
  }
  if(facility1Break || facility2Break){
    return true;
  }

  if(logPipes){updateNetworkLog()};
  return false;

}

//A modified variant of the addPipeNetwork() function which does not require a pipe segment, used for adjacent pipe-like facilities
function addGhostNetwork(endPoints, connectionPoints){
  var facility1X = endPoints[0][0]
  var facility1Y = endPoints[0][1]
  var facility2X = endPoints[1][0]
  var facility2Y = endPoints[1][1]

  var facility1String = JSON.stringify([facility1X, facility1Y])
  var facility2String = JSON.stringify([facility2X, facility2Y])
  var facilityIDs = [];

  for(var i = 0, l = areas[areaIndex].networks.length; i < l; i++){
    if(areas[areaIndex].networks[i].name != "pipeSegment"){
      var areaString = JSON.stringify(areas[areaIndex].networks[i].points)
      if(areaString.includes(facility1String)){
        facilityIDs.push(areas[areaIndex].networks[i].index)
      }
    }
  }


  for(var i = 0, l = areas[areaIndex].networks.length; i < l; i++){
    if(areas[areaIndex].networks[i].name != "pipeSegment"){
      var areaString = JSON.stringify(areas[areaIndex].networks[i].points)
      if(areaString.includes(facility2String)){
        facilityIDs.push(areas[areaIndex].networks[i].index)
      }
    }
  }

  if(facilityIDs[1] != undefined){
    if(getNetwork(areaIndex, facilityIDs[0]).pseudoPipe == false && getNetwork(areaIndex, facilityIDs[1]).pseudoPipe == false){
      return
    }
    facility1X = getNetwork(areaIndex, facilityIDs[0]).points[0][0]
    facility1Y = getNetwork(areaIndex, facilityIDs[0]).points[0][1]
    facility2X = getNetwork(areaIndex, facilityIDs[1]).points[0][0]
    facility2Y = getNetwork(areaIndex, facilityIDs[1]).points[0][1]


    networkTotal++

    var facility1PortIndex = 0;
    var facility2PortIndex = 0;
    var facility1TemplateID = 0;
    var facility2TemplateID = 0;

    for(var i = 0, l = facilities.length; i < l; i++){
      if(facilities[i].name == getNetwork(areaIndex, facilityIDs[0]).name){
        facility1TemplateID = i
      }

      if(facilities[i].name == getNetwork(areaIndex, facilityIDs[1]).name){
        facility2TemplateID = i
      }
    }
    var rotatedEndPoints = endPoints.slice()



    var rotatedPorts = []

    for(var c = 0, cl = facilities[facility1TemplateID].ports.length; c < cl; c++){
      rotatedPorts.push(rotate(0, 0, facilities[facility1TemplateID].ports[c].x, facilities[facility1TemplateID].ports[c].y, getNetwork(areaIndex, facilityIDs[0]).rotation*-1))
    }

    for(var c = 0, cl = rotatedPorts.length; c < cl; c++){
      if(getNetwork(areaIndex, facilityIDs[0]).points[0][0] + rotatedPorts[c][0] == rotatedEndPoints[1][0] && getNetwork(areaIndex, facilityIDs[0]).points[0][1] + rotatedPorts[c][1] == rotatedEndPoints[1][1]){
        facility1PortIndex = c
      }
    }

    var rotatedPorts = []

    for(var c = 0, cl = facilities[facility2TemplateID].ports.length; c < cl; c++){
      rotatedPorts.push(rotate(0, 0, facilities[facility2TemplateID].ports[c].x, facilities[facility2TemplateID].ports[c].y, getNetwork(areaIndex, facilityIDs[1]).rotation*-1))
    }

    for(var c = 0, cl = rotatedPorts.length; c < cl; c++){
      if(getNetwork(areaIndex, facilityIDs[1]).points[0][0] + rotatedPorts[c][0] == rotatedEndPoints[0][0] && getNetwork(areaIndex, facilityIDs[1]).points[0][1] + rotatedPorts[c][1] == rotatedEndPoints[0][1]){
        facility2PortIndex = c
      }
    }


    areas[areaIndex].links.push({facility1: [facilityIDs[0], facility1PortIndex], facility2: [facilityIDs[1], facility2PortIndex], supportingConduit: networkTotal})

    areas[areaIndex].networks.push(new Network("pipeSegment", 0, [endPoints[0], endPoints[0]], {connectedFacilities: [facilityIDs[0], facilityIDs[1]]}, false, networkTotal))
    document.getElementById("pipeLog").innerHTML += "Added pipe connecting " + facilityIDs[0] + " and " + facilityIDs[1] + "<br>"
  }

  if(logPipes){updateNetworkLog()};

}

var updateDirection = "";

//Used in the pipe removal function to determine what state a pipe should revert to when losing a connection
function updatePipe(x, y, sourceX, sourceY){
  if(x < 0 || x > 63 || y < 0 || y > 39){
    return;
  }

  var mapData = getMapData(x, y)


  if("p&-".includes(mapData)){
    return;
  }

  var conduitIndex = (getConduitIndex(getTile("tiles", mapData)[0].split("_")[0]))

  if(conduitIndex === undefined){
    conduitIndex = getConduitIndex(conduitSelected)
  }

  for(var i = 0, l = activeOverlay.length; i < l; i++){
    if(activeOverlay[i].type == "pipe" && activeOverlay[i].x == x && activeOverlay[i].y == y){
      if(x == sourceX && y > sourceY){
        if(activeOverlay[i].texture == "pipe_submerge"){
          if(activeOverlay[i].rotation > 3.1 && activeOverlay[i].rotation < 3.2){
            activeOverlay.splice(i, 1)
            i--
            l--
            continue;
          }
        }
        if(activeOverlay[i].texture == "pipe_corner"){
          if((activeOverlay[i].rotation > 4.7 && activeOverlay[i].rotation < 4.8) || activeOverlay[i].rotation == 0){
            activeOverlay.splice(i, 1)
            i--
            l--
            continue;
          }
        }
      }

      if(x == sourceX && y < sourceY){
        if(activeOverlay[i].texture == "pipe_submerge"){
          if(activeOverlay[i].rotation == 0){
            activeOverlay.splice(i, 1)
            i--
            l--
            continue;
          }
        }
        if(activeOverlay[i].texture == "pipe_corner"){
          if((activeOverlay[i].rotation > 1.5 && activeOverlay[i].rotation < 1.6) || (activeOverlay[i].rotation > 3.1 && activeOverlay[i].rotation < 3.2)){
            activeOverlay.splice(i, 1)
            i--
            l--
            continue;
          }
        }
      }

      if(x > sourceX && y == sourceY){
        if(activeOverlay[i].texture == "pipe_submerge"){
          if(activeOverlay[i].rotation > 1.5 && activeOverlay[i].rotation < 1.6){
            activeOverlay.splice(i, 1)
            i--
            l--
            continue;
          }
        }
        if(activeOverlay[i].texture == "pipe_corner"){
          if((activeOverlay[i].rotation > 4.7 && activeOverlay[i].rotation < 4.8) || (activeOverlay[i].rotation > 3.1 && activeOverlay[i].rotation < 3.2)){
            activeOverlay.splice(i, 1)
            i--
            l--
            continue;
          }
        }
      }

      if(x < sourceX && y == sourceY){
        if(activeOverlay[i].texture == "pipe_submerge"){
          if(activeOverlay[i].rotation > -1.6 && activeOverlay[i].rotation < -1.5){
            activeOverlay.splice(i, 1)
            i--
            l--
            continue;
          }
        }
        if(activeOverlay[i].texture == "pipe_corner"){
          if((activeOverlay[i].rotation > 1.5 && activeOverlay[i].rotation < 1.6) || (activeOverlay[i].rotation == 0)){
            activeOverlay.splice(i, 1)
            i--
            l--
            continue;
          }
        }
      }
    }
  }

  if(mapData == "X"){
    if(updateDirection == "x" || updateDirection == ""){
      if((conduits[conduitIndex].top + conduits[conduitIndex].v + conduits[conduitIndex].tl + conduits[conduitIndex].tr + "pX").includes(getMapData(x, y-1)) && (conduits[conduitIndex].bottom + conduits[conduitIndex].v + conduits[conduitIndex].bl + conduits[conduitIndex].br + "pX").includes(getMapData(x, y+1))){
        changeMapData(x, y, conduits[conduitIndex].v)
        updateDirection = "x"
        updatePipe(x-1, y)
        updatePipe(x+1, y)
      }
    }

    if(updateDirection == "y" || updateDirection == ""){
      if((conduits[conduitIndex].left + conduits[conduitIndex].h + conduits[conduitIndex].tl + conduits[conduitIndex].bl + "pX").includes(getMapData(x-1, y)) && (conduits[conduitIndex].right + conduits[conduitIndex].h + conduits[conduitIndex].tr + conduits[conduitIndex].br + "pX").includes(getMapData(x+1, y))){
        changeMapData(x, y, conduits[conduitIndex].h)
        updateDirection = "y"
        updatePipe(x, y-1)
        updatePipe(x, y+1)
      }
    }
  }else{
    var connections = getPipeConnections(x, y)
    var stableConnections = ""
    conduits[conduitIndex]
    if(connections.includes("b")){
      if((conduits[conduitIndex].v + conduits[conduitIndex].corners + conduits[conduitIndex].bottom + "Xp").includes(getMapData(x, y+1))){
        stableConnections += "b"
      }
    }
    if(connections.includes("l")){
      if((conduits[conduitIndex].h + conduits[conduitIndex].corners + conduits[conduitIndex].left + "Xp").includes(getMapData(x-1, y))){
        stableConnections += "l"
      }
    }
    if(connections.includes("r")){
      if((conduits[conduitIndex].h + conduits[conduitIndex].corners + conduits[conduitIndex].right + "Xp").includes(getMapData(x+1, y))){
        stableConnections += "r"
      }
    }
    if(connections.includes("t")){
      if((conduits[conduitIndex].v + conduits[conduitIndex].corners + conduits[conduitIndex].top + "Xp").includes(getMapData(x, y-1))){
        stableConnections += "t"
      }
    }
    if(stableConnections != ""){
      var newPipe = getPipeId(stableConnections, conduitIndex)
      if(getMapData(x, y) != newPipe){
        changeMapData(x, y, newPipe)
      }
    }else{
      changeMapData(x, y, "-")
    }

  }


}

//Removes a network from the network array based on coordinates, and any links which rely on it
function killNetwork(x, y){
  var stringified = JSON.stringify([x, y])
  for(var i = 0, l = areas[areaIndex].networks.length; i < l; i++){
    if(areas[areaIndex].networks[i].name == "pipeSegment"){
      if(JSON.stringify(areas[areaIndex].networks[i].points[0]) == stringified || JSON.stringify(areas[areaIndex].networks[i].points[1]) == stringified){
        for(var k = 0, ll = areas[areaIndex].links.length; k < ll; k++){
          if(areas[areaIndex].links[k].supportingConduit == areas[areaIndex].networks[i].index){
            document.getElementById("pipeLog").innerHTML += ("Killed pipe connecting " + areas[areaIndex].networks[i].data.connectedFacilities[0] + " and " + areas[areaIndex].networks[i].data.connectedFacilities[1] + "<br>")
            areas[areaIndex].links.splice(k, 1)
            k--
            ll--
          }
        }
        for(var k = 0, kl = areas[areaIndex].networks.length; k < kl; k++){
          for(var j = 0, jl = areas[areaIndex].networks[k].warnings.length; j < jl; j++){
            if(areas[areaIndex].networks[k].warnings[j][1] == areas[areaIndex].networks[i].index){
              areas[areaIndex].networks[k].warnings.splice(j, 1)
            }
          }
        }
        areas[areaIndex].networks.splice(i, 1)
        i--
        l--

      }
    }
  }
}

function checkDuplicate(array, value){
  return array.some(function(item) {
    return value == item[0];
  })
}


var crossingPipe = false;

//Adds a pipe at the specified coords and connects it to the surrounding ones. Also used for deleting a pipe or facility because S P A G H E T T I C O D E
function addPipe(x, y, mode){
  if(document.getElementById('centerDisplay').style.opacity == "1"){
    return;
  }
  var conduitIndex = getConduitIndex(conduitSelected)
  if(key(16) || conduitSelected == "erase" || mode == "erase"){
    previousPipeX = x;
    previousPipeY = y;
    if(doingTutorial){return}
    conduitIndex = 0;
    var mapData = getMapData(x, y)

    for(var i = 0, l = activeOverlay.length; i < l; i++){
      if(activeOverlay[i].type == "pipe" && activeOverlay[i].x == x && activeOverlay[i].y == y){
        activeOverlay.splice(i, 1)
        i--
        l--
      }
    }

    if("p&".includes(mapData)){
      var coordString = JSON.stringify([x, y])
      var facilityIndex = -1;
      for(var i = 0, l = areas[areaIndex].networks.length; i < l; i++){
        if(JSON.stringify(areas[areaIndex].networks[i].points).includes(coordString)){
          if(areas[areaIndex].networks[i].name == "ship"){
            return
          }
          facilityIndex = i;
          x = areas[areaIndex].networks[i].points[0][0]
          y = areas[areaIndex].networks[i].points[0][1]
          for(var k = 0, ll = areas[areaIndex].networks.length; k < ll; k++){
            if(areas[areaIndex].networks[k].name == "pipeSegment"){
              if(areas[areaIndex].networks[k].data.connectedFacilities[0] == areas[areaIndex].networks[i].index || areas[areaIndex].networks[k].data.connectedFacilities[1] == areas[areaIndex].networks[i].index){
                killNetwork(areas[areaIndex].networks[k].points[0][0], areas[areaIndex].networks[k].points[0][1])
                var difference = ll-k
                ll = areas[areaIndex].networks.length
                k = ll-difference
              }
            }
          }

          for(var k = 0, ll = areas[areaIndex].networks[facilityIndex].points.length; k < ll; k++){
            changeMapData(areas[areaIndex].networks[facilityIndex].points[k][0], areas[areaIndex].networks[facilityIndex].points[k][1], "-")

            updatePipe(areas[areaIndex].networks[facilityIndex].points[k][0] + 1, areas[areaIndex].networks[facilityIndex].points[k][1], x, y)
            updatePipe(areas[areaIndex].networks[facilityIndex].points[k][0] - 1, areas[areaIndex].networks[facilityIndex].points[k][1], x, y)
            updatePipe(areas[areaIndex].networks[facilityIndex].points[k][0], areas[areaIndex].networks[facilityIndex].points[k][1] + 1, x, y)
            updatePipe(areas[areaIndex].networks[facilityIndex].points[k][0], areas[areaIndex].networks[facilityIndex].points[k][1] - 1, x, y)
          }

          areas[areaIndex].networks.splice(i, 1)
          break;
        }
      }

      //I am leaving this code around just in case because I forget what it is for

      // changeMapData(x, y, "-")
      // changeMapData(x+1, y, "-")
      // changeMapData(x, y+1, "-")
      // changeMapData(x+1, y+1, "-")

      // updatePipe(x, y-1)
      // updatePipe(x+1, y-1)

      // updatePipe(x+2, y)
      // updatePipe(x+2, y+1)

      // updatePipe(x, y+2)
      // updatePipe(x+1, y+2)

      // updatePipe(x-1, y)
      // updatePipe(x-1, y+1)

    }else{
      var directionals = ""
      directionals = getPipeConnections(x, y)
      // if(mapData == "1"){
      //   directionals = "lr"
      // }
      // if(mapData == "2"){
      //   directionals = "tb"
      // }
      // if(mapData == "3"){
      //   directionals = "br"
      // }
      // if(mapData == "4"){
      //   directionals = "bl"
      // }
      // if(mapData == "5"){
      //   directionals = "tr"
      // }
      // if(mapData == "6"){
      //   directionals = "tl"
      // }


      killNetwork(x, y)

      updateDirection = "";

      changeMapData(x, y, "-")
      updatePipe(x, y-1, x, y)
      updatePipe(x, y+1, x, y)
      updatePipe(x-1, y, x, y)
      updatePipe(x+1, y, x, y)

      var armEndPoints = [];
      var endPoints = [];
      for(var j = 0, l = areas[areaIndex].networks.length; j < l; j++){
        if(areas[areaIndex].networks[j].name == 'pipeSegment'){
          endPoints.push(areas[areaIndex].networks[j].points[0])
          endPoints.push(areas[areaIndex].networks[j].points[1])
        }
      }
      endPoints = JSON.stringify(endPoints)
      if(directionals.includes("t")){
        if((conduits[conduitIndex].segments).includes(getMapData(x, y-1)) && getMapData(x, y-1) != "~"){
          armEndPoints = updateNetwork(x, y-1)[1]
          if(endPoints.includes(JSON.stringify(armEndPoints[0]))){
            killNetwork(armEndPoints[0][0], armEndPoints[0][1])
          }
          if(endPoints.includes(JSON.stringify(armEndPoints[1]))){

            killNetwork(armEndPoints[1][0], armEndPoints[1][1])
          }
        }
      }
      if(directionals.includes("b")){
        if((conduits[conduitIndex].segments).includes(getMapData(x, y+1)) && getMapData(x, y+1) != "~"){
          armEndPoints = updateNetwork(x, y+1)[1]
          if(endPoints.includes(JSON.stringify(armEndPoints[0]))){
            killNetwork(armEndPoints[0][0], armEndPoints[0][1])
          }
          if(endPoints.includes(JSON.stringify(armEndPoints[1]))){
            killNetwork(armEndPoints[1][0], armEndPoints[1][1])
          }
        }
      }
      if(directionals.includes("l")){
        if((conduits[conduitIndex].segments).includes(getMapData(x-1, y)) && getMapData(x-1, y) != "1"){
          armEndPoints = updateNetwork(x-1, y)[1]
          if(endPoints.includes(JSON.stringify(armEndPoints[0]))){
            killNetwork(armEndPoints[0][0], armEndPoints[0][1])
          }
          if(endPoints.includes(JSON.stringify(armEndPoints[1]))){
            killNetwork(armEndPoints[1][0], armEndPoints[1][1])
          }
        }
      }
      if(directionals.includes("r")){
        if((conduits[conduitIndex].segments).includes(getMapData(x+1, y)) && getMapData(x+1, y) != "1"){
          armEndPoints = updateNetwork(x+1, y)[1]
          if(endPoints.includes(JSON.stringify(armEndPoints[0]))){
            killNetwork(armEndPoints[0][0], armEndPoints[0][1])
          }
          if(endPoints.includes(JSON.stringify(armEndPoints[1]))){
            killNetwork(armEndPoints[1][0], armEndPoints[1][1])
          }
        }
      }
      if(logPipes){updateNetworkLog()}

    }

  }else{
    crossingPipe = false;
    if(beginMouseHold){
      previousPipeX = x;
      previousPipeY = y;
    }

    if((previousPipeX != x || previousPipeY != y) && (conduits[conduitIndex].corners + conduits[conduitIndex].v + conduits[conduitIndex].h).includes(getMapData(x, y))){
      beginMouseHold = true

      crossingPipe = true
    }

    if(("-p" + conduits[conduitIndex].endPoints).includes(getMapData(x, y))){
      if(!beginMouseHold){
        if(getMapData(x, y) == "-"){changeMapData(x, y, conduits[conduitIndex].stub)}
        if((conduits[conduitIndex].endPoints + conduits[conduitIndex].stub + "p-").includes(getMapData(previousPipeX, previousPipeY))){
          connectPipes(x, y, previousPipeX, previousPipeY)
        }
      }

      if(beginMouseHold && getMapData(x, y) == "-"){
        changeMapData(x, y, conduits[conduitIndex].stub)
        if(conduits[conduitIndex].endPoints.includes(getMapData(x, y-1))){
          connectPipes(x, y, x, y-1)
          previousPipeX = x;
          previousPipeY = y;
        }else if(conduits[conduitIndex].endPoints.includes(getMapData(x, y+1))){
          connectPipes(x, y, x, y+1)
          previousPipeX = x;
          previousPipeY = y;
        }else if(conduits[conduitIndex].endPoints.includes(getMapData(x-1, y))){
          connectPipes(x, y, x-1, y)
          previousPipeX = x;
          previousPipeY = y;
        }else if(conduits[conduitIndex].endPoints.includes(getMapData(x+1, y))){
          connectPipes(x, y, x+1, y)
          previousPipeX = x;
          previousPipeY = y;
        }else if(getMapData(x, y-1) == "p"){
          connectPipes(x, y, x, y-1)
          previousPipeX = x;
          previousPipeY = y;
        }else if(getMapData(x, y+1) == "p"){
          connectPipes(x, y, x, y+1)
          previousPipeX = x;
          previousPipeY = y;
        }else if(getMapData(x-1, y) == "p"){
          connectPipes(x, y, x-1, y)
          previousPipeX = x;
          previousPipeY = y;
        }else if(getMapData(x+1, y) == "p"){
          connectPipes(x, y, x+1, y)
          previousPipeX = x;
          previousPipeY = y;
        }
      }

      if(getMapData(x, y) == conduits[conduitIndex].stub){
        changeMapData(x, y, "-")
      }
      if(previousPipeX != x || previousPipeY != y){
        neighbourX = previousPipeX;
        neighbourY = previousPipeY;
      }
      previousPipeX = x;
      previousPipeY = y;
    }

    if(endMouseHold && conduits[conduitIndex].endPoints.includes(getMapData(x, y))){
      var connectionCoords = [];
      if(conduits[conduitIndex].endPoints.includes(getMapData(x, y-1)) || getMapData(x, y-1) == "p"){
        connectionCoords = [x, y, x, y-1]
      }
      if(conduits[conduitIndex].endPoints.includes(getMapData(x, y+1)) || getMapData(x, y+1) == "p"){
        if(connectionCoords.length == 0){connectionCoords = [x, y, x, y+1]}else{connectionCoords = [0]}
      }
      if(conduits[conduitIndex].endPoints.includes(getMapData(x-1, y)) || getMapData(x-1, y) == "p"){
        if(connectionCoords.length == 0){connectionCoords = [x, y, x-1, y]}else{connectionCoords = [0]}
      }
      if(conduits[conduitIndex].endPoints.includes(getMapData(x+1, y)) || getMapData(x+1, y) == "p"){
        if(connectionCoords.length == 0){connectionCoords = [x, y, x+1, y]}else{connectionCoords = [0]}
      }


      if(connectionCoords.length == 4){
        connectPipes(connectionCoords[0], connectionCoords[1], connectionCoords[2], connectionCoords[3])
      }
    }

    if((conduits[conduitIndex].endPoints + "p").includes(getMapData(x, y)) && (conduits[conduitIndex].endPoints + "p").includes(getMapData(previousPipeX, previousPipeY)) && (Math.abs(x-previousPipeX) == 1 || Math.abs(y-previousPipeY) == 1)){
      connectPipes(x, y, previousPipeX, previousPipeY)
      previousPipeX = x;
      previousPipeY = y;
    }



    if(crossingPipe){
      beginMouseHold = false;
    }
  }
}





var networkTotal = 0;

//Return a network based in the area it is in and its id
function getNetwork(area, id){
  for(var i = 0, l = areas[area].networks.length; i < l; i++){
    if(areas[area].networks[i].index == id){
      return areas[area].networks[i]
    }
  }
}

//Used for generating a new facility and the data that powers it. Pipe network generation is below with the createPipeNetwork() function
function createNetwork(x, y, type, modifiers){
  if(modifiers === undefined){
    modifiers = ""
  }
  networkTotal++
  for(var i = 0, l = facilities.length; i < l; i++){
    if(facilities[i].name == type){
      var facilityTotal = 0;
      for(var j = 0, jl = areas[areaIndex].networks.length; j < jl; j++){
        if(areas[areaIndex].networks[j].name == type){
          facilityTotal++
        }
      }
      if(facilityTotal >= facilities[i].limit){
        notify("You have the maximum number of "+facilities[i].name.split("_").join(" ")+"s placed on the map ("+facilities[i].limit+"/"+facilities[i].limit+").<br>Delete them to place more, or raise the limit by completing missions.", 400);
        return;
      }
      var rotation = 0;
      var facilityCoordinates = [];
      var facilityData = {};

      eval(modifiers)

      var rotatedLayout = []
      for(var k = 0, kl = facilities[i].layout.length; k < kl; k++){
        rotatedLayout.push(rotate(0, 0, facilities[i].layout[k][0], facilities[i].layout[k][1], rotation*-1))
      }


      for(var k = 0, kl = rotatedLayout.length; k < kl; k++){
        changeMapData(x + rotatedLayout[k][0], y + rotatedLayout[k][1], "p")
        facilityCoordinates.push([x + rotatedLayout[k][0], y + rotatedLayout[k][1]])
      }
      for(var k = 0, kl = facilities[i].storage.length; k < kl; k++){
        eval("facilityData." + facilities[i].storage[k] + " = 0")
      }
      facilityData.portsInUse = []
      for(var k = 0, kl = facilities[i].ports.length; k < kl; k++){
        facilityData.portsInUse.push(false)
      }
      if(!(facilities[i].data === undefined)){
        for(var k = 0, kl = facilities[i].data.length; k < kl; k++){
          eval("facilityData." + facilities[i].data[k][0] + " = " + facilities[i].data[k][1])
        }
      }

      areas[areaIndex].networks.push(new Network(type, rotation, facilityCoordinates, facilityData, facilities[i].pseudoPipe, networkTotal))

      var rotatedPorts = []
      for(var k = 0, kl = facilities[i].ports.length; k < kl; k++){
        var portSourceX = facilities[i].ports[k].x;
        var portSourceY = facilities[i].ports[k].y;
        if(facilities[i].ports[k].x == -1){
          portSourceX = 0
        }
        if(facilities[i].ports[k].x == facilities[i].width){
          portSourceX = facilities[i].width - 1
        }
        if(facilities[i].ports[k].y == -1){
          portSourceY = 0
        }
        if(facilities[i].ports[k].y == facilities[i].height){
          portSourceY = facilities[i].height - 1
        }

        rotatedPorts.push([rotate(x, y, x + facilities[i].ports[k].x, y + facilities[i].ports[k].y, rotation*-1), rotate(x, y, x + portSourceX, y + portSourceY, rotation*-1)])

        var pipeDisconnectCheck
      }

      for(var k = 0, kl = rotatedPorts.length; k < kl; k++){
        if(getTile("tiles", getMapData(rotatedPorts[k][0][0], rotatedPorts[k][0][1]))[0] == "connector"){
          addGhostNetwork([[rotatedPorts[k][0][0] + rotatedPorts[k][1][0] - x, rotatedPorts[k][0][1] + rotatedPorts[k][1][1] - y], [rotatedPorts[k][0][0] - (rotatedPorts[k][0][0] - x), rotatedPorts[k][0][1] - (rotatedPorts[k][0][1] - y)]], [[rotatedPorts[k][0][0] - x, rotatedPorts[k][0][1] - y], [0,  0]])
        }else if(conduits[0].endPoints.includes(getMapData(rotatedPorts[k][0][0], rotatedPorts[k][0][1]))){
          if(facilities[i].ports[k].gender[0] != "breaker"){
            connectPipes(rotatedPorts[k][0][0], rotatedPorts[k][0][1], rotatedPorts[k][1][0], rotatedPorts[k][1][1])
          }
        }
      }

      break;
    }
  }

  if(logPipes){updateNetworkLog()}
}

//Changes the network log in the debug menu
function updateNetworkLog(){
  document.getElementById("networkLog").innerHTML = ""
  for(var j = 0, ll = areas.length; j < ll; j++){
    document.getElementById("networkLog").innerHTML += areas[j].name + " {<br>"
    for(var i = 0, l = areas[j].networks.length; i < l; i++){
      document.getElementById("networkLog").innerHTML += "&nbsp&nbsp" + areas[j].networks[i].name + " " + JSON.stringify(areas[j].networks[i].points) + " " + JSON.stringify(areas[j].networks[i].data) + " : " + areas[j].networks[i].index + "<br>"
    }
    document.getElementById("networkLog").innerHTML += "}<br><br>"
  }
}

//Returns endpoints for a pipe segment network, given coordinates. I have no idea why I named it updateNetwork because it certainly does not
function updateNetwork(x, y, giveTrueCoords){
  count++;
  if(giveTrueCoords == undefined){
    giveTrueCoords = true
  }
  conduitIndex = getConduitIndex(conduitSelected)
  if(conduitSelected == "erase"){conduitIndex = 0}
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



  // if(giveTrueCoords){
    var validConduitSegments = (conduits[conduitIndex].segments + "Xp")
  // }else{
    // var validConduitSegments = (conduits[conduitIndex].segments + "X")
  // }

  var currentTargets = [[x, y], [x, y]]
  var previousTargets = [[x, y], [x, y]]
  while(counter < 10000){
    counter++
    if(secondSide){
      previousTargets[1] = currentTargets[1].slice()
      currentTargets[1] = [targetX, targetY]
    }else{
      previousTargets[0] = currentTargets[0].slice()
      currentTargets[0] = [targetX, targetY]
    }

    if(getMapData(targetX, targetY) == "X"){
      targetX += xMotion;
      targetY += yMotion;
      continue;
    }

    var connections = getPipeConnections(targetX, targetY)


    if(connections.includes("b") && validConduitSegments.includes(getMapData(targetX, targetY+1)) && yMotion != -1){
      targetY += 1;
      xMotion = 0;
      yMotion = 1;
      continue;
    }
    if(connections.includes("l") && validConduitSegments.includes(getMapData(targetX-1, targetY)) && xMotion != 1){
      targetX -= 1;
      xMotion = -1;
      yMotion = 0;
      continue;
    }
    if(connections.includes("r") && validConduitSegments.includes(getMapData(targetX+1, targetY)) && xMotion != -1){
      targetX += 1;
      xMotion = 1;
      yMotion = 0;
      continue;
    }
    if(connections.includes("t") && validConduitSegments.includes(getMapData(targetX, targetY-1)) && yMotion != 1){
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
        cachedX = -1;
        xMotion = cachedXMotion;
        yMotion = cachedYMotion;
        secondSide = true;
        continue;
      }else if(!giveTrueCoords){
        endPoints[0][0] = cachedX;
        endPoints[0][1] = cachedY;
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
  // if(!giveTrueCoords){
  //   endPoints[0][0] = cachedX;
  //   endPoints[0][1] = cachedY;
  // }
  // console.log(previousTargets)
  return [endPoints, previousTargets];
}

var framesElapsed = 0;


var tintCanvas = document.createElement("canvas")
tintCanvas.style.display = "none"

//Tints an image and returns the result
function tint(texture, color, amount){
  var textureData = game.getTexture(texture)
  tintCanvas.width = textureData.width
  tintCanvas.height = textureData.height
  tintCanvas.getContext("2d").drawImage(textureData, 0, 0, textureData.width, textureData.height)
  tintCanvas.getContext("2d").fillStyle = color
  tintCanvas.getContext("2d").globalCompositeOperation = "source-atop"
  tintCanvas.getContext("2d").globalAlpha = amount
  tintCanvas.getContext("2d").fillRect(0, 0, textureData.width, textureData.height)
  return tintCanvas
}

//If you still can't find what you are looking for, try the templates.js or main.js files
