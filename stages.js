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
tempMap.water, emptyLayer.slice(), [], [], []));




tempMap = undefined;
loadArea("shore")

createNetwork(37, 8, "ship")


