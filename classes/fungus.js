class Fungus extends Plant {

    //create a list of mushroom names.
    mushroomNames = []

    plantNames = ["Cap", "Fingers", "Mushroom", "Fungus", "Stool", "Umbrella", "Hat", "Crown", "Stem"] 
    // stinky man fingers
    descriptiveAdjectives = ["foul", "Fragrant", "dwarf", "giant", "plain", "mysterious", "nervous",  "thoughtless", "stinky", "spongy", "inky", "toppled", "reaching", "upright"];
    geoAdjectives = ["cave","man", "hill", "island", "mountain", "ocean", "plain", "river", "sea", "swamp", "heavens", "sky", "cliff"];
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
        var lay0 = Layer.empty(cwid, cheight)
        var lay1 = Layer.empty(cwid, cheight)
        
        var x0 = cwid*0.5;
        var y0 = cheight*0.9; 

        // ideal stem color
        this.genes.branchColor = {min: [normRand(50.63842005726726, 56),normRand(0.2,0.32),normRand(0.26011155920859, 0.34),0.999],
          max: [normRand(58.63842005726724, 62),normRand(0.4, 0.7),normRand(0.86011155920859, 0.99),0.999]}
  
        for (var i = 0; i < Math.floor(this.genes.stemCount ); i++){
            var r = [PI/2,0,normRand(-1,1)*PI]
            var capOffset =  normRand(-40,50);

            // STEM
            var P = this.stem({
                ctx:lay0,xof:x0 + capOffset,yof:y0,
                len:this.genes.stemLength * normRand(0.002, 1.2) + 40,
                rot:r,
                seg: 30,
                col: this.genes.branchColor,
                wid:(x) => (this.genes.stemWidth*
                    (pow(sin(x*PI/2+PI/2),0.5)*Noise.noise(x*120)*1.2+0.9)),
                ben:(x) => ([
                    (mapval(Noise.noise(x*1,i),0,1,-1,1)*x* this.genes.stemBend) * normRand(0.2, 0.8) , 
                    0,
                    mapval(Noise.noise(x*1,i+PI),0,1,-1,1)*x*this.genes.stemBend,
                    ]
                )})
            
            var saturationWeight = normRand(0.0, 0.1)
            this.genes.innerColor.min[1] = this.clamp(this.genes.innerColor.min[1] , 0, 1);
            this.genes.innerColor.max[1] = this.clamp(this.genes.innerColor.max[1] + saturationWeight, 0, 1);;
            var hr = grot(P,-1)
            var capShape = (x) => (sigmoid(x,0.2)*this.genes.capShapeMask(x))

            // CAP
            this.cap({ctx:lay0,xof:x0+P[-1].x + capOffset,yof:y0+P[-1].y,
              rot:hr,
              len:this.genes.flowerLength*normRand(0.2, 1.2) + 70,
              col:this.genes.innerColor,// {min:[20,0.29,0.7,1],max:[80,0.4,0.9,1]},               
              wid:(x) => capShape(x) * this.genes.flowerWidth*(sin(cos(x*PI/2),0.9)-cos(x*PI/2)*this.clamp(this.genes.flowerWidth*0.5, 18,30)),
              ben:(x) => ([normRand(0, 0.2),normRand(0, 0.2),0]
                  )})

        }


        


        this.addFilters(lay0,lay1);

        this.position(lay0,lay1, 0, 0, "normal", "normal"); 
        // this.position(lay1,lay1, 0, 0, "normal", "overlay"); 
        // this.position(lay0,lay1, 0, 0, "destination-over", "normal"); 
        
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
      var [L,R] = tubify({pts:P,wid:wid})
      var wseg = 18 + Math.floor(seg/2) // Math.abs(this.dna.genes.flowerWidth/normRand(2,3)).toFixed(0);
      var noiseScale = this.dna.genes.noiseScale ; 
      for (var i = 1; i < P.length; i++){
        for (var j = 1; j < wseg; j++){
          var m = (j-1)/(wseg-1);
          var n = j/(wseg-1);
          var p = i/(P.length-1)
          // var pcurve = this.curveCoeff2;
          // p = sigmoid( (j*p) * pcurve[0], pcurve[1]) * 0.4
          // var mCurve = this.curveCoeff2
          // m = sigmoid( ( m) * mCurve[0], mCurve[1]) * 0.7
 
            //Adds shading
          var mCurve = this.curveCoeff4
          var mx = sigmoid( m * mCurve[0], mCurve[1]) * 2.2// * mCurve[0]/PI//* cos(PI/seg) * 0.09 * (0.7 )

          var pcurve = this.curveCoeff0
          var px = sigmoid( p * pcurve[0], pcurve[1]) * sin(PI/1*seg) //* mapval(Noise.noise(p*noiseScale, m*noiseScale, n*noiseScale),0.2,0.5,0.2,1) 

          var ncurve = this.curveCoeff2
          var nx = sin( ( n) * ncurve[0], ncurve[1]) //  * cos(PI/px) * 0.1//* (Math.PI/2) 
  
  
          var p0 = v3.lerp(L[i-1],R[i-1],m) //- mapval(Noise.noise(p/noiseScale,m*noiseScale,n*noiseScale),0,1,0,mx)
          var p1 = v3.lerp(L[i],R[i],m) //- mapval(Noise.noise(p/noiseScale,m*noiseScale,n*noiseScale),0,1,0,mx)
    
          var p2 = v3.lerp(L[i-1],R[i-1],n)
          var p3 = v3.lerp(L[i],R[i],n)

          var pp0 = v3.lerp(L[i-1],R[i-1],m)
          var pp1 = v3.lerp(L[i],R[i],m)
    
          var pp2 = v3.lerp(L[i-1],R[i-1],n)
          var pp3 = v3.lerp(L[i],R[i],n) 

          var lt = sin((nx/p) * PI/2) * 0.5 + 0.1 

          var h = lerpHue(col.min[0],col.max[0],lt) *mapval(Noise.noise(cos(p/noiseScale) * PI/2 * 0.5 + 0.5,m*noiseScale,n*noiseScale),0,1,0,1)
          var s = mapval(lt,0,1,col.max[1],col.min[1])// *mapval(Noise.noise(p*noiseScale,m*noiseScale,n*noiseScale),0,1,0,1)
          var v = mapval(lt,0,1,col.min[2],col.max[2])// *mapval(Noise.noise(p*noiseScale,m*noiseScale,n*noiseScale),0,1,0,1)
          var a = mapval(lt,0.8,1,col.min[3],col.max[3])

          // console.log(col.min[0], col.max[0], h, lt, this.dna.color([h,s,v,a]).humanName)

          polygon({ctx:ctx,pts:[p0,p1,p3,p2],
            xof:xof,yof:yof,fil:true,str:true,col:hsv(this.clamp(h,0, 359),this.clamp(s*0.8, 0,1),v,1)})
          // polygon({ctx:ctx,pts:[pp1,pp1,pp3,pp2],
            // xof:xof,yof:yof,fil:true,str:false,col:hsv(h,s,v,0.8)}) 
        }
      }
      stroke({ctx:ctx,pts:L,xof:xof,yof:yof,col:rgba(0,0,0,0.5)})
      stroke({ctx:ctx,pts:R,xof:xof,yof:yof,col:rgba(0,0,0,0.6)})
      return P
    }
      
      

    

}