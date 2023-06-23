/*1.Build a game of battling alien spaceships using Javascript.
Earth has been attacked by a horde of aliens! You are the captain of the USS Assembly, 
on a mission to destroy every last alien ship.
Battle the aliens as you try to destroy them with your lasers.
There are six alien ships. The aliens' weakness is that they are too logical and attack one at a time: 
they will wait to see the outcome of a battle before deploying another alien ship.
Your strength is that you have the initiative and get to attack first. However, you do not have 
targeting lasers and can only attack the aliens in order.
After you have destroyed a ship, you have the option to make a hasty retreat.
*/
//Captain of USSAssembly
//Six alien ships, captain attacks alien ships one at a time and goes first
//don't have targeting lasers and can only attack aliens in order
//After destroying an alien ship, can retreat 
//The alien waits to see the outcome of battle before deploying another alien ship 

/*2. A game round would look like this:
Captain USS attacks the first alien ship.
If the alien ship survives, the alien ship attacks uss assembly ship.
If uss captain survives, captain attacks the alien ship again.
If the Alien ship survives, the alien ship attacks uss captain ship again ... etc.
If captain uss destroys the alien ship, captain has the option to attack the next alien ship or to retreat.
If captain uss retreats, the game is over, perhaps leaving the game open for further developments or options.
If captain uss wins the game if aliens are destroyed.
If captain uss loses the game then captain uss is destroyed. what determines if he loses? 
*/

/*3. Ship Properties - All ships must have the following properties:
hull = hitpoints. If hull < 0 or less, else - the ship is destroyed.
firepower = amount of damage done to the hull of the target with a successful hit.
accuracy is a random pick between 0 and 1 that the ship will hit its target. 
*/
let round = 1;

class AllShips {
    constructor(hull,firepower,accuracy) {
        this.hull = hull;  
        this.firepower = firepower; 
        this.accuracy = accuracy;  
    }
    retreat() {
        alert(`Captain USS retreats. USS Assembly ship hull/hitpoints = ${ussCaptain.getHull()} Alien ship hull/hitpoints = ${alienShips[0].hull} from Alien ship number ${alienShips[0].name}. Press \"ok\" to get next steps.`); 
      const retreatUserInput =  prompt("Type 'yes' to continue playing or 'no' to stop playing.");

      if (retreatUserInput === null) {
        this.retreat();
      } else if (retreatUserInput.toLowerCase() === "yes") {
        gameRound(ussCaptain, alienShips[0]);
      } else if (retreatUserInput.toLowerCase() === "no") {
        alert("Thanks for playing!");
        this.gameOver();
        return;
      } else {
        alert("Not a valid entry. Please try again.");
        this.retreat();
      }    
    }
    gameOver() {
      return;
    }
  }
   
class USSAssemblyShip extends AllShips {
    constructor(hull, firepower,accuracy) {
    super(hull,firepower,accuracy)    
    this.hull = 20;  
    this.firepower = 5;
    this.accuracy = 0.7;
    this.totalAlienShips = 6;
    this.alienShipsDestroyed = 0; 
    }
    getHull() {
        return this.hull;
    }
    getFirepower() {
        return this.firepower;
    }

    getAccuracy() {
        return this.accuracy;
    }
    attack() {
      if(Math.random() < this.accuracy) {
      //alienShip.damage(this.firepower);
      this.damage(alienShips[0].firepower);
      alert(`Alien ship number ${alienShips[0].name} was dealt with ${this.firepower} hits of firepower damage from the USS Assembly ship.`);
      AllShips.gameOver();
      //return; //testing
  } else {
      alert(`Round ${round++}. The USS Assembly ship missed the target.`);
      alert(`Round ${round++}. The alien ship strikes back at the USS Assembly ship!`);
      //this.damage(alienShips[0].firepower);
      this.attack(alienShips[0]); //added this to see if it will go.
      //alienShip.attack(this);
      }
  }  
    damage(amount) {
      this.hull -= amount;
      if(this.hull <= 0) {
          this.destroy();
      } else {
          alert(`Round: ${round++}. The USS Assembly ship survives! The alien ship strikes back at you!`);
          this.attack(alienShips[0]);  // works!
      }
  }
    
