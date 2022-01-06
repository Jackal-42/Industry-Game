//NOTE TO SELF
//Valves that allow you to control how oil is distributed among your facilities or manually controlled
//Oil prices fluctuate depending on what is happening in the world and you can hold oil until there is more demand
//Oil production fluctuates, it will make sense to save oil in warehouses to prepare for shortages
//Computerized valve that can change flow depending on any variable


var game = new Game("game");
var framesElapsed = 0;
var mouseDown = false;

game.addLayer("oil")
game.getLayer("oil").clearFrames = false;
game.addLayer("terrain")
game.getLayer("terrain").clearFrames = false;

game.addLayer("main")
game.addLayer("water")

game.addLayer("effects")
game.getLayer("effects").clearFrames = false;
game.getLayer("effects").canvas.style.zIndex = 1
game.getLayer("effects").canvas.addEventListener("mousedown", function(){mouseDown = true;})
game.getLayer("effects").canvas.addEventListener("mouseup", function(){mouseDown = false;})




//KEEP
game.addTexture("selector", "docs/assets/selector.png")
game.addTexture("null", "docs/assets/null.png")

game.addTexture("pipe_icon", "docs/assets/pipe_icon.png")//R
game.addTexture("rail_icon", "docs/assets/rail_icon.png")//B
game.addTexture("erase_icon", "docs/assets/erase_icon.png")

var tileIds = ("X-p&" + "~1234567890=qwertyuio[]asdfghjklzxcvbnm,./!@#$%^*()_+QWERTYUIOP{}|ASDFGHJKL:ZCVBNM<>?").split("")

//RESERVED: [ X ] [ - ] [ p ] [ & ]

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
  ["grass", "docs/assets/grass.png"],
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

var intersectors = ["pipe"]

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

