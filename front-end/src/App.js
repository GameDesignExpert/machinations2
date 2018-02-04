import React, { Component } from 'react';
import Workspace from './components/workspace';
import Tools from './components/tools';

import sink from './tools/sink';
import source from './tools/source';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.selectTool = this.selectTool.bind(this);
    this.workspaceClick = this.workspaceClick.bind(this);

    this.state = {
      activeTool: source,
      objs: []
    }
  }
  render() {
    return (
      <div className="App">
        <Workspace id='workspace' 
          width='800' 
          height='600' 
          activeTool={this.state.activeTool}
          onClick={this.workspaceClick}
          objects={this.state.objs} />
        <Tools tools={[source, sink]} activeTool={this.state.activeTool} select={this.selectTool} />
      </div>
    );
  }

  selectTool(tool, e) {
    this.setState({
      activeTool: tool
    })
  }

  workspaceClick(pos, e) {
    let newObj = {
      tool: this.state.activeTool,
      x: pos.x,
      y: pos.y
    };

    this.setState((s) => {
      return {objs: s.objs.concat(newObj)}
    })
  }
}

export default App;
