import {Util} from "./util.js";
// import * as ColorTranslator from 'colortranslator'// https://cdn.jsdelivr.net/npm/colortranslator/+esm';
import * as NWC from 'named-web-colors'; // ../../node_modules/named-web-colors/lib/named-web-colors.js';
import { ColorTranslator} from 'colortranslator';
export class Color {
    constructor(colorStr, colorSpace = 'werner') {

        this.colorStr = colorStr;
        this.colorSpace = colorSpace;

    }

    // color = hsv(...this.colorStr))
    get humanName() {

        return getColorName( ColorTranslator.toHEXA(this.colorStr), {list: this.colorSpace}).name;
    }

    static toHSLA(arr) {
        var hsl = Util.hsv(...arr);
        return hsl
    }

    static fromHSLA(arr) {
        var hsl = Util.hsv(...arr);
        return new Color(hsl);
    }
}
