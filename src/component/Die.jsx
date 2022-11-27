import React from "react"
import die1 from "/src/assets/die1.png"
import die2 from "/src/assets/die2.png"
import die3 from "/src/assets/die3.png"
import die4 from "/src/assets/die4.png"
import die5 from "/src/assets/die5.png"
import die6 from "/src/assets/die6.png"

export default function Die(props) {
    const styles = {
        opacity: props.isHeld ? ".5" : "1"
    }

    function getImage(value) {
        switch (value) {
            case 1:
                return die1

            case 2:
                return die2

            case 3:
                return die2

            case 4:
                return die3

            case 5:
                return die5

            default:
                return die6

        }
    }

    return (
        <div
            className="die-face"
            style={styles}
            onClick={props.holdDice}
        >
            <img src={getImage(props.value)} style={styles}></img>
            <h2 className="die-num"></h2>
        </div>
    )
}