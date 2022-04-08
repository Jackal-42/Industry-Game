String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}



var keys;
var zoom = 1;

//Adds listeners to detect when keys are pressed and depressed :( and puts the results in an array indentified by keycode

window.addEventListener('keydown', function (e) {
  if(e.keyCode == 9){e.preventDefault()}
  keys = (keys || []);
  keys[e.keyCode] = true;
})
window.addEventListener('keyup', function (e) {
  keys[e.keyCode] = false;
})

//Tests if a key is pressed on any given frame and can accept either a keycode or any ID contained in the keyIdTable

function key(id){
  try{return (keys && keys[id]) || (keys && keys[eval("keyIdTable."+id)])}catch{return false}
}

function Game(id){

  //Creates a div element that will contain all the canvas elements that are the layers of the game

  this.test = 'e'
  this.window = document.createElement("div")
  this.window.id = id
  this.mouseX = 0;
  this.mouseY = 0;
  this.mouseDown = false;
  document.body.appendChild(this.window)
  this.window.addEventListener('mousemove', function(e){
    eval(this.id).mouseX = ((e.clientX - this.offsetLeft)*(window.devicePixelRatio/1.5))/zoom
    eval(this.id).mouseY = ((e.clientY - this.offsetTop)*(window.devicePixelRatio/1.5))/zoom
    // console.log(eval(this.id).mouseX + " , " + eval(this.id).mouseY)
  })
  this.window.addEventListener('mousedown', function(e){
    eval(this.id).mouseDown = true
  })
  // this.window.addEventListener('mouseout', function(e){eval(this.id).mouseDown = false})
  this.window.addEventListener('mouseup', function(e){
    eval(this.id).mouseDown = false
  })
  this.window.style = "position: absolute; background-color: lightgray; width: 100%; height: 100%; image-rendering: pixelated; left: 0px; top: 0px;"

  //Allows the user to create layers which are stored in game.layers and each is a seperate canvas element

  this.layers = [];
  this.addLayer = function(id){
    newLayer = new Layer(id)
    this.layers.push(newLayer)
    this.window.appendChild(newLayer.canvas)
  }

  function Layer(id){
    this.id = id
    this.renderingProperties = "";
    this.clearFrames = true;
    this.hertz = 60;
    this.renderDelay = 0;
    this.canvas = document.createElement("canvas")
    this.canvas.width = 512
    this.canvas.height = 256
    this.canvas.style = "position:absolute; left: 0%; right: 0%; top:0%; bottom: 0%; width: 100%; height: 100%;"
    this.context = this.canvas.getContext("2d");
    this.clear = function(){
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
  }

  //This is not really needed but it makes me happy

  this.loop = function(){}

  this.objects = [];
  this.templates = [];

  //Creates an Object based on a Template and adds it to the game.objects array

  this.addObject = function(template, modifiers){
    for(var i=0,l=this.templates.length; i<l; i++){
      if(this.templates[i].id == template){
        temp = this.templates[i].data;
        break;
      }
    }
    newObject = new Component(this.templates[i].id, temp, modifiers)
    this.objects.push(newObject)
  }

  //Because I can't use this.Object

  function Component(type, template, modifiers){
    for(var i=0, l=template.length; i < l; i++){
      this.type = type
      eval("this."+template[i][0]+" = template[i][1];")
    }
    this.role = "#default"

    //modifiers can make specific objects vary from the template without devoting additional lines of code to setting each one up

    if (!(modifiers === undefined)){
      eval(modifiers)
    }
  }

  //The templates on which objects are based

  this.addTemplate = function(id, data){
    newTemplate = new Template(id, data)
    this.templates.push(newTemplate)
  }

  function Template(id, data){
    this.id = id
    this.data = data
  }

  //Stores pointers to images in Texture objects to be referenced later by the rendering engine

  this.textures = [];

  this.addTexture = function(id, src, properties){
    if(properties === undefined){
      properties = []
    }
    var img = document.createElement("img")
    img.style.display = "none"
    img.src = src
    img.alt = ""
    for(var i = 0, l = properties.length; i < l; i++){
      eval("img."+propeties[i][0]+" = properties[i][1]")
    }
    this.textures.push([id, img])
  }

  this.getTexture = function(id){
    for(var i = 0, l = this.textures.length; i < l; i++){
      if(this.textures[i][0] == id){
        return this.textures[i][1]
        break;
      }
    }
  }
  this.getObject = function(id){
    for(var i = 0, l = this.objects.length; i < l; i++){
      if(this.objects[i].id == id){
        return this.objects[i]
        break;
      }
    }
  }
  this.getLayer = function(id){
    for(var i = 0, l = this.layers.length; i < l; i++){
      if(this.layers[i].id == id){
        return this.layers[i]
      }
    }
  }
  this.getRole = function(id, index){
    for(var i = 0, l = this.templates.length; i < l; i++){
      if(this.templates[i].id == id){
        for(var k = 0, ll = this.templates[i].data.length; k < ll; k++){
          if(this.templates[i].data[k][0] == "role"){
            this.templates[i].data[k][1](index)
          }
        }
      }
    }
  }

  //Evaluates the role property of every item in the game.objects array, unless it does not have a role property

  this.tick = function(){
    for(var i = 0, l = this.objects.length; i < l; i++){
      var self = this.objects[i]
      if(!(this.objects[i].role === undefined)){
        if(this.objects[i].role == "#default"){
          try{this.getRole(this.objects[i].type, i)}catch(err){throw new Error(err)}
        }else{
          this.objects[i].role(i)
        }
      }
    }
  }

  this.render = function(){

    //Sorts the this.objects list by z-index order ascending to prepare for rendering.

    var indexedObjects = this.objects.sort((a, b) => {
      return a.zindex - b.zindex;
    });

    for(var i = 0, l = indexedObjects.length; i < l; i++){
      if(!(indexedObjects[i].texture === undefined)){

        //Detects if the selected Object has the layer property, and if so changes the canvas context to reference that layer

        if(!(indexedObjects[i].layer === undefined)){
          for(var j = 0, m = this.layers.length; j < m; j++){
            if(this.layers[j].id == indexedObjects[i].layer){
              ctx = this.layers[j].context
              ctx.save()
              eval(this.layers[j].renderingProperties)
            }
          }
        }else{
          ctx = this.layers[0].context;
        }


        var height = 0;
        var width = 0;
        var offsetX = 0;
        var offsetY = 0;
        if(!(indexedObjects[i].spriteHeight === undefined)){
          height = indexedObjects[i].spriteHeight
          width = indexedObjects[i].spriteWidth
        }else{
          height = indexedObjects[i].height
          width = indexedObjects[i].width
        }
        if(!(indexedObjects[i].spriteOffsetX === undefined)){
          offsetX = indexedObjects[i].spriteOffsetX
          offsetY = indexedObjects[i].spriteOffsetY
        }

        // Controls transparency

        if(!(indexedObjects[i].alpha === undefined)){
          ctx.globalAlpha = indexedObjects[i].alpha
        }else{ctx.globalAlpha = 1}

        // References the image stored in the Texture of the selected Object, and renders it.

        ctx.translate(indexedObjects[i].x + indexedObjects[i].width/2, indexedObjects[i].y + indexedObjects[i].height/2)
        ctx.rotate(indexedObjects[i].rotation)


        ctx.drawImage(this.getTexture(indexedObjects[i].texture), 0 - width/2, 0 - height/2, width, height)

        ctx.restore();

      }
    }
  }

  this.boxCollision = function(obj1, obj2){
    for(var i = 0, l = this.objects.length; i < l; i++){
      if(this.objects[i].type == obj2 && obj1 != this.objects[i]){
        if(obj1.y + obj1.height < this.objects[i].y + (this.objects[i].height * 0.2)){
          if(crashBottom(obj1, this.objects[i])){
            obj1.momentumY = 0;
            obj1.y = this.objects[i].y - obj1.height
          }
        }else if(obj1.y > this.objects[i].y + this.objects[i].height * 0.8){
          if(crashTop(obj1, this.objects[i])){
            obj1.y = this.objects[i].y + this.objects[i].height
          }
        }else{
          if(crashLeft(obj1, this.objects[i])){
            obj1.momentumX = 0;
            obj1.x = this.objects[i].x + this.objects[i].width
          }
          if(crashRight(obj1, this.objects[i])){
            obj1.momentumX = 0;
            obj1.x = this.objects[i].x - obj1.width
          }
        }
      }
    }
  }

  this.pixelCollision = function(obj, layer){

    var upCrashAmount = 0;
    var downCrashAmount = 0;
    var leftCrashAmount = 0;
    var rightCrashAmount = 0;
    for(var j = 0, m = this.layers.length; j < m; j++){
      if(this.layers[j].id == layer){
        ctx = this.layers[j].context
      }
    }
    while(true){
      var touchingGround = false;

      if(ctx.getImageData(obj.x, obj.y + obj.height, obj.width, 1).data.some(checkForGround)){
        if(obj.momentumY > 0){
          obj.momentumY = 0;
        }
        obj.y -= 1
        touchingGround = true;
        downCrashAmount += 1
        if(downCrashAmount <= 3){
          continue;
        }
      }
      if(ctx.getImageData(obj.x, obj.y, obj.width, 1).data.some(checkForGround)){
        obj.y += 1
        touchingGround = true;
        upCrashAmount += 1
      }
      if(ctx.getImageData(obj.x, obj.y, 1, obj.height).data.some(checkForGround)){
        obj.x += 1
        touchingGround = true;
        leftCrashAmount += 1
      }
      if(ctx.getImageData(obj.x + obj.width, obj.y, 1, obj.height).data.some(checkForGround)){
        obj.x -= 1
        touchingGround = true;
        rightCrashAmount += 1
      }


      if(downCrashAmount == 1 && rightCrashAmount == 1){
        obj.y -= 1
      }
      if(downCrashAmount == 1 && leftCrashAmount == 1){
        obj.y -= 1
      }
      if(leftCrashAmount >= 20 || rightCrashAmount >= 20 || downCrashAmount >= 20 || leftCrashAmount >= 20){
        break;
      }
      if(touchingGround){
        continue;
      }

      break;
    }
    if(downCrashAmount >= 1){
      return true;
    }else{
      return false;
    }
  }
}

//The great and powerful keyIdTable! Makes the code slightly more readable and saves me the trouble of going to keycode.info every singe time I wanna do a thing

var keyIdTable = {
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  uparrow: 38,
  downarrow: 40,
  leftarrow: 37,
  rightarrow: 39,
  up_arrow: 38,
  down_arrow: 40,
  left_arrow: 37,
  right_arrow: 39,
  space: 32,
  spacebar: 32,
  w: 87,
  a: 65,
  s: 83,
  d: 68,
  z: 90,
  x: 88,
  c: 67,
  q: 81,
  e: 69,
}
