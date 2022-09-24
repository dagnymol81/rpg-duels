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
const p1ClassSelect = document.querySelector("#p1-class-select")
const p1NameSelect = document.querySelector("#p1-name-select")
const p2ClassSelect = document.querySelector("#p2-class-select")
const p2NameSelect = document.querySelector("#p2-name-select")
const gameModeSelect = document.querySelector("#game-mode-select")
const startBtn = document.querySelector("#start")
const modalHeading = document.querySelector("#modal-content h1")

let roundTwo = false;

let preferences = {
  p1Class: "wizard",
  p1Name: "Trevor",
  p2Class: "bard",
  p2Name: "Katie",
  gameMode: "1p-skirmish"
}

//event listeners
p1ClassSelect.addEventListener("click", (event) => {
  preferences.p1Class = event.target.value
 })

 p1NameSelect.addEventListener("input", (event) => {
  preferences.p1Name = event.target.value
 })

 p2ClassSelect.addEventListener("click", (event) => {
  preferences.p2Class = event.target.value
 })

 p2NameSelect.addEventListener("input", (event) => {
  preferences.p2Name = event.target.value
 })

 gameModeSelect.addEventListener("click", (event) => {
  preferences.gameMode = event.target.value
 })

 startBtn.addEventListener("click", () => {
  setupGame()
  closeModal()
 })

 addEventListener('load', openModal)

attackBtn.addEventListener("click", () => {
  setTimeout(playRound(player1, player2, "regular"), 1000)
})
  
specialBtn.addEventListener("click", () => {
  setTimeout(playRound(player1, player2, "special"), 1000)
})

class Wizard {
  constructor(name) {
    this.hp = randomInt(18, 20)
    this.mp = randomInt(3, 4)
    this.ac = randomInt(10, 11)
    this.hit = randomInt(4, 5)
    this.name = name
    this.attackName = "MYSTIC BLAST"
    this.specialName = "CATACLYSM"
  }

  damage() {
    return randomInt(1, 4)
  }

  specialDamage() {
    return randomInt(1, 8) + 7
  }

}

class Knight {
  constructor(name) {
    this.hp = randomInt(20, 22)
    this.mp = randomInt(1, 2)
    this.ac = randomInt(15, 16)
    this.hit = randomInt(1, 2)
    this.name = name
    this.attackName = "SWORD"
    this.specialName = "DEVASTATING BLOW"
  }

  damage() {
    return randomInt(1, 6)
  }

  specialDamage() {
    return randomInt(1, 8) + 5
  }
}

class Cleric {
  constructor(name) {
    this.hp = randomInt(21, 23)
    this.mp = randomInt(2, 3)
    this.ac = randomInt(14, 15)
    this.hit = randomInt(3, 4)
    this.name = name
    this.attackName = "MACE"
    this.specialName = "SMITE"
  }

  damage() {
    return randomInt(1, 3)
  }

  specialDamage() {
    return randomInt(1, 8) + 4
  }
}
class Rogue {
  constructor(name) {
    this.hp = randomInt(19, 21)
    this.mp = 1
    this.ac = randomInt(11, 12)
    this.hit = randomInt(5, 6)
    this.name = name
    this.attackName = "DAGGER"
    this.specialName = "SNEAK ATTACK"
  }

  damage() {
    return randomInt(1, 5)
  }

  specialDamage() {
    return randomInt(1, 8) + 8
  }
}

class Bard {
  constructor(name) {
    this.hp = randomInt(16, 18)
    this.mp = randomInt(2, 4)
    this.ac = randomInt(12, 13)
    this.hit = randomInt(2, 3)
    this.name = name
    this.attackName = "BATTLE CRY"
    this.specialName = "DEADLY DIRGE"
  }

  damage() {
    return randomInt(1, 8)
  }

  specialDamage() {
    return randomInt(1, 8) + 6
  }
}

