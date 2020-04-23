import React from "react";
import { editSingleStream, fetchSingleStream } from "../apis/requestActions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
	componentDidMount() {
		this.props.fetchSingleStream(this.props.match.params.id);
	}

	onSubmit = (formValues) => {
		if (this.props.isSignedIn) {
			this.props.editSingleStream(this.props.stream.stream.id, formValues);
		}
	};

	render() {
		if (!this.props.isSignedIn) {
			return "You need to sign in and edit";
		}

		if (!this.props.stream.stream) {
			return <Link to='/'>nothing selected</Link>;
		}
		return (
			<div>
				<h3>
					EDIT {this.props.stream.stream ? this.props.stream.stream.title : ""}
				</h3>
				<StreamForm
					onSubmit={this.onSubmit}
					initialValues={{
						title: this.props.stream.stream
							? this.props.stream.stream.title
							: "",
						description: this.props.stream.stream
							? this.props.stream.stream.description
							: "",
					}}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	console.log("edit props", props);
	return {
		uid: state.changeSignInState.uinfo.uid,
		isSignedIn: state.changeSignInState.isSignedIn,
		stream: state.singleStream,
	};
};

const mapActionToState = () => {
	return {
		editSingleStream,
		fetchSingleStream,
	};
};

export default connect(mapStateToProps, mapActionToState())(StreamEdit);
