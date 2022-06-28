import {Filter} from './../app/filter.js';
import {Layer} from './../app/layer.js';
import {DNA} from './../dna.js';
import {Noise} from './../app/noise.js';
import {v3} from './../app/v3.js';
import {Util} from '../app/util.js';
import { Drawable } from '../drawable.js';
import { ColorRangeDescriptor } from '../app/colorRangeDescriptor.js';
import tracery from 'tracery-es8';
// import { NameGenerator } from '../app/nameGenerator.js';

export class Plant extends Drawable {

    grammar = {
      "name":["#commonName.capitalizeAll#"],
      "plantName": ["Poppy", "Dahlia", "Flower", "Petal", "Iris", "Jade", "Tassel", "Lilac", "Magnolia", "Narcissus", "Quince", "Rose", "Sunflower", "Tulip", "Umbrella", "Violet", "Willow", "Lily", "Bell" ],
      "location": ["cave", "hill", "mountain", "ocean", "plain", "river", "sea", "moon", "sun", "star", "swamp", "heavens", "sky", "cliff"],
      "gender": ["man", "lady"],
      "mood": ["Tasteless", "Dwarf", "Fragrant", "wandering", "adorable", "jealous", "beautiful", "drooping", "drab", "elegant", "fancy", "glamorous", "handsome", "long", "magnificent", "old-fashioned", "plain", "quaint", "sparkling", "water",  "unsightly", "wide-eyed", "angry", "bewildered", "clumsy", "embarrassed", "fierce", "helpless", "itchy", "jealous", "hopeless", "lazy", "mysterious", "nervous",  "thoughtless", "thorny", "thornless", "upright"],
      "commonName": ["#mood# #plantName#", "#mood# #location# #plantName#", "#mood# #plantName# of the #location#"]
    };

    type = "plant"

    curveCoeff0 = [Util.normRand(-0.5,0.5),Util.normRand(5,10)]
    curveCoeff1 = [Math.random()*Util.PI, Util.normRand(1,5)]
    curveCoeff2 = [Math.random()*Util.PI,Util.normRand(5,15)]
    curveCoeff3 = [Math.random()*Util.PI,Util.normRand(1,5)]
    curveCoeff4 = [Math.random()*0.5,Util.normRand(0.8,1.2)];

    constructor(args) {
        super(args);

        this.args =(args != undefined) ? args : {};
        this.xof = (args.xof != undefined) ? args.xof : 0;  
        this.yof = (args.yof != undefined) ? args.yof : 0;
        this.width = (args.width != undefined) ? args.width : 0;
        this.height = (args.height != undefined) ? args.height: 0;
        this.dna = (args.dna != undefined) ? args.dna : new DNA();
        this.filtering_enabled = (args.filtering_enabled != undefined) ? args.filtering_enabled : true;
            
    }
    clamp(num, min, max) {
       return Math.min(Math.max(num, min), max);
    }
    get genes() {
        return this.dna.genes;
    }

    get seed() {
        return this.dna.seed;
    }

    get name() {
        if(this.plantName !== undefined) {
            return this.plantName;
        }else{
          let nameGenerator = tracery.createGrammar(this.grammar);
          nameGenerator.addModifiers(tracery.baseEngModifiers);
          return nameGenerator.flatten("#name#");
        }
    }

    get description() {

        return {
            flowers: new ColorRangeDescriptor(this.dna.flowerColors),
            branches: new ColorRangeDescriptor(this.dna.branchColors),
            leaves: new ColorRangeDescriptor(this.dna.leafColors),
        }

    }


