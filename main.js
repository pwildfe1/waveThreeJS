/**
 * Created by Li on 3/6/2016.
 */



var onLoad = function (object) {

    this.srcPosX01 = 0;
    this.srcPosY01 = 0;
    this.srcPosZ01 = 0;

    this.srcPosX02 = 100;
    this.srcPosY02 = 0;
    this.srcPosZ02 = 100;

    this.freq01 = 50;
    this.freq02 = 100;

    this.srcOpacity = .5;

    this.sources = [];

    this.thres01 = 100;

    this.thres02 = 100;

    this.import();


}



onLoad.prototype.import = function () {

    var view = this;

    var meshLoader = new THREE.OBJLoader();
    meshLoader.load('17.09.20_BasicOutline.obj', function(object){

        view.mesh = object.children[0];

        var material = new THREE.MeshLambertMaterial();
        material.doubleSided = true;

        view.mesh.geometry = new THREE.Geometry().fromBufferGeometry(view.mesh.geometry);
        view.mesh.material = material;

        //scene will only show Object3D not meshes
        scene.add(view.mesh);

        view.start();

    });


};

onLoad.prototype.start = function () {

    this.verts = [];

    for(var i=0; i<this.mesh.geometry.vertices.length;i++){
        this.verts.push([this.mesh.geometry.vertices[i].x,this.mesh.geometry.vertices[i].y,this.mesh.geometry.vertices[i].z]);
    }

    this.wave();

};



onLoad.prototype.wave = function () {

    this.mesh.geometry.verticesNeedsUpdate = true;

    if(this.appliedValues){

        for(var i=0; i<this.mesh.geometry.vertices.length;i++){
            var newVert = vectorDiff(this.verts[i],this.appliedValues[i]);
            this.mesh.geometry.vertices[i].setX(newVert[0]);
            this.mesh.geometry.vertices[i].setY(newVert[1]);
            this.mesh.geometry.vertices[i].setZ(newVert[2]);
        }

    }

    this.sources = [new srcPt([this.srcPosX01,this.srcPosY01,this.srcPosZ01],this.freq01,1,this.verts,this.thres01)];
    this.sources.push(new srcPt([this.srcPosX02,this.srcPosY02,this.srcPosZ02],this.freq02,1,this.verts,this.thres02));
    var vectors = [];

    this.mesh.geometry.computeVertexNormals();

    for(var i=0; i<this.verts.length;i++){
        vectors.push([0,2,0]);
    }

    var myCymatic = new cymatic(this.sources,1,this.verts,vectors);

    myCymatic.applyTo();

    for(var i =0; i<this.sources.length; i++){
        this.sources[i].opacity = this.srcOpacity;
        this.sources[i].drawPos();
        scene.add(this.sources[i].sphere)
    }

    this.appliedValues = myCymatic.final;

    for(var i=0; i<this.mesh.geometry.vertices.length;i++){
        var newVert = vectorAdd(this.verts[i],myCymatic.final[i]);
        this.mesh.geometry.vertices[i].setX(newVert[0]);
        this.mesh.geometry.vertices[i].setY(newVert[1]);
        this.mesh.geometry.vertices[i].setZ(newVert[2]);
    }

    this.mesh.geometry.verticesNeedUpdate = true;
    this.mesh.geometry.computeVertexNormals();

    return this.mesh.geometry;

}



// var meshLoader = new THREE.OBJLoader();
// var mesh = meshLoader.load('sole.obj', onLoad);

var generate = new onLoad();

var gui = new dat.GUI();

var src01 = gui.addFolder('source 01');
var src02 = gui.addFolder('source 02');

src01.add(generate,'srcPosX01', -100 , 100).onChange(function () {
    for(var i=0; i<generate.sources.length;i++){
        scene.remove(generate.sources[i].sphere)
    }
    generate.wave();
});

src01.add(generate,'srcPosZ01', -100 , 100).onChange(function () {
    for(var i=0; i<generate.sources.length;i++){
        scene.remove(generate.sources[i].sphere)
    }
    generate.wave();
});

src02.add(generate,'srcPosX02', -100 , 100).onChange(function () {
    for(var i=0; i<generate.sources.length;i++){
        scene.remove(generate.sources[i].sphere)
    }
    generate.wave();
});


src02.add(generate,'srcPosZ02', -100 , 100).onChange(function () {
    for(var i=0; i<generate.sources.length;i++){
        scene.remove(generate.sources[i].sphere)
    }
    generate.wave();
});


gui.add(generate,'srcOpacity', 0 , 1).onChange(function () {
    for(var i=0; i<generate.sources.length;i++){
        scene.remove(generate.sources[i].sphere)
    }
    generate.wave();
});


src01.add(generate,'freq01', 0 , 100).step(5).onChange(function () {
    for(var i=0; i<generate.sources.length;i++){
        scene.remove(generate.sources[i].sphere)
    }
    generate.wave();
});

src02.add(generate,'freq02', 0 , 100).step(5).onChange(function () {
    for(var i=0; i<generate.sources.length;i++){
        scene.remove(generate.sources[i].sphere)
    }
    generate.wave();
});

src01.add(generate,'thres01', 10 , 100).step(5).onChange(function () {
    for(var i=0; i<generate.sources.length;i++){
        scene.remove(generate.sources[i].sphere)
    }
    generate.wave();
});

src02.add(generate,'thres02', 10 , 100).step(5).onChange(function () {
    for(var i=0; i<generate.sources.length;i++){
        scene.remove(generate.sources[i].sphere)
    }
    generate.wave();
});

function setup() {


    defultEnvironment();


}



function update() {



}


//runApp();






