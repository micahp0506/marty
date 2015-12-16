var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
 
    game.load.image('platform', './assets/platform.png');
    game.load.image('background', './assets/BG.png');
    game.load.spritesheet('marty', './assets/marty1.png', 40, 47);
    game.load.spritesheet('candy', './assets/candy.png', 82, 98);
    game.load.tilemap('level1', './assets/newmap1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('button-start', './assets/button-start.png', 401, 143); 
    game.load.image('button-pause', './assets/button-pause.png');
    game.load.image('game-over', './assets/gameover2.png'); 
    game.load.image('pfm', './assets/PFM.png');

}

var map;
var layer1;
var ground;
var player;
var cursors;
var platforms;
var background;
var fontStyle;
var spawnCandyTimer;
var healthText;
var health = 10;
var candyGroup;
var scoreText;
var score = 0;
var candy;
var nextCandySpawn = 0;
var timeIncrement = 0;
var hit;
var paused;
var fallRate = 1000;
var pfmGroup;
var spawnPFMTimer;
var pfmFallRate = 10000;

function create() {

    // Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //  A simple background for our game
    background = game.add.sprite(0, 0, 'background');
    // Creating cursor movement
    cursors = game.input.keyboard.createCursorKeys();
    // Setting font style
    game.fontStyle = { font: "40px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
    // initialize the spawn timer
    game.spawnCandyTimer = 0;
    // initialize the PFM timer
    game.spawnPFMTimer = 0;
    // initialize the score text with 0
    scoreText = game.add.text(120, 20, "0", game.fontStyle);
    game.add.text(0, 20, "Score:  ", game.fontStyle);
    // initialize the health text with 10
    healthText = game.add.text(750, 20, "10", game.fontStyle);
    game.add.text(615, 20, "Health:", game.fontStyle);
    // create new group for candy
    game.candyGroup = game.add.group();
    // spawn first candy
    // spawnCandy();

    // Creating map

     //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.physicsGroup();
    // Enable physics for any object that is created in this group
    platforms.enableBody = true;
    // Create the ground.
    ground = platforms.create(0, game.world.height - 40, 'platform');
    //  This stops ground from falling away when you jump on it
    ground.body.immovable = true;
    // Scales the ground
    ground.scale.setTo(2, 2);
    

    // Creating player
    player = game.add.sprite(32, game.world.height - 150, 'marty');
    //  Enable physics on the player
    game.physics.arcade.enable(player);
    //  Player physics properties. Giving Marty a slight bounce.
    player.body.bounce.y = 0.0;
    player.body.gravity.y = 0;
    player.body.collideWorldBounds = true;

    // Creating candy
    candy = game.add.sprite('candy');
    // Creating candy group
    candyGroup = game.add.group();
    // Enabling body for collisions
    candyGroup.enableBody = true;
    // Giving group physics
    candyGroup.physicsBodyType = Phaser.Physics.ARCADE;
    // Physics for candy
    game.physics.arcade.enable(candy);
    // Creating 1000 candy
    candyGroup.createMultiple(1000, 'candy');
    candyGroup.setAll('checkWorldBounds', true);
    // candyGroup.setAll('outOfBoundsKill', true);

    // Creating pfm
    pfm = game.add.sprite('pfm')
    // Creating candy group
    pfmGroup = game.add.group();
    // Enabling body for collisions
    pfmGroup.enableBody = true;
    // Physics for candy
    game.physics.arcade.enable(pfm);
    // Creating 1000 candy
    candyGroup.createMultiple(1000, 'pfm');

    // add pause button
    game.add.button(650, 500, 'button-pause', managePause, this);



}

function managePause() {
     // pause the game
    game.paused = true;
    // add proper informational text
    var pausedText = this.add.text(170, 250, "Game paused.\nTap anywhere to continue.", game.fontStyle);         // set event listener for the user's click/tap the screen
    game.input.onDown.add(function(){
        // remove the pause text
        pausedText.destroy();
        // unpause the game
        game.paused = false;
    }, this);
}

function youDead() {
    // Stopping game
    game.paused = true;
    // Adding game over to screen
    game.add.sprite(0, 150, 'game-over');
}   

function addHealth() {
    // Killing pfm
    pfm.kill();
    // increase player's health
    health += 1;
    // update health text
    healthText.setText(health);
}
function update() {
    // Collision between player ground
    game.physics.arcade.collide(player, ground);
    // Collision between player and candy
    game.physics.arcade.collide(player, candyGroup, clickCandy, null, this);
    // Collisiin between candy and ground
    game.physics.arcade.overlap(ground, candyGroup, removeCandy, null, this);
    // Collisiin between player and pfm
    game.physics.arcade.overlap(player, pfmGroup, addHealth, null, this);
    // Checking health of player
    if (health === 0){
        youDead();
        // alert("You went and got all dead!!")
    }
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    // Moving player around screen
    if (cursors.left.isDown)
    {
        //  Move left
        player.body.velocity.x = -500;
    }
    else if (cursors.right.isDown)
    {
        //  Move right
        player.body.velocity.x = 500;
    }
    else if (cursors.up.isDown)
    {
        //  Move up
        player.body.velocity.y = -500;
    }
    else if (cursors.down.isDown)
    {
        //  Move down
        player.body.velocity.y = 500;
    }
    else if (cursors.down.isDown && cursors.left.isDown)
    {
        // Down and left
        player.body.velocity.x = -250;
        player.body.velocity.y = 250;
    }
    else if (cursors.down.isDown && cursors.right.isDown)
    {
        // Down and left
        player.body.velocity.x = 250;
        player.body.velocity.y = 250;
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }


    // Changing how quickly cand falls depending on score
    if (score === 0) {
        fallRate  = 1000;
        // console.log(spawnCandyTimer);
    }
    if (score === 5) {
        fallRate = 800;
        // console.log(spawnCandyTimer);
    }
    if (score === 10) {
        fallRate = 700;
        // console.log(spawnCandyTimer);
    }
    if (score === 15) {
        fallRate = 650;
        // console.log(spawnCandyTimer);
    }     
    if (score === 20) {
        fallRate = 600;
        // console.log(spawnCandyTimer);
    }
    if (score === 25) {
        fallRate = 550;
        // console.log(spawnCandyTimer);
    }
    if (score === 30) {
        fallRate = 500;
        // console.log(spawnCandyTimer);
    }
    if (score === 35) {
        fallRate = 450;
        // console.log(spawnCandyTimer);
    }

    // Calls the candFall() at the correct time, fallRate set at 1000 by default
    game.spawnCandyTimer += game.time.elapsed;
    console.log("candy", game.spawnCandyTimer);
    // if spawn timer reach one second (1000 miliseconds)
    if(game.spawnCandyTimer > fallRate) {
        // reset timer
        game.spawnCandyTimer = 0;
        // spawn new candy
        candyFall();
    }

    game.spawnPFMTimer += game.time.elapsed;
    console.log("PFM", game.spawnPFMTimer);
    // if spawn timer reach 30 seconds (30000 miliseconds)
    if (game.spawnPFMTimer > 10000) {
        // reset timer
        game.spawnPFMTimer = 0;
        // spawn new pfm
        pfmFall();
    }

} // End of update



function candyFall () {
    console.log("candyFall in");
    // calculate drop position (from 0 to game width) on the x axis
    var dropPos = Math.floor(Math.random()*600);
    // define the offset for every candy
    var dropOffset = [-27,-36,-36,-38,-48];
    // randomize candy type
    var candyType = Math.floor(Math.random()*5);
    // game.add.sprite(dropPos, dropOffset[candyType], 'candy');
    candy = candyGroup.create(dropPos, dropOffset[candyType], 'candy');
    // add new animation frame
    candy.animations.add('anim', [candyType], 10, true);
    // play the newly created animation
    candy.animations.play('anim');
    candy.body.gravity.y = 300;
    candy.body.collideWorldBounds = false;
    candy.anchor.setTo = (0.5, 0.5);
    candy.checkWorldBounds = true;
    candy.outOfBoundsKill = true;
}

function pfmFall () {
    console.log("pfm in");
    // calculate drop position (from 0 to game width) on the x axis
    var dropPos = Math.floor(Math.random()*600);

    pfm = pfmGroup.create(dropPos, null, 'pfm')

    pfm.body.gravity.y = 300;
}

function clickCandy(thing, candy){
    // Killing candy
    candy.kill();
    // Changing hit to true
    hit = true;
    console.log("clickCandy", hit);
    // add points to the score
    score += 1;
    // update score text
    scoreText.setText(score);
}

if (hit = false){
    console.log(hit);
    health -= 1;
}



function removeCandy(thing, candy){
    // Killing candy
    candy.kill();
    // decrease player's health
    health -= 1;
    // update health text
    healthText.setText(health);
}

// function render() {
//     game.debug.body(player);
//     game.debug.body(candy);
// }



