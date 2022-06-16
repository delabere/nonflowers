// Nonflowers
// Procedurally generated paintings of nonexistent flowers.
// (c) Lingdong Huang 2018


// index arrays with .x, .y, .z and negative indices
Object.defineProperty(Array.prototype, "x", {
    get: function () {return this[0]},
    set: function (n) {this[0] = n},
});
Object.defineProperty(Array.prototype, "y", {
    get: function () {return this[1]},
    set: function (n) {this[1] = n},
});
Object.defineProperty(Array.prototype, "z", {
    get: function () {return this[2]},
    set: function (n) {this[2] = n},
});
for (var i = 1; i < 4; i++){
  function f(i){
    Object.defineProperty(Array.prototype, "-"+i, {
        get: function () {return this[this.length-i]},
        set: function (n) {this[this.length-i] = n},
    });
  }
  f(i)
}

// math constants
var rad2deg = 180/Math.PI
var deg2rad = Math.PI/180
var PI = Math.PI
var sin = Math.sin
var cos = Math.cos
var abs = Math.abs
var pow = Math.pow

var CANVAS_WIDTH;
var CANVAS_HEIGHT;

const FILTERING = false;

function rad(x){return x * deg2rad}
function deg(x){return x * rad2deg}

// seedable pseudo random number generator
var Prng = new function(){
  this.s = 1234
  this.p = 999979
  this.q = 999983
  this.m = this.p*this.q
  this.hash = function(x){
    var y = window.btoa(JSON.stringify(x)); var z = 0
    for (var i = 0; i < y.length; i++){
      z += y.charCodeAt(i)*Math.pow(128,i)}
    return z
  }
  this.seed = function(x){
    if (x == undefined) {x = (new Date()).getTime()}
    var y = 0; var z = 0;
    function redo(){y = (Prng.hash(x)+z) % Prng.m; z+=1}
    while (y % Prng.p == 0 || y % Prng.q == 0 || y == 0 || y == 1){redo()}
    Prng.s = y
    console.log(["int seed",Prng.s])
    for (var i = 0; i < 10; i++){Prng.next();}
  }
  this.next = function(){
    Prng.s = (Prng.s * Prng.s) % Prng.m
    return Prng.s/Prng.m
  }
  this.test = function(f){
    var F = f || function() {return Prng.next()}
    var t0 = (new Date()).getTime()
    var chart = [0,0,0,0,0, 0,0,0,0,0]
    for (var i = 0; i < 10000000; i++){
      chart[Math.floor(F()*10)] += 1}
    console.log(chart)
    console.log("finished in "+((new Date()).getTime()-t0))
    return chart;
  }
}
Math.oldRandom = Math.random
Math.random = function(){return Prng.next()}
Math.seed = function(x){return Prng.seed(x)}

// parse url arguments
function parseArgs(key2f){
  var par = window.location.href.split("?")[1]
  if (par == undefined){return}
  par = par.split("&")
  for (var i = 0; i < par.length; i++){
    var e = par[i].split("=")
    try{
      key2f[e[0]](e[1])
    }catch(e){
      console.log(e)
    }
  }
}

function newSeed() {
  SEED = (""+(new Date()).getTime())
  parseArgs({seed:function(x){SEED = (x==""?SEED:x)}})
  Math.seed(SEED);
  console.log('seed', SEED)
  return SEED;
}
// newSeed();

//perlin noise adapted from p5.js

