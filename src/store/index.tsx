import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { pingpongReducer } from "./reducer/index";
import { PingSwitchEpic } from "./epics/index";

const middleware = createEpicMiddleware();

export default createStore(
  pingpongReducer,
  composeWithDevTools(applyMiddleware(middleware))
);

middleware.run(PingSwitchEpic);
