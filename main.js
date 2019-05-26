// Get the UI elements
const lights = document.getElementsByClassName('light');

// Create an object contsructor
class Game {
  constructor(speed) {
    this.speed = speed;
    this.lights = lights;
    this.score = 0; // score should be 0 at start of the game
    this.interval = null;
  }

  // create a method to play the game
  play(){
    // instantiate an interval to make the game continous
    this.interval = setInterval(this.flutter, this.speed);

    // call the scrore increment method
    this.scroreIncrement();
  }

  // create method for the fluttering of the lights
  flutter() {
    let rndLight = lights[Math.floor(Math.random() * lights.length)];
    rndLight.style.backgroundColor = "red";

    setTimeout(function() {
      rndLight.style.backgroundColor = "greenyellow";
    }, 800);
  }

  // create a method to handle the scores for the game
  scroreIncrement() {
    for (let s = 0; s < this.lights.length; s++) {
      this.lights[s].addEventListener('click', () => {
        if (this.lights[s].style.backgroundColor == "red") {
          // increment score if conditions evaluate to true
          this.score++;
          console.log(this.score);
          
          // increase the speed of the fluttering lights
          this.increaseSpeed();

          // update the score in the UI
          document.querySelector('#game-score').textContent = this.score;
        } else {
          // stop the game if the conditions evaluate to false
          // this.stopGame();
        }
      });
    }
  }

  // create a method to increase the game speed
  increaseSpeed() {
    if (this.speed > 800) {
      this.speed -= 10;
      document.querySelector('#game-speed').textContent = this.speed;
      console.log(this.speed);
    }
  }

  // create a method to stop the game
  stop() {

    this.gameStats();
    clearInterval(this.interval);

    console.log("Game Stopped");

  }

  // create a method to display the game stats
  gameStats() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML  = `
      <div class="row">
        <div class="columns eight m-auto">
          
          <div class="stats overlay">
            <span class="close-overlay">X</span>
            <h3 class="stats-title">GAME OVER!</h3>
            <h5 class="stats-score">TOTAL SCORE</h5>
            <span class="overall-score">${this.score}</span>
          </div>
        </div>
      </div>
    `;

    const hook = document.getElementById('hook');
    hook.appendChild(overlay);

    // document.querySelector('.overlay').style.display = 'block';
    // document.querySelector('overall-score').textContent = this.score;
    // document.querySelector("end").style.display = "block";
  }

}

// instantiate a new game
const game = new Game(1000);

document.getElementById('start-game').addEventListener('click', () => {
  
  // start the game
  game.play();
});

document.getElementById('stop-game').addEventListener('click', () => {
  // stop the game
  game.stop();

  // show stats
  game.gameStats();
});