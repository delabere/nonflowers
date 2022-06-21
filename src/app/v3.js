export class v3 {


    static forward = [0,0,1];
    static up = [0,1,0];
    static right = [1,0,0];
    static zero = [0,0,0];
    static rad2deg = 180/Math.PI
    static deg2rad = Math.PI/180

    constructor() {

    }

    static rad(x){return x * v3.deg2rad}
    static deg(x){return x * v3.rad2deg}
    
    static rotvec(vec,axis,th){
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
    static roteuler(vec,rot){
      if (rot.z != 0) {vec = v3.rotvec(vec,v3.forward,rot.z)}
      if (rot.x != 0) {vec = v3.rotvec(vec,v3.right,rot.x)}
      if (rot.y != 0) {vec = v3.rotvec(vec,v3.up,rot.y)}
      return vec
    }
  
    static scale(vec,p){
      return [vec.x*p,vec.y*p,vec.z*p]
    }
    static copy(v0){
      return [v0.x,v0.y,v0.z]
    }
    static add(v0,v){
      return [v0.x+v.x,v0.y+v.y,v0.z+v.z]
    }
    static subtract(v0,v){
      return [v0.x-v.x,v0.y-v.y,v0.z-v.z]
    }
    static mag(v){
      return Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z)
    }
    static normalize(v){
      let p = 1/v3.mag(v)
      return [v.x*p,v.y*p,v.z*p]
    }
    static dot(u,v){
      return u.x*v.x + u.y*v.y + u.z*v.z 
    }
    static cross(u,v){
      return [
        u.y*v.z - u.z*v.y,
        u.z*v.x - u.x*v.z,
        u.x*v.y - u.y*v.x
      ]
    }
    static angcos(u,v){
      return v3.dot(u,v)/(v3.mag(u)*v3.mag(v))
    }
    static ang(u,v){
      return Math.acos(v3.angcos(u,v))
    }
    static toeuler(v0){
      let ep = 5
      let ma = 2*Math.PI
      let mr = [0,0,0]
      let cnt = 0
      for (var x = -180; x < 180; x+=ep){
        for (var y = -90; y < 90; y+=ep){
          cnt ++;
          var r = [v3.rad(x),v3.rad(y),0]
          var v = v3.roteuler([0,0,1],r)
          var a = v3.ang(v0,v)
          if (a < v3.rad(ep)){
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
    static lerp(u,v,p){
      return [
        u.x*(1-p)+v.x*p,
        u.y*(1-p)+v.y*p,
        u.z*(1-p)+v.z*p,
      ]
    }
  }