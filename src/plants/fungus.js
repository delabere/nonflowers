import {Plant} from './plants.js';
import {Layer} from './../app/layer.js';
import {Noise} from './../app/noise.js';
import {Util} from './../app/util.js';
import { v3 } from '../app/v3.js';

import { ColorRangeDescriptor } from './../app/colorRangeDescriptor.js';

export class Fungus extends Plant {

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
        var args =(this.args != undefined) ? this.args : {};

        var cwid = this.ctx.canvas.width
        var cheight = this.ctx.canvas.height
        var lay0 = new Layer(cwid, cheight)
        var lay1 = new Layer(cwid, cheight)
        this.layers.push(lay0,lay1)
        
        var x0 = cwid*0.5;
        var y0 = cheight*0.9; 
        let saturation = (x, bump) => {x[1] = this.clamp(x[1] + bump, 0,1); return x};
        this.genes.flowerColor = Object.keys(this.genes.flowerColor).reduce((result, k) => {  result[k] = saturation(this.genes.flowerColor[k], 0.05); return result}, {}) ,
        // ideal stem color
        this.genes.branchColor = {min: [Util.normRand(50.63842005726726, 56),Util.normRand(0.2,0.32),Util.normRand(0.26011155920859, 0.34),0.999],
          max: [Util.normRand(58.63842005726724, 62),Util.normRand(0.4, 0.7),Util.normRand(0.86011155920859, 0.99),0.999]}
  
