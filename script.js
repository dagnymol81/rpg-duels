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

//todo: 1v1 skirmish
//todo: adventure mode
//todo: modal

const preferences = {
  p1Class: "rogue",
  p1Name: "Trevor",
  p2Class: "cleric",
  p2Name: "Roy",
  gameMode: "1p-skirmish"
}

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

function writeCard(card, player) {
  card.innerHTML = `<strong>${player.name}</strong><br>AC: ${player.ac}<br>HP: ${player.hp}<br>MP: ${player.mp}`
}

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

    //todo: make generic
  if (player1.mp == 0) {
    specialBtn.disabled = true;
  } 

  if (attackRoll + hit >= target.ac) {

    target.hp -= damage

    attackText.innerHTML += `${player.name} HIT with ${attackName}! ${damage} damage!<br>`
    attack.textContent = `${player.name} hits ${target.name} with ${attackName} for ${damage} damage!`
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
    makeAttack(p1, p2, false)
  } else if (attackType == "special") {
    makeAttack(p1, p2, true)
  }


  writeCard(p1Card, p1)
  writeCard(p2Card, p2)

  if (p2.hp >= 0) {

    if (p2.mp > 0 && Math.random() > 0.6) {
        setTimeout(() => {
          makeAttack(p2, p1, true)
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

