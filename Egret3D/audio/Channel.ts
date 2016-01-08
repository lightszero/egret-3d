module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.Channel
     * @classdesc
     * Channel 类控制应用程序中的声音，对声音执行更精细的控制。每个声音均分配给一个声道，而且应用程序可以具有混合在一起的多个声道。
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class Channel {
        /**
        * @language zh_CN
        * 音量，范围从 0（静音）至 1（最大幅度）。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public volume: number = 1.0;
        /**
        * @language zh_CN
        * 是否循环播放 使声音播放结束时重新开始播放。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public loop: boolean = false;

        
        /**
        * @language zh_CN
        * 当前播放速度。1.0 正常速度。0.5 半速（更慢）。2.0 倍速（更快）。-1.0 向后。正常速度。-0.5 向后，半速。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public pitch: number = 1.0;

        protected context: any;
        protected sound: Sound;
        private paused: boolean;
        private startTime: number;
        private startOffset: number;
        protected gain: any;
        protected source: any;

        /**
        * @language zh_CN
        * 创建一个新的 Channel 对象。
        * @param sound {Sound} Sound 对象 音频的数据源。
        * @param {Object} options {any} ["volume":1,"loop":true volume] 回放音量, 0 到 1 ， loop 是否循环播放。
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(sound: Sound, options: any) {

            options = options || {};
            if (options.volume)
                this.volume = options.volume;
            if (options.loop)
                this.loop = options.loop;
            if (options.pitch)
                this.pitch = options.pitch;

            this.sound = sound;

            this.paused = false;


            if (AudioManager.instance.hasAudioContext()) {
                this.context = AudioManager.instance.context;
                this.startTime = 0;
                this.startOffset = 0;
                this.source = null;
                this.gain = this.context.createGain();
            }
            else if (AudioManager.instance.hasAudio())
            {
                if (this.sound.audio)
                {
                    this.source = this.sound.audio.cloneNode(false);
                    this.source.pause();
                }
            }
        }

        /**
        * @language zh_CN
        * 开始在该声道中播放声音。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public play() {

            if (AudioManager.instance.hasAudioContext()) {
                if (this.source) {
                    throw new Error("Call stop() before calling play()");
                }

                this.createSource();
                if (!this.source) {
                    return;
                }

                this.startTime = this.context.currentTime;
                this.source.start(0, this.startOffset % this.source.buffer.duration);
            }
            else if (AudioManager.instance.hasAudio) {
                this.paused = false;
                this.source.play();
            }

            this.setVolume(this.volume);
            this.setLoop(this.loop);
            this.setPitch(this.pitch);
        }

        /**
        * @language zh_CN
        * 暂时停止在该声道中播放声音。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public pause() {
            if (AudioManager.instance.hasAudioContext()) {
                if (this.source) {
                    this.startOffset += this.context.currentTime - this.startTime;
                    this.source.stop(0);
                    this.source = null;
                }
            }
            else if (AudioManager.instance.hasAudio()) {
                if (this.source) {
                    this.source.pause();
                }
            }

            this.paused = true;

        }

        /**
        * @language zh_CN
        * 从暂停的位置继续在该声道中播放声音。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public unpause() {

            if (AudioManager.instance.hasAudioContext()) {
                if (this.source || !this.paused) {
                    throw new Error('Call pause() before unpausing.');
                }

                this.createSource();

                if (!this.source) {
                    return;
                }

                this.startTime = this.context.currentTime;
                this.source.start(0, this.startOffset % this.source.buffer.duration);

                // Initialize volume and loop
                this.setVolume(this.volume);
                this.setLoop(this.loop);
                this.setPitch(this.pitch);
            }
            else if (AudioManager.instance.hasAudio())
            {
                this.source.play();
            }




            this.paused = false;
        }

        /**
        * @language zh_CN
        * 停止在该声道中播放声音。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public stop() {

            if (AudioManager.instance.hasAudioContext()) {
                if (this.source) {
                    this.source.stop(0);
                    this.startOffset = 0;
                    this.source = null;
                }
            }
            else if (AudioManager.instance.hasAudio())
            {
                if (this.source) {
                    this.source.pause();
                    this.source.currentTime = 0;
                }
            }


        }


        private setLoop(value:boolean) {
            if (this.source) {
                this.source.loop = value;
            }
        }

        private setVolume(value:number) {
            if (this.gain) {
                this.gain.gain.value = value * AudioManager.instance.volume;
            }
            else if (this.source) {
                this.source.volume = value * AudioManager.instance.volume;
            }

        }

        private setPitch(value:number) {
            if (AudioManager.instance.hasAudioContext()) {
                if (this.source) {
                    this.source.playbackRate.value = value;
                }
            }
            else if (AudioManager.instance.hasAudio()) {
                if (this.source) {
                    this.source.playbackRate = value;
                }
            }

        }

        /**
        * @language zh_CN
        * 是否正在播放。
        * @returns {boolean}   
        * @version Egret 3.0
        * @platform Web,Native
        */
        public isPlaying():boolean {
            if (AudioManager.instance.hasAudioContext()) {
                return (!this.paused);
            }
            else if (AudioManager.instance.hasAudio())
            {
                return (!this.source.paused)
            }


        }

        /**
        * @language zh_CN
        * 音频持续时间。
        * @returns {number}   
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getDuration():number {

            if (AudioManager.instance.hasAudioContext()) {
                if (this.source) {
                    return this.source.buffer.duration;
                }
            }
            else if (AudioManager.instance.hasAudio()) {
                if (this.source) {
                    var d = this.source.duration;
                    if (d === d) {
                        return d;
                    }
                }
            }


            return 0;
        }


        protected createSource() {

            if (this.sound.buffer) {
                this.source = this.context.createBufferSource();
                this.source.buffer = this.sound.buffer;

                this.source.connect(this.gain);
                this.gain.connect(this.context.destination);


                if (this.loop) {
                    this.source.onended = () => this.play();
                }
            }
        }
    }

} 