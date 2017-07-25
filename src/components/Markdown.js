import React  from 'react';
import marked from 'marked';


export default class Markdown extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            result: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.formatText   = this.formatText.bind(this);
    }

    render() {
        return (
            <div>
                <div className="input">
                    <textarea
                        onChange={this.handleChange}
                        name="textarea"
                        value={this.state.value}>
                    </textarea>
                </div>
                <div
                    className="result"
                    dangerouslySetInnerHTML = {this.formatText()}></div>
            </div>
        );
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    formatText() {
        return {__html: marked(this.state.value)}
    }
}
