import React from "react";
import { connect } from "react-redux";
import { fetchStreams, deleteSingleStream } from "../apis/requestActions";
import { Table, Button } from "semantic-ui-react";
import history from "../history";

class StreamList extends React.Component {
	componentDidMount() {
		// must render this page, then the store will be fulfilled with data
		// directly render other page will reference undefined property inside redux
		this.props.fetchStreams();
	}

	renderDeleteBtn = (uid, streamId) => {
		console.log(this.props.uid, uid);
		if (this.props.uid === uid && this.props.isSignedIn) {
			return (
				<Button negative onClick={() => this.onDelete(streamId)}>
					Delete
				</Button>
			);
		}
		return "no permission";
	};

	onDelete = (id) => {
		this.props.deleteSingleStream(id);
	};

	renderEditBtn = (id, streamId) => {
		if (this.props.uid === id && this.props.isSignedIn) {
			return (
				<Button
					primary
					onClick={() => this.onEdit(streamId)}>
					Edit
				</Button>
			);
		}
		return "no permission";
	};

	onEdit = (streamId) => {
		history.push("/edit/" + streamId);
	};

	renderCreateBtn = (id) => {
		if (this.props.uid === id && this.props.isSignedIn) {
			return (
				<Button secondary style={{ float: "right" }} onClick={this.onCreate}>
					Create Stream
				</Button>
			);
		}
		return null;
	};

	onCreate = () => {
		this.props.history.replace("/create");
	};

	renderRows = () => {
		return this.props.streams.map((stream) => {
			if (!stream) {
				return null;
			}
			const id = stream.id;
			return (
				<Table.Row key={id}>
					<Table.Cell>{id}</Table.Cell>
					<Table.Cell>{stream.title}</Table.Cell>
					<Table.Cell>{stream.description}</Table.Cell>
					<Table.Cell>{this.renderDeleteBtn(this.props.uid, id)}</Table.Cell>
					<Table.Cell>{this.renderEditBtn(this.props.uid, id)}</Table.Cell>
				</Table.Row>
			);
		});
	};

	render() {
		return (
			<div>
				<Table celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>ID</Table.HeaderCell>
							<Table.HeaderCell>TITLE</Table.HeaderCell>
							<Table.HeaderCell>DESCRIPTION</Table.HeaderCell>
							<Table.HeaderCell>Deletion</Table.HeaderCell>
							<Table.HeaderCell>Updation</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>{this.renderRows()}</Table.Body>
				</Table>
				<br />
				{this.renderCreateBtn(this.props.uid)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	// take object values and pack them as a string
	console.log("stream list", Object.values(state.handleRequest));
	return {
		streams: Object.values(state.handleRequest),
		uid: state.changeSignInState.uinfo.uid,
		isSignedIn: state.changeSignInState.isSignedIn,
	};
};

const mapActionToProps = () => {
	return {
		fetchStreams,
		deleteSingleStream,
	};
};

export default connect(mapStateToProps, mapActionToProps())(StreamList);
