// game.addObject("dynamicOil")
var terrainCanvas = document.createElement("canvas")
terrainCanvas.width = 2048
terrainCanvas.height = 1280
terrainCanvas.id = "terrainCanvas"
terrainCanvas.style = "display: none;"
document.body.appendChild(terrainCanvas)

game.addObject("terrain", "this.refresh = false; this.layerId = \"terrainCanvas\"; this.id = 'baseLayer'; this.backup='true';")

var waterCanvas = document.createElement("canvas")
waterCanvas.width = 2048
waterCanvas.height = 1280
waterCanvas.id = "waterCanvas"
waterCanvas.style = "display: none;"
document.body.appendChild(waterCanvas)

game.addObject("terrain", "this.refresh = false; this.layerId = \"waterCanvas\"; this.id = 'waterLayer'; this.backup='true';")

var emptyLayer = [
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",
  "----------------------------------------------------------------",

];

game.addObject("terrain", "this.mapData = emptyLayer; this.id = \"activeLayer\"")

var tempMap = sanitizeMap([
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWWWWWWwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWWWwwwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWwwwwwwwwwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWwwwwwwwwwwwwwwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWwwwwwwwwwwwwwwwwwwwwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWW",
  "WWWWWWWWWWwwwwwwwwwwwwwwwgggggwwwwwwwwwwwwwwwwWWWWWWWWWWWWWWWWWW",
  "WWWWWWWWwwwwwwwwwwwwwwwggggggggwwwwwwwwwwwwwwwwwWWWWWWWWWWWWWWWW",
  "WWWWWWWwwwwwwwwwwwwwwgggggggggggggwwwwwwwwwwwwwwwwWWWWWWWWWWWWWW",
  "WWWWWWwwwwwwwwwwwwwwgggggggggggggggwwwwwwwwwwwwwwwwwWWWWWWWWWWWW",
  "WWWWWwwwwwwwwwwwwwgggggggggggggggggggwwwwwwwwwwwwwwwwwwWWWWWWWWW",
  "WWWWwwwwwwwwwwwwggggggggggggggggggggggggwwwwwwwwwwwwwwwwWWWWWWWW",
  "WWWWwwwwwwwwwwgggggggggggggggggggggggggggggwwwwwwwwwwwwwwWWWWWWW",
  "WWWwwwwwwwwwwgggggggggggggggggggggggggggggggggwwwwwwwwwwwWWWWWWW",
  "WWWwwwwwwwwgggggggggggggggggggggggggggggggggggggwwwwwwwwwWWWWWWW",
  "WWWwwwwwwwwgggggggggggggggggggggggggggggggggggggggwwwwwwwwWWWWWW",
  "WWWWwwwwwwgggggggggggggggggggggggggggggggggggggggggwwwwwwwWWWWWW",
  "WWWWwwwwwwgggggggggggggggggggggggggggggggggggggggggwwwwwwwWWWWWW",
  "WWWWWwwwwwwggggggggggggggggggggggggggggggggggggggggwwwwwwWWWWWWW",
  "WWWWWWwwwwwwwwggggggggggggggggggggggggggggggggggggwwwwwwWWWWWWWW",
  "WWWWWWWwwwwwwwwgggggggggggggggggggggggggggggggggggwwwwwWWWWWWWWW",
  "WWWWWWWWwwwwwwwwgggggggggggggggggggggggggggggggggwwwwwWWWWWWWWWW",
  "WWWWWWWWWwwwwwwwwggggggggggggggggggggggggggggggggwwwwwWWWWWWWWWW",
  "WWWWWWWWWWwwwwwwwgggggggggggggggggggggggggggggggwwwwwWWWWWWWWWWW",
  "WWWWWWWWWWWwwwwwwwggggggggggggggggggggggggggggggwwwwwWWWWWWWWWWW",
  "WWWWWWWWWWWWWwwwwwwggggggggggggggggggggggggggggwwwwwWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWwwwwwwgggggggggggggggggggggggggwwwwWWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWwwwwwwwgggggggggggggggggggggwwwWWWWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWwwwwwwggggggggggggggggggggwwwWWWWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWWWwwwwwggggggggggggggggggggwwwwWWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWWWWwwwwwwgggggggggggggggggggwwwwWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWwwwwwwgggggggggggggggggwwwwwWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWwwwwwwwggggggggggggggggwwwwWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWwwwwwwwwwggggggggggggwwwwwWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWwwwwwwwwwggggggggwwwwwwWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWwwwwwwwwwggggwwwwwwWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWwwwwwwwwwwwwwwWWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWwwwwwwwwwWWWWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"])

