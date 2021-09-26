function crash(obj1,obj2){if(obj1.y<obj2.y+obj2.height&&obj1.y+obj1.height>obj2.y&&obj1.x+obj1.width>obj2.x&&obj1.x<obj2.x+obj2.width){return!0}else{return!1}}
function crashTop(obj1,obj2){if((obj1.y<=obj2.y+obj2.height)&&(obj1.y+obj1.height>=obj2.y+obj2.height)&&(obj1.x+obj1.width>obj2.x)&&(obj1.x<obj2.x+obj2.width)){return!0}else{return!1}}
function crashBottom(obj1,obj2){if((obj1.y+obj1.height>=obj2.y)&&!(obj1.y>=obj2.y)&&(obj1.x+obj1.width>obj2.x)&&(obj1.x<obj2.x+obj2.width)){return!0}else{return!1}}
function crashLeft(obj1,obj2){if((obj1.x<=obj2.x+obj2.width)&&!(obj1.x+obj1.width<=obj2.x+obj2.width)&&(obj1.y<obj2.y+obj2.height)&&(obj1.y+obj1.height>obj2.y)){return!0}else{return!1}}
function crashRight(obj1,obj2){if((obj1.x+obj1.width>=obj2.x)&&!(obj1.x>=obj2.x)&&(obj1.y<obj2.y+obj2.height)&&(obj1.y+obj1.height>obj2.y)){return!0}else{return!1}}




// function crash(obj1, obj2) {
//   if (obj1.y < obj2.y + obj2.height && obj1.y + obj1.height > obj2.y && obj1.x + obj1.width > obj2.x && obj1.x < obj1.x + obj1.width) {
//     return true;
//   }else{
//     return false;
//   }
// }

// function crashTop(obj1, obj2) {
//   if ((obj1.y <= obj2.y + obj2.height) && (obj1.y + obj1.height >= obj2.y + obj2.height) && (obj1.x + obj1.width > obj2.x) && (obj1.x < obj2.x + obj2.width)) {
//     return true;
//   }else{
//     return false;
//   }
  
// }

// function crashBottom(obj1, obj2) {
//   if ((obj1.y + obj1.height >= obj2.y) && !(obj1.y >= obj2.y) && (obj1.x + obj1.width > obj2.x) && (obj1.x < obj2.x + obj2.width)) {
//     return true;
//   }else{
//     return false;
//   }
// }

// function crashLeft(obj1, obj2) {

//   if ((obj1.x <= obj2.x + obj2.width) && !(obj1.x + obj1.width <= obj2.x + obj2.width) && (obj1.y < obj2.y + obj2.height) && (obj1.y + obj1.height > obj2.y)) {
//     return true;
//   }else{
//     return false;
//   }

  
    
// }

// function crashRight(obj1, obj2) {
//   if ((obj1.x + obj1.width >= obj2.x) && !(obj1.x >= obj2.x) && (obj1.y < obj2.y + obj2.height) && (obj1.y + obj1.height > obj2.y)) {
//     return true;
//   }else{
//     return false;
//   }
    
// }