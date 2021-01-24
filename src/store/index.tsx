import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { GithubProfileReducer } from "./reducer/githubProfileReducer";
import { AddUserEpic } from "./epics/index";

const middleware = createEpicMiddleware();

export default createStore(
  GithubProfileReducer,
  composeWithDevTools(applyMiddleware(middleware))
);

middleware.run(AddUserEpic);
