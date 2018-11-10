class Laser{

  constructor(pos, heading){
  this.pos = createVector(pos.x,pos.y);
  this.velocity = p5.Vector.fromAngle(heading).mult(5);
  }
  render(){
    push();
    stroke(255);
    strokeWeight(4);
    point(this.pos.x, this.pos.y)

    pop();
  }
  
  update(){
    this.pos.add(this.velocity);
  }

  hits(asteroid){
    var d = dist(this.pos.x,this.pos.y,asteroid.pos.x,asteroid.pos.y)
    if(d<asteroid.r){
      return true;
    } else {
      return false;
    }
  }

  edges(laser){
    if(laser.pos.x > width+200 ||
      laser.pos.x < -200 ||
      laser.pos.y > height+200 ||
      laser.pos.y < -200 )
    {
      return true;
    }
    else{
      return false;
    }
  }
}
