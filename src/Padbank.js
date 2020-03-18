import React from 'react'
import DrumPad from './DrumPad'

const Padbank = props => {

    let padBank;

    props.power ? 
        padBank = props.currentPadBank.map((drumObj, i , padBankArr) => {
            return (
                <DrumPad
                    key={padBankArr[i].id}
                    clipId = {padBankArr[i].id}
                    clip={padBankArr[i].url}
                    keyTrigger={padBankArr[i].keyTrigger}
                    keyCode={padBankArr[i].keyCode}
                    updateDisplay={props.updateDisplay}
                    power={props.power} />
            )
        }) :
        padBank = props.currentPadBank.map((drumObj, i , padBankArr) => {
            return (
                <DrumPad
                    clipId = {padBankArr[i].id}
                    clip="#"
                    keyTrigger={padBankArr[i].keyTrigger}
                    keyCode={padBankArr[i].keyCode}
                    updateDisplay={props.updateDisplay}
                    power={props.power} />
            )
        })
    return (
        <div className="pad-bank">
            {padBank}
        </div>
    )
}

export default Padbank