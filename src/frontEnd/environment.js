/**
 * Created by Li on 3/30/2016.
 */

var group;


function createRandomCube(){

    geometry = new THREE.BoxGeometry(20,20,20);
    var material = new THREE.MeshPhongMaterial( { color: white, specular: 0x111111, shininess: 200 });
    var mesh = new THREE.Mesh(geometry,material);
    mesh.position.set(Math.random()*500,Math.random()*500,Math.random()*500);
    mesh.material.color.setRGB(Math.random(),Math.random(),Math.random());
    group.add(mesh);

}

var defultEnvironment = function (){

    scene.fog = new THREE.Fog( 0x000000, 1000, 5000 );


    var groundGeo = new THREE.PlaneBufferGeometry( 100000, 100000 );
    var groundMat = new THREE.MeshPhongMaterial( { color: 0xf2f2f2, specular: 0x000000 , shininess: 0 } );
    var ground = new THREE.Mesh( groundGeo, groundMat );
    //ground.rotation.x = -Math.PI/2;
    ground.position.z = -200;
    scene.add( ground );
    ground.receiveShadow = true;




    var helper = new THREE.GridHelper( 1000, 100 );
    helper.rotation.x = -Math.PI/2;
    //helper.position.y = - 199;
    helper.material.opacity = 0.25;
    helper.material.transparent = true;
    scene.add( helper );

    var axis = new THREE.AxisHelper();
    axis.position.set( -500, -500, -500 );
    scene.add( axis );


    group = new THREE.Group();
    scene.add(group);



};