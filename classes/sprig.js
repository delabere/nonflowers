class Sprig extends Plant {

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
        var lay0 = Layer.empty(cwid)
        var lay1 = Layer.empty(cwid)
      
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
      
        doFilters(lay0,lay1);
      
        var b1 = Layer.boundingBox(lay0)
        var b2 = Layer.boundingBox(lay1)
        var bd = {
          xmin:Math.min(b1.xmin,b2.xmin),
          xmax:Math.max(b1.xmax,b2.xmax),
          ymin:Math.min(b1.ymin,b2.ymin),
          ymax:Math.max(b1.ymax,b2.ymax)
        }
        var xref = xof-(bd.xmin+bd.xmax)/2
        var yref = yof-bd.ymax
        Layer.blit(ctx,lay0,{ble:"multiply",xof:xref,yof:yref})
        Layer.blit(ctx,lay1,{ble:"normal",xof:xref,yof:yref})
      
      }
}