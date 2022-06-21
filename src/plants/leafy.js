import {Plant} from './plants.js';
import {Layer} from './../app/layer.js';
import {Noise} from './../app/noise.js';
import {Util} from './../app/util.js';

export class Leafy extends Plant {

    plantNames = [ "Kale", "Hosta", "Bush" ];
    descriptiveAdjectives = ["Dwarf", "Fragrant", "wandering", "adorable", "jealous", "beautiful", "drooping", "drab", "elegant", "fancy", "glamorous", "handsome", "long", "magnificent", "old-fashioned", "plain", "quaint", "sparkling", "water",  "unsightly", "wide-eyed", "angry", "bewildered", "clumsy", "embarrassed", "fierce", "helpless", "itchy", "jealous", "hopeless", "lazy", "mysterious", "nervous",  "thoughtless", "thorny", "thornless", "upright"];
    geoAdjectives = ["cave", "hill", "mountain", "ocean", "plain", "river", "sea", "moon", "sun", "star", "swamp", "heavens", "sky", "cliff"];

    type = "leafy";

    constructor(dna) {
        super(dna);
    }

}