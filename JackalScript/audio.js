var audio = [
  "retrosoul",
  "clank",
  "funkybeat",
]

for(var i = 0; i < audio.length; i++){
  eval("var "+audio[i]+" = document.createElement(\'audio\');"+audio[i]+".style.display = \'none\';"+audio[i]+".src = \'docs/audio/"+audio[i]+".mp3\';");
  eval(audio[i] + ".volume = 0.5");
}
retrosoul.loop = true;
funkybeat.loop = true;
