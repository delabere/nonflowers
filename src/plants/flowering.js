import {Plant} from './plants.js';
import {Layer} from './../app/layer.js';
import {Noise} from './../app/noise.js';
import {Util} from './../app/util.js';
import {ColorRangeDescriptor} from './../app/colorRangeDescriptor.js';

export class Flowering extends Plant {

    grammar = {
        "name":["#commonName.capitalizeAll#"],
        "plantName": ["Poppy", "Dahlia", "Flower", "Petal", "Iris", "Jade", "Tassel", "Lilac", "Magnolia", "Narcissus", "Quince", "Rose", "Sunflower", "Tulip", "Umbrella", "Violet", "Willow", "Lily", "Bell" ],
        "location": ["cave", "hill", "mountain", "ocean", "plain", "river", "sea", "moon", "sun", "star", "swamp", "heavens", "sky", "cliff"],
        "gender": ["man", "lady"],
        "mood": ["Tasteless", "Dwarf", "Fragrant", "wandering", "adorable", "jealous", "beautiful", "drooping", "drab", "elegant", "fancy", "glamorous", "handsome", "long", "magnificent", "old-fashioned", "plain", "quaint", "sparkling", "water",  "unsightly", "wide-eyed", "angry", "bewildered", "clumsy", "embarrassed", "fierce", "helpless", "itchy", "jealous", "hopeless", "lazy", "mysterious", "nervous",  "thoughtless", "thorny", "thornless", "upright"],
        "commonName": ["#mood# #plantName#", "#mood# #location# #plantName#", "#mood# #plantName# of the #location#"]
    };

    type = "flowering";

    constructor(options) {
        super(options);
    }

    get description() {
        return {
            flowers: new ColorRangeDescriptor(this.dna.flowerColors),
            stems: new ColorRangeDescriptor(this.dna.branchColors),
            leaves: new ColorRangeDescriptor(this.dna.leafColors),
        }
    }

