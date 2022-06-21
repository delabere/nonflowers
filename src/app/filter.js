import { Noise } from "./noise.js"
import { Util } from "./util.js"
export class Filter { 

    //aging
    static wispy(x,y,r,g,b,a){
        var n = Noise.noise(x*0.2,y*0.2)
        var m = Noise.noise(x*0.5,y*0.5,2)
        return [r,g*Util.mapval(m,0,1,0.95,1),b*Util.mapval(m,0,1,0.8,1),a*Util.mapval(n,0,1,0.7,1)]
        // rr = r*1
        // gg  = g* (m * 0.95)
        // bb = b* (m * 0.8)
        // aa = a* (0.2 * 0.7)
    }

    //worn blotches
    static fade(x,y,r,g,b,a){
        let noise=0.0217;
        var n = Noise.noise(x*noise,y*noise)
        var m = Noise.noise(x*0.5,y*0.5,2)
        return [r,g*Util.mapval(m,0,1,0.95,1),b*Util.mapval(m,0,1,0.8,1),a*Math.min(Math.max(Util.mapval(n,0,0.323,0,1),0),1)]
        //rr = r*1
        //gg = g* (m*0.95)
        //bb = b* (m*0.8)
        //aa = b* (n*0.7)
    }
}