var Noise = new function(){
  var PERLIN_YWRAPB = 4; var PERLIN_YWRAP = 1<<PERLIN_YWRAPB;
  var PERLIN_ZWRAPB = 8; var PERLIN_ZWRAP = 1<<PERLIN_ZWRAPB;
  var PERLIN_SIZE = 4095;
  var perlin_octaves = 4;var perlin_amp_falloff = 0.5;
  var scaled_cosine = function(i) {return 0.5*(1.0-Math.cos(i*Math.PI));};
  var perlin;
  // this.noise = quickNoise.noise;
  
  this.noise = function(x, y = 0, z = 0) {
  if (perlin == null) {
    perlin = new Array(PERLIN_SIZE + 1);
    for (let i = 0; i < PERLIN_SIZE + 1; i++) {
      perlin[i] = Math.random();
    }
  }

  if (x < 0) {
    x = -x;
  }
  if (y < 0) {
    y = -y;
  }
  if (z < 0) {
    z = -z;
  }

  let xi = Math.floor(x),
    yi = Math.floor(y),
    zi = Math.floor(z);
  let xf = x - xi;
  let yf = y - yi;
  let zf = z - zi;
  let rxf, ryf;

  let r = 0;
  let ampl = 0.5;

  let n1, n2, n3;

  for (let o = 0; o < perlin_octaves; o++) {
    let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);

    rxf = scaled_cosine(xf);
    ryf = scaled_cosine(yf);

    n1 = perlin[of & PERLIN_SIZE];
    n1 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n1);
    n2 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
    n2 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
    n1 += ryf * (n2 - n1);

    of += PERLIN_ZWRAP;
    n2 = perlin[of & PERLIN_SIZE];
    n2 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n2);
    n3 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
    n3 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
    n2 += ryf * (n3 - n2);

    n1 += scaled_cosine(zf) * (n2 - n1);

    r += n1 * ampl;
    ampl *= perlin_amp_falloff;
    xi <<= 1;
    xf *= 2;
    yi <<= 1;
    yf *= 2;
    zi <<= 1;
    zf *= 2;

    if (xf >= 1.0) {
      xi++;
      xf--;
    }
    if (yf >= 1.0) {
      yi++;
      yf--;
    }
    if (zf >= 1.0) {
      zi++;
      zf--;
    }
  }
  return r;
};
  //function(x,y,z) {
  //   y = y || 0; z = z || 0;
  //   if (perlin == null) {
  //     perlin = new Array(PERLIN_SIZE + 1);
  //     for (var i = 0; i < PERLIN_SIZE + 1; i++) {
  //       perlin[i] = Math.random();
  //     }
  //   }
  //   if (x<0) { x=-x; } if (y<0) { y=-y; } if (z<0) { z=-z; }
  //   var xi=Math.floor(x), yi=Math.floor(y), zi=Math.floor(z);
  //   var xf = x - xi; var yf = y - yi; var zf = z - zi;
  //   var rxf, ryf;
  //   var r=0; var ampl=0.5;
  //   var n1,n2,n3;
  //   for (var o=0; o<perlin_octaves; o++) {
  //     var of=xi+(yi<<PERLIN_YWRAPB)+(zi<<PERLIN_ZWRAPB);
  //     rxf = scaled_cosine(xf); ryf = scaled_cosine(yf);
  //     n1  = perlin[of&PERLIN_SIZE];
  //     n1 += rxf*(perlin[(of+1)&PERLIN_SIZE]-n1);
  //     n2  = perlin[(of+PERLIN_YWRAP)&PERLIN_SIZE];
  //     n2 += rxf*(perlin[(of+PERLIN_YWRAP+1)&PERLIN_SIZE]-n2);
  //     n1 += ryf*(n2-n1);
  //     of += PERLIN_ZWRAP;
  //     n2  = perlin[of&PERLIN_SIZE];
  //     n2 += rxf*(perlin[(of+1)&PERLIN_SIZE]-n2);
  //     n3  = perlin[(of+PERLIN_YWRAP)&PERLIN_SIZE];
  //     n3 += rxf*(perlin[(of+PERLIN_YWRAP+1)&PERLIN_SIZE]-n3);
  //     n2 += ryf*(n3-n2);
  //     n1 += scaled_cosine(zf)*(n2-n1);
  //     r += n1*ampl;
  //     ampl *= perlin_amp_falloff;
  //     xi<<=1; xf*=2; yi<<=1; yf*=2; zi<<=1; zf*=2;
  //     if (xf>=1.0) { xi++; xf--; }
  //     if (yf>=1.0) { yi++; yf--; }
  //     if (zf>=1.0) { zi++; zf--; }
  //   }
  //   return r;
  // };
  

}
// distance between 2 coordinates in 2D
function distance(p0,p1){
  return Math.sqrt(Math.pow(p0[0]-p1[0],2) + Math.pow(p0[1]-p1[1],2));
}
// map float from one range to another
function mapval(value,istart,istop,ostart,ostop){
    return ostart + (ostop - ostart) * ((value - istart)*1.0 / (istop - istart))
}
// random element from array
function randChoice(arr) {
  return arr[Math.floor(arr.length * Math.random())];
}
// normalized random number
function normRand(m,M){
  return mapval(Math.random(),0,1,m,M);
}
// weighted randomness
function wtrand(func){
  var x = Math.random()
  var y = Math.random()
  if (y<func(x)){
    return x
  }else{
    return wtrand(func)
  }
}
// gaussian randomness
function randGaussian(){
  return wtrand(function(x){return Math.pow(Math.E,-24*Math.pow(x-0.5,2))})*2-1
}
// sigmoid curve
function sigmoid(x,k){
  k = (k != undefined) ? k : 10
  return 1/(1+Math.exp(-k*(x-0.5)))
}
// pseudo bean curve
function bean(x){
  return pow(0.25-pow(x-0.5,2),0.5)*(2.6+2.4*pow(x,1.5))*0.54
}
// interpolate between square and circle
var squircle = function(r,a){
  return function(th){
    while (th > PI/2){
      th -= PI/2
    }
    while (th < 0){
      th += PI/2
    }
    return r*pow(1/(pow(cos(th),a)+pow(sin(th),a)),1/a)
  }
}
// mid-point of an array of points
function midPt(){
  var plist = (arguments.length == 1) ? 
    arguments[0] : Array.apply(null, arguments)
  return plist.reduce(function(acc,v){
    return [v[0]/plist.length+acc[0],
            v[1]/plist.length+acc[1],
            v[2]/plist.length+acc[2]]
  },[0,0,0])
}
// rational bezier curve
function bezmh(P, w){
  w = (w == undefined) ? 1 : w
  if (P.length == 2){
    P = [P[0],midPt(P[0],P[1]),P[1]];
  }
  var plist = [];
  for (var j = 0; j < P.length-2; j++){
    var p0; var p1; var p2;
    if (j == 0){p0 = P[j];}else{p0 = midPt(P[j],P[j+1]);}
    p1 = P[j+1];
    if (j == P.length-3){p2 = P[j+2];}else{p2 = midPt(P[j+1],P[j+2]);}
    var pl = 20;
    for (var i = 0; i < pl+(j==P.length-3); i+= 1){
      var t = i/pl;
      var u = (Math.pow (1 - t, 2) + 2 * t * (1 - t) * w + t * t);
      plist.push([
        (Math.pow(1-t,2)*p0[0]+2*t*(1-t)*p1[0]*w+t*t*p2[0])/u,
        (Math.pow(1-t,2)*p0[1]+2*t*(1-t)*p1[1]*w+t*t*p2[1])/u,
        (Math.pow(1-t,2)*p0[2]+2*t*(1-t)*p1[2]*w+t*t*p2[2])/u]);
    }
  }
  return plist;
}
// tools for vectors in 3d
v3 = new function(){
  this.forward = [0,0,1]
  this.up = [0,1,0]
  this.right = [1,0,0]
  this.zero = [0,0,0]
  
  this.rotvec = function(vec,axis,th){
    var [l,m,n] = axis
    var [x,y,z] = vec
    var [costh,sinth] = [Math.cos(th), Math.sin(th)]
    var mat={}
    mat[11]= l*l *(1-costh) +costh
    mat[12]= m*l *(1-costh) -n*sinth
    mat[13]= n*l *(1-costh) +m*sinth

    mat[21]= l*m *(1-costh) +n*sinth
    mat[22]= m*m *(1-costh) +costh
    mat[23]= n*m *(1-costh) -l*sinth

    mat[31]= l*n *(1-costh) -m*sinth
    mat[32]= m*n *(1-costh) +l*sinth
    mat[33]= n*n *(1-costh) +costh
    return [
      x*mat[11] + y*mat[12] + z*mat[13],
      x*mat[21] + y*mat[22] + z*mat[23],
      x*mat[31] + y*mat[32] + z*mat[33],
    ]
  }
  this.roteuler = function(vec,rot){
    if (rot.z != 0) {vec = v3.rotvec(vec,v3.forward,rot.z)}
    if (rot.x != 0) {vec = v3.rotvec(vec,v3.right,rot.x)}
    if (rot.y != 0) {vec = v3.rotvec(vec,v3.up,rot.y)}
    return vec
  }

  this.scale = function(vec,p){
    return [vec.x*p,vec.y*p,vec.z*p]
  }
  this.copy = function(v0){
    return [v0.x,v0.y,v0.z]
  }
  this.add = function(v0,v){
    return [v0.x+v.x,v0.y+v.y,v0.z+v.z]
  }
  this.subtract = function(v0,v){
    return [v0.x-v.x,v0.y-v.y,v0.z-v.z]
  }
  this.mag = function(v){
    return Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z)
  }
  this.normalize = function(v){
    p = 1/mag(v)
    return [v.x*p,v.y*p,v.z*p]
  }
  this.dot = function(u,v){
    return u.x*v.x + u.y*v.y + u.z*v.z 
  }
  this.cross = function(u,v){
    return [
      u.y*v.z - u.z*v.y,
      u.z*v.x - u.x*v.z,
      u.x*v.y - u.y*v.x
    ]
  }
  this.angcos = function(u,v){
    return v3.dot(u,v)/(v3.mag(u)*v3.mag(v))
  }
  this.ang = function(u,v){
    return Math.acos(v3.angcos(u,v))
  }
  this.toeuler = function(v0){
    var ep = 5
    var ma = 2*PI
    var mr = [0,0,0]
    var cnt = 0
    for (var x = -180; x < 180; x+=ep){
      for (var y = -90; y < 90; y+=ep){
        cnt ++;
        var r = [rad(x),rad(y),0]
        var v = v3.roteuler([0,0,1],r)
        var a = v3.ang(v0,v)
        if (a < rad(ep)){
          return r
        }
        if (a < ma){
          ma = a
          mr = r
        }
      }
    }
    return mr
  }
  this.lerp = function(u,v,p){
    return [
      u.x*(1-p)+v.x*p,
      u.y*(1-p)+v.y*p,
      u.z*(1-p)+v.z*p,
    ]
  }
}
// rgba to css color string
function rgba(r,g,b,a){
  r = (r != undefined) ? r:255;
  g = (g != undefined) ? g:r;
  b = (b != undefined) ? b:g;
  a = (a != undefined) ? a:1.0;
  return "rgba("+Math.floor(r)+","+Math.floor(g)+","+Math.floor(b)+","+a.toFixed(3)+")"
}
// hsv to css color string
function hsv(h,s,v,a){
    var c = v*s
    var x = c*(1-abs((h/60)%2-1))
    var m = v-c
    var [rv,gv,bv] = ([[c,x,0],[x,c,0],[0,c,x],
                       [0,x,c],[x,0,c],[c,0,x]])[Math.floor(h/60)]
    var [r,g,b] = [(rv+m)*255,(gv+m)*255,(bv+m)*255]
    return rgba(r,g,b,a)
}
// polygon for HTML canvas
function polygon(args){
  var args =(args != undefined) ? args : {};
  var ctx = (args.ctx != undefined) ? args.ctx : CTX;
  var xof = (args.xof != undefined) ? args.xof : 0;  
  var yof = (args.yof != undefined) ? args.yof : 0;  
  var pts = (args.pts != undefined) ? args.pts : [];
  var col = (args.col != undefined) ? args.col : rgba(54,69,79,1);
  var fil = (args.fil != undefined) ? args.fil : true;
  var str = (args.str != undefined) ? args.str : !fil;
  var lineWidth = (args.lineWidth != undefined) ? args.lineWidth : 0.2;

  ctx.beginPath();
  if (pts.length > 0){
    ctx.moveTo(pts[0][0]+xof,pts[0][1]+yof);
  }
  for (var i = 1; i < pts.length; i++){
    ctx.lineTo(pts[i][0]+xof,pts[i][1]+yof);
  }
  if (fil){
    ctx.fillStyle = col;
    ctx.fill();
  }
  if (str){
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = "round";
    ctx.strokeStyle = col;
    ctx.stroke();
  }
}
// lerp hue wrapping around 360 degs
function lerpHue(h0,h1,p){
  var methods = [
    [abs(h1-h0),     mapval(p,0,1,h0,h1)],
    [abs(h1+360-h0), mapval(p,0,1,h0,h1+360)],
    [abs(h1-360-h0), mapval(p,0,1,h0,h1-360)]
   ]
  methods.sort((x,y)=>(x[0]-y[0]))
  return (methods[0][1]+720)%360
}
// get rotation at given index of a poly-line
function grot(P,ind){
  var d = v3.subtract(P[ind],P[ind-1])
  return v3.toeuler(d)
}
// generate 2d tube shape from list of points
function tubify(args){
  var args = (args != undefined) ? args : {};
  var pts = (args.pts != undefined) ? args.pts : [];
  var wid = (args.wid != undefined) ? args.wid : (x)=>(10);
  vtxlist0 = []
  vtxlist1 = []
  vtxlist = []
  for (var i = 1; i < pts.length-1; i++){
    var w = wid(i/pts.length)
    var a1 = Math.atan2(pts[i][1]-pts[i-1][1],pts[i][0]-pts[i-1][0]);
    var a2 = Math.atan2(pts[i][1]-pts[i+1][1],pts[i][0]-pts[i+1][0]);
    var a = (a1+a2)/2;
    if (a < a2){a+=PI}
    vtxlist0.push([pts[i][0]+w*cos(a),(pts[i][1]+w*sin(a))]);
    vtxlist1.push([pts[i][0]-w*cos(a),(pts[i][1]-w*sin(a))]);
  }
  var l = pts.length-1
  var a0 = Math.atan2(pts[1][1]-pts[0][1],pts[1][0]-pts[0][0]) - Math.PI/2;
  var a1 = Math.atan2(pts[l][1]-pts[l-1][1],pts[l][0]-pts[l-1][0]) - Math.PI/2;
  var w0 = wid(0)
  var w1 = wid(1)
  vtxlist0.unshift([pts[0][0]+w0*Math.cos(a0),(pts[0][1]+w0*Math.sin(a0))])
  vtxlist1.unshift([pts[0][0]-w0*Math.cos(a0),(pts[0][1]-w0*Math.sin(a0))])
  vtxlist0.push([pts[l][0]+w1*Math.cos(a1),(pts[l][1]+w1*Math.sin(a1))])
  vtxlist1.push([pts[l][0]-w1*Math.cos(a1),(pts[l][1]-w1*Math.sin(a1))])
  return [vtxlist0,vtxlist1]
}
// line work with weight function
function stroke(args){
  var noiseScale = 10; // 10
  var args = (args != undefined) ? args : {};
  var pts = (args.pts != undefined) ? args.pts : [];
  var ctx = (args.ctx != undefined) ? args.ctx : CTX;
  var xof = (args.xof != undefined) ? args.xof : 0;
  var yof = (args.yof != undefined) ? args.yof : 0;
  var col = (args.col != undefined) ? args.col : "black";
  var wid = (args.wid != undefined) ? args.wid :
    (x)=>(1*sin(x*PI)*mapval(Noise.noise(x*noiseScale),0,1,0.5,1));

  var [vtxlist0,vtxlist1] = tubify({pts:pts,wid:wid})

  polygon({pts:vtxlist0.concat(vtxlist1.reverse()),
    ctx:ctx,fil:true,col:col,xof:xof,yof:yof})
  return [vtxlist0,vtxlist1]
}
// generate paper texture
// function paper(args){
//   var args =(args != undefined) ? args : {};
//   var col = (args.col != undefined) ? args.col : [0.98,0.91,0.74];
//   var tex = (args.tex != undefined) ? args.tex : 1;
//   var spr = (args.spr != undefined) ? args.spr : 1;

