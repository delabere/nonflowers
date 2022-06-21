import * as VectorArray from './app/vectorArray.js';
import { PlantFactory } from './plants/plant_factory.js';
import {Layer} from "./app/layer.js"
import {Util} from './app/util.js';
import {Prng} from './app/prng.js';
import {DNA} from './dna.js';
import {nameComponent} from './app/nameComponent.js';
import * as seedrandom from 'https://cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js';

let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new Generator();


//   const inputs = document.querySelectorAll('input');
//   inputs.forEach(i => {
//     i.onchange = () => {
//       _APP.OnChange();
//     };
//   });
});

class Generator {

    CANVAS_WIDTH = 704;
    CANVAS_HEIGHT = 863;

    constructor() {
        this._id = 0;
        this._configuration = (v) => (new URLSearchParams(window.location.search)); 
        


        this.OnChange()
    }

    OnChange() {
        this._UpdateFromUI();
    }

    _UpdateFromUI() {

        var rng = new Math.seedrandom(); // call with new to create a standalone generator without affecting Math.random() yet.
        Math.seed = function(x) { return Math.seedrandom(x); }
        this._ANIMATE();

    }

    _ANIMATE(timeElapsed) {

        let options = {width: this.CANVAS_WIDTH, height: this.CANVAS_HEIGHT, xof:this.CANVAS_WIDTH/2,yof:this.CANVAS_WIDTH};

        if(this.configuration.has('seed'))
            options.dna = new DNA({seed: this.configuration.get('seed')});

        const plant = new PlantFactory(options, this.configuration.get('plantType'));
              plant.generate({containerElementId: 'canvas-container'});
                

        const name = new nameComponent({containerElementId: 'render-object'});
              name.render(plant);


        console.log(plant)

    }



    get configuration() {
        return this._configuration();
    }


}
