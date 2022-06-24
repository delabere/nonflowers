(function () {
  'use strict';

  Object.defineProperty(Array.prototype, "x", {
      get: function () {return this[0]},
      set: function (n) {this[0] = n;},
  });
  Object.defineProperty(Array.prototype, "y", {
      get: function () {return this[1]},
      set: function (n) {this[1] = n;},
  });
  Object.defineProperty(Array.prototype, "z", {
      get: function () {return this[2]},
      set: function (n) {this[2] = n;},
  });
  Object.defineProperty(Array.prototype, "h", {
      get: function () {return this[0]},
      set: function (n) {this[0] = n;},
  });
  Object.defineProperty(Array.prototype, "s", {
      get: function () {return this[1]},
      set: function (n) {this[1] = n;},
  });
  Object.defineProperty(Array.prototype, "l", {
      get: function () {return this[2]},
      set: function (n) {this[2] = n;},
  });
  Object.defineProperty(Array.prototype, "a", {
    get: function () {return this[3]},
    set: function (n) {this[3] = n;},
  });
  for (var i$2 = 1; i$2 < 4; i$2++){
    function f(i){
      Object.defineProperty(Array.prototype, "-"+i, {
          get: function () {return this[this.length-i]},
          set: function (n) {this[this.length-i] = n;},
      });
    }
    f(i$2);
  }

  const Noise = new function(){
      var PERLIN_YWRAPB = 4; var PERLIN_YWRAP = 1<<PERLIN_YWRAPB;
      var PERLIN_ZWRAPB = 8; var PERLIN_ZWRAP = 1<<PERLIN_ZWRAPB;
      var PERLIN_SIZE = 4095;
      var perlin_octaves = 4;var perlin_amp_falloff = 0.5;
      var scaled_cosine = function(i) {return 0.5*(1.0-Math.cos(i*Math.PI));};
      var perlin;
      // this.noise = quickNoise.noise;
      
      this.noise = function(x, y = 0, z = 0) {
      if (perlin == null) {
        perlin = new Array(PERLIN_SIZE + 1);
        for (let i = 0; i < PERLIN_SIZE + 1; i++) {
          perlin[i] = Math.random();
        }
      }
    
      if (x < 0) {
        x = -x;
      }
      if (y < 0) {
        y = -y;
      }
      if (z < 0) {
        z = -z;
      }
    
      let xi = Math.floor(x),
        yi = Math.floor(y),
        zi = Math.floor(z);
      let xf = x - xi;
      let yf = y - yi;
      let zf = z - zi;
      let rxf, ryf;
    
      let r = 0;
      let ampl = 0.5;
    
      let n1, n2, n3;
    
      for (let o = 0; o < perlin_octaves; o++) {
        let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
    
        rxf = scaled_cosine(xf);
        ryf = scaled_cosine(yf);
    
        n1 = perlin[of & PERLIN_SIZE];
        n1 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n1);
        n2 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
        n2 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
        n1 += ryf * (n2 - n1);
    
        of += PERLIN_ZWRAP;
        n2 = perlin[of & PERLIN_SIZE];
        n2 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n2);
        n3 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
        n3 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
        n2 += ryf * (n3 - n2);
    
        n1 += scaled_cosine(zf) * (n2 - n1);
    
        r += n1 * ampl;
        ampl *= perlin_amp_falloff;
        xi <<= 1;
        xf *= 2;
        yi <<= 1;
        yf *= 2;
        zi <<= 1;
        zf *= 2;
    
        if (xf >= 1.0) {
          xi++;
          xf--;
        }
        if (yf >= 1.0) {
          yi++;
          yf--;
        }
        if (zf >= 1.0) {
          zi++;
          zf--;
        }
      }
      return r;
    };
      //function(x,y,z) {
      //   y = y || 0; z = z || 0;
      //   if (perlin == null) {
      //     perlin = new Array(PERLIN_SIZE + 1);
      //     for (var i = 0; i < PERLIN_SIZE + 1; i++) {
      //       perlin[i] = Math.random();
      //     }
      //   }
      //   if (x<0) { x=-x; } if (y<0) { y=-y; } if (z<0) { z=-z; }
      //   var xi=Math.floor(x), yi=Math.floor(y), zi=Math.floor(z);
      //   var xf = x - xi; var yf = y - yi; var zf = z - zi;
      //   var rxf, ryf;
      //   var r=0; var ampl=0.5;
      //   var n1,n2,n3;
      //   for (var o=0; o<perlin_octaves; o++) {
      //     var of=xi+(yi<<PERLIN_YWRAPB)+(zi<<PERLIN_ZWRAPB);
      //     rxf = scaled_cosine(xf); ryf = scaled_cosine(yf);
      //     n1  = perlin[of&PERLIN_SIZE];
      //     n1 += rxf*(perlin[(of+1)&PERLIN_SIZE]-n1);
      //     n2  = perlin[(of+PERLIN_YWRAP)&PERLIN_SIZE];
      //     n2 += rxf*(perlin[(of+PERLIN_YWRAP+1)&PERLIN_SIZE]-n2);
      //     n1 += ryf*(n2-n1);
      //     of += PERLIN_ZWRAP;
      //     n2  = perlin[of&PERLIN_SIZE];
      //     n2 += rxf*(perlin[(of+1)&PERLIN_SIZE]-n2);
      //     n3  = perlin[(of+PERLIN_YWRAP)&PERLIN_SIZE];
      //     n3 += rxf*(perlin[(of+PERLIN_YWRAP+1)&PERLIN_SIZE]-n3);
      //     n2 += ryf*(n3-n2);
      //     n1 += scaled_cosine(zf)*(n2-n1);
      //     r += n1*ampl;
      //     ampl *= perlin_amp_falloff;
      //     xi<<=1; xf*=2; yi<<=1; yf*=2; zi<<=1; zf*=2;
      //     if (xf>=1.0) { xi++; xf--; }
      //     if (yf>=1.0) { yi++; yf--; }
      //     if (zf>=1.0) { zi++; zf--; }
      //   }
      //   return r;
      // };
      
    
    };

  class v3 {


      static forward = [0,0,1];
      static up = [0,1,0];
      static right = [1,0,0];
      static zero = [0,0,0];
      static rad2deg = 180/Math.PI
      static deg2rad = Math.PI/180

      constructor() {

      }

      static rad(x){return x * v3.deg2rad}
      static deg(x){return x * v3.rad2deg}
      
      static rotvec(vec,axis,th){
        var [l,m,n] = axis;
        var [x,y,z] = vec;
        var [costh,sinth] = [Math.cos(th), Math.sin(th)];
        var mat={};
        mat[11]= l*l *(1-costh) +costh;
        mat[12]= m*l *(1-costh) -n*sinth;
        mat[13]= n*l *(1-costh) +m*sinth;
    
        mat[21]= l*m *(1-costh) +n*sinth;
        mat[22]= m*m *(1-costh) +costh;
        mat[23]= n*m *(1-costh) -l*sinth;
    
        mat[31]= l*n *(1-costh) -m*sinth;
        mat[32]= m*n *(1-costh) +l*sinth;
        mat[33]= n*n *(1-costh) +costh;
        return [
          x*mat[11] + y*mat[12] + z*mat[13],
          x*mat[21] + y*mat[22] + z*mat[23],
          x*mat[31] + y*mat[32] + z*mat[33],
        ]
      }
      static roteuler(vec,rot){
        if (rot.z != 0) {vec = v3.rotvec(vec,v3.forward,rot.z);}
        if (rot.x != 0) {vec = v3.rotvec(vec,v3.right,rot.x);}
        if (rot.y != 0) {vec = v3.rotvec(vec,v3.up,rot.y);}
        return vec
      }
    
      static scale(vec,p){
        return [vec.x*p,vec.y*p,vec.z*p]
      }
      static copy(v0){
        return [v0.x,v0.y,v0.z]
      }
      static add(v0,v){
        return [v0.x+v.x,v0.y+v.y,v0.z+v.z]
      }
      static subtract(v0,v){
        return [v0.x-v.x,v0.y-v.y,v0.z-v.z]
      }
      static mag(v){
        return Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z)
      }
      static normalize(v){
        let p = 1/v3.mag(v);
        return [v.x*p,v.y*p,v.z*p]
      }
      static dot(u,v){
        return u.x*v.x + u.y*v.y + u.z*v.z 
      }
      static cross(u,v){
        return [
          u.y*v.z - u.z*v.y,
          u.z*v.x - u.x*v.z,
          u.x*v.y - u.y*v.x
        ]
      }
      static angcos(u,v){
        return v3.dot(u,v)/(v3.mag(u)*v3.mag(v))
      }
      static ang(u,v){
        return Math.acos(v3.angcos(u,v))
      }
      static toeuler(v0){
        let ep = 5;
        let ma = 2*Math.PI;
        let mr = [0,0,0];
        for (var x = -180; x < 180; x+=ep){
          for (var y = -90; y < 90; y+=ep){
            var r = [v3.rad(x),v3.rad(y),0];
            var v = v3.roteuler([0,0,1],r);
            var a = v3.ang(v0,v);
            if (a < v3.rad(ep)){
              return r
            }
            if (a < ma){
              ma = a;
              mr = r;
            }
          }
        }
        return mr
      }
      static lerp(u,v,p){
        return [
          u.x*(1-p)+v.x*p,
          u.y*(1-p)+v.y*p,
          u.z*(1-p)+v.z*p,
        ]
      }
    }

  class Util {


      static PI = Math.PI;
      static rad2deg = 180/Math.PI;
      static deg2rad = Math.PI/180;
      static sin = Math.sin;
      static cos = Math.cos;
      static abs = Math.abs;
      static pow = Math.pow;

      static rgba(r, g, b, a) {
          r = (r != undefined) ? r:255;
          g = (g != undefined) ? g:r;
          b = (b != undefined) ? b:g;
          a = (a != undefined) ? a:1.0;
          return `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)}, ${a.toFixed(3)})`;
      }
      static normRand(min, max) {
          return this.mapval(Math.random(),0,1,min,max);
      }

      static hsv(h, s, v, a) {
          let c = v*s;
          let x = c*(1-this.abs((h/60)%2-1));
          let m = v-c;
          let [rv,gv,bv] = ([[c,x,0],[x,c,0],[0,c,x],
                              [0,x,c],[x,0,c],[c,0,x]])[Math.floor(h/60)];
          let [r,g,b] = [(rv+m)*255,(gv+m)*255,(bv+m)*255,a];
          return this.rgba(r,g,b,a)

      }

      static polygon(args){
          args =(args != undefined) ? args : {};
          let ctx = (args.ctx != undefined) ? args.ctx : CTX;
          let xof = (args.xof != undefined) ? Number(args.xof) : 0;  
          let yof = (args.yof != undefined) ? Number(args.yof) : 0;  
          let pts = (args.pts != undefined) ? args.pts : [];
          let col = (args.col != undefined) ? args.col : this.rgba(54,69,79,1);
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
              ctx.strokeStyle = col;
              ctx.stroke();
          }
      }

      static lerpHue(h0,h1,p){
          let methods = [
              [this.abs(h1-h0),     this.mapval(p,0,1,h0,h1)],
              [this.abs(h1+360-h0), this.mapval(p,0,1,h0,h1+360)],
              [this.abs(h1-360-h0), this.mapval(p,0,1,h0,h1-360)]
              ];
          methods.sort((x,y)=>(x[0]-y[0]));
          return (methods[0][1]+720)%360
      }

      static grot(P,ind){
          let d = v3.subtract(P[ind],P[ind-1]);
          return v3.toeuler(d)
      }

      static tubify(args){
          args = (args != undefined) ? args : {};
          let pts = (args.pts != undefined) ? args.pts : [];
          let wid = (args.wid != undefined) ? args.wid : (x)=>(10);
          let vtxlist0 = [];
          let vtxlist1 = [];
          for (let i = 1; i < pts.length-1; i++){
              let w = wid(i/pts.length);
              let a1 = Math.atan2(pts[i][1]-pts[i-1][1],pts[i][0]-pts[i-1][0]);
              let a2 = Math.atan2(pts[i][1]-pts[i+1][1],pts[i][0]-pts[i+1][0]);
              let a = (a1+a2)/2;
              if (a < a2){a+=Math.PI;}
              vtxlist0.push([pts[i][0]+w*this.cos(a),(pts[i][1]+w*this.sin(a))]);
              vtxlist1.push([pts[i][0]-w*this.cos(a),(pts[i][1]-w*this.sin(a))]);
          }
          let l = pts.length-1;
          let a0 = Math.atan2(pts[1][1]-pts[0][1],pts[1][0]-pts[0][0]) - Math.PI/2;
          let a1 = Math.atan2(pts[l][1]-pts[l-1][1],pts[l][0]-pts[l-1][0]) - Math.PI/2;
          let w0 = wid(0);
          let w1 = wid(1);
          vtxlist0.unshift([pts[0][0]+w0*Math.cos(a0),(pts[0][1]+w0*Math.sin(a0))]);
          vtxlist1.unshift([pts[0][0]-w0*Math.cos(a0),(pts[0][1]-w0*Math.sin(a0))]);
          vtxlist0.push([pts[l][0]+w1*Math.cos(a1),(pts[l][1]+w1*Math.sin(a1))]);
          vtxlist1.push([pts[l][0]-w1*Math.cos(a1),(pts[l][1]-w1*Math.sin(a1))]);
          return [vtxlist0,vtxlist1]
      }

      static stroke(args){
          let noiseScale = 10; // 10
          args = (args != undefined) ? args : {};
          let pts = (args.pts != undefined) ? args.pts : [];
          let ctx = (args.ctx != undefined) ? args.ctx : CTX;
          let xof = (args.xof != undefined) ? args.xof : 0;
          let yof = (args.yof != undefined) ? args.yof : 0;
          let col = (args.col != undefined) ? args.col : "black";
          let wid = (args.wid != undefined) ? args.wid :
              (x)=>(1*this.sin(x*this.PI)*this.mapval(Noise.noise(x*noiseScale),0,1,0.5,1));
      
          let [vtxlist0,vtxlist1] = this.tubify({pts:pts,wid:wid});
      
          this.polygon({pts:vtxlist0.concat(vtxlist1.reverse()),
              ctx:ctx,fil:true,col:col,xof:xof,yof:yof});
          return [vtxlist0,vtxlist1]
      }

      static distance(p0,p1){
          return Math.sqrt(Math.pow(p0[0]-p1[0],2) + Math.pow(p0[1]-p1[1],2));
      }
      // map float from one range to another
      static mapval(value,istart,istop,ostart,ostop){
          return ostart + (ostop - ostart) * ((value - istart)*1.0 / (istop - istart))
      }
      // random element from array
      static randChoice(arr) {
          return arr[Math.floor(arr.length * Math.random())];
      }

      // weighted randomness
      static wtrand(func){
          let x = Math.random();
          let y = Math.random();
          if (y<func(x)){
              return x
          }else {
              return this.wtrand(func)
          }
      }
      // gaussian randomness
      static randGaussian(){
          return this.wtrand(function(x){return Math.pow(Math.E,-24*Math.pow(x-0.5,2))})*2-1
      }
      // sigmoid curve
      static sigmoid(x,k){
          k = (k != undefined) ? k : 10;
          return 1/(1+Math.exp(-k*(x-0.5)))
      }

     
      static deltoid(t,a,b) {
          a = (a != undefined) ? a : 20;
          b = (b != undefined) ? b : 3*a;
          return (b-a) * Math.cos(t) + a * Math.cos(((b-a) / a) * t);
      }

      // pseudo bean curve
      static bean(x){
          return this.pow(0.25-this.pow(x-0.5,2),0.5)*(2.6+2.4*this.pow(x,1.5))*0.54
      }

      // bicorn curve
      // return algebraic curve known as cocked hat curve
      static bicorn(x,y){

          
          
      }
      // interpolate between square and circle
      static squircle(r,a){
          return function(th){
              while (th > this.PI/2){
              th -= this.PI/2;
              }
              while (th < 0){
              th += this.PI/2;
              }
              return r*this.pow(1/(this.pow(this.cos(th),a)+this.pow(this.sin(th),a)),1/a)
          }
      }
      // mid-point of an array of points
      static midPt(){
          let plist = (arguments.length == 1) ? 
              arguments[0] : Array.apply(null, arguments);
          return plist.reduce(function(acc,v){
              return [v[0]/plist.length+acc[0],
                      v[1]/plist.length+acc[1],
                      v[2]/plist.length+acc[2]]
          },[0,0,0])
      }
      // rational bezier curve
      static bezmh(P, w){
          w = (w == undefined) ? 1 : w;
          if (P.length == 2){
              P = [P[0],this.midPt(P[0],P[1]),P[1]];
          }
          let plist = [];
          for (let j = 0; j < P.length-2; j++){
              let p0; let p1; let p2;
              if (j == 0){p0 = P[j];}else {p0 = this.midPt(P[j],P[j+1]);}
              p1 = P[j+1];
              if (j == P.length-3){p2 = P[j+2];}else {p2 = this.midPt(P[j+1],P[j+2]);}
              let pl = 20;
              for (let i = 0; i < pl+(j==P.length-3); i+= 1){
              let t = i/pl;
              let u = (Math.pow (1 - t, 2) + 2 * t * (1 - t) * w + t * t);
              plist.push([
                  (Math.pow(1-t,2)*p0[0]+2*t*(1-t)*p1[0]*w+t*t*p2[0])/u,
                  (Math.pow(1-t,2)*p0[1]+2*t*(1-t)*p1[1]*w+t*t*p2[1])/u,
                  (Math.pow(1-t,2)*p0[2]+2*t*(1-t)*p1[2]*w+t*t*p2[2])/u]);
              }
          }
          return plist;
      }

  }

  class Filter { 

      //aging
      static wispy(x,y,r,g,b,a){
          var n = Noise.noise(x*0.2,y*0.2);
          var m = Noise.noise(x*0.5,y*0.5,2);
          return [r,g*Util.mapval(m,0,1,0.95,1),b*Util.mapval(m,0,1,0.8,1),a*Util.mapval(n,0,1,0.7,1)]
          // rr = r*1
          // gg  = g* (m * 0.95)
          // bb = b* (m * 0.8)
          // aa = a* (0.2 * 0.7)
      }

      //worn blotches
      static fade(x,y,r,g,b,a){
          let noise=0.0217;
          var n = Noise.noise(x*noise,y*noise);
          var m = Noise.noise(x*0.5,y*0.5,2);
          return [r,g*Util.mapval(m,0,1,0.95,1),b*Util.mapval(m,0,1,0.8,1),a*Math.min(Math.max(Util.mapval(n,0,0.323,0,1),0),1)]
          //rr = r*1
          //gg = g* (m*0.95)
          //bb = b* (m*0.8)
          //aa = b* (n*0.7)
      }
  }

  class Layer {


      constructor(w,h) {
          this.CANVAS_HEIGHT = h ;
          this.CANVAS_WIDTH = w; 
          this.ctx = Layer.createCanvas(w,h);
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



        ctx0.drawImage(ctx1.canvas,xof,yof);
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
    
    
          let x = (i/4)%(ctx.canvas.width);
          let y = Math.floor((i/4)/(ctx.canvas.width));
          let [r1,g1,b1,a1] = f(x,y,r,g,b,a);
            pix[i  ] = r1;
            pix[i+1] = g1;
            pix[i+2] = b1;
            pix[i+3] = a1;
        }
        ctx.putImageData(imgd, 0, 0);
      }

      static border(ctx,f){
        let imgd = ctx.getImageData(0, 0, 
          ctx.canvas.width, ctx.canvas.height);
        let pix = imgd.data;
        for (let i = 0, n = pix.length; i < n; i += 4) {
          // let [r,g,b,a] = pix.slice(i,i+4)
          pix[i];
          pix[i+1];
          pix[i+2];
          pix[i+3];
          let x = (i/4)%(ctx.canvas.width);
          let y = Math.floor((i/4)/(ctx.canvas.width));
    
          let nx = (x/ctx.canvas.width-0.5)*2;
          let ny = (y/ctx.canvas.height-0.5)*2;
          let theta = Math.atan2(ny,nx);
          let r_ = distance([nx,ny],[0,0]);
          let rr_ = f(theta);
    
          if (r_ > rr_){
            pix[i  ] = 0;
            pix[i+1] = 0;
            pix[i+2] = 0;
            pix[i+3] = 0;
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

  /*!
   * named-web-colors v1.4.1
   * https://github.com/davidfq/named-web-colors
   */
  !function(e,a){"object"==typeof exports&&"object"==typeof module?module.exports=a():"function"==typeof define&&define.amd?define("getColorName",[],a):"object"==typeof exports?exports.getColorName=a():e.getColorName=a();}("undefined"!=typeof self?self:undefined,(function(){return function(e){var a={};function r(n){if(a[n])return a[n].exports;var F=a[n]={i:n,l:!1,exports:{}};return e[n].call(F.exports,F,F.exports,r),F.l=!0,F.exports}return r.m=e,r.c=a,r.d=function(e,a,n){r.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:n});},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0});},r.t=function(e,a){if(1&a&&(e=r(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var F in e)r.d(n,F,function(a){return e[a]}.bind(null,F));return n},r.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(a,"a",a),a},r.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},r.p="",r(r.s=4)}([function(e,a,r){var n=r(5),F=r(6),o={};for(var i in n)n.hasOwnProperty(i)&&(o[n[i]]=i);var l=e.exports={to:{},get:{}};function t(e,a,r){return Math.min(Math.max(a,e),r)}function B(e){var a=e.toString(16).toUpperCase();return a.length<2?"0"+a:a}l.get=function(e){var a,r;switch(e.substring(0,3).toLowerCase()){case"hsl":a=l.get.hsl(e),r="hsl";break;case"hwb":a=l.get.hwb(e),r="hwb";break;default:a=l.get.rgb(e),r="rgb";}return a?{model:r,value:a}:null},l.get.rgb=function(e){if(!e)return null;var a,r,F,o=[0,0,0,1];if(a=e.match(/^#([a-f0-9]{6})([a-f0-9]{2})?$/i)){for(F=a[2],a=a[1],r=0;r<3;r++){var i=2*r;o[r]=parseInt(a.slice(i,i+2),16);}F&&(o[3]=Math.round(parseInt(F,16)/255*100)/100);}else if(a=e.match(/^#([a-f0-9]{3,4})$/i)){for(F=(a=a[1])[3],r=0;r<3;r++)o[r]=parseInt(a[r]+a[r],16);F&&(o[3]=Math.round(parseInt(F+F,16)/255*100)/100);}else if(a=e.match(/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/)){for(r=0;r<3;r++)o[r]=parseInt(a[r+1],0);a[4]&&(o[3]=parseFloat(a[4]));}else {if(!(a=e.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/)))return (a=e.match(/(\D+)/))?"transparent"===a[1]?[0,0,0,0]:(o=n[a[1]])?(o[3]=1,o):null:null;for(r=0;r<3;r++)o[r]=Math.round(2.55*parseFloat(a[r+1]));a[4]&&(o[3]=parseFloat(a[4]));}for(r=0;r<3;r++)o[r]=t(o[r],0,255);return o[3]=t(o[3],0,1),o},l.get.hsl=function(e){if(!e)return null;var a=e.match(/^hsla?\(\s*([+-]?(?:\d*\.)?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/);if(a){var r=parseFloat(a[4]);return [(parseFloat(a[1])+360)%360,t(parseFloat(a[2]),0,100),t(parseFloat(a[3]),0,100),t(isNaN(r)?1:r,0,1)]}return null},l.get.hwb=function(e){if(!e)return null;var a=e.match(/^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/);if(a){var r=parseFloat(a[4]);return [(parseFloat(a[1])%360+360)%360,t(parseFloat(a[2]),0,100),t(parseFloat(a[3]),0,100),t(isNaN(r)?1:r,0,1)]}return null},l.to.hex=function(){var e=F(arguments);return "#"+B(e[0])+B(e[1])+B(e[2])+(e[3]<1?B(Math.round(255*e[3])):"")},l.to.rgb=function(){var e=F(arguments);return e.length<4||1===e[3]?"rgb("+Math.round(e[0])+", "+Math.round(e[1])+", "+Math.round(e[2])+")":"rgba("+Math.round(e[0])+", "+Math.round(e[1])+", "+Math.round(e[2])+", "+e[3]+")"},l.to.rgb.percent=function(){var e=F(arguments),a=Math.round(e[0]/255*100),r=Math.round(e[1]/255*100),n=Math.round(e[2]/255*100);return e.length<4||1===e[3]?"rgb("+a+"%, "+r+"%, "+n+"%)":"rgba("+a+"%, "+r+"%, "+n+"%, "+e[3]+")"},l.to.hsl=function(){var e=F(arguments);return e.length<4||1===e[3]?"hsl("+e[0]+", "+e[1]+"%, "+e[2]+"%)":"hsla("+e[0]+", "+e[1]+"%, "+e[2]+"%, "+e[3]+")"},l.to.hwb=function(){var e=F(arguments),a="";return e.length>=4&&1!==e[3]&&(a=", "+e[3]),"hwb("+e[0]+", "+e[1]+"%, "+e[2]+"%"+a+")"},l.to.keyword=function(e){return o[e.slice(0,3)]};},function(e){e.exports={191970:"Midnight Blue",663399:"Rebecca Purple",696969:"Dim Gray",708090:"Slate Gray",778899:"Light Slate Gray",8e5:"Maroon",800080:"Purple",808e3:"Olive",808080:"Gray",FFFFFF:"White",FFFFF0:"Ivory",FFFFE0:"Light Yellow",FFFF00:"Yellow",FFFAFA:"Snow",FFFAF0:"Floral White",FFFACD:"Lemon Chiffon",FFF8DC:"Corn Silk",FFF5EE:"Seashell",FFF0F5:"Lavender blush",FFEFD5:"Papaya Whip",FFEBCD:"Blanched Almond",FFE4E1:"Misty Rose",FFE4C4:"Bisque",FFE4B5:"Moccasin",FFDEAD:"Navajo White",FFDAB9:"Peach Puff",FFD700:"Gold",FFC0CB:"Pink",FFB6C1:"Light Pink",FFA500:"Orange",FFA07A:"Light Salmon",FF8C00:"Dark Orange",FF7F50:"Coral",FF69B4:"Hot Pink",FF6347:"Tomato",FF4500:"Orange Red",FF1493:"Deep Pink",FF00FF:"Fuchsia / Magenta",FF0000:"Red",FDF5E6:"Old Lace",FAFAD2:"Light Goldenrod Yellow",FAF0E6:"Linen",FAEBD7:"Antique White",FA8072:"Salmon",F8F8FF:"Ghost White",F5FFFA:"Mint Cream",F5F5F5:"White Smoke",F5F5DC:"Beige",F5DEB3:"Wheat",F4A460:"Sandy brown",F0FFFF:"Azure",F0FFF0:"Honeydew",F0F8FF:"Alice Blue",F0E68C:"Khaki",F08080:"Light Coral",EEE8AA:"Pale Goldenrod",EE82EE:"Violet",E9967A:"Dark Salmon",E6E6FA:"Lavender",E0FFFF:"Light Cyan",DEB887:"Burly Wood",DDA0DD:"Plum",DCDCDC:"Gainsboro",DC143C:"Crimson",DB7093:"Pale Violet Red",DAA520:"Goldenrod",DA70D6:"Orchid",D8BFD8:"Thistle",D3D3D3:"Light Gray",D2B48C:"Tan",D2691E:"Chocolate",CD853F:"Peru",CD5C5C:"Indian Red",C71585:"Medium Violet Red",C0C0C0:"Silver",BDB76B:"Dark Khaki",BC8F8F:"Rosy Brown",BA55D3:"Medium Orchid",B8860B:"Dark Goldenrod",B22222:"Fire Brick",B0E0E6:"Powder Blue",B0C4DE:"Light Steel Blue",AFEEEE:"Pale Turquoise",ADFF2F:"Green Yellow",ADD8E6:"Light Blue",A9A9A9:"Dark Gray",A0522D:"Sienna","9ACD32":"Yellow Green","9932CC":"Dark Orchid","98FB98":"Pale Green","9400D3":"Dark Violet","9370DB":"Medium Purple","90EE90":"Light Green","8FBC8F":"Dark Sea Green","8B4513":"Saddle Brown","8B008B":"Dark Magenta","8B0000":"Dark Red","8A2BE2":"Blue Violet","87CEFA":"Light Sky Blue","87CEEB":"Sky Blue","7FFFD4":"Aquamarine","7FFF00":"Chartreuse","7CFC00":"Lawn Green","7B68EE":"Medium Slate Blue","6B8E23":"Olive Drab","6A5ACD":"Slate Blue","66CDAA":"Medium Aquamarine","6495ED":"Cornflower Blue","5F9EA0":"Cadet Blue","556B2F":"Dark Olive Green","4B0082":"Indigo","48D1CC":"Medium Turquoise","483D8B":"Dark Slate Blue","4682B4":"Steel Blue","4169E1":"Royal Blue","40E0D0":"Turquoise","3CB371":"Medium Sea Green","32CD32":"Lime Green","2F4F4F":"Dark Slate Gray","2E8B57":"Sea Green","228B22":"Forest Green","20B2AA":"Light Sea Green","1E90FF":"Dodger Blue","00FFFF":"Aqua / Cyan","00FF7F":"Spring Green","00FF00":"Lime","00FA9A":"Medium Spring Green","00CED1":"Dark Turquoise","00BFFF":"Deep Sky Blue","008B8B":"Dark Cyan","008080":"Teal","008000":"Green","006400":"Dark Green","0000FF":"Blue","0000CD":"Medium Blue","00008B":"Dark Blue","000080":"Navy","000000":"Black"};},function(e){e.exports={101405:"Green Waterloo",105852:"Eden",123447:"Elephant",13e4:"Diesel",140600:"Nero",161928:"Mirage",163222:"Celtic",163531:"Gable Green",175579:"Chathams Blue",193751:"Nile Blue",204852:"Blue Dianne",220878:"Deep Blue",233418:"Mallard",251607:"Graphite",251706:"Cannon Black",260368:"Paua",261105:"Wood Bark",261414:"Gondola",262335:"Steel Gray",292130:"Bastille",292319:"Zeus",292937:"Charade",300529:"Melanzane",314459:"Pickled Bluewood",323232:"Mine Shaft",341515:"Tamarind",350036:"Mardi Gras",353542:"Tuna",363050:"Martinique",363534:"Tuatara",368716:"La Palma",373021:"Birch",377475:"Oracle",380474:"Blue Diamond",383533:"Dune",384555:"Oxford Blue",384910:"Clover",394851:"Limed Spruce",396413:"Dell",401801:"Brown Pod",405169:"Fiord",410056:"Ripe Plum",412010:"Deep Oak",414257:"Gun Powder",420303:"Burnt Maroon",423921:"Lisbon Brown",427977:"Faded Jade",431560:"Scarlet Gum",433120:"Iroko",444954:"Mako",454936:"Kelp",462425:"Crater Brown",465945:"Gray Asparagus",480404:"Rustic Red",480607:"Bulgarian Rose",480656:"Clairvoyant",483131:"Woody Brown",492615:"Brown Derby",495400:"Verdun Green",496679:"Blue Bayoux",497183:"Bismark",504351:"Mortar",507096:"Kashmir Blue",507672:"Cutty Sark",514649:"Emperor",533455:"Voodoo",534491:"Victoria",541012:"Heath",544333:"Judge Gray",549019:"Vida Loca",578363:"Spring Leaves",585562:"Scarpa Flow",587156:"Cactus",592804:"Brown Bramble",593737:"Congo Brown",594433:"Millbrook",604913:"Horses Neck",612718:"Espresso",614051:"Eggplant",625119:"West Coast",626649:"Finch",646077:"Dolphin",646463:"Storm Dust",657220:"Fern Frond",660045:"Pompadour",661010:"Dark Tan",676662:"Ironside Gray",678975:"Viridian Green",683600:"Nutmeg Wood Finish",685558:"Zambezi",692545:"Tawny Port",704214:"Sepia",706555:"Coffee",714693:"Affair",716338:"Yellow Metal",717486:"Storm Gray",718080:"Sirocco",737829:"Crete",738678:"Xanadu",748881:"Blue Smoke",749378:"Laurel",778120:"Pacifika",780109:"Japanese Maple",796878:"Old Lavender",796989:"Rum",801818:"Falu Red",803790:"Vivid Violet",817377:"Empress",819885:"Spanish Green",828685:"Gunsmoke",831923:"Merlot",837050:"Shadow",858470:"Bandicoot",860111:"Red Devil",868974:"Bitter",871550:"Disco",885342:"Spicy Mix",886221:"Kumera",888387:"Suva Gray",893456:"Camelot",893843:"Solid Pink",894367:"Cannon Pink",900020:"Burgundy",907874:"Hemp",924321:"Cumin",928573:"Stonewall",928590:"Venus",944747:"Copper Rust",948771:"Arrowtown",950015:"Scarlett",956387:"Strikemaster",959396:"Mountain Mist",960018:"Carmine",967059:"Leather",990066:"Fresh Eggplant",991199:"Violet Eggplant",991613:"Tamarillo",996666:"Copper Rose",FFFFB4:"Portafino",FFFF99:"Pale Canary",FFFF66:"Laser Lemon",FFFEFD:"Romance",FFFEF6:"Black White",FFFEF0:"Rice Cake",FFFEEC:"Apricot White",FFFEE1:"Half and Half",FFFDF4:"Quarter Pearl Lusta",FFFDF3:"Orchid White",FFFDE8:"Travertine",FFFDE6:"Chilean Heath",FFFDD0:"Cream",FFFCEE:"Island Spice",FFFCEA:"Buttery White",FFFC99:"Witch Haze",FFFBF9:"Soapstone",FFFBDC:"Scotch Mist",FFFAF4:"Bridal Heath",FFF9E6:"Early Dawn",FFF9E2:"Gin Fizz",FFF8D1:"Baja White",FFF6F5:"Rose White",FFF6DF:"Varden",FFF6D4:"Milk Punch",FFF5F3:"Sauvignon",FFF4F3:"Chablis",FFF4E8:"Serenade",FFF4E0:"Sazerac",FFF4DD:"Egg Sour",FFF4CE:"Barley White",FFF46E:"Paris Daisy",FFF3F1:"Chardon",FFF39D:"Picasso",FFF1F9:"Tutu",FFF1EE:"Forget Me Not",FFF1D8:"Pink Lady",FFF1B5:"Buttermilk",FFF14F:"Gorse",FFF0DB:"Peach Cream",FFEFEC:"Fair Pink",FFEFC1:"Egg White",FFEFA1:"Vis Vis",FFEED8:"Derby",FFEDBC:"Colonial White",FFEC13:"Broom",FFEAD4:"Karry",FFEAC8:"Sandy Beach",FFE772:"Kournikova",FFE6C7:"Tequila",FFE5B4:"Peach",FFE5A0:"Cream Brulee",FFE2C5:"Negroni",FFE1F2:"Pale Rose",FFE1DF:"Pippin",FFDEB3:"Frangipani",FFDDF4:"Pink Lace",FFDDCF:"Watusi",FFDDCD:"Tuft Bush",FFDDAF:"Caramel",FFDCD6:"Peach Schnapps",FFDB58:"Mustard",FFD8D9:"Cosmos",FFD800:"School bus Yellow",FFD38C:"Grandis",FFD2B7:"Romantic",FFD1DC:"Pastel Pink",FFCD8C:"Chardonnay",FFCC99:"Peach Orange",FFCC5C:"Golden Tainoi",FFCC33:"Sunglow",FFCBA4:"Flesh",FFC901:"Supernova",FFC3C0:"Your Pink",FFC0A8:"Wax Flower",FFBF00:"Amber",FFBD5F:"Koromiko",FFBA00:"Selective Yellow",FFB97B:"Macaroni and Cheese",FFB7D5:"Cotton Candy",FFB555:"Texas Rose",FFB31F:"My Sin",FFB1B3:"Sundown",FFB0AC:"Cornflower Lilac",FFAE42:"Yellow Orange",FFAB81:"Hit Pink",FFA6C9:"Carnation Pink",FFA194:"Mona Lisa",FFA000:"Orange Peel",FF9E2C:"Sunshade",FF9980:"Vivid Tangerine",FF9966:"Atomic Tangerine",FF9933:"Neon Carrot",FF91A4:"Pink Salmon",FF910F:"West Side",FF9000:"Pizazz",FF7F00:"Flush Orange",FF7D07:"Flamenco",FF7518:"Pumpkin",FF7034:"Burning Orange",FF6FFF:"Blush Pink",FF6B53:"Persimmon",FF681F:"Orange",FF66FF:"Pink Flamingo",FF6600:"Blaze Orange",FF6037:"Outrageous Orange",FF4F00:"International Orange",FF4D00:"Vermilion",FF4040:"Coral Red",FF3F34:"Red Orange",FF355E:"Radical Red",FF33CC:"Razzle Dazzle Rose",FF3399:"Wild Strawberry",FF2400:"Scarlet",FF00CC:"Purple Pizzazz",FF007F:"Rose",FEFCED:"Orange White",FEF9E3:"Off Yellow",FEF8FF:"White Pointer",FEF8E2:"Solitaire",FEF7DE:"Half Dutch White",FEF5F1:"Provincial Pink",FEF4F8:"Wisp Pink",FEF4DB:"Half Spanish White",FEF4CC:"Pipi",FEF3D8:"Bleach White",FEF2C7:"Beeswax",FEF0EC:"Bridesmaid",FEEFCE:"Oasis",FEEBF3:"Remy",FEE5AC:"Cape Honey",FEDB8D:"Salomie",FED85D:"Dandelion",FED33C:"Bright Sun",FEBAAD:"Melon",FEA904:"Yellow Sea",FE9D04:"California",FE6F5E:"Bittersweet",FE4C40:"Sunset Orange",FE28A2:"Persian Rose",FDFFD5:"Cumulus",FDFEB8:"Pale Prim",FDF7AD:"Drover",FDF6D3:"Half Colonial White",FDE910:"Lemon",FDE295:"Golden Glow",FDE1DC:"Cinderella",FDD7E4:"Pig Pink",FDD5B1:"Light Apricot",FD9FA2:"Sweet Pink",FD7C07:"Sorbus",FD7B33:"Crusta",FD5B78:"Wild Watermelon",FD0E35:"Torch Red",FCFFF9:"Ceramic",FCFFE7:"China Ivory",FCFEDA:"Moon Glow",FCFBF3:"Bianca",FCF8F7:"Vista White",FCF4DC:"Pearl Lusta",FCF4D0:"Double Pearl Lusta",FCDA98:"Cherokee",FCD917:"Candlelight",FCC01E:"Lightning Yellow",FC9C1D:"Tree Poppy",FC80A5:"Tickle Me Pink",FC0FC0:"Shocking Pink",FBFFBA:"Shalimar",FBF9F9:"Hint of Red",FBEC5D:"Candy Corn",FBEA8C:"Sweet Corn",FBE96C:"Festival",FBE870:"Marigold Yellow",FBE7B2:"Banana Mania",FBCEB1:"Apricot Peach",FBCCE7:"Classic Rose",FBBEDA:"Cupid",FBB2A3:"Rose Bud",FBAED2:"Lavender Pink",FBAC13:"Sun",FBA129:"Sea Buckthorn",FBA0E3:"Lavender Rose",FB8989:"Geraldine",FB607F:"Brink Pink",FAFFA4:"Milan",FAFDE4:"Hint of Yellow",FAFAFA:"Alabaster",FAF7D6:"Citrine White",FAF3F0:"Fantasy",FAECCC:"Champagne",FAEAB9:"Astra",FAE600:"Turbo",FADFAD:"Peach Yellow",FAD3A2:"Corvette",FA9D5A:"Tan Hide",FA7814:"Ecstasy",F9FFF6:"Sugar Cane",F9FF8B:"Dolly",F9F8E4:"Rum Swizzle",F9EAF3:"Amour",F9E663:"Portica",F9E4BC:"Dairy Cream",F9E0ED:"Carousel Pink",F9BF58:"Saffron Mango",F95A61:"Carnation",F8FDD3:"Mimosa",F8FACD:"Corn Field",F8F99C:"Texas",F8F8F7:"Desert Storm",F8F7FC:"White Lilac",F8F7DC:"Coconut Cream",F8F6F1:"Spring Wood",F8F4FF:"Magnolia",F8F0E8:"White Linen",F8E4BF:"Givry",F8DD5C:"Energy Yellow",F8DB9D:"Marzipan",F8D9E9:"Cherub",F8C3DF:"Chantilly",F8B853:"Casablanca",F7FAF7:"Snow Drift",F7F5FA:"Whisper",F7F2E1:"Quarter Spanish White",F7DBE6:"We Peep",F7C8DA:"Azalea",F7B668:"Rajah",F77FBE:"Persian Pink",F77703:"Chilean Fire",F7468A:"Violet Red",F6FFDC:"Spring Sun",F6F7F7:"Black Haze",F6F0E6:"Merino",F6A4C9:"Illusion",F653A6:"Brilliant Rose",F64A8A:"French Rose",F5FFBE:"Australian Mint",F5FB3D:"Golden Fizz",F5F3E5:"Ecru White",F5EDEF:"Soft Peach",F5E9D3:"Albescent White",F5E7E2:"Pot Pourri",F5E7A2:"Sandwisp",F5D5A0:"Maize",F5C999:"Manhattan",F5C85C:"Cream Can",F57584:"Froly",F4F8FF:"Zircon",F4F4F4:"Wild Sand",F4F2EE:"Pampas",F4EBD3:"Janna",F4D81C:"Ripe Lemon",F4C430:"Saffron",F400A1:"Hollywood Cerise",F3FFD8:"Carla",F3FBD4:"Orinoco",F3FB62:"Canary",F3EDCF:"Wheatfield",F3E9E5:"Dawn Pink",F3E7BB:"Sidecar",F3D9DF:"Vanilla Ice",F3D69D:"New Orleans",F3AD16:"Buttercup",F34723:"Pomegranate",F2FAFA:"Black Squeeze",F2F2F2:"Concrete",F2C3B2:"Mandys Pink",F28500:"Tangerine",F2552A:"Flamingo",F1FFC8:"Chiffon",F1FFAD:"Tidal",F1F7F2:"Saltpan",F1F1F1:"Seashell",F1EEC1:"Mint Julep",F1E9FF:"Blue Chalk",F1E9D2:"Parchment",F1E788:"Sahara Sand",F19BAB:"Wewak",F18200:"Gold Drop",F0FCEA:"Feta",F0EEFF:"Titan White",F0EEFD:"Selago",F0E2EC:"Prim",F0DC82:"Buff",F0DB7D:"Golden Sand",F0D52D:"Golden Dream",F091A9:"Mauvelous",EFF2F3:"Porcelain",EFEFEF:"Gallery",EF863F:"Jaffa",EEFFE2:"Rice Flower",EEFF9A:"Jonquil",EEFDFF:"Twilight Blue",EEF6F7:"Catskill White",EEF4DE:"Loafer",EEF3C3:"Tusk",EEF0F3:"Athens Gray",EEF0C8:"Tahuna Sands",EEEF78:"Manz",EEEEE8:"Cararra",EEE3AD:"Double Colonial White",EEDEDA:"Bizarre",EEDC82:"Flax",EED9C4:"Almond",EED794:"Chalky",EEC1BE:"Beauty Bush",EDFC84:"Honeysuckle",EDF9F1:"Narvik",EDF6FF:"Zumthor",EDF5F5:"Aqua Haze",EDF5DD:"Frost",EDEA99:"Primrose",EDDCB1:"Chamois",EDCDAB:"Pancho",EDC9AF:"Desert Sand",EDB381:"Tacao",ED989E:"Sea Pink",ED9121:"Carrot Orange",ED7A1C:"Tango",ED0A3F:"Red Ribbon",ECF245:"Starship",ECEBCE:"Aths Special",ECEBBD:"Fall Green",ECE090:"Wild Rice",ECCDB9:"Just Right",ECC7EE:"French Lilac",ECC54E:"Ronchi",ECA927:"Fuel Yellow",EBC2AF:"Zinnwaldite",EB9373:"Apricot",EAFFFE:"Dew",EAF9F5:"Aqua Spring",EAF6FF:"Solitude",EAF6EE:"Panache",EAE8D4:"White Rock",EADAB8:"Raffia",EAC674:"Rob Roy",EAB33B:"Tulip Tree",EAAE69:"Porsche",EA88A8:"Carissma",E9FFFD:"Clear Day",E9F8ED:"Ottoman",E9E3E3:"Ebb",E9D75A:"Confetti",E9CECD:"Oyster Pink",E97C07:"Tahiti Gold",E97451:"Burnt Sienna",E96E00:"Clementine",E8F5F2:"Aqua Squeeze",E8F2EB:"Gin",E8F1D4:"Chrome White",E8EBE0:"Green White",E8E0D5:"Pearl Bush",E8B9B3:"Shilo",E89928:"Fire Bush",E7FEFF:"Bubbles",E7F8FF:"Lily White",E7ECE6:"Gray Nurse",E7CD8C:"Putty",E7BF05:"Corn",E7BCB4:"Rose Fog",E79FC4:"Kobi",E79F8C:"Tonys Pink",E7730A:"Christine",E77200:"Mango Tango",E6FFFF:"Tranquil",E6FFE9:"Hint of Green",E6F8F3:"Off Green",E6F2EA:"Harp",E6E4D4:"Satin Linen",E6D7B9:"Double Spanish White",E6BEA5:"Cashmere",E6BE8A:"Gold Sand",E64E03:"Trinidad",E5F9F6:"Polar",E5E5E5:"Mercury",E5E0E1:"Bon Jour",E5D8AF:"Hampton",E5D7BD:"Stark White",E5CCC9:"Dust Storm",E5841B:"Zest",E52B50:"Amaranth",E4FFD1:"Snow Flurry",E4F6E7:"Frostee",E4D69B:"Zombie",E4D5B7:"Grain Brown",E4D422:"Sunflower",E4D1C0:"Bone",E4CFDE:"Twilight",E4C2D5:"Melanie",E49B0F:"Gamboge",E47698:"Deep Blush",E3F988:"Mindaro",E3F5E1:"Peppermint",E3BEBE:"Cavern Pink",E34234:"Cinnabar",E32636:"Alizarin Crimson",E30B5C:"Razzmatazz",E2F3EC:"Apple Green",E2EBED:"Mystic",E2D8ED:"Snuff",E29CD2:"Light Orchid",E29418:"Dixie",E292C0:"Shocking",E28913:"Golden Bell",E2725B:"Terracotta",E25465:"Mandy",E1F6E8:"Tara",E1EAD4:"Kidnapper",E1E6D6:"Periglacial Blue",E1C0C8:"Pink Flare",E1BC64:"Equator",E16865:"Sunglo",E0C095:"Calico",E0B974:"Harvest Gold",E0B646:"Anzac",E0B0FF:"Mauve",DFFF00:"Chartreuse Yellow",DFECDA:"Willow Brook",DFCFDB:"Lola",DFCD6F:"Chenin",DFBE6F:"Apache",DF73FF:"Heliotrope",DEF5FF:"Pattens Blue",DEE5C0:"Beryl Green",DED717:"Barberry",DED4A4:"Sapling",DECBC6:"Wafer",DEC196:"Brandy",DEBA13:"Gold Tips",DEA681:"Tumbleweed",DE6360:"Roman",DE3163:"Cerise Red",DDF9F1:"White Ice",DDD6D5:"Swiss Coffee",DCF0EA:"Swans Down",DCEDB4:"Caper",DCDDCC:"Moon Mist",DCD9D2:"Westar",DCD747:"Wattle",DCB4BC:"Blossom",DCB20C:"Galliano",DC4333:"Punch",DBFFF8:"Frosted Mint",DBDBDB:"Alto",DB995E:"Di Serria",DB9690:"Petite Orchid",DB5079:"Cranberry",DAFAFF:"Oyster Bay",DAF4F0:"Iceberg",DAECD6:"Zanah",DA8A67:"Copperfield",DA6A41:"Red Damask",DA6304:"Bamboo",DA5B38:"Flame Pea",DA3287:"Cerise",D9F7FF:"Mabel",D9E4F5:"Link Water",D9DCC1:"Tana",D9D6CF:"Timberwolf",D9B99B:"Cameo",D99376:"Burning Sand",D94972:"Cabaret",D8FCFA:"Foam",D8C2D5:"Maverick",D87C63:"Japonica",D84437:"Valencia",D7D0FF:"Fog",D7C498:"Pavlova",D7837F:"New York Pink",D6FFDB:"Snowy Mint",D6D6D1:"Quill Gray",D6CEF6:"Moon Raker",D6C562:"Tacha",D69188:"My Pink",D5F6E3:"Granny Apple",D5D195:"Winter Hazel",D59A6F:"Whiskey",D591A4:"Can Can",D54600:"Grenadier",D4E2FC:"Hawkes Blue",D4DFE2:"Geyser",D4D7D9:"Iron",D4CD16:"Bird Flower",D4C4A8:"Akaroa",D4BF8D:"Straw",D4B6AF:"Clam Shell",D47494:"Charm",D3CDC5:"Swirl",D3CBBA:"Sisal",D2F8B0:"Gossip",D2F6DE:"Blue Romance",D2DA97:"Deco",D29EAA:"Careys Pink",D27D46:"Raw Sienna",D1E231:"Pear",D1D2DD:"Mischka",D1D2CA:"Celeste",D1C6B4:"Soft Amber",D1BEA8:"Vanilla",D18F1B:"Geebung",D0F0C0:"Tea Green",D0C0E5:"Prelude",D0BEF8:"Perfume",D07D12:"Meteor",D06DA1:"Hopbush",D05F04:"Red Stage",CFFAF4:"Scandal",CFF9F3:"Humming Bird",CFE5D2:"Surf Crest",CFDCCF:"Tasman",CFB53B:"Old Gold",CFA39D:"Eunry",CEC7A7:"Chino",CEC291:"Yuma",CEBABA:"Cold Turkey",CEB98F:"Sorrell Brown",CDF4FF:"Onahau",CD8429:"Brandy Punch",CD5700:"Tenn",CCFF00:"Electric Lime",CCCCFF:"Periwinkle",CCCAA8:"Thistle Green",CC8899:"Puce",CC7722:"Ochre",CC5500:"Burnt Orange",CC3333:"Persian Red",CBDBD6:"Nebula",CBD3B0:"Green Mist",CBCAB6:"Foggy Gray",CB8FA9:"Viola",CAE6DA:"Skeptic",CAE00D:"Bitter Lemon",CADCD4:"Paris White",CABB48:"Turmeric",CA3435:"Flush Mahogany",C9FFE5:"Aero Blue",C9FFA2:"Reef",C9D9D2:"Conch",C9C0BB:"Silver Rust",C9B93B:"Earls Green",C9B35B:"Sundance",C9B29B:"Rodeo Dust",C9A0DC:"Light Wisteria",C99415:"Pizza",C96323:"Piper",C8E3D7:"Edgewater",C8B568:"Laser",C8AABF:"Lily",C8A528:"Hokey Pokey",C8A2C8:"Lilac",C88A65:"Antique Brass",C7DDE5:"Botticelli",C7CD90:"Pine Glade",C7C9D5:"Ghost",C7C4BF:"Cloud",C7C1FF:"Melrose",C7BCA2:"Coral Reef",C7031E:"Monza",C6E610:"Las Palmas",C6C8BD:"Kangaroo",C6C3B5:"Ash",C6A84B:"Roti",C69191:"Oriental Pink",C6726B:"Contessa",C62D42:"Brick Red",C5E17A:"Yellow Green",C5DBCA:"Sea Mist",C5994B:"Tussock",C59922:"Nugget",C54B8C:"Mulberry",C4F4EB:"Mint Tulip",C4D0B0:"Coriander",C4C4BC:"Mist Gray",C45719:"Orange Roughy",C45655:"Fuzzy Wuzzy Brown",C41E3A:"Cardinal",C3DDF9:"Tropical Blue",C3D1D1:"Tiara",C3CDE6:"Periwinkle Gray",C3C3BD:"Gray Nickel",C3BFC1:"Pale Slate",C3B091:"Indian Khaki",C32148:"Maroon Flush",C2E8E5:"Jagged Ice",C2CAC4:"Pumice",C2BDB6:"Cotton Seed",C2955D:"Twine",C26B03:"Indochine",C1F07C:"Sulu",C1D7B0:"Sprout",C1BECD:"Gray Suit",C1BAB0:"Tea",C1B7A4:"Bison Hide",C1A004:"Buddha Gold",C154C1:"Fuchsia Pink",C1440E:"Tia Maria",C0D8B6:"Pixie Green",C0D3B9:"Pale Leaf",C08081:"Old Rose",C04737:"Mojo",C02B18:"Thunderbird",BFDBE2:"Ziggurat",BFC921:"Key Lime Pie",BFC1C2:"Silver Sand",BFBED8:"Blue Haze",BFB8B0:"Tide",BF5500:"Rose of Sharon",BEDE0D:"Fuego",BEB5B7:"Pink Swan",BEA6C3:"London Hue",BDEDFD:"French Pass",BDC9CE:"Loblolly",BDC8B3:"Clay Ash",BDBDC6:"French Gray",BDBBD7:"Lavender Gray",BDB3C7:"Chatelle",BDB2A1:"Malta",BDB1A8:"Silk",BD978E:"Quicksand",BD5E2E:"Tuscany",BCC9C2:"Powder Ash",BBD7C1:"Surf",BBD009:"Rio Grande",BB8983:"Brandy Rose",BB3385:"Medium Red Violet",BAEEF9:"Charlotte",BAC7C9:"Submarine",BAB1A2:"Nomad",BA7F03:"Pirate Gold",BA6F1E:"Bourbon",BA450C:"Rock Spray",BA0101:"Guardsman Red",B9C8AC:"Rainee",B9C46A:"Wild Willow",B98D28:"Marigold",B95140:"Crail",B94E48:"Chestnut",B8E0F9:"Sail",B8C25D:"Celery",B8C1B1:"Green Spring",B8B56A:"Gimblet",B87333:"Copper",B81104:"Milano Red",B7F0BE:"Madang",B7C3D0:"Heather",B7B1B1:"Nobel",B7A458:"Husk",B7A214:"Sahara",B78E5C:"Muddy Waters",B7410E:"Rust",B6D3BF:"Gum Leaf",B6D1EA:"Spindle",B6BAA4:"Eagle",B6B095:"Heathered Gray",B69D98:"Thatch",B6316C:"Hibiscus",B5ECDF:"Cruise",B5D2CE:"Jet Stream",B5B35C:"Olive Green",B5A27F:"Mongoose",B57281:"Turkish Rose",B4CFD3:"Jungle Mist",B44668:"Blush",B43332:"Well Read",B3C110:"La Rioja",B3AF95:"Taupe Gray",B38007:"Hot Toddy",B35213:"Fiery Orange",B32D29:"Tall Poppy",B2A1EA:"Biloba Flower",B20931:"Shiraz",B1F4E7:"Ice Cold",B1E2C1:"Fringy Flower",B19461:"Teak",B16D52:"Santa Fe",B1610B:"Pumpkin Skin",B14A0B:"Vesuvius",B10000:"Bright Red",B0E313:"Inch Worm",B09A95:"Del Rio",B06608:"Mai Tai",B05E81:"Tapestry",B05D54:"Matrix",B04C6A:"Cadillac",AFBDD9:"Pigeon Post",AFB1B8:"Bombay",AFA09E:"Martini",AF9F1C:"Lucky",AF8F2C:"Alpine",AF8751:"Driftwood",AF593E:"Brown Rust",AF4D43:"Apple Blossom",AF4035:"Medium Carmine",AE809E:"Bouquet",AE6020:"Desert",AE4560:"Hippie Pink",ADE6C4:"Padua",ADDFAD:"Moss Green",ADBED1:"Casper",AD781B:"Mandalay",ACE1AF:"Celadon",ACDD4D:"Conifer",ACCBB1:"Spring Rain",ACB78E:"Swamp Green",ACACAC:"Silver Chalice",ACA59F:"Cloudy",ACA586:"Hillary",ACA494:"Napa",AC9E22:"Lemon Ginger",AC91CE:"East Side",AC8A56:"Limed Oak",ABA196:"Bronco",ABA0D9:"Cold Purple",AB917A:"Sandrift",AB3472:"Royal Heath",AB0563:"Lipstick",AAF0D1:"Magic Mint",AAD6E6:"Regent St Blue",AAABB7:"Spun Pearl",AAA9CD:"Logan",AAA5A9:"Shady Lady",AA8D6F:"Sandal",AA8B5B:"Muesli",AA4203:"Fire",AA375A:"Night Shadz",A9C6C2:"Opal",A9BEF2:"Perano",A9BDBF:"Tower Gray",A9B497:"Schist",A9ACB6:"Aluminium",A9A491:"Gray Olive",A8E3BD:"Chinook",A8BD9F:"Norway",A8AF8E:"Locust",A8AE9C:"Bud",A8A589:"Tallow",A899E6:"Dull Lavender",A8989B:"Dusty Gray",A86B6B:"Coral Tree",A86515:"Reno Sand",A85307:"Rich Gold",A7882C:"Luxor Gold",A72525:"Mexican Red",A6A29A:"Dawn",A69279:"Donkey Brown",A68B5B:"Barley Corn",A65529:"Paarl",A62F20:"Roof Terracotta",A5CB0C:"Bahia",A59B91:"Zorba",A50B5E:"Jazzberry Jam",A4AF6E:"Green Smoke",A4A6D3:"Wistful",A4A49D:"Delta",A3E3ED:"Blizzard Blue",A397B4:"Amethyst Smoke",A3807B:"Pharlap",A2AEAB:"Edward",A2AAB3:"Gray Chateau",A26645:"Cape Palliser",A23B6C:"Rouge",A2006D:"Flirt",A1E9DE:"Water Leaf",A1DAD7:"Aqua Island",A1C50A:"Citrus",A1ADB5:"Hit Gray",A1750D:"Buttered Rum",A02712:"Tabasco","9FDD8C":"Feijoa","9FD7D3":"Sinbad","9FA0B1":"Santas Gray","9F9F9C":"Star Dust","9F821C":"Reef Gold","9F381D":"Cognac","9EDEE0":"Morning Glory","9EB1CD":"Rock Blue","9EA91F":"Citron","9EA587":"Sage","9E5B40":"Sepia Skin","9E5302":"Chelsea Gem","9DE5FF":"Anakiwa","9DE093":"Granny Smith Apple","9DC209":"Pistachio","9DACB7":"Gull Gray","9D5616":"Hawaiian Tan","9C3336":"Stiletto","9B9E8F":"Lemon Grass","9B4703":"Oregon","9AC2B8":"Shadow Green","9AB973":"Olivine","9A9577":"Gurkha","9A6E61":"Toast","9A3820":"Prairie Sand","9999CC":"Blue Bell","997A8D":"Mountbatten Pink","9966CC":"Amethyst","991B07":"Totem Pole","98FF98":"Mint Green","988D77":"Pale Oyster","98811B":"Hacienda","98777B":"Bazaar","9874D3":"Lilac Bush","983D61":"Vin Rouge","97CD2D":"Atlantis","9771B5":"Wisteria","97605D":"Au Chico","96BBAB":"Summer Green","96A8A1":"Pewter","967BB6":"Lavender Purple","9678B6":"Purple Mountain's Majesty ","93DFB8":"Algae Green","93CCEA":"Cornflower","926F5B":"Beaver","92000A":"Sangria","908D39":"Sycamore","907B71":"Almond Frost","901E1E":"Old Brick","8FD6B4":"Vista Blue","8F8176":"Squirrel","8F4B0E":"Korma","8F3E33":"El Salva","8F021C":"Pohutukawa","8EABC1":"Nepal","8E8190":"Mamba","8E775E":"Domino","8E6F70":"Opium","8E4D1E":"Rope","8E0000":"Red Berry","8DA8CC":"Polo Blue","8D90A1":"Manatee","8D8974":"Granite Green","8D7662":"Cement","8D3F3F":"Tosca","8D3D38":"Sanguine Brown","8D0226":"Paprika","8C6495":"Trendy Pink","8C5738":"Potters Clay","8C472F":"Mule Fawn","8C055E":"Cardinal Pink","8BE6D8":"Riptide","8BA9A5":"Cascade","8BA690":"Envy","8B9FEE":"Portage","8B9C90":"Mantle","8B8680":"Natural Gray","8B847E":"Schooner","8B8470":"Olive Haze","8B6B0B":"Corn Harvest","8B0723":"Monarch","8B00FF":"Electric Violet","8AB9F1":"Jordy Blue","8A8F8A":"Stack","8A8389":"Monsoon","8A8360":"Clay Creek","8A73D6":"True V","8A3324":"Burnt Umber","897D6D":"Makara","888D65":"Avocado","87AB39":"Sushi","878D91":"Oslo Gray","877C7B":"Hurricane","87756E":"Americano","86949F":"Regent Gray","86560A":"Rusty Nail","864D1E":"Bull Shot","86483C":"Ironstone","863C3C":"Lotus","85C4CC":"Half Baked","859FAF":"Bali Hai","8581D9":"Chetwode Blue","84A0A0":"Granny Smith","83D0C6":"Monte Carlo","83AA5D":"Chelsea Cucumber","828F72":"Battleship Gray","826F65":"Sand Dune","816E71":"Spicy Pink","81422C":"Nutmeg","80CCEA":"Seagull","80B3C4":"Glacier","80B3AE":"Gulf Stream","807E79":"Friar Gray","80461B":"Russet","80341F":"Red Robin","800B47":"Rose Bud Cherry","7F76D3":"Moody Blue","7F7589":"Mobster","7F626D":"Falcon","7F3A02":"Peru Tan","7F1734":"Claret","7E3A15":"Copper Canyon","7DD8C6":"Bermuda","7DC8F7":"Malibu","7DA98D":"Bay Leaf","7D2C14":"Pueblo","7CB7BB":"Neptune","7CB0A1":"Acapulco","7CA1A6":"Gumbo","7C881A":"Trendy Green","7C7B82":"Jumbo","7C7B7A":"Concord","7C778A":"Topaz","7C7631":"Pesto","7C1C05":"Kenyan Copper","7BA05B":"Asparagus","7B9F80":"Amulet","7B8265":"Flax Smoke","7B7C94":"Waterloo ","7B7874":"Tapa","7B6608":"Yukon Gold","7B3F00":"Cinnamon","7B3801":"Red Beech","7AC488":"De York","7A89B8":"Wild Blue Yonder","7A7A7A":"Boulder","7A58C1":"Fuchsia Blue","7A013A":"Siren","79DEEC":"Spray","796D62":"Sandstone","796A78":"Fedora","795D4C":"Roman Coffee","78A39C":"Sea Nymph","788BBA":"Ship Cove","788A25":"Wasabi","78866B":"Camouflage Green","782F16":"Peanut","782D19":"Mocha","77DD77":"Pastel Green","779E86":"Oxley","776F61":"Pablo","773F1A":"Walnut","771F1F":"Crown of Thorns","770F05":"Dark Burgundy","76BD17":"Lima","7666C6":"Blue Marguerite","76395D":"Cosmic","7563A8":"Deluge","755A57":"Russett","74C365":"Mantis","747D83":"Rolling Stone","747D63":"Limed Ash","74640D":"Spicy Mustard","736D58":"Crocodile","736C9F":"Kimberly","734A12":"Raw Umber","731E8F":"Seance","727B89":"Raven","726D4E":"Go Ben","724A2F":"Old Copper","72010F":"Venetian Red","71D9E2":"Aquamarine Blue","716E10":"Olivetone","716B56":"Peat","715D47":"Tobacco Brown","714AB2":"Studio","71291D":"Metallic Copper","711A00":"Cedar Wood Finish","704F50":"Ferra","704A07":"Antique Bronze","701C1C":"Persian Plum","6FD0C5":"Downy","6F9D02":"Limeade","6F8E63":"Highland","6F6A61":"Flint","6F440C":"Cafe Royale","6E7783":"Pale Sky","6E6D57":"Kokoda","6E4B26":"Dallas","6E4826":"Pickled Bean","6E1D14":"Moccaccino","6E0902":"Red Oxide","6D92A1":"Gothic","6D9292":"Juniper","6D6C6C":"Dove Gray","6D5E54":"Pine Cone","6D0101":"Lonestar","6CDAE7":"Turquoise Blue","6C3082":"Eminence","6B8BA2":"Bermuda Gray","6B5755":"Dorado","6B4E31":"Shingle Fawn","6B3FA0":"Royal Purple","6B2A14":"Hairy Heath","6A6051":"Soya Bean","6A5D1B":"Himalaya","6A442E":"Spice","697E9A":"Lynch","695F62":"Scorpion","692D54":"Finn","685E6E":"Salt Box","67A712":"Christi","675FA6":"Scampi","67032D":"Black Rose","66FF66":"Screamin' Green","66FF00":"Bright Green","66B58F":"Silver Tree","66023C":"Tyrian Purple","65869F":"Hoki","65745D":"Willow Grove","652DC1":"Purple Heart","651A14":"Cherrywood","65000B":"Rosewood","64CCDB":"Viking","646E75":"Nevada","646A54":"Siam","63B76C":"Fern","639A8F":"Patina","624E9A":"Butterfly Bush","623F2D":"Quincy","622F30":"Buccaneer","61845F":"Glade Green","615D30":"Costa del Sol","6093D1":"Danube","606E68":"Corduroy","605B73":"Smoky","5FB3AC":"Tradewind","5FA777":"Aqua Forest","5F6672":"Shuttle Gray","5F5F6E":"Mid Gray","5F3D26":"Irish Coffee","5E5D3B":"Hemlock","5E483E":"Kabul","5DA19F":"Breaker Bay","5D7747":"Dingley","5D5E37":"Verdigris","5D5C58":"Chicago","5D4C51":"Don Juan","5D1E0F":"Redwood","5C5D75":"Comet","5C2E01":"Carnaby Tan","5C0536":"Mulberry Wood","5C0120":"Bordeaux","5B3013":"Jambalaya","5A87A0":"Horizon","5A6E9C":"Waikawa Gray","591D35":"Wine Berry","589AAF":"Hippie Blue","56B4BE":"Fountain Blue","5590D9":"Havelock Blue","556D56":"Finlandia","555B10":"Saratoga","55280C":"Cioccolato","54534D":"Fuscous Gray","53824B":"Hippie Green","523C94":"Gigas","520C17":"Maroon Oak","52001F":"Castro","51808F":"Smalt Blue","517C66":"Como","516E3D":"Chalet Green","50C878":"Emerald","4FA83D":"Apple","4F9D5D":"Fruit Salad","4F7942":"Fern Green","4F69C6":"Indigo","4F2398":"Daisy Bush","4F1C70":"Honey Flower","4EABD1":"Shakespeare","4E7F9E":"Wedgewood","4E6649":"Axolotl","4E4562":"Mulled Wine","4E420C":"Bronze Olive","4E3B41":"Matterhorn","4E2A5A":"Bossanova","4E0606":"Mahogany","4D5328":"Woodland","4D400F":"Bronzetone","4D3D14":"Punga","4D3833":"Rock","4D282E":"Livid Brown","4D282D":"Cowboy","4D1E01":"Indian Tan","4D0A18":"Cab Sav","4D0135":"Blackberry","4C4F56":"Abbey","4C3024":"Saddle","4B5D52":"Nandor","4A4E5A":"Trout","4A444B":"Gravel","4A4244":"Tundora","4A3C30":"Mondo","4A3004":"Deep Bronze","4A2A04":"Bracken","49371B":"Metallic Bronze","49170C":"Van Cleef","483C32":"Taupe","481C1C":"Cocoa Bean","460B41":"Loulou","45B1E8":"Picton Blue","456CAC":"San Marino","441D00":"Morocco Brown","44012D":"Barossa","436A0D":"Green Leaf","434C59":"River Bed","433E37":"Armadillo","41AA78":"Ocean Green","414C7D":"East Bay","413C37":"Merlin","411F10":"Paco","40A860":"Chateau Green","40826D":"Viridian","403D19":"Thatch Green","403B38":"Masala","40291D":"Cork","3FFF00":"Harlequin","3FC1AA":"Puerto Rico","3F5D53":"Mineral Green","3F583B":"Tom Thumb","3F4C3A":"Cabbage Pont","3F307F":"Minsk","3F3002":"Madras","3F2500":"Cola","3F2109":"Bronze","3EABBF":"Pelorous","3E3A44":"Ship Gray","3E2C1C":"Black Marlin","3E2B23":"English Walnut","3E1C14":"Cedar","3E0480":"Kingfisher Daisy","3D7D52":"Goblin","3D2B1F":"Bistre","3D0C02":"Bean  ","3C493A":"Lunar Green","3C4443":"Cape Cod","3C4151":"Bright Gray","3C3910":"Camouflage","3C2005":"Dark Ebony","3C1F76":"Meteorite","3C1206":"Rebel","3C0878":"Windsor","3B91B4":"Boston Blue","3B7A57":"Amazon","3B2820":"Treehouse","3B1F1F":"Jon","3B0910":"Aubergine","3B000B":"Temptress","3AB09E":"Keppel","3A6A47":"Killarney","3A686C":"William","3A2A6A":"Jacarta","3A2010":"Sambuca","3A0020":"Toledo","381A51":"Grape","37290E":"Brown Tumbleweed","371D09":"Clinker","36747D":"Ming","363C0D":"Waiouru","354E8C":"Chambray","350E57":"Jagger","350E42":"Valentino","33CC99":"Shamrock","33292F":"Thunder","33036B":"Christalle","327DA0":"Astral","327C14":"Bilbao","325D52":"Stromboli","32293A":"Blackcurrant","32127A":"Persian Indigo","317D82":"Paradiso","31728D":"Calypso","315BA1":"Azure","311C17":"Eclipse","30D5C8":"Turquoise","304B6A":"San Juan","302A0F":"Woodrush","301F1E":"Cocoa Brown","2F6168":"Casal","2F5A57":"Spectra","2F519E":"Sapphire","2F3CB3":"Governor Bay","2F270E":"Onion","2EBFD4":"Scooter","2E3F62":"Rhino","2E3222":"Rangitoto","2E1905":"Jacko Bean","2E0329":"Jacaranda","2D569B":"St Tropaz","2D383A":"Outer Space","2D2510":"Mikado","2C8C84":"Lochinvar","2C2133":"Bleached Cedar","2C1632":"Revolver","2C0E8C":"Blue Gem","2B3228":"Heavy Metal","2B194F":"Valhalla","2B0202":"Sepia Black","2A52BE":"Cerulean Blue","2A380B":"Turtle Green","2A2630":"Baltic Sea","2A140E":"Coffee Bean","2A0359":"Cherry Pie","29AB87":"Jungle Green","297B9A":"Jelly Bean","290C5E":"Violent Violet","286ACD":"Mariner","283A77":"Astronaut","281E15":"Oil","278A5B":"Eucalyptus","27504B":"Plantation","273A81":"Bay of Many","26283B":"Ebony Clay","26056A":"Paris M","2596D1":"Curious Blue","25311C":"Green Kelp","25272C":"Shark","251F4F":"Port Gore","24500F":"Green House","242E16":"Black Olive","242A1D":"Log Cabin","240C02":"Kilamanjaro","240A40":"Violet","211A0E":"Eternity","202E54":"Cloud Burst","20208D":"Jacksons Purple","1FC2C2":"Java","1F120F":"Night Rider","1E9AB0":"Eastern Blue","1E433C":"Te Papa Green","1E385B":"Cello","1E1708":"El Paso","1E1609":"Karaka","1E0F04":"Creole","1D6142":"Green Pea","1C7C7D":"Elm","1C402E":"Everglade","1C39BB":"Persian Blue","1C1E13":"Rangoon Green","1C1208":"Crowshead","1B659D":"Matisse","1B3162":"Biscay","1B2F11":"Seaweed","1B1404":"Acadia","1B127B":"Deep Koamaru","1B1035":"Haiti","1B0245":"Tolopea","1AB385":"Mountain Meadow","1A1A68":"Lucky Point","1959A8":"Fun Blue","19330E":"Palm Leaf","18587A":"Blumine","182D09":"Deep Forest Green","171F04":"Pine Tree","16322C":"Timber Green","162A40":"Big Stone","161D10":"Hunter Green","15736B":"Genoa","1560BD":"Denim","151F4C":"Bunting","1450AA":"Tory Blue","134F19":"Parsley","13264D":"Blue Zodiac","130A06":"Asphalt","126B40":"Jewel","120A8F":"Ultramarine","110C6C":"Arapawa","10121D":"Vulcan","0F2D9E":"Torea Bay","0E2A30":"Firefly","0E0E18":"Cinder","0D2E1C":"Bush","0D1C19":"Aztec","0D1117":"Bunker","0D0332":"Black Rock","0C8990":"Blue Chill","0C7A79":"Surfie Green","0C1911":"Racing Green","0C0D0F":"Woodsmoke","0C0B1D":"Ebony","0BDA51":"Malachite","0B6207":"San Felix","0B1304":"Black Forest","0B1107":"Gordons Green","0B0F08":"Marshland","0B0B0B":"Cod Gray","0A6F75":"Atoll","0A6906":"Japanese Laurel","0A480D":"Dark Fern","0A001C":"Black Russian","097F4B":"Salem","095859":"Deep Sea Green","093624":"Bottle Green","09255D":"Madison","09230F":"Palm Green","092256":"Downriver","08E8DE":"Bright Turquoise","088370":"Elf Green","082567":"Deep Sapphire","081910":"Black Bean","080110":"Jaguar","073A50":"Tarawera","06A189":"Niagara","069B81":"Gossamer","063537":"Tiber","062A78":"Catalina Blue","056F57":"Watercourse","055989":"Venice Blue","051657":"Gulf Blue","051040":"Deep Cove","044259":"Teal Blue","044022":"Zuccini","042E4C":"Blue Whale","041322":"Black Pearl","041004":"Midnight Moss","036A6E":"Mosque","032B52":"Green Vogue","03163C":"Tangaroa","02A4D3":"Cerulean","02866F":"Observatory","026395":"Bahama Blue","024E46":"Evening Sea","02478E":"Congress Blue","02402C":"Sherwood Green","022D15":"English Holly","01A368":"Green Haze","01826B":"Deep Sea","017987":"Blue Lagoon","01796F":"Pine Green","016D39":"Fun Green","016162":"Blue Stone","015E85":"Orient","014B43":"Aqua Deep","013F6A":"Regal Blue","013E62":"Astronaut Blue","01371A":"County Green","01361C":"Cardin Green","012731":"Daintree","011D13":"Holly","011635":"Midnight","010D1A":"Blue Charcoal","00CCCC":"Robin's Egg Blue ","00CC99":"Caribbean Green","00A86B":"Jade","00A693":"Persian Green","009DC4":"Pacific Blue","0095B6":"Bondi Blue","007FFF":"Azure Radiance","007EC7":"Lochmara","007BA7":"Deep Cerulean","0076A3":"Allports","00755E":"Tropical Rain Forest","0066FF":"Blue Ribbon","0066CC":"Science Blue","00581A":"Camarone","0056A7":"Endeavour","004950":"Sherpa Blue","004816":"Crusoe","0047AB":"Cobalt","004620":"Kaitoke Green","003E40":"Cyprus","003532":"Deep Teal","003399":"Smalt","003153":"Prussian Blue","002FA7":"International Klein Blue","002E20":"Burnham","002900":"Deep Fir","002387":"Resolution Blue","001B1C":"Swamp","000741":"Stratos"};},function(e){e.exports={252024:"Ink Black",383867:"China Blue",423937:"Pitch or Brownish Black",433635:"Reddish Black",454445:"Greenish Black",463759:"Plum Purple",533552:"Auricula Purple",555152:"Greyish Black",612741:"Purplish Red",613936:"Umber Brown",711518:"Arterial Blood Red",766051:"Clove Brown",864735:"Deep Orange-coloured Brown",946943:"Yellowish Brown",F1E9CD:"Snow White",F2E7CF:"Reddish White",ECE6D0:"Purplish White",F2EACC:"Yellowish White",F3E9CA:"Orange coloured White",F2EBCD:"Greenish White",E6E1C9:"Skimmed milk White",E2DDC6:"Greyish White",CBC8B7:"Ash Grey",BFBBB0:"Smoke Grey",BEBEB3:"French Grey",B7B5AC:"Pearl Grey",BAB191:"Yellowish Grey","9C9D9A":"Bluish Grey","8A8D84":"Greenish Grey","5B5C61":"Blackish Grey","413F44":"Bluish Black","241F20":"Velvet Black","281F3F":"Scotch Blue","1C1949":"Prussian Blue","4F638D":"Indigo Blue","5C6B8F":"Azure Blue","657ABB":"Ultramarine Blue","6F88AF":"Flax-Flower Blue","7994B5":"Berlin Blue","6FB5A8":"Verditter Blue","719BA2":"Greenish Blue","8AA1A6":"Greyish Blue",D0D5D3:"Bluish Lilac Purple","8590AE":"Bluish Purple","3A2F52":"Violet Purple","39334A":"Pansy Purple","6C6D94":"Campanula Purple","584C77":"Imperial Purple",BFBAC0:"Red Lilac Purple","77747F":"Lavender Purple","4A475C":"Pale Blackish Purple",B8BFAF:"Celadine Green",B2B599:"Mountain Green","979C84":"Leek Green","5D6161":"Blackish Green","61AC86":"Verdigris Green",A4B6A7:"Bluish Green",ADBA98:"Apple Green","93B778":"Emerald Green","7D8C55":"Grass Green","33431E":"Duck Green","7C8635":"Sap Green","8E9849":"Pistachio Green",C2C190:"Asparagus Green","67765B":"Olive Green",AB924B:"Oil Green",C8C76F:"Siskin Green",CCC050:"Sulphur Yellow",EBDD99:"Primrose Yellow",AB9649:"Wax Yellow",DBC364:"Lemon Yellow",E6D058:"Gamboge Yellow",EAD665:"Kings Yellow",D09B2C:"Saffron Yellow",A36629:"Gallstone Yellow",A77D35:"Honey Yellow",F0D696:"Straw Yellow",D7C485:"Wine Yellow",F1D28C:"Sienna Yellow",EFCC83:"Ochre Yellow",F3DAA7:"Cream Yellow",DFA837:"Dutch Orange",EBBC71:"Buff Orange",D17C3F:"Orpiment Orange","92462F":"Brownish Orange",BE7249:"Reddish Orange",BB603C:"Deep Reddish Orange",C76B4A:"Tile Red",A75536:"Hyacinth Red",B63E36:"Scarlet Red",B5493A:"Vermilion Red",CD6D57:"Aurora Red",E9C49D:"Flesh Red",EEDAC3:"Rose Red",EECFBF:"Peach Blossom Red",CE536B:"Carmine Red",B74A70:"Lake Red",B7757C:"Crimson Red","7A4848":"Cochineal Red","3F3033":"Veinous Blood Red","8D746F":"Brownish Purple Red","4D3635":"Chocolate Red","6E3B31":"Brownish Red","553D3A":"Deep Reddish Brown","7A4B3A":"Chestnut Brown",C39E6D:"Wood Brown","513E32":"Liver Brown","8B7859":"Hair Brown","9B856B":"Broccoli Brown","453B32":"Blackish Brown"};},function(e,a,r){r.r(a),r.d(a,"default",(function(){return c}));var n=r(0),F=r.n(n),o=r(2),i=r(1),l=r(3),t=F.a.get("#fff"),B=F.a.get("#000"),C=function(e,a){var r=Math.pow;return Math.sqrt(r(e[0]-a[0],2)+r(e[1]-a[1],2)+r(e[2]-a[2],2))},D=C(t.value,B.value),u=function(e,a){var r=e[3];return [(1-r)*a[0]+r*e[0],(1-r)*a[1]+r*e[1],(1-r)*a[2]+r*e[2],1]},E=function(e,a){if(1===e[3]&&1===a[3])return C(e,a);var r=C(u(e,t.value),a),n=C(u(e,B.value),a);return r<=n?r:n},A=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"",a=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"-";return e.trim().split("").reduce((function(e,r){return e+r.replace(/'/,"").replace(/\s/,a)}),"").toLocaleLowerCase()},s=function(e,a){var r=!!(2<arguments.length&&void 0!==arguments[2])&&arguments[2],n=!1;return 4===e.length&&4===a.length&&(n=e[0]===a[0]&&e[1]===a[1]&&e[2]===a[2],n=r?n:e[3]===a[3]),n},d=function(e,a,r,n,o){var i=r.value[3],l={name:e,distance:n};return o?(l.hex="#".concat(a),l.css="--color-".concat(A(e),": ").concat(l.hex)):(l.hex=F.a.to.hex(r.value),l.css=1>i?"--color-".concat(A(e),"-").concat(100*i,": ").concat(l.hex):"--color-".concat(A(e),": ").concat(l.hex)),null===F.a.get(l.hex)?l=void 0:l.rgb=F.a.to.rgb(F.a.get(l.hex).value),l},h=function(e,a){var r,n,o=!!(2<arguments.length&&void 0!==arguments[2])&&arguments[2],i=F.a.get(e),l=Object.keys(a),t=D;if(null!==i&&(o||(r=l.find((function(e){var a=F.a.get("#".concat(e));return s(a.value,i.value,!0)}))),void 0!==r&&(t=0),0<t)){var B=o?E:C;l.forEach((function(e){var a=F.a.get("#".concat(e)),n=B(i.value,a.value);n<t&&(r=e,t=n);}));}return void 0!==r&&(n=d(a[r],r,i,t,o)),n};function c(e){var a=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},r=Object.assign({},i,o);return a.list&&"web"===a.list?r=i:a.list&&"werner"===a.list&&(r=l),h(e,r,a.ignoreAlphaChannel)}},function(e,a,r){e.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]};},function(e,a,r){var n=r(7),F=Array.prototype.concat,o=Array.prototype.slice,i=e.exports=function(e){for(var a=[],r=0,i=e.length;r<i;r++){var l=e[r];n(l)?a=F.call(a,o.call(l)):a.push(l);}return a};i.wrap=function(e){return function(){return e(i(arguments))}};},function(e,a){e.exports=function(e){return !(!e||"string"==typeof e)&&(e instanceof Array||Array.isArray(e)||e.length>=0&&(e.splice instanceof Function||Object.getOwnPropertyDescriptor(e,e.length-1)&&"String"!==e.constructor.name))};}]).default}));

  var t$1,e$1,r$1,n$1,i$1=function(){return i$1=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var i in e=arguments[r])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},i$1.apply(this,arguments)};function o(t,e,r){if(r||2===arguments.length)for(var n,i=0,o=e.length;i<o;i++)!n&&i in e||(n||(n=Array.prototype.slice.call(e,0,i)),n[i]=e[i]);return t.concat(n||Array.prototype.slice.call(e))}!function(t){t.HEX="HEX",t.RGB="RGB",t.RGBA="RGBA",t.HSL="HSL",t.HSLA="HSLA",t.CMYK="CMYK";}(t$1||(t$1={})),function(t){t.ANALOGOUS="ANALOGOUS",t.COMPLEMENTARY="COMPLEMENTARY",t.SPLIT_COMPLEMENTARY="SPLIT_COMPLEMENTARY",t.TRIADIC="TRIADIC",t.TETRADIC="TETRADIC",t.SQUARE="SQUARE";}(e$1||(e$1={})),function(t){t.ADDITIVE="ADDITIVE",t.SUBTRACTIVE="SUBTRACTIVE";}(r$1||(r$1={})),function(t){t.black="#000000",t.silver="#C0C0C0",t.gray="#808080",t.white="#FFFFFF",t.maroon="#800000",t.red="#FF0000",t.purple="#800080",t.fuchsia="#FF00FF",t.green="#008000",t.lime="#00FF00",t.olive="#808000",t.yellow="#FFFF00",t.navy="#000080",t.blue="#0000FF",t.teal="#008080",t.aqua="#00FFFF",t.orange="#FFA500",t.aliceblue="#F0F8FF",t.antiquewhite="#FAEBD7",t.aquamarine="#7FFFD4",t.azure="#F0FFFF",t.beige="#F5F5DC",t.bisque="#FFE4C4",t.blanchedalmond="#FFEBCD",t.blueviolet="#8A2BE2",t.brown="#A52A2A",t.burlywood="#DEB887",t.cadetblue="#5F9EA0",t.chartreuse="#7FFF00",t.chocolate="#D2691E",t.coral="#FF7F50",t.cornflowerblue="#6495ED",t.cornsilk="#FFF8DC",t.crimson="#DC143C",t.cyan="#00FFFF",t.darkblue="#00008B",t.darkcyan="#008B8B",t.darkgoldenrod="#B8860B",t.darkgray="#A9A9A9",t.darkgreen="#006400",t.darkgrey="#A9A9A9",t.darkkhaki="#BDB76B",t.darkmagenta="#8B008B",t.darkolivegreen="#556B2F",t.darkorange="#FF8C00",t.darkorchid="#9932CC",t.darkred="#8B0000",t.darksalmon="#E9967A",t.darkseagreen="#8FBC8F",t.darkslateblue="#483D8B",t.darkslategray="#2F4F4F",t.darkslategrey="#2F4F4F",t.darkturquoise="#00CED1",t.darkviolet="#9400D3",t.deeppink="#FF1493",t.deepskyblue="#00BFFF",t.dimgray="#696969",t.dimgrey="#696969",t.dodgerblue="#1E90FF",t.firebrick="#B22222",t.floralwhite="#FFFAF0",t.forestgreen="#228B22",t.gainsboro="#DCDCDC",t.ghostwhite="#F8F8FF",t.gold="#FFD700",t.goldenrod="#DAA520",t.greenyellow="#ADFF2F",t.grey="#808080",t.honeydew="#F0FFF0",t.hotpink="#FF69B4",t.indianred="#CD5C5C",t.indigo="#4B0082",t.ivory="#FFFFF0",t.khaki="#F0E68C",t.lavender="#E6E6FA",t.lavenderblush="#FFF0F5",t.lawngreen="#7CFC00",t.lemonchiffon="#FFFACD",t.lightblue="#ADD8E6",t.lightcoral="#F08080",t.lightcyan="#E0FFFF",t.lightgoldenrodyellow="#FAFAD2",t.lightgray="#D3D3D3",t.lightgreen="#90EE90",t.lightgrey="#D3D3D3",t.lightpink="#FFB6C1",t.lightsalmon="#FFA07A",t.lightseagreen="#20B2AA",t.lightskyblue="#87CEFA",t.lightslategray="#778899",t.lightslategrey="#778899",t.lightsteelblue="#B0C4DE",t.lightyellow="#FFFFE0",t.limegreen="#32CD32",t.linen="#FAF0E6",t.magenta="#FF00FF",t.mediumaquamarine="#66CDAA",t.mediumblue="#0000CD",t.mediumorchid="#BA55D3",t.mediumpurple="#9370DB",t.mediumseagreen="#3CB371",t.mediumslateblue="#7B68EE",t.mediumspringgreen="#00FA9A",t.mediumturquoise="#48D1CC",t.mediumvioletred="#C71585",t.midnightblue="#191970",t.mintcream="#F5FFFA",t.mistyrose="#FFE4E1",t.moccasin="#FFE4B5",t.navajowhite="#FFDEAD",t.oldlace="#FDF5E6",t.olivedrab="#6B8E23",t.orangered="#FF4500",t.orchid="#DA70D6",t.palegoldenrod="#EEE8AA",t.palegreen="#98FB98",t.paleturquoise="#AFEEEE",t.palevioletred="#DB7093",t.papayawhip="#FFEFD5",t.peachpuff="#FFDAB9",t.peru="#CD853F",t.pink="#FFC0CB",t.plum="#DDA0DD",t.powderblue="#B0E0E6",t.rosybrown="#BC8F8F",t.royalblue="#4169E1",t.saddlebrown="#8B4513",t.salmon="#FA8072",t.sandybrown="#F4A460",t.seagreen="#2E8B57",t.seashell="#FFF5EE",t.sienna="#A0522D",t.skyblue="#87CEEB",t.slateblue="#6A5ACD",t.slategray="#708090",t.slategrey="#708090",t.snow="#FFFAFA",t.springgreen="#00FF7F",t.steelblue="#4682B4",t.tan="#D2B48C",t.thistle="#D8BFD8",t.tomato="#FF6347",t.turquoise="#40E0D0",t.violet="#EE82EE",t.wheat="#F5DEB3",t.whitesmoke="#F5F5F5",t.yellowgreen="#9ACD32",t.rebeccapurple="#663399";}(n$1||(n$1={}));var u$1,a$1,s$1,c$1,d$1,f$1,h$1,l=Object.keys(n$1),p=((u$1={})[t$1.HEX]=/^#(?:([a-f\d])([a-f\d])([a-f\d])([a-f\d])?|([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?)$/i,u$1[t$1.RGB]=/^rgb\s*\(\s*(?:(\d+%)\s*,\s*(\d+%)\s*,\s*(\d+%)|(\d+)\s*,\s*(\d+)\s*,\s*(\d+))\s*\)$/,u$1[t$1.RGBA]=/^rgba\s*\(\s*(?:(\d+%)\s*,\s*(\d+%)\s*,\s*(\d+%)|(\d+)\s*,\s*(\d+)\s*,\s*(\d+))\s*,\s*(\d\.?\d*)\s*\)$/,u$1[t$1.HSL]=/^hsl\s*\(\s*(-?\d+\.?\d*)\s*,\s*(\d+\.?\d*)%\s*,\s*(\d+\.?\d*)%s*\)$/,u$1[t$1.HSLA]=/^hsla\s*\(\s*(-?\d+\.?\d*)\s*,\s*(\d+\.?\d*)%\s*,\s*(\d+\.?\d*)%\s*,\s*(\d\.?\d*)\s*\)$/,u$1[t$1.CMYK]=/^(?:device-cmyk|cmyk)\s*\(\s*(?:(\d+\.?\d*%)\s*,\s*(\d+\.?\d*%)\s*,\s*(\d+\.?\d*%)\s*,\s*(\d+\.?\d*%)|(\d\.?\d*)\s*,\s*(\d\.?\d*)\s*,\s*(\d\.?\d*)\s*,\s*(\d\.?\d*))\s*\)$/,u$1),g$1=/^(\d+(?:\.\d+)?|\.\d+)%$/,b$1=/^0x([a-f\d]{1,2})$/i,F="The provided string color doesn't have a correct format",A$1="The provided color object doesn't have the proper keys or format",m$1=function(t,e,r){return r<0&&(r+=6),r>=6&&(r-=6),r<1?Math.round(255*((e-t)*r+t)):r<3?Math.round(255*e):r<4?Math.round(255*((e-t)*(4-r)+t)):Math.round(255*t)},y$1=function(t,e,r){e/=100;var n=(r/=100)<=.5?r*(e+1):r+e-r*e,i=2*r-n;return {r:m$1(i,n,(t/=60)+2),g:m$1(i,n,t),b:m$1(i,n,t-2)}},E=function(t,e,r,n){return n=1-n,{r:Math.round(255*(1-t)*n),g:Math.round(255*(1-e)*n),b:Math.round(255*(1-r)*n)}},H$1=function(t,e,r){t/=255,e/=255,r/=255;var n=1-Math.max(t,e,r),i=1-n,o=(i-t)/i,u=(i-e)/i,a=(i-r)/i;return {c:Math.round(100*o),m:Math.round(100*u),y:Math.round(100*a),k:Math.round(100*n)}},B=function(t,e,r,n){void 0===n&&(n=1),t/=255,e/=255,r/=255,n=Math.min(n,1);var i=Math.max(t,e,r),o=Math.min(t,e,r),u=i-o,a=0,s=0,c=(i+o)/2;if(0===u)a=0,s=0;else {switch(i){case t:a=(e-r)/u%6;break;case e:a=(r-t)/u+2;break;case r:a=(t-e)/u+4;}(a=Math.round(60*a))<0&&(a+=360),s=u/(1-Math.abs(2*c-1));}return {h:a,s:Math.round(100*s),l:Math.round(100*c),a:n}},v$1=function(t,e){if(t<0&&(t+=360),t>360&&(t-=360),360===t||0===t)return t;var r=[[0,120],[120,180],[180,240],[240,360]],n=[[0,60],[60,120],[120,240],[240,360]],i=e?n:r,o=0,u=0,a=0,s=0;return (e?r:n).find((function(e,r){return t>=e[0]&&t<e[1]&&(o=e[0],u=e[1],a=i[r][0],s=i[r][1],!0)})),a+(s-a)/(u-o)*(t-o)},M=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},R=function(t){return g$1.test(""+t)?+(""+t).replace(g$1,"$1"):Math.min(+t,100)},S=function(t){return 1===t.length&&(t+=t),parseInt(t,16)},C$1=function(t){var e=parseInt(""+t).toString(16).toUpperCase();return 1===e.length?"0x0"+e:"0x"+e},L=function(t){var e=parseInt(""+t).toString(16).toUpperCase();return 1===e.length&&(e="0"+e),e},D$1=function(t,e){return void 0===e&&(e=!1),!e&&g$1.test(t)?Math.min(255*+t.replace(g$1,"$1")/100,255):b$1.test(t)?3===t.length?e?parseInt(t+t.slice(-1))/255:parseInt(t+t.slice(-1)):e?parseInt(t)/255:parseInt(t):Math.min(+t,e?1:255)},G=function(t){return Math.min(g$1.test(t)?+t.replace(g$1,"$1")/100:+t,1)},k$1=function(t){return t.sort().join().toUpperCase()},O=function(t,e){void 0===e&&(e=0);var r=Math.pow(10,e);return Math.round(+t*r)/r},X=function(t,e,r){return Math.max(e,Math.min(t,r))},I$1=((a$1={})[t$1.HEX]=function(t){return "#"+L(t.r)+L(t.g)+L(t.b)+(M(t,"a")&&L(t.a)||"")},a$1[t$1.RGB]=function(t){return "rgb"+(M(t,"a")?"a":"")+"("+O(t.r)+","+O(t.g)+","+O(t.b)+(M(t,"a")&&","+O(t.a,2)||"")+")"},a$1[t$1.HSL]=function(t){return "hsl"+(M(t,"a")?"a":"")+"("+O(t.h)+","+O(t.s)+"%,"+O(t.l)+"%"+(M(t,"a")&&","+O(t.a,2)||"")+")"},a$1[t$1.CMYK]=function(t){return "cmyk("+O(t.c)+"%,"+O(t.m)+"%,"+O(t.y)+"%,"+O(t.k)+"%)"},a$1),j$1=function(t){return (t>360||t<0)&&(t-=360*Math.floor(t/360)),t},T$1=function(t){return isNaN(+t)||t>1?1:O(t,2)},Y=function(t,e,n){return e.reduce((function(e,u){return o(o([],e,!0),[i$1(i$1({},t),{h:n===r$1.ADDITIVE?j$1(t.h+u):j$1(v$1(v$1(t.h,!1)+u,!0))})],!1)}),[i$1({},t)])},P$1=function(t,e){return Y(t,[30,-30],e)},w$1=function(t,e){return Y(t,[180],e)},K=function(t,e){return Y(t,[150,-150],e)},x$1=function(t,e){return Y(t,[120,-120],e)},N$1=function(t,e){return Y(t,[60,-120,180],e)},V=function(t,e){return Y(t,[90,-90,180],e)},U=function(e){return "string"==typeof e?function(e){var r;if(Object.keys(t$1).some((function(t){if(p[t].test(e))return r=t,!0})),!r&&~l.indexOf(e)&&(r=t$1.HEX),!r)throw new Error(F);return r}(e):function(e){var r,n=!1,i=k$1(Object.keys(e));if(Object.keys(t$1).filter((function(e){return e!==t$1.HEX})).some((function(t){if(k$1(t.split(""))===i)return r=t,!0})),r&&r===t$1.RGB||r===t$1.RGBA){var o=Object.entries(e).map((function(t){return b$1.test(""+t[1])})),u=Object.entries(e).map((function(t){return g$1.test(""+t[1])||!b$1.test(""+t[1])&&!isNaN(+t[1])&&+t[1]<=255})),a=o.some((function(t,e){return e>0&&t!==o[e-1]})),s=u.some((function(t,e){return e>0&&t!==u[e-1]}));!(n=a||s||!o[0]&&!u[0])&&o[0]&&(r=t$1.HEX);}if(!r||n)throw new Error(A$1);return r}(e)},$$2=((s$1={})[t$1.HEX]=function(t){var e=(~l.indexOf(t)?n$1[t]:t).match(p.HEX),r={r:S(e[1]||e[5]),g:S(e[2]||e[6]),b:S(e[3]||e[7])},i=e[4]||e[8];return void 0!==i&&(r.a=S(i)/255),r},s$1[t$1.RGB]=function(t){var e=t.match(p.RGB),r=D$1(e[1]||e[4]),n=D$1(e[2]||e[5]),i=D$1(e[3]||e[6]);return {r:Math.min(r,255),g:Math.min(n,255),b:Math.min(i,255)}},s$1[t$1.RGBA]=function(t){var e=t.match(p.RGBA),r=D$1(e[1]||e[4]),n=D$1(e[2]||e[5]),i=D$1(e[3]||e[6]),o=+e[7];return {r:Math.min(r,255),g:Math.min(n,255),b:Math.min(i,255),a:T$1(o)}},s$1[t$1.HSL]=function(t){var e=t.match(p.HSL),r=j$1(+e[1]),n=R(e[2]),i=R(e[3]);return y$1(r,n,i)},s$1[t$1.HSLA]=function(t){var e=t.match(p.HSLA),r=j$1(+e[1]),n=R(e[2]),i=R(e[3]),o=+e[4],u=y$1(r,n,i);return u.a=T$1(o),u},s$1[t$1.CMYK]=function(t){var e=t.match(p.CMYK),r=G(e[1]||e[5]),n=G(e[2]||e[6]),i=G(e[3]||e[7]),o=G(e[4]||e[8]);return E(r,n,i,o)},s$1),q=((c$1={})[t$1.HEX]=function(t){var e={r:D$1(""+t.r),g:D$1(""+t.g),b:D$1(""+t.b)};return e.a=M(t,"a")?Math.min(D$1(""+t.a,!0),1):1,e},c$1[t$1.RGB]=function(t){var e=this.HEX(t);return delete e.a,e},c$1[t$1.RGBA]=function(t){return this.HEX(t)},c$1[t$1.HSL]=function(t){var e=R(""+t.s),r=R(""+t.l);return y$1(j$1(t.h),e,r)},c$1[t$1.HSLA]=function(t){var e=this.HSL(t);return e.a=T$1(t.a),e},c$1[t$1.CMYK]=function(t){var e=G(""+t.c),r=G(""+t.m),n=G(""+t.y),i=G(""+t.k);return E(e,r,n,i)},c$1),Q=function(t,e){return void 0===e&&(e=U(t)),"string"==typeof t?$$2[e](t):q[e](t)},_$1=((d$1={})[t$1.HEX]=function(t){return {r:C$1(t.r),g:C$1(t.g),b:C$1(t.b)}},d$1.HEXA=function(t){var e=_$1.HEX(t);return e.a=M(t,"a")?C$1(255*t.a):"0xFF",e},d$1[t$1.RGB]=function(t){return M(t,"a")&&delete t.a,t},d$1[t$1.RGBA]=function(t){return t.a=M(t,"a")?O(t.a,2):1,t},d$1[t$1.HSL]=function(t){var e=B(t.r,t.g,t.b);return delete e.a,e},d$1[t$1.HSLA]=function(t){var e=_$1.HSL(t);return e.a=M(t,"a")?O(t.a,2):1,e},d$1[t$1.CMYK]=function(t){return H$1(t.r,t.g,t.b)},d$1),z$1=function(e,r,n){var o=U(e),u="string"==typeof e,a=Q(e,o),s="string"==typeof e&&M(a,"a")||"string"!=typeof e&&M(e,"a"),c=B(a.r,a.g,a.b,a.a);s||delete c.a;var d=n?c.l/(r+1):(100-c.l)/(r+1),f=Array(r).fill(null).map((function(t,e){return i$1(i$1({},c),{l:c.l+d*(e+1)*(1-2*+n)})}));switch(o){case t$1.HEX:default:return f.map((function(t){var e=y$1(t.h,t.s,t.l);return s&&(e.a=t.a),u?s?I$1.HEX(i$1(i$1({},e),{a:O(255*e.a,2)})):I$1.HEX(e):s?_$1.HEXA(e):_$1.HEX(e)}));case t$1.RGB:case t$1.RGBA:return f.map((function(t){var e=y$1(t.h,t.s,t.l);return s&&(e.a=t.a),u?I$1.RGB(e):s?_$1.RGBA(e):_$1.RGB(e)}));case t$1.HSL:case t$1.HSLA:return f.map((function(t){return u?I$1.HSL(t):s?_$1.HSLA(i$1(i$1({},y$1(t.h,t.s,t.l)),{a:t.a})):_$1.HSL(y$1(t.h,t.s,t.l))}))}},J=((f$1={buildHarmony:function(e,r,n){var i=U(e),o=Q(e,i),u=B(o.r,o.g,o.b,o.a),a="string"==typeof e&&M(o,"a")||"string"!=typeof e&&M(e,"a"),s="string"==typeof e;switch(i){case t$1.HEX:default:return a?this.HEXA(u,r,n,s):this.HEX(u,r,n,s);case t$1.HSL:return this.HSL(u,r,n,s);case t$1.HSLA:return this.HSLA(u,r,n,s);case t$1.RGB:return this.RGB(u,r,n,s);case t$1.RGBA:return this.RGBA(u,r,n,s)}}})[t$1.HEX]=function(t,e,r,n){return e(t,r).map((function(t){return n?I$1.HEX(y$1(t.h,t.s,t.l)):_$1.HEX(y$1(t.h,t.s,t.l))}))},f$1.HEXA=function(t,e,r,n){return e(t,r).map((function(t){return n?I$1.HEX(i$1(i$1({},y$1(t.h,t.s,t.l)),{a:255*T$1(t.a)})):_$1.HEXA(i$1(i$1({},y$1(t.h,t.s,t.l)),{a:T$1(t.a)}))}))},f$1[t$1.RGB]=function(t,e,r,n){return e(t,r).map((function(t){return n?I$1.RGB(y$1(t.h,t.s,t.l)):_$1.RGB(y$1(t.h,t.s,t.l))}))},f$1[t$1.RGBA]=function(t,e,r,n){return e(t,r).map((function(t){return n?I$1.RGB(i$1(i$1({},y$1(t.h,t.s,t.l)),{a:T$1(t.a)})):_$1.RGBA(i$1(i$1({},y$1(t.h,t.s,t.l)),{a:T$1(t.a)}))}))},f$1[t$1.HSL]=function(t,e,r,n){return e(t,r).map((function(t){return n?I$1.HSL({h:t.h,s:t.s,l:t.l}):_$1.HSL(y$1(t.h,t.s,t.l))}))},f$1[t$1.HSLA]=function(t,e,r,n){return e(t,r).map((function(t){return n?I$1.HSL(i$1(i$1({},t),{a:T$1(t.a)})):_$1.HSLA(i$1(i$1({},y$1(t.h,t.s,t.l)),{a:T$1(t.a)}))}))},f$1),W=((h$1={mix:function(t,e){var n,o,u,a,s,c,d,f,h,l,p,g,b,F,A,m=t.map((function(t){var e=U(t);return Q(t,e)})),y=e===r$1.SUBTRACTIVE?m.map((function(t){var e,r,n,i,o,u,a,s,c,d,f,h,l,p,g=(e=t.r,r=t.g,n=t.b,i=Math.min(e,r,n),o=Math.min(255-e,255-r,255-n),u=e-i,a=r-i,s=n-i,c=Math.min(u,a),d=u-c,f=(a+c)/2,h=(s+a-c)/2,l=Math.max(d,f,h)/Math.max(u,a,s),p=isNaN(l)||l===1/0||l<=0?1:l,{r:d/p+o,y:f/p+o,b:h/p+o});return M(t,"a")&&(g.a=t.a),g})):null;function E(t){var n=e===r$1.ADDITIVE?{r:0,g:0,b:0,a:0}:{r:0,y:0,b:0,a:0};return t.reduce((function(t,n){var o=M(n,"a")?n.a:1,u={r:Math.min(t.r+n.r*o,255),b:Math.min(t.b+n.b*o,255),a:1-(1-o)*(1-t.a)},a="g"in t?t.g:t.y,s="g"in n?n.g:n.y;return i$1(i$1({},u),e===r$1.ADDITIVE?{g:Math.min(a+s*o,255)}:{y:Math.min(a+s*o,255)})}),n)}if(e===r$1.ADDITIVE)n=E(m);else {var H=E(y);o=H.r,u=H.y,a=H.b,s=Math.min(o,u,a),c=Math.min(255-o,255-u,255-a),d=o-s,f=u-s,h=a-s,l=Math.min(f,h),p=d+f-l,g=f+2*l,b=2*(h-l),F=Math.max(p,g,b)/Math.max(d,f,h),A=isNaN(F)||F===1/0||F<=0?1:F,(n={r:p/A+c,g:g/A+c,b:b/A+c}).a=H.a;}return {r:O(n.r,2),g:O(n.g,2),b:O(n.b,2),a:X(n.a,0,1)}}})[t$1.HEX]=function(t,e,r){var n=this.mix(t,e);return delete n.a,r?I$1.HEX(n):_$1.HEX(n)},h$1.HEXA=function(t,e,r){var n=this.mix(t,e);return n.a=r?255*T$1(n.a):T$1(n.a),r?I$1.HEX(n):_$1.HEXA(n)},h$1[t$1.RGB]=function(t,e,r){var n=this.mix(t,e);return delete n.a,r?I$1.RGB(n):_$1.RGB(n)},h$1[t$1.RGBA]=function(t,e,r){var n=this.mix(t,e);return r?I$1.RGB(n):_$1.RGBA(n)},h$1[t$1.HSL]=function(t,e,r){var n=this.mix(t,e),i=B(n.r,n.g,n.b);return delete n.a,delete i.a,r?I$1.HSL(i):_$1.HSL(n)},h$1[t$1.HSLA]=function(t,e,r){var n=this.mix(t,e),i=B(n.r,n.g,n.b,n.a);return r?I$1.HSL(i):_$1.HSLA(n)},h$1),Z=function(t,e){return "string"==typeof t&&e||"object"==typeof t&&!e},tt=function(t,e,r,n,i){var o=n(Q(t,e));return r?i(o):o},et=function(t,e,r,n,i,o){r<1&&(r=5);var u=function(t,e,r){var n=r-1,i=(e.r-t.r)/n,o=(e.g-t.g)/n,u=(e.b-t.b)/n,a=T$1(t.a),s=(T$1(e.a)-a)/n;return Array(r).fill(null).map((function(r,c){return 0===c?t:c===n?e:{r:O(t.r+i*c),g:O(t.g+o*c),b:O(t.b+u*c),a:O(a+s*c,2)}}))}(Q(t),Q(e),r);return u.map((function(t){var e=i(t);return n?o(e):e}))},rt=function(){function n(t){this.rgb=Q(t),this.updateHSL(),this.updateCMYK();}return n.prototype.updateRGB=function(){this.rgb=i$1(i$1({},y$1(this.hsl.h,this.hsl.s,this.hsl.l)),{a:this.hsl.a});},n.prototype.updateRGBFromCMYK=function(){this.rgb=i$1(i$1({},E(this.cmyk.c,this.cmyk.m,this.cmyk.y,this.cmyk.k)),{a:this.rgb.a});},n.prototype.updateHSL=function(){this.hsl=B(this.rgb.r,this.rgb.g,this.rgb.b,this.rgb.a);},n.prototype.updateCMYK=function(){this.cmyk=H$1(this.rgb.r,this.rgb.g,this.rgb.b);},n.prototype.updateRGBAndCMYK=function(){return this.updateRGB(),this.updateCMYK(),this},n.prototype.updateHSLAndCMYK=function(){return this.updateHSL(),this.updateCMYK(),this},n.prototype.updateRGBAndHSL=function(){return this.updateRGBFromCMYK(),this.updateHSL(),this},n.prototype.setH=function(t){return this.hsl.h=j$1(t),this.updateRGBAndCMYK()},n.prototype.setS=function(t){return this.hsl.s=X(t,0,100),this.updateRGBAndCMYK()},n.prototype.setL=function(t){return this.hsl.l=X(t,0,100),this.updateRGBAndCMYK()},n.prototype.setR=function(t){return this.rgb.r=X(t,0,255),this.updateHSLAndCMYK()},n.prototype.setG=function(t){return this.rgb.g=X(t,0,255),this.updateHSLAndCMYK()},n.prototype.setB=function(t){return this.rgb.b=X(t,0,255),this.updateHSLAndCMYK()},n.prototype.setA=function(t){return this.hsl.a=this.rgb.a=X(t,0,1),this},n.prototype.setC=function(t){return this.cmyk.c=X(t,0,100),this.updateRGBAndHSL()},n.prototype.setM=function(t){return this.cmyk.m=X(t,0,100),this.updateRGBAndHSL()},n.prototype.setY=function(t){return this.cmyk.y=X(t,0,100),this.updateRGBAndHSL()},n.prototype.setK=function(t){return this.cmyk.k=X(t,0,100),this.updateRGBAndHSL()},Object.defineProperty(n.prototype,"H",{get:function(){return O(this.hsl.h)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"S",{get:function(){return O(this.hsl.s)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"L",{get:function(){return O(this.hsl.l)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"R",{get:function(){return O(this.rgb.r)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"G",{get:function(){return O(this.rgb.g)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"B",{get:function(){return O(this.rgb.b)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"A",{get:function(){return O(this.hsl.a,2)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"C",{get:function(){return O(this.cmyk.c)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"M",{get:function(){return O(this.cmyk.m)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"Y",{get:function(){return O(this.cmyk.y)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"K",{get:function(){return O(this.cmyk.k)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"HEXObject",{get:function(){return _$1.HEX(this.rgb)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"HEXAObject",{get:function(){return _$1.HEXA(this.rgb)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"RGBObject",{get:function(){return {r:this.R,g:this.G,b:this.B}},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"RGBAObject",{get:function(){return i$1(i$1({},this.RGBObject),{a:this.A})},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"HSLObject",{get:function(){return {h:this.H,s:this.S,l:this.L}},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"HSLAObject",{get:function(){return i$1(i$1({},this.HSLObject),{a:this.A})},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"CMYKObject",{get:function(){return {c:this.C,m:this.M,y:this.Y,k:this.K}},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"HEX",{get:function(){var t=this.rgb,e={r:t.r,g:t.g,b:t.b};return I$1.HEX(e)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"HEXA",{get:function(){var t=this.rgb,e={r:t.r,g:t.g,b:t.b,a:255*this.A};return I$1.HEX(e)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"RGB",{get:function(){var t=this.rgb,e={r:t.r,g:t.g,b:t.b};return I$1.RGB(e)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"RGBA",{get:function(){var t=this.rgb,e={r:t.r,g:t.g,b:t.b,a:this.A};return I$1.RGB(e)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"HSL",{get:function(){var t=this.hsl,e={h:t.h,s:t.s,l:t.l};return I$1.HSL(e)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"HSLA",{get:function(){return I$1.HSL(this.hsl)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"CMYK",{get:function(){return I$1.CMYK(this.cmyk)},enumerable:!1,configurable:!0}),n.toHEX=function(t,e){void 0===e&&(e=!0);var r=U(t);return tt(t,r,e,_$1.HEX,I$1.HEX)},n.toHEXA=function(t,e){void 0===e&&(e=!0);var r=U(t);return tt(t,r,e,_$1.HEXA,I$1.HEX)},n.toRGB=function(t,e){void 0===e&&(e=!0);var r=U(t);return tt(t,r,e,_$1.RGB,I$1.RGB)},n.toRGBA=function(t,e){void 0===e&&(e=!0);var r=U(t);return tt(t,r,e,_$1.RGBA,I$1.RGB)},n.toHSL=function(e,r){void 0===r&&(r=!0);var n=U(e);return n===t$1.HSL&&Z(e,r)?e:tt(e,n,r,_$1.HSL,I$1.HSL)},n.toHSLA=function(e,r){void 0===r&&(r=!0);var n=U(e);return n===t$1.HSLA&&Z(e,r)?e:tt(e,n,r,_$1.HSLA,I$1.HSL)},n.toCMYK=function(e,r){void 0===r&&(r=!0);var n=U(e);return n===t$1.CMYK&&Z(e,r)?e:tt(e,n,r,_$1.CMYK,I$1.CMYK)},n.getBlendHEX=function(t,e,r,n){return void 0===r&&(r=5),void 0===n&&(n=!0),et(t,e,r,n,_$1.HEX,I$1.HEX)},n.getBlendHEXA=function(t,e,r,n){return void 0===r&&(r=5),void 0===n&&(n=!0),et(t,e,r,n,_$1.HEXA,I$1.HEX)},n.getBlendRGB=function(t,e,r,n){return void 0===r&&(r=5),void 0===n&&(n=!0),et(t,e,r,n,_$1.RGB,I$1.RGB)},n.getBlendRGBA=function(t,e,r,n){return void 0===r&&(r=5),void 0===n&&(n=!0),et(t,e,r,n,_$1.RGBA,I$1.RGB)},n.getBlendHSL=function(t,e,r,n){return void 0===r&&(r=5),void 0===n&&(n=!0),et(t,e,r,n,_$1.HSL,I$1.HSL)},n.getBlendHSLA=function(t,e,r,n){return void 0===r&&(r=5),void 0===n&&(n=!0),et(t,e,r,n,_$1.HSLA,I$1.HSL)},n.getMixHEX=function(t,e,n){return void 0===e&&(e=r$1.ADDITIVE),void 0===n&&(n=!0),W.HEX(t,e,n)},n.getMixHEXA=function(t,e,n){return void 0===e&&(e=r$1.ADDITIVE),void 0===n&&(n=!0),W.HEXA(t,e,n)},n.getMixRGB=function(t,e,n){return void 0===e&&(e=r$1.ADDITIVE),void 0===n&&(n=!0),W.RGB(t,e,n)},n.getMixRGBA=function(t,e,n){return void 0===e&&(e=r$1.ADDITIVE),void 0===n&&(n=!0),W.RGBA(t,e,n)},n.getMixHSL=function(t,e,n){return void 0===e&&(e=r$1.ADDITIVE),void 0===n&&(n=!0),W.HSL(t,e,n)},n.getMixHSLA=function(t,e,n){return void 0===e&&(e=r$1.ADDITIVE),void 0===n&&(n=!0),W.HSLA(t,e,n)},n.getShades=function(t,e){return z$1(t,e,!0)},n.getTints=function(t,e){return z$1(t,e,!1)},n.getHarmony=function(t,n,i){switch(void 0===n&&(n=e$1.COMPLEMENTARY),void 0===i&&(i=r$1.ADDITIVE),n){case e$1.ANALOGOUS:return J.buildHarmony(t,P$1,i);case e$1.SPLIT_COMPLEMENTARY:return J.buildHarmony(t,K,i);case e$1.TRIADIC:return J.buildHarmony(t,x$1,i);case e$1.TETRADIC:return J.buildHarmony(t,N$1,i);case e$1.SQUARE:return J.buildHarmony(t,V,i);default:return J.buildHarmony(t,w$1,i)}},n}();

  class Color$1 {
      constructor(colorStr, colorSpace = 'werner') {

          this.colorStr = colorStr;
          this.colorSpace = colorSpace;

      }

      // color = hsv(...this.colorStr))
      get humanName() {

          return getColorName( rt.toHEXA(this.colorStr), {list: this.colorSpace}).name;
      }

      static toHSLA(arr) {
          var hsl = Util.hsv(...arr);
          return hsl
      }

      static fromHSLA(arr) {
          var hsl = Util.hsv(...arr);
          return new Color$1(hsl);
      }
  }

  class DNA {

      constructor(genes) {
          var PAR = {};
          if(typeof(genes) == "undefined" || genes.seed == null) {
            this.seed = DNA.newSeed(); 
          }else if( typeof(genes.seed) !== "undefined" && genes.seed !== null)  { 
            console.log('genes seed', genes.seed);
            this.seed = genes.seed.toString();
          }
          Math.seed(this.seed);
          PAR.seed = Number(this.seed);
          var randint = (x,y) => (Math.floor(Util.normRand(x,y)));
        

          const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
   
          PAR.capShapeMaskCoeff = 2;
          PAR.flowerShapeMaskCoeff = 0.2;
          PAR.leafShapeMaskCoeff = 0.5;
          PAR.flowerShapeMask = (x) => ( Util.pow(Util.sin(Util.PI*x),this.genes.flowerShapeMaskCoeff));
          PAR.leafShapeMask = (x) => (Util.pow(Util.sin(Util.PI*x),this.genes.leafShapeMaskCoeff));
          PAR.flowerChance = Util.randChoice([Util.normRand(0,0.08),Util.normRand(0,0.03)]);
          PAR.leafChance = Util.randChoice([0, Util.normRand(0,0.1), Util.normRand(0,0.1)]);
          PAR.leafType = Util.randChoice([
            [1,randint(2,5)],
            [2,randint(3,7),randint(3,8)],
            [2,randint(3,7),randint(3,8)],
          ]);
          PAR.noiseScale = 100; //10
          PAR.flowerShapeNoiseSeed = Math.random()*Util.PI;
          PAR.flowerJaggedness = Util.normRand(0.5,8) * PAR.noiseScale;
          PAR.flowerShape = (x) => (Noise.noise(x*this.genes.flowerJaggedness,this.genes.flowerShapeNoiseSeed)*this.genes.flowerShapeMask(x));
        
        
          Math.random()*Util.PI;
          PAR.leafJaggedness = Util.normRand(0.1,40);
          PAR.leafPointyness = Util.normRand(0.5,1.5);
          PAR.leafShape = Util.randChoice([
            (x) => (Noise.noise(x*this.genes.leafJaggedness,this.genes.flowerShapeNoiseSeed)*this.genes.leafShapeMask(x)),
            (x) => (Util.pow(Util.sin(Util.PI*x),this.genes.leafPointyness))
          ]);
        
          var flowerHue0 = (Util.normRand(0,180)-130+360)%360;
          var flowerHue1 = Math.floor((flowerHue0 + Util.normRand(-70,70) + 360)%360);
          var flowerValue0 = Math.min(1,Util.normRand(0.5,1.3));
          var flowerValue1 = Math.min(1,Util.normRand(0.5,1.3));
          var flowerSaturation0 = Util.normRand(0,1.1-flowerValue0);
          var flowerSaturation1 = Util.normRand(0,1.1-flowerValue1);
        
          PAR.flowerColor = {min:[flowerHue0,flowerSaturation0,flowerValue0,Util.normRand(0.8,1)],
                             max:[flowerHue1,flowerSaturation1,flowerValue1,Util.normRand(0.5,1)]};


          var saturationWeight = 0.2;

          PAR.flowerColor.min[1] = clamp(PAR.flowerColor.min[1] + saturationWeight, 0, 1);
          PAR.flowerColor.max[1] = clamp(PAR.flowerColor.max[1] + saturationWeight, 0, 1);
          PAR.leafColor = {min:[Util.normRand(10,200),Util.normRand(0.05,0.4),Util.normRand(0.3,0.7),Util.normRand(0.8,1)],
                           max:[Util.normRand(10,200),Util.normRand(0.05,0.4),Util.normRand(0.3,0.7),Util.normRand(0.8,1)]};
        

          
          [Util.normRand(-0.5,0.5),Util.normRand(5,10)];
          [Math.random()*Util.PI, Util.normRand(1,5)];
        
          var curveCoeff2 = [Math.random()*Util.PI,Util.normRand(5,15)];
          [Math.random()*Util.PI,Util.normRand(1,5)];
          var curveCoeff4 = [Math.random()*0.5,Util.normRand(0.8,1.2)];
        
          PAR.flowerOpenCurve = Util.randChoice([
            (x,op) => (
              (x < 0.1) ? 
                2+op*curveCoeff2[1]
              : Noise.noise(x*10,curveCoeff2[0])),
            (x,op) => (
              (x < curveCoeff4[0]) ? 0 : 10-x*Util.mapval(op,0,1,16,20)*curveCoeff4[1]
            )
          ]);
         
          PAR.flowerColorCurve = Util.randChoice([
              (x)=>(Util.sigmoid(x+curveCoeff4[0],curveCoeff4[1])),
              // (x)=>(Noise.noise(x*curveCoeff1[1],curveCoeff1[0])) // this results in see-through
          ]);
          // PAR.flowerColorCurve =
          // All calls to random impact the seed of the noise function. To keep the randomness consistent, when 
          // overriding parameters make sure to keep the original call in place and then overwite the variable
          // with the desired parameter on the following line. 
          // 
          // For example, if you wanted to change the leaf shape, you would need to keep the original call to
          //
          // PAR.leafPosition = Util.randChoice([1,2]) // Keep this line to keep the randomness consistent
          // PAR.leafPosition = 2 // This is the new call

          PAR.flowerLength = Util.normRand(5,55); //* (0.1-PAR.flowerChance)*10
          PAR.flowerWidth = Util.normRand(5,30); 
          PAR.flowerPetal = Math.round(Util.mapval(PAR.flowerWidth,5,50,10,3));

          PAR.pedicelLength = Util.normRand(5,30);
        
          PAR.stemWidth = Util.normRand(2,11);
          PAR.stemBend = Util.normRand(2,16);
          PAR.stemLength = Util.normRand(300,400);
          PAR.stemCount = Util.randChoice([2,3,4,5]);
        
          PAR.sheathLength = Util.randChoice([0,Util.normRand(50,100)]);
          PAR.sheathWidth = Util.normRand(5,15);
          
          PAR.shootCount = Util.normRand(1,7);
          PAR.shootLength = Util.normRand(50,180);

          PAR.leafPosition = Util.randChoice([1,2]);
          PAR.leafLength = Util.normRand(30,100);
          PAR.leafWidth = Util.normRand(5,30);

          PAR.innerLength = Math.min(Util.normRand(0,20),PAR.flowerLength*0.8);

          PAR.innerWidth = Math.min(Util.randChoice([0,Util.normRand(1,8)]),PAR.flowerWidth*0.8);
          PAR.innerShape = (x) => (Util.pow(Util.sin(Util.PI*x),1));
          var innerHue = Util.normRand(0,60);
          PAR.innerColor = {min:[innerHue,Util.normRand(0.1,0.7),Util.normRand(0.5,0.9),Util.normRand(0.8,1)],
                            max:[innerHue,Util.normRand(0.1,0.7),Util.normRand(0.5,0.9),Util.normRand(0.5,1)]};
          

          PAR.branchWidth = Util.normRand(0.4,1.3);

          PAR.branchTwist = Math.round(Util.normRand(2,5));
          PAR.branchDepth = Util.randChoice([3,4]);
          PAR.branchFork = Util.randChoice([4,5,6,7]);
        
          var branchHue = Util.normRand(30,60);
          var branchSaturation = Util.normRand(0.05,0.3);
          var branchValue = Util.normRand(0.7,0.9);

          PAR.branchColor = {min:[branchHue,branchSaturation,branchValue,1],
                             max:[branchHue,branchSaturation,branchValue,1]};

          // if(genes !== undefined) {
            // genes.flowerOpenCurve = PAR.flowerOpenCurve;
            // genes.flowerColorCurve = PAR.flowerColorCurve;
            // this.genes = genes;
            // return 
          // }
          this.genes = {
            ...PAR,
            ...genes
          };
          this.genes.seed = this.seed;
      }


      static newSeed() {
        // let seed = (""+(new Date()).getTime())
        let seed = Math.seedrandom((""+(new Date()).getTime()));
        return seed;
      }

      get flowerColors() {
          return [this.color(this.genes.flowerColor.min).humanName, this.color(this.genes.flowerColor.max).humanName];
      }

      get leafColors() {
          var colorNameSpace = 'web';
          return [this.color(this.genes.leafColor.min, colorNameSpace).humanName, this.color(this.genes.leafColor.max, colorNameSpace).humanName];
      }

      get branchColors() {
          var colorNameSpace = 'web';
          return [this.color(this.genes.branchColor.min, colorNameSpace).humanName, this.color(this.genes.branchColor.max, colorNameSpace).humanName];
      }


      get innerColors() {
          return [this.color(this.genes.innerColor.min).humanName,this.color(this.genes.innerColor.max).humanName];
      }

      color(col) {
          return Color$1.fromHSLA(col);
      }





  }

  class Drawable {

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
          let b1 = Layer.boundingBox(layer0);
          let b2 = Layer.boundingBox(layer1);
          let bd = {
              xmin:Math.min(b1.xmin,b2.xmin),
              xmax:Math.max(b1.xmax,b2.xmax),
              ymin:Math.min(b1.ymin,b2.ymin),
              ymax:Math.max(b1.ymax,b2.ymax),
              cWidth: this.ctx.canvas.width,
              cHeight: this.ctx.canvas.height
          };
          
          let boundingWidth = bd.xmax - bd.xmin;
          let boundingHeight = bd.ymax - bd.ymin;

          let xref = (bd.cWidth/2 - boundingWidth/2) - (this.xof -  boundingWidth/2);
          let yref = (bd.cHeight/2 - boundingHeight/2) - bd.ymin/2;

          Layer.blit(this.ctx,layer0,{ble:blend1,xof:xref  + xExtra,yof:yref + yExtra});
          Layer.blit(this.ctx,layer1,{ble:blend2,xof:xref + xExtra,yof:yref + yExtra});

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

  class Descriptor {

      constructor(str) {
          this.str = str;
      }

      color(col) {
          return Color.fromHSLA(col);
      }

      capitalize() {
          return this.str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      }

      toString() {
          return this.capitalize().trim();
      }

  }

  class ColorRangeDescriptor extends Descriptor {

      constructor(args) {
          super();
          this.colors = args;
      }

      toString() {
         return [...new Set(this.colors)].join( " to ");
      }

  }

  class NameGenerator {

      constructor(args) {

          this.baseNames = args.baseNames || [];
          this.moodAdjectives = args.moodAdjectives || [];
          this.locationAdjectives = args.locationAdjectives || [];

      }

      commonName() {
          return this.randomPick(this.baseNames);
      }

      randomPick(arr, count = 1) {
          return [...arr].sort(() => Math.floor(0.5 - Math.random())).slice(0, count);
      }

      name(moodCount = 1, locationCount = 1) {
          var randomName = this.commonName();
          var mood = this.randomPick(this.moodAdjectives, moodCount);
          var location = this.randomPick(this.locationAdjectives, locationCount);

          var locator = "";
          var descriptor = "";
          var joiner = "";

          if(Math.random() < 0.4) {
              if(Math.random() < 0.7) {
                  // Example: Fallen Sky Violet
                  descriptor = `${mood} ${location}`;
              }else {
                  // Example: Fallen Violet from the Sky
                  joiner = this.randomPick(["from the", "of the"], 1);
                  descriptor = mood.join(' ');
                  locator =  location.join(' ');
              }
          }else {
              var descriptor = mood;
          }

          return new Descriptor(`${descriptor} ${randomName} ${joiner} ${locator}`);
      }
  }

  class Plant extends Drawable {

      BASE_NAMES = ["Poppy", "Dahlia", "Fern", "Flower", "Petal", "Iris", "Jade", "Kale", "Stickweed", "Tassel", "Lilac", "Magnolia", "Narcissus", "Olive", "Quince", "Rose", "Sunflower", "Tulip", "Umbrella", "Viovar", "Willow", "Lily"];
      MOOD_ADJECTIVES = ["Fragrant", "adorable", "jealous", "beautiful", "clean", "drab", "elegant", "fancy", "glamorous", "handsome", "long", "magnificent", "old-fashioned", "plain", "quaint", "sparkling", "water",  "unsightly", "wide-eyed", "angry", "bewildered", "clumsy", "embarrassed", "fierce", "helpless", "itchy", "jealous", "lazy", "mysterious", "nervous", "panicky", "thoughtless", "thorny", "thornless", "upright", "worried"];
      LOCATION_ADJECTIVES = ["cave", "dwarf", "hill", "island", "mountain", "ocean", "plain", "river", "sea", "swamp", "heavens", "sky", "cliff"];

      type = "plant"

      curveCoeff0 = [Util.normRand(-0.5,0.5),Util.normRand(5,10)]
      curveCoeff1 = [Math.random()*Util.PI, Util.normRand(1,5)]
      curveCoeff2 = [Math.random()*Util.PI,Util.normRand(5,15)]
      curveCoeff3 = [Math.random()*Util.PI,Util.normRand(1,5)]
      curveCoeff4 = [Math.random()*0.5,Util.normRand(0.8,1.2)];

      constructor(args) {
          super(args);

          this.args =(args != undefined) ? args : {};
          this.xof = (args.xof != undefined) ? args.xof : 0;  
          this.yof = (args.yof != undefined) ? args.yof : 0;
          this.width = (args.width != undefined) ? args.width : 0;
          this.height = (args.height != undefined) ? args.height: 0;
          this.dna = (args.dna != undefined) ? args.dna : new DNA();
          this.filtering_enabled = (args.filtering_enabled != undefined) ? args.filtering_enabled : true;
              
      }
      clamp(num, min, max) {
         return Math.min(Math.max(num, min), max);
      }
      get genes() {
          return this.dna.genes;
      }

      get seed() {
          return this.dna.seed;
      }

      get name() {
          if(this.plantName !== undefined) {
              return this.plantName;
          }else {
            let nameGenerator = new NameGenerator({
              baseNames: this.BASE_NAMES,
              moodAdjectives: this.MOOD_ADJECTIVES,
              locationAdjectives: this.LOCATION_ADJECTIVES
            });
            this.plantName = nameGenerator.name();
            return this.plantName;
          }
      }

      get description() {

          return {
              flowers: new ColorRangeDescriptor(this.dna.flowerColors),
              branches: new ColorRangeDescriptor(this.dna.branchColors),
              leaves: new ColorRangeDescriptor(this.dna.leafColors),
          }

      }


      leaf(args){
          args =(args != undefined) ? args : {};
          var ctx = (args.ctx != undefined) ? args.ctx : CTX;  
          var xof = (args.xof != undefined) ? args.xof : 0;  
          var yof = (args.yof != undefined) ? args.yof : 0;  
          var rot = (args.rot != undefined) ? args.rot : [Util.PI/2,0,0];
          var len = (args.len != undefined) ? args.len : 500;
          var seg = (args.seg != undefined) ? args.seg : 40;
          var wid = (args.wid != undefined) ? args.wid : (x) => (Util.sin(x*Util.PI)*20);
          var vei = (args.vei != undefined) ? args.vei : [1,3];
          var flo = (args.flo != undefined) ? args.flo : false;
          var col = (args.col != undefined) ? args.col : 
            {min:[90,0.2,0.3,1],max:[90,0.1,0.9,1]};
          var cof = (args.cof != undefined) ? args.cof : (x) => (x);
          var ben = (args.ben != undefined) ? args.ben : 
            (x) => ([Util.normRand(-10,10),0,Util.normRand(-5,5)]);
        
          var disp = v3.zero;
          var crot = v3.zero;
          var P = [disp];
          var L = [disp];
          var R = [disp];
        


          var orient = (v) => (v3.roteuler(v,rot));
        
          for (var i = 0; i < seg; i++){
            var p = i/(seg-1);
            crot= v3.add(crot,v3.scale(ben(p),1/seg));
            disp = v3.add(disp,orient(v3.roteuler([0,0,len/seg],crot)));
            var w = wid(p);
            var l = v3.add(disp,orient(v3.roteuler([-w,0,0],crot)));
            var r = v3.add(disp,orient(v3.roteuler([w,0,0],crot)));

            if (i > 0){
              var v0 = v3.subtract(disp,L[-1]);
              var v1 = v3.subtract(l,disp);
              var v2 = v3.cross(v0,v1);
              if (!flo){
                var lt = Util.mapval(Util.abs(v3.ang(v2,[0,-1,0])),0,Util.PI,1,0);
              }else {
                var lt = p*Util.normRand(0.95,1);
              }
              lt = cof(lt) || 0;
        
              var h = Util.lerpHue(col.min[0],col.max[0],lt);
              var s = Util.mapval(lt,0,1,col.min[1],col.max[1]);
              var v = Util.mapval(lt,0,1,col.min[2],col.max[2]);
              var a = Util.mapval(lt,0,1,col.min[3],col.max[3]);
        
              Util.polygon({ctx:ctx,pts:[l,L[-1],P[-1],disp],
                xof:xof,yof:yof,fil:true,str:true,col:Util.hsv(h,s,v,a)});
              Util.polygon({ctx:ctx,pts:[r,R[-1],P[-1],disp],
                xof:xof,yof:yof,fil:true,str:true,col:Util.hsv(h,s,v,a)});
            }
            P.push(disp);
            L.push(l);
            R.push(r);
          }


          // VEINS
          if (vei[0] == 1){
            for (var i = 1; i < P.length; i++){
              for (var j = 0; j < vei[1]; j++){
                var p = j/vei[1];
        
                var p0 = v3.lerp(L[i-1],P[i-1],p);
                var p1 = v3.lerp(L[i],P[i],p);
        
                var q0 = v3.lerp(R[i-1],P[i-1],p);
                var q1 = v3.lerp(R[i],P[i],p);
                Util.polygon({ctx:ctx,pts:[p0,p1],
                  xof:xof,yof:yof,fil:false,col:Util.hsv(0,0,0,Util.normRand(0.4,0.9))});
                Util.polygon({ctx:ctx,pts:[q0,q1],
                  xof:xof,yof:yof,fil:false,col:Util.hsv(0,0,0,Util.normRand(0.4,0.9))});
        
              }
            }
            Util.stroke({ctx:ctx,pts:P,xof:xof,yof:yof,col:Util.rgba(0,0,0,0.3)});
          }else if (vei[0] == 2){
            for (var i = 1; i < P.length-vei[1]; i+=vei[2]){
              Util.polygon({ctx:ctx,pts:[P[i],L[i+vei[1]]],
                xof:xof,yof:yof,fil:false,col:Util.hsv(0,0,0,Util.normRand(0.4,0.9))});
              Util.polygon({ctx:ctx,pts:[P[i],R[i+vei[1]]],
                xof:xof,yof:yof,fil:false,col:Util.hsv(0,0,0,Util.normRand(0.4,0.9))});
            }
            Util.stroke({ctx:ctx,pts:P,xof:xof,yof:yof,col:Util.rgba(0,0,0,0.3)});
          }
        
          Util.stroke({ctx:ctx,pts:L,xof:xof,yof:yof,col:Util.rgba(120,100,0,0.3)});
          Util.stroke({ctx:ctx,pts:R,xof:xof,yof:yof,col:Util.rgba(120,100,0,0.3)});
          return P
      }

      // generate fractal-like branches
      branch(args){
          args =(args != undefined) ? args : {};
          var ctx = args.ctx;// (args.ctx != undefined) ? args.ctx : ;  
          var xof = (args.xof != undefined) ? args.xof : 0;  
          var yof = (args.yof != undefined) ? args.yof : 0;  
          var rot = (args.rot != undefined) ? args.rot : [Util.PI/2,0,0];
          var len = (args.len != undefined) ? args.len : 400;
          var seg = (args.seg != undefined) ? args.seg : 40;
          var wid = (args.wid != undefined) ? args.wid : 1;
          var twi = (args.twi != undefined) ? args.twi : 5;
          var col = (args.col != undefined) ? args.col : 
          {min:[50,0.2,0.8,1],max:[50,0.2,0.8,1]};
          var dep = (args.dep != undefined) ? args.dep : 3;
          var frk = (args.frk != undefined) ? args.frk : 4;
      
          var jnt = [];
          for (var i = 0; i < twi; i++){
          jnt.push([Math.floor(Math.random()*seg),Util.normRand(-1,1)]);
          }
      
          function jntdist(x){
              var m = seg;
              var j = 0;
              for (var i = 0; i< jnt.length; i++){
                  var n = Math.abs(x*seg - jnt[i][0]);
                  if (n < m){
                  m = n;
                  j = i;
                  }
              }
              return [m,jnt[j][1]]
          }
      
          var wfun = function (x) {
              var noiseScale = 10; // 10
              var [m,j] = jntdist(x);
              if (m < 1){
                  return wid*(3+5*(1-x))
              }else { 
                  return wid*(2+7*(1-x)*Util.mapval(Noise.noise(x*noiseScale),0,1,0.5,1))
              }
          };
          
          // BENDING
          var bfun = function (x) {
          var [m,j] = jntdist(x);
              if (m < 1){
                  //this causes bends
                  return [0,j*20,0]
              }else {
                  // this slightly bends randomly
                  return [0,Util.normRand(-5,5),0]
              }
          };
      
          var P = this.stem({ctx:ctx,
          xof:xof,yof:yof,
          rot:rot,
          len:len,seg:seg,
          wid:wfun,
          col:col,
          ben:bfun});
          
          var child = [];
          if (dep > 0 && wid > 0.1){
          for (var i = 0; i < frk*Math.random(); i++){
              var ind = Math.floor(Util.normRand(1,P.length));
      
              var r = Util.grot(P,ind);
              var L = this.branch({ctx:ctx,
              xof:xof+P[ind].x,yof:yof+P[ind].y,
              rot:[r[0]+Util.normRand(-1,1)*Util.PI/6,r[1]+Util.normRand(-1,1)*Util.PI/6,r[2]+Util.normRand(-1,1)*Util.PI/6],
              seg:seg,
              len:len*Util.normRand(0.4,0.6),
              wid:wid*Util.normRand(0.4,0.7),
              twi:twi*0.7,
              dep:dep-1
              });
              //child = child.concat(L.map((v)=>([v[0],[v[1].x+P[ind].x,v[1].y+P[ind].y,v[1].z]])))
              child = child.concat(L);
          }
          }
          return ([[dep,P.map((v)=>([v.x+xof,v.y+yof,v.z]))]]).concat(child)
      
    } 

    // generate stem-like structure
    stem(args){
      // args = (args != undefined) ? args : ;
      var ctx = args.ctx;
      var xof = (args.xof != undefined) ? args.xof : 0;  
      var yof = (args.yof != undefined) ? args.yof : 0;  
      var rot = (args.rot != undefined) ? args.rot : [Util.PI/2,0,0];
      var len = (args.len != undefined) ? args.len : 400;
      var seg = (args.seg != undefined) ? args.seg : 40;
      var wid = (args.wid != undefined) ? args.wid : (x) => (6);
      var col = (args.col != undefined) ? args.col : 
        {min:[250,0.2,0.4,1],max:[250,0.3,0.6,1]};
      var ben = (args.ben != undefined) ? args.ben : 
        (x) => ([Util.normRand(-10,10),0,Util.normRand(-5,5)]);
    
    
    
      var disp = v3.zero;
      var crot = v3.zero;
      var P = [disp];
    
      var orient = (v) => (v3.roteuler(v,rot));
      
      for (var i = 0; i < seg; i++){
        var p = i/(seg-1);
        crot = v3.add(crot,v3.scale(ben(p),1/seg));
        disp = v3.add(disp,orient(v3.roteuler([0,0,len/seg],crot)));	
        P.push(disp);
      }
      var [L,R] = Util.tubify({pts:P,wid:wid});
      var wseg = 8;
      var noiseScale = 10;
      for (var i = 1; i < P.length; i++){
        for (var j = 1; j < wseg; j++){
          var m = (j-1)/(wseg-1);
          var n = j/(wseg-1);
          var p = i/(P.length-1);
          // var pcurve = this.curveCoeff2;
          // p = Util.sigmoid( (j*p) * pcurve[0], pcurve[1]) * 0.4
          // var mCurve = this.curveCoeff2
          // m = Util.sigmoid( ( m) * mCurve[0], mCurve[1]) * 0.7

          // var ncurve = this.curveCoeff4;
          // n = Util.sigmoid( (j + n) * ncurve[0], ncurve[1]) * 2


          var p0 = v3.lerp(L[i-1],R[i-1],m);
          var p1 = v3.lerp(L[i],R[i],m);
    
          var p2 = v3.lerp(L[i-1],R[i-1],n);
          var p3 = v3.lerp(L[i],R[i],n);
    
          var lt = n/p;
          var h = Util.lerpHue(col.min[0],col.max[0],lt)*Util.mapval(Noise.noise(p*noiseScale,m*noiseScale,n*noiseScale),0,1,0.5,1);
          var s = Util.mapval(lt,0,1,col.max[1],col.min[1])*Util.mapval(Noise.noise(p*noiseScale,m*noiseScale,n*noiseScale),0,1,0.5,1);
          var v = Util.mapval(lt,0,1,col.min[2],col.max[2])*Util.mapval(Noise.noise(p*noiseScale,m*noiseScale,n*noiseScale),0,1,0.5,1);
          var a = Util.mapval(lt,0,1,col.min[3],col.max[3]);
    
          Util.polygon({ctx:ctx,pts:[p0,p1,p3,p2],
            xof:xof,yof:yof,fil:true,str:true,col:Util.hsv(h,s,v,a)
          });
    
        }
      }
      Util.stroke({ctx:ctx,pts:L,xof:xof,yof:yof,col:Util.rgba(0,0,0,0.5)});
      Util.stroke({ctx:ctx,pts:R,xof:xof,yof:yof,col:Util.rgba(0,0,0,0.5)});
      return P
    }
  }

  class Flowering extends Plant {

      BASE_NAMES = ["Poppy", "Dahlia", "Flower", "Petal", "Iris", "Jade", "Tassel", "Lilac", "Magnolia", "Narcissus", "Quince", "Rose", "Sunflower", "Tulip", "Umbrella", "Violet", "Willow", "Lily", "Bell" ];
      MOOD_ADJECTIVES = ["Tasteless", "Dwarf", "Fragrant", "wandering", "adorable", "jealous", "beautiful", "drooping", "drab", "elegant", "fancy", "glamorous", "handsome", "long", "magnificent", "old-fashioned", "plain", "quaint", "sparkling", "water",  "unsightly", "wide-eyed", "angry", "bewildered", "clumsy", "embarrassed", "fierce", "helpless", "itchy", "jealous", "hopeless", "lazy", "mysterious", "nervous",  "thoughtless", "thorny", "thornless", "upright"];
      LOCATION_ADJECTIVES = ["cave", "hill", "mountain", "ocean", "plain", "river", "sea", "moon", "sun", "star", "swamp", "heavens", "sky", "cliff"];

      type = "flowering";

      constructor(options) {
          super(options);
      }

      get description() {
          return {
              flowers: new ColorRangeDescriptor(this.dna.flowerColors),
              stems: new ColorRangeDescriptor(this.dna.branchColors),
              leaves: new ColorRangeDescriptor(this.dna.leafColors),
          }
      }

      generate(args) {
          (this.args != undefined) ? this.args : {};

          let lay0 = new Layer(this.width, this.height);
          let lay1 = new Layer(this.width, this.height);
          this.layers.push(lay0, lay1);

          // start drawing at
          let x0 = this.width*0.5;
          let y0 = this.height*0.8; 

          let saturation = (x, bump) => {x[1] = this.clamp(x[1] + bump, 0,1); return x};
           
          for (var i = 0; i < this.genes.stemCount; i++){

              let r = [Util.PI/2,0,Util.normRand(-1,1)*Util.PI];
              let P = this.stem({
                  ctx:lay0,xof:x0,yof:y0,
                  len:this.genes.stemLength*Util.normRand(0.7,1.3),
                  rot:r,
                  wid:(x) => (this.genes.stemWidth*
                      (Util.pow(Util.sin(x*Util.PI/2+Math.PI/2),0.5)*Noise.noise(x*10)*0.5+0.5)),
                  ben:(x) => ([
                      Util.mapval(Noise.noise(x*1,i),0,1,-1,1)*x*this.genes.stemBend,
                      0,
                      Util.mapval(Noise.noise(x*1,i+Math.PI),0,1,-1,1)*x*this.genes.stemBend,
                      ]
                  )});
              
          
              if (this.genes.leafPosition == 2){
                  for (let j = 0; j < P.length; j++) {
                      if (Math.random() < this.genes.leafChance*2){
                          this.leaf({ctx:lay0,
                              xof:x0+P[j].x, yof:y0+P[j].y,
                              len:2*this.genes.leafLength *Util.normRand(0.8,1.2),
                              vei:this.genes.leafType,
                              col:this.genes.leafColor,
                              rot:[Util.normRand(-1,1)*Util.PI,Util.normRand(-1,1)*Util.PI,Util.normRand(-1,1)*0],
                              wid:(x) => (2*this.genes.leafShape(x)*this.genes.leafWidth),
                              ben:(x) => ([
                              Util.mapval(Noise.noise(x*1,i),0,1,-1,1)*5,
                              0,
                              Util.mapval(Noise.noise(x*1,i+Util.PI),0,1,-1,1)*5
                              ])});                
                      }
                  }      
              }
          
          
              let hr = Util.grot(P,-1);
              if (this.genes.sheathLength != 0){
                  this.stem({ctx:lay0,
                      xof:x0+P[-1].x,
                      yof:y0+P[-1].y,
                      rot:hr,
                      len:this.genes.sheathLength,
                      col:{min:[60,0.3,0.9,1],max:[60,0.3,0.9,1]},
                      wid:(x) => this.genes.sheathWidth*(Util.pow(Util.sin(x*Util.PI),2)-x*0.5+0.5),
                      ben:(x) => ([0,0,0])
                  });
              }

              for (let j = 0; j < Math.max(1,this.genes.shootCount*Util.normRand(0.5,1.5)); j++){

                  let P_ = this.stem({ctx:lay0,
                      xof:x0+P[-1].x,
                      yof:y0+P[-1].y,
                      rot:hr,
                      len:this.genes.shootLength*Util.normRand(0.5,1.5),
                      col:{min:[70,0.2,0.9,1],max:[70,0.2,0.9,1]},
                      wid:(x) => (2),
                      ben:(x) => ([
                          Util.mapval(Noise.noise(x*1,j),0,1,-1,1)*x*10,
                          0,
                          Util.mapval(Noise.noise(x*1,j+Util.PI),0,1,-1,1)*x*10
                      ])});

                  let op = Math.random();
                  let hhr = [Util.normRand(-1,1)*Util.PI,Util.normRand(-1,1)*Util.PI,Util.normRand(-1,1)*Util.PI];

                  for (let k = 0; k < this.genes.flowerPetal; k++){
                      
                      this.leaf({ctx:lay1,
                          flo:true,
                          xof:x0+P[-1].x+P_[-1].x, yof:y0+P[-1].y+P_[-1].y,
                          rot:[hhr[0],hhr[1],hhr[2]+k/this.genes.flowerPetal*Util.PI*2],
                          len:this.genes.flowerLength *Util.normRand(0.7,1.3)*1.5,
                          wid:(x) => ( 1.5*this.genes.flowerShape(x)*this.genes.flowerWidth ),
                          vei:[0],
                          col: Object.keys(this.genes.flowerColor).reduce((result, k) => {  result[k] = saturation(this.genes.flowerColor[k], 0.01); return result}, {}) ,
                          cof:this.genes.flowerColorCurve,
                          ben:(x) => ([
                              this.genes.flowerOpenCurve(x,op),
                              0,
                              0,
                      ])});
              
                      this.leaf({ctx:lay1,
                          flo:true,
                          xof:x0+P[-1].x+P_[-1].x, yof:y0+P[-1].y+P_[-1].y,
                          rot:[hhr[0],hhr[1],hhr[2]+k/this.genes.flowerPetal*Util.PI*2],
                          len:this.genes.innerLength *Util.normRand(0.8,1.2),
                          wid:(x) => ( Util.sin(x*Util.PI)*4 ),
                          vei:[0],
                          col:this.genes.innerColor,
                          cof:(x) => (x),
                          ben:(x) => (
                              [this.genes.flowerOpenCurve(x,op),0,0]
                      )});
                  }
              }
          
          }

          if (this.genes.leafPosition == 1){
              for (let i = 0; i < this.genes.leafChance*100; i++){
                  this.leaf({ctx:lay0,
                      xof:x0,yof:y0,rot:[Util.PI/3,0,Util.normRand(-1,1)*Util.PI],
                      len: 4*this.genes.leafLength *Util.normRand(0.8,1.2),
                      wid:(x) => (2*this.genes.leafShape(x)*this.genes.leafWidth),
                      vei:this.genes.leafType,
                      ben:(x) => ([
                          Util.mapval(Noise.noise(x*1,i),0,1,-1,1)*10,
                          0,
                          Util.mapval(Noise.noise(x*1,i+Util.PI),0,1,-1,1)*10]
                      )});
              }
          }
          

          this.draw();
          

      }
  }

  class Woody extends Plant {

      BASE_NAMES = [ "bindweed", "vine", "creeper", "wisteria", "Jade", "Tassel", "Lilac", "Magnolia", "Olive", "Quince", "Bramble", "Jasmine"];
      MOOD_ADJECTIVES = ["dwarf", "Fragrant", "feathered", "wandering", "adorable", "jealous", "beautiful", "drooping", "drab", "elegant", "fancy", "glamorous", "handsome", "long", "magnificent", "old-fashioned", "plain", "quaint", "sparkling", "water",  "unsightly", "wide-eyed", "angry", "bewildered", "clumsy", "embarrassed", "fierce", "helpless", "itchy", "jealous", "hopeless", "lazy", "mysterious", "nervous",  "thoughtless", "thorny", "thornless", "upright"];
      LOCATION_ADJECTIVES = ["cave", "hill", "mountain", "ocean", "plain", "river", "sea", "swamp", "heavens", "sky", "cliff"];
      type = "woody";

      constructor(dna) {
          super(dna);
      }

      generate(args){
          (this.args != undefined) ? this.args : {};
        
          var cwid = this.ctx.canvas.width;
          var cheight = this.ctx.canvas.height;
          var lay0 = new Layer(cwid, cheight);
          var lay1 = new Layer(cwid, cheight);
          this.layers.push(lay0,lay1);
          var x0 = cwid*0.5;
          var y0 = cheight*0.99;
               
          var PL = this.branch({
            ctx:lay0,xof:x0,yof:y0,
            wid:this.genes.branchWidth,
            twi:this.genes.branchTwist,
            dep:this.genes.branchDepth,
            col:this.genes.branchColor,
            frk:this.genes.branchFork,
           });
        
          for (var i = 0; i < PL.length; i++){
            if (i/PL.length > 0.1){
              for (var j = 0; j < PL[i][1].length; j++){
                if (Math.random() < this.genes.leafChance){
                  this.leaf({ctx:lay0,
                    xof:PL[i][1][j].x, yof:PL[i][1][j].y,
                    len:this.genes.leafLength *Util.normRand(0.8,1.2),
                    vei:this.genes.leafType,
                    col:this.genes.leafColor,
                    rot:[Util.normRand(-1,1)*Util.PI,Util.normRand(-1,1)*Util.PI,Util.normRand(-1,1)*0],
                    wid:(x) => (this.genes.leafShape(x)*this.genes.leafWidth),
                    ben:(x) => ([
                      Util.mapval(Noise.noise(x*1,i),0,1,-1,1)*5,
                      0,
                      Util.mapval(Noise.noise(x*1,i+Util.PI),0,1,-1,1)*5
                     ])});                
                }
        
        
                if (Math.random() < this.genes.flowerChance){
        
                  var hr = [Util.normRand(-1,1)*Util.PI,Util.normRand(-1,1)*Util.PI,Util.normRand(-1,1)*0];
        
                  var P_ = this.stem({ctx:lay0,
                    xof:PL[i][1][j].x, yof:PL[i][1][j].y,
                    rot:hr,
                    len:this.genes.pedicelLength,
                    col:{min:[50,1,0.9,1],max:[50,1,0.9,1]},
                    wid:(x) => (Util.sin(x*Util.PI)*x*2+1),
                    ben:(x) => ([
                        0,0,0
                       ])});
        
                  var op = Math.random();
                  
                  var r = Util.grot(P_,-1);
                  var hhr = r;
                  for (var k = 0; k < this.genes.flowerPetal; k++){
        
                    this.leaf({ctx:lay1,flo:true,
                      xof:PL[i][1][j].x+P_[-1].x, yof:PL[i][1][j].y+P_[-1].y,
                      rot:[hhr[0],hhr[1],hhr[2]+k/this.genes.flowerPetal*Util.PI*2],
                      len:this.genes.flowerLength *Util.normRand(0.7,1.3),
                      wid:(x) => ( this.genes.flowerShape(x)*this.genes.flowerWidth ),
                      vei:[0],
                      col:this.genes.flowerColor,
                      cof:this.genes.flowerColorCurve,
                      ben:(x) => ([
                        this.genes.flowerOpenCurve(x,op),
                        0,
                        0,
                       ])
                     });
        
                    this.leaf({ctx:lay1,flo:true,
                      xof:PL[i][1][j].x+P_[-1].x, yof:PL[i][1][j].y+P_[-1].y,
                      rot:[hhr[0],hhr[1],hhr[2]+k/this.genes.flowerPetal*Util.PI*2],
                      len:this.genes.innerLength *Util.normRand(0.8,1.2),
                      wid:(x) => ( Util.sin(x*Util.PI)*4 ),
                      vei:[0],
                      col:this.genes.innerColor,
                      cof:(x) => (x),
                      ben:(x) => ([
                        this.genes.flowerOpenCurve(x,op),
                        0,
                        0,
                       ])});
        
                  }
                }
              }
            }
          }
          this.draw();      
        }

  }

  class Fungus extends Plant {

      //create a list of mushroom names.
      BASE_NAMES = ["Cap", "Fingers", "Mushroom", "Fungus", "Stool", "Umbrella", "Hat", "Crown", "Stem"] 
      // stinky man fingers
      MOOD_ADJECTIVES = ["foul", "Fragrant", "dwarf", "giant", "plain", "mysterious", "nervous",  "thoughtless", "stinky", "spongy", "inky", "toppled", "reaching", "upright"];
      LOCATION_ADJECTIVES = ["cave","man", "hill", "island", "mountain", "ocean", "plain", "river", "sea", "swamp", "heavens", "sky", "cliff"];
      type = "fungus";

      constructor(dna) {
          super(dna);
      }

      get description() {

        return {
            caps: new ColorRangeDescriptor(this.dna.flowerColors),
            stems: new ColorRangeDescriptor(this.dna.branchColors),
        }

    }

      generate(args) {
          (this.args != undefined) ? this.args : {};

          var cwid = this.ctx.canvas.width;
          var cheight = this.ctx.canvas.height;
          var lay0 = new Layer(cwid, cheight);
          var lay1 = new Layer(cwid, cheight);
          this.layers.push(lay0,lay1);
          
          var x0 = cwid*0.5;
          var y0 = cheight*0.9; 
          let saturation = (x, bump) => {x[1] = this.clamp(x[1] + bump, 0,1); return x};
          this.genes.flowerColor = Object.keys(this.genes.flowerColor).reduce((result, k) => {  result[k] = saturation(this.genes.flowerColor[k], 0.05); return result}, {}) ,
          // ideal stem color
          this.genes.branchColor = {min: [Util.normRand(50.63842005726726, 56),Util.normRand(0.2,0.32),Util.normRand(0.26011155920859, 0.34),0.999],
            max: [Util.normRand(58.63842005726724, 62),Util.normRand(0.4, 0.7),Util.normRand(0.86011155920859, 0.99),0.999]};
    
          for (var i = 0; i < Math.floor(this.genes.stemCount ); i++){
              var r = [Util.PI/2,0,Util.normRand(-1,1)*Util.PI];
              var capOffset =  Util.normRand(-40,50);

              // STEM
              var P = this.stem({
                  ctx:lay0,xof:x0 + capOffset,yof:y0,
                  len:this.genes.stemLength * Util.normRand(0.002, 1.2) + 40,
                  rot:r,
                  seg: 30,
                  col: this.genes.branchColor,
                  wid:(x) => (this.genes.stemWidth*
                      (Util.pow(Util.sin(x*Util.PI/2+Util.PI/2),0.5)*Noise.noise(x*120)*1.2+0.9)),
                  ben:(x) => ([
                      (Util.mapval(Noise.noise(x*1,i),0,1,-1,1)*x* this.genes.stemBend) * Util.normRand(0.2, 0.8) , 
                      0,
                      Util.mapval(Noise.noise(x*1,i+Util.PI),0,1,-1,1)*x*this.genes.stemBend,
                      ]
                  )});
              
   
              // this.genes.flowerJaggedness = Util.mapval(this.genes.flowerJaggedness, 10, 80, 40, 50);


              // var sheathRotation = Util.grot(P,-1)
              // if (this.genes.sheathLength != 0){
              //   this.stem({ctx:lay0,xof:x0+P[this.clamp(P.length-2,0,P.length-1)].x + capOffset,yof:y0+P[-1].y + 18,
              //       rot:sheathRotation,
              //       len:this.clamp(this.genes.sheathLength, 0, this.genes.flowerLength * 1.7),
              //       seg: 18,
              //       col: this.genes.innerColor,
              //       wid:(x) => (this.genes.sheathWidth + this.genes.stemWidth * 1.5 )*(Util.pow(Util.sin(x*Util.PI),2)-x*1.5+0.6),
              //       ben:(x) => ([0.2,0.2,0]
              //           )})
              //   }

                let capRotation = v3.add(Util.grot(P,-1), [0,0,0]);

              //GILLS
              this.genes.leafColor = {min: [Util.normRand(58, 62),Util.normRand(0.3,0.52),Util.normRand(0.8, 0.94),0.8],
                  max: [Util.normRand(58, 62),Util.normRand(0.2,0.62),Util.normRand(0.4, 0.6),0.2]};


              var capVariation = Util.normRand(0.5,2.5);
              var capShapeMask  = (x) => ( Util.deltoid(Util.sin(Math.PI*x),this.genes.capShapeMaskCoeff *capVariation , Math.PI/2)); 

              var capBend = [0,0,0];//capRotation;

              // this.leaf({ctx:lay0,xof:x0+P[-1].x + capOffset,yof:y0+P[-1].y + gillOffset,
              //   rot:capRotation,
              //   len:(this.genes.flowerLength+gillOffset*3.5),
              //   gil: true,
              //   col:this.genes.leafColor,// {min:[20,0.29,0.7,1],max:[80,0.4,0.9,1]},               
              //   // wid:(x) => Util.deltoid(x,0.02),
              //   wid:(x) => capShape(x) * this.genes.flowerWidth*(Util.sin(Util.cos(x*Util.PI/2))-Util.cos(x*Util.PI/2)*this.clamp(this.genes.flowerWidth*0.3, 18,30) *0.9),
              //   ben:(x) => (capBend)})

              
              // Make cap shape open with stem age
              var stemAge = (this.genes.stemLength * Util.normRand(0.002, 1.2));
              // console.log(stemAge, capShapeMask(stemAge), this.genes.flowerWidth, Math.cos(stemAge/this.genes.flowerWidth))
              // CAP
              this.cap({ctx:lay0,
                xof:x0+P[-1].x + capOffset,
                yof:y0+P[-1].y,
                rot:capRotation,
                flo: false,
                vei: [1,9],
                len:this.genes.flowerLength*Util.normRand(0.2, 1.2) + 70,
                col: this.genes.flowerColor,
                wid: (x) => Util.bean(x / capShapeMask(stemAge + x)) * (Util.bean(x)/(x*0.8)) * (this.genes.flowerWidth * capShapeMask(stemAge + x)  ),

                // wid:(x) => capShape(x) * this.genes.flowerWidth*(Util.sin(Util.cos(x*Util.PI/2),0.9)-Util.cos(x*Util.PI/2)*this.clamp(this.genes.flowerWidth*0.5, 18,30)),
                ben:(x) => capBend
              });




          }

          this.draw();        
      }
      cap(args){
        var args =(args != undefined) ? args : {};
        var ctx = (args.ctx != undefined) ? args.ctx : CTX;  
        var xof = (args.xof != undefined) ? args.xof : 0;  
        var yof = (args.yof != undefined) ? args.yof : 0;  
        var rot = (args.rot != undefined) ? args.rot : [Util.PI/2,0,0];
        var len = (args.len != undefined) ? args.len : 400;
        var vei = (args.vei != undefined) ? args.vei : [1,9];
        var seg = (args.seg != undefined) ? args.seg : 40;
        var wid = (args.wid != undefined) ? args.wid : (x) => (6);
        var col = (args.col != undefined) ? args.col : 
          {min:[250,0.2,0.4,1],max:[250,0.3,0.6,1]};
        var gil = (args.gil != undefined) ? args.gil : false;
        var ben = (args.ben != undefined) ? args.ben : 
          (x) => ([Util.normRand(-10,10),0,Util.normRand(-5,5)]);
      
      
        // console.log(xof, yof, rot, len, seg, wid, col, ben)
      
        var disp = v3.zero;
        var crot = v3.zero;
        var P = [disp];
      
        var orient = (v) => (v3.roteuler(v,rot));
        
        for (var i = 0; i < seg; i++){
          var p = i/(seg-1);
          crot= v3.add(crot,v3.scale(ben(p),1/seg));
          disp = v3.add(disp,orient(v3.roteuler([0,0,len/seg],crot)));
          P.push(disp);
        }
        var [L,R] = Util.tubify({pts:P,wid:wid});
        var wseg = 18 + Math.floor(seg/2); // Math.abs(this.dna.genes.flowerWidth/Util.normRand(2,3)).toFixed(0);
        var noiseScale = this.dna.genes.noiseScale ; 
        for (var i = 1; i < P.length; i++){
          for (var j = 1; j < wseg; j++){
            var m = (j-1)/(wseg-1);
            var n = j/(wseg-1);
            var p = i/(P.length-1);
            // var pcurve = this.curveCoeff2;
            // p = Util.sigmoid( (j*p) * pcurve[0], pcurve[1]) * 0.4
            // var mCurve = this.curveCoeff2
            // m = Util.sigmoid( ( m) * mCurve[0], mCurve[1]) * 0.7
   
              //Adds shading
              var mCurve = this.curveCoeff4;
              Util.sigmoid( m * mCurve[0], mCurve[1]) * 2.2;// * mCurve[0]/Util.PI//* Util.cos(Util.PI/seg) * 0.09 * (0.7 )
    
              var pcurve = this.curveCoeff0;
              Util.sigmoid( p * pcurve[0], pcurve[1]) * Util.sin(Util.PI/1*seg); //* Util.mapval(Noise.noise(p*noiseScale, m*noiseScale, n*noiseScale),0.2,0.5,0.2,1) 
    
              var ncurve = this.curveCoeff2;
              Util.sin( ( n) * ncurve[0], ncurve[1]); //  * Util.cos(Util.PI/px) * 0.1//* (Math.Util.PI/2) 
      
    
            var p0 = v3.lerp(L[i-1],R[i-1],m); //- Util.mapval(Noise.noise(p/noiseScale,m*noiseScale,n*noiseScale),0,1,0,mx)
            var p1 = v3.lerp(L[i],R[i],m); //- Util.mapval(Noise.noise(p/noiseScale,m*noiseScale,n*noiseScale),0,1,0,mx)
      
            var p2 = v3.lerp(L[i-1],R[i-1],n);
            var p3 = v3.lerp(L[i],R[i],n);


            var lt = Util.sin((n/p) ) * 0.5 + 0.1; 

            var h = Util.lerpHue(col.min[0],col.max[0],lt) *Util.mapval(Noise.noise(Util.cos(p/noiseScale) * Util.PI/2 * 0.5 + 0.5,m*noiseScale,n*noiseScale),0,1,0,1);
            var s = Util.mapval(lt,0,1,col.max[1],col.min[1]) *Util.mapval(Noise.noise(p*noiseScale,m*noiseScale,n*noiseScale),0,1,0,1);
            var v = Util.mapval(lt,0,1,col.min[2],col.max[2]);// *Util.mapval(Noise.noise(p*noiseScale,m*noiseScale,n*noiseScale),0,1,0,1)
            Util.mapval(lt,0.8,1,col.min[3],col.max[3]);

            // console.log(col.min[0], col.max[0], h, lt, this.dna.color([h,s,v,a]).humanName)
            if(gil){
              Util.polygon({ctx:ctx,pts:[p0,p0,p2,p3],
                xof:xof,yof:yof,fil:true, str:true,col:Util.hsv(h,s*0.8,v*0.6,0.7)}); 
            }else {
              Util.polygon({ctx:ctx,pts:[p0,p1,p3,p2],
                xof:xof,yof:yof,fil:true,str:true,col:Util.hsv(h,s,v,0.8)});
            }

          }

        }
        for (var i = 1; i < P.length; i++){
          for (var j = 0; j < vei[1]; j++){
            var p = j/vei[1];
    
            var p0 = v3.lerp(L[i-1],P[i-1],p);
            var p1 = v3.lerp(L[i],P[i],p);
    
            var q0 = v3.lerp(R[i-1],P[i-1],p);
            var q1 = v3.lerp(R[i],P[i],p);
            Util.polygon({ctx:ctx,pts:[p0,p1],
              xof:xof,yof:yof,fil:false,col:Util.hsv(0,0,0,Util.normRand(0.4,0.9))});
            Util.polygon({ctx:ctx,pts:[q0,q1],
              xof:xof,yof:yof,fil:false,col:Util.hsv(0,0,0,Util.normRand(0.4,0.9))});
    
          }
        }
        Util.stroke({ctx:ctx,pts:P,xof:xof,yof:yof,col:Util.rgba(0,0,0,0.3)});

        Util.stroke({ctx:ctx,pts:L,xof:xof,yof:yof,col:Util.rgba(0,0,0,0.5)});
        Util.stroke({ctx:ctx,pts:R,xof:xof,yof:yof,col:Util.rgba(0,0,0,0.6)});
        return P
      }
        
        

      

  }

  class PlantFactory {

      availableTypes = ["woody", "flowering", "flowering", "fungus"];

      constructor(options, plantType) {

          let plant = null;

          plantType = (typeof(plantType) !== "undefined" && plantType != null ) ? plantType :  Util.randChoice(this.availableTypes);

          switch(plantType){
            case "flowering":
              plant = new Flowering(options);
              break;
            case "woody":
              plant = new Woody(options);
              break;
            case "fungus":
              plant = new Fungus(options);
              break;
            default:
              plant = new Flowering(options);
          }
        
          return plant
      }

  }

  class nameComponent {
      constructor(args) {
          this.containerElementId = (typeof(args.containerElementId) !== "undefined" && args.containerElementId !== null) ? args.containerElementId : "flora";
      }


      render(plant, className = 'col-md-8') {

          var flowerContainer = document.createElement('div');
              flowerContainer.className = className + " flower mb-4";
              flowerContainer.id = plant.seed;

          var plantImg = document.createElement('img');
              plantImg.src = plant.canvas.toDataURL('image/png');
              plantImg.className = "img-fluid";

          flowerContainer.appendChild(plantImg);

          var infoContainer = document.createElement('div');
              infoContainer.className = "col-md-8 col-sm-6 mx-auto";

          var h5 = document.createElement("a");
              h5.className = "";
              h5.innerHTML = plant.name;
              h5.href= "./?seed=" + plant.seed + "&plantType=" + plant.type + "&plantCount=1";
              h5.target = "_blank";

          infoContainer.appendChild(h5);

          Object.entries(plant.description).map(obj => {
              var description = document.createElement("p");
              description.className = "text-start my-0 ms-2";
              description.innerHTML = obj.reverse().join(" ");// [1] + obj[0];
              infoContainer.appendChild(description);
          });

          flowerContainer.appendChild(infoContainer);

          var flora = document.getElementById(this.containerElementId);
              flora.appendChild(flowerContainer);
      }

  }

  /*
  Copyright 2019 David Bau.

  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  */

  (function (global, pool, math) {
  //
  // The following constants are related to IEEE 754 limits.
  //

  var width = 256,        // each RC4 output is 0 <= x < 256
      chunks = 6,         // at least six RC4 outputs for each double
      digits = 52,        // there are 52 significant digits in a double
      rngname = 'random', // rngname: name for Math.random and Math.seedrandom
      startdenom = math.pow(width, chunks),
      significance = math.pow(2, digits),
      overflow = significance * 2,
      mask = width - 1,
      nodecrypto;         // node.js crypto module, initialized at the bottom.

  //
  // seedrandom()
  // This is the seedrandom function described above.
  //
  function seedrandom(seed, options, callback) {
    var key = [];
    options = (options == true) ? { entropy: true } : (options || {});

    // Flatten the seed string or build one from local entropy if needed.
    var shortseed = mixkey(flatten(
      options.entropy ? [seed, tostring(pool)] :
      (seed == null) ? autoseed() : seed, 3), key);

    // Use the seed to initialize an ARC4 generator.
    var arc4 = new ARC4(key);

    // This function returns a random double in [0, 1) that contains
    // randomness in every bit of the mantissa of the IEEE 754 value.
    var prng = function() {
      var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
          d = startdenom,                 //   and denominator d = 2 ^ 48.
          x = 0;                          //   and no 'extra last byte'.
      while (n < significance) {          // Fill up all significant digits by
        n = (n + x) * width;              //   shifting numerator and
        d *= width;                       //   denominator and generating a
        x = arc4.g(1);                    //   new least-significant-byte.
      }
      while (n >= overflow) {             // To avoid rounding up, before adding
        n /= 2;                           //   last byte, shift everything
        d /= 2;                           //   right using integer math until
        x >>>= 1;                         //   we have exactly the desired bits.
      }
      return (n + x) / d;                 // Form the number within [0, 1).
    };

    prng.int32 = function() { return arc4.g(4) | 0; };
    prng.quick = function() { return arc4.g(4) / 0x100000000; };
    prng.double = prng;

    // Mix the randomness into accumulated entropy.
    mixkey(tostring(arc4.S), pool);

    // Calling convention: what to return as a function of prng, seed, is_math.
    return (options.pass || callback ||
        function(prng, seed, is_math_call, state) {
          if (state) {
            // Load the arc4 state from the given state if it has an S array.
            if (state.S) { copy(state, arc4); }
            // Only provide the .state method if requested via options.state.
            prng.state = function() { return copy(arc4, {}); };
          }

          // If called as a method of Math (Math.seedrandom()), mutate
          // Math.random because that is how seedrandom.js has worked since v1.0.
          if (is_math_call) { math[rngname] = prng; return seed; }

          // Otherwise, it is a newer calling convention, so return the
          // prng directly.
          else return prng;
        })(
    prng,
    shortseed,
    'global' in options ? options.global : (this == math),
    options.state);
  }

  //
  // ARC4
  //
  // An ARC4 implementation.  The constructor takes a key in the form of
  // an array of at most (width) integers that should be 0 <= x < (width).
  //
  // The g(count) method returns a pseudorandom integer that concatenates
  // the next (count) outputs from ARC4.  Its return value is a number x
  // that is in the range 0 <= x < (width ^ count).
  //
  function ARC4(key) {
    var t, keylen = key.length,
        me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

    // The empty key [] is treated as [0].
    if (!keylen) { key = [keylen++]; }

    // Set up S using the standard key scheduling algorithm.
    while (i < width) {
      s[i] = i++;
    }
    for (i = 0; i < width; i++) {
      s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
      s[j] = t;
    }

    // The "g" method returns the next (count) outputs as one number.
    (me.g = function(count) {
      // Using instance members instead of closure state nearly doubles speed.
      var t, r = 0,
          i = me.i, j = me.j, s = me.S;
      while (count--) {
        t = s[i = mask & (i + 1)];
        r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
      }
      me.i = i; me.j = j;
      return r;
      // For robust unpredictability, the function call below automatically
      // discards an initial batch of values.  This is called RC4-drop[256].
      // See http://google.com/search?q=rsa+fluhrer+response&btnI
    })(width);
  }

  //
  // copy()
  // Copies internal state of ARC4 to or from a plain object.
  //
  function copy(f, t) {
    t.i = f.i;
    t.j = f.j;
    t.S = f.S.slice();
    return t;
  }
  //
  // flatten()
  // Converts an object tree to nested arrays of strings.
  //
  function flatten(obj, depth) {
    var result = [], typ = (typeof obj), prop;
    if (depth && typ == 'object') {
      for (prop in obj) {
        try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
      }
    }
    return (result.length ? result : typ == 'string' ? obj : obj + '\0');
  }

  //
  // mixkey()
  // Mixes a string seed into a key that is an array of integers, and
  // returns a shortened string seed that is equivalent to the result key.
  //
  function mixkey(seed, key) {
    var stringseed = seed + '', smear, j = 0;
    while (j < stringseed.length) {
      key[mask & j] =
        mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
    }
    return tostring(key);
  }

  //
  // autoseed()
  // Returns an object for autoseeding, using window.crypto and Node crypto
  // module if available.
  //
  function autoseed() {
    try {
      var out;
      if (nodecrypto && (out = nodecrypto.randomBytes)) {
        // The use of 'out' to remember randomBytes makes tight minified code.
        out = out(width);
      } else {
        out = new Uint8Array(width);
        (global.crypto || global.msCrypto).getRandomValues(out);
      }
      return tostring(out);
    } catch (e) {
      var browser = global.navigator,
          plugins = browser && browser.plugins;
      return [+new Date, global, plugins, global.screen, tostring(pool)];
    }
  }

  //
  // tostring()
  // Converts an array of charcodes to a string
  //
  function tostring(a) {
    return String.fromCharCode.apply(0, a);
  }

  //
  // When seedrandom.js is loaded, we immediately mix a few bits
  // from the built-in RNG into the entropy pool.  Because we do
  // not want to interfere with deterministic PRNG state later,
  // seedrandom will not call math.random on its own again after
  // initialization.
  //
  mixkey(math.random(), pool);

  //
  // Nodejs and AMD support: export the implementation as a module using
  // either convention.
  //
  if ((typeof module) == 'object' && module.exports) {
    module.exports = seedrandom;
    // When in node.js, try using crypto package for autoseeding.
    try {
      nodecrypto = require('crypto');
    } catch (ex) {}
  } else if ((typeof define) == 'function' && define.amd) {
    define(function() { return seedrandom; });
  } else {
    // When included as a plain script, set up Math.seedrandom global.
    math['seed' + rngname] = seedrandom;
  }


  // End anonymous scope, and pass initial values.
  })(
    // global: `self` in browsers (including strict mode and web workers),
    // otherwise `this` in Node and other environments
    (typeof self !== 'undefined') ? self : undefined,
    [],     // pool: entropy pool starts empty
    Math    // math: package containing random, pow, and seedrandom
  );

  /*!
   * iro.js v5.5.2
   * 2016-2021 James Daniel
   * Licensed under MPL 2.0
   * github.com/jaames/iro.js
   */

  var n,u,t,i,r,f={},e=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;function s(n,l){for(var u in l){ n[u]=l[u]; }return n}function a(n){var l=n.parentNode;l&&l.removeChild(n);}function h(n,l,u){var t,i,r,o,f=arguments;if(l=s({},l),arguments.length>3){ for(u=[u],t=3;t<arguments.length;t++){ u.push(f[t]); } }if(null!=u&&(l.children=u),null!=n&&null!=n.defaultProps){ for(i in n.defaultProps){ void 0===l[i]&&(l[i]=n.defaultProps[i]); } }return o=l.key,null!=(r=l.ref)&&delete l.ref,null!=o&&delete l.key,v(n,l,o,r)}function v(l,u,t,i){var r={type:l,props:u,key:t,ref:i,__k:null,__p:null,__b:0,__e:null,l:null,__c:null,constructor:void 0};return n.vnode&&n.vnode(r),r}function d(n){return n.children}function y(n){if(null==n||"boolean"==typeof n){ return null; }if("string"==typeof n||"number"==typeof n){ return v(null,n,null,null); }if(null!=n.__e||null!=n.__c){var l=v(n.type,n.props,n.key,null);return l.__e=n.__e,l}return n}function m(n,l){this.props=n,this.context=l;}function w(n,l){if(null==l){ return n.__p?w(n.__p,n.__p.__k.indexOf(n)+1):null; }for(var u;l<n.__k.length;l++){ if(null!=(u=n.__k[l])&&null!=u.__e){ return u.__e; } }return "function"==typeof n.type?w(n):null}function g(n){var l,u;if(null!=(n=n.__p)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++){ if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break} }return g(n)}}function k(l){(!l.__d&&(l.__d=!0)&&1===u.push(l)||i!==n.debounceRendering)&&(i=n.debounceRendering,(n.debounceRendering||t)(_));}function _(){var n,l,t,i,r,o,f,e;for(u.sort(function(n,l){return l.__v.__b-n.__v.__b});n=u.pop();){ n.__d&&(t=void 0,i=void 0,o=(r=(l=n).__v).__e,f=l.__P,e=l.u,l.u=!1,f&&(t=[],i=$$1(f,r,s({},r),l.__n,void 0!==f.ownerSVGElement,null,t,e,null==o?w(r):o),j(t,r),i!=o&&g(r))); }}function b(n,l,u,t,i,r,o,c,s){var h,v,p,d,y,m,g,k=u&&u.__k||e,_=k.length;if(c==f&&(c=null!=r?r[0]:_?w(u,0):null),h=0,l.__k=x(l.__k,function(u){if(null!=u){if(u.__p=l,u.__b=l.__b+1,null===(p=k[h])||p&&u.key==p.key&&u.type===p.type){ k[h]=void 0; }else { for(v=0;v<_;v++){if((p=k[v])&&u.key==p.key&&u.type===p.type){k[v]=void 0;break}p=null;} }if(d=$$1(n,u,p=p||f,t,i,r,o,null,c,s),(v=u.ref)&&p.ref!=v&&(g||(g=[])).push(v,u.__c||d,u),null!=d){if(null==m&&(m=d),null!=u.l){ d=u.l,u.l=null; }else if(r==p||d!=c||null==d.parentNode){n:if(null==c||c.parentNode!==n){ n.appendChild(d); }else {for(y=c,v=0;(y=y.nextSibling)&&v<_;v+=2){ if(y==d){ break n; } }n.insertBefore(d,c);}"option"==l.type&&(n.value="");}c=d.nextSibling,"function"==typeof l.type&&(l.l=d);}}return h++,u}),l.__e=m,null!=r&&"function"!=typeof l.type){ for(h=r.length;h--;){ null!=r[h]&&a(r[h]); } }for(h=_;h--;){ null!=k[h]&&D(k[h],k[h]); }if(g){ for(h=0;h<g.length;h++){ A(g[h],g[++h],g[++h]); } }}function x(n,l,u){if(null==u&&(u=[]),null==n||"boolean"==typeof n){ l&&u.push(l(null)); }else if(Array.isArray(n)){ for(var t=0;t<n.length;t++){ x(n[t],l,u); } }else { u.push(l?l(y(n)):n); }return u}function C(n,l,u,t,i){var r;for(r in u){ r in l||N(n,r,null,u[r],t); }for(r in l){ i&&"function"!=typeof l[r]||"value"===r||"checked"===r||u[r]===l[r]||N(n,r,l[r],u[r],t); }}function P(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]="number"==typeof u&&!1===c.test(l)?u+"px":null==u?"":u;}function N(n,l,u,t,i){var r,o,f,e,c;if("key"===(l=i?"className"===l?"class":l:"class"===l?"className":l)||"children"===l);else if("style"===l){ if(r=n.style,"string"==typeof u){ r.cssText=u; }else {if("string"==typeof t&&(r.cssText="",t=null),t){ for(o in t){ u&&o in u||P(r,o,""); } }if(u){ for(f in u){ t&&u[f]===t[f]||P(r,f,u[f]); } }} }else { "o"===l[0]&&"n"===l[1]?(e=l!==(l=l.replace(/Capture$/,"")),c=l.toLowerCase(),l=(c in n?c:l).slice(2),u?(t||n.addEventListener(l,T,e),(n.t||(n.t={}))[l]=u):n.removeEventListener(l,T,e)):"list"!==l&&"tagName"!==l&&"form"!==l&&!i&&l in n?n[l]=null==u?"":u:"function"!=typeof u&&"dangerouslySetInnerHTML"!==l&&(l!==(l=l.replace(/^xlink:?/,""))?null==u||!1===u?n.removeAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase()):n.setAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase(),u):null==u||!1===u?n.removeAttribute(l):n.setAttribute(l,u)); }}function T(l){return this.t[l.type](n.event?n.event(l):l)}function $$1(l,u,t,i,r,o,f,e,c,a){var h,v,p,y,w,g,k,_,C,P,N=u.type;if(void 0!==u.constructor){ return null; }(h=n.__b)&&h(u);try{n:if("function"==typeof N){if(_=u.props,C=(h=N.contextType)&&i[h.__c],P=h?C?C.props.value:h.__p:i,t.__c?k=(v=u.__c=t.__c).__p=v.__E:("prototype"in N&&N.prototype.render?u.__c=v=new N(_,P):(u.__c=v=new m(_,P),v.constructor=N,v.render=H),C&&C.sub(v),v.props=_,v.state||(v.state={}),v.context=P,v.__n=i,p=v.__d=!0,v.__h=[]),null==v.__s&&(v.__s=v.state),null!=N.getDerivedStateFromProps&&s(v.__s==v.state?v.__s=s({},v.__s):v.__s,N.getDerivedStateFromProps(_,v.__s)),p){ null==N.getDerivedStateFromProps&&null!=v.componentWillMount&&v.componentWillMount(),null!=v.componentDidMount&&f.push(v); }else {if(null==N.getDerivedStateFromProps&&null==e&&null!=v.componentWillReceiveProps&&v.componentWillReceiveProps(_,P),!e&&null!=v.shouldComponentUpdate&&!1===v.shouldComponentUpdate(_,v.__s,P)){for(v.props=_,v.state=v.__s,v.__d=!1,v.__v=u,u.__e=null!=c?c!==t.__e?c:t.__e:null,u.__k=t.__k,h=0;h<u.__k.length;h++){ u.__k[h]&&(u.__k[h].__p=u); }break n}null!=v.componentWillUpdate&&v.componentWillUpdate(_,v.__s,P);}for(y=v.props,w=v.state,v.context=P,v.props=_,v.state=v.__s,(h=n.__r)&&h(u),v.__d=!1,v.__v=u,v.__P=l,h=v.render(v.props,v.state,v.context),u.__k=x(null!=h&&h.type==d&&null==h.key?h.props.children:h),null!=v.getChildContext&&(i=s(s({},i),v.getChildContext())),p||null==v.getSnapshotBeforeUpdate||(g=v.getSnapshotBeforeUpdate(y,w)),b(l,u,t,i,r,o,f,c,a),v.base=u.__e;h=v.__h.pop();){ v.__s&&(v.state=v.__s),h.call(v); }p||null==y||null==v.componentDidUpdate||v.componentDidUpdate(y,w,g),k&&(v.__E=v.__p=null);}else { u.__e=z(t.__e,u,t,i,r,o,f,a); }(h=n.diffed)&&h(u);}catch(l){n.__e(l,u,t);}return u.__e}function j(l,u){for(var t;t=l.pop();){ try{t.componentDidMount();}catch(l){n.__e(l,t.__v);} }n.__c&&n.__c(u);}function z(n,l,u,t,i,r,o,c){var s,a,h,v,p=u.props,d=l.props;if(i="svg"===l.type||i,null==n&&null!=r){ for(s=0;s<r.length;s++){ if(null!=(a=r[s])&&(null===l.type?3===a.nodeType:a.localName===l.type)){n=a,r[s]=null;break} } }if(null==n){if(null===l.type){ return document.createTextNode(d); }n=i?document.createElementNS("http://www.w3.org/2000/svg",l.type):document.createElement(l.type),r=null;}return null===l.type?p!==d&&(null!=r&&(r[r.indexOf(n)]=null),n.data=d):l!==u&&(null!=r&&(r=e.slice.call(n.childNodes)),h=(p=u.props||f).dangerouslySetInnerHTML,v=d.dangerouslySetInnerHTML,c||(v||h)&&(v&&h&&v.__html==h.__html||(n.innerHTML=v&&v.__html||"")),C(n,d,p,i,c),l.__k=l.props.children,v||b(n,l,u,t,"foreignObject"!==l.type&&i,r,o,f,c),c||("value"in d&&void 0!==d.value&&d.value!==n.value&&(n.value=null==d.value?"":d.value),"checked"in d&&void 0!==d.checked&&d.checked!==n.checked&&(n.checked=d.checked))),n}function A(l,u,t){try{"function"==typeof l?l(u):l.current=u;}catch(l){n.__e(l,t);}}function D(l,u,t){var i,r,o;if(n.unmount&&n.unmount(l),(i=l.ref)&&A(i,null,u),t||"function"==typeof l.type||(t=null!=(r=l.__e)),l.__e=l.l=null,null!=(i=l.__c)){if(i.componentWillUnmount){ try{i.componentWillUnmount();}catch(l){n.__e(l,u);} }i.base=i.__P=null;}if(i=l.__k){ for(o=0;o<i.length;o++){ i[o]&&D(i[o],u,t); } }null!=r&&a(r);}function H(n,l,u){return this.constructor(n,u)}function I(l,u,t){var i,o,c;n.__p&&n.__p(l,u),o=(i=t===r)?null:t&&t.__k||u.__k,l=h(d,null,[l]),c=[],$$1(u,i?u.__k=l:(t||u).__k=l,o||f,f,void 0!==u.ownerSVGElement,t&&!i?[t]:o?null:e.slice.call(u.childNodes),c,!1,t||f,i),j(c,l);}n={},m.prototype.setState=function(n,l){var u=this.__s!==this.state&&this.__s||(this.__s=s({},this.state));("function"!=typeof n||(n=n(u,this.props)))&&s(u,n),null!=n&&this.__v&&(this.u=!1,l&&this.__h.push(l),k(this));},m.prototype.forceUpdate=function(n){this.__v&&(n&&this.__h.push(n),this.u=!0,k(this));},m.prototype.render=d,u=[],t="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,i=n.debounceRendering,n.__e=function(n,l,u){for(var t;l=l.__p;){ if((t=l.__c)&&!t.__p){ try{if(t.constructor&&null!=t.constructor.getDerivedStateFromError){ t.setState(t.constructor.getDerivedStateFromError(n)); }else {if(null==t.componentDidCatch){ continue; }t.componentDidCatch(n);}return k(t.__E=t)}catch(l){n=l;} } }throw n},r=f;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) { descriptor.writable = true; }
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) { _defineProperties(Constructor.prototype, protoProps); }
    if (staticProps) { _defineProperties(Constructor, staticProps); }
    return Constructor;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      var arguments$1 = arguments;

      for (var i = 1; i < arguments.length; i++) {
        var source = arguments$1[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  // Some regular expressions for rgb() and hsl() Colors are borrowed from tinyColor
  // https://github.com/bgrins/TinyColor
  // Kelvin temperature math borrowed from Neil Barlett's implementation
  // from https://github.com/neilbartlett/color-temperature
  // https://www.w3.org/TR/css3-values/#integers
  var CSS_INTEGER = '[-\\+]?\\d+%?'; // http://www.w3.org/TR/css3-values/#number-value

  var CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?'; // Allow positive/negative integer/number. Don't capture the either/or, just the entire outcome

  var CSS_UNIT = '(?:' + CSS_NUMBER + ')|(?:' + CSS_INTEGER + ')'; // Parse function params
  // Parens and commas are optional, and this also allows for whitespace between numbers

  var PERMISSIVE_MATCH_3 = '[\\s|\\(]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')\\s*\\)?';
  var PERMISSIVE_MATCH_4 = '[\\s|\\(]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')\\s*\\)?'; // Regex patterns for functional color strings

  var REGEX_FUNCTIONAL_RGB = new RegExp('rgb' + PERMISSIVE_MATCH_3);
  var REGEX_FUNCTIONAL_RGBA = new RegExp('rgba' + PERMISSIVE_MATCH_4);
  var REGEX_FUNCTIONAL_HSL = new RegExp('hsl' + PERMISSIVE_MATCH_3);
  var REGEX_FUNCTIONAL_HSLA = new RegExp('hsla' + PERMISSIVE_MATCH_4); // Color string parsing regex

  var HEX_START = '^(?:#?|0x?)';
  var HEX_INT_SINGLE = '([0-9a-fA-F]{1})';
  var HEX_INT_DOUBLE = '([0-9a-fA-F]{2})';
  var REGEX_HEX_3 = new RegExp(HEX_START + HEX_INT_SINGLE + HEX_INT_SINGLE + HEX_INT_SINGLE + '$');
  var REGEX_HEX_4 = new RegExp(HEX_START + HEX_INT_SINGLE + HEX_INT_SINGLE + HEX_INT_SINGLE + HEX_INT_SINGLE + '$');
  var REGEX_HEX_6 = new RegExp(HEX_START + HEX_INT_DOUBLE + HEX_INT_DOUBLE + HEX_INT_DOUBLE + '$');
  var REGEX_HEX_8 = new RegExp(HEX_START + HEX_INT_DOUBLE + HEX_INT_DOUBLE + HEX_INT_DOUBLE + HEX_INT_DOUBLE + '$'); // Kelvin temperature bounds

  var KELVIN_MIN = 2000;
  var KELVIN_MAX = 40000; // Math shorthands

  var log = Math.log,
      round = Math.round,
      floor = Math.floor;
  /**
   * @desc Clamp a number between a min and max value
   * @param num - input value
   * @param min - min allowed value
   * @param max - max allowed value
   */

  function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }
  /**
   * @desc Parse a css unit string - either regular int or a percentage number
   * @param str - css unit string
   * @param max - max unit value, used for calculating percentages
   */


  function parseUnit(str, max) {
    var isPercentage = str.indexOf('%') > -1;
    var num = parseFloat(str);
    return isPercentage ? max / 100 * num : num;
  }
  /**
   * @desc Parse hex str to an int
   * @param str - hex string to parse
   */


  function parseHexInt(str) {
    return parseInt(str, 16);
  }
  /**
   * @desc Convert nunber into to 2-digit hex
   * @param int - number to convert
   */


  function intToHex(_int) {
    return _int.toString(16).padStart(2, '0');
  }

  var IroColor =
  /*#__PURE__*/
  function () {
    /**
      * @constructor Color object
      * @param value - initial color value
    */
    function IroColor(value, onChange) {
      // The default Color value
      this.$ = {
        h: 0,
        s: 0,
        v: 0,
        a: 1
      };
      if (value) { this.set(value); } // The watch callback function for this Color will be stored here

      this.onChange = onChange;
      this.initialValue = _extends({}, this.$); // copy initial value
    }
    /**
      * @desc Set the Color from any valid value
      * @param value - new color value
    */


    var _proto = IroColor.prototype;

    _proto.set = function set(value) {
      if (typeof value === 'string') {
        if (/^(?:#?|0x?)[0-9a-fA-F]{3,8}$/.test(value)) {
          this.hexString = value;
        } else if (/^rgba?/.test(value)) {
          this.rgbString = value;
        } else if (/^hsla?/.test(value)) {
          this.hslString = value;
        }
      } else if (typeof value === 'object') {
        if (value instanceof IroColor) {
          this.hsva = value.hsva;
        } else if ('r' in value && 'g' in value && 'b' in value) {
          this.rgb = value;
        } else if ('h' in value && 's' in value && 'v' in value) {
          this.hsv = value;
        } else if ('h' in value && 's' in value && 'l' in value) {
          this.hsl = value;
        } else if ('kelvin' in value) {
          this.kelvin = value.kelvin;
        }
      } else {
        throw new Error('Invalid color value');
      }
    }
    /**
      * @desc Shortcut to set a specific channel value
      * @param format - hsv | hsl | rgb
      * @param channel - individual channel to set, for example if model = hsl, chanel = h | s | l
      * @param value - new value for the channel
    */
    ;

    _proto.setChannel = function setChannel(format, channel, value) {
      var _extends2;

      this[format] = _extends({}, this[format], (_extends2 = {}, _extends2[channel] = value, _extends2));
    }
    /**
     * @desc Reset color back to its initial value
     */
    ;

    _proto.reset = function reset() {
      this.hsva = this.initialValue;
    }
    /**
      * @desc make new Color instance with the same value as this one
    */
    ;

    _proto.clone = function clone() {
      return new IroColor(this);
    }
    /**
     * @desc remove color onChange
     */
    ;

    _proto.unbind = function unbind() {
      this.onChange = undefined;
    }
    /**
      * @desc Convert hsv object to rgb
      * @param hsv - hsv color object
    */
    ;

    IroColor.hsvToRgb = function hsvToRgb(hsv) {
      var h = hsv.h / 60;
      var s = hsv.s / 100;
      var v = hsv.v / 100;
      var i = floor(h);
      var f = h - i;
      var p = v * (1 - s);
      var q = v * (1 - f * s);
      var t = v * (1 - (1 - f) * s);
      var mod = i % 6;
      var r = [v, q, p, p, t, v][mod];
      var g = [t, v, v, q, p, p][mod];
      var b = [p, p, t, v, v, q][mod];
      return {
        r: clamp(r * 255, 0, 255),
        g: clamp(g * 255, 0, 255),
        b: clamp(b * 255, 0, 255)
      };
    }
    /**
      * @desc Convert rgb object to hsv
      * @param rgb - rgb object
    */
    ;

    IroColor.rgbToHsv = function rgbToHsv(rgb) {
      var r = rgb.r / 255;
      var g = rgb.g / 255;
      var b = rgb.b / 255;
      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var delta = max - min;
      var hue = 0;
      var value = max;
      var saturation = max === 0 ? 0 : delta / max;

      switch (max) {
        case min:
          hue = 0; // achromatic

          break;

        case r:
          hue = (g - b) / delta + (g < b ? 6 : 0);
          break;

        case g:
          hue = (b - r) / delta + 2;
          break;

        case b:
          hue = (r - g) / delta + 4;
          break;
      }

      return {
        h: hue * 60 % 360,
        s: clamp(saturation * 100, 0, 100),
        v: clamp(value * 100, 0, 100)
      };
    }
    /**
      * @desc Convert hsv object to hsl
      * @param hsv - hsv object
    */
    ;

    IroColor.hsvToHsl = function hsvToHsl(hsv) {
      var s = hsv.s / 100;
      var v = hsv.v / 100;
      var l = (2 - s) * v;
      var divisor = l <= 1 ? l : 2 - l; // Avoid division by zero when lightness is close to zero

      var saturation = divisor < 1e-9 ? 0 : s * v / divisor;
      return {
        h: hsv.h,
        s: clamp(saturation * 100, 0, 100),
        l: clamp(l * 50, 0, 100)
      };
    }
    /**
      * @desc Convert hsl object to hsv
      * @param hsl - hsl object
    */
    ;

    IroColor.hslToHsv = function hslToHsv(hsl) {
      var l = hsl.l * 2;
      var s = hsl.s * (l <= 100 ? l : 200 - l) / 100; // Avoid division by zero when l + s is near 0

      var saturation = l + s < 1e-9 ? 0 : 2 * s / (l + s);
      return {
        h: hsl.h,
        s: clamp(saturation * 100, 0, 100),
        v: clamp((l + s) / 2, 0, 100)
      };
    }
    /**
      * @desc Convert a kelvin temperature to an approx, RGB value
      * @param kelvin - kelvin temperature
    */
    ;

    IroColor.kelvinToRgb = function kelvinToRgb(kelvin) {
      var temp = kelvin / 100;
      var r, g, b;

      if (temp < 66) {
        r = 255;
        g = -155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * log(g);
        b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp - 10) + 115.67994401066147 * log(b);
      } else {
        r = 351.97690566805693 + 0.114206453784165 * (r = temp - 55) - 40.25366309332127 * log(r);
        g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * log(g);
        b = 255;
      }

      return {
        r: clamp(floor(r), 0, 255),
        g: clamp(floor(g), 0, 255),
        b: clamp(floor(b), 0, 255)
      };
    }
    /**
     * @desc Convert an RGB color to an approximate kelvin temperature
     * @param kelvin - kelvin temperature
    */
    ;

    IroColor.rgbToKelvin = function rgbToKelvin(rgb) {
      var r = rgb.r,
          b = rgb.b;
      var eps = 0.4;
      var minTemp = KELVIN_MIN;
      var maxTemp = KELVIN_MAX;
      var temp;

      while (maxTemp - minTemp > eps) {
        temp = (maxTemp + minTemp) * 0.5;

        var _rgb = IroColor.kelvinToRgb(temp);

        if (_rgb.b / _rgb.r >= b / r) {
          maxTemp = temp;
        } else {
          minTemp = temp;
        }
      }

      return temp;
    };

    _createClass(IroColor, [{
      key: "hsv",
      get: function get() {
        // value is cloned to allow changes to be made to the values before passing them back
        var value = this.$;
        return {
          h: value.h,
          s: value.s,
          v: value.v
        };
      },
      set: function set(newValue) {
        var oldValue = this.$;
        newValue = _extends({}, oldValue, newValue); // If this Color is being watched for changes we need to compare the new and old values to check the difference
        // Otherwise we can just be lazy

        if (this.onChange) {
          // Compute changed values
          var changes = {
            h: false,
            v: false,
            s: false,
            a: false
          };

          for (var key in oldValue) {
            changes[key] = newValue[key] != oldValue[key];
          }

          this.$ = newValue; // If the value has changed, call hook callback

          if (changes.h || changes.s || changes.v || changes.a) { this.onChange(this, changes); }
        } else {
          this.$ = newValue;
        }
      }
    }, {
      key: "hsva",
      get: function get() {
        return _extends({}, this.$);
      },
      set: function set(value) {
        this.hsv = value;
      }
    }, {
      key: "hue",
      get: function get() {
        return this.$.h;
      },
      set: function set(value) {
        this.hsv = {
          h: value
        };
      }
    }, {
      key: "saturation",
      get: function get() {
        return this.$.s;
      },
      set: function set(value) {
        this.hsv = {
          s: value
        };
      }
    }, {
      key: "value",
      get: function get() {
        return this.$.v;
      },
      set: function set(value) {
        this.hsv = {
          v: value
        };
      }
    }, {
      key: "alpha",
      get: function get() {
        return this.$.a;
      },
      set: function set(value) {
        this.hsv = _extends({}, this.hsv, {
          a: value
        });
      }
    }, {
      key: "kelvin",
      get: function get() {
        return IroColor.rgbToKelvin(this.rgb);
      },
      set: function set(value) {
        this.rgb = IroColor.kelvinToRgb(value);
      }
    }, {
      key: "red",
      get: function get() {
        var rgb = this.rgb;
        return rgb.r;
      },
      set: function set(value) {
        this.rgb = _extends({}, this.rgb, {
          r: value
        });
      }
    }, {
      key: "green",
      get: function get() {
        var rgb = this.rgb;
        return rgb.g;
      },
      set: function set(value) {
        this.rgb = _extends({}, this.rgb, {
          g: value
        });
      }
    }, {
      key: "blue",
      get: function get() {
        var rgb = this.rgb;
        return rgb.b;
      },
      set: function set(value) {
        this.rgb = _extends({}, this.rgb, {
          b: value
        });
      }
    }, {
      key: "rgb",
      get: function get() {
        var _IroColor$hsvToRgb = IroColor.hsvToRgb(this.$),
            r = _IroColor$hsvToRgb.r,
            g = _IroColor$hsvToRgb.g,
            b = _IroColor$hsvToRgb.b;

        return {
          r: round(r),
          g: round(g),
          b: round(b)
        };
      },
      set: function set(value) {
        this.hsv = _extends({}, IroColor.rgbToHsv(value), {
          a: value.a === undefined ? 1 : value.a
        });
      }
    }, {
      key: "rgba",
      get: function get() {
        return _extends({}, this.rgb, {
          a: this.alpha
        });
      },
      set: function set(value) {
        this.rgb = value;
      }
    }, {
      key: "hsl",
      get: function get() {
        var _IroColor$hsvToHsl = IroColor.hsvToHsl(this.$),
            h = _IroColor$hsvToHsl.h,
            s = _IroColor$hsvToHsl.s,
            l = _IroColor$hsvToHsl.l;

        return {
          h: round(h),
          s: round(s),
          l: round(l)
        };
      },
      set: function set(value) {
        this.hsv = _extends({}, IroColor.hslToHsv(value), {
          a: value.a === undefined ? 1 : value.a
        });
      }
    }, {
      key: "hsla",
      get: function get() {
        return _extends({}, this.hsl, {
          a: this.alpha
        });
      },
      set: function set(value) {
        this.hsl = value;
      }
    }, {
      key: "rgbString",
      get: function get() {
        var rgb = this.rgb;
        return "rgb(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")";
      },
      set: function set(value) {
        var match;
        var r,
            g,
            b,
            a = 1;

        if (match = REGEX_FUNCTIONAL_RGB.exec(value)) {
          r = parseUnit(match[1], 255);
          g = parseUnit(match[2], 255);
          b = parseUnit(match[3], 255);
        } else if (match = REGEX_FUNCTIONAL_RGBA.exec(value)) {
          r = parseUnit(match[1], 255);
          g = parseUnit(match[2], 255);
          b = parseUnit(match[3], 255);
          a = parseUnit(match[4], 1);
        }

        if (match) {
          this.rgb = {
            r: r,
            g: g,
            b: b,
            a: a
          };
        } else {
          throw new Error('Invalid rgb string');
        }
      }
    }, {
      key: "rgbaString",
      get: function get() {
        var rgba = this.rgba;
        return "rgba(" + rgba.r + ", " + rgba.g + ", " + rgba.b + ", " + rgba.a + ")";
      },
      set: function set(value) {
        this.rgbString = value;
      }
    }, {
      key: "hexString",
      get: function get() {
        var rgb = this.rgb;
        return "#" + intToHex(rgb.r) + intToHex(rgb.g) + intToHex(rgb.b);
      },
      set: function set(value) {
        var match;
        var r,
            g,
            b,
            a = 255;

        if (match = REGEX_HEX_3.exec(value)) {
          r = parseHexInt(match[1]) * 17;
          g = parseHexInt(match[2]) * 17;
          b = parseHexInt(match[3]) * 17;
        } else if (match = REGEX_HEX_4.exec(value)) {
          r = parseHexInt(match[1]) * 17;
          g = parseHexInt(match[2]) * 17;
          b = parseHexInt(match[3]) * 17;
          a = parseHexInt(match[4]) * 17;
        } else if (match = REGEX_HEX_6.exec(value)) {
          r = parseHexInt(match[1]);
          g = parseHexInt(match[2]);
          b = parseHexInt(match[3]);
        } else if (match = REGEX_HEX_8.exec(value)) {
          r = parseHexInt(match[1]);
          g = parseHexInt(match[2]);
          b = parseHexInt(match[3]);
          a = parseHexInt(match[4]);
        }

        if (match) {
          this.rgb = {
            r: r,
            g: g,
            b: b,
            a: a / 255
          };
        } else {
          throw new Error('Invalid hex string');
        }
      }
    }, {
      key: "hex8String",
      get: function get() {
        var rgba = this.rgba;
        return "#" + intToHex(rgba.r) + intToHex(rgba.g) + intToHex(rgba.b) + intToHex(floor(rgba.a * 255));
      },
      set: function set(value) {
        this.hexString = value;
      }
    }, {
      key: "hslString",
      get: function get() {
        var hsl = this.hsl;
        return "hsl(" + hsl.h + ", " + hsl.s + "%, " + hsl.l + "%)";
      },
      set: function set(value) {
        var match;
        var h,
            s,
            l,
            a = 1;

        if (match = REGEX_FUNCTIONAL_HSL.exec(value)) {
          h = parseUnit(match[1], 360);
          s = parseUnit(match[2], 100);
          l = parseUnit(match[3], 100);
        } else if (match = REGEX_FUNCTIONAL_HSLA.exec(value)) {
          h = parseUnit(match[1], 360);
          s = parseUnit(match[2], 100);
          l = parseUnit(match[3], 100);
          a = parseUnit(match[4], 1);
        }

        if (match) {
          this.hsl = {
            h: h,
            s: s,
            l: l,
            a: a
          };
        } else {
          throw new Error('Invalid hsl string');
        }
      }
    }, {
      key: "hslaString",
      get: function get() {
        var hsla = this.hsla;
        return "hsla(" + hsla.h + ", " + hsla.s + "%, " + hsla.l + "%, " + hsla.a + ")";
      },
      set: function set(value) {
        this.hslString = value;
      }
    }]);

    return IroColor;
  }();

  var sliderDefaultOptions = {
    sliderShape: 'bar',
    sliderType: 'value',
    minTemperature: 2200,
    maxTemperature: 11000
  };
  /**
   * @desc Get the bounding dimensions of the slider
   * @param props - slider props
   */

  function getSliderDimensions(props) {
    var _sliderSize;

    var width = props.width,
        sliderSize = props.sliderSize,
        borderWidth = props.borderWidth,
        handleRadius = props.handleRadius,
        padding = props.padding,
        sliderShape = props.sliderShape;
    var ishorizontal = props.layoutDirection === 'horizontal'; // automatically calculate sliderSize if its not defined

    sliderSize = (_sliderSize = sliderSize) != null ? _sliderSize : padding * 2 + handleRadius * 2;

    if (sliderShape === 'circle') {
      return {
        handleStart: props.padding + props.handleRadius,
        handleRange: width - padding * 2 - handleRadius * 2,
        width: width,
        height: width,
        cx: width / 2,
        cy: width / 2,
        radius: width / 2 - borderWidth / 2
      };
    } else {
      return {
        handleStart: sliderSize / 2,
        handleRange: width - sliderSize,
        radius: sliderSize / 2,
        x: 0,
        y: 0,
        width: ishorizontal ? sliderSize : width,
        height: ishorizontal ? width : sliderSize
      };
    }
  }
  /**
   * @desc Get the current slider value for a given color, as a percentage
   * @param props - slider props
   * @param color
   */

  function getCurrentSliderValue(props, color) {
    var hsva = color.hsva;
    var rgb = color.rgb;

    switch (props.sliderType) {
      case 'red':
        return rgb.r / 2.55;

      case 'green':
        return rgb.g / 2.55;

      case 'blue':
        return rgb.b / 2.55;

      case 'alpha':
        return hsva.a * 100;

      case 'kelvin':
        var minTemperature = props.minTemperature,
            maxTemperature = props.maxTemperature;
        var temperatureRange = maxTemperature - minTemperature;
        var percent = (color.kelvin - minTemperature) / temperatureRange * 100; // clmap percentage

        return Math.max(0, Math.min(percent, 100));

      case 'hue':
        return hsva.h /= 3.6;

      case 'saturation':
        return hsva.s;

      case 'value':
      default:
        return hsva.v;
    }
  }
  /**
   * @desc Get the current slider value from user input
   * @param props - slider props
   * @param x - global input x position
   * @param y - global input y position
   */

  function getSliderValueFromInput(props, x, y) {
    var _getSliderDimensions = getSliderDimensions(props),
        handleRange = _getSliderDimensions.handleRange,
        handleStart = _getSliderDimensions.handleStart;

    var handlePos;

    if (props.layoutDirection === 'horizontal') {
      handlePos = -1 * y + handleRange + handleStart;
    } else {
      handlePos = x - handleStart;
    } // clamp handle position


    handlePos = Math.max(Math.min(handlePos, handleRange), 0);
    var percent = Math.round(100 / handleRange * handlePos);

    switch (props.sliderType) {
      case 'kelvin':
        var minTemperature = props.minTemperature,
            maxTemperature = props.maxTemperature;
        var temperatureRange = maxTemperature - minTemperature;
        return minTemperature + temperatureRange * (percent / 100);

      case 'alpha':
        return percent / 100;

      case 'hue':
        return percent * 3.6;

      case 'red':
      case 'blue':
      case 'green':
        return percent * 2.55;

      default:
        return percent;
    }
  }
  /**
   * @desc Get the current handle position for a given color
   * @param props - slider props
   * @param color
   */

  function getSliderHandlePosition(props, color) {
    var _getSliderDimensions2 = getSliderDimensions(props),
        width = _getSliderDimensions2.width,
        height = _getSliderDimensions2.height,
        handleRange = _getSliderDimensions2.handleRange,
        handleStart = _getSliderDimensions2.handleStart;

    var ishorizontal = props.layoutDirection === 'horizontal';
    var sliderValue = getCurrentSliderValue(props, color);
    var midPoint = ishorizontal ? width / 2 : height / 2;
    var handlePos = handleStart + sliderValue / 100 * handleRange;

    if (ishorizontal) {
      handlePos = -1 * handlePos + handleRange + handleStart * 2;
    }

    return {
      x: ishorizontal ? midPoint : handlePos,
      y: ishorizontal ? handlePos : midPoint
    };
  }
  /**
   * @desc Get the gradient stops for a slider
   * @param props - slider props
   * @param color
   */

  function getSliderGradient(props, color) {
    var hsv = color.hsv;
    var rgb = color.rgb;

    switch (props.sliderType) {
      case 'red':
        return [[0, "rgb(" + 0 + "," + rgb.g + "," + rgb.b + ")"], [100, "rgb(" + 255 + "," + rgb.g + "," + rgb.b + ")"]];

      case 'green':
        return [[0, "rgb(" + rgb.r + "," + 0 + "," + rgb.b + ")"], [100, "rgb(" + rgb.r + "," + 255 + "," + rgb.b + ")"]];

      case 'blue':
        return [[0, "rgb(" + rgb.r + "," + rgb.g + "," + 0 + ")"], [100, "rgb(" + rgb.r + "," + rgb.g + "," + 255 + ")"]];

      case 'alpha':
        return [[0, "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0)"], [100, "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")"]];

      case 'kelvin':
        var stops = [];
        var min = props.minTemperature;
        var max = props.maxTemperature;
        var numStops = 8;
        var range = max - min;

        for (var kelvin = min, stop = 0; kelvin < max; kelvin += range / numStops, stop += 1) {
          var _IroColor$kelvinToRgb = IroColor.kelvinToRgb(kelvin),
              r = _IroColor$kelvinToRgb.r,
              g = _IroColor$kelvinToRgb.g,
              b = _IroColor$kelvinToRgb.b;

          stops.push([100 / numStops * stop, "rgb(" + r + "," + g + "," + b + ")"]);
        }

        return stops;

      case 'hue':
        return [[0, '#f00'], [16.666, '#ff0'], [33.333, '#0f0'], [50, '#0ff'], [66.666, '#00f'], [83.333, '#f0f'], [100, '#f00']];

      case 'saturation':
        var noSat = IroColor.hsvToHsl({
          h: hsv.h,
          s: 0,
          v: hsv.v
        });
        var fullSat = IroColor.hsvToHsl({
          h: hsv.h,
          s: 100,
          v: hsv.v
        });
        return [[0, "hsl(" + noSat.h + "," + noSat.s + "%," + noSat.l + "%)"], [100, "hsl(" + fullSat.h + "," + fullSat.s + "%," + fullSat.l + "%)"]];

      case 'value':
      default:
        var hsl = IroColor.hsvToHsl({
          h: hsv.h,
          s: hsv.s,
          v: 100
        });
        return [[0, '#000'], [100, "hsl(" + hsl.h + "," + hsl.s + "%," + hsl.l + "%)"]];
    }
  }

  var TAU = Math.PI * 2; // javascript's modulo operator doesn't produce positive numbers with negative input
  // https://dev.to/maurobringolf/a-neat-trick-to-compute-modulo-of-negative-numbers-111e

  var mod = function mod(a, n) {
    return (a % n + n) % n;
  }; // distance between points (x, y) and (0, 0)


  var dist = function dist(x, y) {
    return Math.sqrt(x * x + y * y);
  };
  /**
   * @param props - wheel props
   * @internal
   */


  function getHandleRange(props) {
    return props.width / 2 - props.padding - props.handleRadius - props.borderWidth;
  }
  /**
   * Returns true if point (x, y) lands inside the wheel
   * @param props - wheel props
   * @param x
   * @param y
   */


  function isInputInsideWheel(props, x, y) {
    var _getWheelDimensions = getWheelDimensions(props),
        cx = _getWheelDimensions.cx,
        cy = _getWheelDimensions.cy;

    var r = props.width / 2;
    return dist(cx - x, cy - y) < r;
  }
  /**
   * @desc Get the point as the center of the wheel
   * @param props - wheel props
   */

  function getWheelDimensions(props) {
    var r = props.width / 2;
    return {
      width: props.width,
      radius: r - props.borderWidth,
      cx: r,
      cy: r
    };
  }
  /**
   * @desc Translate an angle according to wheelAngle and wheelDirection
   * @param props - wheel props
   * @param angle - input angle
   */

  function translateWheelAngle(props, angle, invert) {
    var wheelAngle = props.wheelAngle;
    var wheelDirection = props.wheelDirection; // inverted and clockwisee

    if (invert && wheelDirection === 'clockwise') { angle = wheelAngle + angle; } // clockwise (input handling)
    else if (wheelDirection === 'clockwise') { angle = 360 - wheelAngle + angle; } // inverted and anticlockwise
      else if (invert && wheelDirection === 'anticlockwise') { angle = wheelAngle + 180 - angle; } // anticlockwise (input handling)
        else if (wheelDirection === 'anticlockwise') { angle = wheelAngle - angle; }
    return mod(angle, 360);
  }
  /**
   * @desc Get the current handle position for a given color
   * @param props - wheel props
   * @param color
   */

  function getWheelHandlePosition(props, color) {
    var hsv = color.hsv;

    var _getWheelDimensions2 = getWheelDimensions(props),
        cx = _getWheelDimensions2.cx,
        cy = _getWheelDimensions2.cy;

    var handleRange = getHandleRange(props);
    var handleAngle = (180 + translateWheelAngle(props, hsv.h, true)) * (TAU / 360);
    var handleDist = hsv.s / 100 * handleRange;
    var direction = props.wheelDirection === 'clockwise' ? -1 : 1;
    return {
      x: cx + handleDist * Math.cos(handleAngle) * direction,
      y: cy + handleDist * Math.sin(handleAngle) * direction
    };
  }
  /**
   * @desc Get the current wheel value from user input
   * @param props - wheel props
   * @param x - global input x position
   * @param y - global input y position
   */

  function getWheelValueFromInput(props, x, y) {
    var _getWheelDimensions3 = getWheelDimensions(props),
        cx = _getWheelDimensions3.cx,
        cy = _getWheelDimensions3.cy;

    var handleRange = getHandleRange(props);
    x = cx - x;
    y = cy - y; // Calculate the hue by converting the angle to radians

    var hue = translateWheelAngle(props, Math.atan2(-y, -x) * (360 / TAU)); // Find the point's distance from the center of the wheel
    // This is used to show the saturation level

    var handleDist = Math.min(dist(x, y), handleRange);
    return {
      h: Math.round(hue),
      s: Math.round(100 / handleRange * handleDist)
    };
  }
  /**
   * @desc Get the bounding dimensions of the box
   * @param props - box props
   */

  function getBoxDimensions(props) {
    var width = props.width,
        boxHeight = props.boxHeight,
        padding = props.padding,
        handleRadius = props.handleRadius;
    return {
      width: width,
      height: boxHeight != null ? boxHeight : width,
      radius: padding + handleRadius
    };
  }
  /**
   * @desc Get the current box value from user input
   * @param props - box props
   * @param x - global input x position
   * @param y - global input y position
   */

  function getBoxValueFromInput(props, x, y) {
    var _getBoxDimensions = getBoxDimensions(props),
        width = _getBoxDimensions.width,
        height = _getBoxDimensions.height,
        radius = _getBoxDimensions.radius;

    var handleStart = radius;
    var handleRangeX = width - radius * 2;
    var handleRangeY = height - radius * 2;
    var percentX = (x - handleStart) / handleRangeX * 100;
    var percentY = (y - handleStart) / handleRangeY * 100;
    return {
      s: Math.max(0, Math.min(percentX, 100)),
      v: Math.max(0, Math.min(100 - percentY, 100))
    };
  }
  /**
   * @desc Get the current box handle position for a given color
   * @param props - box props
   * @param color
   */

  function getBoxHandlePosition(props, color) {
    var _getBoxDimensions2 = getBoxDimensions(props),
        width = _getBoxDimensions2.width,
        height = _getBoxDimensions2.height,
        radius = _getBoxDimensions2.radius;

    var hsv = color.hsv;
    var handleStart = radius;
    var handleRangeX = width - radius * 2;
    var handleRangeY = height - radius * 2;
    return {
      x: handleStart + hsv.s / 100 * handleRangeX,
      y: handleStart + (handleRangeY - hsv.v / 100 * handleRangeY)
    };
  }
  /**
   * @desc Get the gradient stops for a box
   * @param props - box props
   * @param color
   */

  function getBoxGradients(props, color) {
    var hue = color.hue;
    return [// saturation gradient
    [[0, '#fff'], [100, "hsl(" + hue + ",100%,50%)"]], // lightness gradient
    [[0, 'rgba(0,0,0,0)'], [100, '#000']]];
  }

  // Keep track of html <base> elements for resolveSvgUrl
  // getElementsByTagName returns a live HTMLCollection, which stays in sync with the DOM tree
  // So it only needs to be called once
  var BASE_ELEMENTS;
  /**
   * @desc Resolve an SVG reference URL
   * This is required to work around how Safari and iOS webviews handle gradient URLS under certain conditions
   * If a page is using a client-side routing library which makes use of the HTML <base> tag,
   * Safari won't be able to render SVG gradients properly (as they are referenced by URLs)
   * More info on the problem:
   * https://stackoverflow.com/questions/19742805/angular-and-svg-filters/19753427#19753427
   * https://github.com/jaames/iro.js/issues/18
   * https://github.com/jaames/iro.js/issues/45
   * https://github.com/jaames/iro.js/pull/89
   * @props url - SVG reference URL
   */

  function resolveSvgUrl(url) {
    if (!BASE_ELEMENTS) { BASE_ELEMENTS = document.getElementsByTagName('base'); } // Sniff useragent string to check if the user is running Safari

    var ua = window.navigator.userAgent;
    var isSafari = /^((?!chrome|android).)*safari/i.test(ua);
    var isIos = /iPhone|iPod|iPad/i.test(ua);
    var location = window.location;
    return (isSafari || isIos) && BASE_ELEMENTS.length > 0 ? location.protocol + "//" + location.host + location.pathname + location.search + url : url;
  }
  /**
   * @desc Given a specifc (x, y) position, test if there's a handle there and return its index, else return null.
   *       This is used for components like the box and wheel which support multiple handles when multicolor is active
   * @props x - point x position
   * @props y - point y position
   * @props handlePositions - array of {x, y} coords for each handle
   */

  function getHandleAtPoint(props, x, y, handlePositions) {
    for (var i = 0; i < handlePositions.length; i++) {
      var dX = handlePositions[i].x - x;
      var dY = handlePositions[i].y - y;
      var dist = Math.sqrt(dX * dX + dY * dY);

      if (dist < props.handleRadius) {
        return i;
      }
    }

    return null;
  }

  function cssBorderStyles(props) {
    return {
      boxSizing: 'border-box',
      border: props.borderWidth + "px solid " + props.borderColor
    };
  }
  function cssGradient(type, direction, stops) {
    return type + "-gradient(" + direction + ", " + stops.map(function (_ref) {
      var o = _ref[0],
          col = _ref[1];
      return col + " " + o + "%";
    }).join(',') + ")";
  }
  function cssValue(value) {
    if (typeof value === 'string') { return value; }
    return value + "px";
  }

  var iroColorPickerOptionDefaults = {
    width: 300,
    height: 300,
    color: '#fff',
    colors: [],
    padding: 6,
    layoutDirection: 'vertical',
    borderColor: '#fff',
    borderWidth: 0,
    handleRadius: 8,
    activeHandleRadius: null,
    handleSvg: null,
    handleProps: {
      x: 0,
      y: 0
    },
    wheelLightness: true,
    wheelAngle: 0,
    wheelDirection: 'anticlockwise',
    sliderSize: null,
    sliderMargin: 12,
    boxHeight: null
  };

  var SECONDARY_EVENTS = ["mousemove" /* MouseMove */, "touchmove" /* TouchMove */, "mouseup" /* MouseUp */, "touchend" /* TouchEnd */];
  // Base component class for iro UI components
  // This extends the Preact component class to allow them to react to mouse/touch input events by themselves
  var IroComponentWrapper = /*@__PURE__*/(function (Component) {
      function IroComponentWrapper(props) {
          Component.call(this, props);
          // Generate unique ID for the component
          // This can be used to generate unique IDs for gradients, etc
          this.uid = (Math.random() + 1).toString(36).substring(5);
      }

      if ( Component ) IroComponentWrapper.__proto__ = Component;
      IroComponentWrapper.prototype = Object.create( Component && Component.prototype );
      IroComponentWrapper.prototype.constructor = IroComponentWrapper;
      IroComponentWrapper.prototype.render = function render (props) {
          var eventHandler = this.handleEvent.bind(this);
          var rootProps = {
              onMouseDown: eventHandler,
              // https://github.com/jaames/iro.js/issues/126
              // https://github.com/preactjs/preact/issues/2113#issuecomment-553408767
              ontouchstart: eventHandler,
          };
          var isHorizontal = props.layoutDirection === 'horizontal';
          var margin = props.margin === null ? props.sliderMargin : props.margin;
          var rootStyles = {
              overflow: 'visible',
              display: isHorizontal ? 'inline-block' : 'block'
          };
          // first component shouldn't have any margin
          if (props.index > 0) {
              rootStyles[isHorizontal ? 'marginLeft' : 'marginTop'] = margin;
          }
          return (h(d, null, props.children(this.uid, rootProps, rootStyles)));
      };
      // More info on handleEvent:
      // https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
      // TL;DR this lets us have a single point of entry for multiple events, and we can avoid callback/binding hell
      IroComponentWrapper.prototype.handleEvent = function handleEvent (e) {
          var this$1$1 = this;

          var inputHandler = this.props.onInput;
          // Get the screen position of the component
          var bounds = this.base.getBoundingClientRect();
          // Prefect default browser action
          e.preventDefault();
          // Detect if the event is a touch event by checking if it has the `touches` property
          // If it is a touch event, use the first touch input
          var point = e.touches ? e.changedTouches[0] : e;
          var x = point.clientX - bounds.left;
          var y = point.clientY - bounds.top;
          switch (e.type) {
              case "mousedown" /* MouseDown */:
              case "touchstart" /* TouchStart */:
                  var result = inputHandler(x, y, 0 /* Start */);
                  if (result !== false) {
                      SECONDARY_EVENTS.forEach(function (event) {
                          document.addEventListener(event, this$1$1, { passive: false });
                      });
                  }
                  break;
              case "mousemove" /* MouseMove */:
              case "touchmove" /* TouchMove */:
                  inputHandler(x, y, 1 /* Move */);
                  break;
              case "mouseup" /* MouseUp */:
              case "touchend" /* TouchEnd */:
                  inputHandler(x, y, 2 /* End */);
                  SECONDARY_EVENTS.forEach(function (event) {
                      document.removeEventListener(event, this$1$1, { passive: false });
                  });
                  break;
          }
      };

      return IroComponentWrapper;
  }(m));

  function IroHandle(props) {
      var radius = props.r;
      var url = props.url;
      var cx = radius;
      var cy = radius;
      return (h("svg", { className: ("IroHandle IroHandle--" + (props.index) + " " + (props.isActive ? 'IroHandle--isActive' : '')), style: {
              '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0);',
              transform: ("translate(" + (cssValue(props.x)) + ", " + (cssValue(props.y)) + ")"),
              willChange: 'transform',
              top: cssValue(-radius),
              left: cssValue(-radius),
              width: cssValue(radius * 2),
              height: cssValue(radius * 2),
              position: 'absolute',
              overflow: 'visible'
          } },
          url && (h("use", Object.assign({ xlinkHref: resolveSvgUrl(url) }, props.props))),
          !url && (h("circle", { cx: cx, cy: cy, r: radius, fill: "none", "stroke-width": 2, stroke: "#000" })),
          !url && (h("circle", { cx: cx, cy: cy, r: radius - 2, fill: props.fill, "stroke-width": 2, stroke: "#fff" }))));
  }
  IroHandle.defaultProps = {
      fill: 'none',
      x: 0,
      y: 0,
      r: 8,
      url: null,
      props: { x: 0, y: 0 }
  };

  function IroSlider(props) {
      var activeIndex = props.activeIndex;
      var activeColor = (activeIndex !== undefined && activeIndex < props.colors.length) ? props.colors[activeIndex] : props.color;
      var ref = getSliderDimensions(props);
      var width = ref.width;
      var height = ref.height;
      var radius = ref.radius;
      var handlePos = getSliderHandlePosition(props, activeColor);
      var gradient = getSliderGradient(props, activeColor);
      function handleInput(x, y, type) {
          var value = getSliderValueFromInput(props, x, y);
          props.parent.inputActive = true;
          activeColor[props.sliderType] = value;
          props.onInput(type, props.id);
      }
      return (h(IroComponentWrapper, Object.assign({}, props, { onInput: handleInput }), function (uid, rootProps, rootStyles) { return (h("div", Object.assign({}, rootProps, { className: "IroSlider", style: Object.assign({}, {position: 'relative',
              width: cssValue(width),
              height: cssValue(height),
              borderRadius: cssValue(radius),
              // checkered bg to represent alpha
              background: "conic-gradient(#ccc 25%, #fff 0 50%, #ccc 0 75%, #fff 0)",
              backgroundSize: '8px 8px'},
              rootStyles) }),
          h("div", { className: "IroSliderGradient", style: Object.assign({}, {position: 'absolute',
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: cssValue(radius),
                  background: cssGradient('linear', props.layoutDirection === 'horizontal' ? 'to top' : 'to right', gradient)},
                  cssBorderStyles(props)) }),
          h(IroHandle, { isActive: true, index: activeColor.index, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePos.x, y: handlePos.y }))); }));
  }
  IroSlider.defaultProps = Object.assign({}, sliderDefaultOptions);

  function IroBox(props) {
      var ref = getBoxDimensions(props);
      var width = ref.width;
      var height = ref.height;
      var radius = ref.radius;
      var colors = props.colors;
      var colorPicker = props.parent;
      var activeIndex = props.activeIndex;
      var activeColor = (activeIndex !== undefined && activeIndex < props.colors.length) ? props.colors[activeIndex] : props.color;
      var gradients = getBoxGradients(props, activeColor);
      var handlePositions = colors.map(function (color) { return getBoxHandlePosition(props, color); });
      function handleInput(x, y, inputType) {
          if (inputType === 0 /* Start */) {
              // getHandleAtPoint() returns the index for the handle if the point 'hits' it, or null otherwise
              var activeHandle = getHandleAtPoint(props, x, y, handlePositions);
              // If the input hit a handle, set it as the active handle, but don't update the color
              if (activeHandle !== null) {
                  colorPicker.setActiveColor(activeHandle);
              }
              // If the input didn't hit a handle, set the currently active handle to that position
              else {
                  colorPicker.inputActive = true;
                  activeColor.hsv = getBoxValueFromInput(props, x, y);
                  props.onInput(inputType, props.id);
              }
          }
          // move is fired when the user has started dragging
          else if (inputType === 1 /* Move */) {
              colorPicker.inputActive = true;
              activeColor.hsv = getBoxValueFromInput(props, x, y);
          }
          // let the color picker fire input:start, input:move or input:end events
          props.onInput(inputType, props.id);
      }
      return (h(IroComponentWrapper, Object.assign({}, props, { onInput: handleInput }), function (uid, rootProps, rootStyles) { return (h("div", Object.assign({}, rootProps, { className: "IroBox", style: Object.assign({}, {width: cssValue(width),
              height: cssValue(height),
              position: 'relative'},
              rootStyles) }),
          h("div", { className: "IroBox", style: Object.assign({}, {width: '100%',
                  height: '100%',
                  borderRadius: cssValue(radius)},
                  cssBorderStyles(props),
                  {background: cssGradient('linear', 'to bottom', gradients[1])
                      + ',' +
                      cssGradient('linear', 'to right', gradients[0])}) }),
          colors.filter(function (color) { return color !== activeColor; }).map(function (color) { return (h(IroHandle, { isActive: false, index: color.index, fill: color.hslString, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[color.index].x, y: handlePositions[color.index].y })); }),
          h(IroHandle, { isActive: true, index: activeColor.index, fill: activeColor.hslString, r: props.activeHandleRadius || props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[activeColor.index].x, y: handlePositions[activeColor.index].y }))); }));
  }

  var HUE_GRADIENT_CLOCKWISE = 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)';
  var HUE_GRADIENT_ANTICLOCKWISE = 'conic-gradient(red, magenta, blue, aqua, lime, yellow, red)';
  function IroWheel(props) {
      var ref = getWheelDimensions(props);
      var width = ref.width;
      var colors = props.colors;
      props.borderWidth;
      var colorPicker = props.parent;
      var activeColor = props.color;
      var hsv = activeColor.hsv;
      var handlePositions = colors.map(function (color) { return getWheelHandlePosition(props, color); });
      var circleStyles = {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          boxSizing: 'border-box'
      };
      function handleInput(x, y, inputType) {
          if (inputType === 0 /* Start */) {
              // input hitbox is a square, 
              // so we want to ignore any initial clicks outside the circular shape of the wheel
              if (!isInputInsideWheel(props, x, y)) {
                  // returning false will cease all event handling for this interaction
                  return false;
              }
              // getHandleAtPoint() returns the index for the handle if the point 'hits' it, or null otherwise
              var activeHandle = getHandleAtPoint(props, x, y, handlePositions);
              // If the input hit a handle, set it as the active handle, but don't update the color
              if (activeHandle !== null) {
                  colorPicker.setActiveColor(activeHandle);
              }
              // If the input didn't hit a handle, set the currently active handle to that position
              else {
                  colorPicker.inputActive = true;
                  activeColor.hsv = getWheelValueFromInput(props, x, y);
                  props.onInput(inputType, props.id);
              }
          }
          // move is fired when the user has started dragging
          else if (inputType === 1 /* Move */) {
              colorPicker.inputActive = true;
              activeColor.hsv = getWheelValueFromInput(props, x, y);
          }
          // let the color picker fire input:start, input:move or input:end events
          props.onInput(inputType, props.id);
      }
      return (h(IroComponentWrapper, Object.assign({}, props, { onInput: handleInput }), function (uid, rootProps, rootStyles) { return (h("div", Object.assign({}, rootProps, { className: "IroWheel", style: Object.assign({}, {width: cssValue(width),
              height: cssValue(width),
              position: 'relative'},
              rootStyles) }),
          h("div", { className: "IroWheelHue", style: Object.assign({}, circleStyles,
                  {transform: ("rotateZ(" + (props.wheelAngle + 90) + "deg)"),
                  background: props.wheelDirection === 'clockwise' ? HUE_GRADIENT_CLOCKWISE : HUE_GRADIENT_ANTICLOCKWISE}) }),
          h("div", { className: "IroWheelSaturation", style: Object.assign({}, circleStyles,
                  {background: 'radial-gradient(circle closest-side, #fff, transparent)'}) }),
          props.wheelLightness && (h("div", { className: "IroWheelLightness", style: Object.assign({}, circleStyles,
                  {background: '#000',
                  opacity: 1 - hsv.v / 100}) })),
          h("div", { className: "IroWheelBorder", style: Object.assign({}, circleStyles,
                  cssBorderStyles(props)) }),
          colors.filter(function (color) { return color !== activeColor; }).map(function (color) { return (h(IroHandle, { isActive: false, index: color.index, fill: color.hslString, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[color.index].x, y: handlePositions[color.index].y })); }),
          h(IroHandle, { isActive: true, index: activeColor.index, fill: activeColor.hslString, r: props.activeHandleRadius || props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[activeColor.index].x, y: handlePositions[activeColor.index].y }))); }));
  }

  function createWidget(WidgetComponent) {
      var widgetFactory = function (parent, props) {
          var widget; // will become an instance of the widget component class
          var widgetRoot = document.createElement('div');
          // Render widget into a temp DOM node
          I(h(WidgetComponent, Object.assign({}, {ref: function (ref) { return widget = ref; }},
              props)), widgetRoot);
          function mountWidget() {
              var container = parent instanceof Element ? parent : document.querySelector(parent);
              container.appendChild(widget.base);
              widget.onMount(container);
          }
          // Mount it into the DOM when the page document is ready
          if (document.readyState !== 'loading') {
              mountWidget();
          }
          else {
              document.addEventListener('DOMContentLoaded', mountWidget);
          }
          return widget;
      };
      // Allow the widget factory to inherit component prototype + static class methods
      // This makes it easier for plugin authors to extend the base widget component
      widgetFactory.prototype = WidgetComponent.prototype;
      Object.assign(widgetFactory, WidgetComponent);
      // Add reference to base component too
      widgetFactory.__component = WidgetComponent;
      return widgetFactory;
  }

  var IroColorPicker = /*@__PURE__*/(function (Component) {
      function IroColorPicker(props) {
          var this$1$1 = this;

          Component.call(this, props);
          this.colors = [];
          this.inputActive = false;
          this.events = {};
          this.activeEvents = {};
          this.deferredEvents = {};
          this.id = props.id;
          var colors = props.colors.length > 0 ? props.colors : [props.color];
          colors.forEach(function (colorValue) { return this$1$1.addColor(colorValue); });
          this.setActiveColor(0);
          // Pass all the props into the component's state,
          // Except we want to add the color object and make sure that refs aren't passed down to children
          this.state = Object.assign({}, props,
              {color: this.color,
              colors: this.colors,
              layout: props.layout});
      }

      if ( Component ) IroColorPicker.__proto__ = Component;
      IroColorPicker.prototype = Object.create( Component && Component.prototype );
      IroColorPicker.prototype.constructor = IroColorPicker;
      // Plubic multicolor API
      /**
      * @desc Add a color to the color picker
      * @param color new color to add
      * @param index optional color index
      */
      IroColorPicker.prototype.addColor = function addColor (color, index) {
          if ( index === void 0 ) index = this.colors.length;

          // Create a new iro.Color
          // Also bind it to onColorChange, so whenever the color changes it updates the color picker
          var newColor = new IroColor(color, this.onColorChange.bind(this));
          // Insert color @ the given index
          this.colors.splice(index, 0, newColor);
          // Reindex colors
          this.colors.forEach(function (color, index) { return color.index = index; });
          // Update picker state if necessary
          if (this.state) {
              this.setState({ colors: this.colors });
          }
          // Fire color init event
          this.deferredEmit('color:init', newColor);
      };
      /**
       * @desc Remove a color from the color picker
       * @param index color index
       */
      IroColorPicker.prototype.removeColor = function removeColor (index) {
          var color = this.colors.splice(index, 1)[0];
          // Destroy the color object -- this unbinds it from the color picker
          color.unbind();
          // Reindex colors
          this.colors.forEach(function (color, index) { return color.index = index; });
          // Update picker state if necessary
          if (this.state) {
              this.setState({ colors: this.colors });
          }
          // If the active color was removed, default active color to 0
          if (color.index === this.color.index) {
              this.setActiveColor(0);
          }
          // Fire color remove event
          this.emit('color:remove', color);
      };
      /**
       * @desc Set the currently active color
       * @param index color index
       */
      IroColorPicker.prototype.setActiveColor = function setActiveColor (index) {
          this.color = this.colors[index];
          if (this.state) {
              this.setState({ color: this.color });
          }
          // Fire color switch event
          this.emit('color:setActive', this.color);
      };
      /**
       * @desc Replace all of the current colorPicker colors
       * @param newColorValues list of new colors to add
       */
      IroColorPicker.prototype.setColors = function setColors (newColorValues, activeColorIndex) {
          var this$1$1 = this;
          if ( activeColorIndex === void 0 ) activeColorIndex = 0;

          // Unbind color events
          this.colors.forEach(function (color) { return color.unbind(); });
          // Destroy old colors
          this.colors = [];
          // Add new colors
          newColorValues.forEach(function (colorValue) { return this$1$1.addColor(colorValue); });
          // Reset active color
          this.setActiveColor(activeColorIndex);
          this.emit('color:setAll', this.colors);
      };
      // Public ColorPicker events API
      /**
       * @desc Set a callback function for an event
       * @param eventList event(s) to listen to
       * @param callback - Function called when the event is fired
       */
      IroColorPicker.prototype.on = function on (eventList, callback) {
          var this$1$1 = this;

          var events = this.events;
          // eventList can be an eventType string or an array of eventType strings
          (!Array.isArray(eventList) ? [eventList] : eventList).forEach(function (eventType) {
              // Add event callback
              (events[eventType] || (events[eventType] = [])).push(callback);
              // Call deferred events
              // These are events that can be stored until a listener for them is added
              if (this$1$1.deferredEvents[eventType]) {
                  // Deffered events store an array of arguments from when the event was called
                  this$1$1.deferredEvents[eventType].forEach(function (args) {
                      callback.apply(null, args);
                  });
                  // Clear deferred events
                  this$1$1.deferredEvents[eventType] = [];
              }
          });
      };
      /**
       * @desc Remove a callback function for an event added with on()
       * @param eventList - event(s) to listen to
       * @param callback - original callback function to remove
       */
      IroColorPicker.prototype.off = function off (eventList, callback) {
          var this$1$1 = this;

          (!Array.isArray(eventList) ? [eventList] : eventList).forEach(function (eventType) {
              var callbackList = this$1$1.events[eventType];
              // this.emitHook('event:off', eventType, callback);
              if (callbackList)
                  { callbackList.splice(callbackList.indexOf(callback), 1); }
          });
      };
      /**
       * @desc Emit an event
       * @param eventType event to emit
       */
      IroColorPicker.prototype.emit = function emit (eventType) {
          var this$1$1 = this;
          var args = [], len = arguments.length - 1;
          while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

          var activeEvents = this.activeEvents;
          var isEventActive = activeEvents.hasOwnProperty(eventType) ? activeEvents[eventType] : false;
          // Prevent event callbacks from firing if the event is already active
          // This stops infinite loops if something in an event callback causes the same event to be fired again
          // (e.g. setting the color inside a color:change callback)
          if (!isEventActive) {
              activeEvents[eventType] = true;
              var callbackList = this.events[eventType] || [];
              callbackList.forEach(function (fn) { return fn.apply(this$1$1, args); });
              activeEvents[eventType] = false;
          }
      };
      /**
       * @desc Emit an event now, or save it for when the relevent event listener is added
       * @param eventType - The name of the event to emit
       */
      IroColorPicker.prototype.deferredEmit = function deferredEmit (eventType) {
          var ref;

          var args = [], len = arguments.length - 1;
          while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
          var deferredEvents = this.deferredEvents;
          (ref = this).emit.apply(ref, [ eventType ].concat( args ));
          (deferredEvents[eventType] || (deferredEvents[eventType] = [])).push(args);
      };
      // Public utility methods
      IroColorPicker.prototype.setOptions = function setOptions (newOptions) {
          this.setState(newOptions);
      };
      /**
       * @desc Resize the color picker
       * @param width - new width
       */
      IroColorPicker.prototype.resize = function resize (width) {
          this.setOptions({ width: width });
      };
      /**
       * @desc Reset the color picker to the initial color provided in the color picker options
       */
      IroColorPicker.prototype.reset = function reset () {
          this.colors.forEach(function (color) { return color.reset(); });
          this.setState({ colors: this.colors });
      };
      /**
       * @desc Called by the createWidget wrapper when the element is mounted into the page
       * @param container - the container element for this ColorPicker instance
       */
      IroColorPicker.prototype.onMount = function onMount (container) {
          this.el = container;
          this.deferredEmit('mount', this);
      };
      // Internal methods
      /**
       * @desc React to a color update
       * @param color - current color
       * @param changes - shows which h,s,v,a color channels changed
       */
      IroColorPicker.prototype.onColorChange = function onColorChange (color, changes) {
          this.setState({ color: this.color });
          if (this.inputActive) {
              this.inputActive = false;
              this.emit('input:change', color, changes);
          }
          this.emit('color:change', color, changes);
      };
      /**
       * @desc Handle input from a UI control element
       * @param type - event type
       */
      IroColorPicker.prototype.emitInputEvent = function emitInputEvent (type, originId) {
          if (type === 0 /* Start */) {
              this.emit('input:start', this.color, originId);
          }
          else if (type === 1 /* Move */) {
              this.emit('input:move', this.color, originId);
          }
          else if (type === 2 /* End */) {
              this.emit('input:end', this.color, originId);
          }
      };
      IroColorPicker.prototype.render = function render (props, state) {
          var this$1$1 = this;

          var layout = state.layout;
          // use layout shorthands
          if (!Array.isArray(layout)) {
              switch (layout) {
                  // TODO: implement some?
                  default:
                      layout = [
                          { component: IroWheel },
                          { component: IroSlider } ];
              }
              // add transparency slider to the layout
              if (state.transparency) {
                  layout.push({
                      component: IroSlider,
                      options: {
                          sliderType: 'alpha'
                      }
                  });
              }
          }
          return (h("div", { class: "IroColorPicker", id: state.id, style: {
                  display: state.display
              } }, layout.map(function (ref, componentIndex) {
                  var UiComponent = ref.component;
                  var options = ref.options;

                  return (h(UiComponent, Object.assign({}, state, options, { ref: undefined, onInput: this$1$1.emitInputEvent.bind(this$1$1), parent: this$1$1, index: componentIndex })));
          })));
      };

      return IroColorPicker;
  }(m));
  IroColorPicker.defaultProps = Object.assign({}, iroColorPickerOptionDefaults,
      {colors: [],
      display: 'block',
      id: null,
      layout: 'default',
      margin: null});
  var IroColorPickerWidget = createWidget(IroColorPicker);

  var iro;
  (function (iro) {
      iro.version = "5.5.2"; // replaced by @rollup/plugin-replace; see rollup.config.js
      iro.Color = IroColor;
      iro.ColorPicker = IroColorPickerWidget;
      (function (ui) {
          ui.h = h;
          ui.ComponentBase = IroComponentWrapper;
          ui.Handle = IroHandle;
          ui.Slider = IroSlider;
          ui.Wheel = IroWheel;
          ui.Box = IroBox;
      })(iro.ui || (iro.ui = {}));
  })(iro || (iro = {}));
  var iro$1 = iro;

  // import * as iro from 'https://cdn.jsdelivr.net/npm/@jaames/iro@beta/dist/iro.min.js';

  class GeneEditorComponent extends EventTarget {

      constructor(args) {
        super();
          this._elementId = args.elementId;

          let regenID = 0;
          let delayOnChange = 200;

          this._element = document.getElementById(this._elementId);

          this._form = document.createElement('form');
          this._form.className = "form"; 
          this._form.id = 'dna-form';
          this.eventTarget = new EventTarget();
          var _self = this;
          this._form.addEventListener('change', function(evt) {
            clearTimeout(regenID);
            evt.stopPropagation();
            {
              regenID = setTimeout(function() { _self.onChange(evt); }, delayOnChange);
            }
            }, false);
      }

      loadSchema(schemaFile) {
        fetch(schemaFile)
        .then(response => response.json())
        .then(json => console.log(json));
      }
      onChange(evt) {
        this.dispatchEvent(new CustomEvent('editor.change', {
          detail: this.dna
       }));
      }

      get isEmpty() {
        return Object.keys(this.dna).length !== 0 
      }

      get dna() {
        return $('#dna-form').serializeJSON({});
      }

      render(PAR) {

        var PAR = this.sortKeys(PAR);

        var form = this._form;
        form.innerHTML = "";
        for (let k in PAR){
          var container = document.createElement('div');
              container.className = "col-md-3";

          if (typeof(PAR[k]) == "number"){

            var inpt = this.input({value: PAR[k], name: k, input: {type: 'number', class: 'form-control form-control-sm', min:0, max:180, step: 0.00000000000001}});

            container.appendChild(inpt);
            form.appendChild(container);

          }else if (typeof(PAR[k]) == "object"){

            for (var i in PAR[k]){
        
              if (k.includes("olor")){

                var colorInput = this.colorInput({value: PAR[k][i], label: `${k}.${i}`, id: `${k}-${i}`, name: `${k}[${i}]`, min:0, max:359});
              
                container.appendChild(colorInput);
                form.appendChild(container);
      
              }else {


                if(Array.isArray(PAR[k])) {
                  var inpt = this.input({label: `${k}.${i}`, value: PAR[k][i], name: `${k}[]`, input: {min:1, max:4, step: 1, type: "number", class: 'form-control form-control-sm'}});

                  container.appendChild(inpt);
                  form.appendChild(container);
                }else {
                  var inpt = this.input({label: `${k}.${i}`, value: PAR[k][i], name: `${k}[${i}]`, input: {type: "number", class: 'form-control form-control-sm', min:1, max:4, step: 1}});

                  container.appendChild(inpt);
                  form.appendChild(container);
                }

              }
            }
            
          }

          this._element.appendChild(form);

        } 


        // const popover = new bootstrap.Popover('.swatch', options);
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
        [...popoverTriggerList].map(popoverTriggerEl => {
          let options = {
            html: true,
            content: () => {
              return '<div id="' + popoverTriggerEl.id + '-colorpicker"></div>'
            }
          };
          new bootstrap.Popover(popoverTriggerEl, options);
          popoverTriggerEl.addEventListener('shown.bs.popover', (event) => {
          
            var colorPicker = new iro$1.ColorPicker("#" + event.target.id + '-colorpicker', {
              // Set the size of the color picker
              width: 220,
              // Set the initial color to pure red

              color: event.target.style.backgroundColor,
              layout: [
                {
                  component: iro$1.ui.Slider,
                  options: {
                    sliderType: 'hue'
                  }
                },
                {
                  component: iro$1.ui.Slider,
                  options: {
                    sliderType: 'saturation'
                  }
                },
                {
                  component: iro$1.ui.Slider,
                  options: {
                    sliderType: 'value'
                  }
                },
                {
                  component: iro$1.ui.Slider,
                  options: {
                    sliderType: 'alpha'
                  }
                },

              ]
            });
            colorPicker.on('color:change', function(color) {
              event.target.style.backgroundColor = color.rgbaString;
              const colorName = new Color$1(color.hex8String).humanName;
              event.target.nextElementSibling.innerHTML = colorName;
              Object.entries(color.hsva).map((k,i) => { 
                if([0,3].includes(i)) {
                  document.getElementById(`${event.target.id}-${k[0]}`).value = k[1];
                }else {
                  document.getElementById(`${event.target.id}-${k[0]}`).value = k[1] / 100;
                }
              });
              event.target.setAttribute('data-bs-title', colorName);
            });
          });

          popoverTriggerEl.addEventListener('hidden.bs.popover', (event) => {

            this.onChange();

          });



        });



         
      }

      colorInput(attributes) {
        var inputGroup = document.createElement('div');
            inputGroup.className = "mb-1"; 

        var inputContainer = document.createElement('div');
            inputContainer.className = "row";
            inputContainer.id = attributes.id;

        var label = document.createElement('label');
            label.className = "col-4 col-form-label col-form-label-sm text-end pe-2";
            label.innerHTML = attributes.label || attributes.name;

        var input = document.createElement('div');
            input.className = "swatch col-2 mt-1";
            this.setAttributes(input, {
              'data-bs-container':"body",
              'data-bs-toggle': "popover",
              'data-bs-placement': "bottom",
            });
            input.style="background-color: " + Color$1.toHSLA(attributes.value);
            input.id =  attributes.id;



        var colorName = document.createElement('div');
            colorName.innerHTML = Color$1.fromHSLA(attributes.value).humanName;
            colorName.className = "col-sm-6 color-name col-form-label col-form-label-sm"; 

        for(var v in attributes.value) {
          var naming = ['h','s','v','a'];
          var hiddenInput = document.createElement('input');
              hiddenInput.className = ''; 
              hiddenInput.type = 'hidden';
              hiddenInput.value = attributes.value[v];
              hiddenInput.id = `${attributes.label.replace(".", '-')}-${naming[v]}`;
              
              this.setAttributes(hiddenInput,{name: `${attributes.name}[]:number`, value: attributes.value[v]});
              inputContainer.appendChild(hiddenInput);
        }
        inputContainer.appendChild(label);
        inputContainer.appendChild(input);
        inputContainer.appendChild(colorName);
        inputGroup.appendChild(inputContainer);

        return inputGroup;
      }

      input(attributes={}) {

        attributes.input = {
          ...{type: "range", class: 'form-range', min:0, max:180, step: 0.00000000000001 }, //defaults
          ...attributes.input, //override defaults with user input
          ...{value: attributes.value, name: attributes.name} //allow value and name keys as first level args
        };
        attributes.input.name = `${attributes.input.name}:number`;


        var inputGroup = document.createElement('div');
            inputGroup.className = "input-group mb-1";

        var label = document.createElement('label');
            label.className = "col-sm-4 col-form-label col-form-label-sm text-end pe-2";
            label.innerHTML = attributes.label || attributes.name;

        var inputContainer = document.createElement('div');
            inputContainer.className = "col-8";

        var input = document.createElement('input');
            input.className = attributes.input.class; 
            input.type = attributes.input.type;

            this.setAttributes(input, attributes.input);

        inputGroup.appendChild(label);
        inputContainer.appendChild(input);
        inputGroup.appendChild(inputContainer);

        if(attributes.input.type == "range") {
            input.oninput=() => input.nextElementSibling.innerText = input.value;
              
            var span = document.createElement('span');
                span.className = "small";
                span.innerHTML = input.value;

            inputContainer.appendChild(span);

        }

        return inputGroup; 
      }

      sortKeys(objToSort) {
        let sorted = Object.keys(objToSort).sort().reduce(
          (obj, key) => { 
            obj[key] = objToSort[key]; 
            return obj;
          }, 
          {}
        );
        return sorted;
      }

      setAttributes(element, attributes) {
        Object.keys(attributes).forEach(attr => {
          element.setAttribute(attr, attributes[attr]);
        });
      }


  }

  let _APP = null;

  window.addEventListener('DOMContentLoaded', () => {
      _APP = new Generator();


      _APP.geneEditor.addEventListener('editor.change', function(evt) {
          // evt.detail;
          _APP.OnChange();
      });
  //   const inputs = document.querySelectorAll('input');
  //   inputs.forEach(i => {
  //     i.onchange = () => {
  //       _APP.OnChange();
  //     };
  //   });
  });

  class Generator {

      CANVAS_WIDTH = 704;
      CANVAS_HEIGHT = 863;

      constructor() {
          this._id = 0;
          this._configuration = (v) => (new URLSearchParams(window.location.search)); 
          

          this.geneEditor = new GeneEditorComponent({elementId: 'gene-editor-component'});

          this.OnChange();
      }

      OnChange() {
          this._UpdateFromUI();
          this._ANIMATE();
      }

      _UpdateFromUI() {

          new Math.seedrandom(); // call with new to create a standalone generator without affecting Math.random() yet.
          Math.seed = function(x) { return Math.seedrandom(x); };

      }

      _ANIMATE(timeElapsed) {



          let plantCount = this.configuration.get("plantCount") || 9;
          let renderObject = document.getElementById('render-object');



          for(var i = 0; i < plantCount; i++) {
              let options = {
                  width: this.CANVAS_WIDTH,
                  height: this.CANVAS_HEIGHT, 
                  xof:this.CANVAS_WIDTH/2,
                  yof:this.CANVAS_WIDTH,
                  dna: {
                      seed: this.configuration.get('seed'),
                  },
                  filtering_enabled: false
              };

              if(this.geneEditor.isEmpty) {
                  console.log("EDITING", this.geneEditor.dna);
                  options.dna = new DNA(this.geneEditor.dna);
                  renderObject.innerHTML = "";
              }else {
                  console.log("NEW");
                  console.log('OPTION SEED:', options.dna.seed);
                  options.dna = new DNA(options.dna);
              }

              const plant = new PlantFactory(options, this.configuration.get('plantType'));
                  console.log("Generating", plant);
                  plant.generate({containerElementId: 'canvas-container'});
                      
              if(plantCount == 1) {
                  this.geneEditor.render(plant.dna.genes);
                  var perRow = 9;
              }else {
                  var perRow = 4;
              }


              // This contains the entire plant image and name
              const name = new nameComponent({containerElementId: 'render-object'});
                    name.render(plant, "col-md-" + perRow);
          }


      }




      get configuration() {
          return this._configuration();
      }


  }

})();
//# sourceMappingURL=app.js.map
