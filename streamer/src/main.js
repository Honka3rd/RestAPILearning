import React from "react";
import {
	Route,
	Router,
	/* HashRouter,
	MemoryRouter,
	Link */
} from "react-router-dom";
import history from "./history";
import Header from "./header";
import StreamCreate from "./stream/StreamCreate";
import StreamList from "./stream/StreamList";
import StreamEdit from "./stream/StreamEdit";

const main = () => {
	return (
		<div>
			<Router history={history}>
				<Header />
				<Route path='/' exact component={StreamList}></Route>
				<Route path='/edit/:id' exact component={StreamEdit}></Route>
				<Route path='/create' exact component={StreamCreate}></Route>
			</Router>
		</div>
	);
};

export default main;
