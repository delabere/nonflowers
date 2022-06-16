class Plant {

    plantNames = ["Poppy", "Dahlia", "Fern", "Flower", "Petal", "Iris", "Jade", "Kale", "Stickweed", "Tassel", "Lilac", "Magnolia", "Narcissus", "Olive", "Quince", "Rose", "Sunflower", "Tulip", "Umbrella", "Violet", "Willow", "Lily" ];
    descriptiveAdjectives = ["Fragrant", "adorable", "jealous", "beautiful", "clean", "drab", "elegant", "fancy", "glamorous", "handsome", "long", "magnificent", "old-fashioned", "plain", "quaint", "sparkling", "water",  "unsightly", "wide-eyed", "angry", "bewildered", "clumsy", "embarrassed", "fierce", "helpless", "itchy", "jealous", "lazy", "mysterious", "nervous", "panicky", "thoughtless", "thorny", "thornless", "upright", "worried"];
    geoAdjectives = ["cave", "dwarf", "hill", "island", "mountain", "ocean", "plain", "river", "sea", "swamp", "heavens", "sky", "cliff"];
    type = "plant"

    constructor(args) {
        this.args =(args != undefined) ? args : {};
        this.ctx = (args.ctx != undefined) ? args.ctx : CTX;  
        this.xof = (args.xof != undefined) ? args.xof : 0;  
        this.yof = (args.yof != undefined) ? args.yof : 0;
        this.dna = (args.dna != undefined) ? args.dna : new DNA();
            
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
        if(this.plantName !== undefined)
            return this.plantName;

        var randomName = [...this.plantNames].sort(() => 0.5 - Math.random())[0];
        var randomAdjective = [...this.descriptiveAdjectives].sort(() => Math.floor(0.5 - Math.random()))[0];
    
        var randomGeoAdjective = [...this.geoAdjectives].sort(() => Math.floor(0.5 - Math.random()))[0];
        var locator = "";
        var descriptor = "";
        var joiner = "";

        if(Math.random() < 0.4) {
            if(Math.random() < 0.7) {
                descriptor = randomAdjective + " " + randomGeoAdjective;
            }else{
                joiner = ["from the", "of the"].sort(() => 0.5 - Math.random())[0];
                descriptor = randomAdjective
                locator =  randomGeoAdjective;
            }
        }else{
            var descriptor = randomAdjective;
        }
        this.plantName = new Descriptor(descriptor + " " + randomName + " " + joiner + " " + locator)

        return this.plantName;
    }

    get description() {

        return {
            flowers: new ColorRangeDescriptor(this.dna.flowerColors),
            branches: new ColorRangeDescriptor(this.dna.branchColors),
            leaves: new ColorRangeDescriptor(this.dna.leafColors),
        }

    }

    addFilters(layer0, layer1) {
        if(FILTERING) {
            Layer.filter(layer0,Filter.fade)
            Layer.filter(layer0,Filter.wispy)
            Layer.filter(layer1,Filter.wispy)
        }
    }

    position(layer0, layer1, xExtra = 0, yExtra = 0, blend1 = "normal", blend2 = "hard-light") {
        var b1 = Layer.boundingBox(layer0)
        var b2 = Layer.boundingBox(layer1)
        var bd = {
            xmin:Math.min(b1.xmin,b2.xmin),
            xmax:Math.max(b1.xmax,b2.xmax),
            ymin:Math.min(b1.ymin,b2.ymin),
            ymax:Math.max(b1.ymax,b2.ymax),
            cWidth: this.ctx.canvas.width,
            cHeight: this.ctx.canvas.height
        }
        
        var boundingWidth = bd.xmax - bd.xmin
        var boundingHeight = bd.ymax - bd.ymin

        var xref = (bd.cWidth/2 - boundingWidth/2) - (this.xof -  boundingWidth/2)
        var yref = (bd.cHeight/2 - boundingHeight/2) - bd.ymin/2

        Layer.blit(this.ctx,layer0,{ble:blend1,xof:xref + xExtra,yof:yref + yExtra})
        Layer.blit(this.ctx,layer1,{ble:blend2,xof:xref + xExtra,yof:yref + yExtra})

    }

    leaf(args){
        var args =(args != undefined) ? args : {};
        var ctx = (args.ctx != undefined) ? args.ctx : CTX;  
        var xof = (args.xof != undefined) ? args.xof : 0;  
        var yof = (args.yof != undefined) ? args.yof : 0;  
        var rot = (args.rot != undefined) ? args.rot : [PI/2,0,0];
        var len = (args.len != undefined) ? args.len : 500;
        var seg = (args.seg != undefined) ? args.seg : 40;
        var wid = (args.wid != undefined) ? args.wid : (x) => (sin(x*PI)*20);
        var vei = (args.vei != undefined) ? args.vei : [1,3];
        var flo = (args.flo != undefined) ? args.flo : false
        var col = (args.col != undefined) ? args.col : 
          {min:[90,0.2,0.3,1],max:[90,0.1,0.9,1]}
        var cof = (args.cof != undefined) ? args.cof : (x) => (x)
        var ben = (args.ben != undefined) ? args.ben : 
          (x) => ([normRand(-10,10),0,normRand(-5,5)])
      
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
              var lt = mapval(abs(v3.ang(v2,[0,-1,0])),0,PI,1,0);
            }else{
              var lt = p*normRand(0.95,1);
            }
            lt = cof(lt) || 0
      
            var h = lerpHue(col.min[0],col.max[0],lt)
            var s = mapval(lt,0,1,col.min[1],col.max[1])
            var v = mapval(lt,0,1,col.min[2],col.max[2])
            var a = mapval(lt,0,1,col.min[3],col.max[3])
      
            polygon({ctx:ctx,pts:[l,L[-1],P[-1],disp],
              xof:xof,yof:yof,fil:true,str:true,col:hsv(h,s,v,a)})
            polygon({ctx:ctx,pts:[r,R[-1],P[-1],disp],
              xof:xof,yof:yof,fil:true,str:true,col:hsv(h,s,v,a)})
          }
          P.push(disp);
          ROT.push(crot)
          L.push(l)
          R.push(r)
        }
        if (vei[0] == 1){
          for (var i = 1; i < P.length; i++){
            for (var j = 0; j < vei[1]; j++){
              var p = j/vei[1];
      
              var p0 = v3.lerp(L[i-1],P[i-1],p)
              var p1 = v3.lerp(L[i],P[i],p)
      
              var q0 = v3.lerp(R[i-1],P[i-1],p)
              var q1 = v3.lerp(R[i],P[i],p)
              polygon({ctx:ctx,pts:[p0,p1],
                xof:xof,yof:yof,fil:false,col:hsv(0,0,0,normRand(0.4,0.9))})
              polygon({ctx:ctx,pts:[q0,q1],
                xof:xof,yof:yof,fil:false,col:hsv(0,0,0,normRand(0.4,0.9))})
      
            }
          }
          stroke({ctx:ctx,pts:P,xof:xof,yof:yof,col:rgba(0,0,0,0.3)})
        }else if (vei[0] == 2){
          for (var i = 1; i < P.length-vei[1]; i+=vei[2]){
            polygon({ctx:ctx,pts:[P[i],L[i+vei[1]]],
              xof:xof,yof:yof,fil:false,col:hsv(0,0,0,normRand(0.4,0.9))})
            polygon({ctx:ctx,pts:[P[i],R[i+vei[1]]],
              xof:xof,yof:yof,fil:false,col:hsv(0,0,0,normRand(0.4,0.9))})
          }
          stroke({ctx:ctx,pts:P,xof:xof,yof:yof,col:rgba(0,0,0,0.3)})
        }
      
        stroke({ctx:ctx,pts:L,xof:xof,yof:yof,col:rgba(120,100,0,0.3)})
        stroke({ctx:ctx,pts:R,xof:xof,yof:yof,col:rgba(120,100,0,0.3)})
        return P
      }
     
}