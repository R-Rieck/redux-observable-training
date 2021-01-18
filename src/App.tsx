import { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { pingpongstate } from "./store/reducer";
import { StartPingSwitch } from "./store/actions/index";

function App() {
  const { isPinging } = useSelector((state: pingpongstate) => state);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <button onClick={() => dispatch(StartPingSwitch)}>Pingen </button>
      <h2> ist am Pingen: {isPinging.toString()} </h2>
    </div>
  );
}

export default App;
