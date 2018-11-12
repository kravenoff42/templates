let canvas, divCanvas, divInput;

function setup(){
  divCanvas = select("#divCanvas");
  divInput = select("#divInput");
  canvas = createCanvas(800, 800);
  canvas.parent(divCanvas);
  noLoop();
  background(0);
}

function draw(){

}
