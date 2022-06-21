import { Descriptor } from "./descriptor.js";
export class ColorRangeDescriptor extends Descriptor {

    constructor(args) {
        super();
        this.colors = args;
    }

    toString() {
       return [...new Set(this.colors)].join( " to ");
    }

}