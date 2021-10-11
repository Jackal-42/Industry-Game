# JackalScript
<i>A FANTASTIC game engine with THOROUGH documentation</i>

Installation:
  Requires the JackalScript Folder, an assets folder, and the three files framework.js, stages.js, and main.js
  add `"<script src="JackalScript/core.js"></script>"` to the end of the body section of your HTML file
  
 
Functions and Methods:
 
 
 
```js
pointTo(obj, x, y)
```
 Rotates an object to face in the direction of a coordinate point
 
 
  obj: An object created using the `game.addObject` function
  x: The x-coordinate the obj should rotate toward
  y: The y-coordinate the obj should rotate toward

```js
crash(obj1, obj2)
```
Returns true if the two specified objects are touching

  obj1: The first object
  obj2: The second object
 
 
 
```js
key(id)
```
Returns true id the specified key is pressed

  id: The keycode OR string identifier of the desired key (as per the KeyIdTable)
  
  
  
  
```js
Game()
```
Creates an object to store all of the parameters and data for a game




```js
Game.addLayer(id)
```
Creates a new Canvas element to render things on and adds it to the Game

  id: The name that is assigned to the layer
 
 
 
 
```js
Game.addObject(template, modifiers)
```
Creates an Object and adds it to the Game

  template: The template for what type of object it should be, specified later
  modifiers: Code that changes the values of the object to be unique from the template
 
 


```js
Game.addTemplate(id, data)
```
Creates a template for a type of Object

  id: The name of the template
  data: The properties of the template
 
 
 
 
```js
Game.addTexture(id, src, properties)
```
Creates a Texture that will be rendered onto objects later to save processing power

  id: The name of the texture
  src: The filepath to the desired texture file
  properties: The apperance of the image (width, height)
 
 
 

```js
Game.getTexture(id)
```
Gets a texture by name and returns the element where it is stored

  id: The name of the texture
 
 
 
 
```js
Game.boxCollision(obj1, obj2)
```
Determines of obj1 is touching obj2 and if so, makes them collide and pushes it out

  obj1: The object that will get pushed away
  obj2: The stationary object
 
 
 
 
```js
Game.pixelCollision(obj, layer)
```
Checks all the opaque pixels on a given canvas layer, and if obj is intersecing them, it pushes it away.

  obj: The object that will collide
  layer: The layer to collide with

# How To Build a Framework
<i>Step 0: Learn Javascript, ROBERT</i>

<h3>Step 1</h3>
Declare all the layers you will need to run your game and change the properties of each one using <code>game.addLayer(id)</code> and <code>game.getLayer(id)</code>

<h3>Step 2</h3>
Create a texture for each of the images you plan to use in the game. The reason for this is to save processing power by loading them beforehand instead of when they need to be rendered. The names can be as short as you desire. Use <code>game.addTexture(id, url)</code>

<h3>Step 3</h3>
Declare any functions that relate to Objects that will later be used in the game. Functions that are not tied to any one object will go in the <i>main.js</i> file. Really, a function can go anywhere and I slapped them wherever I was typing at the time good luck ._.

<h3>Steppe Foure</h3>
Add templates for each object you plan to use with <code>game.addTemplate(id, data)</code>. These templates will later be called and used as references to create Objects. They can be modified as needed upon creation, so if you need two very similar objects consider grouping them under the same template and modifying them on generation.
  
<h3>The Fifthe Of The Steppes</h3>
<i>main.js</i> is where you should put all of the code that does not pertain to Objects and instead is constantly being called throughout the game, every frame. Place these inside the <i>handy</i> <code>game.loop</code> function I have provided for you for them to be evaluated each frame.
  
<hr>
  
In regards to the actual code, yes, it is a bit messy. I will clean it up once I have finished the pipe connectivity workaround. It's really not as bad as you think though.
  
<i>Bestesteth Of The Wishese,<br>
  Sir Jackal42</i>