//   var canvas = document.createElement("canvas");
//   canvas.width = 256; //512;
//   canvas.height = 256; //512;
//   var ctx = canvas.getContext("2d");
//   var reso = 256;
//   for (var i = 0; i < reso/2+1; i++){
//     for (var j = 0; j < reso/2+1; j++){
//       var c = (255-Noise.noise(i*0.1,j*0.1)*tex*0.5)
//       c -= Math.random()*tex;
//       var r = (c*col[0])
//       var g = (c*col[1])
//       var b = (c*col[2])
//       if (Noise.noise(i*0.04,j*0.04,2)*Math.random()*spr>0.7 
//        || Math.random()<0.005*spr){
//         var r = (c*0.7)
//         var g = (c*0.5)
//         var b = (c*0.2)
//       }
//       ctx.fillStyle = rgba(r,g,b);
//       ctx.fillRect(i,j,1,1);
//       ctx.fillRect(reso-i,j,1,1);
//       ctx.fillRect(i,reso-j,1,1);
//       ctx.fillRect(reso-i,reso-j,1,1);
//     }
//   }
//   return canvas
// }
// generate leaf-like structure
function leaf(args){
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

// generate stem-like structure
function stem(args){
  var args =(args != undefined) ? args : {};
  var ctx = (args.ctx != undefined) ? args.ctx : CTX;  
  var xof = (args.xof != undefined) ? args.xof : 0;  
  var yof = (args.yof != undefined) ? args.yof : 0;  
  var rot = (args.rot != undefined) ? args.rot : [PI/2,0,0];
  var len = (args.len != undefined) ? args.len : 400;
  var seg = (args.seg != undefined) ? args.seg : 40;
  var wid = (args.wid != undefined) ? args.wid : (x) => (6);
  var col = (args.col != undefined) ? args.col : 
    {min:[250,0.2,0.4,1],max:[250,0.3,0.6,1]}
  var ben = (args.ben != undefined) ? args.ben : 
    (x) => ([normRand(-10,10),0,normRand(-5,5)])


  // console.log(xof, yof, rot, len, seg, wid, col, ben)

  var disp = v3.zero
  var crot = v3.zero
  var P = [disp]
  var ROT = [crot]

  var orient = (v) => (v3.roteuler(v,rot));
  
  for (var i = 0; i < seg; i++){
    var p = i/(seg-1)
    crot= v3.add(crot,v3.scale(ben(p),1/seg))
    disp = v3.add(disp,orient(v3.roteuler([0,0,len/seg],crot)))
    ROT.push(crot);
    P.push(disp);
  }
  var [L,R] = tubify({pts:P,wid:wid})
  var wseg = 4;
  var noiseScale = 10;
  for (var i = 1; i < P.length; i++){
    for (var j = 1; j < wseg; j++){
      var m = (j-1)/(wseg-1);
      var n = j/(wseg-1);
      var p = i/(P.length-1)

      var p0 = v3.lerp(L[i-1],R[i-1],m)
      var p1 = v3.lerp(L[i],R[i],m)

      var p2 = v3.lerp(L[i-1],R[i-1],n)
      var p3 = v3.lerp(L[i],R[i],n)

      var lt = n/p
      var h = lerpHue(col.min[0],col.max[0],lt)*mapval(Noise.noise(p*noiseScale,m*noiseScale,n*noiseScale),0,1,0.5,1)
      var s = mapval(lt,0,1,col.max[1],col.min[1])*mapval(Noise.noise(p*noiseScale,m*noiseScale,n*noiseScale),0,1,0.5,1)
      var v = mapval(lt,0,1,col.min[2],col.max[2])*mapval(Noise.noise(p*noiseScale,m*noiseScale,n*noiseScale),0,1,0.5,1)
      var a = mapval(lt,0,1,col.min[3],col.max[3])

      polygon({ctx:ctx,pts:[p0,p1,p3,p2],
        xof:xof,yof:yof,fil:true,str:true,col:hsv(h,s,v,a)})

    }
  }
  stroke({ctx:ctx,pts:L,xof:xof,yof:yof,col:rgba(0,0,0,0.5)})
  stroke({ctx:ctx,pts:R,xof:xof,yof:yof,col:rgba(0,0,0,0.5)})
  return P
}


function cap(args) {
  var args =(args != undefined) ? args : {};
  var ctx = (args.ctx != undefined) ? args.ctx : CTX;  
  var xof = (args.xof != undefined) ? args.xof : 0;  
  var yof = (args.yof != undefined) ? args.yof : 0;  
  var rot = (args.rot != undefined) ? args.rot : [PI/2,0,0];
  var len = (args.len != undefined) ? args.len : 400;
  var seg = (args.seg != undefined) ? args.seg : 40;
  var wid = (args.wid != undefined) ? args.wid : (x) => (6);
  var col = (args.col != undefined) ? args.col : 
    {min:[250,0.2,0.4,1],max:[250,0.3,0.6,1]}
  var ben = (args.ben != undefined) ? args.ben : 
    (x) => ([normRand(-10,10),0,normRand(-5,5)])

    var disp = v3.zero
    var crot = v3.zero
    var P = [disp]
    var ROT = [crot]
  
    var orient = (v) => (v3.roteuler(v,rot));
     
    for (var i = 0; i < seg; i++){
      var p = i/(seg-1)
      crot= v3.add(crot,v3.scale(ben(p),1/seg))
      disp = v3.add(disp,orient(v3.roteuler([0,0,len/seg],crot)))
      ROT.push(crot);
      P.push(disp);
    }
    var [L,R] = tubify({pts:P,wid:wid})
    var wseg = 2;
    var noiseScale = 5;
    for (var i = 1; i < P.length; i++){
      for (var j = 1; j < wseg; j++){
        var m = (j-1)/(wseg-1);
        var n = j/(wseg-1);
        var p = i/(P.length-1)
  
        var p0 = v3.lerp(L[i-1],R[i-1],m)
        var p1 = v3.lerp(L[i],R[i],m)
  
        var p2 = v3.lerp(L[i-1],R[i-1],n)
        var p3 = v3.lerp(L[i],R[i],n)
  
        var lt = n/p

        //color
        var h = lerpHue(col.min[0],col.max[0],lt)*mapval(Noise.noise(p*noiseScale,m*noiseScale,n*noiseScale),0,1,0.5,1)
        var s = mapval(lt,0,1,col.max[1],col.min[1])*mapval(Noise.noise(p*noiseScale,m*noiseScale,n*noiseScale),0,1,0.5,1)
        var v = mapval(lt,0,1,col.min[2],col.max[2])*mapval(Noise.noise(p*noiseScale,m*noiseScale,n*noiseScale),0,1,0.5,1)
        var a = mapval(lt,0,1,col.min[3],col.max[3])
  

        polygon({ctx:ctx,pts:[p0,p1,p3,p2],
          xof:xof,yof:yof,fil:true,str:true,col:hsv(h,s,v,a)})
      }
    }

    stroke({ctx:ctx,pts:L,xof:xof,yof:yof,col:rgba(0,0,0,0.5)})
    stroke({ctx:ctx,pts:R,xof:xof,yof:yof,col:rgba(0,0,0,0.5)})
    return P
}

// generate fractal-like branches
function branch(args){
  var args =(args != undefined) ? args : {};
  var ctx = (args.ctx != undefined) ? args.ctx : CTX;  
  var xof = (args.xof != undefined) ? args.xof : 0;  
  var yof = (args.yof != undefined) ? args.yof : 0;  
  var rot = (args.rot != undefined) ? args.rot : [PI/2,0,0];
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
    jnt.push([Math.floor(Math.random()*seg),normRand(-1,1)])
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
      return wid*(2+7*(1-x)*mapval(Noise.noise(x*noiseScale),0,1,0.5,1))
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
      return [0,normRand(-5,5),0]
    }
  }

  var P = stem({ctx:ctx,
    xof:xof,yof:yof,
    rot:rot,
    len:len,seg:seg,
    wid:wfun,
    col:col,
    ben:bfun})
  
  var child = []
  if (dep > 0 && wid > 0.1){
    for (var i = 0; i < frk*Math.random(); i++){
      var ind = Math.floor(normRand(1,P.length))

      var r = grot(P,ind)
      var L = branch({ctx:ctx,
        xof:xof+P[ind].x,yof:yof+P[ind].y,
        rot:[r[0]+normRand(-1,1)*PI/6,r[1]+normRand(-1,1)*PI/6,r[2]+normRand(-1,1)*PI/6],
        seg:seg,
        len:len*normRand(0.4,0.6),
        wid:wid*normRand(0.4,0.7),
        twi:twi*0.7,
        dep:dep-1
       })
       //child = child.concat(L.map((v)=>([v[0],[v[1].x+P[ind].x,v[1].y+P[ind].y,v[1].z]])))
       child = child.concat(L)
    }
  }
  return ([[dep,P.map((v)=>([v.x+xof,v.y+yof,v.z]))]]).concat(child)

}

