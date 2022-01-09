var game = new Game("game");

var fluids = ["crude_oil", "crude_vapor", "crude_kerosene", "crude_naphtha", "residue", "vapor", "kerosene", "naphtha", "hydrogen", "water", "light_oil", "heavy_oil", "crude_propane", "propane", "crude_butane", "butane"]


//The list of facility templates
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
    name: "t_valve",
    width: 1,
    height: 1,
    maxItems: 4,
    storage: fluids.slice(),
    data: [["direction", "\"left\""]],
    layout: [[0, 0]],
    process: function(me){
      
    },
    ports: [
      {
        x: 1,
        y: 0,
        direction: "right",
        conduit: "pipe",
        gender: ["output", ["null"]],
      },

      {
        x: 0,
        y: 1,
        direction: "center",
        conduit: "pipe",
        gender: ["input", ["null"]],
      },

      {
        x: -1,
        y: 0,
        direction: "left",
        conduit: "pipe",
        gender: ["output", ["null"]],
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

//The list of tooltip templates
var tooltips = [
  {
    name: "fallback",
    title: "",
    text: "Undefined Tooltip"
  },

  {
    name: "stop",
    title: "Stop",
    text: "Just what do you think you\'re doing?"
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
    name: "hotbar_t_valve",
    title: "T-Valve",
    text: "The arrow on top determines which way the items fed into the bottom will flow. Click on it to flip it"
  },

  {
    name: "hotbar_tank",
    title: "Tank",
    text: "Used to store liquids and gases for later use or sale"
  },

  {
    name: "hotbar_distiller",
    title: "Distiller",
    text: "Converts <span class=\"tooltipLink\" onclick=\"createTooltip(\'crude_oil\')\">crude oil</span> into crude <span class=\"tooltipLink\" onclick=\"createTooltip(\'crude_vapor\')\">vapor</span>, <span class=\"tooltipLink\" onclick=\"createTooltip(\'crude_naphtha\')\">naphtha</span>, <span class=\"tooltipLink\" onclick=\"createTooltip(\'crude_kerosene\')\">kerosene</span>, and <span class=\"tooltipLink\" onclick=\"createTooltip(\'residue\')\">residue</span>"
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
    name: "crude_oil",
    title: "<img src=\"docs/assets/crude_oil_icon.png\"><span style=\"position: absolute; margin-top: 4px;\">Crude Oil</span>",
    text: "The basis of all fuel products, crude oil must be seperated at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_distiller\')\">distiller</span> to be useful for anything"
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

//World Maps are 32 x 20

//The objects used by the game. Honestly they are not implemented in the smoothest way ever and I may have been better off not using my engine at all
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