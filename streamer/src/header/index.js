import React from "react";
import { Segment, Grid, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import GoogleOAuth from "../OAuth/GoogleOAuth";
import { connect } from "react-redux";
import { select } from "./actions";

// https://console.developers.google.com/apis/credentials?clientUpdateTime=2020-04-17T01:27:06.672393Z&project=streamy-274501
// 894490370690-981f1ai3cdjhhnckiehp0e0qefhjmg14.apps.googleusercontent.com

const StreamHeader = (props) => {
	const onSelectHandler = (e) => {
		e.preventDefault();
		if (props.selected) props.selectModule(false);
		else props.selectModule(true);
	};

	return (
		<Segment raised>
			<Grid columns={2} stackable textAlign='center'>
				<Grid.Row verticalAlign='middle'>
					<Grid.Column>
						<Header
							textAlign="left"
							style={{
								backgroundColor: props.selected ? "aliceblue" : "transparent"
							}} onClick={onSelectHandler}>
							<Link to='/' >
								欢迎: {props.username}
							</Link>
						</Header>
					</Grid.Column>
					<Grid.Column>
						<Header textAlign="right">
							<GoogleOAuth />
						</Header>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Segment>
	);
};
const mapStateToProps = (state) => {
	return {
		username: state.changeSignInState.uinfo.username,
		selected: state.changeSelectState.selected
	};
};

export default connect(mapStateToProps, {
	selectModule: select
})(StreamHeader);
