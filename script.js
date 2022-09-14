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

function writeGameOptions() {
  modal.innerHTML = `
  <form  id="modal-content">
      <h1>Welcome to RPG Duels!</h1>
      <div id="p1">
        Player 1 Class:
    <div id="p1-class-select" class="radio-button">
      <input type="radio" id="wizard1" name="p1class" value="wizard" class="start-radio" checked>
      <label for="wizard1">Wizard</label>

      <input type="radio" id="fighter1" name="p1class" value="fighter" class="start-radio">
      <label for="fighter1">Fighter</label>

      <input type="radio" id="cleric1" name="p1class" value="cleric" class="start-radio">
      <label for="cleric1">Cleric</label>

      <input type="radio" id="rogue1" name="p1class" value="rogue" class="start-radio">
      <label for="rogue1">Rogue</label>

      <input type="radio" id="bard1" name="p1class" value="bard" class="start-radio">
      <label for="bard1">Bard</label>

      <input type="radio" id="ranger1" name="p1class" value="ranger1" class="start-radio">
      <label for="ranger1">Ranger</label>

    </div>

    <div id="p1-name-select">
      <div id="p1-ns-text">Player One Name: </div>
      <div id="p1-ns-field"><input type="text" name="p1Name" id="p1Name" placeholder="Trevor"></div>
    </div>
  </div>

    <div id="p2">
      Player Two Class:<br> 
      <div id="p2-class-select" class="radio-button">
      <input type="radio" id="wizard" name="p2class" value="wizard" class="start-radio">
      <label for="wizard">Wizard</label>

      <input type="radio" id="fighter" name="p2class" value="fighter"  class="start-radio">
      <label for="fighter">Fighter</label>

      <input type="radio" id="cleric" name="p2class" value="cleric"  class="start-radio">
      <label for="cleric">Cleric</label>

      <input type="radio" id="rogue" name="p2class" value="rogue"  class="start-radio">
      <label for="rogue">Rogue</label>

      <input type="radio" id="bard" name="p2class" value="bard"  class="start-radio" checked>
      <label for="bard">Bard</label>

      <input type="radio" id="ranger" name="p2class" value="ranger"  class="start-radio">
      <label for="ranger">Ranger</label>

    </div>

    <div id="p2-name-select">
      <div id="p2-ns-text">Player Two Name:</div><div id="p2-ns-field"><input type="text" name="p2Name" id="p2Name" placeholder="Katie"></div>
    </div>
  </div>

        <div id="game-mode-select" class="radio-button">
      Game Mode:
      <br>
      <div id="game-mode-buttons">
      <input type="radio" id="1p-skirmish" name="game-mode" value="1p-skirmish" class="start-radio" checked>
      <label for="1p-skirmish">Skirmish vs. Computer</label><br>
  
      <input type="radio" id="2p-skirmish" name="game-mode" value="2p-skirmish" class="start-radio">
      <label for="2p-skirmish">Skirmish vs. Human (Pass and Play)</label><br>
  
      <input type="radio" id="adventure" name="game-mode" value="adventure" class="start-radio">
      <label for="adventure">Adventure Mode</label>
    </div>
    </div>
    <button id="start">
      <img src="images/hero_warlord_transparent.png">Start Game<img src="images/boss_cinderdragon_transparent.png"></button>
      </form>
  `
}

function openModal(event) {

  bg.style.display = "block"
  modal.style.display = "block"
  bg.addEventListener("click", closeModal)

  if (event.target.id == "credits") {
    writeCredits()
  }
  
  if (eventType = "load") {

    writeGameOptions()
    const modal = document.querySelector("#modal-content")
    // const selectedClassP1 = document.querySelector('input[type=radio][name=p1class]:checked').value
    // const selectedClassP2 = document.querySelector('input[type=radio][name=p2class]:checked').value
    // const selectedGameMode = document.querySelector('input[type=radio][name=game-mode]:checked').value

    modal.addEventListener("click", () => {
      preferences.p1Class = document.querySelector('input[type=radio][name=p1class]:checked').value
      preferences.p2Class = document.querySelector('input[type=radio][name=p2class]:checked').value
      preferences.p1Name = document.querySelector("#p1Name").value || "Trevor"
      preferences.p2Name = document.querySelector("#p2Name").value || "Katie"
      preferences.gameMode = document.querySelector('input[type=radio][name=game-mode]:checked').value
    })

  }

  }

  eventType = "load"
  addEventListener('load', (event) => {openModal(event)})
 
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

