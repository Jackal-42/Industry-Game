var images = [
  "test1",
  "test2"
]



for(var i = 0; i < images.length; i++){
  eval("var "+images[i]+" = document.createElement(\'img\');"+images[i]+".style.display = \'none;\';"+images[i]+".src = \'assets/"+images[i]+".png\';"+images[i]+".alt = \'alt text\'")
}