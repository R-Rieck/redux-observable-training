import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementIfOdd, incrementWithValueX } from "../store/epics/epic/counterEpic";
import { CounterState } from "../store/reducers/reducer/counterReducer";

export const CounterView = () => {
  const { counter } = useSelector((state: CounterState) => state);
  const dispatch = useDispatch();

  return (
    <>
      <button
        className="counter-view-increment-button"
        onClick={() => dispatch(incrementIfOdd)}
      >
        +1 (if odd)
      </button>
      <button
        className="counter-view-increment-button"
        onClick={() => dispatch(incrementWithValueX(5))}
      >
        +5
      </button>
      <div className="counter-view-count">counter: {counter}</div>
    </>
  );
};
