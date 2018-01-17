/**
 * Created by Li on 31/08/2016.
 */
THREE.STLBinaryExporter = function () {};

THREE.STLBinaryExporter.prototype = {

    constructor: THREE.STLBinaryExporter,

    parse: ( function () {


        return function parse( bufferGeometry ) {


            console.log('start to detect object');
            // We collect objects first, as we may need to convert from BufferGeometry to Geometry

            var triangles = bufferGeometry.attributes.position.array.length/9;



            console.log( triangles+' triangles');

            console.log('start to set buffer');

            var offset = 80; // skip header
            var bufferLength = triangles * 2 + triangles * 3 * 4 * 4 + 80 + 4;
            var arrayBuffer = new ArrayBuffer( bufferLength );
            var output = new DataView( arrayBuffer );
            output.setUint32( offset, triangles, true ); offset += 4;

            console.log('buffer ready');

            // Traversing our collected objects


            bufferGeometry.computeFaceNormals();



            for ( var i = 0; i < triangles*9; i +=9 ) {



                output.setFloat32( offset, bufferGeometry.attributes.normal.array[i], true ); offset += 4; // normal
                output.setFloat32( offset, bufferGeometry.attributes.normal.array[i+1], true ); offset += 4;
                output.setFloat32( offset, bufferGeometry.attributes.normal.array[i+2], true ); offset += 4;



                // the order has been swapped to flip triangles
                output.setFloat32( offset, bufferGeometry.attributes.position.array[i+3], true ); offset += 4; // vertices
                output.setFloat32( offset, bufferGeometry.attributes.position.array[i+4], true ); offset += 4;
                output.setFloat32( offset, bufferGeometry.attributes.position.array[i+5], true ); offset += 4;


                output.setFloat32( offset, bufferGeometry.attributes.position.array[i], true ); offset += 4; // vertices
                output.setFloat32( offset, bufferGeometry.attributes.position.array[i+1], true ); offset += 4;
                output.setFloat32( offset, bufferGeometry.attributes.position.array[i+2], true ); offset += 4;


                output.setFloat32( offset, bufferGeometry.attributes.position.array[i+6], true ); offset += 4; // vertices
                output.setFloat32( offset, bufferGeometry.attributes.position.array[i+7], true ); offset += 4;
                output.setFloat32( offset, bufferGeometry.attributes.position.array[i+8], true ); offset += 4;



                output.setUint16( offset, 0, true ); offset += 2; // attribute byte count

            }





            return output;

        };

    }() )

};