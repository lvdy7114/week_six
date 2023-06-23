let round = 1;
class USSAssemblyShip {
  constructor() {
    this.hull = 20;
    this.firepower = 5;
    this.accuracy = 0.7;
  }
  attack(alienShip) {
    if (Math.random() < this.accuracy) {
      alienShip.damage(this.firepower);
      alert(`Round ${round++}: The USS Assembly ship attacks the alien ship!`);
    } else {
      alert(`Round ${round++}: The USS Assembly ship missed the target.`);
      alienShip.attack(this);
    }
  }
  damage(amount) {
    this.hull -= amount;
    if (this.hull <= 0) {
      alert(`Round ${round++}: The USS Assembly ship is destroyed. Game over.`);
      retreat();
    } else {
      alert(`Round ${round++}: The USS Assembly ship survives and strikes at an alien ship!`);
      this.attack(alienShips[0]);
    }
  }
}
class AlienShip {
  constructor(name) {
    this.hull = Math.floor(Math.random() * 4) + 3;
    this.firepower = Math.floor(Math.random() * 3) + 2;
    this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10;
    this.name = name++;
  }
  attack(ussAssemblyShip) {
    if (Math.random() < this.accuracy) {
      ussAssemblyShip.damage(this.firepower);
      alert(`Round ${round++}: The alien ship strikes back at USS Assembly ship with ${this.firepower} hits of firepower damage.`);
    } else {
      alert(`Round ${round++}: The alien ship missed a shot at the USS Assembly ship.`);
      alert(`Round ${round++}: The USS Assembly ship strikes back at the alien ship!`);
      this.attack(ussAssemblyShip);
    }
  }
  damage(amount) {
    this.hull -= amount;
    if (this.hull <= 0) {
      alert(`Round ${round++}: The USS Assembly ship destroys the alien ship.`);
      destroyAlienShip();
    }
  }
}
const ussAssemblyShip = new USSAssemblyShip();
const alienShips = [];
const totalAlienShips = 6;
let destroyedAlienShips = 0;
for (let i = 0; i < totalAlienShips; i++) {
  alienShips.push(new AlienShip(1));
}
function destroyAlienShip() {
  destroyedAlienShips++;
  alert(`Remaining Alien Ships: ${totalAlienShips - destroyedAlienShips}`);
  alert(`Destroyed Alien Ships: ${destroyedAlienShips}`);
  if (destroyedAlienShips !== totalAlienShips) {
    alert(`Aliens assessing battle outcome: Alien ship number ${alienShips[0].name} dealt with ${alienShips[0].firepower} hits of firepower damage from the USS Assembly ship. Deploying next alien ship`);
    attackOrRetreat();
  } else if (destroyAlienShips === totalAlienShips - 1) {
    retreat();
  } else if (destroyAlienShips === totalAlienShips) {
    alert("You destroyed all the alien ships. You win!"); //doesn't alert, just ends
  } else {
    gameOver();
    //return;
}
}
function attackOrRetreat() {
  const userInput = prompt("An alien ship is destroyed. Do you want to attack the next alien ship or retreat? (Type 'attack' or 'retreat')"
  );
  if(userInput === null) {
    retreat();
  } else if(userInput.toLowerCase() === "attack") {
    ussAssemblyShip.attack(alienShips[0]);
  } else if(userInput.toLowerCase() === "retreat") {
    retreat();
  } else {
    alert("Not a valid entry. Please try again.");
    retreat();
  }
}
function retreat() {
  alert(`The USS Assembly Ship retreats.  USS Assembly ship hull/hitpoints =
   ${ussAssemblyShip.hull}. Alien ship hull/hitpoints = ${alienShips[0].hull}. Press \"ok\" for next steps.`);
  const retreatUserInput = prompt("Type \"yes\" to continue playing or \"no\" to stop playing");
  if(retreatUserInput === null) {
    this.retreat();
  } else if (retreatUserInput.toLowerCase() === "yes") {
    ussAssemblyShip.attack(alienShips[0]); //game round starts again
  } else if (retreatUserInput.toLowerCase() === "no" ) {
    retreatUserInput = alert("Thanks for playing!")
    return;
  } else {
    alert("Not a valid entry. Please try again.");
    this.retreat();
  }
}

function gameOver() {
  return;
}

function gameRound() {
  alert(`Space battle begins! To win the game, the USS Assembly ship must destroy 6 alien ships.`);
  alert(`Round ${round++} The USS Assembly ship attacks the alien ship first.`);
  ussAssemblyShip.attack(alienShips[0]); //uss captain strikes first
  if(alienShips[0].hull > 0 ) {
    alert(`Round ${round++} The alien ship survives the attack.  The alien ship strikes back at USS Assembly Ship!`);
    alienShips[0].attack(ussAssemblyShip);
  } else {
    alienShips[1].attack(ussAssemblyShip);
  }
  if (ussAssemblyShip.hull <= 0) {
    console.log(`Round ${round++}: The USS Assembly ship is destroyed. Game over.`);
    gameOver();
  }
}

// Start the game
gameRound();

//This version prompts and alerts where necessary, however when player wins it doesn't alert the message
//alert("You destroyed all the alien ships. You win!"); 
//But overall it is functional