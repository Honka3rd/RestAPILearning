import streams from "./stream";
import history from "../history";
import {
	CREATE_STREAM,
	FETCH_SINGLE_STREAM,
	FETCH_STREAMS,
	DELETE_STREAM,
	EDIT_STREAM,
} from "../types";

export const createStream = (formValues) => {
	console.log("request actor: ", formValues);
	return async (dispatch) => {
		const response = await streams.post("/streams", formValues);
		console.log("create", response);
        dispatch({ type: CREATE_STREAM, payload: response.data });
        history.push("/");
        // "or"
        //history.replace("/");
	};
};

export const fetchStreams = () => {
	return async (dispatch) => {
		const response = await streams.get("/streams");
		console.log("fetch all", response.data);
		dispatch({ type: FETCH_STREAMS, payload: response.data });
	};
};

export const fetchSingleStream = (id) => {
	return async (dispatch) => {
		const response = await streams.get(`/streams/${id}`);
		console.log("fetch single", response.data);
		dispatch({ type: FETCH_SINGLE_STREAM, payload: response.data });
	};
};

export const deleteSingleStream = (id) => {
    return async (dispatch) => {
        const response = await streams.delete(`/streams/${id}`);
        console.log("delete single", response.data);
        dispatch({ type: DELETE_STREAM, payload: id });
    }
}

export const editSingleStream = (id, formValues) => {
    return async (dispatch) => {
        const response = await streams.patch(`/streams/${id}`, formValues);
        console.log("edit single", response.data);
        dispatch({ type: EDIT_STREAM, payload: response.data });
        history.push("/");
    }
}
