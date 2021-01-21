import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { pingpongstate } from "./store/reducer";
import { StartPingSwitch } from "./store/actions/index";
import {
  basicBlockBuilding,
  ofValue,
  nonProductionValues,
  foreachAsLoop,
  fromValue,
  ajaxRequest,
  subjectAsObservable,
  tapOperator,
  filterOperator,
  takeOperators,
  scanAndReduceOperator,
  pairwiseOperator,
  mapConcatMapSwitchMapOperator
} from "./rxjs/index";
import { fromEvent } from "rxjs";

function App() {
  const btn = useRef<any>(null);
  const test: any = document.getElementById("root");

  useEffect(() => {
    btn?.current?.addEventListener("click", () => mapConcatMapSwitchMapOperator());
    // fromEvent(btn?.current, 'click').subscribe(e => console.log(e))
    // fromEvent(test, 'mousemove').subscribe((e:any) => console.log(e.offsetX))
  }, []);

  return (
    <div className="App">
      <h1 className="fancy-title">RxJS 6 - Time to test</h1>
      <button className="fancy-button" ref={btn}>
        click me to see fancy stuff in the developer console
      </button>
    </div>
  );
}

// const { isPinging } = useSelector((state: pingpongstate) => state);
// const dispatch = useDispatch();

{
  /* <button onClick={() => dispatch(StartPingSwitch)}>Pingen </button>
    <h2> ist am Pingen: {isPinging.toString()} </h2> */
}
export default App;
