class Fungus extends Plant {

    //create a list of mushroom names.
    mushroomNames = []

    plantNames = ["Cap", "Mushroom", "Fungus", "Stool", "Umbrella", "Hat", "Crown", "Stem"] 
    descriptiveAdjectives = ["Fragrant", "dwarf", "giant", "plain", "mysterious", "nervous",  "thoughtless", "spongy", "inky", "toppled", "reaching", "upright"];
    geoAdjectives = ["cave", "hill", "island", "mountain", "ocean", "plain", "river", "sea", "swamp", "heavens", "sky", "cliff"];
    type = "fungus";

    constructor(dna) {
        super(dna);
    }

    generate(args) {
        var args =(this.args != undefined) ? this.args : {};

        var cwid = this.ctx.canvas.width
        var cheight = this.ctx.canvas.height
        var lay0 = Layer.empty(cwid, cheight)
        var lay1 = Layer.empty(cwid, cheight)
        
        var x0 = cwid*0.5;
        var y0 = cheight*0.9; 

        this.genes.branchFork = 0;
        this.genes.branchTwist = 0.01;
        this.genes.branchDepth = 2;
        // this.genes.stemBend =0;
        // this.genes.branchWidth = 1;
        // this.genes.pedicelLength = 0;
        // this.genes.shootLength = 0;
        // this.genes.flowerChance = 0;
        // this.genes.flowerPetal = 0
        // this.genes.stemLength = 0;
        // this.genes.shootCount = 0;
        // this.genes.leafWidth = 0;
        // this.genes.leafChance = 0
        // this.genes.stemCount = 0;
        // this.genes.innerLength = 0;
        // this.genes.flowerLength =0;
        // this.genes.stemWidth =0;
        // this.genes.sheathLength =0;
        // this.genes.leafPosition =0;
        // this.genes.innerWidth =0
        // this.genes.sheathWidth =0
        // this.genes.leafLength =0;
        for (var i = 0; i < Math.floor(this.genes.stemCount * 0.8); i++){
        var PL = branch({
            ctx:lay0,xof:x0 + (normRand(-5,7) *i),yof:y0,
            wid: normRand(this.genes.branchWidth, this.genes.branchWidth * 2.2),
            twi:this.genes.branchTwist,
            dep:this.genes.branchDepth,
            len: (Math.random() * 220) + 50,
            col:{min:[40,0.2,0.43,1],max:[20,0.3,0.6,1]},
            seg: 40,
            frk:this.genes.branchFork,
            })
        
        // leaf({ctx:lay0,
        //   xof:PL[0][1][0].x, yof:PL[0][1][0].y ,    
        //   len: 20,
        //   vei:[0,0],
        //   cof: (x) => (50),
        //   flo: true, 
        //   col:this.genes.branchColor,
        //   ben: (x) => ([0,-20,-20]),
        //   rot:[-10,20,-10], // [normRand(-1,1)*PI,normRand(-1,1)*PI,normRand(-1,1)*0],
        //   wid:(x) => (40)})  
        var r = normRand(-0.25,0.95) 
        var saturationWeight = normRand(0.0, 0.8)
        this.genes.innerColor.min[1] = this.clamp(this.genes.innerColor.min[1] , 0, 1);
        this.genes.innerColor.max[1] = this.clamp(this.genes.innerColor.max[1] + saturationWeight, 0, 1);;

        this.cap({ctx:lay0,
            xof:PL[0][1][-1].x, yof:PL[0][1][-1].y ,
            rot:[0.9,r,r], //[0.9,0.2,0.25],
            seg: 30,
            len: normRand(40, 160),
            col:this.genes.innerColor,// {min:[20,0.29,0.7,1],max:[80,0.4,0.9,1]},
            wid:(x) => (sigmoid(x*PI)*x*normRand(40, 43)+1),
            ben:(x) => ([
                normRand(2.1, 2.7),0,0
                ])})
        
        
        }
        // for (var i = 0; i < PL.length; i++){
            // for (var j = 1; j > 0; j--){
                // console.log(PL[i][1][j].x, PL[i][1][j].y)
                // leaf({ctx:lay0,
                //   xof:PL[i][1][j].x, yof:PL[i][1][j].y - 200,
                //   len: 20,
                //   vei:2,
                //   col:this.genes.branchColor,
                //   rot: [normRand(-1,1)*PI,normRand(-1,1)*PI,normRand(-1,1)*0],
                //   wid:(x) => (205)})                
        
        
        
                // var hr = [normRand(-1,1)*PI,normRand(-1,1)*PI,normRand(-1,1)*0]
        
                // var P_ = stem({ctx:lay0,
                //   xof:PL[i][1][j].x, yof:PL[i][1][j].y ,
                //   rot:hr,
                //   seg: 32,
                //   len:this.genes.pedicelLength,
                //   col:{min:[50,1,0.9,1],max:[50,1,0.9,1]},
                //   wid:(x) => (sin(x*PI)*x*50+1),
                //   ben:(x) => ([
                //       200,0,20
                //      ])})
        
                
        
            // }
        // }

        this.addFilters(lay0,lay1);

        this.position(lay1,lay0, 0, 0, "normal", "normal"); 
        
    }

