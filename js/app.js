// --------------------Enemies our player must avoid---------------------------//
var Enemy = function(x,y,speed) {
    this.x = x; //define x coord
    this.y = y; //define y coord
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
    this.x += this.speed * dt;

    if (this.x >= 505){
        this.x = 0;
    };
    //Collison check - takes difference of positions and checks if too close //
    if ((this.x - player.x <  50 && this.y - player.y < 50) &&
        (this.x - player.x > -50 && this.y - player.y > -50)) {
      //show a modal for crash and reset player, score //
        $('#collisionModal').modal('show');
        player.reset();
        };

};



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//---------------Player-----------------------------//
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//player starting coords//
var startX = 200;
var startY = 400;

var Player = function(x,y) {
    //load player image and set position
    this.x = startX;
    this.y = startY;
    this.score = 0;
    this.sprite = 'images/char-boy.png';

    };

Player.prototype.update = function() {

  //set x axis boundaries
  if (this.x < 0) {
    this.x = 0;
  } else if (this.x > 400) {
    this.x = 400;
  }
  //set y axis boundaries
  else if (this.y > 400) {
    this.y = 400;
  }
  //reset if player reaches water
  else if (this.y < 0) {
    //show modal and add score
    $('#myModal').modal('show');
    this.scored();
  }
};

// reset function sets the player back to the start coordinates
Player.prototype.reset = function() {
  this.x = startX;
  this.y = startY;
  this.score = 0;
  document.getElementById("score").innerHTML = this.score
};

Player.prototype.scored = function() {
    this.x = startX;
    this.y = startY;
    this.score += 20;
    document.getElementById("score").innerHTML = this.score;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'up':
      this.y -= 90;
      break;

    case 'down':
      this.y += 90;
      break;

    case 'left':
      this.x -= 100;
      break;

    case 'right':
      this.x += 100;
      break;

    default:
      break;
  }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [];
    // Place the player object in a variable called player

var player = new Player ();
    for (var i = 0; i < 3; i++) {
      var enemyY = 65 + 80 * i;
      var enemyX = Math.floor(Math.random() * 30);
      var enemySpeed = 50 + Math.floor(Math.random() * 150);
      allEnemies.push(new Enemy(enemyX, enemyY, enemySpeed));
    };



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

 //----------check collisions------------//



player.handleInput(allowedKeys[e.keyCode]);

});

document.addEventListener("keydown", function(e) {
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
