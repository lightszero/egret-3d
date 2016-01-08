module egret3d {
    /**
    * @language zh_CN
    * @class egret3d.AudioManager
    * @classdesc
    * AudioManager 类允许您在应用程序中 播放 HTML5 Audio 和 Web Audio。
    * @includeExample audio/AudioManager.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class AudioManager{

        /**
         * @language zh_CN
         * AudioContext 上下文。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public context: any;

        /**
        * @language zh_CN
        * 音量，范围从 0（静音）至 1（最大幅度）。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public volume: number = 1;

        /**
        * @language zh_CN
        * 创建一个新的 AudioManager 对象。
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            if (this.hasAudioContext()) {
                if (typeof AudioContext !== 'undefined') {
                    this.context = new AudioContext();
                }

            }
        }
        /**
        * @language zh_CN
        * 是否支持 HTML5 Audio tag API。
        * @returns {boolean}   
        * @version Egret 3.0
        * @platform Web,Native
        */
        public hasAudio():boolean {
            return (typeof Audio !== 'undefined');
        }

        /**
        * @language zh_CN
        * 是否支持 Web Audio API。
        * @returns {boolean}   
        * @version Egret 3.0
        * @platform Web,Native
        */
        public hasAudioContext():boolean {
            return !!(typeof AudioContext !== 'undefined');
        }

        private codecs = {};


        /**
        * @language zh_CN
        * 浏览器是否可以播放这种音频类型。
        * @param url 指向外部音频文件的 URL。
        * @param audio {HTMLAudioElement} HTMLAudio元素
        * @returns {boolean}   
        * @version Egret 3.0
        * @platform Web,Native
        */
        public isSupported(url: string, audio:HTMLAudioElement): boolean {

            if (this.codecs == null) {
                if (audio == null)
                    audio = new Audio();

                this.codecs = {
                    mp3: !!audio.canPlayType('audio/mpeg;').replace(/^no$/, ''),
                    opus: !!audio.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ''),
                    ogg: !!audio.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
                    wav: !!audio.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''),
                    aac: !!audio.canPlayType('audio/aac;').replace(/^no$/, ''),
                    m4a: !!(audio.canPlayType('audio/x-m4a;') || audio.canPlayType('audio/m4a;') || audio.canPlayType('audio/aac;')).replace(/^no$/, ''),
                    mp4: !!(audio.canPlayType('audio/x-mp4;') || audio.canPlayType('audio/mp4;') || audio.canPlayType('audio/aac;')).replace(/^no$/, ''),
                    weba: !!audio.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')
                };
            }


            var ext: any = url.match(/^data:audio\/([^;,]+);/i);
            if (!ext) {
                ext = url.split('?', 1)[0].match(/\.([^.]+)$/);
            }

            if (ext) {
                ext = ext[1].toLowerCase();

            }

            return this.codecs[ext];
        }

        /**
        * @language zh_CN
        * 生成一个新的 Sound 对象 ，将声音数据加载到 Sound 对象中。
        * @param url {String}   指向外部音频文件的 URL。
        * @param success {Function} 一个可选的音频文件加载成功的事件处理函数。
        * @param error {Function} 一个可选的音频文件加载失败的事件处理函数。
        * @returns {Sound}   
        * @version Egret 3.0
        * @platform Web,Native
        */
        public createSound (url:string, success:Function=null, error:Function=null):Sound {
            return new Sound(url, success, error);
        }



        /**
        * @language zh_CN
        * 生成一个新的 Channel 对象来播放该声音。此方法返回 Channel 对象，访问该对象可停止声音并监控音量。
        * @param sound{Sound} 要播放的声音数据。
        * @param options{any}   ["volume":1,"loop":true volume] 回放音量, 0 到 1 ， loop 是否循环播放。
        * @returns {Channel}  
        * @version Egret 3.0
        * @platform Web,Native         
        */
        public playSound(sound: Sound, options: any) {
            options = options || {};
            var channel: Channel = new Channel(sound, options);
            channel.play();

            return channel;
        }

        /**
        * @language zh_CN
        * 生成一个新的 Channel3d 对象来播放该声音。此方法返回 Channel3d 对象，访问该对象可停止声音并监控音量。
        * @param sound {Sound}  要播放的声音数据。
        * @param position {Vector3D} 在三维空间中播放的位置。
        * @param options {any} ["volume":1,"loop":true volume] 回放音量, 0 到 1 ， loop 是否循环播放。
        * @returns {Channel}   
        * @version Egret 3.0
        * @platform Web,Native
        */
        public playSound3d(sound: Sound, position: Vector3D, options: any):Channel3d {
            options = options || {};
            var channel: Channel3d = new Channel3d(sound, options);
            channel.position = position;

            if (options.volume) {
                channel.volume = options.volume;
            }
            if (options.loop) {
                channel.loop = options.loop;
            }
            if (options.maxDistance) {
                channel.maxDistance = options.maxDistance;
            }
            if (options.minDistance) {
                channel.minDistance = options.minDistance;
            }
            if (options.rollOffFactor) {
                channel.rollOffFactor = options.rollOffFactor;
            }
            channel.play();
            return channel;
        }


        private static _instance: AudioManager;

        /**
        * @language zh_CN
        * AudioManager类的单例模式，返回一个 AudioManager 对象。
        * @returns AudioManager 
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static get instance(): AudioManager {
            if (this._instance == null) {
                this._instance = new AudioManager();
            }
            return this._instance;
        }
    }
}