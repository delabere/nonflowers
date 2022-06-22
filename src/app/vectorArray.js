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
Object.defineProperty(Array.prototype, "h", {
    get: function () {return this[0]},
    set: function (n) {this[0] = n},
});
Object.defineProperty(Array.prototype, "s", {
    get: function () {return this[1]},
    set: function (n) {this[1] = n},
});
Object.defineProperty(Array.prototype, "l", {
    get: function () {return this[2]},
    set: function (n) {this[2] = n},
});
Object.defineProperty(Array.prototype, "a", {
  get: function () {return this[3]},
  set: function (n) {this[3] = n},
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