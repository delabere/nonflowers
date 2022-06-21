import {Util} from "./util.js";
import {ColorTranslator} from 'https://cdn.jsdelivr.net/npm/colortranslator/+esm';
import * as NWC from 'https://unpkg.com/named-web-colors@1.4.2/lib/named-web-colors.js' // ../../node_modules/named-web-colors/lib/named-web-colors.js';
// import { ColorTranslator, Harmony, Mix } from 'colortranslator';
export class Color {
    constructor(colorStr, colorSpace = 'werner') {

        this.colorStr = colorStr;
        this.colorSpace = colorSpace;

    }

    // color = hsv(...this.colorStr))
    get humanName() {
        return getColorName( ColorTranslator.toHEX(this.colorStr), {list: this.colorSpace}).name;
    }

    static fromHSLA(arr) {
        var hsl = Util.hsv(...arr);
        return new Color(hsl);
    }
}
