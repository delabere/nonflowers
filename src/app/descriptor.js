export class Descriptor {

    constructor(str) {
        this.str = str;
    }

    color(col) {
        return Color.fromHSLA(col);
    }

    capitalize() {
        return this.str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    toString() {
        return this.capitalize().trim();
    }

}