    leaf(args){
        args =(args != undefined) ? args : {};
        var ctx = (args.ctx != undefined) ? args.ctx : CTX;  
        var xof = (args.xof != undefined) ? args.xof : 0;  
        var yof = (args.yof != undefined) ? args.yof : 0;  
        var rot = (args.rot != undefined) ? args.rot : [Util.PI/2,0,0];
        var len = (args.len != undefined) ? args.len : 500;
        var seg = (args.seg != undefined) ? args.seg : 40;
        var wid = (args.wid != undefined) ? args.wid : (x) => (Util.sin(x*Util.PI)*20);
        var vei = (args.vei != undefined) ? args.vei : [1,3];
        var flo = (args.flo != undefined) ? args.flo : false
        var col = (args.col != undefined) ? args.col : 
          {min:[90,0.2,0.3,1],max:[90,0.1,0.9,1]}
        var cof = (args.cof != undefined) ? args.cof : (x) => (x)
        var ben = (args.ben != undefined) ? args.ben : 
          (x) => ([Util.normRand(-10,10),0,Util.normRand(-5,5)])
      
        var disp = v3.zero
        var crot = v3.zero
        var P = [disp]
        var ROT = [crot]
        var L = [disp]
        var R = [disp]
      


        var orient = (v) => (v3.roteuler(v,rot));
      
        for (var i = 0; i < seg; i++){
          var p = i/(seg-1)
          crot= v3.add(crot,v3.scale(ben(p),1/seg))
          disp = v3.add(disp,orient(v3.roteuler([0,0,len/seg],crot)))
          var w = wid(p);
          var l = v3.add(disp,orient(v3.roteuler([-w,0,0],crot)));
          var r = v3.add(disp,orient(v3.roteuler([w,0,0],crot)));

          if (i > 0){
            var v0 = v3.subtract(disp,L[-1]);
            var v1 = v3.subtract(l,disp);
            var v2 = v3.cross(v0,v1)
            if (!flo){
              var lt = Util.mapval(Util.abs(v3.ang(v2,[0,-1,0])),0,Util.PI,1,0);
            }else{
              var lt = p*Util.normRand(0.95,1);
            }
            lt = cof(lt) || 0
      
            var h = Util.lerpHue(col.min[0],col.max[0],lt)
            var s = Util.mapval(lt,0,1,col.min[1],col.max[1])
            var v = Util.mapval(lt,0,1,col.min[2],col.max[2])
            var a = Util.mapval(lt,0,1,col.min[3],col.max[3])
      
            this.polygon({ctx:ctx,pts:[l,L[-1],P[-1],disp],
              xof:xof,yof:yof,fil:true,str:true,col:Util.hsv(h,s,v,a)})
            this.polygon({ctx:ctx,pts:[r,R[-1],P[-1],disp],
              xof:xof,yof:yof,fil:true,str:true,col:Util.hsv(h,s,v,a)})
          }
          P.push(disp);
          ROT.push(crot)
          L.push(l)
          R.push(r)
        }


        // VEINS
        if (vei[0] == 1){
          for (var i = 1; i < P.length; i++){
            for (var j = 0; j < vei[1]; j++){
              var p = j/vei[1];
      
              var p0 = v3.lerp(L[i-1],P[i-1],p)
              var p1 = v3.lerp(L[i],P[i],p)
      
              var q0 = v3.lerp(R[i-1],P[i-1],p)
              var q1 = v3.lerp(R[i],P[i],p)
              this.polygon({ctx:ctx,pts:[p0,p1],
                xof:xof,yof:yof,fil:false,col:Util.hsv(0,0,0,Util.normRand(0.4,0.9))})
              this.polygon({ctx:ctx,pts:[q0,q1],
                xof:xof,yof:yof,fil:false,col:Util.hsv(0,0,0,Util.normRand(0.4,0.9))})
      
            }
          }
          this.stroke({ctx:ctx,pts:P,xof:xof,yof:yof,col:Util.rgba(0,0,0,0.3)})
        }else if (vei[0] == 2){
          for (var i = 1; i < P.length-vei[1]; i+=vei[2]){
            this.polygon({ctx:ctx,pts:[P[i],L[i+vei[1]]],
              xof:xof,yof:yof,fil:false,col:Util.hsv(0,0,0,Util.normRand(0.4,0.9))})
            this.polygon({ctx:ctx,pts:[P[i],R[i+vei[1]]],
              xof:xof,yof:yof,fil:false,col:Util.hsv(0,0,0,Util.normRand(0.4,0.9))})
          }
          this.stroke({ctx:ctx,pts:P,xof:xof,yof:yof,col:Util.rgba(0,0,0,0.3)})
        }
      
        this.stroke({ctx:ctx,pts:L,xof:xof,yof:yof,col:Util.rgba(120,100,0,0.3)})
        this.stroke({ctx:ctx,pts:R,xof:xof,yof:yof,col:Util.rgba(120,100,0,0.3)})
        return P
    }

    // generate fractal-like branches
    branch(args){
        args =(args != undefined) ? args : {};
        var ctx = args.ctx;// (args.ctx != undefined) ? args.ctx : ;  
        var xof = (args.xof != undefined) ? args.xof : 0;  
        var yof = (args.yof != undefined) ? args.yof : 0;  
        var rot = (args.rot != undefined) ? args.rot : [Util.PI/2,0,0];
        var len = (args.len != undefined) ? args.len : 400;
        var seg = (args.seg != undefined) ? args.seg : 40;
        var wid = (args.wid != undefined) ? args.wid : 1;
        var twi = (args.twi != undefined) ? args.twi : 5;
        var col = (args.col != undefined) ? args.col : 
        {min:[50,0.2,0.8,1],max:[50,0.2,0.8,1]}
        var dep = (args.dep != undefined) ? args.dep : 3
        var frk = (args.frk != undefined) ? args.frk : 4
    
        var jnt = []
        for (var i = 0; i < twi; i++){
        jnt.push([Math.floor(Math.random()*seg),Util.normRand(-1,1)])
        }
    
        function jntdist(x){
            var m = seg
            var j = 0
            for (var i = 0; i< jnt.length; i++){
                var n = Math.abs(x*seg - jnt[i][0]);
                if (n < m){
                m = n
                j = i
                }
            }
            return [m,jnt[j][1]]
        }
    
        var wfun = function (x) {
            var noiseScale = 10; // 10
            var [m,j] = jntdist(x)
            if (m < 1){
                return wid*(3+5*(1-x))
            }else{ 
                return wid*(2+7*(1-x)*Util.mapval(Noise.noise(x*noiseScale),0,1,0.5,1))
            }
        }
        
        // BENDING
        var bfun = function (x) {
        var [m,j] = jntdist(x)
            if (m < 1){
                //this causes bends
                return [0,j*20,0]
            }else{
                // this slightly bends randomly
                return [0,Util.normRand(-5,5),0]
            }
        }
    
        var P = this.stem({ctx:ctx,
        xof:xof,yof:yof,
        rot:rot,
        len:len,seg:seg,
        wid:wfun,
        col:col,
        ben:bfun})
        
        var child = []
        if (dep > 0 && wid > 0.1){
        for (var i = 0; i < frk*Math.random(); i++){
            var ind = Math.floor(Util.normRand(1,P.length))
    
            var r = Util.grot(P,ind)
            var L = this.branch({ctx:ctx,
            xof:xof+P[ind].x,yof:yof+P[ind].y,
            rot:[r[0]+Util.normRand(-1,1)*Util.PI/6,r[1]+Util.normRand(-1,1)*Util.PI/6,r[2]+Util.normRand(-1,1)*Util.PI/6],
            seg:seg,
            len:len*Util.normRand(0.4,0.6),
            wid:wid*Util.normRand(0.4,0.7),
            twi:twi*0.7,
            dep:dep-1
            })
            //child = child.concat(L.map((v)=>([v[0],[v[1].x+P[ind].x,v[1].y+P[ind].y,v[1].z]])))
            child = child.concat(L)
        }
        }
        return ([[dep,P.map((v)=>([v.x+xof,v.y+yof,v.z]))]]).concat(child)
    
  } 

