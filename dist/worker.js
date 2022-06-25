function polygon(){
    const canvas = new OffscreenCanvas(100, 1);
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    if (pts.length > 0){
        ctx.moveTo(Number(pts[0][0]+xof || 0),Number(pts[0][1]+yof));
    }
    for (let i = 1; i < pts.length; i++){
        ctx.lineTo(pts[i][0]+xof,pts[i][1]+yof);
    }
    if (fil){
        ctx.fillStyle = col;
        ctx.fill();
    }
    if (str){
        ctx.lineWidth = lineWidth;
        ctx.lineJoin = "round";
        ctx.strokeStyle = col;
        ctx.stroke();
    }
}