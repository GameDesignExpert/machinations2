class Sink {
    draw(ctx, x, y) {
        ctx.beginPath();
        ctx.strokeStyle = '#660000';
        ctx.lineWidth = '2';
        ctx.fillStyle = '#AA0000'
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fill();
    }
}

export default new Sink();