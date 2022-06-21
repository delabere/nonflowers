import { Layer } from "./app/layer.js";
import { Util } from "./app/util.js";
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