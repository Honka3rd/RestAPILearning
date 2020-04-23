import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import thunk from "redux-thunk";
import { applyMiddleware, compose } from "redux";
import Main from "./main";
import BoundledReducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

ReactDOM.render(
	<Provider
		store={createStore(
			BoundledReducers,
			composeEnhancers(applyMiddleware(thunk))
		)}>
		<Main />
	</Provider>,
	document.getElementById("root")
);
