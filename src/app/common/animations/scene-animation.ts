import * as gsap from 'gsap';

export class SceneAnimation {
    /**
     * Fade animation with element
     *
     * @static
     * @param {string} target The target html element
     * @param {number} [to=1] Range [0-1]
     * @param {number} [duration=200] Animation duration in milliseconds
     * @memberof SceneAnimation
     */
    public static fadeTo(target: string, to: number = 1, duration: number = 200, complete?: () => {}) {
        gsap.TweenLite.to(target, duration / 1000, { 'opacity': to })
            .eventCallback('onComplete', complete);
    }
}
