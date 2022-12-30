#version 300 es
precision highp float;

flat out int pixelCount;

in int pixels;
in vec4 vertecies;

void main() {
    gl_Position = vertecies;
    pixelCount = pixels;
}
