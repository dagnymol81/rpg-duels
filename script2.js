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

let lastGame = "Welcome to RPG Duels"

const preferences = {
  p1Name: "Doug Henning",
  p2Name: "Roy Greenhilt"
}

const gameEnd = {
  target: false
}

addEventListener('load', (event) => {openModal(event)})

function openModal(event) {
  bg.style.display = "block"
  modal.style.display = "block"
  bg.addEventListener("click", closeModal)

  let templates = {
    credits: 
    `<h1>Credits</h1>
    <p>
      Website and code by Dagny Mol. Check it out on <a href="https://github.com/dagnymol81/rpg-duels">Github</a>
    </p>
    <p>
      Character graphics by <a href="https://opengameart.org/users/justin-nichol">Justin Nichol</a>
    </p><p>
      <a href="https://fonts.google.com/specimen/Roboto+Slab">Roboto Slab</a> font by Christian Robertson.
    </p>`,

    onLoad: 
    `<h1>${lastGame}</h1>
    <p>
    Player One Name: <input type="text" name="p1" id="p1"><br>
    Player Two Name: <input type="text" name="p2" id="p2">
    </p>
    Game Mode:
    <br>
    <input type="radio" id="1p-skirmish" name="1p-skirmish" value="1p-skirmish">
    <label for="1p-skirmish">Skirmish vs. Computer</label><br>

    <input type="radio" id="2p-skirmish" name="2p-skirmish" value="2p-skirmish">
    <label for="2p-skirmish">Skirmish vs. Human (Pass and Play)</label><br>

    <input type="radio" id="adventure" name="adventure" value="adventure">
    <label for="adventure">Adventure Mode</label><br>


    `
  }

  let modalType = event.target.id
  console.log(event.target.id)

  function newGame(pref) {

    const p1 = document.querySelector("#p1")
    const p2 = document.querySelector("#p2")

    if (p1.value) {
      p1Name = p1.value
    }
    if (p2.value) {
      p2Name = p2.value
    }
  
      //set up game 
  let dougHenning = new Wizard(p1Name)
  let royGreenhilt = new Knight(p2Name)

  attackBtn.addEventListener("click", () => {
    playRound(dougHenning, royGreenhilt, "regular")
  })

  specialBtn.addEventListener("click", () => {
    playRound(dougHenning, royGreenhilt, "special")
  })
  
  setTimeout(playGame, 10000)
  
  }

  if (modalType) {
    modal.innerHTML = templates[modalType]
  } else {
    modal.innerHTML = templates.onLoad
    newGame(preferences)
  }

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

  special(target) {
    let damage;
    const attack = document.createElement("li")

    if (randomInt(1, 20) + (2 * this.hit) > target.ac) {
    damage = randomInt(1, player.damageDie) + randomInt(1, player.damageDie) + 1
    target.hp -= damage
    attackText.innerHTML += `${player.name} HIT with MAGIC BOLT! ${damage} damage!<br>`
    attack.textContent = `${player.name} hits ${target.name} with MAGIC BOLT for ${damage} damage!`
    combatLog.prepend(attack)
    setTimeout(() => {
      if (target.hp <= 0) {
        lastGame = `${player.name} wins! Play Again?`
        openModal(gameEnd)
      }
    }, 1000)

  } else {
    attackText.innerHTML = `${player.name} MISS with MAGIC BOLT!<br>`
    attack.textContent += `${player.name} misses ${target.name} with MAGIC BOLT!`
    combatLog.prepend(attack)
  }

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

function writeCard(card, player) {
  card.innerHTML = `<strong>${player.name}</strong><br>HP: ${player.hp}<br>MP: ${player.mp}<br>Damage: d${player.damageDie}`
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
        lastGame = `${player.name} wins! Play Again?`
        // alert(player.name + " wins!")
        openModal(gameEnd)
      }
    }, 1000)

  } else {
    console.log("miss")
    attackText.innerHTML = `${player.name} MISS!<br>`
    attack.textContent += `${player.name} misses ${target.name}!`
    combatLog.prepend(attack)
  }
}
 


function playRound(p1, p2, attackType) {

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
  attackText.textContent = "VERSUS"
  while(combatLog.firstChild) {
    combatLog.removeChild(combatLog.firstChild)
  }
  writeCard(p1Card, dougHenning)
  writeCard(p2Card, royGreenhilt)
}




