import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { pingpongstate } from "./store/reducer";
import { Ping } from "./store/actions/index";

function App() {
  const { isPinging } = useSelector((state: pingpongstate) => state);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1 className="fancy-title">RxJS 6 - Time to test</h1>

      <button onClick={() => dispatch(Ping)}>Pingen </button>
      <h2 style={{color: 'whitesmoke'}}> ist am Pingen: {isPinging.toString()} </h2>
    </div>
  );
}

export default App;