    destroy(alienShips) {
        alert(`Round ${round++}. The alien ship is destroyed.`)
        //increments the count of alien ships destroyed
        this.alienShipsDestroyed++;
        const remainingAlienShips = this.totalAlienShips - this.alienShipsDestroyed;

        alert(`Remaining Alien Ships: ${remainingAlienShips}`);
        alert(`Destroyed Alien Ships: ${this.alienShipsDestroyed}`);

        if (this.alienShipsDestroyed === this.totalAlienShips) {
            alert("You destroyed all of the alien ships. You win!");
            alert(`USS Assembly ship Stats: hull/hitpoints = ${ussCaptain.getHull()} firepower = ${ussCaptain.getFirepower()}`)
            ussCaptain.gameOver();  //here put a function if win, it exits.
        } else {
          //put here battle outcome by aliens
          alert(`Aliens assessing outcome of battle. Alien ship was dealt with ${this.firepower} hits of firepower damage from the USS Assembly ship. Deploys next alien ship.`);
            const userInput = prompt("An alien ship is destroyed. Do you want to attack the next alien ship or retreat? (Type 'attack' or 'retreat')");
            if (userInput === null) {
              ussCaptain.retreat();
            } else if (userInput.toLowerCase() === "attack") {
              gameRound(ussCaptain, alienShips);
            } else if (userInput.toLowerCase() === "retreat") {
              ussCaptain.retreat();
            } else {
              alert("Not a valid entry. Please try again.");
              ussCaptain.retreat();
            }
          }
    }
  }

class alienShip extends AllShips {
    constructor(hull, firepower,accuracy, name) {
        super(hull,firepower,accuracy,name)    
        this.hull = Math.floor(Math.random() * 4) + 3; //put a range between 3 and 6. # is picked randomly using a whole #
        this.firepower = Math.floor(Math.random() * 3) + 2;//put a range between 2 and 4. same as above 
        this.accuracy = Math.floor(Math.random() * 3) + 6 / 10; //between .6 and .8 same as above
        this.name = name;
        }
        attack(ussCaptain) {
            if(Math.random() < this.accuracy) {
                ussCaptain.damage(this.firepower);
                alert(`Round ${round++}`)
                alert(`The alien ship strikes back at USS Assembly ship with ${this.firepower} hits of firepower damage.`);
            } else {
                alert(`Round ${round++}. The alien ship missed a shot at the USS Assembly Ship.`)
                alert(`Round ${round++}.The USS Assembly ship strikes back!`);
                this.attack(ussCaptain);
            }
        }
        damage(amount) {
            this.hull -= amount;
            if(this.hull <= 0) {
                this.alienDestroy();
             } else {
                alert(`The alien ship has ${this.hull} points remaining.`);
                this.attack(ussCaptain);
            } 
        }
        alienDestroy() {
            alert(`Round ${round++}. The USS Assembly ship destroys the alien ship.`);
            ussCaptain.alienShipsDestroyed++;
            const remainingAlienShips = ussCaptain.totalAlienShips - ussCaptain.alienShipsDestroyed;
            alert(`Remaining Alien Ships: ${remainingAlienShips}`);
            alert(`Destroyed Alien Ships: ${ussCaptain.alienShipsDestroyed}`);
           
            if(ussCaptain.alienShipsDestroyed === ussCaptain.totalAlienShips) {
                alert("All alien ships are destroyed. You win!");
                ussCaptain.gameOver();
            } else {
              //put it here - alien side of battle outcome
              alert(`Aliens assessing outcome of battle. Alien ship was dealt with ${this.hull} hits to the hull from the USS Assembly ship. Deploys next alien ship.`);
                const userInput = prompt("An alien ship is destroyed. Do you want to attack the next alien ship or retreat? (Type 'attack' or 'retreat')");
                if (userInput === null) {
                  ussCaptain.retreat();
                } else if (userInput.toLowerCase() === "attack") {
                  gameRound(ussCaptain, alienShips.shift()); //this gameround runs.. removes a ship from list after destruction.
                } else if (userInput.toLowerCase() === "retreat") {
                  ussCaptain.retreat();
                } else {
                  alert("Not a valid entry. Please try again.");
                  ussCaptain.retreat();
                }
              }
        }
    }

