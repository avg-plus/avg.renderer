import { UIBase } from "./ui";
import * as PIXI from "pixi.js";
import { SpriteType } from 'engine/const/sprite-type';

export class Button extends UIBase {
	public images = {
		normal : PIXI.Texture.WHITE,
		hover : null,
		pressed : null,
		disabled : null
	}

	constructor(options?) {
		super(SpriteType.Character, PIXI.Texture.WHITE);
		this.buttonMode = true;

		if(options.images) {
			this.images.normal = options.images.normal ? PIXI.Texture.from(options.images.normal) : PIXI.Texture.WHITE;
			this.images.hover = options.images.hover ? PIXI.Texture.from(options.images.hover) : null;
			this.images.pressed = options.images.pressed ? PIXI.Texture.from(options.images.pressed) : null;
			this.images.disabled = options.images.disabled ? PIXI.Texture.from(options.images.disabled) : null;
		}

		if(options) {
			this.interactive = typeof options.disabled == 'undefined' ? !options.disabled : true;
			this.texture = !this.interactive && this.images.disabled ? this.images.disabled : this.images.normal;
			this.anchor.set(0.5);
			this.x = typeof options.x == 'undefined' ? 0 : options.x;
			this.y = typeof options.y == 'undefined' ? 0 : options.y;
			this.width = typeof options.width == 'undefined' ? this.images.normal.width : options.width;
			this.height = typeof options.height == 'undefined' ? this.images.normal.height : options.height;
		}

		this.on('pointerover', (event) => {
			if(this.images.hover) {
				this.texture = this.images.hover;
			}
		});

		this.on('pointerout', (event) => {
			this.texture = this.images.normal;
		});

		this.on('pointerdown', (event) => {
			if(this.images.pressed) {
				this.texture = this.images.pressed;
			}
		});

		this.on('pointerup', (event) => {
			this.texture = this.images.hover ? this.images.hover : this.images.normal;
		});
	}

	public disable(disabled : boolean) {
		this.interactive = !disabled;
		if(disabled && this.images.disabled) {
			this.texture = this.images.disabled;
		}
	}

	public onClick(f) {
		this.on('click', f);
	}
}