        for (var i = 0; i < Math.floor(this.genes.stemCount ); i++){
            var r = [Util.PI/2,0,Util.normRand(-1,1)*Util.PI]
            var capOffset =  Util.normRand(-40,50);
            var gillOffset = 6

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
                )})
            
 
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

              let capRotation = v3.add(Util.grot(P,-1), [0,0,0])

            //GILLS
            this.genes.leafColor = {min: [Util.normRand(58, 62),Util.normRand(0.3,0.52),Util.normRand(0.8, 0.94),0.8],
                max: [Util.normRand(58, 62),Util.normRand(0.2,0.62),Util.normRand(0.4, 0.6),0.2]}


            var capVariation = Util.normRand(0.5,2.5)
            var capShapeMask  = (x) => ( Util.deltoid(Util.sin(Math.PI*x),this.genes.capShapeMaskCoeff *capVariation , Math.PI/2)) 
            // var capShape = (x) => (Util.deltoid(Noise.noise(x,this.genes.flowerShapeNoiseSeed),this.genes.flowerShapeMaskCoeff, 1.2)*capShapeMask(x))
            var capShape = (x) => Util.sin(Math.PI*x ) * Math.cos(x*40)

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
            var stemAge = (this.genes.stemLength * Util.normRand(0.002, 1.2))
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
            })




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
        {min:[250,0.2,0.4,1],max:[250,0.3,0.6,1]}
      var gil = (args.gil != undefined) ? args.gil : false;
      var ben = (args.ben != undefined) ? args.ben : 
        (x) => ([Util.normRand(-10,10),0,Util.normRand(-5,5)])
    
    
      // console.log(xof, yof, rot, len, seg, wid, col, ben)
    
      var disp = v3.zero
      var crot = v3.zero
      var P = [disp]
      var ROT = [crot]
    
      var orient = (v) => (v3.roteuler(v,rot));
      
      for (var i = 0; i < seg; i++){
        var p = i/(seg-1)
        crot= v3.add(crot,v3.scale(ben(p),1/seg))
        disp = v3.add(disp,orient(v3.roteuler([0,0,len/seg],crot)))
        ROT.push(crot);
        P.push(disp);
      }
      var [L,R] = Util.tubify({pts:P,wid:wid})
      var wseg = 18 + Math.floor(seg/2) // Math.abs(this.dna.genes.flowerWidth/Util.normRand(2,3)).toFixed(0);
      var noiseScale = this.dna.genes.noiseScale ; 
      for (var i = 1; i < P.length; i++){
        for (var j = 1; j < wseg; j++){
          var m = (j-1)/(wseg-1);
          var n = j/(wseg-1);
          var p = i/(P.length-1)
          // var pcurve = this.curveCoeff2;
          // p = Util.sigmoid( (j*p) * pcurve[0], pcurve[1]) * 0.4
          // var mCurve = this.curveCoeff2
          // m = Util.sigmoid( ( m) * mCurve[0], mCurve[1]) * 0.7
 
            //Adds shading
            var mCurve = this.curveCoeff4
            var mx = Util.sigmoid( m * mCurve[0], mCurve[1]) * 2.2// * mCurve[0]/Util.PI//* Util.cos(Util.PI/seg) * 0.09 * (0.7 )
  
            var pcurve = this.curveCoeff0
            var px = Util.sigmoid( p * pcurve[0], pcurve[1]) * Util.sin(Util.PI/1*seg) //* Util.mapval(Noise.noise(p*noiseScale, m*noiseScale, n*noiseScale),0.2,0.5,0.2,1) 
  
            var ncurve = this.curveCoeff2
            var nx = Util.sin( ( n) * ncurve[0], ncurve[1]) //  * Util.cos(Util.PI/px) * 0.1//* (Math.Util.PI/2) 
    
  
          var p0 = v3.lerp(L[i-1],R[i-1],m) //- Util.mapval(Noise.noise(p/noiseScale,m*noiseScale,n*noiseScale),0,1,0,mx)
          var p1 = v3.lerp(L[i],R[i],m) //- Util.mapval(Noise.noise(p/noiseScale,m*noiseScale,n*noiseScale),0,1,0,mx)
    
          var p2 = v3.lerp(L[i-1],R[i-1],n)
          var p3 = v3.lerp(L[i],R[i],n)


          var lt = Util.sin((n/p) ) * 0.5 + 0.1 

          var h = Util.lerpHue(col.min[0],col.max[0],lt) *Util.mapval(Noise.noise(Util.cos(p/noiseScale) * Util.PI/2 * 0.5 + 0.5,m*noiseScale,n*noiseScale),0,1,0,1)
          var s = Util.mapval(lt,0,1,col.max[1],col.min[1]) *Util.mapval(Noise.noise(p*noiseScale,m*noiseScale,n*noiseScale),0,1,0,1)
          var v = Util.mapval(lt,0,1,col.min[2],col.max[2])// *Util.mapval(Noise.noise(p*noiseScale,m*noiseScale,n*noiseScale),0,1,0,1)
          var a = Util.mapval(lt,0.8,1,col.min[3],col.max[3])

          // console.log(col.min[0], col.max[0], h, lt, this.dna.color([h,s,v,a]).humanName)
          if(gil){
            Util.polygon({ctx:ctx,pts:[p0,p0,p2,p3],
              xof:xof,yof:yof,fil:true, str:true,col:Util.hsv(h,s*0.8,v*0.6,0.7)}) 
          }else{
            Util.polygon({ctx:ctx,pts:[p0,p1,p3,p2],
              xof:xof,yof:yof,fil:true,str:true,col:Util.hsv(h,s,v,0.8)})
          }

        }

      }
      for (var i = 1; i < P.length; i++){
        for (var j = 0; j < vei[1]; j++){
          var p = j/vei[1];
  
          var p0 = v3.lerp(L[i-1],P[i-1],p)
          var p1 = v3.lerp(L[i],P[i],p)
  
          var q0 = v3.lerp(R[i-1],P[i-1],p)
          var q1 = v3.lerp(R[i],P[i],p)
          Util.polygon({ctx:ctx,pts:[p0,p1],
            xof:xof,yof:yof,fil:false,col:Util.hsv(0,0,0,Util.normRand(0.4,0.9))})
          Util.polygon({ctx:ctx,pts:[q0,q1],
            xof:xof,yof:yof,fil:false,col:Util.hsv(0,0,0,Util.normRand(0.4,0.9))})
  
        }
      }
      Util.stroke({ctx:ctx,pts:P,xof:xof,yof:yof,col:Util.rgba(0,0,0,0.3)})

      Util.stroke({ctx:ctx,pts:L,xof:xof,yof:yof,col:Util.rgba(0,0,0,0.5)})
      Util.stroke({ctx:ctx,pts:R,xof:xof,yof:yof,col:Util.rgba(0,0,0,0.6)})
      return P
    }
      
      

    

}