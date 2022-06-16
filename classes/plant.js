class Plant {

    plantNames = ["Poppy", "Dahlia", "Fern", "Flower", "Petal", "Iris", "Jade", "Kale", "Stickweed", "Tassel", "Lilac", "Magnolia", "Narcissus", "Olive", "Quince", "Rose", "Sunflower", "Tulip", "Umbrella", "Violet", "Willow", "Lily" ];
    descriptiveAdjectives = ["Fragrant", "adorable", "jealous", "beautiful", "clean", "drab", "elegant", "fancy", "glamorous", "handsome", "long", "magnificent", "old-fashioned", "plain", "quaint", "sparkling", "water",  "unsightly", "wide-eyed", "angry", "bewildered", "clumsy", "embarrassed", "fierce", "helpless", "itchy", "jealous", "lazy", "mysterious", "nervous", "panicky", "thoughtless", "thorny", "thornless", "upright", "worried"];
    geoAdjectives = ["cave", "dwarf", "hill", "island", "mountain", "ocean", "plain", "river", "sea", "swamp", "heavens", "sky", "cliff"];
    type = "plant"

    constructor(args) {
        this.args =(args != undefined) ? args : {};
        this.ctx = (args.ctx != undefined) ? args.ctx : CTX;  
        this.xof = (args.xof != undefined) ? args.xof : 0;  
        this.yof = (args.yof != undefined) ? args.yof : 0;
        this.dna = (args.dna != undefined) ? args.dna : new DNA();
            
    }

    get genes() {
        return this.dna.genes;
    }

    get seed() {
        return this.dna.seed;
    }

    get name() {
        if(this.plantName !== undefined)
            return this.plantName;

        var randomName = [...this.plantNames].sort(() => 0.5 - Math.random())[0];
        var randomAdjective = [...this.descriptiveAdjectives].sort(() => Math.floor(0.5 - Math.random()))[0];
    
        var randomGeoAdjective = [...this.geoAdjectives].sort(() => Math.floor(0.5 - Math.random()))[0];
        var locator = "";
        var descriptor = "";
        var joiner = "";

        if(Math.random() < 0.4) {
            if(Math.random() < 0.7) {
                descriptor = randomAdjective + " " + randomGeoAdjective;
            }else{
                joiner = ["from the", "of the"].sort(() => 0.5 - Math.random())[0];
                descriptor = randomAdjective
                locator =  randomGeoAdjective;
            }
        }else{
            var descriptor = randomAdjective;
        }
        this.plantName = new Descriptor(descriptor + " " + randomName + " " + joiner + " " + locator)

        return this.plantName;
    }

    get description() {

        return {
            flowers: new ColorRangeDescriptor(this.dna.flowerColors),
            branches: new ColorRangeDescriptor(this.dna.branchColors),
            leaves: new ColorRangeDescriptor(this.dna.leafColors),
        }

    }

    addFilters(layer0, layer1) {
        if(FILTERING) {
            Layer.filter(layer0,Filter.fade)
            Layer.filter(layer0,Filter.wispy)
            Layer.filter(layer1,Filter.wispy)
        }
    }

    position(layer0, layer1, xExtra = 0, yExtra = 0) {
        var b1 = Layer.boundingBox(layer0)
        var b2 = Layer.boundingBox(layer1)
        var bd = {
            xmin:Math.min(b1.xmin,b2.xmin),
            xmax:Math.max(b1.xmax,b2.xmax),
            ymin:Math.min(b1.ymin,b2.ymin),
            ymax:Math.max(b1.ymax,b2.ymax),
            cWidth: this.ctx.canvas.width,
            cHeight: this.ctx.canvas.height
        }
        
        var boundingWidth = bd.xmax - bd.xmin
        var boundingHeight = bd.ymax - bd.ymin

        var xref = (bd.cWidth/2 - boundingWidth/2) - (this.xof -  boundingWidth/2)
        var yref = (bd.cHeight/2 - boundingHeight/2) - bd.ymin/2

        Layer.blit(this.ctx,layer0,{ble:"normal",xof:xref + xExtra,yof:yref + yExtra})
        Layer.blit(this.ctx,layer1,{ble:"hard-light",xof:xref + xExtra,yof:yref + yExtra})

    }
     
}