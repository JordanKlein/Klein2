"use strict";

var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Initialize our data for the triangles
    //
    //(red, green, blue) values for all of the vertices
    var colors = [
    	//Triangle 1 (Head Top) Colors
        vec3(1.0, 0.0, 0.0),
        vec3(1.0, 0.0, 0.0),
        vec3(1.0, 1.0, 0.0),
        // Triangle 2 (Head Bottom) Colors
        vec3(1.0, 1.0, 0.0),
        vec3(1.0, 1.0, 0.0),
        vec3(1.0, 0.0, 0.0),
        // 3rd Triangle (Body Top and Right) Colors
        vec3(1.0, 1.0, 0.0),
        vec3(0.0, 1.0, 1.0), 
        vec3(1.0, 0.0, 1.0),
        // 4th Triangle (Body Bottom and Left) Colors
        vec3(0.0, 1.0, 1.0),
        vec3(1.0, 0.0, 1.0), 
        vec3(1.0, 1.0, 0.0),
        // 5th Triangle (Left Arm Bottom and Right) Colors
        vec3(1.0, 1.0, 0.0),
        vec3(1.0, 1.0, 0.0), 
        vec3(1.0, 1.0, 0.0),
        // 6th Triangle (Left Arm Top and Left) Colors
        vec3(1.0, 1.0, 0.0),
        vec3(1.0, 1.0, 0.0), 
        vec3(1.0, 1.0, 0.0),
        // 7th Triangle (Right Arm Bottom and Left) Colors
        vec3(1.0, 1.0, 0.0),
        vec3(1.0, 1.0, 0.0), 
        vec3(1.0, 1.0, 0.0),
        // 8th Triangle (Right Arm Top and Right) Colors
        vec3(1.0, 1.0, 0.0),
        vec3(1.0, 1.0, 0.0), 
        vec3(1.0, 1.0, 0.0),
        // 9th Triangle (Left Leg Top and Left) Colors
        vec3(1.0, 0.0, 1.0),
        vec3(1.0, 0.0, 1.0), 
        vec3(1.0, 0.0, 1.0),
        // 10th Triangle (Left Leg Bottom and Right) Colors
        vec3(1.0, 0.0, 1.0),
        vec3(1.0, 0.0, 1.0), 
        vec3(1.0, 0.0, 1.0),
        // 11th Triangle (Right Leg Top and Right) Colors
        vec3(1.0, 0.0, 1.0),
        vec3(1.0, 0.0, 1.0), 
        vec3(1.0, 0.0, 1.0),
        // 12th Triangle (Right Leg Bottom and Left) Colors
        vec3(1.0, 0.0, 1.0),
        vec3(1.0, 0.0, 1.0), 
        vec3(1.0, 0.0, 1.0),
    ];

    // And, add our vertices point into our array of points
    points = [
    	// 1st Triangle (Head Top) Points
        vec2(-0.25, 1.0),
        vec2( 0.25, 1.0), 
        vec2( 0.25, 0.75),
        // 2nd Triangle (Head Bottom) Points
        vec2( 0.25, 0.75),
        vec2(-0.25, 0.75), 
        vec2(-0.25, 1.0), 
        // 3rd Triangle (Body Top and Right) Points
        vec2(-0.5, 0.75),
        vec2( 0.5, 0.75), 
        vec2( 0.5, -0.25),
        // 4th Triangle (Body Bottom and Left) Points
        vec2(-0.5, -0.25),
        vec2( 0.5, -0.25), 
        vec2(-0.5, 0.75),
        // 5th Triangle (Left Arm Bottom and Right) Points
        vec2(-0.5, 0.75),
        vec2(-0.5, 0.5), 
        vec2(-1.0, -0.25),
        // 6th Triangle (Left Arm Top and Left) Points
        vec2(-0.5, 0.75),
        vec2(-1.0, 0.75), 
        vec2(-1.0, -0.25),
        // 7th Triangle (Right Arm Bottom and Left) Points
        vec2(0.5, 0.75),
        vec2(0.5, 0.5), 
        vec2(1.0, -0.25),
        // 8th Triangle (Right Arm Top and Right) Points
        vec2(0.5, 0.75),
        vec2(1.0, 0.75), 
        vec2(1.0, -0.25),
        // 9th Triangle (Left Leg Top and Left) Points
        vec2(-0.5, -0.25),
        vec2(-0.25, -0.25), 
        vec2(-1.0, -1.0),
        // 10th Triangle (Left Leg Bottom and Right) Points
        vec2(-0.25, -0.25),
        vec2(-0.25, -1.0), 
        vec2(-1.0, -1.0),
        // 11th Triangle (Right Leg Top and Right) Points
        vec2(0.5, -0.25),
        vec2(0.25, -0.25), 
        vec2(1.0, -1.0),
        // 12th Triangle (Right Leg Bottom and Left) Points
        vec2(0.25, -0.25),
        vec2(0.25, -1.0), 
        vec2(1.0, -1.0),
        ];

    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Create a buffer object, initialize it, and associate it with the
    //  associated attribute variable in our vertex shader

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    //note that the 2 below is because each of our 
    //data points has only 2 values (2D application)
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}
