import {Plant} from './plants.js';
import {Layer} from './../app/layer.js';
import {Noise} from './../app/noise.js';
import { Util } from '../app/util.js';

export class Woody extends Plant {

    type = "woody";
    grammar = {
      "name":["#commonName.capitalizeAll#"],
      "plantName": [ "bindweed", "vine", "creeper", "wisteria", "Jade", "Tassel", "Lilac", "Magnolia", "Olive", "Quince", "Bramble", "Jasmine"],
      "location": ["cave", "hill", "mountain", "ocean", "plain", "river", "sea", "swamp", "heavens", "sky", "cliff"],
      "gender": ["man", "lady"],
      "mood": ["dwarf", "Fragrant", "feathered", "wandering", "adorable", "jealous", "beautiful", "drooping", "drab", "elegant", "fancy", "glamorous", "handsome", "long", "magnificent", "old-fashioned", "plain", "quaint", "sparkling", "water",  "unsightly", "wide-eyed", "angry", "bewildered", "clumsy", "embarrassed", "fierce", "helpless", "itchy", "jealous", "hopeless", "lazy", "mysterious", "nervous",  "thoughtless", "thorny", "thornless", "upright"],
      "commonName": ["#mood# #plantName#", "#mood# #location# #plantName#", "#mood# #plantName# of the #location#"]
    };

    constructor(dna) {
        super(dna);
    }

    generate(args){
        var args =(this.args != undefined) ? this.args : {};
      
        var cwid = this.ctx.canvas.width
        var cheight = this.ctx.canvas.height
        var lay0 = new Layer(cwid, cheight)
        var lay1 = new Layer(cwid, cheight)
        this.layers.push(lay0,lay1)
        var x0 = cwid*0.5
        var y0 = cheight*0.99

        let saturation = (x, bump) => { x[1] = this.clamp(x[1] + bump, 0,1); return x};
        let flowerColorCopy = Util.deepClone(this.genes.flowerColor); 

        var PL = this.branch({
          ctx:lay0,xof:x0,yof:y0,
          wid:this.genes.branchWidth,
          twi:this.genes.branchTwist,
          dep:this.genes.branchDepth,
          col:this.genes.branchColor,
          frk:this.genes.branchFork,
         })
      
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
                   ])})                
              }
      
      
              if (Math.random() < this.genes.flowerChance){
      
                var hr = [Util.normRand(-1,1)*Util.PI,Util.normRand(-1,1)*Util.PI,Util.normRand(-1,1)*0]
      
                var P_ = this.stem({ctx:lay0,
                  xof:PL[i][1][j].x, yof:PL[i][1][j].y,
                  rot:hr,
                  len:this.genes.pedicelLength,
                  col:{min:[50,1,0.9,1],max:[50,1,0.9,1]},
                  wid:(x) => (Util.sin(x*Util.PI)*x*2+1),
                  ben:(x) => ([
                      0,0,0
                     ])})
      
                var op = Math.random()
                
                var r = Util.grot(P_,-1)
                var hhr = r
                for (var k = 0; k < this.genes.flowerPetal; k++){
      
                  this.leaf({ctx:lay1,flo:true,
                    xof:PL[i][1][j].x+P_[-1].x, yof:PL[i][1][j].y+P_[-1].y,
                    rot:[hhr[0],hhr[1],hhr[2]+k/this.genes.flowerPetal*Util.PI*2],
                    len:this.genes.flowerLength *Util.normRand(0.7,1.3),
                    wid:(x) => ( this.genes.flowerShape(x)*this.genes.flowerWidth ),
                    vei:[0],
                    col: Object.keys(flowerColorCopy).reduce((result, k) => {  result[k] = saturation(flowerColorCopy[k], (0.003 / (i / this.genes.stemCount))); return result}, {}) ,
                    cof:this.genes.flowerColorCurve,
                    ben:(x) => ([
                      this.genes.flowerOpenCurve(x,op),
                      0,
                      0,
                     ])
                   })
      
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
                     ])})
      
                }
              }
            }
          }
        }
        this.draw();      
      }

}
