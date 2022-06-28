import {Descriptor} from '../app/descriptor.js';
import tracery from 'tracery-es8';
export class NameGenerator {

    constructor(args) {

        this.baseNames = args.baseNames || [];
        this.moodAdjectives = args.moodAdjectives || [];
        this.locationAdjectives = args.locationAdjectives || [];

    }

    commonName() {
        return this.randomPick(this.baseNames);
    }

    randomPick(arr, count = 1) {
        return [...arr].sort(() => Math.floor(0.5 - Math.random())).slice(0, count);
    }

    name(moodCount = 1, locationCount = 1) {
        var randomName = this.commonName();
        var mood = this.randomPick(this.moodAdjectives, moodCount);
        var location = this.randomPick(this.locationAdjectives, locationCount);

        var locator = "";
        var descriptor = "";
        var joiner = "";

        if(Math.random() < 0.4) {
            if(Math.random() < 0.7) {
                // Example: Fallen Sky Violet
                descriptor = `${mood} ${location}`;
            }else{
                // Example: Fallen Violet from the Sky
                joiner = this.randomPick(["from the", "of the"], 1);
                descriptor = mood.join(' ')
                locator =  location.join(' ');
            }
        }else{
            var descriptor = mood;
        }

        return new Descriptor(`${descriptor} ${randomName} ${joiner} ${locator}`);
    }
}