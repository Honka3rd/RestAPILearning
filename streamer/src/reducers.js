import { combineReducers } from "redux";
import { SIGN_IN, SIGN_OUT, FOCUSE_IN, FOCUSE_OUT } from "./types";
import { reducer as formReducer } from "redux-form";
import _ from "lodash";

import {
	CREATE_STREAM,
	FETCH_SINGLE_STREAM,
	FETCH_STREAMS,
	DELETE_STREAM,
	EDIT_STREAM,
	EDITED_STREAM,
} from "./types";

const INITIAL_STATE = {
	isSignedIn: null,
	uinfo: { uid: null, username: null },
};

const changeSignInState = (state = INITIAL_STATE, action) => {
	if (action.type === SIGN_IN) {
		return { ...state, isSignedIn: true, uinfo: action.payload };
	}

	if (action.type === SIGN_OUT) {
		return { ...state, isSignedIn: false, uinfo: action.payload };
	}
	return state;
};

const changeSelectState = (state = { selected: false }, action) => {
	if (action.type === FOCUSE_IN) {
		return { ...state, selected: true };
	}

	if (action.type === FOCUSE_OUT) {
		return { ...state, selected: false };
	}
	return state;
};

const handleRequest = (state = {}, action) => {
	switch (action.type) {
		case CREATE_STREAM:
			return { ...state, [action.payload.id]: action.payload };

		case EDIT_STREAM:
			return { ...state, [action.payload.id]: action.payload };

		case DELETE_STREAM:
			return { ...state, [action.payload]: undefined };

		case FETCH_STREAMS:
			return { ...state, ..._.mapKeys(action.payload, "id") };

		default:
			return state;
	}
};

const fetchSingleStream = (state = {stream:null}, action) => {
	if(action.type === FETCH_SINGLE_STREAM) {
		return { ...state, stream: action.payload };
	}
	return state;
}

export default combineReducers({
	changeSignInState,
	form: formReducer,
	changeSelectState,
	handleRequest,
	singleStream:fetchSingleStream
});
