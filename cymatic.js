/**
 * Created by Fransic on 7/19/2017.
 */

var cymatic = function(sources,power,coordinates,vectors){
    this.srcs = sources;
    this.vals = coordinates;
    this.damp = power;
    this.vecs = vectors;
    this.final = [];
}

cymatic.prototype.calculate = function() {
    for(var i=0; i<this.srcs.length;i++){
        this.srcs[i].char02 = 1/this.srcs.length;
        this.srcs[i].wave(this.damp,2);
    }
    this.totals = this.srcs[0].outPut;
    for(var i=1; i<this.srcs.length;i++){
        this.srcs[i].char02 = 1/this.srcs.length;
        this.totals = vectorAdd(this.totals,this.srcs[i].outPut);
    }
}

cymatic.prototype.applyTo = function(){
    this.calculate();
    for(var i=0;i<this.vals.length;i++){
        this.final.push(vectorScale(this.vecs[i],this.totals[i]));
    }
}

