/**
 * Created by Fransic on 7/19/2017.
 */

var srcPt = function(pt,character01,character02,effected,RANGE){
    this.source = pt;
    this.char01 = character01;
    this.char02 = character02;
    this.points = effected;
    this.opacity = .5;
    this.thres = RANGE;
}

srcPt.prototype.distances = function(){
    this.dists = [];
    for(var i=0; i<this.points.length; i++){
        var vec = vectorDiff(this.points[i],this.source);
        var mag = vectorMag(vec);
        this.dists.push(mag);
    }
}

srcPt.prototype.wave = function (power,limit) {
    this.distances();
    this.outPut = [];
    for(var i=0; i<this.points.length;i++){
        var amp = (1*this.thres/Math.pow(this.dists[i],power));
        if(amp>limit){
            amp = limit;
        }
        this.outPut.push(amp*this.char02*Math.sin(this.char01*Math.PI/180*this.dists[i]));
    }
}

srcPt.prototype.attractor = function () {
    this.distances();
    this.outPut = [];
    for(var i=0; i<this.points.length;i++){
        if(this.dists[i]<this.char01) {
            this.outPut.push(this.char01 / this.dists[i]);
        }
    }
}

srcPt.prototype.repulse = function () {
    this.distances();
    this.outPut = [];
    for(var i=0; i<this.points.length;i++){
        if(this.dists[i]<this.char01) {
            this.outPut.push(1 - this.char01 / this.dists[i]);
        }
    }
}

srcPt.prototype.emboss = function() {
    this.distances();
    this.outPut = [];
    for(var i=0;i<this.points.length;i++){
        if(this.dists[i]<this.char02*3){
            this.outPut.push(this.char01*bellCrv(this.dists[i],this.char02));
        }
    }
}


srcPt.prototype.drawPos = function () {

    var view = this;

    view.geometry = new THREE.SphereBufferGeometry( 5, 32, 32 );
    view.material = new THREE.MeshPhongMaterial( {color: 0xffffff} );
    view.material.transparent = true;
    view.material.opacity = view.opacity;
    view.sphere = new THREE.Mesh( view.geometry, view.material );

    var pt = view.source;

    view.sphere.position.set(pt[0],pt[1],pt[2]);


}


function bellCrv(x,sd){
    var coef = 1/(sd*Math.pow(2*Math.PI,.5));
    var power = -1*Math.pow(x,2)/(2*Math.pow(sd,2));
    var y = coef*Math.pow(Math.E,power);
    return y
}