import { Noise } from './app/noise.js';
import { Util } from './app/util.js';
import { Color } from './app/color.js';

export class DNA {

    constructor(genes) {
        var PAR = {}
        if(typeof(genes) == "undefined" || genes.seed == null) {
          this.seed = DNA.newSeed(); 
        }else if( typeof(genes.seed) !== "undefined" && genes.seed !== null)  { 
          console.log('seed from genes', genes.seed)
          this.seed = genes.seed.toString();
        }
        // Seed the random number generator with the seed
        PAR.seed = Math.seed(this.seed);
        // PAR.seed = Number(this.seed);
        var randint = (x,y) => (Math.floor(Util.normRand(x,y)))
        
      

        const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
 
        PAR.capShapeMaskCoeff = 2
        PAR.flowerShapeMaskCoeff = 0.2;
        PAR.leafShapeMaskCoeff = 0.5;
        PAR.flowerShapeMask = (x) => ( Util.pow(Util.sin(Util.PI*x),this.genes.flowerShapeMaskCoeff))
        PAR.leafShapeMask = (x) => (Util.pow(Util.sin(Util.PI*x),this.genes.leafShapeMaskCoeff))
        PAR.flowerChance = Util.randChoice([Util.normRand(0,0.08),Util.normRand(0,0.03)])
        PAR.leafChance = Util.randChoice([0, Util.normRand(0,0.1), Util.normRand(0,0.1)])
        PAR.leafType = Util.randChoice([
          [1,randint(2,5)],
          [2,randint(3,7),randint(3,8)],
          [2,randint(3,7),randint(3,8)],
        ])
        PAR.noiseScale = 100; //10
        PAR.flowerShapeNoiseSeed = Math.random()*Util.PI
        PAR.flowerJaggedness = Util.normRand(0.5,8) * PAR.noiseScale;
        PAR.flowerShape = (x) => (Noise.noise(x*this.genes.flowerJaggedness,this.genes.flowerShapeNoiseSeed)*this.genes.flowerShapeMask(x))
      
      
        var leafShapeNoiseSeed = Math.random()*Util.PI
        PAR.leafJaggedness = Util.normRand(0.1,40)
        PAR.leafPointyness = Util.normRand(0.5,1.5)
        PAR.leafShape = Util.randChoice([
          (x) => (Noise.noise(x*this.genes.leafJaggedness,this.genes.flowerShapeNoiseSeed)*this.genes.leafShapeMask(x)),
          (x) => (Util.pow(Util.sin(Util.PI*x),this.genes.leafPointyness))
        ])
      
        var flowerHue0 = (Util.normRand(0,180)-130+360)%360
        var flowerHue1 = Math.floor((flowerHue0 + Util.normRand(-70,70) + 360)%360)
        var flowerValue0 = Math.min(1,Util.normRand(0.5,1.3))
        var flowerValue1 = Math.min(1,Util.normRand(0.5,1.3))
        var flowerSaturation0 = Util.normRand(0,1.1-flowerValue0)
        var flowerSaturation1 = Util.normRand(0,1.1-flowerValue1)
      
        PAR.flowerColor = {min:[flowerHue0,flowerSaturation0,flowerValue0,Util.normRand(0.8,1)],
                           max:[flowerHue1,flowerSaturation1,flowerValue1,Util.normRand(0.5,1)]}


        var saturationWeight = 0.2;

        PAR.flowerColor.min[1] = clamp(PAR.flowerColor.min[1] + saturationWeight, 0, 1);
        PAR.flowerColor.max[1] = clamp(PAR.flowerColor.max[1] + saturationWeight, 0, 1);;

        PAR.leafColor = {min:[Util.normRand(10,200),Util.normRand(0.05,0.4),Util.normRand(0.3,0.7),Util.normRand(0.8,1)],
                         max:[Util.normRand(10,200),Util.normRand(0.05,0.4),Util.normRand(0.3,0.7),Util.normRand(0.8,1)]}
      

        
        var curveCoeff0 = [Util.normRand(-0.5,0.5),Util.normRand(5,10)]
        var curveCoeff1 = [Math.random()*Util.PI, Util.normRand(1,5)]
      
        var curveCoeff2 = [Math.random()*Util.PI,Util.normRand(5,15)]
        var curveCoeff3 = [Math.random()*Util.PI,Util.normRand(1,5)]
        var curveCoeff4 = [Math.random()*0.5,Util.normRand(0.8,1.2)]
      
        PAR.flowerOpenCurve = Util.randChoice([
          (x,op) => (
            (x < 0.1) ? 
              2+op*curveCoeff2[1]
            : Noise.noise(x*10,curveCoeff2[0])),
          (x,op) => (
            (x < curveCoeff4[0]) ? 0 : 10-x*Util.mapval(op,0,1,16,20)*curveCoeff4[1]
          )
        ])
       
        PAR.flowerColorCurve = Util.randChoice([
            (x)=>(Util.sigmoid(x+curveCoeff4[0],curveCoeff4[1])),
            // (x)=>(Noise.noise(x*curveCoeff1[1],curveCoeff1[0])) // this results in see-through
        ])
        // PAR.flowerColorCurve =
        // All calls to random impact the seed of the noise function. To keep the randomness consistent, when 
        // overriding parameters make sure to keep the original call in place and then overwite the variable
        // with the desired parameter on the following line. 
        // 
        // For example, if you wanted to change the leaf shape, you would need to keep the original call to
        //
        // PAR.leafPosition = Util.randChoice([1,2]) // Keep this line to keep the randomness consistent
        // PAR.leafPosition = 2 // This is the new call

        PAR.flowerLength = Util.normRand(5,55) //* (0.1-PAR.flowerChance)*10
        PAR.flowerWidth = Util.normRand(5,30) 
        PAR.flowerPetal = Math.round(Util.mapval(PAR.flowerWidth,5,50,10,3))

        PAR.pedicelLength = Util.normRand(5,30)
      
        PAR.stemWidth = Util.normRand(2,11)
        PAR.stemBend = Util.normRand(2,16)
        PAR.stemLength = Util.normRand(300,400)
        PAR.stemCount = Util.randChoice([2,3,4,5])
      
        PAR.sheathLength = Util.randChoice([0,Util.normRand(50,100)])
        PAR.sheathWidth = Util.normRand(5,15)
        
        PAR.shootCount = Util.normRand(1,7)
        PAR.shootLength = Util.normRand(50,180)

        PAR.leafPosition = Util.randChoice([1,2])
        PAR.leafLength = Util.normRand(30,100)
        PAR.leafWidth = Util.normRand(5,30)

        PAR.innerLength = Math.min(Util.normRand(0,20),PAR.flowerLength*0.8)

        PAR.innerWidth = Math.min(Util.randChoice([0,Util.normRand(1,8)]),PAR.flowerWidth*0.8)
        PAR.innerShape = (x) => (Util.pow(Util.sin(Util.PI*x),1))
        var innerHue = Util.normRand(0,60)
        PAR.innerColor = {min:[innerHue,Util.normRand(0.1,0.7),Util.normRand(0.5,0.9),Util.normRand(0.8,1)],
                          max:[innerHue,Util.normRand(0.1,0.7),Util.normRand(0.5,0.9),Util.normRand(0.5,1)]}
        

        PAR.branchWidth = Util.normRand(0.4,1.3)

        PAR.branchTwist = Math.round(Util.normRand(2,5))
        PAR.branchDepth = Util.randChoice([3,4])
        PAR.branchFork = Util.randChoice([4,5,6,7])
      
        var branchHue = Util.normRand(30,60)
        var branchSaturation = Util.normRand(0.05,0.3)
        var branchValue = Util.normRand(0.7,0.9)

        PAR.branchColor = {min:[branchHue,branchSaturation,branchValue,1],
                           max:[branchHue,branchSaturation,branchValue,1]}

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
      let seed = Math.seedrandom((""+(new Date()).getTime()))
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
        return Color.fromHSLA(col);
    }





}