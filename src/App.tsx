import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { pingpongstate } from "./store/reducers/reducer/pingPongReducer";
import { AddUser } from "./store/epics/epic/userEpics";
import { useState } from "react";
import { ProfileCard } from "./components/card";
import { GithubProfileState } from "./store/reducers/reducer/githubProfileReducer";

function App() {
  const [username, setUsername] = useState<string>("");
  const { items } = useSelector((state: GithubProfileState) => state);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1 className="fancy-title">RxJS 6 - Time to test</h1>
      <input
        className="fancy-searchbar"
        type="text"
        onChange={(e: any) => setUsername(e.target.value)}
      />
      <button
        className="fancy-button"
        onClick={() => dispatch(AddUser(username))}
      >
        Search{" "}
      </button>
      <div className="fancy-itemlist">
        {items && items?.length > 0
          ? items.map((profile) => (
              <ProfileCard key={profile.html_url} {...profile} />
            ))
          : null}
      </div>
    </div>
  );
}

export default App;