// vizualize parameters into HTML table & canvas
function vizParams(PAR){
  if(document.getElementById("summary") == null)
    return;
    
  var div = document.createElement("div")
  var viz = ""
  var tabstyle = ""
  viz += "<table class='table table-sm table-bordered'><tr><td "+tabstyle+">Summary</td></tr><tr><td "+tabstyle+"><table class='table table-sm table-bordered'><tr>"
  var cnt = 0
  for (var k in PAR){
    if (typeof(PAR[k]) == "number"){
      cnt += 1
      viz += "<td><td "+tabstyle+">"+k+"</td><td "+tabstyle+">"+fmt(PAR[k])+"</td></td>"
      if (cnt % 4 == 0){
        viz += "</tr><tr>"
      }
    }
  }
  viz += "</tr></table>"
  function fmt(a){
    if (typeof(a) == "number"){
      return a.toFixed(3)
    }else if (typeof(a)=="object"){
      var r = "<table class='table table-sm table-bordered'><tr>"
      for (var k in a){
        r += "<td "+tabstyle+">"+fmt(a[k])+"</td>"
      }
      return r+"</tr></table>"
    }
  }
  viz += "<table class='table table-sm  table-borderless'><tr>"
  cnt = 0
  for (var k in PAR){
    if (typeof(PAR[k]) == "object"){

      viz += "<td "+tabstyle+"><table class='table table-sm table-bordered'><tr><td colspan='2' "+tabstyle+">"+k+"</td></tr>"
      
      for (var i in PAR[k]){
        viz += "<tr><td "+tabstyle+">"+i+"</td><td "+tabstyle+">"+fmt(PAR[k][i])+"</td>"
        if (k.includes("olor")){
          viz += "<td "+tabstyle+">"+"<div style='background-color:"+hsv(...PAR[k][i])
              +"'>&nbsp&nbsp&nbsp&nbsp&nbsp</div></td>"
          viz += "<td >" +  Color.fromHSLA(PAR[k][i]).humanName + "</td>"
        }
        viz += "</tr>"
      }
      viz += "</table><td>"

      if (cnt % 2 == 1){
        viz += "</tr><tr>"
      }
      cnt += 1;
    }
  }
  viz += "</tr></table>"
  viz += "</td></tr><tr><td align='left' "+tabstyle+"></td></tr></table>"
  var graphs = document.createElement("div")
  graphs.className = "row";
  // for (var k in PAR){
  //   if (typeof(PAR[k]) == "function"){
  //     var lay = Layer.empty(100, 100)
  //     lay.fillStyle ="charcoal"
  //     for (var i = 0; i < 100; i++){
  //       lay.fillRect(i,100-100*PAR[k](i/100,0.5),2,2)
  //     }
  //     lay.fillText(k,2,10);
  //     lay.canvas.style = "border: 1px solid grey"
  //     var graph = document.createElement("div")
  //     graph.className ="col-md-2"
  //     graph.appendChild(lay.canvas)
  //     graphs.appendChild(graph)
  //   }
  // }
  div.innerHTML += viz
  div.lastChild.lastChild.lastChild.lastChild.appendChild(graphs)
  document.getElementById("summary").appendChild(div)
  

}

