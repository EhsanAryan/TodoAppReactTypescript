import React , { useRef } from "react";
import "./Main.css"

type funcType = (value: number) => number;

type propsType = {
    num : number ,
    setNum : (value: number | funcType) => void
}

const Main: React.FunctionComponent<propsType> = (props) => {
    const myRef = useRef<HTMLDivElement>(null);

    const resetNum = (): void => {
        props.setNum(prevVal => 0);
        const color: string = myRef.current!.style.color;
        myRef.current!.style.color = color === "white" || color === "" ? "red" : "white";
    }

  return (
    <div className="show-result-div rounded-4 fs-1" ref={myRef}>
        {props.num}
        <button type="button" className="btn btn-lg btn-danger mt-4 mb-2"
        onClick={resetNum} >
            Reset
        </button>
    </div>
  )
}

export default Main;