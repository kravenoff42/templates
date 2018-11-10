class Asteroid{
  constructor(pos, r ,hit){
    if(pos){
      this.pos = pos.copy();
    } else {
      this.pos = createVector(random(width),random(height));
    }
    //if(total){
    //  this.total = total;
    //} else{
      this.total = floor(random (8, 15));
    //}
    if(r){
      this.r = r/2;
    } else {
      this.r = random(50,80);
    }
    if(hit){
      this.velocity = p5.Vector.random2D().mult(2);

    } else {
      this.velocity = p5.Vector.random2D();
    }

    this.offset = [];
    for(var j =0;j<this.total;j++){
      this.offset[j] = random(-0.2*this.r, 0.2*this.r);
    }
  }

  update(){
    this.pos.add(this.velocity);
    this.edges();
  }

  edges(){
    if (this.pos.x >= width+this.r){
      this.pos.x = 0-this.r;
    }
    if (this.pos.x < 0-this.r){
      this.pos.x = width+this.r;
    }
    if (this.pos.y >= height+this.r){
      this.pos.y = 0-this.r;
    }
    if (this.pos.y < 0-this.r){
      this.pos.y = height+this.r;
    }
  }

  render(){
    push();
    translate(this.pos.x,this.pos.y);
    noFill();
    stroke(255);
    //ellipse(0,0,this.r*2);
    beginShape();
    for(var i =0;i<this.total;i++){
      var angle = map(i, 0, this.total, 0, TWO_PI);
      var r = this.r + this.offset[i];
      var x = r * cos(angle);
      var y = r * sin(angle);

      vertex(x,y);
      //console.log(x,y)
    }
    endShape(CLOSE);

    pop();
  }

  explode(){
    var newAsteroids = [];
    var peices = floor(random(1,4));
    for (var i=0;i<peices;i++){
      newAsteroids.push(new Asteroid(this.pos, this.r, true));
    }
    return newAsteroids;
  }
}
