/*
var game = new Game();

game.addLayer("solid")
game.addLayer("main")

game.addTexture("player", "/assets/test1.png")
game.addTexture("ground", "/assets/rolling-hills.png")
game.addTemplate("player", [
  ["x", 200],
  ["y", 0],
  ["momentumX", 0],
  ["momentumY", 0],
  ["width", 40],
  ["height", 80],
  ["spriteWidth", 80],
  ["spriteHeight", 80],
  ["spriteOffsetX", 0],
  ["spriteOffsetY", 4],
  ["rotation", 0],
  ["role", `
    
    if(key("down")){
      this.objects[i].y += 2
    }
    if(key("left")){
      this.objects[i].x -= 2
    }
    if(key("right")){
      this.objects[i].x += 2
    }
    this.objects[i].momentumY += 0.2
    this.objects[i].momentumY *= 0.98
    game.boxCollision(this.objects[i], "player")
    if(game.pixelCollision(this.objects[i], "solid")){
      if(key("up")){
        this.objects[i].momentumY -= 8
      }
    }
    
    this.objects[i].y += this.objects[i].momentumY
  `],
  ["texture", "player"],
  ["layer", "main"],
  ["zindex", 1],
  ["alpha", 1],
]);
game.addTemplate("ground", [
  ["x", 0],
  ["y", 0],
  ["momentumX", 0],
  ["momentumY", 0],
  ["width", 1000],
  ["height", 500],
  ["texture", "ground"],
  ["layer", "solid"],
  ["zindex", 1],
  ["alpha", 1],
  ["rotation", 0],
]);
game.addObject("player")
game.addObject("player", "this.role = \`"+`
  if(key("s")){
    this.objects[i].y += 2
  }
  if(key("a")){
    this.objects[i].x -= 2
  }
  if(key("d")){
    this.objects[i].x += 2
  }
  this.objects[i].momentumY += 0.2
  this.objects[i].momentumY *= 0.98
  this.objects[i].y += this.objects[i].momentumY
  if(game.pixelCollision(this.objects[i], "solid")){
    if(key("w")){
      this.objects[i].momentumY -= 8
    }
  }
` + "\`")
game.addObject("ground")

//this.objects[i].rotation = pointTo(this.objects[i], 0,0)
*/