class Ranger {
  constructor(name) {
    this.hp = randomInt(17, 19)
    this.mp = randomInt(1, 3)
    this.ac = randomInt(13, 14)
    this.hit = randomInt(6, 7)
    this.name = name
    this.attackName = "LONGBOW"
    this.specialName = "SAVAGE STRIKE"
  }

  damage() {
    return randomInt(1, 7)
  }

  specialDamage() {
    return randomInt(1, 8) + 3
  }
}

retreatBtn.addEventListener("click", () => {
  endGame("retreat")
})

//display modal for new game settings
function openModal() {
  bg.style.display = "block"
  modal.style.display = "block"
  }
 
function closeModal() {
  modal.style.display = "none"
  modal.classList.remove("open")
  bg.style.display = "none"

//remove event listeners when they're not needed!
bg.removeEventListener("click", closeModal)
}

//helper function for better random!
function randomInt(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//create characters and draw page
function setupGame() {
  specialBtn.disabled = false;
  attackBtn.disabled = false;
  retreatBtn.disabled = false;

  roundTwo = false;

  switch(preferences.p1Class) {
    case "wizard":
      player1 = new Wizard(preferences.p1Name)
      p1Image.style.backgroundImage = "url('images/hero_wizard_transparent.png')"
      break
    case "fighter":
      player1 = new Knight(preferences.p1Name)
      p1Image.style.backgroundImage = "url('images/hero_paladin_transparent.png')"
      break
    case "cleric":
      player1 = new Cleric(preferences.p1Name)
      p1Image.style.backgroundImage = "url('images/hero_cleric_transparent.png')"
      break
    case "rogue":
      player1 = new Rogue(preferences.p1Name)
      p1Image.style.backgroundImage = "url('images/hero_assassin_transparent.png')"
      break
    case "bard":
      player1 = new Bard(preferences.p1Name)
      p1Image.style.backgroundImage = "url('images/hero_bard_transparent.png')"
      break
    case "ranger":
      player1 = new Ranger(preferences.p1Name)
      p1Image.style.backgroundImage = "url('images/hero_ranger_transparent.png')"
  }

  switch(preferences.p2Class) {
    case "wizard":
      player2 = new Wizard(preferences.p2Name)
      p2Image.style.backgroundImage = "url('images/hero_wizard_transparent.png')"
      break
    case "fighter":
      player2 = new Knight(preferences.p2Name)
      p2Image.style.backgroundImage = "url('images/hero_paladin_transparent.png')"
      break
    case "cleric":
      player2 = new Cleric(preferences.p2Name)
      p2Image.style.backgroundImage = "url('images/hero_cleric_transparent.png')"
      break
    case "rogue":
      player2 = new Rogue(preferences.p2Name)
      p2Image.style.backgroundImage = "url('images/hero_assassin_transparent.png')"
      break
    case "bard":
      player2 = new Bard(preferences.p2Name)
      p2Image.style.backgroundImage = "url('images/hero_bard_transparent.png')"
      break
    case "ranger":
      player2 = new Ranger(preferences.p2Name)
      p2Image.style.backgroundImage = "url('images/hero_ranger_transparent.png')"
  }

  attackText.innerHTML = "<h2>VERSUS</h2>"
  while(combatLog.firstChild) {
    combatLog.removeChild(combatLog.firstChild)
  }
  writeCard(p1Card, player1)
  writeCard(p2Card, player2)
}

//write character stats on screen
function writeCard(card, player) {
  card.innerHTML = `<strong>${player.name}</strong><br>AC: ${player.ac}<br>HP: ${player.hp}<br>MP: ${player.mp}`
}

//disable attack buttons and allow player to play again
function endGame(winner) {

  specialBtn.disabled = true;
  attackBtn.disabled = true;
  retreatBtn.disabled = true;

  if (winner == "retreat") {
    attackText.innerHTML = `Retreat! <div id="replay">Play again?</div>`
  } else {
    attackText.innerHTML = `${winner} wins. <div id="replay">Play again?</div>`
  }

  const playAgain = document.querySelector("#replay")
  bg.style.opacity = "0.9"
  bg.addEventListener("click", closeModal)
  modalHeading.textContent = "Ready for more duels?"
  playAgain.addEventListener("click", openModal)

}

//single attack (regular or special)
function makeAttack(player, target, special) {

  let damage;
  let hit;
  let attackName;
  const attack = document.createElement("li")

  let attackRoll = randomInt(1,20)

  if (special) {
    player.mp -= 1
    damage = player.specialDamage()
    hit = player.hit * 2
    attackName = player.specialName
  } else {
    hit = player.hit
    damage = player.damage()
    attackName = player.attackName
  }

  if (attackRoll + hit >= target.ac) {

    target.hp -= damage

    attackText.innerHTML = `${player.name} HIT with ${attackName}! ${damage} damage!<br>`
    attack.textContent = `${player.name} hits ${target.name} with ${attackName} for ${damage} damage!`
    combatLog.prepend(attack)

    setTimeout(() => {
      if (target.hp <= 0) {
        endGame(player.name)
      }
    }, 1000)

  } else {
    attackText.innerHTML = `${player.name} MISS!<br>`
    attack.textContent += `${player.name} misses ${target.name}!`
    combatLog.prepend(attack)
  }

  //todo 1p mode
  if (target.hp > 0) {
    setTimeout(() => {
      attackText.innerHTML = `${target.name}'s turn!`
    }, 1000)
  }


}

function playRound(p1, p2, attackType) {
  attackText.textContent = ""

  if(preferences.gameMode == "1p-skirmish") {
    playRoundSinglePlayer(p1, p2, attackType)
  } else if (preferences.gameMode == "2p-skirmish") {
    twoPlayerAttack(p1, p2, attackType)
  }

  writeCard(p1Card, p1)
  writeCard(p2Card, p2)
}

//player attack and counterattack
function playRoundSinglePlayer(p1, p2, attackType) {

  if (p1.hp > 0) {
    if (attackType == "regular") {
      makeAttack(p1, p2, false)
    } else if (attackType == "special" && p1.mp > 0) {
      makeAttack(p1, p2, true)
    } else {
      attackText.innerHTML = "No more mana! Using regular attack"
      combatLog.prepend("No more mana! Using regular attack")
      setTimeout(() => {
        makeAttack(p1, p2, false)
      }, 500)
    }
  }

  writeCard(p1Card, p1)
  writeCard(p2Card, p2)

  if (p2.hp > 0) {
    if (p2.mp > 0 && Math.random() > 0.5) {
        setTimeout(() => {
          makeAttack(p2, p1, true)
        }, 1000)
    } else {
      setTimeout(() => {
        makeAttack(p2, p1)
      }, 1000)
    }
  }
}


function twoPlayerAttack(p1, p2, attackType) {
  if (roundTwo) {
      if (p2.hp > 0) {
        if (attackType == "regular") {
          makeAttack(p2, p1, false)
        } else if (attackType == "special" && p2.mp > 0) {
          makeAttack(p2, p1, true)
        } else {
          attackText.innerHTML = "No more mana! Using regular attack"
          combatLog.prepend("No more mana! Using regular attack")
          setTimeout(() => {
            makeAttack(p2, p1, false)
          }, 500)
        }
      }
    roundTwo = false;
  } else {
      if (p1.hp > 0) {
        if (attackType == "regular") {
          makeAttack(p1, p2, false)
        } else if (attackType == "special" && p1.mp > 0) {
          makeAttack(p1, p2, true)
        } else {
          attackText.innerHTML = "No more mana! Using regular attack"
          combatLog.prepend("No more mana! Using regular attack")
          setTimeout(() => {
            makeAttack(p1, p2, false)
          }, 500)
        }
      }
    roundTwo = true;
    }
}



