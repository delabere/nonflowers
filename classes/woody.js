class Woody extends Plant {

    plantNames = [ "bindweed", "vine", "creeper", "wisteria", "Jade", "Tassel", "Lilac", "Magnolia", "Olive", "Quince", "Bramble", "Jasmine"];
    descriptiveAdjectives = ["dwarf", "Fragrant", "feathered", "wandering", "adorable", "jealous", "beautiful", "drooping", "drab", "elegant", "fancy", "glamorous", "handsome", "long", "magnificent", "old-fashioned", "plain", "quaint", "sparkling", "water",  "unsightly", "wide-eyed", "angry", "bewildered", "clumsy", "embarrassed", "fierce", "helpless", "itchy", "jealous", "hopeless", "lazy", "mysterious", "nervous",  "thoughtless", "thorny", "thornless", "upright"];
    geoAdjectives = ["cave", "hill", "mountain", "ocean", "plain", "river", "sea", "swamp", "heavens", "sky", "cliff"];
    type = "woody";

    constructor(dna) {
        super(dna);
    }

    generate(args){
        var args =(this.args != undefined) ? this.args : {};
      
        var cwid = this.ctx.canvas.width
        var cheight = this.ctx.canvas.height
        var lay0 = Layer.empty(cwid, cheight)
        var lay1 = Layer.empty(cwid, cheight)
        var x0 = cwid*0.5
        var y0 = cheight*0.99
             
        var PL = branch({
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
                  len:this.genes.leafLength *normRand(0.8,1.2),
                  vei:this.genes.leafType,
                  col:this.genes.leafColor,
                  rot:[normRand(-1,1)*PI,normRand(-1,1)*PI,normRand(-1,1)*0],
                  wid:(x) => (this.genes.leafShape(x)*this.genes.leafWidth),
                  ben:(x) => ([
                    mapval(Noise.noise(x*1,i),0,1,-1,1)*5,
                    0,
                    mapval(Noise.noise(x*1,i+PI),0,1,-1,1)*5
                   ])})                
              }
      
      
              if (Math.random() < this.genes.flowerChance){
      
                var hr = [normRand(-1,1)*PI,normRand(-1,1)*PI,normRand(-1,1)*0]
      
                var P_ = stem({ctx:lay0,
                  xof:PL[i][1][j].x, yof:PL[i][1][j].y,
                  rot:hr,
                  len:this.genes.pedicelLength,
                  col:{min:[50,1,0.9,1],max:[50,1,0.9,1]},
                  wid:(x) => (sin(x*PI)*x*2+1),
                  ben:(x) => ([
                      0,0,0
                     ])})
      
                var op = Math.random()
                
                var r = grot(P_,-1)
                var hhr = r
                for (var k = 0; k < this.genes.flowerPetal; k++){
      
                  this.leaf({ctx:lay1,flo:true,
                    xof:PL[i][1][j].x+P_[-1].x, yof:PL[i][1][j].y+P_[-1].y,
                    rot:[hhr[0],hhr[1],hhr[2]+k/this.genes.flowerPetal*PI*2],
                    len:this.genes.flowerLength *normRand(0.7,1.3),
                    wid:(x) => ( this.genes.flowerShape(x)*this.genes.flowerWidth ),
                    vei:[0],
                    col:this.genes.flowerColor,
                    cof:this.genes.flowerColorCurve,
                    ben:(x) => ([
                      this.genes.flowerOpenCurve(x,op),
                      0,
                      0,
                     ])
                   })
      
                  this.leaf({ctx:lay1,flo:true,
                    xof:PL[i][1][j].x+P_[-1].x, yof:PL[i][1][j].y+P_[-1].y,
                    rot:[hhr[0],hhr[1],hhr[2]+k/this.genes.flowerPetal*PI*2],
                    len:this.genes.innerLength *normRand(0.8,1.2),
                    wid:(x) => ( sin(x*PI)*4 ),
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
        
        this.addFilters(lay0,lay1);

        this.position(lay0,lay1, 0, 0);     
      }

}
