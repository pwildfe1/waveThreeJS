/**
 * Created by Li on 3/16/2016.
 */
function bTest(){

    var particleSystem;

    var particles = 100000;

    var geometry = new THREE.BufferGeometry();

    var positions = new Float32Array( particles * 3 );

    var colors = new Float32Array( particles * 3 );

    var size = new Float32Array( particles * 3 );

    var color = new THREE.Color();

    var n = 1000, n2 = n / 2; // particles spread in the cube

    for ( var i = 0; i < positions.length; i += 3 ) {
        // positions
        var x = Math.random() * n - n2;
        var y = Math.random() * n - n2;
        var z = Math.random() * n - n2;
        positions[ i ]     = x;
        positions[ i + 1 ] = y;
        positions[ i + 2 ] = z;
        // colors
        var vx = ( x / n ) + 0.5;
        var vy = ( y / n ) + 0.5;
        var vz = ( z / n ) + 0.5;
        color.setRGB( vx, vy, vz );
        colors[ i ]     = color.r;
        colors[ i + 1 ] = color.g;
        colors[ i + 2 ] = color.b;

        size[i] = 50;
        size[i+1] = 50;
        size[i+2] = 50;
    }

   // geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ).setDynamic( true ) );

    geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

    geometry.addAttribute( 'size', new THREE.BufferAttribute( colors, 3 ) );

    //geometry.computeBoundingSphere();


    //var material = new THREE.PointsMaterial( { vertexColors: THREE.VertexColors } );
    var material = new THREE.PointsMaterial( { size: 20, vertexColors: THREE.VertexColors } );
    particleSystem = new THREE.Points( geometry, material );
    scene.add( particleSystem );






    return particleSystem;

}

function test2(){

    var amount = 200000;
    var radius = 1000;
    var positions = new Float32Array( amount * 3 );
    var colors = new Float32Array( amount * 3 );
    var sizes = new Float32Array( amount );
    var vertex = new THREE.Vector3();
    var color = new THREE.Color( 0xffffff );
    for ( var i = 0; i < amount; i ++ ) {
        vertex.x = ( Math.random() * 2 - 1 ) * radius;
        vertex.y = ( Math.random() * 2 - 1 ) * radius;
        vertex.z = ( Math.random() * 2 - 1 ) * radius;
        vertex.toArray( positions, i * 3 );
        if ( vertex.x < 0 ) {
            color.setHSL( 0.5 + 0.1 * ( i / amount ), 0.7, 0.5 );
        } else {
            color.setHSL( 0.0 + 0.1 * ( i / amount ), 0.9, 0.5 );
        }
        color.toArray( colors, i * 3 );
        sizes[ i ] = 10;
    }
    var geometry = new THREE.BufferGeometry();
    geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
    geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );
    //
    var material = new THREE.ShaderMaterial( {
        uniforms: {
            amplitude: { type: "f", value: 1.0 },
            color:     { type: "c", value: new THREE.Color( 0xffffff ) },
            texture:   { type: "t", value: new THREE.TextureLoader().load( "src/nonScript/dot.png" ) }
        },
        vertexShader:   document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
        blending:       THREE.NormalBlending,
        depthTest:      false,
        transparent:    false
    });
    //
    var sphere = new THREE.Points( geometry, material );
    scene.add( sphere );


    var pointer = {
        object: sphere,
        positionArray: positions,
        colorArray: colors,
        sizeArray: sizes,
        length: amount,

        setPosition: function(i,position){

            this.positionArray[i*3] = position[0];
            this.positionArray[i*3+1] = position[1];
            this.positionArray[i*3+2] = position[2];

        },

        getPosition: function(i){

            var position = [];

            position[0] = this.positionArray[i*3];
            position[1] = this.positionArray[i*3+1];
            position[2] = this.positionArray[i*3+2];

            return position;

        },

        setColor: function(i,color){

            this.colorArray[i*3] = color[0];
            this.colorArray[i*3+1] = color[1];
            this.colorArray[i*3+2] = color[2];


        },

        setSize: function(i,size){

            this.sizeArray[i] = size;


        }





    };

    return pointer;

}

