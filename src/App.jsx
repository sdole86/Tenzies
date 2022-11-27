import React from "react"
import Die from "./component/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [rolls, setRolls] = React.useState(0)
  const [startTime, setStartTime] = React.useState(Date.now())


  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won!")
    }
  }, [dice])

  function getTimeSpent() {
    let time = Date.now() - startTime
    let milliseconds = time % 1000
    time = Math.floor(time / 1000);
    let seconds = time % 60;
    time = Math.floor(time / 60);
    let minutes = time % 60;
    time = Math.floor(time / 60);
    let finalTime = minutes + " : " + seconds + "." + milliseconds
    return finalTime
  }

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    if (!tenzies) {
      setRolls(oldRoll => oldRoll + 1)
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      }))
    }
    else {
      setTenzies(false)
      setRolls(0)
      setStartTime(Date.now())
      setDice(allNewDice())
    }
  }


  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">{tenzies ? "You've won!" : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls"}.</p>
      <div>
        <p className="results">{tenzies ? " Time spent: " + getTimeSpent(startTime) : ""}</p>
        <p className="results">{tenzies ? "Rolls made: " + rolls : ""}</p>
      </div>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}