areas.push(new Area("shore", tempMap.ground,
tempMap.water, emptyLayer.slice(), [], [], []));

game.getObject("baseLayer").mapData = areas[0].baseLayer
game.getObject("activeLayer").mapData = areas[0].activeLayer
game.getObject("waterLayer").mapData = areas[0].waterLayer

tempMap = sanitizeMap([
  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg", "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",  "wwwwwwwwgggggggggggggggggggggggggggggggggggggggggggggggggggggggg",  "wwwwwwwwwwwwwwggggggggggggggggggggggggggggggggggggggggggggwwwwww",  "wwwwwwwwwwwwwwwwwwwwwwgggggggggggggggggggggggggggggggwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwggggggggggggggggggggwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "gggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",    "ggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwggggg",
  "ggggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggggggggg",  "gggggggggggggggggggggggggwwwwwwwwwwwwwwwwwwwwggggggggggggggggggg",  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
  "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg"])
areas.push({"name":"island","baseLayer":["~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","========7~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","rrrrrrrr8=====7~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~9=====0","rrrrrrrrrrrrrr8=======7~~~~~~~~~~~~~~~~~~~~~~~~~~~~~9====0rrrrrh","rrrrrrrrrrrrrrrrrrrrrr8===7~~~~~~~~~~~~~~~~~~9======0rrrrrrrrrrh","rrrrrrrrrrrrrrrrrrrrrrrrrr8==================0rrrrrrrrrrrrrrrrrh","rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrh","rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrh","qqqq6rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrh","~~~~5qqqq6rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr4qqq6","~~~~~~~~~5qqqqq6rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr4qqqq3~~~e","~~~~~~~~~~~~~~~5qqqqqqqq6rrrrrrrrrrrrrrrrrrrr4qqqqqqqq3~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~5qqqqqqqqqqqqqqqqqqqq3~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~e"],"waterLayer":["----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------",",,,,,,,x--------------------------------------------------------","jjjjjjjz,,,,,x--------------------------------------------l,,,,x","jjjjjjjjjjjjjz,,,,,,,x-------------------------------l,,,,kjjjj/","jjjjjjjjjjjjjjjjjjjjjz,,,x--------------------l,,,,,,kjjjjjjjjj/","jjjjjjjjjjjjjjjjjjjjjjjjjz,,,,,,,,,,,,,,,,,,,,kjjjjjjjjjjjjjjjj/","mmmmmcjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj/","-----vmmmmcjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjbmmmmn","----------vmmmmmcjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjbmmmmn-----","----------------vmmmmmmmmcjjjjjjjjjjjjjjjjjjbmmmmmmmmn----------","-------------------------vmmmmmmmmmmmmmmmmmmn-------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------"],"activeLayer":["----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","-----------------------p~~pp~~~~~3------------------------------","-----------------------p~~Xpp~~3-1------------------------------","--------------------p--1--ppp--1-1------------------------------","--------------------4~~p~~Xpp~31-1------------------------------","--------------------2~~p~~pp~311-1------------------------------","--------------------p--1---2~X51-1------------------------------","-----------------------1---12X~5-1------------------------------","-----------------------1---111---1------------------------------","-----------------------1---111---1------------------------------","-----------------------1---111---1------------------------------","-----------------------1---111---1------------------------------","-----------------------1---111---1------------------------------","-----------------------1---111---1------------------------------","-----------------------1---11pppp1------------------------------","-----------------------1---11pppp1------------------------------","-----------------------1---11--1-1------------------------------","-----------------------1---11--1-1------------------------------","-----------------------1---11--1-1------------------------------","-----------------------1---143-1-1------------------------------","-----------------------1---4~X31-1------------------------------","-----------------------1-----pp5-1------------------------------","-----------------------1-----11--1------------------------------","-----------------------1--2~~p1--1------------------------------","-----------------------p~~X~~X5--1------------------------------","-----------------------p~~5--1---1------------------------------","-----------------------------4~~~5------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------","----------------------------------------------------------------"],"networks":[{"name":"crude_source","rotation":0,"points":[[20,6]],"data":{"crude_oil":3,"portsInUse":[false,false,true,false]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":2},{"name":"crude_source","rotation":0,"points":[[20,9]],"data":{"crude_oil":3,"portsInUse":[true,false,false,false]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":3},{"name":"distiller","rotation":0,"points":[[23,7],[23,8]],"data":{"crude_oil":2,"crude_vapor":0,"crude_kerosene":1.5,"crude_naphtha":1.5,"residue":0.5,"portsInUse":[true,true,true,true,true,true]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":4},{"name":"pipeSegment","rotation":0,"points":[[20,8],[22,8]],"data":{"connectedFacilities":[3,4]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":26},{"name":"pipeSegment","rotation":0,"points":[[20,7],[22,7]],"data":{"connectedFacilities":[2,4]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":46},{"name":"hydrotreater","rotation":0,"points":[[26,8],[27,8]],"data":{"hydrogen":0.5,"crude_kerosene":1,"crude_naphtha":0,"crude_propane":0,"crude_butane":0,"kerosene":0,"naphtha":0,"propane":0,"butane":0,"portsInUse":[true,false,true,false,false,true]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":48},{"name":"hydrotreater","rotation":0,"points":[[27,7],[28,7]],"data":{"hydrogen":1,"crude_kerosene":0,"crude_naphtha":1,"crude_propane":0,"crude_butane":0,"kerosene":0,"naphtha":0,"propane":0,"butane":0,"portsInUse":[false,true,true,false,false,true]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":49},{"name":"hydrotreater","rotation":0,"points":[[26,4],[27,4]],"data":{"hydrogen":1,"crude_kerosene":0,"crude_naphtha":0,"crude_propane":0,"crude_butane":0,"kerosene":0,"naphtha":0,"propane":0,"butane":0,"portsInUse":[false,false,true,false,true,true]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":51},{"name":"hydrotreater","rotation":0,"points":[[27,5],[28,5]],"data":{"hydrogen":0.5,"crude_kerosene":0,"crude_naphtha":0,"crude_propane":0,"crude_butane":0,"kerosene":0,"naphtha":0,"propane":0,"butane":0,"portsInUse":[false,false,true,true,false,true]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":52},{"name":"hydrogen_source","rotation":0,"points":[[27,6]],"data":{"hydrogen":2,"portsInUse":[false,true,false,true]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":53},{"name":"valve","rotation":0,"points":[[28,6]],"data":{"crude_oil":0,"crude_vapor":0,"crude_kerosene":0,"crude_naphtha":0,"residue":0,"vapor":0,"kerosene":0,"naphtha":0,"hydrogen":4,"water":0,"light_oil":0,"heavy_oil":0,"crude_propane":0,"propane":0,"crude_butane":0,"butane":0,"gasoline":0,"diesel":0,"fuel_oil":0,"asphalt":0,"portsInUse":[true,false,true,true],"outputs":2,"outputCheck":2,"inputs":1,"inputCheck":1,"storedItem":"hydrogen","canDistribute":true},"pseudoPipe":true,"warnings":[],"alerts":[],"index":54},{"name":"pipeSegment","rotation":0,"points":[[28,5],[28,5]],"data":{"connectedFacilities":[52,54]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":55},{"name":"pipeSegment","rotation":0,"points":[[28,7],[28,7]],"data":{"connectedFacilities":[49,54]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":56},{"name":"pipeSegment","rotation":0,"points":[[27,6],[27,6]],"data":{"connectedFacilities":[53,54]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":57},{"name":"valve","rotation":0,"points":[[26,6]],"data":{"crude_oil":0,"crude_vapor":0,"crude_kerosene":0,"crude_naphtha":0,"residue":0,"vapor":0,"kerosene":0,"naphtha":0,"hydrogen":3.5,"water":0,"light_oil":0,"heavy_oil":0,"crude_propane":0,"propane":0,"crude_butane":0,"butane":0,"gasoline":0,"diesel":0,"fuel_oil":0,"asphalt":0,"portsInUse":[true,true,true,false],"outputs":2,"outputCheck":2,"inputs":1,"inputCheck":1,"storedItem":"hydrogen","canDistribute":true},"pseudoPipe":true,"warnings":[],"alerts":[],"index":58},{"name":"pipeSegment","rotation":0,"points":[[27,6],[27,6]],"data":{"connectedFacilities":[53,58]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":59},{"name":"pipeSegment","rotation":0,"points":[[24,8],[25,8]],"data":{"connectedFacilities":[4,48]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":112},{"name":"gas_processor","rotation":0,"points":[[23,4],[23,5]],"data":{"crude_vapor":1,"crude_propane":0.5,"crude_butane":0,"portsInUse":[false,true,true,true,false,false]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":145},{"name":"pipeSegment","rotation":0,"points":[[23,6],[23,6]],"data":{"connectedFacilities":[145,4]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":157},{"name":"pipeSegment","rotation":0,"points":[[24,4],[25,4]],"data":{"connectedFacilities":[145,51]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":174},{"name":"pipeSegment","rotation":0,"points":[[24,5],[26,5]],"data":{"connectedFacilities":[145,52]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":183},{"name":"pipeSegment","rotation":0,"points":[[26,5],[26,5]],"data":{"connectedFacilities":[51,58]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":185},{"name":"ship","rotation":90,"points":[[32,17],[31,17],[30,17],[29,17],[32,18],[31,18],[30,18],[29,18]],"data":{"kerosene":1,"naphtha":0,"propane":0,"butane":0,"fuel_oil":0,"asphalt":0,"gasoline":1,"diesel":0,"portsInUse":[false,false,false,false,false,false,false,false,true,true,false,false]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":186},{"name":"pipeSegment","rotation":0,"points":[[29,16],[28,8]],"data":{"connectedFacilities":[186,48]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":267},{"name":"gasoline_mixer","rotation":0,"points":[[29,24],[30,24]],"data":{"butane":2,"naphtha":1.75,"light_oil":1.5,"fuel_oil":1.75,"gasoline":2,"portsInUse":[true,true,true,true,true,false]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":325},{"name":"pipeSegment","rotation":0,"points":[[30,23],[29,7]],"data":{"connectedFacilities":[325,49]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":326},{"name":"pipeSegment","rotation":0,"points":[[29,23],[29,5]],"data":{"connectedFacilities":[325,52]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":441},{"name":"pipeSegment","rotation":0,"points":[[24,7],[26,7]],"data":{"connectedFacilities":[4,49]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":459},{"name":"pipeSegment","rotation":0,"points":[[26,7],[26,7]],"data":{"connectedFacilities":[48,58]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":461},{"name":"residue_processor","rotation":0,"points":[[23,27],[23,28]],"data":{"residue":0,"light_oil":0.5,"heavy_oil":0.5,"portsInUse":[true,true,true,false,false,false]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":520},{"name":"pipeSegment","rotation":0,"points":[[23,26],[23,9]],"data":{"connectedFacilities":[520,4]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":521},{"name":"fuel_oil_mixer","rotation":270,"points":[[29,26]],"data":{"propane":1.5,"heavy_oil":0,"fuel_oil":0,"portsInUse":[true,true,false,true]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":523},{"name":"pipeSegment","rotation":0,"points":[[28,4],[29,27]],"data":{"connectedFacilities":[51,523]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":526},{"name":"pipeSegment","rotation":0,"points":[[24,27],[30,25]],"data":{"connectedFacilities":[520,325]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":534},{"name":"pipeSegment","rotation":0,"points":[[24,28],[28,26]],"data":{"connectedFacilities":[520,523]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":561},{"name":"pipeSegment","rotation":0,"points":[[29,25],[29,25]],"data":{"connectedFacilities":[325,523]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":570},{"name":"pipeSegment","rotation":0,"points":[[31,24],[31,19]],"data":{"connectedFacilities":[325,186]},"pseudoPipe":false,"warnings":[],"alerts":[],"index":602}],"links":[{"facility1":[3,0],"facility2":[4,5],"supportingConduit":26},{"facility1":[2,2],"facility2":[4,4],"supportingConduit":46},{"facility1":[52,3],"facility2":[54,0],"supportingConduit":55},{"facility1":[49,1],"facility2":[54,2],"supportingConduit":56},{"facility1":[53,1],"facility2":[54,3],"supportingConduit":57},{"facility1":[53,3],"facility2":[58,1],"supportingConduit":59},{"facility1":[4,2],"facility2":[48,5],"supportingConduit":112},{"facility1":[145,3],"facility2":[4,0],"supportingConduit":157},{"facility1":[145,1],"facility2":[51,5],"supportingConduit":174},{"facility1":[145,2],"facility2":[52,5],"supportingConduit":183},{"facility1":[51,4],"facility2":[58,0],"supportingConduit":185},{"facility1":[186,8],"facility2":[48,2],"supportingConduit":267},{"facility1":[325,1],"facility2":[49,2],"supportingConduit":326},{"facility1":[325,0],"facility2":[52,2],"supportingConduit":441},{"facility1":[4,1],"facility2":[49,5],"supportingConduit":459},{"facility1":[48,0],"facility2":[58,2],"supportingConduit":461},{"facility1":[520,0],"facility2":[4,3],"supportingConduit":521},{"facility1":[51,2],"facility2":[523,3],"supportingConduit":526},{"facility1":[520,1],"facility2":[325,3],"supportingConduit":534},{"facility1":[520,2],"facility2":[523,0],"supportingConduit":561},{"facility1":[325,4],"facility2":[523,1],"supportingConduit":570},{"facility1":[325,2],"facility2":[186,9],"supportingConduit":602}],"overlay":[{"texture":"pipe_submerge","x":29,"y":16,"rotation":3.141592653589793,"type":"pipe","data":{}},{"texture":"pipe_submerge","x":27,"y":16,"rotation":3.141592653589793,"type":"pipe","data":{}},{"texture":"pipe_submerge","x":28,"y":16,"rotation":3.141592653589793,"type":"pipe","data":{}},{"texture":"pipe_submerge","x":33,"y":16,"rotation":3.141592653589793,"type":"pipe","data":{}},{"texture":"pipe_submerge","x":23,"y":15,"rotation":3.141592653589793,"type":"pipe","data":{}},{"texture":"pipe_submerge","x":31,"y":21,"rotation":0,"type":"pipe","data":{}},{"texture":"null","x":32.5,"y":18.5,"rotation":0.017453292519943295,"type":"ripple","data":{"age":184.80000000000155}},{"texture":"null","x":23,"y":15,"rotation":0,"type":"ripple","data":{"age":113.99999999999963}},{"texture":"null","x":28,"y":16,"rotation":0,"type":"ripple","data":{"age":109.19999999999968}},{"texture":"null","x":28,"y":16,"rotation":0,"type":"ripple","data":{"age":34.80000000000004}},{"texture":"null","x":27,"y":16,"rotation":0,"type":"ripple","data":{"age":32.400000000000034}}]});




tempMap = undefined;
loadArea("shore")

createNetwork(37, 8, "ship")