function getConduitIndex(id){
  for(var i = 0, l = conduits.length; i < l; i++){
    if(conduits[i].id == id){
      return i
    }
  }
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
game.addTexture("warehouse", "docs/assets/warehouse.png")
game.addTexture("refinery", "docs/assets/refinery.png")
game.addTexture("distiller", "docs/assets/distiller.png")
game.addTexture("residue_processor", "docs/assets/residue_processor.png")
game.addTexture("gas_processor", "docs/assets/gas_processor.png")
game.addTexture("hydrotreater", "docs/assets/hydrotreater.png")
game.addTexture("crude_source", "docs/assets/crude_source.png")
game.addTexture("hydrogen_source", "docs/assets/hydrogen_source.png")

var fluids = ["crude_oil", "crude_vapor", "crude_kerosene", "crude_naphtha", "residue", "vapor", "kerosene", "naphtha", "hydrogen", "water", "light_oil", "heavy_oil", "crude_propane", "propane", "crude_butane", "butane"]

var facilities = [
  {
    name: "distiller",
    width: 1,
    height: 2,
    maxItems: 2,
    storage: ["crude_oil", "crude_vapor", "crude_kerosene", "crude_naphtha", "residue"],
    layout: [[0, 0], [0, 1]],
    process: function(me){
      me.data.crude_vapor += me.data.crude_oil/4
      me.data.crude_naphtha += me.data.crude_oil/4
      me.data.crude_kerosene += me.data.crude_oil/4
      me.data.residue += me.data.crude_oil/4
      me.data.crude_oil = 0;
    },
    ports: [
      {
        x: 0,
        y: -1,
        conduit: "pipe",
        gender: ["output", ["crude_vapor"]],
      },

      {
        x: 1,
        y: 0,
        conduit: "pipe",
        gender: ["output", ["crude_naphtha"]],
      },

      {
        x: 1,
        y: 1,
        conduit: "pipe",
        gender: ["output", ["crude_kerosene"]],
      },

      {
        x: 0,
        y: 2,
        conduit: "pipe",
        gender: ["output", ["residue"]],
      },

      {
        x: -1,
        y: 0,
        conduit: "pipe",
        gender: ["input", ["crude_oil"]],
      },

      {
        x: -1,
        y: 1,
        conduit: "pipe",
        gender: ["input", ["crude_oil"]],
      },
    ],
  },

  {
    name: "residue_processor",
    width: 1,
    height: 2,
    maxItems: 2,
    storage: ["residue", "light_oil", "heavy_oil"],
    layout: [[0, 0], [0, 1]],
    process: function(me){
      me.data.light_oil += me.data.residue/2
      me.data.heavy_oil += me.data.residue/2
      me.data.residue = 0;
    },
    ports: [
      {
        x: 0,
        y: -1,
        conduit: "pipe",
        gender: ["input", ["residue"]],
      },

      {
        x: 1,
        y: 0,
        conduit: "pipe",
        gender: ["output", ["light_oil"]],
      },

      {
        x: 1,
        y: 1,
        conduit: "pipe",
        gender: ["output", ["heavy_oil"]],
      },

      {
        x: 0,
        y: 2,
        conduit: "pipe",
        gender: ["input", ["residue"]],
      },

      {
        x: -1,
        y: 0,
        conduit: "pipe",
        gender: ["input", ["residue"]],
      },

      {
        x: -1,
        y: 1,
        conduit: "pipe",
        gender: ["input", ["residue"]],
      },
    ],
  },

  {
    name: "gas_processor",
    width: 1,
    height: 2,
    maxItems: 2,
    storage: ["crude_vapor", "crude_propane", "crude_butane"],
    layout: [[0, 0], [0, 1]],
    process: function(me){
      me.data.crude_propane += me.data.crude_vapor/2
      me.data.crude_butane += me.data.crude_vapor/2
      me.data.crude_vapor = 0;
    },
    ports: [
      {
        x: 0,
        y: -1,
        conduit: "pipe",
        gender: ["input", ["crude_vapor"]],
      },

      {
        x: 1,
        y: 0,
        conduit: "pipe",
        gender: ["output", ["crude_propane"]],
      },

      {
        x: 1,
        y: 1,
        conduit: "pipe",
        gender: ["output", ["crude_butane"]],
      },

      {
        x: 0,
        y: 2,
        conduit: "pipe",
        gender: ["input", ["crude_vapor"]],
      },

      {
        x: -1,
        y: 0,
        conduit: "pipe",
        gender: ["input", ["crude_vapor"]],
      },

      {
        x: -1,
        y: 1,
        conduit: "pipe",
        gender: ["input", ["crude_vapor"]],
      },
    ],
  },

  {
    name: "hydrotreater",
    width: 2,
    height: 1,
    maxItems: 1,
    storage: ["hydrogen", "crude_vapor", "crude_kerosene", "crude_naphtha", "vapor", "kerosene", "naphtha"],
    layout: [[0, 0], [1, 0]],
    process: function(me){
      while(true){
        if(me.data.hydrogen >= 1){
          if(me.data.crude_kerosene >= 1){
            me.data.hydrogen -= 1;
            me.data.crude_kerosene -= 1;
            me.data.kerosene += 1;
            continue;
          }
          if(me.data.crude_vapor >= 1){
            me.data.hydrogen -= 1;
            me.data.crude_vapor -= 1;
            me.data.vapor += 1;
            continue;
          }
          if(me.data.crude_naphtha >= 1){
            me.data.hydrogen -= 1;
            me.data.crude_naphtha -= 1;
            me.data.naphtha += 1;
            continue;
          }
          break;
        }
        break;
      }
    },
    ports: [
      {
        x: 0,
        y: -1,
        conduit: "pipe",
        gender: ["input", ["hydrogen"]],
      },

      {
        x: 1,
        y: -1,
        conduit: "pipe",
        gender: ["input", ["hydrogen"]],
      },

      {
        x: 2,
        y: 0,
        conduit: "pipe",
        gender: ["output", ["kerosene", "naphtha", "vapor"]]
      },

      {
        x: 1,
        y: 1,
        conduit: "pipe",
        gender: ["input", ["hydrogen"]],
      },

      {
        x: 0,
        y: 1,
        conduit: "pipe",
        gender: ["input", ["hydrogen"]],
      },

      {
        id: "main_input",
        x: -1,
        y: 0,
        conduit: "pipe",
        gender: ["input", ["crude_kerosene", "crude_naphtha", "crude_vapor"]],
      },
    ],
  },

  {
    name: "ship",
    width: 2,
    height: 4,
    maxItems: 256,
    storage: ["vapor", "kerosene", "naphtha"],
    layout: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]],
    process: function(me){
      funds += me.data.vapor * 20
      funds += me.data.kerosene * 10
      funds += me.data.naphtha * 15
      me.data.vapor = 0;
      me.data.kerosene = 0;
      me.data.naphtha = 0;
    },
    ports: [
      {
        x: -1,
        y: 0,
        conduit: "pipe",
        gender: ["input", ["kerosene", "naphtha", "vapor"]],
      },

      {
        x: -1,
        y: 1,
        conduit: "pipe",
        gender: ["input", ["kerosene", "naphtha", "vapor"]],
      },

      {
        x: -1,
        y: 2,
        conduit: "pipe",
        gender: ["input", ["kerosene", "naphtha", "vapor"]],
      },

      {
        x: 2,
        y: 0,
        conduit: "pipe",
        gender: ["input", ["kerosene", "naphtha", "vapor"]],
      },

      {
        x: 2,
        y: 1,
        conduit: "pipe",
        gender: ["input", ["kerosene", "naphtha", "vapor"]],
      },

      {
        x: 2,
        y: 2,
        conduit: "pipe",
        gender: ["input", ["kerosene", "naphtha", "vapor"]],
      },      
    ],
  },

  {
    name: "tank",
    width: 2,
    height: 2,
    maxItems: 20,
    storage: fluids.slice(),
    data: [["storedItem", 0]],
    layout: [[0, 0], [0, 1], [1, 0], [1, 1]],
    process: function(me){
      if(me.data.storedItem != 0 && eval("me.data." + me.data.storedItem) == 0){
        me.data.storedItem = 0
      }
    },
    ports: [
      {
        x: -1,
        y: 0,
        conduit: "pipe",
        gender: ["modular", ["null"]],
      },

      {
        x: -1,
        y: 1,
        conduit: "pipe",
        gender: ["modular", ["null"]],
      },

      {
        x: 0,
        y: 2,
        conduit: "pipe",
        gender: ["modular", ["null"]],
      },

      {
        x: 1,
        y: 2,
        conduit: "pipe",
        gender: ["modular", ["null"]],
      },

      {
        x: 2,
        y: 1,
        conduit: "pipe",
        gender: ["modular", ["null"]],
      },

      {
        x: 2,
        y: 0,
        conduit: "pipe",
        gender: ["modular", ["null"]],
      },

      {
        x: 0,
        y: -1,
        conduit: "pipe",
        gender: ["modular", ["null"]],
      },

      {
        x: 1,
        y: -1,
        conduit: "pipe",
        gender: ["modular", ["null"]],
      },
    ],
  },

  {
    name: "valve",
    width: 1,
    height: 1,
    maxItems: 4,
    storage: fluids.slice(),
    data: [["outputs", 0], ["outputCheck", 0], ["inputs", 0], ["inputCheck", 0], ["storedItem", 0], ["canDistribute", false]],
    layout: [[0, 0]],
    process: function(me){
      me.data.canDistribute = false
      if(me.data.storedItem != 0 && eval("me.data." + me.data.storedItem) >= 1){me.data.canDistribute = true}
      me.data.outputs = me.data.outputCheck
      me.data.outputCheck = 0
      if(me.data.outputs == 0){me.data.outputs = 1}
      me.data.inputs = me.data.inputCheck
      me.data.inputCheck = 0
    },
    ports: [
      {
        x: 0,
        y: -1,
        conduit: "pipe",
        gender: ["modular", ["null"]],
      },

      {
        x: 1,
        y: 0,
        conduit: "pipe",
        gender: ["modular", ["null"]],
      },

      {
        x: 0,
        y: 1,
        conduit: "pipe",
        gender: ["modular", ["null"]],
      },

      {
        x: -1,
        y: 0,
        conduit: "pipe",
        gender: ["modular", ["null"]],
      },
    ],
  },

  {
    name: "crude_source",
    width: 1,
    height: 1,
    maxItems: 4,
    storage: ["crude_oil"],
    layout: [[0, 0]],
    process: function(me){me.data.crude_oil = 4},
    ports: [
      {
        x: 0,
        y: -1,
        conduit: "pipe",
        gender: ["output", ["crude_oil"]],
      },

      {
        x: 1,
        y: 0,
        conduit: "pipe",
        gender: ["output", ["crude_oil"]],
      },

      {
        x: 0,
        y: 1,
        conduit: "pipe",
        gender: ["output", ["crude_oil"]],
      },

      {
        x: -1,
        y: 0,
        conduit: "pipe",
        gender: ["output", ["crude_oil"]],
      },
    ],
  },

  {
    name: "hydrogen_source",
    width: 1,
    height: 1,
    maxItems: 4,
    storage: ["hydrogen"],
    layout: [[0, 0]],
    process: function(me){me.data.hydrogen = 4},
    ports: [
      {
        x: 0,
        y: -1,
        conduit: "pipe",
        gender: ["output", ["hydrogen"]],
      },

      {
        x: 1,
        y: 0,
        conduit: "pipe",
        gender: ["output", ["hydrogen"]],
      },

      {
        x: 0,
        y: 1,
        conduit: "pipe",
        gender: ["output", ["hydrogen"]],
      },

      {
        x: -1,
        y: 0,
        conduit: "pipe",
        gender: ["output", ["hydrogen"]],
      },
    ],
  },
]

function getFacility(name){
  for(var i = 0, l = facilities.length; i < l; i++){
    if(facilities[i].name == name){
      return facilities[i]
    }
  }
}

var activeOverlay = [];


