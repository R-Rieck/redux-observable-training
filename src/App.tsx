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
  pollingAjaxRequest
} from "./rxjs/index";
import { Profile, ProfileCard } from "./components/card";

function App() {
  const btn = useRef<any>(null);
  const search = useRef<HTMLInputElement | null>(null);
  const [profiles, setProfiles] = useState([])
  const [imageUrl, setImageUrl] = useState("")
  
  useEffect(() => {
    if (search && search.current) incrementalSearch(search?.current).subscribe((elements:any) => setProfiles(elements.items));
  }, [search]);

  return (
    <div className="App">
      <h1 className="fancy-title">RxJS 6 - Time to test</h1>
      {/* <button
        className="fancy-button"
        ref={btn}
        onClick={() => pairwiseOperator()}
      >
        click me to see fancy stuff in the developer console
      </button>
      {imageUrl.length > 0 ?
        < img src={imageUrl} height="200" width="200"></img> : 
        null
      } */}
      <input
        type="text"
        name=""
        ref={search}
        id=""
      />
      <h2 style={{color: 'white'}}>{ `${profiles.length} results`}</h2>
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
