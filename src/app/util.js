import {Noise} from './noise.js';
import {v3} from './v3.js';

export class Util {


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
        let c = v*s
        let x = c*(1-this.abs((h/60)%2-1))
        let m = v-c
        let [rv,gv,bv] = ([[c,x,0],[x,c,0],[0,c,x],
                            [0,x,c],[x,0,c],[c,0,x]])[Math.floor(h/60)]
        let [r,g,b] = [(rv+m)*255,(gv+m)*255,(bv+m)*255,a]
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
            ]
        methods.sort((x,y)=>(x[0]-y[0]))
        return (methods[0][1]+720)%360
    }

    static grot(P,ind){
        let d = v3.subtract(P[ind],P[ind-1])
        return v3.toeuler(d)
    }

    static tubify(args){
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
            vtxlist0.push([pts[i][0]+w*this.cos(a),(pts[i][1]+w*this.sin(a))]);
            vtxlist1.push([pts[i][0]-w*this.cos(a),(pts[i][1]-w*this.sin(a))]);
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
    
        let [vtxlist0,vtxlist1] = this.tubify({pts:pts,wid:wid})
    
        this.polygon({pts:vtxlist0.concat(vtxlist1.reverse()),
            ctx:ctx,fil:true,col:col,xof:xof,yof:yof})
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
        let x = Math.random()
        let y = Math.random()
        if (y<func(x)){
            return x
        }else{
            return this.wtrand(func)
        }
    }
    // gaussian randomness
    static randGaussian(){
        return this.wtrand(function(x){return Math.pow(Math.E,-24*Math.pow(x-0.5,2))})*2-1
    }
    // sigmoid curve
    static sigmoid(x,k){
        k = (k != undefined) ? k : 10
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
            th -= this.PI/2
            }
            while (th < 0){
            th += this.PI/2
            }
            return r*this.pow(1/(this.pow(this.cos(th),a)+this.pow(this.sin(th),a)),1/a)
        }
    }
    // mid-point of an array of points
    static midPt(){
        let plist = (arguments.length == 1) ? 
            arguments[0] : Array.apply(null, arguments)
        return plist.reduce(function(acc,v){
            return [v[0]/plist.length+acc[0],
                    v[1]/plist.length+acc[1],
                    v[2]/plist.length+acc[2]]
        },[0,0,0])
    }
    // rational bezier curve
    static bezmh(P, w){
        w = (w == undefined) ? 1 : w
        if (P.length == 2){
            P = [P[0],this.midPt(P[0],P[1]),P[1]];
        }
        let plist = [];
        for (let j = 0; j < P.length-2; j++){
            let p0; let p1; let p2;
            if (j == 0){p0 = P[j];}else{p0 = this.midPt(P[j],P[j+1]);}
            p1 = P[j+1];
            if (j == P.length-3){p2 = P[j+2];}else{p2 = this.midPt(P[j+1],P[j+2]);}
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

    static deepClone(array){
        return JSON.parse(JSON.stringify(array));
    }

}
