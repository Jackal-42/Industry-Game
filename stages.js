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
  "gggggggggggggggggggggggggggggwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "ggggggggggggggggggggggggggggwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "gggggggggggggggggggggggggggwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "gggggggggggggggggggggggggggwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "ggggggggggggggggggggggggggwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "gggggggggggggggggggggggggwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "wwwwggggggwwwwggggggggggwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "wwwwwwwwwwwwwwwwwgggwwwwwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "gggwwwggggggwwwwwwwwwwwwwwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "ggggggggggggggggwwwgggwwwwwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "gggggggggggggggggggggggwwwwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "gggggggggggggggggggggggwwwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "ggggggggggggggggggggggwwwwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "gggggggggggggggggggggwwwwwwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "gggggggggggggggggggggwwwwwwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "ggggggggggggggggggggwwwwwwwwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "ggggggggggggggggggwwwwwwwwwwwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "ggggggggggggggwwwwwwwwwwwwwwwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "wwwwwwwwwwwwwwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "wwwwwwwwwwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "wwwwwwwwWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"])

areas.push(new Area("shore", tempMap.ground,
tempMap.water, emptyLayer.slice(), [], []));

game.getObject("baseLayer").mapData = areas[0].baseLayer
game.getObject("activeLayer").mapData = areas[0].activeLayer
game.getObject("waterLayer").mapData = areas[0].waterLayer

tempMap = sanitizeMap([
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwggwwwwwwwwwwwwwwwwwwwwwwwwwwwww",  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggggwwwwwwwwwwwwwwwwwwwwwwwwwwww",  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwggggggggwwwwwwwwwwwwwwwwwwwwwwwwww",  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwgggggggggggggwwwwwwwwwwwwwwwwwwwwwww",  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggggggggwwwwwwwwwwwwwwwwwwwwwwww",  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggggwwwwwwwwwwwwwwwwwwwwwwwww",  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwggwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"])
areas.push(new Area("island", tempMap.ground,
tempMap.water, emptyLayer.slice(), [], []));




tempMap = undefined;
loadArea("shore")

createNetwork(4, 3, "crude_source")

createNetwork(7, 2, "distiller")

createNetwork(10, 0, "gas_processor")

createNetwork(10, 4, "residue_processor")

createNetwork(14, 1, "hydrogen_source")
createNetwork(14, 3, "hydrotreater")

createNetwork(14, 5, "hydrotreater")
createNetwork(22, 2, "ship")

createNetwork(11, 13, "tank")


createNetwork(6, 13, "tank")

createNetwork(1, 13, "tank")

createNetwork(9, 11, "valve")

createNetwork(4, 11, "valve")

game.addObject("selector")