// collection of image filters
var Filter = new function(){
  this.wispy = function(x,y,r,g,b,a){
    var n = Noise.noise(x*0.2,y*0.2)
    var m = Noise.noise(x*0.5,y*0.5,2)
    return [r,g*mapval(m,0,1,0.95,1),b*mapval(m,0,1,0.9,1),a*mapval(n,0,1,0.5,1)]
  }
  this.fade = function(x,y,r,g,b,a){
    var n = Noise.noise(x*0.01,y*0.01)
    return [r,g,b,a*Math.min(Math.max(mapval(n,0,1,0,1),0),1)]
  }
}

function createCanvas(w,h) {
  var canvas = document.createElement('canvas');
  // if (typeof OffscreenCanvas !== "undefined") {
  //   var offscreenCanvas = new OffscreenCanvas(w,h);
  // // } else {
  //   canvas.width = w;
  //   canvas.height = h;
  // }
  // var offscreenCanvas =
  // 'OffscreenCanvas' in window
  //   ? canvas.transferControlToOffscreen()
  //   : canvas; 
  //   canvas.style = {width: w, height: h};
    canvas.width = w;
    canvas.height = h;
  return canvas.getContext('2d');
  
}
// canvas context operations
var Layer = new function(){
  this.empty = function(w,h){
    console.log(w, w != undefined, CANVAS_WIDTH)
    w = (w != undefined) ? w : CANVAS_WIDTH;
    h = (h != undefined) ? h : CANVAS_HEIGHT;
    console.log(w,h)
    return createCanvas(w,h)
  }
  this.blit = function(ctx0,ctx1,args){
    var args =(args != undefined) ? args : {};
    var ble = (args.ble != undefined) ? args.ble : "normal";  
    var xof = (args.xof != undefined) ? args.xof : 0;  
    var yof = (args.yof != undefined) ? args.yof : 0;  
    ctx0.globalCompositeOperation = ble;
    ctx0.drawImage(ctx1.canvas,xof,yof)
  }
  this.filter = function(ctx,f){
    var imgd = ctx.getImageData(0, 0, 
      ctx.canvas.width, ctx.canvas.height);
    var pix = imgd.data;
    for (var i = 0, n = pix.length; i < n; i += 4) {
      // var [r,g,b,a] = pix.slice(i,i+4)
      var r = pix[i];
      var g = pix[i+1];
      var b = pix[i+2];
      var a = pix[i+3];


      var x = (i/4)%(ctx.canvas.width)
      var y = Math.floor((i/4)/(ctx.canvas.width))
      var [r1,g1,b1,a1] = f(x,y,r,g,b,a)
        pix[i  ] = r1
        pix[i+1] = g1
        pix[i+2] = b1
        pix[i+3] = a1
    }
    ctx.putImageData(imgd, 0, 0);
  }
  this.border = function(ctx,f){
    var imgd = ctx.getImageData(0, 0, 
      ctx.canvas.width, ctx.canvas.height);
    var pix = imgd.data;
    for (var i = 0, n = pix.length; i < n; i += 4) {
      // var [r,g,b,a] = pix.slice(i,i+4)
      var r = pix[i];
      var g = pix[i+1];
      var b = pix[i+2];
      var a = pix[i+3];
      var x = (i/4)%(ctx.canvas.width)
      var y = Math.floor((i/4)/(ctx.canvas.width))

      var nx = (x/ctx.canvas.width-0.5)*2
      var ny = (y/ctx.canvas.height-0.5)*2
      var theta = Math.atan2(ny,nx)
      var r_ = distance([nx,ny],[0,0])
      var rr_ = f(theta)

      if (r_ > rr_){
        pix[i  ] = 0
        pix[i+1] = 0
        pix[i+2] = 0
        pix[i+3] = 0
      }
    }
    ctx.putImageData(imgd, 0, 0);
  }
  this.boundingBox = function(ctx,alphaThreshold){
    if (alphaThreshold===undefined) alphaThreshold = 15;
    var w=ctx.canvas.width,h=ctx.canvas.height;
    var data = ctx.getImageData(0,0,w,h).data;
    var x,y,minX,minY,maxY,maxY;
    o1: for (y=h;y--;)        for (x=w;x--;)           if (data[(w*y+x)*4+3]>alphaThreshold){ maxY=y; break o1 }
    if (!maxY) return {xmin:0,xmax:w,ymin:0,ymax:h};
    o2: for (x=w;x--;)        for (y=maxY+1;y--;)      if (data[(w*y+x)*4+3]>alphaThreshold){ maxX=x; break o2 }
    o3: for (x=0;x<=maxX;++x) for (y=maxY+1;y--;)      if (data[(w*y+x)*4+3]>alphaThreshold){ minX=x; break o3 }
    o4: for (y=0;y<=maxY;++y) for (x=minX;x<=maxX;++x) if (data[(w*y+x)*4+3]>alphaThreshold){ minY=y; break o4 }
    return {xmin:minX,xmax:maxX,ymin:minY,ymax:maxY};
  }
}