    generate(args) {
        args =(this.args != undefined) ? this.args : {};

        let lay0 = new Layer(this.width, this.height)
        let lay1 = new Layer(this.width, this.height)
        this.layers.push(lay0, lay1)

        // start drawing at
        let x0 = this.width*0.5;
        let y0 = this.height*0.8; 

        let saturation = (x, bump) => { x[1] = this.clamp(x[1] + bump, 0,1); return x};
        let flowerColorCopy = Util.deepClone(this.genes.flowerColor);

        for (var i = 0; i < this.genes.stemCount; i++){

            // Stems

            let r = [Util.PI/2,0,Util.normRand(-1,1)*Util.PI]
            let P = this.stem({
                ctx:lay0,xof:x0,yof:y0,
                len:this.genes.stemLength*Util.normRand(0.7,1.3),
                rot:r,
                wid:(x) => (this.genes.stemWidth*
                    (Util.pow(Util.sin(x*Util.PI/2+Math.PI/2),0.5)*Noise.noise(x*10)*0.5+0.5)),
                ben:(x) => ([
                    Util.mapval(Noise.noise(x*1,i),0,1,-1,1)*x*this.genes.stemBend,
                    0,
                    Util.mapval(Noise.noise(x*1,i+Math.PI),0,1,-1,1)*x*this.genes.stemBend,
                    ]
                )})
            
        
            // Leaves

            if (this.genes.leafPosition == 2){
                for (let j = 0; j < P.length; j++) {
                    if (Math.random() < this.genes.leafChance*2){
                        this.leaf({ctx:lay0,
                            xof:x0+P[j].x, yof:y0+P[j].y,
                            len:2*this.genes.leafLength *Util.normRand(0.8,1.2),
                            vei:this.genes.leafType,
                            col:this.genes.leafColor,
                            rot:[Util.normRand(-1,1)*Util.PI,Util.normRand(-1,1)*Util.PI,Util.normRand(-1,1)*0],
                            wid:(x) => (2*this.genes.leafShape(x)*this.genes.leafWidth),
                            ben:(x) => ([
                            Util.mapval(Noise.noise(x*1,i),0,1,-1,1)*5,
                            0,
                            Util.mapval(Noise.noise(x*1,i+Util.PI),0,1,-1,1)*5
                            ])})                
                    }
                }      
            }
        

            // Sheath
        
            let hr = Util.grot(P,-1)
            if (this.genes.sheathLength != 0){
                this.stem({ctx:lay0,
                    xof:x0+P[-1].x,
                    yof:y0+P[-1].y,
                    rot:hr,
                    len:this.genes.sheathLength,
                    col:{min:[60,0.3,0.9,1],max:[60,0.3,0.9,1]},
                    wid:(x) => this.genes.sheathWidth*(Util.pow(Util.sin(x*Util.PI),2)-x*0.5+0.5),
                    ben:(x) => ([0,0,0])
                })
            }

            // Shoots 

            for (let j = 0; j < Math.max(1,this.genes.shootCount*Util.normRand(0.5,1.5)); j++){

                let P_ = this.stem({ctx:lay0,
                    xof:x0+P[-1].x,
                    yof:y0+P[-1].y,
                    rot:hr,
                    len:this.genes.shootLength*Util.normRand(0.5,1.5),
                    col:{min:[70,0.2,0.9,1],max:[70,0.2,0.9,1]},
                    wid:(x) => (2),
                    ben:(x) => ([
                        Util.mapval(Noise.noise(x*1,j),0,1,-1,1)*x*10,
                        0,
                        Util.mapval(Noise.noise(x*1,j+Util.PI),0,1,-1,1)*x*10
                    ])})

                let op = Math.random()
                let hhr = [Util.normRand(-1,1)*Util.PI,Util.normRand(-1,1)*Util.PI,Util.normRand(-1,1)*Util.PI]

                // Flowers

                for (let k = 0; k < this.genes.flowerPetal; k++){
                    
                    this.leaf({ctx:lay1,
                        flo:true,
                        xof:x0+P[-1].x+P_[-1].x, yof:y0+P[-1].y+P_[-1].y,
                        rot:[hhr[0],hhr[1],hhr[2]+k/this.genes.flowerPetal*Util.PI*2],
                        len:this.genes.flowerLength *Util.normRand(0.7,1.3)*1.5,
                        wid:(x) => ( 1.5*this.genes.flowerShape(x)*this.genes.flowerWidth ),
                        vei:[0],
                        col: Object.keys(flowerColorCopy).reduce((result, k) => {  result[k] = saturation(flowerColorCopy[k], (0.019 / this.genes.stemCount)); return result}, {}) ,
                        cof:this.genes.flowerColorCurve,
                        ben:(x) => ([
                            this.genes.flowerOpenCurve(x,op),
                            0,
                            0,
                    ])})
            
                    this.leaf({ctx:lay1,
                        flo:true,
                        xof:x0+P[-1].x+P_[-1].x, yof:y0+P[-1].y+P_[-1].y,
                        rot:[hhr[0],hhr[1],hhr[2]+k/this.genes.flowerPetal*Util.PI*2],
                        len:this.genes.innerLength *Util.normRand(0.8,1.2),
                        wid:(x) => ( Util.sin(x*Util.PI)*4 ),
                        vei:[0],
                        col:this.genes.innerColor,
                        cof:(x) => (x),
                        ben:(x) => (
                            [this.genes.flowerOpenCurve(x,op),0,0]
                    )})
                }
            }
        
        }

        if (this.genes.leafPosition == 1){
            for (let i = 0; i < this.genes.leafChance*100; i++){
                this.leaf({ctx:lay0,
                    xof:x0,yof:y0,rot:[Util.PI/3,0,Util.normRand(-1,1)*Util.PI],
                    len: 4*this.genes.leafLength *Util.normRand(0.8,1.2),
                    wid:(x) => (2*this.genes.leafShape(x)*this.genes.leafWidth),
                    vei:this.genes.leafType,
                    ben:(x) => ([
                        Util.mapval(Noise.noise(x*1,i),0,1,-1,1)*10,
                        0,
                        Util.mapval(Noise.noise(x*1,i+Util.PI),0,1,-1,1)*10]
                    )})
            }
        }
        

        this.draw();
        

    }
}