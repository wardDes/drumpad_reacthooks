import React, { useState } from 'react';
import './App.css';

const bankOne = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'whoosh',
  url: './sounds/whoosh.mp3'
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'camera_sutter',
  url: './sounds/camera_shutter.mp3'
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'doorbell',
  url: './sounds/doorbell.mp3'
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'bottle_opening',
  url: './sounds/bottle_opening.mp3'
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'buzzer',
  url: './sounds/buzzer.mp3'
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'high_beep',
  url: './sounds/high_beep.mp3'
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: 'bah_boom',
  url: './sounds/bah_boom.mp3'
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'gun_cock',
  url: './sounds/gun_cock.mp3'
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'lightsaber',
  url: './sounds/lightsaber.mp3'
}];

const bankTwo = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'frog',
  url: './sounds/frog.mp3'
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'squeeze_toy',
  url: './sounds/squeeze_toy.mp3'
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'drumroll',
  url: './sounds/drumroll.mp3'
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'record_scratch',
  url: './sounds/record_scratch.mp3'
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'plastic_slide',
  url: './sounds/plastic_slide.mp3'
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'bell_ding',
  url: './sounds/bell_ding.mp3'
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: 'karate_kick',
  url: './sounds/karate_kick.mp3'
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'horn_screech',
  url: './sounds/horn_screech.mp3'
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'wiff',
  url: './sounds/wiff.mp3'
}];

const App = props =>  {
      
  const [state, setState] =useState({
    power: true,
    display: String.fromCharCode(160),
    currentPadBank: bankOne,
    currentPadBankId: 'Toon1 Sounds',
    sliderVal: 0.3
  })

  // const [power, setPower] = useState(true);
  // const [dislay, setDislay] = useState(String.fromCharCode(160))
  // const [currentPadBank, setCurrentPadBank] = useState(bankOne)
  // const [currentPadBankId, setCurrentPadBankId] = useState('Toon1 Sounds')
  // const [slideVal, setSlideVal] = useState(0.3)

  const powerControl = () => {
    setState({...state, power:!state.power})
    setState({...state, display: state.display = String.fromCharCode(160)})
  }

  const selectBank = () => {
    if(state.power){
      state.currentPadBankId === 'Toon1 Sounds' ?
        setState({
          ...state,
          currentPadBank: bankTwo,
          display: 'Toon2 Sounds',
          currentPadBankId: 'Toon2 Sounds'
        }):
        setState({
          ...state,
          currentPadBank: bankOne,
          display:'Toon1 Sounds',
          currentPadBankId: 'Toon1 Sounds'
        })
    }
  }

  const displayClipName = (name) => {
    if(state.power){
      setState({
        ...state,
        display: name
      })
    }
  }

  const adjustVolume = (e) => {
    if(state.power){
      setState({...state, sliderVal: e.target.Value})
      setState({
        ...state,
        display:`Volume: ${Math.round(e.target.Value * 100)}`
      })
    setTimeout(() => clearDisplay(), 1000)
    }
  }


  const clearDisplay = () => {
    setState({
      ...state,
      display: String.fromCharCode(160)
    })
  }

  const powerSlider = state.power ? { float: 'right'} : { float: 'left'}
  const bankSlider = state.currentPadBank ? { float: 'right'} : { float: 'left'}

  {
    const clips = [].slice.call(document.getElementsByClassName('clip'))
    clips.forEach(sound => {
      sound.volume = state.sliderVal
    })
  }

  return (
    <div id="drum-machine" className="App">
      <Padbank 
        power={state.power}
        updateDisplay={displayClipName}
        clipVolume={state.sliderVal}
        currentPadBank={state.currentPadBank}
      />

      <div className="logo">
        <div className="inner-logo">{`FCC ${String.fromCharCode(160)}`}</div>
        <i className="inner-logo fa fa-free-code-camp" />
      </div>

      <div className="controls-container">

        <div className="control">
          <p>Power</p>
          <div onClick={powerControl} className="select">
            <div style={powerSlider} classNamme="inner" />
          </div>
        </div>
        <p id="display">
          {state.display}
        </p>
        <div className="volume-slider">
          <input 
                type="range"
                min="0" max="1" 
                step="0.01" 
                value={state.sliderVal} 
                onChange={adjustVolume} />
        </div>
        <div className="control">
          <p>Bank</p>
          <div onClick={selectBank} className="select">
            <div style={bankSlider} className="inner" />
          </div>
        </div>
      </div>
   
    </div>
  );
}

export default App;
