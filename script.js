//DOM elements
const p1Card = document.querySelector("#p1-card")
const p2Card = document.querySelector("#p2-card")
const p1Image = document.querySelector("#p1-image")
const p2Image = document.querySelector("#p2-image")
const currentAttack = document.querySelector("#current-attack") 
const combatLog = document.querySelector("#combat-log")
const attackBtn = document.querySelector("#attack")
const specialBtn = document.querySelector("#special")
const retreatBtn = document.querySelector("#retreat")

//helper function for better random!
function randomInt(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function writeStats(char) {

}

// class Character {
//   attack(target) {
//     if (randomInt(1, 20) >= target.ac) {
//       target.hp -= randomInt(1, this.damageDie)
//     }
//   }
// }

class Wizard {
  constructor() {
    this.hp = randomInt(5, 10)
    this.mp = randomInt(2, 3)
    this.ac = randomInt(10, 14)
    this.hit = randomInt(2, 4)
    this.damageDie = 6;
  }

  // special() {
  //   return super.attack() += super.attack() += super.attack()
  // }
}

class Knight {
  
  constructor() {
    this.hp = randomInt(8, 16)
    this.mp = randomInt(1, 2)
    this.ac = randomInt(14, 18)
    this.hit = randomInt(1, 3)
    this.damageDie = 8;
  }

  // special() {
  //   return super.attack() += super.attack()
  // }
}

function writeCard(card, player) {
  card.innerHTML = `<strong>${player.constructor.name}</strong><br>HP: ${player.hp}<br>MP: ${player.mp}<br>Damage: d${player.damageDie}`
}

dougHenning = new Wizard()
royGreenhilt = new Knight()

console.log(dougHenning)
console.log(royGreenhilt)

writeCard(p1Card, dougHenning)
writeCard(p2Card, royGreenhilt)
