import { Layer } from "./app/layer.js";
import { Util } from "./app/util.js";
import { Noise } from "./app/noise.js";
import { Filter } from "./app/filter.js";
export class Drawable {

    layers = [];

    FILTERING_ENABLED = true;

    constructor(w,h) {

        this.CANVAS_WIDTH = w;
        this.CANVAS_HEIGHT = h;
        
        this._ctx = new Layer(w,h); 
    }

    set filtering_enabled(bool) {
        this.FILTERING_ENABLED = bool;
    }

    set width(w) {
        this.CANVAS_WIDTH = w;
        this.canvas.width = w;
    }

    get width() {
        return this.CANVAS_WIDTH;
    }

    get height() {
        return this.CANVAS_HEIGHT;
    }

    set height(h) { 
        this.CANVAS_HEIGHT = h;
        this.canvas.height = h;
    }

    get canvas() {
        return this.ctx.canvas;
    }

    get ctx() {
        return this._ctx
    }

    set containerElementId(element) {
        this._append_to = element;
    }

    get containerElementId() {
        return this._append_to;
    }

    position(layer0, layer1, xExtra = 0, yExtra = 0, blend1 = "normal", blend2 = "hard-light") {
        let b1 = Layer.boundingBox(layer0)
        let b2 = Layer.boundingBox(layer1)
        let bd = {
            xmin:Math.min(b1.xmin,b2.xmin),
            xmax:Math.max(b1.xmax,b2.xmax),
            ymin:Math.min(b1.ymin,b2.ymin),
            ymax:Math.max(b1.ymax,b2.ymax),
            cWidth: this.ctx.canvas.width,
            cHeight: this.ctx.canvas.height
        }
        
        let boundingWidth = bd.xmax - bd.xmin
        let boundingHeight = bd.ymax - bd.ymin

        let xref = (bd.cWidth/2 - boundingWidth/2) - (this.xof -  boundingWidth/2)
        let yref = (bd.cHeight/2 - boundingHeight/2) - bd.ymin/2

        Layer.blit(this.ctx,layer0,{ble:blend1,xof:xref  + xExtra,yof:yref + yExtra})
        Layer.blit(this.ctx,layer1,{ble:blend2,xof:xref + xExtra,yof:yref + yExtra})

    }

    polygon(args){
        args =(args != undefined) ? args : {};
        let ctx = (args.ctx != undefined) ? args.ctx : CTX;
        let xof = (args.xof != undefined) ? Number(args.xof) : 0;  
        let yof = (args.yof != undefined) ? Number(args.yof) : 0;  
        let pts = (args.pts != undefined) ? args.pts : [];
        let col = (args.col != undefined) ? args.col : Util.rgba(54,69,79,1);
        let fil = (args.fil != undefined) ? args.fil : true;
        let str = (args.str != undefined) ? args.str : !fil;
        let lineWidth = (args.lineWidth != undefined) ? args.lineWidth : 0.2;
    
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
            ctx.strokeStyle =  col;
            ctx.stroke();
        }
    }

     stroke(args){
        let noiseScale = 10; // 10
        args = (args != undefined) ? args : {};
        let pts = (args.pts != undefined) ? args.pts : [];
        let ctx = (args.ctx != undefined) ? args.ctx : CTX;
        let xof = (args.xof != undefined) ? args.xof : 0;
        let yof = (args.yof != undefined) ? args.yof : 0;
        let col = (args.col != undefined) ? args.col : "black";
        let wid = (args.wid != undefined) ? args.wid :
            (x)=>(1*Math.sin(x*this.PI)*Util.mapval(Noise.noise(x*noiseScale),0,1,0.5,1));
    
        let [vtxlist0,vtxlist1] = this.tubify({pts:pts,wid:wid})
    
        this.polygon({pts:vtxlist0.concat(vtxlist1.reverse()),
            ctx:ctx,fil:true,col:col,xof:xof,yof:yof})
        return [vtxlist0,vtxlist1]
    }

    tubify(args){
        args = (args != undefined) ? args : {};
        let pts = (args.pts != undefined) ? args.pts : [];
        let wid = (args.wid != undefined) ? args.wid : (x)=>(10);
        let vtxlist0 = []
        let vtxlist1 = []
        let vtxlist = []
        for (let i = 1; i < pts.length-1; i++){
            let w = wid(i/pts.length)
            let a1 = Math.atan2(pts[i][1]-pts[i-1][1],pts[i][0]-pts[i-1][0]);
            let a2 = Math.atan2(pts[i][1]-pts[i+1][1],pts[i][0]-pts[i+1][0]);
            let a = (a1+a2)/2;
            if (a < a2){a+=Math.PI}
            vtxlist0.push([pts[i][0]+w*Math.cos(a),(pts[i][1]+w*Math.sin(a))]);
            vtxlist1.push([pts[i][0]-w*Math.cos(a),(pts[i][1]-w*Math.sin(a))]);
        }
        let l = pts.length-1
        let a0 = Math.atan2(pts[1][1]-pts[0][1],pts[1][0]-pts[0][0]) - Math.PI/2;
        let a1 = Math.atan2(pts[l][1]-pts[l-1][1],pts[l][0]-pts[l-1][0]) - Math.PI/2;
        let w0 = wid(0)
        let w1 = wid(1)
        vtxlist0.unshift([pts[0][0]+w0*Math.cos(a0),(pts[0][1]+w0*Math.sin(a0))])
        vtxlist1.unshift([pts[0][0]-w0*Math.cos(a0),(pts[0][1]-w0*Math.sin(a0))])
        vtxlist0.push([pts[l][0]+w1*Math.cos(a1),(pts[l][1]+w1*Math.sin(a1))])
        vtxlist1.push([pts[l][0]-w1*Math.cos(a1),(pts[l][1]-w1*Math.sin(a1))])
        return [vtxlist0,vtxlist1]
    }

    draw() {

        this.clear();
        var [lay0, lay1] = this.layers.slice(0,2);

        this.position(lay0,lay1, 0, 0, "normal", "normal");

        if(this.FILTERING_ENABLED) {
            Layer.filter(this.ctx,Filter.fade); //blotches
            Layer.filter(this.ctx,Filter.wispy); //yellowing
        }

        this.layers = [];
        lay0 = null;
        lay1 = null;
        // let canvasContainer = document.getElementById(this.containerElementId);
            // canvasContainer.style.height = this.CANVAS_HEIGHT + "px";
            // canvasContainer.innerHTML = "";
            // canvasContainer.appendChild(this.canvas)

    }

    

    clear() {
        this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    }
}