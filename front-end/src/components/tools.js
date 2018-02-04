import React, { Component } from 'react';
import Tool from './tool';

export default class Tools extends Component {
    render() {
        let tools = this.props.tools.map((tool) => {
            let name = tool.constructor.name;
            return (
                <Tool tool={tool}
                    key={name}
                    active={this.props.activeTool === tool}
                    select={this.props.select} />
            );
        });

        return (
            <div className='Tools'>
                {tools}
            </div>
        )
    }
}