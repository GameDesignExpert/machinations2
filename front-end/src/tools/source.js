class Source {
    draw(ctx, x, y) {
        ctx.beginPath();
        ctx.strokeStyle = '#006600';
        ctx.lineWidth = '2';
        ctx.fillStyle = '#00AA00'
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fill();
    }
}

export default new Source();