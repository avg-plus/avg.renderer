import * as PIXI from "pixi.js";

/**
 * Scaling system which is used to auto-adapt the screen by offscreen rendering
 *
 * @class
 * @extends PIXI.System
 */

 export class ScalingSystem extends PIXI.System
 {
 	frameBuffer: PIXI.Framebuffer;
 	renderBuffer: PIXI.Framebuffer;
 	renderer: PIXI.Renderer;

 	/**
     * @param {PIXI.Renderer} renderer - The renderer this System works for.
     */
     constructor(renderer) {
        super(renderer);
        this.renderer = renderer;

        this.frameBuffer = new PIXI.Framebuffer(renderer.width, renderer.height);
    	this.frameBuffer.addColorTexture(0, PIXI.Texture.fromBuffer(null, renderer.width, renderer.height));
    	//this.frameBuffer.addDepthTexture(PIXI.Texture.fromBuffer(null, renderer.width, renderer.height));

    	this.renderBuffer = new PIXI.Framebuffer(renderer.width, renderer.height);
    	this.renderBuffer.addColorTexture(0, PIXI.Texture.fromBuffer(null, renderer.width, renderer.height));
    }

    prerender() {
    	this.renderer.framebuffer.bind(this.frameBuffer);
    }

    postrenderer() {
    	this.renderer.framebuffer.bind(this.renderBuffer);
    }

    /*resize(width, height) {
    	this.renderBuffer.resize(width, height);
    	this.renderBuffer.addColorTexture(0, PIXI.Texture.fromBuffer(null, width, height));
    }*/
 }