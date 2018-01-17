/**
 * Created by Li on 3/5/2016.
 */



var container, stats;
var camera, scene, renderer, controls, gui;

var frameCount = 0;

function init() {


    container = document.createElement( 'div' );
    document.body.appendChild( container );

    scene = new THREE.Scene();


    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set(500,500,500);
    camera.up.set( 0, 0, 1 );


    //add default light
    var light = new THREE.PointLight( 0xffffff, 1.3 );
    light.position.set( 10,10,0 );
    camera.add(light);
    scene.add( camera );


    //add renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor( black );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    container.appendChild( renderer.domElement );


    //add view control
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 0, 0 );
    controls.addEventListener( 'change', render );
    controls.enableDamping = true;


    //add stats
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild( stats.domElement );

    //add listener for window resize
    window.addEventListener( 'resize', onWindowResize, false );



    setup();



}

function onWindowResize() {


    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {





    requestAnimationFrame( animate );
    controls.update();



    stats.update();


    update();

    render();

    frameCount++;
}

function render() {


    renderer.render( scene, camera);


}

function runApp() {

    init();
    animate();

}