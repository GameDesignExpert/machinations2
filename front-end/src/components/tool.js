import React, {Component} from 'react';

export default class Tool extends Component {
    render() {
        return (
            <button 
                className={`Tool ${this.props.active?'active':''}`} 
                onClick={(e) => this.props.select(this.props.tool, e)}>
                {this.props.tool.constructor.name}
            </button>
        )
    }
}