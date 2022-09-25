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
  p1Class: "Wizard",
  p1Name: "Trevor",
  p2Class: "Bard",
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

const PlayerClasses = {
  Wizard: {
    minHP: 18,
    maxHP: 20,
    minMP: 3,
    maxMP: 4,
    specialBonus: 7,
    baseDMG: 4,
    minAcc: 4,
    maxAcc: 5,
    minAC: 10,
    maxAC: 11,
    attackName: "MYSTIC BLAST",
    specialName: "CATACLYSM",
    portrait: 'hero_wizard_transparent.png',
  },
  Knight: {
    minHP: 20,
    maxHP: 22,
    minMP: 1,
    maxMP: 2,
    specialBonus: 5,
    baseDMG: 5,
    minAcc: 1,
    maxAcc: 2,
    minAC: 15,
    maxAC: 16,
    attackName: "SWORD",
    specialName: "DEVASTATING BLOW",
    portrait: 'hero_paladin_transparent.png'
  },
  Cleric: {
    minHP: 21,
    maxHP: 23,
    minMP: 2,
    maxMP: 3,
    specialBonus: 4,
    baseDMG: 3,
    minAcc: 3,
    maxAcc: 4,
    minAC: 14,
    maxAC: 15,
    attackName: "MACE",
    specialName: "SMITE",
    portrait: 'hero_cleric_transparent.png'
  },
  Rogue: {
    minHP: 19,
    maxHP: 21,
    minMP: 1,
    maxMP: 1,
    specialBonus: 8,
    baseDMG: 5,
    minAcc: 5,
    maxAcc: 6,
    minAC: 11,
    maxAC: 12,
    attackName: "DAGGER",
    specialName: "SNEAK ATTACK",
    portrait: 'hero_assassin_transparent.png'
  },
  Bard: {
    minHP: 16,
    maxHP: 18,
    minMP: 2,
    maxMP: 4,
    specialBonus: 6,
    baseDMG: 8,
    minAcc: 2,
    maxAcc: 3,
    minAC: 12,
    maxAC: 13,
    attackName: "BATTLE CRY",
    specialName: "DEADLY DIRGE",
    portrait: 'hero_bard_transparent.png',
  },
  Ranger: {
    minHP: 17,
    maxHP: 19,
    minMP: 1,
    maxMP: 3,
    specialBonus: 3, 
    baseDMG: 7,
    minAcc: 5,
    maxAcc: 7,
    minAC: 13,
    maxAC: 14,
    attackName: "LONGBOW",
    specialName: "SAVAGE STRIKE",
    portrait: 'hero_ranger_transparent.png',
  },
}

const Monsters = {
  
}

class Character {
  constructor(name, characterClass) {
    this.hp = randomInt(PlayerClasses[characterClass].minHP, PlayerClasses[characterClass].maxHP)
    this.mp = randomInt(PlayerClasses[characterClass].minMP, PlayerClasses[characterClass].maxMP)
    this.ac = randomInt(PlayerClasses[characterClass].minAC, PlayerClasses[characterClass].maxAC)
    this.name = name
    this.attackName = PlayerClasses[characterClass].attackName
    this.specialName = PlayerClasses[characterClass].specialName
    this.baseDMG = PlayerClasses[characterClass].baseDMG
    this.specialBonus = PlayerClasses[characterClass].specialBonus
    this.hit = randomInt(PlayerClasses[characterClass].minAcc, PlayerClasses[characterClass].maxAcc)
  }
  damage() {
    return randomInt(1, this.baseDMG)
  }
  specialDamage() {
    return randomInt(1, 8) + this.specialBonus
  }
  levelUp() {
    this.hp += randomInt(PlayerClasses[characterClass].minHP, PlayerClasses[characterClass].maxHP)
    this.mp += randomInt(PlayerClasses[characterClass].minMP, PlayerClasses[characterClass].maxMP)
    this.ac += randomInt(1, 3)
    this.baseDMG += PlayerClasses[characterClass].baseDMG
    this.specialBonus += PlayerClasses[characterClass].specialBonus
    this.hit += randomInt(3, 5)
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

  console.log(preferences.p1Name)
  console.log(preferences.p1Class)

  player1 = new Character(preferences.p1Name, preferences.p1Class)
  p1Image.style.backgroundImage = `url('images/${PlayerClasses[preferences.p1Class].portrait}')`

  player2 = new Character(preferences.p2Name, preferences.p2Class)
  p2Image.style.backgroundImage = `url('images/${PlayerClasses[preferences.p2Class].portrait}')`

  console.log(player1)
  console.log(player2)

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

//player attack and counterattack
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



