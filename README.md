# JackalScript
<i>An ASTOUNDING resource-management game running on A FANTASTIC game engine with THOROUGH documentation</i>

[Go to GH Pages](https://jackal-42.github.io/Industry-Game/)

Areas<br><br>
name: The area's ID<br>
activeLayer: The layer with pipes & facilities<br>
baseLayer: The layer with terrain<br>
networks: The list of internal data for facilities and used pipes<br>
links: Which facilities are connected<br><br>

CodeBlock<br><br>
data: The code to be evaluated once the delay reaches 0<br>
delay: Decreases by 1 every frame and removes the object on 0<br><br>




Installation:<br>
  Requires the JackalScript Folder, a docs/assets folder, and the three files framework.js, stages.js, and main.js
  add `"<script src="JackalScript/core.js"></script>"` to the end of the body section of your HTML file
  
 
Functions and Methods:
 
 
 
```js
pointTo(obj, x, y)
```
 Rotates an object to face in the direction of a coordinate point
 
 
  obj: An object created using the `game.addObject` function<br>
  x: The x-coordinate the obj should rotate toward<br>
  y: The y-coordinate the obj should rotate toward

```js
crash(obj1, obj2)
```
Returns true if the two specified objects are touching

  obj1: The first object<br>
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

  template: The template for what type of object it should be, specified later<br>
  modifiers: Code that changes the values of the object to be unique from the template
 
 


```js
Game.addTemplate(id, data)
```
Creates a template for a type of Object

  id: The name of the template<br>
  data: The properties of the template
 
 
 
 
```js
Game.addTexture(id, src, properties)
```
Creates a Texture that will be rendered onto objects later to save processing power

  id: The name of the texture<br>
  src: The filepath to the desired texture file<br>
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

  obj1: The object that will get pushed away<br>
  obj2: The stationary object
 
 
 
 
```js
Game.pixelCollision(obj, layer)
```
Checks all the opaque pixels on a given canvas layer, and if obj is intersecing them, it pushes it away.

  obj: The object that will collide<br>
  layer: The layer to collide with

# How To Build a Framework

<h3>Step 1</h3>
Declare all the layers you will need to run your game and change the properties of each one using <code>game.addLayer(id)</code> and <code>game.getLayer(id)</code>

<h3>Step 2</h3>
Create a texture for each of the images you plan to use in the game. The reason for this is to save processing power by loading them beforehand instead of when they need to be rendered. The names can be as short as you desire. Use <code>game.addTexture(id, url)</code>

<h3>Step 3</h3>
Declare any functions that relate to Objects that will later be used in the game. Functions that are called every frame will go in the <code>main.js</code> file, and functions that are called when needed or that pertain to a speific object go in the <code>framework.js</code> file, generally speaking. Because the called functions tend to be more complicated, it seems that the framework file can get a bit bloated.

<h3>Step 4</h3>
Add templates for each object you plan to use with <code>game.addTemplate(id, data)</code>. These templates will later be called and used as references to create Objects. They can be modified as needed upon creation, so if you need two very similar objects consider grouping them under the same template and modifying them on generation.
  
<h3>Step 5</h3>
<i>main.js</i> is where you should put all of the code that does not pertain to Objects and instead is constantly being called throughout the game, every frame. Place these inside the <i>handy</i> <code>game.loop</code> function I have provided for you for them to be evaluated each frame.
  
<hr>
