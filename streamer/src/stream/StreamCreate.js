import React from "react";
import { connect } from "react-redux";
import { createStream } from "../apis/requestActions";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
	onSubmit = (formValues) => {
		console.log("form values before submit: ", formValues);
		if (this.props.isSignedIn) {
			this.props.createStream({ ...formValues, uid: this.props.uid });
		}
	};

	render() {
		if (!this.props.isSignedIn) {
			return "You need to sign in";
		}
		return (
			<div>
				<h3>CREATE</h3>
				<StreamForm onSubmit={this.onSubmit} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log("create state", state)
	return {
		uid: state.changeSignInState.uinfo.uid,
		isSignedIn: state.changeSignInState.isSignedIn,
	};
};

const mapActionToProps = () => {
	return {
		createStream,
	};
};

export default connect(mapStateToProps, mapActionToProps())(StreamCreate);
