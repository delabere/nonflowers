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
        var cwid = 1200
        var lay0 = Layer.empty(cwid)
        var lay1 = Layer.empty(cwid)
        
        this.genes.branchFork = 0
        this.genes.branchTwist = 1
        this.genes.branchDepth = 0
        // this.genes.branchWidth = 5
        var PL = branch({
            ctx:lay0,xof:cwid*0.5,yof:cwid*0.7,
            wid:this.genes.branchWidth,
            twi:this.genes.branchTwist,
            dep:this.genes.branchDepth,
            len: (Math.random() * 200) + 70,
            col:this.genes.branchColor,
            seg: 50,
            frk:this.genes.branchFork,
            })
            this.genes.pedicelLength = 120
        
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
        
        cap({ctx:lay0,
            xof:PL[0][1][0].x, yof:PL[0][1][0].y ,
            rot:[90,0,0],
            seg: 22,
            len:this.genes.pedicelLength,
            col:{min:[50,1,0.9,1],max:[50,1,0.9,1]},
            wid:(x) => (sin(x*PI)*x*200+1),
            ben:(x) => ([
                0,0,0
                ])})
        
        
        for (var i = 0; i < PL.length; i++){
            for (var j = 1; j > 0; j--){
                console.log(PL[i][1][j].x, PL[i][1][j].y)
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
        
                
        
            }
        }
        
        this.addFilters(lay0,lay1);

        this.position(lay0,lay1); 
        
    }

}