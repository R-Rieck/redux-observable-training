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
  mapConcatMapSwitchMapOperator,
  filterExmapleOfSwitchMap,
  startWithOperator,
  customOperator,
  errorHandling,
  RequestWithRetryAndRetryWhen,
  incrementalSearch,
} from "./rxjs/index";
import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";
import {
  EventTargetLike,
  FromEventTarget,
} from "rxjs/internal/observable/fromEvent";
import { profile } from "console";
import { Profile, ProfileCard } from "./components/card";

function App() {
  const btn = useRef<any>(null);
  const search = useRef<HTMLInputElement | null>(null);
  const test: any = document.getElementById("root");
  const [profiles , setProfiles] = useState([])
  const [el, setEl] = useState<string>("");

  useEffect(() => {
    if (search && search.current) incrementalSearch(search?.current).subscribe(elements => setProfiles(elements.items));
  }, [search]);

  return (
    <div className="App">
      <h1 className="fancy-title">RxJS 6 - Time to test</h1>
      <button
        className="fancy-button"
        ref={btn}
        // onClick={() => RequestWithRetryAndRetryWhen()}
      >
        {/* click me to see fancy stuff in the developer console */}
        add filter to queue
      </button>
      <input
        type="text"
        name=""
        ref={search}
        id=""
        // onChange={(el) => incrementalSearch(el.target.value)}
      />
      {profiles?.map((element: Profile) => (
        <ProfileCard key={ element.html_url}{...element}></ProfileCard>
       ))}
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
