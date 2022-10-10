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
  if (event.target.value == "adventure") {
    p2.style.display = "none"
  } else {
    p2.style.display = "block"
  }
 })

 startBtn.addEventListener("click", () => {
  setupGame()
  closeModal()
 })

 addEventListener('load', openModal)

attackBtn.addEventListener("click", () => {
  setTimeout(playRound(player1, player2, "regular"), 500)
})
  
specialBtn.addEventListener("click", () => {
  setTimeout(playRound(player1, player2, "special"), 500)
})

const CharacterClass = {
  Wizard: {
    maxHP: 25,
    maxMP: 3,
    currentHP: 25,
    currentMP: 3,
    specialBonus: 7,
    baseDMG: 4,
    toHit: 4,
    AC: 10,
    attackName: "MYSTIC BLAST",
    specialName: "CATACLYSM",
    portrait: 'hero_wizard_transparent.png',
  },
  Knight: {
    maxHP: 27,
    currentHP: 27,
    maxMP: 1,
    currentMP: 1,
    specialBonus: 5,
    baseDMG: 5,
    toHit: 4,
    AC: 15,
    attackName: "SWORD",
    specialName: "DEVASTATING BLOW",
    portrait: 'hero_paladin_transparent.png'
  },
  Cleric: {
    maxHP: 28,
    currentHP: 28,
    maxMP: 3,
    currentMP: 3,
    specialBonus: 5,
    baseDMG: 3,
    toHit: 4,
    AC: 15,
    attackName: "MACE",
    specialName: "SMITE",
    portrait: 'hero_cleric_transparent.png'
  },
  Rogue: {
    maxHP: 26,
    currentHP: 26,
    maxMP: 1,
    currentMP: 1,
    specialBonus: 10,
    baseDMG: 5,
    toHit: 6,
    AC: 12,
    attackName: "DAGGER",
    specialName: "SNEAK ATTACK",
    portrait: 'hero_assassin_transparent.png'
  },
  Bard: {
    maxHP: 23,
    currentHP: 23,
    maxMP: 3,
    currentMP: 3,
    specialBonus: 6,
    baseDMG: 8,
    toHit: 4,
    AC: 13,
    attackName: "BATTLE CRY",
    specialName: "DEADLY DIRGE",
    portrait: 'hero_bard_transparent.png',
  },
  Ranger: {
    maxHP: 24,
    currentHP: 24,
    maxMP: 2,
    currentMP: 2,
    specialBonus: 6, 
    baseDMG: 7,
    toHit: 5,
    AC: 14,
    attackName: "LONGBOW",
    specialName: "SAVAGE STRIKE",
    portrait: 'hero_ranger_transparent.png',
  },

   //level one monsters
   Zombie: {
    maxHP: 20,
    currentHP: 20,
    maxMP: 1,
    currentMP: 1,
    specialBonus: 3,
    baseDMG: 1,
    toHit: 2,
    AC: 10,
    attackName: "CLAW",
    specialName: "REND",
    portrait: 'monster_zombie_transparent.png',
  },
  Skeleton: {
    maxHP: 24,
    currentHP: 24,
    maxMP: 1,
    currentMP: 1,
    specialBonus: 4,
    baseDMG: 2,
    toHit: 3,
    AC: 12,
    attackName: "SWORD",
    specialName: "DEATH TOUCH",
    portrait: 'monster_skeleton_transparent.png',
  },
  Necromancer: {
    maxHP: 26,
    currentHP: 26,
    maxMP: 2,
    currentMP: 2,
    specialBonus: 7,
    baseDMG: 2,
    toHit: 3,
    AC: 12,
    attackName: "FIRE BLAST",
    specialName: "RAIN OF FIRE",
    portrait: 'monster_catkinwarlock_transparent.png',
  },
  //level two monsters
  Orc: {
    maxHP: 33,
    currentHP: 33,
    maxMP: 1,
    currentMP: 1,
    specialBonus: 6,
    baseDMG: 6,
    toHit: 4,
    AC: 14,
    attackName: "AXE",
    specialName: "BRUTE SLASH",
    portrait: 'monster_orc_transparent.png',
  },
Goblin: {
  maxHP: 33,
  currentHP: 33,
  maxMP: 2,
  specialBonus: 10,
  baseDMG: 6,
  toHit: 6,
  AC: 12,
  attackName: "MOLOTOV COCKTAIL",
  specialName: "BARREL OF GUNPOWDER",
  portrait: 'monster_goblinboomer_transparent.png',
},
Elemental: {
  maxHP: 35,
  currentHP: 35,
  maxMP: 2,
  specialBonus: 8,
  baseDMG: 6,
  toHit: 6,
  AC: 14,
  attackName: "BLAZE",
  specialName: "INFERNO",
  portrait: 'monster_fireelemental_transparent.png',
},
Medusa: {
  maxHP: 40,
  currentHP: 40,
  maxMP: 1,
  specialBonus: 10,
  baseDMG: 6,
  toHit: 8,
  AC: 14,
  attackName: "SNAKE BITE",
  specialName: "STONY GAZE",
  portrait: 'monster_medusa_transparent.png',
},
//LEVEL 3 MONSTERS
Vampire: {
  maxHP: 50,
  currentHP: 50,
  maxMP: 1,
  currentMP: 1,
  specialBonus: 16,
  baseDMG: 9,
  toHit: 10,
  AC: 16,
  attackName: "BITE",
  specialName: "BLOOD DRAIN",
  portrait: 'monster_vampire_transparent.png',
},
Demilich: {
  maxHP: 40,
  currentHP: 40,
  maxMP: 2,
  currentMP: 2,
  specialBonus: 18,
  baseDMG: 12,
  toHit: 14,
  AC: 15,
  attackName: "GAZE",
  specialName: "DRAIN LIFE",
  portrait: 'monster_demilich_transparent.png',
},
Lich: {
  maxHP: 50,
  currentHP: 50,
  maxMP: 5,
  currentMP: 5,
  specialBonus: 20,
  baseDMG: 20,
  toHit: 16,
  AC: 18,
  attackName: "SHADOW BOLT",
  specialName: "HORRID WILTING",
  portrait: 'boss_lich_transparent.png',
},
//level 4 boss
Dragon: {
  maxHP: 60,
  currentHP: 60,
  maxMP: 2,
  currentMP: 2,
  specialBonus: 20,
  baseDMG: 24,
  toHit: 10,
  AC: 18,
  attackName: "CLAWS",
  specialName: "FIRE BREATH",
  portrait: 'boss_cinderdragon_transparent.png',
}
}

