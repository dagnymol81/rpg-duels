//DOM elements
const p1Card = document.querySelector("#p1-card")
const p2Card = document.querySelector("#p2-card")
const p1Image = document.querySelector("#p1-image")
const p2Image = document.querySelector("#p2-image")
const attackText = document.querySelector("#attack-text") 
const combatLog = document.querySelector("#combat-log ul")
const attackBtn = document.querySelector("#attack")
const specialBtn = document.querySelector("#special")
const retreatBtn = document.querySelector("#retreat")
const credits = document.querySelector("#credits")

const modal = document.querySelector("#modal")
const bg = document.querySelector("#modal-backdrop")

function openModal(event) {
  bg.style.display = "block"
  modal.style.display = "block"
  bg.addEventListener("click", closeModal)
  }

const closeModal = function(event) {
  modal.style.display = "none"
  modal.classList.remove("open")
  bg.style.display = "none"

//remove event listeners when they're not needed!
bg.removeEventListener("click", closeModal)
}

credits.addEventListener("click", openModal)


//helper function for better random!
function randomInt(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}


class Wizard {
  constructor(name) {
    this.hp = randomInt(10, 15)
    this.mp = randomInt(2, 3)
    this.ac = randomInt(10, 14)
    this.hit = randomInt(2, 4)
    this.damageDie = 6
    this.name = name
  }
}

class Knight {
  
  constructor(name) {
    this.hp = randomInt(12, 20)
    this.mp = randomInt(1, 2)
    this.ac = randomInt(14, 18)
    this.hit = randomInt(1, 3)
    this.damageDie = 8
    this.name = name
  }
}

//set up game 
let dougHenning = new Wizard("Doug Henning")
let royGreenhilt = new Knight("Roy Greenhilt")
attackBtn.addEventListener("click", () => {
  playRound(dougHenning, royGreenhilt)
})

function writeCard(card, player) {
  card.innerHTML = `<strong>${player.name}</strong><br>HP: ${player.hp}<br>MP: ${player.mp}<br>Damage: d${player.damageDie}`
}

function makeAttack(player, target) {
  let damage;
  const attack = document.createElement("li")

  if (randomInt(10, 20) + player.hit >= target.ac) {
    console.log("hit")
    damage = randomInt(1, player.damageDie)
    console.log(damage)
    target.hp -= damage
    attackText.innerHTML += `${player.name} HIT! ${damage} damage!<br>`
    attack.textContent = `${player.name} hits ${target.name} for ${damage} damage!`
    combatLog.prepend(attack)
    setTimeout(() => {
      if (target.hp <= 0) {
        alert(player.name + " wins!")
        playGame()
      }
    }, 1000)

  } else {
    console.log("miss")
    attackText.innerHTML = `${player.name} MISS!<br>`
    attack.textContent += `${player.name} misses ${target.name}!`
    combatLog.prepend(attack)
  }
}
 


function playRound(p1, p2) {

  attackText.textContent = ""

  makeAttack(p1, p2)
  writeCard(p1Card, p1)
  writeCard(p2Card, p2)

  if (p2.hp >= 0) {
    setTimeout(() => {
      makeAttack(p2, p1)
    }, 1000)
    writeCard(p1Card, p1)
    writeCard(p2Card, p2)
  }

}




function playGame() {
  dougHenning = new Wizard("Doug Henning")
  royGreenhilt = new Knight("Roy Greenhilt")
  attackText.textContent = "VERSUS"
  while(combatLog.firstChild) {
    combatLog.removeChild(combatLog.firstChild)
  }
  writeCard(p1Card, dougHenning)
  writeCard(p2Card, royGreenhilt)
}

playGame()


