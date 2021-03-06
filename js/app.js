// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  if(this.x < 505) {
    this.x += this.speed * dt;
  } else {
    this.x = 0;
    this.x += this.speed * dt;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class mainPlayer {
  constructor() {
    this.xstart = 202
    this.ystart = 83*4
    this.x = this.xstart;
    this.y = this.ystart;
    this.sprite = 'images/char-boy.png';
  }

  //render
    //draw player according to x and y
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  //update player position x and y according to input
  handleInput(key) {
    if(this.x > 0) {
      if(key === "left") {
          this.x -= 101/2;
        }
      }
    if(this.x<404) {
      if(key === "right") {
        this.x += 101/2;
      }
    }

    if(this.y>0) {
      if(key === "up") {
        this.y -= 83/2;
      }
    }
    if(this.y<83*5) {
      if(key === "down") {
        this.y += 83/2;
      }
    }
  }

  //update position, checkcollisions, reset if collision, win and add modal
  reset() {
    this.x = this.xstart;
    this.y = this.ystart;
  }

  update() {
    for (let enemy of allEnemies) {
      if(this.y === enemy.y && enemy.x + 50 > this.x && enemy.x - 50 < this.x) {
        this.reset();
      }
    }
  }
}


function toggleModalOff() {
  const modal = document.querySelector('.modal-background');
  modal.classList.add('hide');
}

function toggleModalOn() {
  const modal = document.querySelector('.modal-background');
  modal.classList.remove('hide');
}

const player = new mainPlayer();

allEnemies = [];
const bug1 = new Enemy(0,83/2,75)
const bug2 = new Enemy(0,83+83/2,100)
const bug3 = new Enemy(0,83*2+83/2, 125)
allEnemies.push(bug1, bug2, bug3);



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
