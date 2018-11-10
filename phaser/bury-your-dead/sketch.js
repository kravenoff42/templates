var game = new Phaser.Game(640, 640, Phaser.AUTO, "canvas", { preload: preload, create: create, update: update });
var score = 0;
var scoreText;

function preload() {
  game.load.image('hole', 'assets/hole.png');
  game.load.image('ground', 'assets/ground.png');
  game.load.image('fence', 'assets/fence.png');
  game.load.image('fenceL', 'assets/fenceL.png');
  game.load.image('fenceR', 'assets/fenceR.png');
  game.load.image('fenceLR', 'assets/fenceLR.png');
  game.load.image('tombstone', 'assets/tombstone.png');
  game.load.image('shovel', 'assets/shovel.png');
  game.load.image('diggerD', 'assets/diggerD.png');
  game.load.image('zombieD', 'assets/zombieD.png');
  // game.load.spritesheet('tombstone', 'assets/dude.png', 32, 48);
}

function create() {
  //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'ground');
   
    player = game.add.sprite(64, 64, 'diggerD');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.collideWorldBounds = true;

    player.body.setSize(64, 32, 0, 64);
    //  Our two animations, walking left and right.
    // player.animations.add('left', [0, 1, 2, 3], 10, true);
    // player.animations.add('right', [5, 6, 7, 8], 10, true);
    //  The obsticles group contains the ground and the 2 fences we can jump on
    obsticles = game.add.group();

    //  We will enable physics for any object that is created in this group
    obsticles.enableBody = true;

    let fencePlacement = [
      ['r','lr','l','r','lr','lr','lr','lr','lr','l'],
      ['f','x','x','x','x','x','x','x','x','f'],
      ['f','x','x','x','x','x','x','x','x','f'],
      ['f','x','x','x','x','x','x','x','x','f'],
      ['f','x','l','x','x','x','lr','x','x','f'],
      ['f','x','x','x','x','x','x','x','x','f'],
      ['f','x','x','x','x','x','x','x','x','f'],
      ['f','x','f','x','x','r','x','x','x','f'],
      ['f','x','x','x','x','x','x','x','x','f'],
      ['r','lr','lr','lr','lr','l','x','r','lr','l'],
      ];
      let fence;
      for(let i = 0, len = fencePlacement.length; i<len; i++){
        for(let j = 0, lenI = fencePlacement[i].length; j<lenI; j++){
        
          switch(fencePlacement[j][i]){
            case 'x':
              break;
            case 'f':
              fence = obsticles.create(i*64, (j*64)-32, 'fence');
              fence.body.immovable = true;
              fence.body.setSize(32, 32, 16, 64);
              break;
            case 'lr':
              fence = obsticles.create(i*64, (j*64)-32, 'fenceLR');
              fence.body.immovable = true;
              fence.body.setSize(64, 32, 0, 64);
              break;
            case 'l':
              fence = obsticles.create(i*64, (j*64)-32, 'fenceL');
              fence.body.immovable = true;
              fence.body.setSize(32, 32, 0, 64);
              break;
            case 'r':
              fence = obsticles.create(i*64, (j*64)-32, 'fenceR');
              fence.body.immovable = true;
              fence.body.setSize(32, 32, 32, 64);
              break;
          }
        }      
      }
    cursors = game.input.keyboard.createCursorKeys();
    // cursors.keys = { 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D };
    shovels = game.add.group();

    shovels.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 5; i++){
        //  Create a shovel inside of the 'shovels' group
        var shovel = shovels.create((i * 64)+64, 128, 'shovel');
        shovel.body.setSize(64, 64, 0, 64);

    }
      scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '16px', fill: '#fff' });

}

function update() {
  //  Collide the player and the fence with the obsticles
    var hitObsticle = game.physics.arcade.collide(player, obsticles);
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -128;

        // player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 128;

        // player.animations.play('right');
    }
    else if (cursors.up.isDown)
    {
        //  Move to the right
        player.body.velocity.y = -128;

        // player.animations.play('right');
    }
    else if (cursors.down.isDown)
    {
        //  Move to the right
        player.body.velocity.y = 128;

        // player.animations.play('right');
    }
    else
    {
        //  Stand still
        // player.animations.stop();

        // player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitObsticle)
    {
        player.body.velocity.y = -320;
    }
    // game.physics.arcade.collide(shovels, obsticles);
    game.physics.arcade.overlap(player, shovels, collectShovel, null, this);
    group.sort('y', Phaser.Group.SORT_ASCENDING);
}

function collectShovel (player, shovel) {

    // Removes the shovel from the screen
    shovel.kill();
    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;
}