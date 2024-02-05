import React, { useState } from 'react';

function ModThree() {
  const initialState = 'S0';
  const [inputString, setInputString] = useState('');
  const [currentState, setCurrentState] = useState(initialState);
  const [currentModValue, setCurrentModValue] = useState(null);
  const [error, setError] = useState(null);
  const transitions = { //110 1010
    'S0': {'0': 'S0', '1': 'S1'},
    'S1': {'0': 'S2', '1': 'S0'},
    'S2': {'0': 'S1', '1': 'S2'}
  };

  const processInput = () => {
    let statec = initialState;
    var digit = parseInt(inputString, 2);
    setCurrentModValue(digit%3)
    for (let char of inputString) {
      if (char !== '0' && char !== '1') {
        //alert("Input string should contain only '0's and '1's");
        setError("Invalid input. Please enter a binary value.")
        return;
      } else {
        setError(null)
      }
      console.log("==>",statec,char)
      statec = transitions[statec][char]
    }
    
    setCurrentState(statec);
  };

  const handleInputChange = (event) => {
    setInputString(event.target.value);
  };

  return (
    <div>
      <h1>Mod Three State Machine</h1>
      <div>
        <label htmlFor="inputString">Input Binary Value: </label>
        <input 
          type="text" 
          id="inputString" 
          value={inputString} 
          onChange={handleInputChange} 
        />
        <button onClick={processInput}>Process Input</button>
      </div>
      <div>
      
      {error!=null ? (
        <p>{error}</p>
      ) : (
        currentModValue !== null && (
          <div>
            <p>Output State Value: {currentState}</p>
            <p>Remainder Mod Three: {currentModValue}</p>
          </div>
        )
      )}
      </div>
    </div>
  );
}

export default ModThree;
