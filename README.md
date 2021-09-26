# JackalScript
A FANTASTIC game engine with THOROUGH documentation

Installation:
  Requires the JackalScript Folder, an assets folder, and the three files framework.js, stages.js, and main.js
  add "<script src="JackalScript/core.js"></script>" to the end of the body section of your HTML file
  
 
Functions and Methods:
 
 
 
function pointTo(obj, x, y)
Rotates an object to face in the direction of a coordinate point
 
 obj: An object created using the game.addObject function
 x: The x-coordinate the obj should rotate toward
 y: The y-coordinate the obj should rotate toward




function crash(obj1, obj2)
Returns true if the two specified objects are touching

 obj1: The first object
 obj2: The second object
 
 
 
 
function key(id)
Returns true id the specified key is pressed

 id: The keycode OR string identifier of the desired key (as per the KeyIdTable)
  
  
  
  
function Game()
Creates an object to store all of the parameters and data for a game




Game.addLayer(id)
Creates a new Canvas element to render things on and adds it to the Game

 id: The name that is assigned to the layer
 
 
 
 
Game.addObject(template, modifiers)
Creates an Object and adds it to the Game

 template: The template for what type of object it should be, specified later
 modifiers: Code that changes the values of the object to be unique from the template
 
 


Game.addTemplate(id, data)
Creates a template for a type of Object

 id: The name of the template
 data: The properties of the template
 
 
 
 
Game.addTexture(id, src, properties)
Creates a Texture that will be rendered onto objects later to save processing power

 id: The name of the texture
 src: The filepath to the desired texture file
 properties: The apperance of the image (width, height)
 
 
 

Game.getTexture(id)
Gets a texture by name and returns the element where it is stored

 id: The name of the texture
 
 
 
 
Game.boxCollision(obj1, obj2)
Determines of obj1 is touching obj2 and if so, makes them collide and pushes it out

 obj1: The object that will get pushed away
 obj2: The stationary object
 
 
 
 
Game.pixelCollision(obj, layer)
Checks all the opaque pixels on a given canvas layer, and if obj is intersecing them, it pushes it away.

 obj: The object that will collide
 layer: The layer to collide with
