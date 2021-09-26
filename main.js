game.loop = function(){
  game.tick()
  game.render()
  requestAnimationFrame(game.loop)
}
game.loop()