var audio = [
  
]

for(var i = 0; i < audio.length; i++){
  eval("var "+audio[i]+" = document.createElement(\'audio\');"+audio[i]+".style.display = \'none\';"+audio[i]+".src = \'assets/"+audio[i]+".mp3\';")
  eval(audio[i] + ".volume = 0.5")
}