class Character {
  constructor(name, characterClass, level = 1) {
    this.maxHP = CharacterClass[characterClass].maxHP
    this.maxMP = CharacterClass[characterClass].maxMP
    this.currentMP = CharacterClass[characterClass].maxMP
    this.currentHP = CharacterClass[characterClass].maxHP
    this.AC = CharacterClass[characterClass].AC
    this.name = name
    this.attackName = CharacterClass[characterClass].attackName
    this.specialName = CharacterClass[characterClass].specialName
    this.baseDMG = CharacterClass[characterClass].baseDMG
    this.specialBonus = CharacterClass[characterClass].specialBonus
    this.toHit = CharacterClass[characterClass].toHit
  }
  damage() {
    return randomInt(1, this.baseDMG)
  }
  specialDamage() {
    return randomInt(1, 8) + this.specialBonus
  }
  levelUp() {
    this.maxHP += 10;
    this.maxMP += 1;
    this.AC += 2;
    this.baseDMG += 10;
    this.specialBonus += 5;
    this.toHit += 1;
  }
}

//adventure mode monsters
var Zombie = new Character("Zombie", "Zombie")
var Skeleton = new Character("Skeleton", "Skeleton")
var Necromancer = new Character("Necromancer", "Necromancer")
var Orc = new Character("Orc", "Orc")
var Goblin = new Character("Goblin", "Goblin")
var Elemental = new Character("Elemental", "Elemental")
var Medusa = new Character("Medusa", "Medusa")
var Vampire = new Character("Vampire", "Vampire")
var Demilich = new Character("Demilich", "Demilich")
var Lich = new Character("Lich", "Lich")
var Dragon = new Character("Dragon", "Dragon")

var Monsters = [Dragon, Lich, Demilich, Vampire, Medusa, Elemental, Goblin, Orc, Necromancer, Skeleton, Zombie]


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

Zombie = new Character("Zombie", "Zombie")
Skeleton = new Character("Skeleton", "Skeleton")
Necromancer = new Character("Necromancer", "Necromancer")
Orc = new Character("Orc", "Orc")
Goblin = new Character("Goblin", "Goblin")
Elemental = new Character("Elemental", "Elemental")
Medusa = new Character("Medusa", "Medusa")
Vampire = new Character("Vampire", "Vampire")
Demilich = new Character("Demilich", "Demilich")
Lich = new Character("Lich", "Lich")
Dragon = new Character("Dragon", "Dragon")


