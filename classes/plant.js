class Plant {

    plantNames = ["Poppy", "Dahlia", "Fern", "Flower", "Petal", "Iris", "Jade", "Kale", "Stickweed", "Tassel", "Lilac", "Magnolia", "Narcissus", "Olive", "Quince", "Rose", "Sunflower", "Tulip", "Umbrella", "Violet", "Willow", "Lily" ];
    descriptiveAdjectives = ["Fragrant", "adorable", "jealous", "beautiful", "clean", "drab", "elegant", "fancy", "glamorous", "handsome", "long", "magnificent", "old-fashioned", "plain", "quaint", "sparkling", "water",  "unsightly", "wide-eyed", "angry", "bewildered", "clumsy", "embarrassed", "fierce", "helpless", "itchy", "jealous", "lazy", "mysterious", "nervous", "panicky", "thoughtless", "thorny", "thornless", "upright", "worried"];
    geoAdjectives = ["cave", "dwarf", "hill", "island", "mountain", "ocean", "plain", "river", "sea", "swamp", "heavens", "sky", "cliff"];

    constructor(dna) {
        this.dna = dna;
    }

    get name() {
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
            //getColorName(color, {list: 'werner'}).name.split(" ").reverse()[0]
        }
        var plantName = descriptor + " " + randomName + " " + joiner + " " + locator;
        return this.capitalize(plantName).trim();
    }

    get flowerColors() {
        var min = this.color(this.dna.flowerColor.min).humanName;
        var max = this.color(this.dna.flowerColor.max).humanName;
        return [min, max];
    }

    get innerColors() {
        var min = this.color(this.dna.innerColor.min).humanName;
        var max = this.color(this.dna.innerColor.max).humanName;
        return [min, max];
    }

    color(col) {
        return Color.fromHSLA(col);
    }

    capitalize(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
     
}