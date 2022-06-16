class Flowering extends Plant {

    plantNames = ["Poppy", "Dahlia", "Flower", "Petal", "Iris", "Jade", "Kale", "Tassel", "Lilac", "Magnolia", "Narcissus", "Quince", "Rose", "Sunflower", "Tulip", "Umbrella", "Violet", "Willow", "Lily", "Bell" ];
    descriptiveAdjectives = ["Dwarf", "Fragrant", "wandering", "adorable", "jealous", "beautiful", "drooping", "drab", "elegant", "fancy", "glamorous", "handsome", "long", "magnificent", "old-fashioned", "plain", "quaint", "sparkling", "water",  "unsightly", "wide-eyed", "angry", "bewildered", "clumsy", "embarrassed", "fierce", "helpless", "itchy", "jealous", "hopeless", "lazy", "mysterious", "nervous",  "thoughtless", "thorny", "thornless", "upright"];
    geoAdjectives = ["cave", "hill", "mountain", "ocean", "plain", "river", "sea", "moon", "sun", "star", "swamp", "heavens", "sky", "cliff"];
    type = "flowering";

    constructor(dna) {
        super(dna);
    }

    get description() {

        return {
            flowers: new ColorRangeDescriptor(this.dna.flowerColors),
            stems: new ColorRangeDescriptor(this.dna.branchColors),
            leaves: new ColorRangeDescriptor(this.dna.leafColors),
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
            
        for (var i = 0; i < this.genes.stemCount; i++){
            var r = [PI/2,0,normRand(-1,1)*PI]
            var P = stem({
                ctx:lay0,xof:x0,yof:y0,
                len:this.genes.stemLength*normRand(0.7,1.3),
                rot:r,
                wid:(x) => (this.genes.stemWidth*
                    (pow(sin(x*PI/2+PI/2),0.5)*Noise.noise(x*10)*0.5+0.5)),
                ben:(x) => ([
                    mapval(Noise.noise(x*1,i),0,1,-1,1)*x*this.genes.stemBend,
                    0,
                    mapval(Noise.noise(x*1,i+PI),0,1,-1,1)*x*this.genes.stemBend,
                    ]
                )})
            
        
            if (this.genes.leafPosition == 2){
            for (var j = 0; j < P.length; j++)
                if (Math.random() < this.genes.leafChance*2){
                leaf({ctx:lay0,
                    xof:x0+P[j].x, yof:y0+P[j].y,
                    len:2*this.genes.leafLength *normRand(0.8,1.2),
                    vei:this.genes.leafType,
                    col:this.genes.leafColor,
                    rot:[normRand(-1,1)*PI,normRand(-1,1)*PI,normRand(-1,1)*0],
                    wid:(x) => (2*this.genes.leafShape(x)*this.genes.leafWidth),
                    ben:(x) => ([
                    mapval(Noise.noise(x*1,i),0,1,-1,1)*5,
                    0,
                    mapval(Noise.noise(x*1,i+PI),0,1,-1,1)*5
                    ])})                
                }      
            }
        
        
            var hr = grot(P,-1)
            if (this.genes.sheathLength != 0){
            stem({ctx:lay0,xof:x0+P[-1].x,yof:y0+P[-1].y,
                rot:hr,
                len:this.genes.sheathLength,
                col:{min:[60,0.3,0.9,1],max:[60,0.3,0.9,1]},
                wid:(x) => this.genes.sheathWidth*(pow(sin(x*PI),2)-x*0.5+0.5),
                ben:(x) => ([0,0,0]
                    )})
            }
            for (var j = 0; j < Math.max(1,this.genes.shootCount*normRand(0.5,1.5)); j++){
            var P_ = stem({ctx:lay0,xof:x0+P[-1].x,yof:y0+P[-1].y,
            rot:hr,
            len:this.genes.shootLength*normRand(0.5,1.5),
            col:{min:[70,0.2,0.9,1],max:[70,0.2,0.9,1]},
            wid:(x) => (2),
            ben:(x) => ([
                mapval(Noise.noise(x*1,j),0,1,-1,1)*x*10,
                0,
                mapval(Noise.noise(x*1,j+PI),0,1,-1,1)*x*10
                ])})
            var op = Math.random()
            var hhr = [normRand(-1,1)*PI,normRand(-1,1)*PI,normRand(-1,1)*PI]
            for (var k = 0; k < this.genes.flowerPetal; k++){
                leaf({ctx:lay1,flo:true,
                xof:x0+P[-1].x+P_[-1].x, yof:y0+P[-1].y+P_[-1].y,
                rot:[hhr[0],hhr[1],hhr[2]+k/this.genes.flowerPetal*PI*2],
                len:this.genes.flowerLength *normRand(0.7,1.3)*1.5,
                wid:(x) => ( 1.5*this.genes.flowerShape(x)*this.genes.flowerWidth ),
                vei:[0],
                col:this.genes.flowerColor,
                cof:this.genes.flowerColorCurve,
                ben:(x) => ([
                    this.genes.flowerOpenCurve(x,op),
                    0,
                    0,
                    ])})
        
                leaf({ctx:lay1,flo:true,
                xof:x0+P[-1].x+P_[-1].x, yof:y0+P[-1].y+P_[-1].y,
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
        if (this.genes.leafPosition == 1){
            for (var i = 0; i < this.genes.leafChance*100; i++){
            leaf({ctx:lay0,
                xof:x0,yof:y0,rot:[PI/3,0,normRand(-1,1)*PI],
                len: 4*this.genes.leafLength *normRand(0.8,1.2),
                wid:(x) => (2*this.genes.leafShape(x)*this.genes.leafWidth),
                vei:this.genes.leafType,
                ben:(x) => ([
                mapval(Noise.noise(x*1,i),0,1,-1,1)*10,
                0,
                mapval(Noise.noise(x*1,i+PI),0,1,-1,1)*10
                ])})
            }
        }
        
        this.addFilters(lay0,lay1);

        this.position(lay0,lay1, 0, 0);
        

    }
}