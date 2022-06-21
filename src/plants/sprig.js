import {Plant} from './plants.js';
import {Layer} from './../app/layer.js';
import {Noise} from './../app/noise.js';
import {Util} from './../app/util.js';

export class Sprig extends Plant {

    type = "sprig";

    constructor(dna) {
        super(dna);
    }

    generate(args){
        var args =(args != undefined) ? args : {};
        var ctx = (args.ctx != undefined) ? args.ctx : CTX;  
        var xof = (args.xof != undefined) ? args.xof : 0;  
        var yof = (args.yof != undefined) ? args.yof : 0;  
        var PAR = (args.PAR != undefined) ? args.PAR : genParams();
      
        var cwid = 1200
        var lay0 = new Layer(cwid)
        var lay1 = new Layer(cwid)
      
        PAR.branchFork = 0.0
        PAR.branchTwist = 0.01
        PAR.branchDepth = 0.01
        var PL = branch({
          ctx:lay0,xof:cwid*0.5,yof:cwid*0.7,
          wid:PAR.branchWidth,
          twi:PAR.branchTwist,
          dep:PAR.branchDepth,
          col:PAR.branchColor,
          frk:PAR.branchFork,
         })
      
        for (var i = 0; i < PL.length; i++){
            for (var j = 0; j < PL[i][1].length; j++){
                leaf({ctx:lay0,
                  xof:PL[i][1][j].x, yof:PL[i][1][j].y,
                  len:PAR.leafLength *normRand(0.8,1.2),
                  vei:PAR.leafType,
                  col:PAR.leafColor,
                  rot:[normRand(-1,1)*PI,normRand(-1,1)*PI,normRand(-1,1)*0],
                  wid:(x) => (PAR.leafShape(x)*PAR.leafWidth),
                  ben:(x) => ([
                    mapval(Noise.noise(x*1,i),0,1,-1,1)*5,
                    0,
                    mapval(Noise.noise(x*1,i+PI),0,1,-1,1)*5
                   ])})                
      
      
              if (Math.random() < PAR.flowerChance){
      
                var hr = [normRand(-1,1)*PI,normRand(-1,1)*PI,normRand(-1,1)*0]
      
                var P_ = stem({ctx:lay0,
                  xof:PL[i][1][j].x, yof:PL[i][1][j].y,
                  rot:hr,
                  len:PAR.pedicelLength,
                  col:{min:[50,1,0.9,1],max:[50,1,0.9,1]},
                  wid:(x) => (sin(x*PI)*x*2+1),
                  ben:(x) => ([
                      0,0,0
                     ])})
      
                
      
              }
            }
        }
      
      
        this.draw();      
      }
}