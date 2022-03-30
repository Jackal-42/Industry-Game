var game = new Game("game");
noise.seed(Math.random())

var fluids = ["crude_oil", "crude_vapor", "crude_kerosene", "crude_naphtha", "residue", "vapor", "kerosene", "naphtha", "hydrogen", "water", "light_oil", "heavy_oil", "crude_propane", "propane", "crude_butane", "butane", "gasoline", "diesel", "fuel_oil", "asphalt"]

var products = [
  {
    name: "naphtha",
    price: 15,
  },

  {
    name: "kerosene",
    price: 10,
  },

  {
    name: "propane",
    price: 10,
  },

  {
    name: "butane",
    price: 12,
  },

  {
    name: "fuel_oil",
    price: 20,
  },

  {
    name: "asphalt",
    price: 8,
  },

  {
    name: "gasoline",
    price: 50,
  },

  {
    name: "diesel",
    price: 50,
  },
]


//The list of facility templates
var facilities = [
  {
    name: "distiller",
    limit: Infinity,
    width: 1,
    height: 2,
    maxItems: 2,
    pseudoPipe: false,
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
    limit: Infinity,
    width: 1,
    height: 2,
    maxItems: 2,
    pseudoPipe: false,
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
    limit: Infinity,
    width: 1,
    height: 2,
    maxItems: 2,
    pseudoPipe: false,
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
    limit: Infinity,
    width: 2,
    height: 1,
    maxItems: 1,
    pseudoPipe: false,
    storage: ["hydrogen", "crude_kerosene", "crude_naphtha", "crude_propane", "crude_butane", "kerosene", "naphtha", "propane", "butane"],
    layout: [[0, 0], [1, 0]],
    process: function(me){
      while(true){
        if(me.data.hydrogen >= 1){
          if(me.data.crude_kerosene >= 1){
            me.data.hydrogen -= 1;
            me.data.crude_kerosene -= 1;
            me.data.kerosene += 1;
            me.data.naphtha = 0;
            me.data.propane = 0;
            me.data.butane = 0;
            continue;
          }
          if(me.data.crude_naphtha >= 1){
            me.data.hydrogen -= 1;
            me.data.crude_naphtha -= 1;
            me.data.naphtha += 1;
            me.data.kerosene = 0;
            me.data.propane = 0;
            me.data.butane = 0;
            continue;
          }
          if(me.data.crude_propane >= 1){
            me.data.hydrogen -= 1;
            me.data.crude_propane -= 1;
            me.data.propane += 1;
            me.data.naphtha = 0;
            me.data.kerosene = 0;
            me.data.butane = 0;
            continue;
          }
          if(me.data.crude_butane >= 1){
            me.data.hydrogen -= 1;
            me.data.crude_butane -= 1;
            me.data.butane += 1;
            me.data.naphtha = 0;
            me.data.kerosene = 0;
            me.data.propane = 0;
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
        gender: ["output", ["kerosene", "naphtha", "propane", "butane"]]
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
        gender: ["input", ["crude_kerosene", "crude_naphtha", "crude_propane", "crude_butane"]],
      },
    ],
  },

  {
    name: "gasoline_mixer",
    limit: Infinity,
    width: 2,
    height: 1,
    maxItems: 2,
    pseudoPipe: false,
    storage: ["butane", "naphtha", "light_oil", "fuel_oil", "gasoline"],
    layout: [[0, 0], [1, 0]],
    process: function(me){
      while(true){
        if(me.data.butane >= 0.25 && me.data.naphtha >= 0.25 && me.data.light_oil >= 0.25 && me.data.fuel_oil >= 0.25){
          me.data.gasoline += 1

          me.data.butane -= 0.25
          me.data.naphtha -= 0.25
          me.data.light_oil -= 0.25
          me.data.fuel_oil -= 0.25
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
        gender: ["input", ["butane"]],
      },

      {
        x: 1,
        y: -1,
        conduit: "pipe",
        gender: ["input", ["naphtha"]],
      },

      {
        x: 2,
        y: 0,
        conduit: "pipe",
        gender: ["output", ["gasoline"]]
      },

      {
        x: 1,
        y: 1,
        conduit: "pipe",
        gender: ["input", ["light_oil"]],
      },

      {
        x: 0,
        y: 1,
        conduit: "pipe",
        gender: ["input", ["fuel_oil"]],
      },

      {
        x: -1,
        y: 0,
        conduit: "pipe",
        gender: ["output", ["gasoline"]],
      },
    ],
  },

  {
    name: "diesel_mixer",
    limit: Infinity,
    width: 2,
    height: 1,
    maxItems: 2,
    pseudoPipe: false,
    storage: ["kerosene", "heavy_oil", "light_oil", "fuel_oil", "diesel"],
    layout: [[0, 0], [1, 0]],
    process: function(me){
      while(true){
        if(me.data.kerosene >= 0.25 && me.data.heavy_oil >= 0.25 && me.data.light_oil >= 0.25 && me.data.fuel_oil >= 0.25){
          me.data.diesel += 1

          me.data.kerosene -= 0.25
          me.data.heavy_oil -= 0.25
          me.data.light_oil -= 0.25
          me.data.fuel_oil -= 0.25
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
        gender: ["input", ["heavy_oil"]],
      },

      {
        x: 1,
        y: -1,
        conduit: "pipe",
        gender: ["input", ["kerosene"]],
      },

      {
        x: 2,
        y: 0,
        conduit: "pipe",
        gender: ["output", ["diesel"]]
      },

      {
        x: 1,
        y: 1,
        conduit: "pipe",
        gender: ["input", ["light_oil"]],
      },

      {
        x: 0,
        y: 1,
        conduit: "pipe",
        gender: ["input", ["fuel_oil"]],
      },

      {
        x: -1,
        y: 0,
        conduit: "pipe",
        gender: ["output", ["diesel"]],
      },
    ],
  },

  {
    name: "fuel_oil_mixer",
    limit: Infinity,
    width: 1,
    height: 1,
    maxItems: 2,
    pseudoPipe: false,
    storage: ["propane", "heavy_oil", "fuel_oil"],
    layout: [[0, 0]],
    process: function(me){
      while(true){
        if(me.data.propane >= 0.5 && me.data.heavy_oil >= 1){
          me.data.fuel_oil += 1

          me.data.propane -= 0.5
          me.data.heavy_oil -= 1
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
        gender: ["input", ["heavy_oil"]],
      },

      {
        x: 1,
        y: 0,
        conduit: "pipe",
        gender: ["output", ["fuel_oil"]]
      },

      {
        x: 0,
        y: 1,
        conduit: "pipe",
        gender: ["input", ["heavy_oil"]],
      },

      {
        x: -1,
        y: 0,
        conduit: "pipe",
        gender: ["input", ["propane"]],
      },
    ],
  },

  {
    name: "asphalt_mixer",
    limit: Infinity,
    width: 1,
    height: 1,
    maxItems: 2,
    pseudoPipe: false,
    storage: ["crude_oil", "asphalt"],
    layout: [[0, 0]],
    process: function(me){
      while(true){
        if(me.data.crude_oil >= 1){
          me.data.crude_oil -= 1;
          me.data.asphalt += 0.2;
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
        gender: ["input", ["crude_oil"]],
      },

      {
        x: 1,
        y: 0,
        conduit: "pipe",
        gender: ["output", ["asphalt"]]
      },

      {
        x: 0,
        y: 1,
        conduit: "pipe",
        gender: ["input", ["crude_oil"]],
      },

      {
        x: -1,
        y: 0,
        conduit: "pipe",
        gender: ["input", ["crude_oil"]],
      },
    ],
  },

  {
    name: "ship",
    limit: Infinity,
    width: 2,
    height: 4,
    maxItems: 256,
    pseudoPipe: false,
    storage: ["kerosene", "naphtha", "propane", "butane", "fuel_oil", "asphalt", "gasoline", "diesel"],
    layout: [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3]],
    process: function(me){
      funds += me.data.kerosene * 10
      funds += me.data.naphtha * 15
      funds += me.data.butane * 10
      funds += me.data.propane * 12
      funds += me.data.fuel_oil * 20
      funds += me.data.asphalt * 8
      funds += me.data.gasoline * 50
      funds += me.data.diesel * 50
      me.data.kerosene = 0;
      me.data.naphtha = 0;
      me.data.butane = 0;
      me.data.propane = 0;
      me.data.fuel_oil = 0;
      me.data.asphalt = 0;
      me.data.gasoline = 0;
      me.data.diesel = 0;
    },
    ports: [
      {
        x: -1,
        y: 0,
        conduit: "pipe",
        gender: ["breaker", ["null"]],
      },

      {
        x: 2,
        y: 0,
        conduit: "pipe",
        gender: ["breaker", ["null"]],
      },

      {
        x: 0,
        y: -1,
        conduit: "pipe",
        gender: ["breaker", ["null"]],
      },

      {
        x: 1,
        y: -1,
        conduit: "pipe",
        gender: ["breaker", ["null"]],
      },

      {
        x: 0,
        y: 4,
        conduit: "pipe",
        gender: ["breaker", ["null"]],
      },

      {
        x: 1,
        y: 4,
        conduit: "pipe",
        gender: ["breaker", ["null"]],
      },

      {
        x: -1,
        y: 1,
        conduit: "pipe",
        gender: ["input", ["kerosene", "naphtha", "propane", "butane", "fuel_oil", "asphalt", "gasoline", "diesel"]],
      },

      {
        x: -1,
        y: 2,
        conduit: "pipe",
        gender: ["input", ["kerosene", "naphtha", "propane", "butane", "fuel_oil", "asphalt", "gasoline", "diesel"]],
      },

      {
        x: -1,
        y: 3,
        conduit: "pipe",
        gender: ["input", ["kerosene", "naphtha", "propane", "butane", "fuel_oil", "asphalt", "gasoline", "diesel"]],
      },

      {
        x: 2,
        y: 1,
        conduit: "pipe",
        gender: ["input", ["kerosene", "naphtha", "propane", "butane", "fuel_oil", "asphalt", "gasoline", "diesel"]],
      },

      {
        x: 2,
        y: 2,
        conduit: "pipe",
        gender: ["input", ["kerosene", "naphtha", "propane", "butane", "fuel_oil", "asphalt", "gasoline", "diesel"]],
      },

      {
        x: 2,
        y: 3,
        conduit: "pipe",
        gender: ["input", ["kerosene", "naphtha", "propane", "butane", "fuel_oil", "asphalt", "gasoline", "diesel"]],
      },
    ],
  },

  {
    name: "tank",
    limit: Infinity,
    width: 2,
    height: 2,
    maxItems: 20,
    pseudoPipe: false,
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
    limit: Infinity,
    width: 1,
    height: 1,
    maxItems: 4,
    pseudoPipe: true,
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
    limit: Infinity,
    width: 1,
    height: 1,
    maxItems: 4,
    pseudoPipe: true,
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

      {
        x: 0,
        y: -1,
        direction: "center",
        conduit: "pipe",
        gender: ["breaker", ["null"]],
      },
    ],
  },

  {
    name: "one_way_pipe",
    limit: Infinity,
    width: 1,
    height: 1,
    maxItems: 2,
    pseudoPipe: true,
    storage: fluids.slice(),
    data: [],
    layout: [[0, 0]],
    process: function(me){

    },
    ports: [
      {
        x: 0,
        y: -1,
        conduit: "pipe",
        gender: ["output", ["null"]],
      },

      {
        x: 0,
        y: 1,
        conduit: "pipe",
        gender: ["input", ["null"]],
      },

      {
        x: -1,
        y: 0,
        conduit: "pipe",
        gender: ["breaker", ["null"]],
      },

      {
        x: 1,
        y: 0,
        conduit: "pipe",
        gender: ["breaker", ["null"]],
      },
    ],
  },

  {
    name: "crude_source",
    limit: 2,
    width: 1,
    height: 1,
    maxItems: 4,
    pseudoPipe: false,
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
    limit: Infinity,
    width: 1,
    height: 1,
    maxItems: 4,
    pseudoPipe: false,
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

  {
    name: "any_source",
    limit: Infinity,
    width: 1,
    height: 1,
    maxItems: 4,
    pseudoPipe: false,
    storage: fluids.slice(),
    data: [["sourceType", "\"crude_oil\""]],
    layout: [[0, 0]],
    process: function(me){eval("me.data." + me.data.sourceType + " = 4")},
    ports: [
      {
        x: 0,
        y: -1,
        conduit: "pipe",
        gender: ["output", ["null"]],
      },

      {
        x: 1,
        y: 0,
        conduit: "pipe",
        gender: ["output", ["null"]],
      },

      {
        x: 0,
        y: 1,
        conduit: "pipe",
        gender: ["output", ["null"]],
      },

      {
        x: -1,
        y: 0,
        conduit: "pipe",
        gender: ["output", ["null"]],
      },
    ],
  },
]




var upgrades = [

  {
    name: "Fuel Oil Mixer",
    text: "Extracts a valuable, high energy fuel from heavy oil",
    cost: 1000,
    unlock: "unlockHotbarButton(\"hotbar_fuel_oil_mixer\"); upgrades.splice(1, 0, {name: \"Gasoline Mixer\",text: \"Mixes several different products to create the most sought-after fuel on the market\",cost: 1500,unlock: \"unlockHotbarButton(\\\"hotbar_gasoline_mixer\\\")\",unlocked: false,priority: 2,});upgrades.splice(2, 0, {name: \"Diesel Mixer\",text: \"Mixes several different products to create a heavy-duty fuel that fetches a high price\",cost: 2000,unlock: \"unlockHotbarButton(\\\"hotbar_diesel_mixer\\\")\",unlocked: false,priority: 4,})",
    unlocked: false,
    priority: 1,
  },

  {
    name: "Valves",
    text: "They can split and merge pipes for a more efficient factory",
    cost: 1500,
    unlock: "unlockHotbarButton(\"hotbar_valve\")",
    unlocked: false,
    priority: 3,
  },

  {
    name: "T-Valves",
    text: "They can change the direction items flow at the flip of an arrow",
    cost: 2000,
    unlock: "unlockHotbarButton(\"hotbar_t_valve\")",
    unlocked: false,
    priority: 6,
  },

  {
    name: "Storage Tanks",
    text: "A place to store up to 250 liters of any substance",
    cost: 1000,
    unlock: "unlockHotbarButton(\"hotbar_tank\")",
    unlocked: false,
    priority: 5,
  },

  // {
  //   name: "Advocacy",
  //   text: "Hire advocates for your company to lobby for political issues",
  //   cost: 2500,
  //   unlock: "",
  //   unlocked: false,
  //   priority: 3,
  // },

  {
    name: "One-Way Pump",
    text: "It can limit item flow to only one direction along a pipe",
    cost: 2400,
    unlock: "unlockHotbarButton(\"hotbar_one_way_pipe\")",
    unlocked: false,
    priority: 8,
  },

  {
    name: "Out of Upgrades",
    text: "Congrats! You have no more upgrades to unlock!",
    cost: 0,
    unlock: "",
    unlocked: false,
    priority: 4,
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
    name: "help_inputs",
    title: "Facility Inputs",
    text: "Most facilities need to recieve an input of items before they can output items. Look at the infographic. Any arrow that points toward the facility is an input that must be connected before the facility is functional. Multiple inputs of the same item are not required but will boost the speed of the facility. Click on the icons next to the input arrows to see which facilities output those items."
  },

  {
    name: "hotbar_crude_source",
    title: "Crude Oil Pump",
    text: "Produces crude oil"
  },

  {
    name: "hotbar_hydrogen_source",
    title: "Hydrogen Synthesizer",
    text: "Produces hydrogen"
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
    name: "hotbar_ship",
    title: "Tanker Ship",
    text: "Many oil products can be sold by pumping them into the ship. Items are sold automatically."
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
    name: "hotbar_one_way_pipe",
    title: "One-Way Pump",
    text: "Can be placed at any point along the length of a pipe segment to limit flow to the direction of the arrows"
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
    text: "Processes <span class=\"tooltipLink\" onclick=\"createTooltip(\'crude_vapor\')\">crude vapor</span> into crude <span class=\"tooltipLink\" onclick=\"createTooltip(\'crude_propane\')\">propane</span> and <span class=\"tooltipLink\" onclick=\"createTooltip(\'crude_butane\')\">butane</span>"
  },

  {
    name: "hotbar_residue_processor",
    title: "Residue Processor",
    text: "Processes <span class=\"tooltipLink\" onclick=\"createTooltip(\'residue\')\">residue</span> into <span class=\"tooltipLink\" onclick=\"createTooltip(\'light_oil\')\">light oil</span> and <span class=\"tooltipLink\" onclick=\"createTooltip(\'heavy_oil\')\">heavy oil</span>"
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
    text: "This flammable oil is produced at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_distiller\')\">distiller</span> and is commonly used for heating, but must be purified at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_hydrotreater\')\">hydrotreater</span> before it can be sold"
  },

  {
    name: "kerosene",
    title: "<img src=\"docs/assets/kerosene_icon.png\"><span style=\"position: absolute; margin-top: 4px;\">Kerosene</span>",
    text: "This flammable oil is produced at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_distiller\')\">distiller</span> and is commonly used for heating, but is also used to make <span class=\"tooltipLink\" onclick=\"createTooltip(\'diesel\')\">diesel</span>"
  },

  {
    name: "crude_naphtha",
    title: "<img src=\"docs/assets/crude_naphtha_icon.png\"><span style=\"position: absolute; margin-top: 4px;\">Crude Naphtha</span>",
    text: "This oil is produced at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_distiller\')\">distiller</span> and is one of the most important ingredients in <span class=\"tooltipLink\" onclick=\"createTooltip(\'gasoline\')\">gasoline</span>, but must be purified at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_hydrotreater\')\">hydrotreater</span> before it can be used"
  },

  {
    name: "naphtha",
    title: "<img src=\"docs/assets/naphtha_icon.png\"><span style=\"position: absolute; margin-top: 4px;\">Naphtha</span>",
    text: "This oil is produced at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_distiller\')\">distiller</span> and is one of the most important ingredients in <span class=\"tooltipLink\" onclick=\"createTooltip(\'gasoline\')\">gasoline</span>, but it also can be sold for a decent price."
  },

  {
    name: "hotbar_fuel_oil_mixer",
    title: "Fuel Oil Mixer",
    text: "Converts <span class=\"tooltipLink\" onclick=\"createTooltip(\'heavy_oil\')\">heavy oil</span> and <span class=\"tooltipLink\" onclick=\"createTooltip(\'propane\')\">propane</span> into <span class=\"tooltipLink\" onclick=\"createTooltip(\'fuel_oil\')\">fuel oil</span>"
  },

  {
    name: "hotbar_asphalt_mixer",
    title: "Asphalt Mixer",
    text: "Converts <span class=\"tooltipLink\" onclick=\"createTooltip(\'crude_oil\')\">crude oil</span> into <span class=\"tooltipLink\" onclick=\"createTooltip(\'asphalt\')\">asphalt</span>"
  },

  {
    name: "hotbar_gasoline_mixer",
    title: "Gasoline Mixer",
    text: "Converts <span class=\"tooltipLink\" onclick=\"createTooltip(\'butane\')\">butane</span>, <span class=\"tooltipLink\" onclick=\"createTooltip(\'naphtha\')\">naphtha</span>, <span class=\"tooltipLink\" onclick=\"createTooltip(\'light_oil\')\">light oil</span>, and <span class=\"tooltipLink\" onclick=\"createTooltip(\'fuel_oil\')\">fuel oil</span> into <span class=\"tooltipLink\" onclick=\"createTooltip(\'gasoline\')\">gasoline</span>"
  },

  {
    name: "hotbar_diesel_mixer",
    title: "Diesel Mixer",
    text: "Converts <span class=\"tooltipLink\" onclick=\"createTooltip(\'heavy_oil\')\">heavy oil</span>, <span class=\"tooltipLink\" onclick=\"createTooltip(\'kerosene\')\">kerosene</span>, <span class=\"tooltipLink\" onclick=\"createTooltip(\'light_oil\')\">light oil</span>, and <span class=\"tooltipLink\" onclick=\"createTooltip(\'fuel_oil\')\">fuel oil</span> into <span class=\"tooltipLink\" onclick=\"createTooltip(\'diesel\')\">diesel</span>"
  },

  {
    name: "asphalt",
    title: "<img src=\"docs/assets/asphalt_icon.png\"><span style=\"position: absolute; margin-top: 4px;\">Asphalt</span>",
    text: "While this viscous black material doesn\'t sell for a lot, it is useful for developing a good reputation with governments. It can be created at an <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_asphalt_mixer\')\">asphalt mixer</span>"
  },

  {
    name: "gasoline",
    title: "<img src=\"docs/assets/gasoline_icon.png\"><span style=\"position: absolute; margin-top: 4px;\">Gasoline</span>",
    text: "Gasoline is a desirable and versatile fuel created at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_gasoline_mixer\')\">gasoline mixer</span>"
  },

  {
    name: "diesel",
    title: "<img src=\"docs/assets/diesel_icon.png\"><span style=\"position: absolute; margin-top: 4px;\">Diesel</span>",
    text: "Diesel is a heavy-duty and pricey fuel created at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_diesel_mixer\')\">diesel mixer</span>"
  },

  {
    name: "fuel_oil",
    title: "<img src=\"docs/assets/fuel_oil_icon.png\"><span style=\"position: absolute; margin-top: 4px;\">Fuel Oil</span>",
    text: "This energy-dense fuel is produced at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_fuel_oil_mixer\')\">fuel oil mixer</span> and is a key ingredient in <span class=\"tooltipLink\" onclick=\"createTooltip(\'gasoline\')\">gasoline</span> and <span class=\"tooltipLink\" onclick=\"createTooltip(\'diesel\')\">diesel</span>"
  },

  {
    name: "light_oil",
    title: "<img src=\"docs/assets/light_oil_icon.png\"><span style=\"position: absolute; margin-top: 4px;\">Light Oil</span>",
    text: "Despite its name, light oil is one of the densest and heaviest products of <span class=\"tooltipLink\" onclick=\"createTooltip(\'crude_oil\')\">crude oil</span>. It is produced at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_residue_processor\')\">residue processor</span> and can be converted into <span class=\"tooltipLink\" onclick=\"createTooltip(\'gasoline\')\">gasoline</span> and <span class=\"tooltipLink\" onclick=\"createTooltip(\'diesel\')\">diesel</span>"
  },

  {
    name: "heavy_oil",
    title: "<img src=\"docs/assets/heavy_oil_icon.png\"><span style=\"position: absolute; margin-top: 4px;\">Heavy Oil</span>",
    text: "One of the most versatile oil products, heavy oil is produced at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_residue_processor\')\">residue processor</span> and is used to make <span class=\"tooltipLink\" onclick=\"createTooltip(\'fuel_oil\')\">fuel oil</span> and <span class=\"tooltipLink\" onclick=\"createTooltip(\'asphalt\')\">asphalt</span>"
  },

  {
    name: "crude_propane",
    title: "<img src=\"docs/assets/crude_propane_icon.png\"><span style=\"position: absolute; margin-top: 4px;\">Crude Propane</span>",
    text: "This gas can be sold and is used to create <span class=\"tooltipLink\" onclick=\"createTooltip(\'fuel_oil\')\">fuel oil</span>, but must be purified at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_hydrotreater\')\">hydrotreater</span> before it can be used. It is produced at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_gas_processor\')\">vapor processor</span>."
  },

  {
    name: "propane",
    title: "<img src=\"docs/assets/propane_icon.png\"><span style=\"position: absolute; margin-top: 4px;\">Propane</span>",
    text: "This gas, commonly used for gas stoves, can be sold and is also used to create <span class=\"tooltipLink\" onclick=\"createTooltip(\'fuel_oil\')\">fuel oil</span> at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_fuel_oil_mixer\')\">fuel oil mixer</span>. It is produced at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_gas_processor\')\">vapor processor</span>."
  },

  {
    name: "crude_butane",
    title: "<img src=\"docs/assets/crude_butane_icon.png\"><span style=\"position: absolute; margin-top: 4px;\">Crude Butane</span>",
    text: "This gas can be sold is used to create <span class=\"tooltipLink\" onclick=\"createTooltip(\'gasoline\')\">gasoline</span>, but must be purified at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_hydrotreater\')\">hydrotreater</span> before it can be used. It is produced at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_gas_processor\')\">vapor processor</span>."
  },

  {
    name: "butane",
    title: "<img src=\"docs/assets/butane_icon.png\"><span style=\"position: absolute; margin-top: 4px;\">Butane</span>",
    text: "This gas can be sold and is also used to create <span class=\"tooltipLink\" onclick=\"createTooltip(\'gasoline\')\">gasoline</span> at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_gasoline_mixer\')\">gasoline mixer</span>. It is produced at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_gas_processor\')\">vapor processor</span>."
  },

  {
    name: "crude_vapor",
    title: "<img src=\"docs/assets/crude_vapor_icon.png\"><span style=\"position: absolute; margin-top: 4px;\">Crude Vapor</span>",
    text: "This mixture of gases is produced at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_distiller\')\">distiller</span> and can be seperated into crude <span class=\"tooltipLink\" onclick=\"createTooltip(\'crude_propane\')\">propane</span> and <span class=\"tooltipLink\" onclick=\"createTooltip(\'crude_butane\')\">butane</span> at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_gas_processor\')\">vapor processor</span>"
  },

  {
    name: "residue",
    title: "<img src=\"docs/assets/residue_icon.png\"><span style=\"position: absolute; margin-top: 4px;\">Residue</span>",
    text: "This mixture of solids is produced at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_distiller\')\">distiller</span> and can be seperated into <span class=\"tooltipLink\" onclick=\"createTooltip(\'light_oil\')\">light oil</span> and <span class=\"tooltipLink\" onclick=\"createTooltip(\'heavy_oil\')\">heavy oil</span> at a <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_residue_processor\')\">residue processor</span>"
  },

  {
    name: "hydrogen",
    title: "<img src=\"docs/assets/hydrogen_icon.png\"><span style=\"position: absolute; margin-top: 4px;\">Hydrogen</span>",
    text: "This gas is used by the <span class=\"tooltipLink\" onclick=\"createTooltip(\'hotbar_hydrotreater\')\">hydrotreater</span> to bring the impurities out of other oils and gases"
  },


]

var corporations = [
  {
    name: "Pebblefellow Industries",
    worth: 10000,
    shares: 1000,
    playerShares: 1000,
    owned: true,
    owns: ["shore"],
  },

  {
    name: "Western Gas & Oil",
    worth: 15000,
    shares: 1500,
    playerShares: 0,
    owned: false,
    owns: ["island"],
  },

  {
    name: "Robtech Corporation",
    worth: 50000,
    shares: 4000,
    playerShares: 0,
    owned: false,
    owns: ["riverBend"],
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
  ["role", function(myIndex){
    var self = game.objects[myIndex]


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
        var row = game.objects[myIndex].mapData[j].split("");
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

            // var conduitTextureX = "null"
            // var conduitTextureY = "null"

            // if(getMapData(k - 1, j) == "p"){

            //   var coordString = JSON.stringify([k - 1, j])

            //   for(var a = 0, llll = areas[areaIndex].networks.length; a < llll; a++){
            //     if(JSON.stringify(areas[areaIndex].networks[a].points).includes(coordString)){
            //       for(var b = 0, lllll = facilities.length; b < lllll; b++){
            //         if(facilities[b].name.includes(areas[areaIndex].networks[a].name)){
            //           for(var c = 0, cl = facilities[b].ports.length; c < cl; c++){
            //             if(areas[areaIndex].networks[a].points[0][0] + facilities[b].ports[c].x == k && areas[areaIndex].networks[a].points[0][1] + facilities[b].ports[c].y == j){
            //               conduitTextureX = facilities[b].ports[c].conduit
            //               break;
            //             }
            //           }
            //         }
            //       }
            //       break;
            //     }
            //   }
            // }

            // if(getMapData(k, j - 1) == "p"){
            //   var coordString = JSON.stringify([k, j - 1])

            //   for(var a = 0, llll = areas[areaIndex].networks.length; a < llll; a++){
            //     if(JSON.stringify(areas[areaIndex].networks[a].points).includes(coordString)){
            //       for(var b = 0, lllll = facilities.length; b < lllll; b++){
            //         if(facilities[b].name.includes(areas[areaIndex].networks[a].name)){
            //           for(var c = 0, cl = facilities[b].ports.length; c < cl; c++){
            //             if(areas[areaIndex].networks[a].points[0][0] + facilities[b].ports[c].x == k && areas[areaIndex].networks[a].points[0][1] + facilities[b].ports[c].y == j){
            //               conduitTextureY = facilities[b].ports[c].conduit
            //               break;
            //             }
            //           }
            //         }
            //       }
            //       break;
            //     }
            //   }
            // }

            // if(conduitTextureX == "null"){
            //   conduitTextureX = getTile("tiles", getMapData(k - 1 + xModifier, j))[0].split("_")[0]
            // }

            // if(conduitTextureY == "null"){
            //   conduitTextureY = getTile("tiles", getMapData(k, j - 1 + yModifier))[0].split("_")[0]
            // }

            var conduitTextureX = "pipe"
            var conduitTextureY = "pipe"
            var image;
            if(intersectors.includes(conduitTextureX)){
              image = game.getTexture(conduitTextureY + "_vv")

              ctx.drawImage(image, ((k*16)-mapTargetX/8)*2, ((j*16)-mapTargetY/8) * 2, image.width * 2, image.height * 2)

              image = game.getTexture(conduitTextureX + "_hh")

              ctx.drawImage(image, ((k*16)-mapTargetX/8)*2, ((j*16)-mapTargetY/8) * 2, image.width * 2, image.height * 2)
            }else{
              image = game.getTexture(conduitTextureX + "_hh")

              ctx.drawImage(image, ((k*16)-mapTargetX/8)*2, ((j*16)-mapTargetY/8) * 2, image.width * 2, image.height * 2)

              image = game.getTexture(conduitTextureY + "_vv")

              ctx.drawImage(image, ((k*16)-mapTargetX/8)*2, ((j*16)-mapTargetY/8) * 2, image.width * 2, image.height * 2)
            }
            continue;
          }
          if(self.id == "baseLayer" || self.id == "waterLayer"){
            var image = game.getTexture(getTile("terrain", row[k])[0])
          }else{
            var image = game.getTexture(getTile("tile", row[k])[0])
          }
          ctx.drawImage(image, ((k*16)-mapTargetX/8) * 2, ((j*16)-mapTargetY/8) * 2, 32, 32)
        }
      }
    }
    self.render = false;





  }],
  ["layer", "terrain"],
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
  ["role", function(myIndex){
    var self = game.objects[myIndex]
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
  }]
]);
