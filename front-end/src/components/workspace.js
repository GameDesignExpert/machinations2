import React, {Component} from 'react';

export default class Workspace extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onDown = this.onDown.bind(this);
        this.onMove = this.onMove.bind(this);
    }

    render() {
        return (
        <canvas 
            id={this.props.id} 
            width={this.props.width} 
            height={this.props.height}
            onClick={this.onClick}
            onMouseDown={this.onDown}
            onMouseMove={this.onMove}
            ref={(c) => { this.canvas = c; }} />
        );
    }

    componentDidMount() {
        this.ctx = this.canvas.getContext('2d');
        this.drawGrid();
        this.drawObjects();
        this.drawTool();
    }

    componentDidUpdate(prevProps, prevState) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight);
        this.drawGrid();
        this.drawObjects();
        this.drawTool();
    }

    drawGrid() {
        let spacing = 20;
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#EEEEEE';
        this.ctx.lineWidth = 1;
        //this.ctx.lineWidth = '2';
        for(let x = spacing; x < this.props.width; x += spacing) {    
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.ctx.canvas.clientHeight);
            for(let y = spacing; y < this.props.height; y += spacing) {
                this.ctx.moveTo(0, y);
                this.ctx.lineTo(this.ctx.canvas.clientWidth, y);
            }
        }
        this.ctx.stroke();

        this.ctx.fillStyle = '#AAAAAA';
        for(let x = spacing; x < this.props.width; x += spacing) {    
            for(let y = spacing; y < this.props.height; y += spacing) {
                this.ctx.fillRect(x-1, y-1, 2, 2);
            }
        }
    }

    drawObjects() {
        this.props.objects.forEach((obj) => {
            obj.tool.draw(this.ctx, obj.x, obj.y);
            if(obj === this.state.selectedObject) {
                this.ctx.strokeStyle = "#000000";
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(obj.x - 10, obj.y -10, 20, 20);
            }
        })
    }

    drawTool() {
        if(!this.props.activeTool)
        {
            return;
        }
        
        this.ctx.fillStyle = '#000000';
        this.ctx.font = '18px sans-serif';
        this.ctx.fillText(this.props.activeTool.constructor.name, 10, this.ctx.canvas.clientHeight - 20);
    }

    onClick(e) {
        let pos = this.getLocalPosition(e);
        if(!this.state.selectedObject) {
            this.props.onClick(pos, e);
        }
    }

    onDown(e) {
        let pos = this.getLocalPosition(e);
        let objs = this.findObjects(pos.x, pos.y);

        this.setState({
            selectedObject: objs.length > 0?objs[0]:null
        });

        console.log('onDown');
    }

    onMove(e) {
        if((e.buttons & 1) && this.state.selectedObject) {
            console.log('onMove');
            let pos = this.getLocalPosition(e);
            let obj = this.state.selectedObject;
            obj.x = pos.x;
            obj.y = pos.y;
            this.forceUpdate();
        }
    }

    getLocalPosition(e) {
        let rect = this.ctx.canvas.getBoundingClientRect();

        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
    }

    findObjects(x, y, precision = 10) {
        let objs = this.props.objects.filter((obj) => {
            return (Math.abs(x - obj.x) < precision && Math.abs(y - obj.y) < precision);
        });

        return objs.sort((a, b) => {
            return ((Math.pow(x - a.x, 2) + Math.pow(y - a.y, 2)) - (Math.pow(x - b.x, 2) + Math.pow(y - b.y, 2)));
        });
    }
}