class Layer {
  constructor(p) {
    // this.p = p;
    this.corners = p.floor(p.random(3,13));
    this.radius = p.random(5,p.width/4);
    this.sym = p.random([3,4,6,8,12]);
    this.orbitRadius = p.random(p.width/3);
  }
  show(p){
    p.push();
      for(let j = 1;j<=this.sym+1;j++){
        p.push();
          let orbAngle =p.map(j, 1, this.sym+1, 0, p.TWO_PI);
          let posX = this.orbitRadius * p.cos(orbAngle);
          let posY = this.orbitRadius * p.sin(orbAngle);
          this.drawShape(posX,posY,orbAngle,p);
        p.pop();
      }
    p.pop();

  }
  drawShape(x,y,orbAngle,p){

      p.translate(x,y);

      p.beginShape();
      for(let i = 1;i<=this.corners+1;i++){
        let angle = orbAngle + p.map(i, 1, this.corners+1, 0, p.TWO_PI);
        let x = this.radius * p.cos(angle);
        let y = this.radius * p.sin(angle);
        p.vertex(x,y);
      }
      p.endShape(p.CLOSE);

  }
  isLarge(p){
    if(this.radius+this.orbitRadius>p.width*0.42){
      return true;
    }else{
      return false;
    }
  }
  isMedium(p){
    if(this.radius+this.orbitRadius>p.width*0.35){
      return true;
    }else{
      return false;
    }
  }
}
