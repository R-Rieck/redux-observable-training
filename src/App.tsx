import "./App.css";
import { GithubProfileView } from "./views/githubProfileListVIew";
import { CounterView } from "./views/counterView";

function App() {
  return (
    <div className="App">
      <h1 className="fancy-title">RxJS 6 - Time to test</h1>
      {/* <GithubProfileView/> */}
      <CounterView />
    </div>
  );
}

export default App;
