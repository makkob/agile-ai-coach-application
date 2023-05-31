import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { dialogReducer } from "./reducers/dialogReducer";

let rootReducer = combineReducers({
  dialogState: dialogReducer,
});

const initialState = {
  dialogState: [],
};

const middleware = [thunk];

let store = createStore(
  rootReducer,
  initialState,

  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
