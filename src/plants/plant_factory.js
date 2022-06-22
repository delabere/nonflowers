import { Util } from "../app/util.js";
import {Flowering, Woody, Fungus}from "./plants.js";

export class PlantFactory {

    availableTypes = ["woody", "flowering", "flowering", "fungus"];

    constructor(options, plantType) {

        let plant = null;

        plantType = (typeof(plantType) !== "undefined" && plantType != null ) ? plantType :  Util.randChoice(this.availableTypes);

        switch(plantType){
          case "flowering":
            plant = new Flowering(options);
            break;
          case "woody":
            plant = new Woody(options);
            break;
          case "fungus":
            plant = new Fungus(options);
            break;
          default:
            plant = new Flowering(options);
        }
      
        return plant
    }

}