function createParticleSystem(positionArray,numsArray,color,isFlatArray){


    if(numsArray[0] == undefined){

        var ptSize = numsArray;

        numsArray = [];


        for(var i=0;i<positionArray.length;i++){

            numsArray[i] = ptSize;

        }

    }

    var amount = positionArray.length;
    var radius = 1000;
    var positions = new Float32Array( amount * 3 );
    var colors = new Float32Array( amount * 3 );
    var sizes = new Float32Array( amount );
    var vertex = new THREE.Vector3();
    if(color == undefined) color = new THREE.Color( 0xffffff );
    if(typeof color == 'number' ) color  = new THREE.Color( color );




    if(isFlatArray){

        var colorArray = new Float32Array(positionArray.length);
        for ( var i = 0; i < positionArray.length; i ++ ) {

            colorArray[i] = positionArray[i]/256 +0.5;


        }
    }

        for ( var i = 0; i < amount; i ++ ) {

            if (!isFlatArray){

                vertex.x = positionArray[i][0];
                vertex.y = positionArray[i][1];
                vertex.z = positionArray[i][2];

                vertex.toArray( positions, i * 3 );

            }




            if(color.length != undefined)color[i].toArray( colors, i * 3 );
            else color.toArray( colors, i * 3 );

            sizes[ i ] = numsArray[i];
        }




    var geometry = new THREE.BufferGeometry();

    if(!isFlatArray)  {
        geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
    }
    else {
        geometry.addAttribute( 'position', new THREE.BufferAttribute( positionArray, 3 ) );
        geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colorArray, 3 ) );

    }

    geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );
    //
    var material = new THREE.ShaderMaterial( {
        uniforms: {
            amplitude: { type: "f", value: 1.0 },
            color:     { type: "c", value: new THREE.Color( 0xffffff ) },
            texture:   { type: "t", value: new THREE.TextureLoader().load( "src/nonScript/dot.png" ) }
        },
        vertexShader:   document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
        blending:       THREE.AdditiveBlending,
        depthTest:      false,
        transparent:    true
    });
    //
    var sphere = new THREE.Points( geometry, material );
    scene.add( sphere );


    var pointer = {
        object: sphere,
        positionArray: positions,
        colorArray: colors,
        sizeArray: sizes,
        length: amount,
        material: material,

        setScale: function (s) {

          sphere.scale.set(s,s,s);

        },

        setPosition_All: function (A) {

            sphere.position.set(A[0],A[1],A[2]);

        },

        setPosition: function(i,position){

            this.positionArray[i*3] = position[0];
            this.positionArray[i*3+1] = position[1];
            this.positionArray[i*3+2] = position[2];

        },

        getPosition: function(i){

            var position = [];

            position[0] = this.positionArray[i*3];
            position[1] = this.positionArray[i*3+1];
            position[2] = this.positionArray[i*3+2];

            return position;

        },

        setColor: function(i,color){

            this.colorArray[i*3] = color[0];
            this.colorArray[i*3+1] = color[1];
            this.colorArray[i*3+2] = color[2];


        },

        setSize: function(i,size){

            this.sizeArray[i] = size;


        },

        visible: function () {

            sphere.visible = !sphere.visible;


        },

        replaceParticles: function (newPos) {


            var amount = newPos.length;
            var positions = new Float32Array( amount * 3 );


            for ( var i = 0; i < amount; i ++ ) {



                positions[i*3] = newPos[i][0];
                positions[i*3+1] = newPos[i][1];
                positions[i*3+2] = newPos[i][2];

                // geometry.attributes.position.array[i*3] = newPos[i][0];
                // geometry.attributes.position.array[i*3+1] = newPos[i][1];
                // geometry.attributes.position.array[i*3+2] = newPos[i][2];

            }

            geometry.removeAttribute( 'position' );
            geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
            geometry.attributes.position.verticesNeedUpdate = true;


        },

        dispose: function () {

            scene.remove(sphere);
            geometry.dispose();

        }


    };

    return pointer;

}

function createLine(lines) {


    var geo = new THREE.Geometry();

    for(var i=0; i<lines.length;i++){

        var p1 = lines[i][0];
        var p2 = lines[i][1];
        geo.vertices.push(new THREE.Vector3(p1[0],p1[1],p1[2]));
        geo.vertices.push(new THREE.Vector3(p2[0],p2[1],p2[2]));
        var randomColor = new THREE.Color(Math.random() * 0xffffff);
        geo.colors.push(randomColor);
        geo.colors.push(randomColor);

    }

    var lineMesh = new THREE.LineSegments(geo,new THREE.LineBasicMaterial({color: 0xffffff, vertexColors: THREE.VertexColors }));

    scene.add(lineMesh);

    console.log(lineMesh);
}


function createBufferLine(lines) {


    var flatPosArray = new Float32Array( lines.length*2 * 3 );
    var flatColorArray = new Float32Array( lines.length*2 * 3 );

    for(var i=0; i<lines.length;i++){

        var p1 = lines[i][0];
        var p2 = lines[i][1];

        flatPosArray[i*2*3] = p1[0];
        flatPosArray[i*2*3+1] = p1[1];
        flatPosArray[i*2*3+2] = p1[2];

        flatPosArray[i*2*3+3] = p2[0];
        flatPosArray[i*2*3+4] = p2[1];
        flatPosArray[i*2*3+5] = p2[2];



        // geo.vertices.push(new THREE.Vector3(p1[0],p1[1],p1[2]));
        // geo.vertices.push(new THREE.Vector3(p2[0],p2[1],p2[2]));
        //var randomColor = new THREE.Color(Math.random() * 0xffffff);
        var randomColor = new THREE.Color(0xffffff);
        // geo.colors.push(randomColor);
        // geo.colors.push(randomColor);

        flatColorArray[i*2*3] = randomColor.r;
        flatColorArray[i*2*3+1] = randomColor.g;
        flatColorArray[i*2*3+2] = randomColor.b;

        flatColorArray[i*2*3+3] = randomColor.r;
        flatColorArray[i*2*3+4] = randomColor.g;
        flatColorArray[i*2*3+5] = randomColor.b;


    }



    var geo = new THREE.BufferGeometry();


    geo.addAttribute( 'position', new THREE.BufferAttribute( flatPosArray, 3 ) );
    geo.addAttribute( 'color', new THREE.BufferAttribute( flatColorArray, 3 ) );

    var lineMesh = new THREE.LineSegments(geo,new THREE.LineBasicMaterial({color: 0xffffff, vertexColors: THREE.VertexColors }));


    scene.add(lineMesh);

    return lineMesh;

}