// CTX = Layer.empty();
var BGCANV;

PAPER_COL0 = [1,1,1]//[1,0.99,0.9]
PAPER_COL1 = [1,1,1] //[0.98,0.91,0.74]

// download generated image
function makeDownload(){
  var down = document.createElement('a')
  down.innerHTML = "[Download]"
  down.addEventListener('click', function() {
    var ctx = Layer.empty()
    ctx.drawImage(CTX.canvas,0,0)
    // this.href = ctx.canvas.toDataURL();
    var scope = this
    ctx.canvas.convertToBlob().then( blob => {
      scope.href = blob;
    });
    this.download = SEED + "- " + plant.name;
  }, false);
  document.body.appendChild(down);
  down.click()
  document.body.removeChild(down);
}

// toggle visibility of sub menus
function toggle(x,disp){
  document.getElementById("options-table").className = "d-block";
  disp = (disp != undefined) ? disp : "block"
  var alle = ["summary","settings"]
  var d = document.getElementById(x).style.display;
  for (var i = 0; i < alle.length; i++){
    document.getElementById(alle[i]).style.display = "none"
  }
  if (d == "none"){
    document.getElementById(x).style.display = disp
  }
}

// fill HTML background with paper texture
function makeBG(){
  setTimeout(_makeBG,10)
  function _makeBG(){
    BGCANV = ''
    // paper({col:PAPER_COL0,tex:0,spr:0})
    //var img = BGCANV.toDataURL("image/png");
    //document.body.style.backgroundImage = 'url('+img+')';
  }
}



