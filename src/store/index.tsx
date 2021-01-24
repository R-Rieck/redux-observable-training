import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import rootReducer from "./reducers/index";
import defaultEpic from './epics/index'

const middleware = createEpicMiddleware();

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(middleware))
);

middleware.run(defaultEpic);
