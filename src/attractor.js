/**
 * Created by Pater on 3/28/2017.
 */

var Attractor = function (input) {

    var view = this;

    view.range = input.range;

    view.position = input.position;

    if(input.fallOffType == "linear") view.fallOff = view.linear;
    if(input.fallOffType == "cos") view.fallOff = view.cos;
    if(input.fallOffType == "bellCurve") view.fallOff = view.bellCurve;
    if(input.fallOffType == "power") view.fallOff = view.power;
    if(input.fallOffType == "custom") view.fallOff = input.customFallOff;

};

Attractor.prototype.linear = function (x,y,z) {

    var view = this;

    var distance = Math.sqrt(Math.pow(x-view.position[0],2)+Math.pow(y-view.position[1],2)+Math.pow(z-view.position[2],2));

    var blendValue = 1-distance/view.range;

    blendValue = blendValue > 1 ? 1:blendValue;
    blendValue = blendValue < 0 ? 0:blendValue;

    return blendValue;

};


Attractor.prototype.cos = function (x,y,z) {

    var view = this;

    var distance = Math.sqrt(Math.pow(x-view.position[0],2)+Math.pow(y-view.position[1],2)+Math.pow(z-view.position[2],2));

    var blendValue = Math.cos(distance/view.range*Math.pi/2);

    blendValue = blendValue > 1 ? 1:blendValue;
    blendValue = blendValue < 0 ? 0:blendValue;

    return blendValue;
};



Attractor.prototype.bellCurve = function (x,y,z,dev) {

    var view = this;

    var distance = Math.sqrt(Math.pow(x-view.position[0],2)+Math.pow(y-view.position[1],2)+Math.pow(z-view.position[2],2));

    var blendValue = Math.pow(-1*Math.pow(distance,2)/(2*Math.pow(dev,2)),Math.E)/(dev*Math.pow(2*Math.pi,.5));

    if(distance>dev*3){
        blendValue = 0;
    }

    blendValue = blendValue > 1 ? 1:blendValue;
    blendValue = blendValue < 0 ? 0:blendValue;

    return blendValue;

};


Attractor.prototype.power = function (x,y,z,a) {

    var view = this;

    var distance = Math.sqrt(Math.pow(x-view.position[0],2)+Math.pow(y-view.position[1],2)+Math.pow(z-view.position[2],2));

    var blendValue = Math.pow(distance/view.range,a);

    blendValue = blendValue > 1 ? 1:blendValue;
    blendValue = blendValue < 0 ? 0:blendValue;

    return blendValue;

};
