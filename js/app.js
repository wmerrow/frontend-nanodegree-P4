// Enemies our player must avoid

var Enemy = function(x,y,z) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    //***z is speed
    this.speed = z;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
//***includes additional parameter playr to check for collision
//***note that player is a 
Enemy.prototype.update = function(playr,dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //***checks for collision
    this.checkCollision(playr);

    //***when enemies are off right of screen, reset to off left of screen
    this.x = this.x+(this.speed)*dt;
    if (this.x > 550) {
      this.x = -100;  
    };

};

//***checkCollision method - if enemy (this) overlaps with player, reset
Enemy.prototype.checkCollision = function(playr) {
    if (playr.x < this.x + 75 &&
        playr.x + 65 > this.x &&
        playr.y < this.y + 50 &&
        70 + playr.y > this.y) {
        playr.reset(); //***reset player (this is the method on Player)
        this.reset(); //***reset enemies (this is the method on Enemy)
    }
};

//***reset method - resets all three instances
Enemy.prototype.reset = function(){
        allEnemies[0].x = 0;  
        allEnemies[1].x = 0; 
        allEnemies[2].x = 0; 
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(px, py) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = px;
    this.y = py;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt){
    //***checks if player is offscreen and resets player (this) 
    //***and all three instances of Enemy
    if(this.x>500 || this.x<-10 || this.y>400 || this.y<0){
        this.reset();
        allEnemies[0].x = 0;  
        allEnemies[1].x = 0; 
        allEnemies[2].x = 0; 
    };
};

//***reset method for player
Player.prototype.reset = function(){
        this.x = 200;
        this.y = 400;  
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//***moves player according to key press
Player.prototype.handleInput = function(pressedkey){
    if(pressedkey === 'left'){this.x = this.x-101};
    if(pressedkey === 'right'){this.x = this.x+101};
    if(pressedkey === 'up'){this.y = this.y-83};
    if(pressedkey === 'down'){this.y = this.y+83};
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
//***creates three enemies
//***sets speed of enemies to a random number between 50 and 400
var allEnemies = [
    new Enemy(0,60,Math.floor(Math.random()*400)+50),
    new Enemy(0,140,Math.floor(Math.random()*400)+50),
    new Enemy(0,220,Math.floor(Math.random()*400)+50)
    ];
// Place the player object in a variable called player (use that name exactly)
var player = new Player(200,400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