function Overlay(type, texture, x, y, rotation){
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

var debugging = true;
var logPipes = false;
var windowScale = 1;

var funds = 0;

var cachedCode = [];

function CodeBlock(data, delay){
  this.data = data;
  this.delay = delay;
}

function cacheCode(data, delay){
  cachedCode.push(new CodeBlock(data, delay))
}

function loadArea(id){

  for(var i = 0, l = areas.length; i < l; i++){
    if(areas[i].name == areaLoaded){
      areas[i].baseLayer = game.getObject("baseLayer").mapData
      areas[i].waterLayer = game.getObject("waterLayer").mapData
      areas[i].activeLayer = game.getObject("activeLayer").mapData
    }
  }
  for(var i = 0, l = areas.length; i < l; i++){
    if(areas[i].name == id){
      areaLoaded = id
      areaIndex = i
      game.getObject("baseLayer").mapData = areas[i].baseLayer
      game.getObject("waterLayer").mapData = areas[i].waterLayer
      game.getObject("activeLayer").mapData = areas[i].activeLayer
    }
  }
  game.getObject('baseLayer').render = true;
  game.getObject('waterLayer').render = true;
  updateNetworkLog()
}

function toggleMenu(menu){
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

function setWindowScale(){
  offsetWidth = game.window.offsetWidth
  offsetHeight = game.window.offsetHeight

  for(var i = 0, l = game.layers.length; i < l; i++){
    game.layers[i].canvas.width = offsetWidth
    game.layers[i].canvas.height = offsetHeight
  }
}
setWindowScale()

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
  if(expression == "robert chad"){
    document.getElementById('evalOutput').innerHTML = "he really is tho";
  }else{
    document.getElementById('evalOutput').innerHTML = expression;
  }
  
}

function Area(name, baseLayer, waterLayer, activeLayer, networks, links){
  this.name = name;
  this.baseLayer = baseLayer;
  this.waterLayer = waterLayer;
  this.activeLayer = activeLayer;
  this.networks = networks;
  this.links = links;
}

function Network(name, rotation, points, data, index){
  this.name = name;
  this.rotation = rotation;
  this.points = points;
  this.data = data;
  this.index = index;
}

game.window.style.overflow = "hidden"

// var leftMenu = document.createElement('div')
// leftMenu.id = "slideMenuLeft"

// leftMenu.innerHTML = `<button style=\"position: absolute; right: 0px; height: 100%; border: none; background-color: tan; cursor: pointer; width: 14%;\" onclick=\"if(document.getElementById(\'slideMenuLeft\').style.right == \'98%\'){document.getElementById(\'slideMenuLeft\').style.right = \'86%\'}else{document.getElementById(\'slideMenuLeft\').style.right = \'98%\'}\"> </button>

// <button id="pipe_hotbar" onclick="pressHotbarButton('pipe')" class="hotbarButton" style="margin-top: 14px;"><img src="docs/assets/pipe_icon.png"></button>

// <button id="rail_hotbar" onclick="pressHotbarButton('rail')" class="hotbarButton"><img src="docs/assets/rail_icon.png"></button>

// <button id="erase_hotbar" onclick="pressHotbarButton('erase')" class="hotbarButton"><img src="docs/assets/erase_icon.png"></button>

// `

// game.window.appendChild(leftMenu)

function toggleVerticalHotbarMenu(id){
  for(var i = 0, l = document.getElementById(id).children.length; i < l; i++){
    if(document.getElementById(id).children[i].style.top == "0px"){
      document.getElementById(id).children[i].style.top = document.getElementById(id).children[i].getAttribute("savestate")
      if(key(16) && document.getElementById(id).children[i].className == "hotbarMenuHorizontal"){
        toggleHorizontalHotbarMenu(document.getElementById(id).children[i].id)
      }
      document.getElementById("hotbar_erase").style.left = "0em"
    }else{
      if(document.getElementById(id).children[i].className == "hotbarMenuHorizontal"){
        document.getElementById(id).children[i].style.top = "0px";
        toggleHorizontalHotbarMenu(document.getElementById(id).children[i].id)
      }
    }
  }
}

function toggleHorizontalHotbarMenu(id){
  for(var i = 0, l = document.getElementById(id).children.length; i < l; i++){
    if(document.getElementById(id).children[i].style.left == "0px" || document.getElementById(id).children[i].style.left == "90px"){
      if(document.getElementById(id).style.top == "0px"){return;}
      document.getElementById(id).children[i].style.left = document.getElementById(id).children[i].getAttribute("savestate")
    }else{
      document.getElementById(id).children[i].style.left = "0px";
      var hotbarButtonName = document.getElementById(id).children[i].id.split("_")
      hotbarButtonName = [hotbarButtonName.shift(), hotbarButtonName.join("_")][1]
      if(hotbarButtonName == conduitSelected || (hotbarButtonName == facilitySelected && conduitSelected == "facility")){
        document.getElementById(id).children[i].style.left = "90px";
      }
    }
  }
}

function selectPlaceable(id){
  var hotbarButtons = document.getElementsByClassName("hotbarButton")
  var elementID = "hotbar_" + id
  var elementIndex = -1
  for(var i = 0, l = hotbarButtons.length; i < l; i++){
    if(hotbarButtons[i].id == elementID){
      elementIndex = i
    }
  }
  if(elementIndex == -1){return}
  

  hotbarButtons[elementIndex].childNodes[0].classList.remove('clickityElement'); // reset animation
  void hotbarButtons[elementIndex].childNodes[0].offsetWidth; // trigger reflow
  hotbarButtons[elementIndex].childNodes[0].classList.add('clickityElement'); // start animation

  if(id.includes("menu")){return}

  for(var i = 0, l = hotbarButtons.length; i < l; i++){
    if(hotbarButtons[i].id == elementID){
      hotbarButtons[i].style.backgroundColor = "rgb(251, 255, 0)"
      hotbarButtons[i].style.border = "3px solid yellow"
    }else{
      hotbarButtons[i].style.backgroundColor = "rgb(100, 100, 111)"
      hotbarButtons[i].style.border = "3px solid black"
    }
    if(hotbarButtons[i].style.left == "90px" && !(hotbarButtons[i].id == elementID)){hotbarButtons[i].style.left = "0px"}
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
}

var hotbarMenu = document.createElement('div')
hotbarMenu.id = "hotbarMenuVertical"
hotbarMenu.className = "hotbarMenuVertical"

hotbarMenu.innerHTML = `

<button id="hotbar_hammer_menu" savestate="1px" style="top: 1px; z-index: 4;" class="hotbarButton" onclick="selectPlaceable('hammer_menu'); toggleVerticalHotbarMenu('hotbarMenuVertical')"><img class="clickityElement" src="docs/assets/hammer.png"></button>


<div class="hotbarMenuHorizontal" savestate="89px" style="top: 89px; z-index: 3;" id="hotbarMenu1">

<button id="hotbar_gear_menu" class="hotbarButton"  style="z-index: 3;" onclick="selectPlaceable('gear_menu'); toggleHorizontalHotbarMenu('hotbarMenu1')"><img class="clickityElement" src="docs/assets/gear.png"></button>

<button id="hotbar_pipe" savestate="88px" style="left: 88px;" class="hotbarButton" onclick="selectPlaceable('pipe')"><img class="clickityElement" src="docs/assets/pipe_icon.png"></button>

<button id="hotbar_rail" savestate="176px" style="left: 176px;" class="hotbarButton" onclick="selectPlaceable('rail')"><img class="clickityElement" src="docs/assets/rail_icon.png"></button>

<button id="hotbar_valve" savestate="264px" style="left: 264px;" class="hotbarButton" onclick="selectPlaceable('valve')"><img class="clickityElement" src="docs/assets/valve.png"></button>

<button id="hotbar_tank" savestate="352px" style="left: 352px;" class="hotbarButton" onclick="selectPlaceable('tank')"><img class="clickityElement" src="docs/assets/tank.png"></button>

</div>



<div class="hotbarMenuHorizontal" savestate="177px" style="top: 177px; z-index: 3;" id="hotbarMenu2">

<button id="hotbar_facilities_menu" class="hotbarButton"  style="z-index: 3;" onclick="selectPlaceable('facilities_menu'); toggleHorizontalHotbarMenu('hotbarMenu2')"><img class="clickityElement" src="docs/assets/distiller.png" style="width: 45%;"></button>

<button id="hotbar_distiller" savestate="88px" style="left: 88px;" class="hotbarButton" onclick="selectPlaceable('distiller')"><img class="clickityElement" src="docs/assets/distiller.png" style="width: 45%;"></button>

<button id="hotbar_residue_processor" savestate="176px" style="left: 176px;" class="hotbarButton" onclick="selectPlaceable('residue_processor')"><img class="clickityElement" src="docs/assets/residue_processor.png" style="width: 45%;"></button>

<button id="hotbar_gas_processor" savestate="264px" style="left: 264px;" class="hotbarButton" onclick="selectPlaceable('gas_processor')"><img class="clickityElement" src="docs/assets/gas_processor.png" style="width: 45%;"></button>

<button id="hotbar_hydrotreater" savestate="352px" style="left: 352px;" class="hotbarButton" onclick="selectPlaceable('hydrotreater')"><img class="clickityElement" src="docs/assets/hydrotreater.png" style="height: 45%;"></button>

</div>

<div class="hotbarMenuHorizontal" savestate="265px" style="top: 265px; z-index: 3;" id="hotbarMenu3">

<button id="hotbar_extra_menu" class="hotbarButton" style="z-index: 3;" onclick="selectPlaceable('extra_menu'); toggleHorizontalHotbarMenu('hotbarMenu3')"><img class="clickityElement" src="docs/assets/pipe_x.png"></button>

<button id="hotbar_crude_source" savestate="88px" style="left: 88px;" class="hotbarButton" onclick="selectPlaceable('crude_source')"><img class="clickityElement" src="docs/assets/crude_source.png"></button>

<button id="hotbar_hydrogen_source" savestate="176px" style="left: 176px;" class="hotbarButton" onclick="selectPlaceable('hydrogen_source')"><img class="clickityElement" src="docs/assets/hydrogen_source.png"></button>

</div>


<div class="hotbarMenuHorizontal" savestate="353px" style="top: 353px; z-index: 3;" id="hotbarMenu4">

<button id="hotbar_erase" class="hotbarButton" style="z-index: 3;" onclick="selectPlaceable('erase')"><img class="clickityElement" src="docs/assets/erase_icon.png"></button>

</div>



`

game.window.appendChild(hotbarMenu)
selectPlaceable('pipe')

var hotbarButtonOver = "none"

function assignHotbarButtonListeners(){
  var hotbarButtonsActive = document.getElementsByClassName("hotbarButton")
  for(var i = 0, l = hotbarButtonsActive.length; i < l; i++){
    eval("$("+hotbarButtonsActive[i].id+").hover(function(){hotbarButtonOver = \""+hotbarButtonsActive[i].id+"\"; checkTemporaryTooltip()}, function(){hotbarButtonOver = \"none\"})")
  }
}
assignHotbarButtonListeners()

var hotbarOverCheck = "none"
var mouseOverCheckX = 0
var mouseOverCheckY = 0

function checkTemporaryTooltip(){
  hotbarOverCheck = hotbarButtonOver
  mouseOverCheckX = game.mouseX
  mouseOverCheckY = game.mouseY
  setTimeout(createTemporaryTooltip, 400)
}

var temporaryTooltips = []

function createTemporaryTooltip(){
  if(document.getElementsByClassName("tooltip").length != 0){return}
  if(hotbarOverCheck == hotbarButtonOver){
    if(mouseOverCheckX == game.mouseX && mouseOverCheckY == game.mouseY){
      var tooltip = document.createElement("div")
      tooltip.classList.add("tooltip")
      tooltip.style.left = game.mouseX + 8 + "px"
      tooltip.style.top = game.mouseY + 8 + "px"

      tooltip.name = document.getElementsByClassName("tooltip").length

      eval("tooltip.onclick = function(){checkTooltipClick = "+ (document.getElementsByClassName("tooltip").length) +"}")

      var tooltipIndex = 0
      for(var i = 0, l = tooltips.length; i < l; i++){
        if(tooltips[i].name == hotbarButtonOver){
          tooltipIndex = i
          break;
        }
      }
      tooltip.innerHTML = "<p style=\"font-size: 24px; margin-left: 2px; font-family: \'Pixellari\'; \">" + tooltips[tooltipIndex].title +  "</p><p style=\"margin-left: 3px; font-family: \'Pixellari\'; color: rgb(69, 69, 69);\">" + tooltips[tooltipIndex].text + "</p>"
      game.window.appendChild(tooltip)
      temporaryTooltips.push(tooltip)
    }else{
      checkTemporaryTooltip()
    }
  }
}



var rightMenu = document.createElement('div')
rightMenu.id = "slideMenuRight"

rightMenu.innerHTML = `<button style=\"position: absolute; left: 0px; height: 100%; border: none; background-color: tan; cursor: pointer; width: 14%;\" onclick=\"if(document.getElementById(\'slideMenuRight\').style.left == \'96%\'){document.getElementById(\'slideMenuRight\').style.left = \'70%\'}else{document.getElementById(\'slideMenuRight\').style.left = \'96%\'}\"> <img src=\"docs/assets/pipe_x.png\" style=\"width: 90%;\"> </button>

<p style=\"font-family: \'Pixellari\'; font-size: 24px; font-smooth: never; margin-top: 4%; margin-left: 15%;\">UPGRADES<br><br>Political stuff, research stuff, and assorted options will go here, kinda like the main menu.</p>


`

game.window.appendChild(rightMenu)

var fundsDisplay = document.createElement('div')

fundsDisplay.innerHTML = `<p style=\"font-family: \'Pixellari\'; font-size: 48px; font-smooth: never; position: absolute; width: 100%;  text-align: center; margin-top: 16px; user-select: none; color: white;\">Funds: $<span id=\"funds\">0</span> </p>`

game.window.appendChild(fundsDisplay)



var centerDisplay = document.createElement('div')
centerDisplay.id = "centerDisplay"

centerDisplay.innerHTML = `
<button onclick="document.getElementById(\'centerDisplay\').style.top = \'35%\'; document.getElementById(\'centerDisplay\').style.opacity = \'0\'; cacheCode(\'document.getElementById(\\\'centerDisplay\\\').style.display = \\\'none\\\' \', 12)" style='width: 10%; padding-top: 10%; position: absolute; top: 1%; right: 1%; '><img src='docs/assets/null.png' style='position: absolute; width: 100%; left: 0px; top: 0px;'></button>

<img id="facilityShownImage" src='docs/assets/refinery.png' style="position: absolute; left: 1%; top: 1%; width: 20%; border: 2px solid rgb(88, 36, 6); background-color: tan;">

<p id="facilityShown" style="font-family: \'Pixellari\'; font-size: 32px; margin-left: 24%; margin-top: 2%;">Refinery</p>

<p id="facilityShownResources" style="font-family: \'Pixellari\'; font-size: 24px; margin-left: 24%; margin-top: -1%;">Oil: 100</p>


`

game.window.appendChild(centerDisplay)

var tooltips = [
  {
    name: "fallback",
    title: "",
    text: "Undefined Tooltip"
  },

  {
    name: "hotbar_gear_menu",
    title: "Transit",
    text: ""
  },

  {
    name: "hotbar_facilities_menu",
    title: "Facilities",
    text: ""
  },

  {
    name: "hotbar_hammer_menu",
    title: "Build",
    text: ""
  },

  {
    name: "hotbar_erase",
    title: "Eraser",
    text: ""
  },

  {
    name: "hotbar_pipe",
    title: "Pipe",
    text: "Used to transport liquids and gases between your facilities"
  },

  {
    name: "hotbar_valve",
    title: "Valve",
    text: "Used to split an input into multiple outputs or merge multiple inputs into one output"
  },

  {
    name: "hotbar_tank",
    title: "Tank",
    text: "Used to store liquids and gases for later use or sale"
  },

  {
    name: "hotbar_distiller",
    title: "Distiller",
    text: "Converts crude oil into crude <span class=\"tooltipLink\" onclick=\"createTooltip(\'crude_vapor\')\">vapor</span>, <span class=\"tooltipLink\" onclick=\"createTooltip(\'crude_naphtha\')\">naphtha</span>, <span class=\"tooltipLink\" onclick=\"createTooltip(\'crude_kerosene\')\">kerosene</span>, and <span class=\"tooltipLink\" onclick=\"createTooltip(\'residue\')\">residue</span>"
  },

  {
    name: "hotbar_gas_processor",
    title: "Vapor Processor",
    text: "Processes <span class=\"tooltipLink\" onclick=\"createTooltip(\'crude_vapor\')\">crude vapor</span> into crude propane and butane"
  },

  {
    name: "hotbar_residue_processor",
    title: "Residue Processor",
    text: "Processes <span class=\"tooltipLink\" onclick=\"createTooltip(\'residue\')\">residue</span> into light oil and heavy oil"
  },

  {
    name: "hotbar_hydrotreater",
    title: "Hydrotreater",
    text: "Purifies crude products using <span class=\"tooltipLink\" onclick=\"createTooltip(\'hydrogen\')\">hydrogen</span> gas and makes them safe for use"
  },

  {
    name: "crude_kerosene",
    title: "<img src=\"docs/assets/crude_kerosene_icon.png\"><span style=\"position: absolute; margin-top: 4px;\">Crude Kerosene</span>",
    text: "This flammable oil is commonly used for heating, but must be purified at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_hydrotreater\')\">hydrotreater</span> before it can be sold"
  },

  {
    name: "crude_naphtha",
    title: "<img src=\"docs/assets/crude_naphtha_icon.png\"><span style=\"position: absolute; margin-top: 4px;\">Crude Naphtha</span>",
    text: "This oil is one of the most important ingredients in gasoline, but must be purified at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_hydrotreater\')\">hydrotreater</span> before it can be used"
  },

  {
    name: "crude_vapor",
    title: "<img src=\"docs/assets/crude_vapor_icon.png\"><span style=\"position: absolute; margin-top: 4px;\">Crude Vapor</span>",
    text: "This mixture of gases can be seperated into crude propane and butane at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_gas_processor\')\">vapor processor</span>"
  },

  {
    name: "residue",
    title: "<img src=\"docs/assets/residue_icon.png\"><span style=\"position: absolute; margin-top: 4px;\">Residue</span>",
    text: "This mixture of solids can be seperated into light oil and heavy oil at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_residue_processor\')\">residue processor</span>"
  },

  {
    name: "hydrogen",
    title: "<img src=\"docs/assets/hydrogen_icon.png\"><span style=\"position: absolute; margin-top: 4px;\">Hydrogen</span>",
    text: "This gas is used by the <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_hydrotreater\')\">hydrotreater</span> to bring the impurities out of other oils and gases"
  },
  
]

var checkTooltipClick = -1

var tooltip;
function createTooltip(name){
  tooltip = document.createElement("div")
  tooltip.classList.add("tooltip")
  tooltip.style.left = game.mouseX + 8 + "px"
  tooltip.style.top = game.mouseY + 8 + "px"
  
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
  setTimeout(appendTooltip, 1)
}

function appendTooltip(){
  game.window.appendChild(tooltip)
}

function getTerrainBorders(array, x, y, type){
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
    if(x == 0){return ""}
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

    
    return ""
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
  return ""
}

function sanitizeMap(array){
  var sanitized = [];
  var sanitizedWater = [];
  for(var i = 0, l = array.length; i < l; i++){
    sanitized.push("")
    sanitizedWater.push("")
    for(var k = 0, kl = array[i].length; k < kl; k++){
      if(array[i].charAt(k) == "g"){
        var edgeType = getTerrainBorders(array, k, i, "g")
        sanitized[i] += getTileId("terrain", "grass" + edgeType, "")
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
  
  return {ground: sanitized, water: sanitizedWater};
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

function createPipeOverlay(x1, y1, x2, y2){
  var pipeRotation = 0;

  //PIPE CORNER IS BOTTOM LEFT

  try{
    if(getTile("terrain", getMapData(x1, y1, "waterLayer"))[0].substring(0, 6) == "water_"){
      if(getTile("terrain", getMapData(x2, y2, "baseLayer"))[0].substring(0, 5) == "grass"){
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
  }catch{}
  try{ 
    if(getTile("terrain", getMapData(x1, y1, "baseLayer"))[0].substring(0, 5) == "grass"){
      if(getTile("terrain", getMapData(x2, y2, "waterLayer"))[0].substring(0, 6) == "water_"){
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

  createPipeOverlay(x1, y1, x2, y2)
  
  var endPoints = [];
  
  for(var i = 0, l = areas[areaIndex].networks.length; i < l; i++){
    if(areas[areaIndex].networks[i].name == 'pipeSegment'){
      endPoints.push(areas[areaIndex].networks[i].points[0])
      endPoints.push(areas[areaIndex].networks[i].points[1])
      
      var stringArray2 = JSON.stringify([x2, y2])
      if(JSON.stringify(areas[areaIndex].networks[i].points).includes(stringArray2)){
        if(JSON.stringify(endPoints).includes(JSON.stringify([x1, y1]))){
          var stringArray1 = JSON.stringify([x1, y1])
          for(var j = 0; j < l; j++){
            if(JSON.stringify(areas[areaIndex].networks[j].points[0]) == stringArray1){
              
              if(JSON.stringify(areas[areaIndex].networks[i].points[0]) == stringArray2){
                areas[areaIndex].networks[j].points[0] = areas[areaIndex].networks[i].points[1]
              }else{
                areas[areaIndex].networks[j].points[0] = areas[areaIndex].networks[i].points[0]
              }
              areas[areaIndex].networks.splice(i, 1)
              i--
              l--
            }else if(JSON.stringify(areas[areaIndex].networks[j].points[1]) == stringArray1){
             
              if(JSON.stringify(areas[areaIndex].networks[i].points[0]) == stringArray2){
                areas[areaIndex].networks[j].points[1] = areas[areaIndex].networks[i].points[1]
              }else{
                areas[areaIndex].networks[j].points[1] = areas[areaIndex].networks[i].points[0]
              }
              areas[areaIndex].networks.splice(i, 1)
              i--
              l--
            }
          }
        }else{
          for(var j = 0; j < 2; j++){
            if(JSON.stringify(areas[areaIndex].networks[i].points[j]) == stringArray2){
              areas[areaIndex].networks[i].points[j] = [x1, y1]
              break;
            }
          }
          break;
        }



      }
    }
  }
  var pipesToReplace = [];

  if(x1 > x2 && y1 == y2){
    
    pipesToReplace = [];
    if(x1 > x2+1){
      var crossingMidsection = true;
      for(var i = x1-1; i > x2; i--){
        for(var j = 0, ll = intersectors.length; j < ll; j++){
          if(conduits[getConduitIndex(intersectors[j])].hv.includes(getMapData(i, y1)) || (intersectors.includes(conduitSelected) && ((getTile("tiles", getMapData(i, y1))[0].slice(-3) == "_hh" || getTile("tiles", getMapData(i, y1))[0].slice(-3) == "_vv")))){
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
          if(conduits[getConduitIndex(intersectors[j])].hv.includes(getMapData(i, y1)) || (intersectors.includes(conduitSelected) && ((getTile("tiles", getMapData(i, y1))[0].slice(-3) == "_hh" || getTile("tiles", getMapData(i, y1))[0].slice(-3) == "_vv")))){
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
          if(conduits[getConduitIndex(intersectors[j])].hv.includes(getMapData(x1, i)) || (intersectors.includes(conduitSelected) && ((getTile("tiles", getMapData(x1, i))[0].slice(-3) == "_hh" || getTile("tiles", getMapData(x1, i))[0].slice(-3) == "_vv")))){
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
          if(conduits[getConduitIndex(intersectors[j])].hv.includes(getMapData(x1, i)) || (intersectors.includes(conduitSelected) && ((getTile("tiles", getMapData(x1, i))[0].slice(-3) == "_hh" || getTile("tiles", getMapData(x1, i))[0].slice(-3) == "_vv")))){
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








  //FIX FACILITY IDENTIFIERS









  //POSSIBLE SOURCE OF ERROR
  //Changed "rW&p" to "&p". r and W are no longer valid facility IDs

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

  if(getMapData(x2, y2) == "p" || getMapData(x1, y1) == "p"){
    if(getMapData(x1, y1) == "p"){
      var endPoints = updateNetwork(x2, y2)
    }else{
      var endPoints = updateNetwork(x1, y1)
    }
    
    var pos = 0;
    if(endPoints[0][0] == x1 && endPoints[0][1] == y1){
      pos = 1;
    }
    if(getMapData(endPoints[pos][0], endPoints[pos][1] - 1) == "p" || getMapData(endPoints[pos][0] - 1, endPoints[pos][1]) == "p" || getMapData(endPoints[pos][0] + 1, endPoints[pos][1]) == "p" || getMapData(endPoints[pos][0], endPoints[pos][1] + 1) == "p"){

      addPipeNetwork(endPoints)
      
      if(debugging){updateNetworkLog()}
    }
  }

  //If both ends of pipe connect to facilities, create a new network and links.
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
      }
    }
  }
  
}

//Creates a new pipe network and links from a set of coordinates (anywhere on the target pipe)
function addPipeNetwork(endPoints){
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
  else if((connections.includes("b") && getMapData(endX, endY+1) == "p")){
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
    var rotatedEndPoints = [[0, 0], [0, 0]]

    if(getNetwork(areaIndex, facilityIDs[0]).rotation == 90){
      rotatedEndPoints[0] = [facility1X + (endPoints[0][1] - facility1Y), facility1Y - (facility1X-endPoints[0][0])]
    }else if(getNetwork(areaIndex, facilityIDs[0]).rotation == 180){
      rotatedEndPoints[0] = [facility1X + ((endPoints[0][0] - facility1X) * -1), facility1Y + ((endPoints[0][1] - facility1Y) * -1)]
    }else if(getNetwork(areaIndex, facilityIDs[0]).rotation == 270){
      rotatedEndPoints[0] = [facility1X - (endPoints[0][1] - facility1Y), facility1Y + (facility1X-endPoints[0][0])]
    }else{
      rotatedEndPoints[0] = [endPoints[0][0], endPoints[0][1]]
    }


    if(getNetwork(areaIndex, facilityIDs[1]).rotation == 90){
      rotatedEndPoints[1] = [facility2X + (endPoints[1][1] - facility2Y), facility2Y + (facility2X-endPoints[1][0])]
    }else if(getNetwork(areaIndex, facilityIDs[1]).rotation == 180){
      rotatedEndPoints[1] = [facility2X + ((endPoints[1][0] - facility2X) * -1), facility2Y + ((endPoints[1][1] - facility2Y) * -1)]
    }else if(getNetwork(areaIndex, facilityIDs[1]).rotation == 270){
      rotatedEndPoints[1] = [facility2X - (endPoints[1][1] - facility2Y), facility2Y - (facility2X-endPoints[1][0])]
    }else{
      rotatedEndPoints[1] = [endPoints[1][0], endPoints[1][1]]
    }



    

    for(var c = 0, cl = facilities[facility1TemplateID].ports.length; c < cl; c++){
      if(getNetwork(areaIndex, facilityIDs[0]).points[0][0] + facilities[facility1TemplateID].ports[c].x == rotatedEndPoints[0][0] && getNetwork(areaIndex, facilityIDs[0]).points[0][1] + facilities[facility1TemplateID].ports[c].y == rotatedEndPoints[0][1]){
        facility1PortIndex = c
      }
    }

    for(var c = 0, cl = facilities[facility2TemplateID].ports.length; c < cl; c++){
      if(getNetwork(areaIndex, facilityIDs[1]).points[0][0] + facilities[facility2TemplateID].ports[c].x == rotatedEndPoints[1][0] && getNetwork(areaIndex, facilityIDs[1]).points[0][1] + facilities[facility2TemplateID].ports[c].y == rotatedEndPoints[1][1]){
        facility2PortIndex = c
      }
    }

    areas[areaIndex].links.push({facility1: [facilityIDs[0], facility1PortIndex], facility2: [facilityIDs[1], facility2PortIndex], supportingConduit: networkTotal})

    areas[areaIndex].networks.push(new Network("pipeSegment", 0, endPoints, {connectedFacilities: [facilityIDs[0], facilityIDs[1]]}, networkTotal))
  }

  updateNetworkLog()

}

var updateDirection = "";

//Used in the pipe removal function to determine what state a pipe should revert to when losing a connection
function updatePipe(x, y, sourceX, sourceY){
  if(x < 0 || x > 63 || y < 0 || y > 39){
    return;
  }
  
  var mapData = getMapData(x, y)

  //POSSIBLE SOURCE OF ERROR
  //See above source of error
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
      if((conduits[conduitIndex].top + conduits[conduitIndex].v + conduits[conduitIndex].tl + conduits[conduitIndex].tr).includes(getMapData(x, y-1)) && (conduits[conduitIndex].bottom + conduits[conduitIndex].v + conduits[conduitIndex].bl + conduits[conduitIndex].br).includes(getMapData(x, y+1))){
        changeMapData(x, y, conduits[conduitIndex].v)
        updateDirection = "x"
        updatePipe(x-1, y)
        updatePipe(x+1, y)
      }
    }

    if(updateDirection == "y" || updateDirection == ""){
      if((conduits[conduitIndex].left + conduits[conduitIndex].h + conduits[conduitIndex].tl + conduits[conduitIndex].bl).includes(getMapData(x-1, y)) && (conduits[conduitIndex].right + conduits[conduitIndex].h + conduits[conduitIndex].tr + conduits[conduitIndex].br).includes(getMapData(x+1, y))){
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
            areas[areaIndex].links.splice(k, 1)
            k--
            ll--
          }
        }

        areas[areaIndex].networks.splice(i, 1)
        i--
        l--
        
      }
    }
  }
}


var crossingPipe = false;

//Adds a pipe at the specified coords and connects it to the surrounding ones
function addPipe(x, y){
  if(document.getElementById('centerDisplay').style.opacity == "1"){
    return;
  }
  var conduitIndex = getConduitIndex(conduitSelected)
  if(key(16) || conduitSelected == "erase"){
    conduitIndex = 0;
    var mapData = getMapData(x, y)

    for(var i = 0, l = activeOverlay.length; i < l; i++){
      if(activeOverlay[i].type == "pipe" && activeOverlay[i].x == x && activeOverlay[i].y == y){
        activeOverlay.splice(i, 1)
        i--
        l--
      }
    }  
    //POTENTIAL SOURCE OF ERROR
    //See above

    //Its not really a source of error anymore I think but I will leave these comments it just in case
    if("p&".includes(mapData)){
      var coordString = JSON.stringify([x, y])
      var facilityIndex = -1;
      for(var i = 0, l = areas[areaIndex].networks.length; i < l; i++){
        if(JSON.stringify(areas[areaIndex].networks[i].points).includes(coordString)){
          facilityIndex = i;
          x = areas[areaIndex].networks[i].points[0][0]
          y = areas[areaIndex].networks[i].points[0][1]
          for(var k = 0, ll = areas[areaIndex].networks.length; k < ll; k++){
            if(areas[areaIndex].networks[k].name == "pipeSegment"){
              if(areas[areaIndex].networks[k].data.connectedFacilities[0] == areas[areaIndex].networks[i].index || areas[areaIndex].networks[k].data.connectedFacilities[1] == areas[areaIndex].networks[i].index){
                killNetwork(areas[areaIndex].networks[k].points[0][0], areas[areaIndex].networks[k].points[0][1])
                k--
                ll--
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
        if((conduits[conduitIndex].segments + "X").includes(getMapData(x, y-1))){
          armEndPoints = updateNetwork(x, y-1)
          if(endPoints.includes(JSON.stringify(armEndPoints[0]))){
            killNetwork(armEndPoints[0][0], armEndPoints[0][1])
          }
          if(endPoints.includes(JSON.stringify(armEndPoints[1]))){

            killNetwork(armEndPoints[1][0], armEndPoints[1][1])
          }
        }
      }
      if(directionals.includes("b")){
        if((conduits[conduitIndex].segments + "X").includes(getMapData(x, y+1))){
          armEndPoints = updateNetwork(x, y+1)
          if(endPoints.includes(JSON.stringify(armEndPoints[0]))){
            killNetwork(armEndPoints[0][0], armEndPoints[0][1])
          }
          if(endPoints.includes(JSON.stringify(armEndPoints[1]))){
            killNetwork(armEndPoints[1][0], armEndPoints[1][1])
          }
        }
      }
      if(directionals.includes("l")){
        if((conduits[conduitIndex].segments + "X").includes(getMapData(x-1, y))){
          armEndPoints = updateNetwork(x-1, y)
          if(endPoints.includes(JSON.stringify(armEndPoints[0]))){
            killNetwork(armEndPoints[0][0], armEndPoints[0][1])
          }
          if(endPoints.includes(JSON.stringify(armEndPoints[1]))){
            killNetwork(armEndPoints[1][0], armEndPoints[1][1])
          }
        }
      }
      if(directionals.includes("r")){
        if((conduits[conduitIndex].segments + "X").includes(getMapData(x+1, y))){
          armEndPoints = updateNetwork(x+1, y)
          if(endPoints.includes(JSON.stringify(armEndPoints[0]))){
            killNetwork(armEndPoints[0][0], armEndPoints[0][1])
          }
          if(endPoints.includes(JSON.stringify(armEndPoints[1]))){
            killNetwork(armEndPoints[1][0], armEndPoints[1][1])
          }
        }
      }
      if(debugging){updateNetworkLog()}

    }
    
  }else{
    crossingPipe = false;

    if(beginMouseHold){
      previousPipeX = x;
      previousPipeY = y;
    }

    if((previousPipeX != x || previousPipeY != y) && conduits[conduitIndex].segments.includes(getMapData(x, y))){
      beginMouseHold = true
        
      crossingPipe = true
    }
    
    if(getMapData(x, y) == "-"){
      changeMapData(x, y, conduits[conduitIndex].stub)
      if(!beginMouseHold){
        if((conduits[conduitIndex].endPoints + conduits[conduitIndex].stub + "p-").includes(getMapData(previousPipeX, previousPipeY))){
          connectPipes(x, y, previousPipeX, previousPipeY)
        }
      }
      
      if(beginMouseHold){
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

function getNetwork(area, id){
  for(var i = 0, l = areas[area].networks.length; i < l; i++){
    if(areas[area].networks[i].index == id){
      return areas[area].networks[i]
    }
  }
}

function createNetwork(x, y, type, modifiers){
  if(modifiers === undefined){
    modifiers = ""
  }
  networkTotal++
  for(var i = 0, l = facilities.length; i < l; i++){
    if(facilities[i].name == type){
      var rotation = 0;
      var facilityCoordinates = [];
      var facilityData = {};

      eval(modifiers)

      var rotatedLayout = []
      for(var k = 0, kl = facilities[i].layout.length; k < kl; k++){
        if(rotation == 90){
          rotatedLayout.push([facilities[i].layout[k][1], facilities[i].layout[k][0]])
        }else if(rotation == 180){
          rotatedLayout.push([facilities[i].layout[k][0] * -1, facilities[i].layout[k][1] * -1])
        }else if(rotation == 270){
          rotatedLayout.push([facilities[i].layout[k][1] * -1, facilities[i].layout[k][0] * -1])
        }else{
          rotatedLayout.push([facilities[i].layout[k][0], facilities[i].layout[k][1]])
        }
      }
      for(var k = 0, kl = rotatedLayout.length; k < kl; k++){
        changeMapData(x + rotatedLayout[k][0], y + rotatedLayout[k][1], "p")
        facilityCoordinates.push([x + rotatedLayout[k][0], y + rotatedLayout[k][1]])
      }
      for(var k = 0, kl = facilities[i].storage.length; k < kl; k++){
        eval("facilityData." + facilities[i].storage[k] + " = 0")
      }
      if(!(facilities[i].data === undefined)){
        for(var k = 0, kl = facilities[i].data.length; k < kl; k++){
          eval("facilityData." + facilities[i].data[k][0] + " = " + facilities[i].data[k][1])
        }
      }

      areas[areaIndex].networks.push(new Network(type, rotation, facilityCoordinates, facilityData, networkTotal))

      break;
    }
  }


  // if(type == "distiller"){
  //   areas[areaIndex].networks.push(new Network("distiller", [[x, y], [x, y+1]], {crude_oil: 0, crude_naphtha: 100,}, networkTotal))
  //   changeMapData(x, y, "p")
  //   changeMapData(x, y+1, "p")
  // }
  // if(type == "hydrotreater"){
  //   areas[areaIndex].networks.push(new Network("hydrotreater", [[x, y], [x+1, y]], {crude_oil: 0, hydrogen: 0, crude_naphtha: 0,}, networkTotal))
  //   changeMapData(x, y, "p")
  //   changeMapData(x+1, y, "p")
  // }
  // if(type == "hydrogen_source"){
  //   areas[areaIndex].networks.push(new Network("hydrogen_source", [[x, y]], {hydrogen: Infinity,}, networkTotal))
  //   changeMapData(x, y, "p")
  // }
  // if(type == "crude_source"){
  //   areas[areaIndex].networks.push(new Network("crude_source", [[x, y]], {crude_oil: Infinity,}, networkTotal))
  //   changeMapData(x, y, "p")
  // }

  if(debugging){updateNetworkLog()}
}

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

//Returns endpoints for a pipe segment network, given coordinates
function updateNetwork(x, y){
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

  var validConduitSegments = (conduits[conduitIndex].segments + "X")

  while(counter < 10000){
    counter++
    var connections = getPipeConnections(targetX, targetY)
    if(getMapData(targetX, targetY) == "X"){
      targetX += xMotion;
      targetY += yMotion;
      continue;
    }
    
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
  ["backup", false],
  ["mapData", [
    
  ]],
  ["role", `
    

    var mapTargetX = scrollX
    var mapTargetY = scrollY
    var mapWidth = Math.floor(offsetWidth/32) + 2
    var mapHeight = Math.floor(offsetHeight/32) + 2
    if(self.backup){
      ctx = document.getElementById(self.layerId).getContext('2d');
      mapTargetX = 0;
      marTargetY = 0;
      mapWidth = 64;
      mapHeight = 40;
    }else{
      ctx = game.getLayer(self.layerId).context;
    }
    
    
    ctx.imageSmoothingEnabled = false;
    if(self.refresh || self.render){
      ctx.clearRect(0, 0, 2048, 1280)
      for(var j = Math.floor(mapTargetY/128)-1, ll = Math.floor(mapTargetY/128)+mapHeight; j < ll; j++){
        if(j < 0 || j > 39){
          continue;
        }
        var row = this.objects[i].mapData[j].split("");
        for(var k = Math.floor(mapTargetX/128)-1, lll = Math.floor(mapTargetX/128)+mapWidth; k < lll; k++){
          if(k < 0 || k > row.length){
            continue;
          }
          if("-p&".includes(row[k])){
            continue;
          }
          if(row[k] == "X"){
            xModifier = 0;
            while(getMapData(k - 1 + xModifier, j) == "X"){xModifier--}
            yModifier = 0;
            while(getMapData(k, j - 1 + yModifier) == "X"){yModifier--}

            var conduitTextureX = "null"
            var conduitTextureY = "null"

            if(getMapData(k - 1, j) == "p"){

              var coordString = JSON.stringify([k - 1, j])

              for(var a = 0, llll = areas[areaIndex].networks.length; a < llll; a++){
                if(JSON.stringify(areas[areaIndex].networks[a].points).includes(coordString)){
                  for(var b = 0, lllll = facilities.length; b < lllll; b++){
                    if(facilities[b].name.includes(areas[areaIndex].networks[a].name)){
                      for(var c = 0, cl = facilities[b].ports.length; c < cl; c++){
                        if(areas[areaIndex].networks[a].points[0][0] + facilities[b].ports[c].x == k && areas[areaIndex].networks[a].points[0][1] + facilities[b].ports[c].y == j){
                          conduitTextureX = facilities[b].ports[c].conduit
                          break;
                        }
                      }
                    }
                  }
                  break;
                }
              }
            }

            if(getMapData(k, j - 1) == "p"){
              var coordString = JSON.stringify([k, j - 1])

              for(var a = 0, llll = areas[areaIndex].networks.length; a < llll; a++){
                if(JSON.stringify(areas[areaIndex].networks[a].points).includes(coordString)){
                  for(var b = 0, lllll = facilities.length; b < lllll; b++){
                    if(facilities[b].name.includes(areas[areaIndex].networks[a].name)){
                      for(var c = 0, cl = facilities[b].ports.length; c < cl; c++){
                        if(areas[areaIndex].networks[a].points[0][0] + facilities[b].ports[c].x == k && areas[areaIndex].networks[a].points[0][1] + facilities[b].ports[c].y == j){
                          conduitTextureY = facilities[b].ports[c].conduit
                          break;
                        }
                      }
                    }
                  }
                  break;
                }
              }
            }

            if(conduitTextureX == "null"){
              conduitTextureX = getTile("tiles", getMapData(k - 1 + xModifier, j))[0].split("_")[0]
            }

            if(conduitTextureY == "null"){
              conduitTextureY = getTile("tiles", getMapData(k, j - 1 + yModifier))[0].split("_")[0]
            }

            if(intersectors.includes(conduitTextureX)){

              ctx.drawImage(this.getTexture(conduitTextureY + "_vv"), ((k*16)-mapTargetX/8)*2, ((j*16)-mapTargetY/8) * 2, image.width * 2, image.height * 2)

              ctx.drawImage(this.getTexture(conduitTextureX + "_hh"), ((k*16)-mapTargetX/8)*2, ((j*16)-mapTargetY/8) * 2, image.width * 2, image.height * 2)
            }else{

              ctx.drawImage(this.getTexture(conduitTextureX + "_hh"), ((k*16)-mapTargetX/8)*2, ((j*16)-mapTargetY/8) * 2, image.width * 2, image.height * 2)

              ctx.drawImage(this.getTexture(conduitTextureY + "_vv"), ((k*16)-mapTargetX/8)*2, ((j*16)-mapTargetY/8) * 2, image.width * 2, image.height * 2)
            }
            continue;
          }
          if(self.id == "baseLayer" || self.id == "waterLayer"){
            var image = this.getTexture(getTile("terrain", row[k])[0])
          }else{
            var image = this.getTexture(getTile("tile", row[k])[0])
          }
          ctx.drawImage(image, ((k*16)-mapTargetX/8) * 2, ((j*16)-mapTargetY/8) * 2, 32, 32)
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
      // self.x = (Math.floor(((this.mouseX/windowScale))/(16))*16) - (scrollX % 16)
      // self.y = (Math.floor(((this.mouseY/windowScale))/(16))*16) - (scrollY % 16)
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
    if(conduitSelected == "facility"){

    }else{
      self.width = 32
      self.height = 32
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
          self.droplets.splice(j, 1)
          j--
        }
      }
    }
  `]
]);

var tintCanvas = document.createElement("canvas")
tintCanvas.style.display = "none"

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