Monsters = [Dragon, Lich, Demilich, Vampire, Medusa, Elemental, Goblin, Orc, Necromancer, Skeleton, Zombie]

  specialBtn.disabled = false;
  attackBtn.disabled = false;
  retreatBtn.disabled = false;

  roundTwo = false;

  player1 = new Character(preferences.p1Name, preferences.p1Class)
  p1Image.style.backgroundImage = `url('images/${CharacterClass[preferences.p1Class].portrait}')`

  if (preferences.gameMode == "adventure") {
    p2Image.style.backgroundImage = `url('images/${CharacterClass[Monsters[Monsters.length -1].name].portrait}')`
    player2 = Monsters.pop()
  } else {
    player2 = new Character(preferences.p2Name, preferences.p2Class)
    p2Image.style.backgroundImage = `url('images/${CharacterClass[preferences.p2Class].portrait}')`
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
  card.innerHTML = `<strong>${player.name}</strong><br>AC: ${player.AC}<br>HP: ${player.currentHP}<br>MP: ${player.currentMP}`
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

function adventureRound(target) {
  if (player1.currentHP <= 0) {
    endGame(player2.name)
  } else if (Monsters.length > 0) {
    attackText.innerHTML = `${target.name} defeated! Next opponent: ${Monsters[Monsters.length - 1].name}`
    p2Image.style.backgroundImage = `url('images/${CharacterClass[Monsters[Monsters.length -1].name].portrait}')`
    player2 = Monsters.pop()
    if (Monsters.length == 3 || Monsters.length == 7 || Monsters.length ==  0) {
      attackText.innerHTML = `LEVEL UP!`
      player1.levelUp()
    }
    player1.currentHP = player1.maxHP
    player1.currentMP = player1.maxMP
    writeCard(p1Card, player1)
    writeCard(p2Card, player2)
  } else {
    endGame(player1.name)
  }
} 

//single attack (regular or special)
function makeAttack(player, target, special) {

  let damage;
  let hit;
  let attackName;
  const attack = document.createElement("li")

  let attackRoll = randomInt(1,20)

  // console.log(`${player.name} adds ${player.toHit} to their roll of ${attackRoll} to hit an AC of ${target.AC}`)

  if (special) {
    player.currentMP -= 1
    damage = player.specialDamage()
    hit = player.toHit * 2
    attackName = player.specialName
  } else {
    hit = player.toHit
    damage = player.damage()
    attackName = player.attackName
  }

  if (attackRoll + hit >= target.AC) {

    target.currentHP -= damage

    attackText.innerHTML = `${player.name} HIT with ${attackName}! ${damage} damage!<br>`
    attack.textContent = `${player.name} hits ${target.name} with ${attackName} for ${damage} damage!`
    combatLog.prepend(attack)

    setTimeout(() => {
      if (target.currentHP <= 0) {
        if (preferences.gameMode == "adventure") {
          adventureRound(target)
        } else {
          endGame(player.name)
        }
      }}, 1000)

  } else {
    attackText.innerHTML = `${player.name} MISS!<br>`
    attack.textContent += `${player.name} misses ${target.name}!`
    combatLog.prepend(attack)
  }

  if (target.currentHP > 0) {
    setTimeout(() => {
      attackText.innerHTML = `${target.name}'s turn!`
    }, 1000)
  }


}

//choose function based on game mode
function playRound(p1, p2, attackType) {
  attackText.textContent = ""

  if(preferences.gameMode == "1p-skirmish") {
    playRoundSinglePlayer(p1, p2, attackType)
  } else if (preferences.gameMode == "2p-skirmish") {
    twoPlayerAttack(p1, p2, attackType)
  } else if (preferences.gameMode == "adventure") {
    playRoundSinglePlayer(p1, p2, attackType)
  }

  writeCard(p1Card, p1)
  writeCard(p2Card, p2)
}

//player attack and counterattack
function playRoundSinglePlayer(p1, p2, attackType) {

  if (p1.currentHP > 0) {
    if (attackType == "regular") {
      makeAttack(p1, p2, false)
    } else if (attackType == "special" && p1.currentMP > 0) {
      makeAttack(p1, p2, true)
    } else {
      attackText.innerHTML = "No more mana! Using regular attack"
      combatLog.prepend("No more mana! Using regular attack")
        makeAttack(p1, p2, false)
    }
  }

  writeCard(p1Card, p1)
  writeCard(p2Card, p2)

  if (p2.currentHP > 0) {
    if (p2.currentMP > 0 && Math.random() > 0.4) {
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
      if (p2.currentHP > 0) {
        if (attackType == "regular") {
          makeAttack(p2, p1, false)
        } else if (attackType == "special" && p2.currentMP > 0) {
          makeAttack(p2, p1, true)
        } else {
          attackText.innerHTML = "No more mana! Using regular attack"
          combatLog.prepend("No more mana! Using regular attack")
          setTimeout(() => {
            makeAttack(p2, p1, false)
          }, 100)
        }
      }
    roundTwo = false;
  } else {
      if (p1.currentHP > 0) {
        if (attackType == "regular") {
          makeAttack(p1, p2, false)
        } else if (attackType == "special" && p1.currentMP > 0) {
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

