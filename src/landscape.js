import * as VectorArray from './app/vectorArray.js';
import { PlantFactory } from './plants/plant_factory.js';
import {Layer} from "./app/layer.js"
import {Util} from './app/util.js';
import {Prng} from './app/prng.js';
import {DNA} from './dna.js';
import {nameComponent} from './app/nameComponent.js';
import * as seedrandom from 'seedrandom/seedrandom.js'
import { GeneEditorComponent } from './app/geneEditorComponent.js';


let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
    _APP = new Generator();


    _APP.geneEditor.addEventListener('editor.change', function(evt) {
        // evt.detail;
        _APP.OnChange();
    });
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
        

        this.geneEditor = new GeneEditorComponent({elementId: 'gene-editor-component'});

        this.OnChange()
    }

    OnChange() {
        this._UpdateFromUI();
        this._ANIMATE();
    }

    _UpdateFromUI() {

        let rng = new Math.seedrandom(); // call with new to create a standalone generator without affecting Math.random() yet.
        Math.seed = function(x) { return Math.seedrandom(x); }

    }

    _ANIMATE(timeElapsed) {



        let plantCount = this.configuration.get("plantCount") || 9;
        let renderObject = document.getElementById('render-object');


        let landscapeHeight = window.innerHeight;
        let landscapeWidth = window.innerWidth;
        var landscapeCenter = landscapeWidth/2;
        let landscape = new Layer(landscapeWidth, landscapeHeight);

        landscape.globalCompositeOperation = 'destination-xor';
        landscape.imageSmoothingQuality = "high";



        console.log('in',window.innerHeight)
        for(var i = 0; i < plantCount; i++) {
            let options = {
                width: this.CANVAS_WIDTH,
                height: this.CANVAS_HEIGHT, 
                xof:this.CANVAS_WIDTH/2,
                yof:this.CANVAS_WIDTH,
                dna: {
                    seed: this.configuration.get('seed'),
                },
                filtering_enabled: false
            };


            console.log('OPTION SEED:', options.dna.seed)
            options.dna = new DNA(options.dna);

            const plant = new PlantFactory(options, this.configuration.get('plantType'));
                console.log("Generating", plant)
                plant.generate({containerElementId: 'canvas-container'});
                    
                // plant.ctx.scale(0.2, 0.2);
            var scale = 400
            let cluster = 0.5;
            var scaledToLandscape = scale * (plant.height / plant.width)
            let distribution = 12
            for(var k=0; k<distribution; k++) {
                var clusterX = Math.sin(landscapeCenter/2 * Math.sin(k)) * (landscapeCenter/2 * k);// k/distribution;

                var jitterX = Math.cos(Util.QuadInOut(Math.sin(Math.random() * 0.2 )) * (plant.width*0.5) + (plant.width*0.5));
                var distributionX = ((landscapeCenter - Math.sin(Util.QuadInOut((k+1))) * (landscapeWidth)) - plant.width/2)/2 + landscapeCenter/2;
                var distributionY = (landscapeHeight/2 - Math.cos(Util.QuadInOut((k))) * (120) - plant.height/2)/2 - landscapeHeight/2;

                landscape.drawImage(plant.canvas,
                    distributionX + (Util.normRand(-80, 80) * jitterX),
                    //gaussianRandom(0, landscapeWidth),
                   // (Util.clamp((landscapeWidth / Math.sin(k+1)) - plant.width/2, plant.width/2, landscapeWidth - plant.width))  - ((k * Math.random()) * plant.width/2)) + plant.width/2, 
                //    ((distributionX / distributionY) *
                    Math.abs(distributionY) + (Util.normRand(0, 30) * jitterX),// - (landscapeHeight - plant.height/2), //- (landscapeHeight - plant.height/2) , 
                    // distributionY + distributionX,
                    scale, 
                    scaledToLandscape 
                );
            }



        }

        var plantImg = document.createElement('img')
        plantImg.src = landscape.canvas.toDataURL('image/png');
        plantImg.className = "img-fluid";
        plantImg.style = "filter: url(#smudge) url(#aged);"
        renderObject.appendChild(plantImg);

    }




    get configuration() {
        return this._configuration();
    }


}
