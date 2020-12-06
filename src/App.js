import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'
import axios from 'axios'
import {Button} from "./Button";

function App() {
  const imageStyles = {
    width: 400
  }
  const leftColumnStyles = {
    align: 'center',
    textAlign: 'center',
    float: 'left',
    width: '50%',
  }
  const rightColumnStyles = {
    align: 'center',
    textAlign: 'center',
    float: 'right',
    width: '50%',
  }
  const inputStyles = {
    width: 500,
    height: 50,
    borderRadius: 25
  }
  const resultStyles = {
    textAlign: 'left',
    fontSize: 30
  }
  const titleStyles = {
    textAlign: 'center',
    fontSize: 50
  }
  const wholePageStyles = {
    backgroundColor:'#444444'
  }
  const confStyles = {
    textAlign: 'left',
  }
  const [imageUrl, setImageUrl] = useState('')
  const [text, setText] = useState('')
  const [preds, setPreds] = useState('')
  const [conf,setConf] = useState(0)
  return (
    <div>
      <div style={titleStyles}>
        Passenger Jet Classifier
      </div>
      <div className={'row'}>
        <div className={'column'} style={leftColumnStyles}>
          Supported Passenger Jet Types:
          <div>Airbus:</div>
          <div>A320</div>
          <div>A330</div>
          <div>A340</div>
          <div>A350</div>
          <div>A380</div>
          <div>Boeing:</div>
          <div>717</div>
          <div>737</div>
          <div>747</div>
          <div>757</div>
          <div>767</div>
          <div>777</div>
          <div>787</div>
        </div>
        <div className={'column'} style={rightColumnStyles}>
          {imageUrl.length > 1 ?
            <img src={imageUrl} alt={'image of plane'} style={imageStyles}/>
            : null}
          <div>
            <input placeholder={'Paste an image link here'} style={inputStyles} type={'text'} onChange={(event) => {
              setText(event.target.value)
            }} value={text}/>
          </div>
          <div>
            <Button onClick={async () => {
              const newPreds = (await axios.post('http://207.148.25.204:5894/classify', {url: text})).data
              setPreds(newPreds.pred)
              setText('')
              setImageUrl(text)
              setConf(newPreds.conf)
            }} text={'Classify'}/>
          </div>
          <div style={resultStyles}>
            {preds.startsWith('7')?'Boeing '+preds:preds.startsWith('a')?'Airbus '+preds.toUpperCase():null}
          </div>
          <div style={confStyles}>
            {conf?JSON.stringify(Math.floor(conf*100))+'% Confidence':null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