  // generate stem-like structure
  stem(args){
    // args = (args != undefined) ? args : ;
    var ctx = args.ctx;
    var xof = (args.xof != undefined) ? args.xof : 0;  
    var yof = (args.yof != undefined) ? args.yof : 0;  
    var rot = (args.rot != undefined) ? args.rot : [Util.PI/2,0,0];
    var len = (args.len != undefined) ? args.len : 400;
    var seg = (args.seg != undefined) ? args.seg : 40;
    var wid = (args.wid != undefined) ? args.wid : (x) => (6);
    var col = (args.col != undefined) ? args.col : 
      {min:[250,0.2,0.4,1],max:[250,0.3,0.6,1]}
    var ben = (args.ben != undefined) ? args.ben : 
      (x) => ([Util.normRand(-10,10),0,Util.normRand(-5,5)])
  
  
  
    var disp = v3.zero
    var crot = v3.zero
    var P = [disp]
    var ROT = [crot]
  
    var orient = (v) => (v3.roteuler(v,rot));
    
    for (var i = 0; i < seg; i++){
      var p = i/(seg-1)
      crot = v3.add(crot,v3.scale(ben(p),1/seg));
      disp = v3.add(disp,orient(v3.roteuler([0,0,len/seg],crot)))	
      ROT.push(crot);
      P.push(disp);
    }
    var [L,R] = this.tubify({pts:P,wid:wid})
    var wseg = 8;
    var noiseScale = 10;
    for (var i = 1; i < P.length; i++){
      for (var j = 1; j < wseg; j++){
        var m = (j-1)/(wseg-1);
        var n = j/(wseg-1);
        var p = i/(P.length-1)
        // var pcurve = this.curveCoeff2;
        // p = Util.sigmoid( (j*p) * pcurve[0], pcurve[1]) * 0.4
        // var mCurve = this.curveCoeff2
        // m = Util.sigmoid( ( m) * mCurve[0], mCurve[1]) * 0.7

        // var ncurve = this.curveCoeff4;
        // n = Util.sigmoid( (j + n) * ncurve[0], ncurve[1]) * 2


        var p0 = v3.lerp(L[i-1],R[i-1],m)
        var p1 = v3.lerp(L[i],R[i],m)
  
        var p2 = v3.lerp(L[i-1],R[i-1],n)
        var p3 = v3.lerp(L[i],R[i],n)
  
        var lt = n/p
        var h = Util.lerpHue(col.min[0],col.max[0],lt)*Util.mapval(Noise.noise(p*noiseScale,m*noiseScale,n*noiseScale),0,1,0.5,1)
        var s = Util.mapval(lt,0,1,col.max[1],col.min[1])*Util.mapval(Noise.noise(p*noiseScale,m*noiseScale,n*noiseScale),0,1,0.5,1)
        var v = Util.mapval(lt,0,1,col.min[2],col.max[2])*Util.mapval(Noise.noise(p*noiseScale,m*noiseScale,n*noiseScale),0,1,0.5,1)
        var a = Util.mapval(lt,0,1,col.min[3],col.max[3])
  
        this.polygon({ctx:ctx,pts:[p0,p1,p3,p2],
          xof:xof,yof:yof,fil:true,str:true,col:Util.hsv(h,s,v,a)
        })
  
      }
    }
    this.stroke({ctx:ctx,pts:L,xof:xof,yof:yof,col:Util.rgba(0,0,0,0.5)})
    this.stroke({ctx:ctx,pts:R,xof:xof,yof:yof,col:Util.rgba(0,0,0,0.5)})
    return P
  }
}