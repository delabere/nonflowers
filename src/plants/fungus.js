import {Plant} from './plants.js';
import {Layer} from './../app/layer.js';
import {Noise} from './../app/noise.js';
import {Util} from './../app/util.js';
import { v3 } from '../app/v3.js';

import { ColorRangeDescriptor } from './../app/colorRangeDescriptor.js';
import tracery from 'tracery-es8';

export class Fungus extends Plant {

    //create a list of mushroom names.
    MOOD_ADJECTIVES = ["foul", "Fragrant", "dwarf", "giant", "plain", "mysterious", "nervous",  "thoughtless", "stinky", "spongy", "inky", "toppled", "reaching", "upright"];
    LOCATION_ADJECTIVES = ["cave","man", "hill", "island", "mountain", "ocean", "plain", "river", "sea", "swamp", "heavens", "sky", "cliff"];
    type = "fungus";

    grammar = {
      "name":["#commonName.capitalizeAll#"],
      "plantName": ["Cap", "Fingers", "Mushroom", "Fungus", "Stool", "Umbrella", "Hat", "Crown", "Stem"],
      "location": ["cave","man", "hill", "island", "mountain", "ocean", "plain", "river", "sea", "swamp", "heavens", "sky", "cliff"],
      "gender": ["man", "lady"],
      "mood": ["foul", "Fragrant", "dwarf", "giant", "plain", "mysterious", "nervous",  "thoughtless", "stinky", "spongy", "inky", "toppled", "reaching", "upright"],
      "commonName": ["#mood# #plantName#", "#mood# #location# #plantName#", "#mood# #plantName# of the #location#"]
    };

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
        
        let vei = [Util.randChoice([0,1]),Util.normRand(6,12)]
  