//instantiated properties - can change their stat #'s around here. 
//Gave aliens name properties as numbers. 
const ussCaptain = new USSAssemblyShip(1, 1,.1);

const alienShips = [
    new alienShip(6,4,.8,1), new alienShip(20,4,.8,2), new alienShip(50,4,.8,3), 
    new alienShip(25,4,.8,4), new alienShip(100,10,.8,5), new alienShip(50,10,.8,6) ];


function gameRound(ussCaptain,alienShips) {
    alert("Space battle begins! To win the game, USS Captain must destroy 6 alien ships.") 
    alert(`Round ${round++}: The USS Captain attacks the first alien ship.`) 
   ussCaptain.attack(alienShips); 
      
   if(alienShips[0].hull > 0) {  //If the alien ship survives, the alien ship attacks uss assembly ship.
       alert(`Round ${round++}.  The alien ship survives, the alien ship attacks the USS assembly ship!`)
        alienShips[0].attack(ussCaptain);  
    }
    //game continues until usscaptain and aliens are alive
    while (ussCaptain.hull > 0 && alienShips[0].hull > 0) {  
        alert(`Round ${round++}. USS Assembly ship and the horde of aliens both survive.`)
        alienShips[0].attack(ussCaptain); //alien ship attacks

        if (ussCaptain.hull > 0) {
            alert(`Round ${round++}: The USS Captain attacks the alien ship!`);
            ussCaptain.attack(alienShips[0]); // USS Captain attacks alien ship
          } else {
            ussCaptain.attack(alienShips[1]);
          }
        }

    // Check the game outcome
  if (ussCaptain.hull > 0) {
    // USS Captain wins the round
    ussCaptain.destroy(alienShips[0]);
    if (ussCaptain.alienShipsDestroyed === ussCaptain.totalAlienShips) {
      alert("All alien ships are destroyed. You win!");
      alert(`USS Assembly ship Stats: hull/hitpoints = ${ussCaptain.getHull()} firepower = ${ussCaptain.getFirepower()}`)
      ussCaptain.gameOver();
    } else {
      // USS Captain has the option to attack the next alien ship or retreat
      //battle outcome
      alert(`Aliens assessing outcome of battle. Alien ship was dealt with ${this.firepower} hits of firepower damage from the USS Assembly ship. Deploys next alien ship.`);
      const userInput = prompt("An alien ship is destroyed. Do you want to attack the next alien ship or retreat? (Type 'attack' or 'retreat')");
      if (userInput === null) {
        ussCaptain.retreat();
      } else if (userInput.toLowerCase() === "attack") {
        gameRound(ussCaptain, alienShips.shift()); // Remove the first ship from the list
      } else if (userInput.toLowerCase() === "retreat") {
        ussCaptain.retreat();
      } else {
        alert("Not a valid entry. Please try again.");
        ussCaptain.retreat();
      }
    }
  } else {
    // USS Captain loses the round
    alert(`Round: ${round++}. The USS Assembly Ship is destroyed. Game over.`);
    ussCaptain.gameOver();
  }
}

gameRound(ussCaptain,alienShips);


/*This version now works smoothly.  I had created a second version because at one point I kept encountering the 
program stopping at certain parts of the program.  However, the second version when six alien ships are destroyed 
it does not alert the message that they won.  So, will be submitting this one as the final work. But, feel free 
to look at my second version if you like, it's in the second version folder. 
I went back to fix this one, and now I got it to work smoothly.  
1. Tested what happens after destroying six ships. 
2. Tested what happens if player cancels or types incorrectly in prompt. 
3. Tested what happens if player decides to retreat and types no to stop playing before destroying 6 alien ships.  
4. Tested what happens if player loses. 
5. Tested what happens if player destroyed less than 6 and decides to retreat, and types yes to continue playing. 
*/