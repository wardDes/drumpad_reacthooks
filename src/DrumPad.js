import React, { useState, useEffect, useCallback } from 'react'

const activeStyle = {
    backgroundColor: 'orange',
    boxShadow: "0 3px orange",
    height: 77,
    marginTop: 13
  }
   
  const inactiveStyle = {
    backgroundColor: 'grey',
    marginTop: 10,
    boxShadow: "3px 3px 5px black"
  }


const DrumPad = props => {

    const [padStyle, setPadStyle] = useState(inactiveStyle)
    
    // const myCallBack = useCallback(playSound, [])

    // const playSound = (event) => {
    //     const sound = document.getElementById(props.keyTrigger)
    //     sound.currentTime = 0;
    //     sound.play()
    //     activatePad();
    //     setTimeout(() => activatePad(), 100)
    //     props.updateDisplay(props.clipId.replace(/_/g, ' '))
    // }

    const activatePad = useCallback( () => {
        if(props.power){
            padStyle.backgroundColor === 'orange' ?
                setPadStyle({
                    padStyle: inactiveStyle
                }) :
                setPadStyle({
                    padStyle: activeStyle
                })
        } else {
            padStyle.marginTop === 13 ?
                setPadStyle({
                    padStyle: inactiveStyle
                }) :
                setPadStyle({
                    padStyle: {
                        height: 77,
                        marginTop: 13,
                        backgroundColor: 'grey',
                        boxShadow: "0 3px grey"
                    }
                })
        }
    },[props, padStyle.backgroundColor, padStyle.marginTop])

    const playSound = useCallback(event => {
        
        const sound = document.getElementById(props.keyTrigger)
        sound.currentTime = 0;
        sound.play()
        activatePad();
        setTimeout(() => activatePad(), 100)
        props.updateDisplay(props.clipId.replace(/_/g, ' '))
    }, [activatePad, props])

   

    // Todo: add keyPress event listener and handler with useEffect and
    // useCallb
    const handleKeyPress = useCallback(event => {
        const { keyCode } = event

        if (keyCode === props.keyCode) {
            playSound();
        }
    },[playSound, props.keyCode])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress)

        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }
    },[handleKeyPress])

    

    return (
        <div 
            id={props.clipId}
            onClick={playSound}
            className="drum-pad"
            style={padStyle}>
                <audio 
                    className="clip"
                    id={props.keyTrigger}
                    src={props.clip} />
            {props.keyTrigger}
        </div>
    )
}

export default DrumPad