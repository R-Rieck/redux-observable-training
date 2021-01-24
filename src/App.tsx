import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { pingpongstate } from "./store/reducer";
import { AddUser } from "./store/epics/index";
import { useState } from "react";
import { ProfileCard } from "./components/card";
import { GithubProfileState } from "./store/reducer/githubProfileReducer";

function App() {
  const [username, setUsername] = useState<string>("");
  const { items } = useSelector((state: GithubProfileState) => state);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1 className="fancy-title">RxJS 6 - Time to test</h1>
      <button onClick={() => dispatch(AddUser(username))}>Pingen </button>
      <input type="text" onChange={(e: any) => setUsername(e.target.value)} />
      {items && items?.length > 0
        ? items.map((profile) => <ProfileCard key={ profile.html_url} {...profile} />)
        : null}
    </div>
  );
}

export default App;
