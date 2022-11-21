import React , { useState } from 'react';
import Main from "./Main";
import "./App.css";


type myType = {
  value: number
}


const App: React.FunctionComponent = () => {
  const [num , setNum] = useState<number>(0)

  const testFunc = (x: myType , y: myType): void => {
    setNum(prevNum => {
      return x.value + y.value + prevNum;
    });
  }


  return (
    <div className='app-div'>
      <button className="btn btn-lg btn-dark my-3" 
      onClick={() => testFunc({value : 10} , {value : 20})}>
        Click Me
      </button>
      <Main num={num} setNum={setNum} />
    </div>
  );
}

export default App;