// generate new plant
var plant;
function generate(plantType){
  newSeed();

  // CANVAS_WIDTH = (document.body.clientWidth < 1200) ? document.body.clientWidth : 300;
  // CANVAS_HEIGHT = Math.floor(window.innerHeight * 0.75);
  CANVAS_WIDTH = 704;
  CANVAS_HEIGHT = 863//Math.floor(window.innerHeight * 0.75);
  CTX = Layer.empty();
  CTX.fillStyle =rgba(255,255,255,0);
  CTX.fillRect(0,0,CTX.canvas.width,CTX.canvas.height)

  var plantType =(plantType !== undefined && plantType !== null) ? plantType : ["flower", "woody"].sort(() => 0.5 - Math.random())[0];
  console.log('generating...', plantType)

  switch(plantType){
    case "flowering":
      plant = new Flowering({ctx:CTX,xof:CANVAS_WIDTH/2,yof:CANVAS_WIDTH,});
      break;
    case "woody":
      plant = new Woody({ctx:CTX,xof:CANVAS_WIDTH/2,yof:CANVAS_HEIGHT - 50,});
      break;
    case "fungus":
      plant = new Fungus({ctx:CTX,xof:CANVAS_WIDTH/2,yof:CANVAS_WIDTH - 50,});
      break;
    default:
      plant = new Flowering({ctx:CTX,xof:CANVAS_WIDTH/2,yof:CANVAS_WIDTH,});
  }

  plant.generate();
}

