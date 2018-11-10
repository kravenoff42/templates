var ship;
var asteroids = [];
var density = 5;
var score = 0;
var canvas;
var divCanvas;

function setup(){
  divCanvas = select("#canvas");
  canvas = createCanvas(600, 600);
  canvas.parent(divCanvas);
  angleMode();
  ship = new Ship();
  for(var i=0;i<density;i++){
    asteroids.push(new Asteroid());
  }
}

function draw(){
  background(0);
  updateScore();

  //console.log(ship.lasers.length);
  asteroids.forEach(function(asteroid){
    asteroid.render();
    asteroid.update();
  });
  for(var j = ship.lasers.length-1; j>=0;j--){
    ship.lasers[j].render();
    ship.lasers[j].update();
    if(ship.lasers[j].edges(ship.lasers[j]))
      {ship.lasers.splice(j,1);}
     else {
      for(var i =asteroids.length-1; i >= 0  ; i--){
        if (ship.lasers[j].hits(asteroids[i])){
          if(asteroids[i].r >10){
            var newAsteroids = asteroids[i].explode();
            asteroids = asteroids.concat(newAsteroids);
            if(floor(asteroids[i].r)>50){
              score += 20;
            }
            else if (floor(asteroids[i].r)<=50 && floor(asteroids[i].r)>10){
              score += 50;
            }
          }else{
            score += 100;
          }

          asteroids.splice(i,1);
          ship.lasers.splice(j,1);
          break;
        }
      }
    }
}

  ship.update();
}

function keyPressed(){
  if(key == ' '){
    ship.fire();
  }
  if (keyCode == 39){//right arrow39
    ship.setRotation(0.1);
  }
   if (keyCode == 37){//left arrow37
    ship.setRotation(-0.1);
  }
  if (keyCode == 38){//up arrow38
    ship.boosting(true);
  }
}

function keyReleased(){
  ship.setRotation(0);
  ship.boosting(false);
}

function updateScore(){
  var span = select('#score');
  span.html(score);
  //console.log(score);
}
