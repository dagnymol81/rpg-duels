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

const preferences = {
  p1Class: "wizard",
  p1Name: "Trevor",
  p2Class: "fighter",
  p2Name: "Roy",
  gameMode: "1p-skirmish"
}

class Wizard {
  constructor(name) {
    this.hp = randomInt(10, 15)
    this.mp = randomInt(2, 3)
    this.ac = randomInt(10, 14)
    this.hit = randomInt(2, 4)
    this.damageDie = 6
    this.name = name
    this.specialName = "MAGIC BOLT"
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
    this.specialName = "SUPER SMASH"
  }
}

if(preferences.gameMode == "1p-skirmish") {
  attackBtn.addEventListener("click", () => {
    playRound(player1, player2, "regular")
  })
  
  specialBtn.addEventListener("click", () => {
    playRound(player1, player2, "special")
  })
}

retreatBtn.addEventListener("click", () => {
  setupGame()
})


function writeCredits() {
  modal.innerHTML = 
  `<h1>Credits</h1>
  <p>
    Website and code by Dagny Mol. Check it out on <a href="https://github.com/dagnymol81/rpg-duels">Github</a>
  </p>
  <p>
    Character graphics by <a href="https://opengameart.org/users/justin-nichol">Justin Nichol</a>
  </p><p>
    <a href="https://fonts.google.com/specimen/Roboto+Slab">Roboto Slab</a> font by Christian Robertson.
  </p>`
}

function openModal(event) {
  bg.style.display = "block"
  modal.style.display = "block"
  bg.addEventListener("click", closeModal)

  if (event.target.id == "credits") {
    writeCredits()
  }
  }

  //eventType = "load"
  // addEventListener('load', (event) => {openModal(event)})
 
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


function setupGame() {
  specialBtn.disabled = false;
  player1 = new Wizard(preferences.p1Name)
  player2 = new Knight(preferences.p2Name)
  attackText.innerHTML = "<h2>VERSUS</h2>"
  while(combatLog.firstChild) {
    combatLog.removeChild(combatLog.firstChild)
  }
  writeCard(p1Card, player1)
  writeCard(p2Card, player2)
}

function writeCard(card, player) {
  card.innerHTML = `<strong>${player.name}</strong><br>HP: ${player.hp}<br>MP: ${player.mp}<br>Damage: d${player.damageDie}`
}

function specialAttack(player, target) {
  let damage;
  const attack = document.createElement("li")
  player.mp -= 1;

  //todo: make generic
  if (player1.mp == 0) {
    specialBtn.disabled = true;
  } 

  if (randomInt(1, 20) + (2 * player.hit) >= target.ac) {
    damage = randomInt(1, player.damageDie) + randomInt(1, player.damageDie) + 1
    target.hp -= damage
    attackText.innerHTML += `${player.name} hits with ${player.specialName} for ${damage} damage!<br>`
    attack.textContent = `${player.name} hits ${target.name} with ${player.specialName} for ${damage} damage!`
    combatLog.prepend(attack)
    setTimeout(() => {
      if (target.hp <= 0) {
        setupGame()
        alert(player.name + " wins!")
      }
    }, 1000)

  } else {
    attackText.innerHTML = `${player.name} MISS!<br>`
    attack.textContent += `${player.name} misses ${target.name}!`
    combatLog.prepend(attack)
  }
}


function makeAttack(player, target) {
  let damage;
  const attack = document.createElement("li")

  if (randomInt(1, 20) + player.hit >= target.ac) {
    damage = randomInt(1, player.damageDie)
    target.hp -= damage
    attackText.innerHTML += `${player.name} HIT! ${damage} damage!<br>`
    attack.textContent = `${player.name} hits ${target.name} for ${damage} damage!`
    combatLog.prepend(attack)
    setTimeout(() => {
      if (target.hp <= 0) {
        alert(player.name + " wins!")
        setupGame()
      }
    }, 1000)

  } else {
    attackText.innerHTML = `${player.name} MISS!<br>`
    attack.textContent += `${player.name} misses ${target.name}!`
    combatLog.prepend(attack)
  }
}

function playRound(p1, p2, attackType) {

  attackText.textContent = ""

  if (attackType == "regular") {
    makeAttack(p1, p2)
  } else if (attackType == "special") {
    specialAttack(p1, p2)
  }


  writeCard(p1Card, p1)
  writeCard(p2Card, p2)

  if (p2.hp >= 0) {

    if (p2.mp > 0 && Math.random() > 0.6) {
        setTimeout(() => {
          specialAttack(p2, p1)
        }, 1000)
    } else {
      setTimeout(() => {
        makeAttack(p2, p1)
      }, 1000)
    }


    writeCard(p1Card, p1)
    writeCard(p2Card, p2)
  }
}



setupGame()