        for (var i = 0; i < Math.floor(this.genes.stemCount ); i++){
            var r = [Util.PI/2,0,Util.normRand(-1,1)*Util.PI]
            var capOffset =  Util.normRand( 90 - (this.genes.flowerWidth * i) + Util.normRand(10, 20),((this.genes.flowerWidth*3)*i) + Util.normRand(10, 20)+ 20);
            var gillOffset = 6

            var stemLength = this.genes.stemLength * Util.normRand(0.002, 1) ;
            // Volva
                // gill shape
                // wid: (x) =>  (this.genes.stemWidth * 0.8 )/(Util.bean(Util.sigmoid(x*Util.PI*0.144),1)-Util.sigmoid(x*0.85)+flare),//Util.bean(x * (this.genes.sheathWidth + this.genes.stemWidth * stemAge)) + (this.genes.stemWidth * 1) +  this.genes.stemWidth*(Util.pow(Util.sin(x*Util.PI),2)-x*0.5+0.5),

            var flare = 0.37;
            var V = this.stem({ctx:lay1,
                xof:x0 + capOffset , 
                yof:y0,
                rot: r,
                len:stemLength / 10, //this.genes.sheathLength,//this.clamp(desiredSheathLength, 0, P[-1].y + P[-2].y ),//this.clamp( desiredSheathLength, (this.genes.sheathLength * stemAge) , (this.genes.flowerLength + this.genes.sheathLength) * ( stemAge + 0.5)  ),
                seg: 18,
                col: {min:  [70,0.2,0.7,0.9], max: [70,0.2,0.9,0.9]},
                // wid:(x) => (this.genes.stemWidth * 1.3 )*(Util.pow(Util.sin(x*Util.PI),1)-x*0.5+0.6),
                wid: (x) =>  (this.genes.stemWidth * 0.8 )/(Util.bean(Util.sigmoid(x*Util.PI*0.144),1)-Util.sin(x*0.78)+flare),//Util.bean(x * (this.genes.sheathWidth + this.genes.stemWidth * stemAge)) + (this.genes.stemWidth * 1) +  this.genes.stemWidth*(Util.pow(Util.sin(x*Util.PI),2)-x*0.5+0.5),
                ben:(x) => [0,0,0] 
            })

            // STEM
            var P = this.stem({
                ctx:lay0,
                xof:x0 + capOffset,
                yof:y0 ,
                len:stemLength,
                rot:r,
                seg: 70,
                col: this.genes.branchColor,
                wid:(x) => (this.genes.stemWidth*
                    (Util.pow(Util.sin(x*Util.PI/2+Util.PI/2),0.5)*Noise.noise(x*20)*1.2+0.9)),
                ben:(x) => ([
                    (Util.mapval(Noise.noise(x*1,i),0,1,-1,1)*x* this.genes.stemBend) * Util.normRand(0.2, 0.8) , 
                    0,
                    Util.mapval(Noise.noise(x*1,i+Util.PI),0,1,-1,1)*x*this.genes.stemBend,
                    ]
                )})
            
 
            let capRotation = v3.add(Util.grot(P,-1), [0,0,0])
            // this.genes.flowerJaggedness = Util.mapval(this.genes.flowerJaggedness, 10, 80, 40, 50);
            // Make cap shape open with stem age
            var stemAge = (stemLength / this.genes.stemLength)
            this.genes.sheathLength = (this.genes.sheathLength <= 0) ? this.genes.flowerLength + 180 : this.genes.sheathLength//* stemAge
            var sheathRatio = this.genes.sheathLength == 0 ? 1 : (this.genes.sheathWidth / this.genes.sheathLength) 
            var sheathRotation = Util.grot(P,-2)
            var desiredSheathLength = this.genes.sheathLength * (stemAge + 0.3)
            var sheathLength = this.clamp(desiredSheathLength * (0.1 + (1 - stemAge)), 0, desiredSheathLength/6)


            let hr = Util.grot(P,-1)


            // Shoot
            let P_ = this.stem({ctx:lay0,
              xof:x0+P[-1].x + capOffset,
              yof:y0+P[-1].y,
              rot:hr,
              len:sheathLength * stemAge ,
              col:{min:[70,0.2,0.9,1],max:[70,0.2,0.9,1]},
              wid:(x) => (this.genes.stemWidth),
              ben:(x) => ([0,0,0])
                  // Util.mapval(Noise.noise(x*1,i),0,1,-1,1)*x*10,
                  // 0,
                  // Util.mapval(Noise.noise(x*1,i+Util.PI),0,1,-1,1)*x*10
              // ])})
            })

            var capVariation = Util.normRand(0.5,2.5)
            var capShapeMask  = (x) => ( Util.deltoid(Util.sin(Math.PI*x),this.genes.capShapeMaskCoeff *capVariation , Math.PI/2)) 
            // var capShape = (x) => (Util.deltoid(Noise.noise(x,this.genes.flowerShapeNoiseSeed),this.genes.flowerShapeMaskCoeff, 1.2)*capShapeMask(x))
            var capShape = (x) => Util.bean(x)/(x*0.5); //Util.sin(Math.PI*x ) * Math.cos(x*40)

            var capBend = [0,0,0];//capRotation;

            var capWidth = this.genes.flowerWidth * (0.5 + (1 - stemAge))
            var capLength = this.genes.flowerLength  * (0.1 + (1 - stemAge))
            var capRatio = (capWidth / capLength ) * ((1 - stemAge) * 10)
            let hhr = [Util.normRand(-1,1)*Util.PI,Util.normRand(-1,1)*Util.PI,Util.normRand(-1,1)*Util.PI]
            
            var capOpenCurve = (x,op) => {
                  return (x < 0.1) ? 
                1-op*this.curveCoeff3[1]
              : Noise.noise(x,this.curveCoeff3[0])
            }
            // Gill shape
            // wid: (x) =>  (this.genes.stemWidth * 0.8 )/(Util.bean(Util.sigmoid(x*Util.PI*0.144),1)-Util.sigmoid(x*0.85)+flare),//Util.bean(x * (this.genes.sheathWidth + this.genes.stemWidth * stemAge)) + (this.genes.stemWidth * 1) +  this.genes.stemWidth*(Util.pow(Util.sin(x*Util.PI),2)-x*0.5+0.5),
            // CAP*
            if(stemAge > 0.2) {
              var G = this.cap({ctx:lay0,
                xof:x0+P[-1].x+P_[-1].x + capOffset,
                yof:y0+P[-1].y+P_[-1].y,
                // xof:x0+P[-1].x + capOffset,
                // yof:y0+P[-1].y ,
                rot: capRotation,
                // rot:[hhr[0],hhr[1],hhr[2]] ,                
                flo: false,
                vei: [1,4],
                len: this.clamp(capLength, sheathLength + 10, sheathLength + this.genes.innerLength ) ,
                col: this.genes.innerColor,
                // wid: (x) => Util.bean(x / capShapeMask(x)) * (capShape(x)) * (((capWidth + this.genes.stemWidth * 1.9) * stemAge )   ),//, this.genes.stemWidth * 1.7, capWidth * capLength),
                wid: (x) =>  ((( this.genes.stemWidth * 1.3) * stemAge )  )/(Util.bean(Util.sigmoid(capShapeMask(x)*Util.PI*0.116),1)-Util.sigmoid(x*0.94)+0.25 ),//Util.bean(x * (this.genes.sheathWidth + this.genes.stemWidth * stemAge)) + (this.genes.stemWidth * 1) +  this.genes.stemWidth*(Util.pow(Util.sin(x*Util.PI),2)-x*0.5+0.5),
                ben:(x) => ([capOpenCurve(x, stemAge ), 0,0])
              })
            // Skirt

            if (this.genes.sheathLength > 0){
              this.stem({ctx:lay0,
                  xof:x0+P[-1].x + capOffset , 
                  yof:y0+P[-1].y  ,
                  rot: hr,
                  len:sheathLength,//this.clamp(desiredSheathLength, 0, P[-1].y + P[-2].y ),//this.clamp( desiredSheathLength, (this.genes.sheathLength * stemAge) , (this.genes.flowerLength + this.genes.sheathLength) * ( stemAge + 0.5)  ),
                  seg: 18,
                  col: {min:  [60,0.2,0.6,0.7], max: [60,0.2,1,0.9]},
                  // wid:(x) => (this.genes.stemWidth * 1.3 )*(Util.pow(Util.sin(x*Util.PI),1)-x*0.5+0.6),
                  wid: (x) =>  (this.genes.stemWidth * 1.2 )*(Util.sigmoid(Util.sigmoid(x*Util.PI*3),stemAge)-x*0.5+0.6),//Util.bean(x * (this.genes.sheathWidth + this.genes.stemWidth * stemAge)) + (this.genes.stemWidth * 1) +  this.genes.stemWidth*(Util.pow(Util.sin(x*Util.PI),2)-x*0.5+0.5),
                  ben:(x) => [0,0,0] 
              })
          }

            this.genes.leafColor = {min: [Util.normRand(58, 62),Util.normRand(0.3,0.52),Util.normRand(0.8, 0.94),0.8],
                max: [Util.normRand(58, 62),Util.normRand(0.2,0.62),Util.normRand(0.4, 0.6),0.2]}




              this.cap({ctx:lay0,
                xof:x0+ P[-1].x + G[-1].x*0.7+P_[-1].x + capOffset,
                yof:y0+P[-1].y  +P_[-1].y + G[-1].y/2,
                // xof:x0+P[-1].x + capOffset,
                // yof:y0+P[-1].y ,
                rot: hr,
                // rot:[hhr[0],hhr[1],hhr[2]] ,                
                flo: false,
                vei: vei,
                len: this.clamp(capLength, sheathLength + 10, sheathLength + this.genes.flowerLength ) ,
                col: this.genes.flowerColor,
                wid: (x) => Util.bean(x / capShapeMask(x)) * (capShape(x)) * (((capWidth + this.genes.stemWidth * 1.9) * stemAge )   ),//, this.genes.stemWidth * 1.7, capWidth * capLength),
                // wid:(x) => capShape(x) * this.genes.flowerWidth*(Util.sin(Util.cos(x*Util.PI/2),0.9)-Util.cos(x*Util.PI/2)*this.clamp(this.genes.flowerWidth*0.5, 18,30)),
                // ben:(x) => ([-capOpenCurve(x, stemAge*5), -capOpenCurve(x, stemAge * 0.5 ) ,0]),
                ben:(x) => ([0,0,0])
              })
            }




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

      var [L,R] = this.tubify({pts:P,wid:wid})
      var wseg = 18 + Math.floor(seg/2);
      var noiseScale = this.dna.genes.noiseScale ; 
      crot = v3.zero
      for (var i = 1; i < P.length; i++){
        for (var j = 1; j < wseg; j++){
          var m = (j-1)/(wseg-1);
          var n = j/(wseg-1);
          var p = i/(P.length-1)

 
          //Adds shading
          var mCurve = this.curveCoeff4
          var mx = Util.sigmoid( m * mCurve[0], mCurve[1]) * 2.2// * mCurve[0]/Util.PI//* Util.cos(Util.PI/seg) * 0.09 * (0.7 )

          var pcurve = this.curveCoeff3
          var px = Util.sigmoid( p * pcurve[0], pcurve[1]) * (12)//* Util.sin(Util.PI/1*seg) //* Util.mapval(Noise.noise(p*noiseScale, m*noiseScale, n*noiseScale),0.2,0.5,0.2,1) 

          var ncurve = this.curveCoeff3
          var nx = Util.sin( ( n) * ncurve[0], ncurve[1]) //  * Util.cos(Util.PI/px) * 0.1//* (Math.Util.PI/2) 
  

          var colorRotation =  v3.add(crot,v3.scale(ben(p),px))
          var p0 = v3.lerp(L[i-1],R[i-1],m) //- Util.mapval(Noise.noise(p/noiseScale,m*noiseScale,n*noiseScale),0,1,0,mx)
          var p1 = v3.lerp(L[i],R[i],m) //- Util.mapval(Noise.noise(p/noiseScale,m*noiseScale,n*noiseScale),0,1,0,mx)
    
          var p2 = v3.lerp(L[i-1],R[i-1],n)
          var p3 = v3.lerp(L[i],R[i],n)

          var lt = mx/p + nx/p ;

          var h = Util.lerpHue(col.min[0],col.min[0],lt) //* Util.mapval(Noise.noise(px*noiseScale,mx*noiseScale,nx*noiseScale),0,1,0.5,1)
          var s = Util.mapval(lt,0,1.4, (colorRotation.y > 0) ? -colorRotation.y  : col.max[1] - 0.3, col.min[1])//*Util.mapval(Noise.noise(p*noiseScale/190,mx*noiseScale*20,n*noiseScale),0.1,1,0,1)
          var l = Util.mapval(lt,0,1, (colorRotation.y > 0) ? -colorRotation.y  : col.min[2] - (0.33) ,col.max[2])*Util.mapval(Noise.noise(p*noiseScale/190,mx*noiseScale*20,n*noiseScale ),0,1,0.1,1)
          var a = Util.mapval(lt,0,1,col.min[3],col.max[3])


          this.polygon({ctx:ctx,pts:[p0,p1,p3,p2],
            xof:xof,yof:yof,fil:true,str:true,col:Util.hsl(h,s,l,0.9)})

        }

      }
      if(vei[0] != 0) {
      for (var i = 1; i < P.length; i++){
        
        for (var j = 0; j < vei[1]; j++){

          var p =  j/vei[1];
          var colorRotation =  v3.add(crot,v3.scale(ben(p),px))
  

          var p0 = v3.lerp(L[i-1],P[i-1],p)
          var p1 = v3.lerp(L[i],P[i],p)
  
          var q0 = v3.lerp(R[i-1],P[i-1],p)
          var q1 = v3.lerp(R[i],P[i],p)


          this.polygon({ctx:ctx,pts:[p0,p1],
            xof:xof,yof:yof,fil:false,col:Util.hsv(0,0,0,Util.normRand(0.4,0.9))})
          this.polygon({ctx:ctx,pts:[q0,q1],
            xof:xof,yof:yof,fil:false,col:Util.hsv(0,0,0,Util.normRand(0.4,0.9))})
  
        }
      }
      this.stroke({ctx:ctx,pts:P,xof:xof,yof:yof,col:Util.rgba(0,0,0,0.3)})
      }

      this.stroke({ctx:ctx,pts:L,xof:xof,yof:yof,col:Util.rgba(0,0,0,0.5)})
      this.stroke({ctx:ctx,pts:R,xof:xof,yof:yof,col:Util.rgba(0,0,0,0.6)})
      return P
    }

}