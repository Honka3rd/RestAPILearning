import React from "react";
import { Button } from "semantic-ui-react";
import { signIn, signOut } from "../OAuth/actions";
import { connect } from "react-redux";

const CLIENT_ID =
	"797401886567-9cumct9mrt3v2va409rasa7fa6fq02hh.apps.googleusercontent.com";
class GoogleOAuth extends React.Component {
	constructor() {
		super();
		this.auth = null;

		// bad design:
		// critical token is not centrally accessiable
		// do not know user is signin or not
		/* this.state = {
			isSignedIn: null
		}; */
	}

	componentDidMount() {
		if (window.gapi && window.gapi.load) {
			window.gapi.load("client:auth2", () => {
				window.gapi.client
					.init({
						clientId: CLIENT_ID,
						scope: "email"
					})
					.then(() => {
						this.auth = window.gapi.auth2.getAuthInstance();
						this.onAuthChange(this.auth.isSignedIn.get());
						this.auth.isSignedIn.listen(this.onAuthChange);
					});
			});
		}
	}

	onAuthChange = (isSignedIn) => {
		const uid = window.gapi.auth2
			.getAuthInstance()
			.currentUser.get()
			.getId();
			
		let username = "";
		if (
			window.gapi.auth2
				.getAuthInstance()
				.currentUser.get()
				.getBasicProfile()
		) {
			username = window.gapi.auth2
				.getAuthInstance()
				.currentUser.get()
				.getBasicProfile()
				.getName();
		}

		switch (isSignedIn) {
			case true:
				this.props.signIn(uid, username);
				break;
			case false:
				this.props.signOut(uid);
				break;
		}
	};

	// actual sign in funtion, hooked with button
	signInOnClickhandler = () => {
		this.auth.signIn();
	};

	signOutOnClickhandler = () => {
		this.auth.signOut();
	};

	renderAuthButton() {
		switch (this.props.isSignedIn) {
			case true:
				return (
					<Button
						onClick={this.signOutOnClickhandler}
						icon='google'
						content='Sign out'
						labelPosition='left'
						size='big'
						negative></Button>
				);
			case false:
				return (
					<Button
						onClick={this.signInOnClickhandler}
						icon='google'
						content='Sign in'
						labelPosition='left'
						size='big'></Button>
				);
			default:
				return <div>Pendding...</div>;
		}
	}

	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.changeSignInState.isSignedIn,
		uid: state.changeSignInState.uinfo.uid
	};
};

// for dom changing only
const mapActionToProps = () => {
	return {
		signIn,
		signOut
	};
};

export default connect(mapStateToProps, mapActionToProps())(GoogleOAuth);