    cap(args){
        var args =(args != undefined) ? args : {};
        var ctx = (args.ctx != undefined) ? args.ctx : CTX;  
        var xof = (args.xof != undefined) ? args.xof : 0;  
        var yof = (args.yof != undefined) ? args.yof : 0;  
        var rot = (args.rot != undefined) ? args.rot : [PI/2,0,0];
        var len = (args.len != undefined) ? args.len : 400;
        var seg = (args.seg != undefined) ? args.seg : 40;
        var wid = (args.wid != undefined) ? args.wid : (x) => (6);
        var col = (args.col != undefined) ? args.col : 
          {min:[250,0.2,0.4,1],max:[250,0.3,0.6,1]}
        var ben = (args.ben != undefined) ? args.ben : 
          (x) => ([normRand(-10,10),0,normRand(-5,5)])
      
      
        // console.log(xof, yof, rot, len, seg, wid, col, ben)
      
        var disp = [1,2,0]//v3.zero
        var crot = v3.zero
        var P = [disp]
        var ROT = [crot]
      
        var orient = (v) => (v3.roteuler(v,rot));
        // higher squat == shorter caps. lower equals taller caps.
        var squat = normRand(0.5, 1.8);
        var curveCoeff0 = [normRand(-0.5,0.5),normRand(5,10)]
        var curveCoeff1 = [Math.random()*PI, normRand(1,5)]
      
        var curveCoeff2 = [Math.random()*PI,normRand(5,15)]
        var curveCoeff3 = [Math.random()*PI,normRand(1,5)]
        var curveCoeff4 = [Math.random()*0.5,normRand(0.8,1.2)];

        for (var i = 0; i < seg; i++){
          var p = i/(seg-1)
          crot= v3.add(crot,v3.scale(ben(p),1/seg))
          disp = v3.add(disp,orient(v3.roteuler([0,0,len/(seg*squat)],crot)))
          ROT.push(crot);
          P.push(disp);
        }
        //FLIPS 444THE CAP
        P = P.reverse();
        var [L,R] = tubify({pts:P,wid:wid})
        // L = L.reverse()
        // R = R.reverse()
        var wseg = 24;
        var noiseScale = 10;
        for (var i = 1; i < P.length; i++){
          for (var j = 1; j < wseg; j++){
            var m = (j-1)/(wseg-1);
            var n = j/(wseg-1);
            var p = i/(P.length-1)

            //Adds shading
            var mCurve = curveCoeff2
            m = sigmoid( m + mCurve[0], mCurve[1]) * 1
            var pcurve = curveCoeff1;
            p = sigmoid( p * pcurve[0], pcurve[1]) * 0.6

            var p0 = v3.lerp(L[i-1],R[i-1],m)
            var p1 = v3.lerp(L[i],R[i],m)
      
            var p2 = v3.lerp(L[i-1],R[i-1],n)
            var p3 = v3.lerp(L[i],R[i],n)
      
            var lt = n/p
            var h = lerpHue(col.min[0],col.max[0],lt)*mapval(Noise.noise(p*noiseScale,m*noiseScale,n*noiseScale),0,1,0.5,1)
            var s = mapval(lt,0,1,col.max[1],col.min[1])*mapval(Noise.noise(p*noiseScale,m*noiseScale,n*noiseScale),0,1,0.5,1)
            var v = mapval(lt,0,1,col.min[2],col.max[2])*mapval(Noise.noise(p*noiseScale,m*noiseScale,n*noiseScale),0,1,0.5,1)
            var a = 1//mapval(lt,0,1,col.min[3],col.max[3])
      
            polygon({ctx:ctx,pts:[p0,p1,p3,p2],
              xof:xof,yof:yof,fil:true,str:true,col:hsv(h,s,v,a)})
          }
        }
        stroke({ctx:ctx,pts:L,xof:xof,yof:yof,col:rgba(0,0,0,0.5)})
        stroke({ctx:ctx,pts:R,xof:xof,yof:yof,col:rgba(0,0,0,0.5)})
        return P
      }
      
      

    

}