class Color {
    constructor(colorStr, colorSpace = 'web') {

        this.colorStr = colorStr;
        this.colorSpace = colorSpace;

    }

    // color = hsv(...this.colorStr))
    get humanName() {
        return getColorName( colortranslator.ColorTranslator.toHEX(this.colorStr, {list: this.colorSpace})).name;
    }

    static fromHSLA(arr) {
        var hsl = hsv(...arr);
        return new Color(hsl);
    }
}
