console.log("JackalScript Compiling...\n")

function loadScript(url, callback){

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

loadScript("JackalScript/blanket.js", function(){console.log("Blanket Loaded"); loadScript("JackalScript/math.js", function(){console.log("Math Loaded"); loadScript("JackalScript/utility.js", function(){console.log("Utility Loaded"); loadScript("JackalScript/physics.js", function(){console.log("Physics Loaded"); loadScript("JackalScript/images.js", function(){console.log("Images Loaded"); loadScript("JackalScript/audio.js", function(){console.log("Audio Loaded\n");loadScript("framework.js", function(){console.log("Framework Loaded"); loadScript("stages.js", function(){console.log("Stages Loaded"); loadScript("main.js", function(){document.getElementById("load").style.display = "none"; console.log("Setup Complete")})})})})})})})})})
//Loads all the seperate files in the JackalScript Engine in the correct order

// function loadOthers(){
//   $.getScript("JackalScript/utility.js", function() {
//     console.log("Utility Loaded");
//     $.getScript("JackalScript/physics.js", function() {
//       console.log("Physics Loaded");
//       $.getScript("JackalScript/images.js", function() {
//         console.log("Images Loaded");
//         $.getScript("JackalScript/audio.js", function() {
//           console.log("Audio Loaded");
//           init();
//         });
//       });
//     });
//   });
// }
// //Loads the files containing the user's code

// function init(){
//   $.getScript("framework.js", function() {
//     console.log("Framework Loaded")
//     $.getScript("stages.js", function() {
//       console.log("Stages Loaded")
//       $.getScript("main.js", function() {
//         console.log("Setup Complete");
//       });
//     });
//   });
// }
