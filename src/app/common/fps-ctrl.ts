export class Frame {
    public time: number;
    public frame: number;
}

type FrameCallback = (frame: Frame) => void;
export class FPSCtrl {

    private _fps = 30;  // Default FPS
    private _delay = 0;
    private _time = null;
    private _frame = -1;
    private _tref;
    private _callback: FrameCallback;
    private _loop;

    // play status
    private _isPlaying = false;
    constructor(duration: number, callback?: FrameCallback) {
        this._delay = 1000 / 24; // this._fps;
        this._callback = callback;

        this._loop = (timestamp) => {
            if (this._time === null) {
                this._time = timestamp;
            }

            let seg = Math.floor((timestamp - this._time) / this._delay);
            if (seg > this._frame) {
                this._frame = seg;

                if (this._callback) {
                    this._callback({
                        time: timestamp,
                        frame: this._frame
                    })
                }

            }

            this._tref = requestAnimationFrame(this._loop);
        };
    }


    // set/get frame-rate
    public frameRate(newfps?: number): number {
        if (!arguments.length) {
            return this._fps;
        };

        this._fps = newfps;
        this._delay = 1000 / this._fps;
        this._frame = -1;
        this._time = null;
    };

    // enable starting/pausing of the object
    public start() {
        if (!this._isPlaying) {
            this._isPlaying = true;
            this._tref = requestAnimationFrame(this._loop);
        }
    };

    public pause() {
        if (this._isPlaying) {
            console.log(`FPS Controller paused.`);
            cancelAnimationFrame(this._tref);
            this._isPlaying = false;
            this._time = null;
            this._frame = -1;
            this._callback = null;
        }
    };

}
