function checkForGround(integer){
  return integer != 0;
}

function pointTo(obj, x, y){
  return Math.atan2(y-obj.y, x-obj.x);
}