// reload page with given seed
function reloadWSeed(s){
  var u = window.location.href.split("?")[0]
  window.location.href = u + "?seed=" + s + "&plantType=" + plant.type;
}

function getPlantType() {
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString)
  return urlParams.get('plantType')
}
// initialize everything
function load(){

  makeBG()
  setTimeout(_load,100)
  function _load(){
    generate(getPlantType())
    vizParams(plant.genes)
    displayName()
    document.getElementById("canvas-container").appendChild(CTX.canvas)
    document.getElementById("loader").style.display = "none";
    document.getElementById("content").style.display = "block";
    document.getElementById("inp-seed").value = SEED;
    // document.getElementById("share-twitter").href=
    //   "https://twitter.com/share?url="
    //   +window.location.href
    //   +"&amp;text="+window.location.href+";hashtags=nonflowers";
  }  

  function displayName() {
    var flowerDiv = document.getElementById("flower-name");
    var h5 = document.createElement("h4");
        h5.className = "text-center"
        h5.innerHTML = plant.name;

    flowerDiv.appendChild(h5);

    Object.entries(plant.description).map(obj => {
      var description = document.createElement("p");
      description.className = "text-left my-0";
      description.innerHTML = obj.reverse().join(" ")// [1] + obj[0];
      flowerDiv.appendChild(description);
    })

  }


}

