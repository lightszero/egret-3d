module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.Channel3d
     * @classdesc
     * Channel3d 类控制应用程序中 在三维空间中播放的声音。每个声音均分配给一个声道，而且应用程序可以具有混合在一起的多个声道。
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class Channel3d extends Channel {


        private _panner: PannerNode;

        private _listener: Vector3D;
        /**
        * @language zh_CN
        * 返回监听者位置。
        * @returns {Vector3D}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get listener() {
            return this._listener;
        }
        /**
        * @language zh_CN
        * 设置监听者位置。
        * @param value {Vector3D}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set listener(value: Vector3D) {
            this._listener.copyFrom(value);
        }
        /**
        * @language zh_CN
        * 创建一个新的 Channel3d 对象。
        * @param sound {Sound} Sound 对象 音频的数据源。
        * @param {Object} options {any} ["volume":1,"loop":true volume] 回放音量, 0 到 1 ， loop 是否循环播放。
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(sound: Sound, options: any) {

            super(sound, options);

            this._position = new Vector3D();
            this._velocity = new Vector3D();

            if (AudioManager.instance.hasAudioContext())
                this._panner = this.context.createPanner();
         
            this._maxDistance = 10000;// default maxDistance
            this._minDistance = 1;
            this._rollOffFactor = 1;

            this._listener = new Vector3D();

        }

        private _position: Vector3D;

        /**
        * @language zh_CN
        * 三维空间中的位置。
        * @returns {Vector3D}   
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get position() {
            return this._position;
        }
        /**
        * @language zh_CN
        * 三维空间中的位置。
        * @param opsition {Vector3D} 
        * @version Egret 3.0
        * @platform Web,Native          
        */
        public set position(position:Vector3D) {
            this._position.copyFrom(position);

            if (AudioManager.instance.hasAudioContext()) {
                this._panner.setPosition(position.x, position.y, position.z);
            }
            if (AudioManager.instance.hasAudio()) {
                if (this.source) {

                    var factor: number = this.fallOff(this._listener, this.position, this.minDistance, this.maxDistance, this.rollOffFactor);
                    this.source.volume = this.volume * factor;
                }
            }
        }
        private _velocity: Vector3D;

        /**
        * @language zh_CN
        * 传播方向。
        * @returns {Vector3D}   
        * @version Egret 3.0
        * @platform Web,Native
        */ 

        public get velocity() {
            return this._velocity;
        }
        /**
        * @language zh_CN
        * 传播方向。
        * @param velocity {Vector3D}   
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set velocity(velocity:Vector3D) {
            this._velocity.copyFrom(velocity);

            if (AudioManager.instance.hasAudioContext())
                this._panner.setVelocity(velocity.x, velocity.y, velocity.z);
        }


        private _maxDistance: number;
        /**
        * @language zh_CN
        * 最大距离。
        * @returns {Vector3D}   
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get maxDistance(){
            return this._maxDistance;
        }
        /**
        * @language zh_CN
        * 最大距离。
        * @param max{Number}   
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set maxDistance(max: number) {
            this._maxDistance = max;

            if (AudioManager.instance.hasAudioContext())
                this._panner.maxDistance = max;
        }

        private _minDistance: number;

        /**
        * @language zh_CN
        * 最小距离。
        * @returns {Vector3D}   
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get minDistance() {
            return this._minDistance;
        }
        /**
        * @language zh_CN
        * 最小距离。
        * @param min{Number}  
        * @version Egret 3.0
        * @platform Web,Native         
        */
        public set minDistance(min: number) {
            this._minDistance = min;

            if (AudioManager.instance.hasAudioContext())
                this._panner.refDistance = min;
        }


        private _rollOffFactor: number;
        /**
        * @language zh_CN
        * rollOff 系数。
        * @returns {Number}   
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get rollOffFactor() {
            return this._rollOffFactor;
        }
        /**
        * @language zh_CN
        * rollOff 系数。
        * @param factor {Number}   
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set rollOffFactor(factor: number) {
            this._rollOffFactor = factor;

            if (this._panner)
                this._panner.rolloffFactor = factor;
        }

        protected createSource(){

            this.source = this.context.createBufferSource();
            this.source.buffer = this.sound.buffer;
            // Connect up the nodes
            this.source.connect(this._panner);
            this._panner.connect(this.gain);
            this.gain.connect(this.context.destination);
        }


        // Fall off function which should be the same as the one in the Web Audio API,
        // taken from OpenAL
        private fallOff(posOne: Vector3D, posTwo: Vector3D, refDistance: number, maxDistance: number, rolloffFactor: number):number {


            var distance: number = Vector3D.distance(posOne, posTwo);

            if (distance < refDistance) {
                return 1;
            } else if (distance > maxDistance) {
                return 0;
            } else {
                var numerator = refDistance + (rolloffFactor * (distance - refDistance));
                if (numerator !== 0) {
                    return refDistance / numerator;
                } else {
                    return 1;
                }
            }
        }
    }
} 