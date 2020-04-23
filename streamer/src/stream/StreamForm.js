import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input, Button, Form, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

class StreamForm extends React.Component {

	renderError = (meta) => {
		console.log(meta);
		if (meta.touched && meta.error) {
			return <div style={{ color: "red" }}>{meta.error}</div>;
		}
	};

	renderInput = ({ input, label, meta }) => {
		console.log("input tag attributes: ", input);
		console.log("errors", meta);
		return (
			<div>
				<Input {...input} label={label} autoComplete='off' />
				<div>{this.renderError(meta)}</div>
			</div>
		);
	};

	onSubmit = (formValues) => {
        // expect a callback inside props
        // pass what ever value inside form
        console.log(formValues)
		this.props.onSubmit(formValues);
	};

	render() {
		console.log("form attributes: ", this.props);
		return (
			<Segment>
				<Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
					<Form.Field>
						<Field name='title' component={this.renderInput} label='TITLE' />
					</Form.Field>
					<Form.Field>
						<Field
							name='description'
							component={this.renderInput}
							label='DESCRIPTION'
						/>
					</Form.Field>
					<Button primary>Submit</Button>

					<Link to='/'>Back</Link>
				</Form>
			</Segment>
		);
	}
}

const validate = (formValues) => {
	console.log("before validate: ", formValues);
	const errors = {};

	if (!formValues.title) {
		errors.title = "title cannot leave empty";
	}

	if (!formValues.description) {
		errors.description = "description cannot leave empty";
	}

	return errors;
};

export default reduxForm({ form: "streamForm", validate })(StreamForm);


