import React from 'react';
import _ from 'lodash';
import axios from 'axios';


export default class SubscribeForm extends React.Component {
		constructor(props){
			super(props)
			this.state = {
				email: '',
		 }
		}
		changeHandler = (e) => {
			this.setState({[e.target.name] : e.target.value})
		}

    render() {
        const formAction = _.get(this.props, 'action');
        const formId = 'subscribeForm';
        const formHoneypotInputId = formId + '-honeypot';
        const formHoneypotLabelId = formId + '-honeypot-label';
        const formHoneypotName = formId + '-bot-field';
				const onSubmit = (e) => {
					const url = 'https://sheet.best/api/sheets/5fe712db-803b-4bc0-ab61-0af6b667a9ac';
					console.log(this.state);
					axios.post(url, this.state).then((response) => {
							console.log(response);
					});

					console.log('sumbitted');
			};

        return (
            <form
                name={formId}
                id={formId}
                className="subscribe-form"
                {...(formAction ? ({ action: formAction }) : null)}
                method="POST"
                data-netlify="true"
                data-netlify-honeypot={formHoneypotName}
								onSubmit={onSubmit}
            >
                <div className="screen-reader-text">
                    <label id={formHoneypotLabelId} htmlFor={formHoneypotInputId}>
                        Don't fill this out if you're human: 
                        <input aria-labelledby={formHoneypotLabelId} id={formHoneypotInputId} name={formHoneypotName} />
                    </label>
                </div>
                <input type="hidden" name="form-name" value={formId} />
                <div className="form-group">
                    <label>
                        <span className="screen-reader-text">Email address</span>
                        <input 
												onChange={this.changeHandler}
												value={this.state.email} 
												type="email" name="email" placeholder="Your email address" required />
                    </label>
                </div>
                <button className="button" type="submit">Subscribe</button>
            </form>
        );
    }
}
