export class Layer {


    constructor(w,h) {
        this.CANVAS_HEIGHT = h ;
        this.CANVAS_WIDTH = w 
        this.ctx = Layer.createCanvas(w,h)
        return this.ctx
    }

    static empty(w,h){
      w = (w != undefined) ? w : this.CANVAS_WIDTH;
      h = (h != undefined) ? h : this.CANVAS_HEIGHT;
      return new Layer(w,h);
    }

    static blit(ctx0,ctx1,args){
      var args =(args != undefined) ? args : {};
      let ble = (args.ble != undefined) ? args.ble : "normal";  
      let xof = (args.xof != undefined) ? args.xof : 0;  
      let yof = (args.yof != undefined) ? args.yof : 0;  

      ctx0.globalCompositeOperation = ble;

      ctx0.drawImage(ctx1.canvas,xof,yof)
    }

    static filter(ctx,f){
      let imgd = ctx.getImageData(0, 0, 
        ctx.canvas.width, ctx.canvas.height);
      let pix = imgd.data;
      for (let i = 0, n = pix.length; i < n; i += 4) {
        let r = pix[i];
        let g = pix[i+1];
        let b = pix[i+2];
        let a = pix[i+3];
  
  
        let x = (i/4)%(ctx.canvas.width)
        let y = Math.floor((i/4)/(ctx.canvas.width))
        let [r1,g1,b1,a1] = f(x,y,r,g,b,a)
          pix[i  ] = r1
          pix[i+1] = g1
          pix[i+2] = b1
          pix[i+3] = a1
      }
      ctx.putImageData(imgd, 0, 0);
    }

    static border(ctx,f){
      let imgd = ctx.getImageData(0, 0, 
        ctx.canvas.width, ctx.canvas.height);
      let pix = imgd.data;
      for (let i = 0, n = pix.length; i < n; i += 4) {
        // let [r,g,b,a] = pix.slice(i,i+4)
        let r = pix[i];
        let g = pix[i+1];
        let b = pix[i+2];
        let a = pix[i+3];
        let x = (i/4)%(ctx.canvas.width)
        let y = Math.floor((i/4)/(ctx.canvas.width))
  
        let nx = (x/ctx.canvas.width-0.5)*2
        let ny = (y/ctx.canvas.height-0.5)*2
        let theta = Math.atan2(ny,nx)
        let r_ = distance([nx,ny],[0,0])
        let rr_ = f(theta)
  
        if (r_ > rr_){
          pix[i  ] = 0
          pix[i+1] = 0
          pix[i+2] = 0
          pix[i+3] = 0
        }
      }
      ctx.putImageData(imgd, 0, 0);
    }
    static boundingBox(ctx,alphaThreshold){
      if (alphaThreshold===undefined) alphaThreshold = 15;
      let w=ctx.canvas.width,h=ctx.canvas.height;
      let data = ctx.getImageData(0,0,w,h).data;
      var x,y,xMin,yMin,xMax,yMax;
      o1: for (y=h;y--;)        for (x=w;x--;)           if (data[(w*y+x)*4+3]>alphaThreshold){ yMax=y; break o1 }
      if (!yMax) return {xmin:0,xmax:w,ymin:0,ymax:h};
      o2: for (x=w;x--;)        for (y=yMax+1;y--;)      if (data[(w*y+x)*4+3]>alphaThreshold){ xMax=x; break o2 }
      o3: for (x=0;x<=xMax;++x) for (y=yMax+1;y--;)      if (data[(w*y+x)*4+3]>alphaThreshold){ xMin=x; break o3 }
      o4: for (y=0;y<=yMax;++y) for (x=xMin;x<=xMax;++x) if (data[(w*y+x)*4+3]>alphaThreshold){ yMin=y; break o4 }
      return {
        xmin:xMin,
        xmax:xMax,
        ymin:yMin,
        ymax:yMax
        };
    }

    static scaleCanvas(canvas, context, width, height) {
        // assume the device pixel ratio is 1 if the browser doesn't specify it
        const devicePixelRatio = window.devicePixelRatio || 1;
      
        // determine the 'backing store ratio' of the canvas context
        const backingStoreRatio = (
          context.webkitBackingStorePixelRatio ||
          context.mozBackingStorePixelRatio ||
          context.msBackingStorePixelRatio ||
          context.oBackingStorePixelRatio ||
          context.backingStorePixelRatio || 1
        );
      
        // determine the actual ratio we want to draw at
        const ratio = devicePixelRatio / backingStoreRatio;
      
        if (devicePixelRatio !== backingStoreRatio) {
          // set the 'real' canvas size to the higher width/height
          canvas.width = width * ratio;
          canvas.height = height * ratio;
      
          // ...then scale it back down with CSS
          canvas.style.width = width + 'px';
          canvas.style.height = height + 'px';
        }
        else {
          // this is a normal 1:1 device; just scale it simply
          canvas.width = width;
          canvas.height = height;
          canvas.style.width = '';
          canvas.style.height = '';
        }
      
        // scale the drawing context so everything will work at the higher ratio
        context.scale(ratio, ratio);
    }

    

    static createCanvas(w,h) {
        let canvas = document.createElement('canvas');

        canvas.width = w;
        canvas.height = h; 
        
        var context = canvas.getContext('2d');

        // this.scaleCanvas(canvas, context, w, h)
        context.imageSmoothingQuality = "low";

        return context
      }

  }