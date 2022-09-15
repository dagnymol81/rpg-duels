const p1ClassSelect = document.querySelector("#p1-class-select")
const p1NameSelect = document.querySelector("#p1-name-select")
const p2ClassSelect = document.querySelector("#p2-class-select")
const p2NameSelect = document.querySelector("#p2-name-select")
const gameModeSelect = document.querySelector("#game-mode-select")
const startBtn = document.querySelector("#start")

let preferences = {
  p1Class: "wizard",
  p1Name: "Trevor",
  p2Class: "bard",
  p2Name: "Katie",
  gameMode: "1p-skirmish"
}

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

 startBtn.addEventListener("click", setupGame)

function setupGame() {
  console.log(preferences)
}