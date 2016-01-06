module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.Sound
     * @classdesc
     * Sound 类允许您在应用程序中使用声音。使用 Sound 类可以创建 Sound 对象、将外部 MP3 文件加载到该对象并播放该文件、关闭声音流，以及访问有关声音的数据，如有关流中字节数和 ID3 元数据的信息。可通过以下项对声音执行更精细的控制：声音源（声音的 Channel 和 Channel3d）用于控制向计算机扬声器输出声音的属性。
     * @includeExample audio/Sound.ts
     */
    export class Sound {

        private isLoaded: boolean;
        /**
        * @language zh_CN
        * HTML音频 数据源。
        */
        public audio: HTMLAudioElement = null;


        private _buffer: AudioBuffer;

        /**
        * @language zh_CN
        * Web音频 数据源。
        * @returns {AudioBuffer}   
        */
        public get buffer(): any {
            return this._buffer;
        }

        private _success: Function;
        private _error: Function;


        /**
        * @language zh_CN
        * 创建一个新的 Sound 对象。一旦某个 Sound 对象加载完成声音文件，就不能再将另一个声音文件加载到该 Sound 对象中。要加载另一个声音文件，请创建新的 Sound 对象。
        * @param {String}   指向外部音频文件的 URL。
        * @param {Function} 一个可选的音频文件加载成功的事件处理函数。
        * @param {Function} 一个可选的音频文件加载失败的事件处理函数。
        */
        constructor(url: string, success: Function=null, error: Function=null) {

            this._success = success;
            this._error = error;

            this.isLoaded = false;

            if (AudioManager.instance.hasAudioContext()) {
                if (AudioManager.instance.isSupported(url, this.audio)) {
                    console.warn('Audio format not supported');
                    error(this);
                }
                else {
                    if (AudioManager.instance.context)
                    {
                        this.loadAudioFile(url);
                    }
                }
            }
            else if (AudioManager.instance.hasAudio())
            {
                try {
                    this.audio = new Audio();
                }
                catch (e) {
                    console.warn("No support for Audio element");
                    if (error)
                        error(this);
                    return;
                }

                if (AudioManager.instance.isSupported(url, this.audio)) {
                    console.warn('Audio format not supported');
                    if (error)
                        error(this);
                }
                else {
                    this.audio.src = url;
                    this.audio.addEventListener("canplaythrough", (ev: Event) => this.oncanplaythrough(ev));
                    this.audio.addEventListener("ended", (ev: Event) => this.onended(ev));

                    this.audio.load();
                }
            }
        }

        private xhr: XMLHttpRequest;

        private loadAudioFile(url) {
            if (this.xhr == null)
                this.xhr = new XMLHttpRequest(); //通过XHR下载音频文件
            this.xhr.open('GET', url, true);
            this.xhr.responseType = 'arraybuffer';


            this.xhr.onload = (e: Event) => this.audioLoadend(e);

            this.xhr.send();
        }

        private audioLoadend(e: Event) {
            AudioManager.instance.context.decodeAudioData(this.xhr.response, (buffer) => this.decodeSuccessCallback(buffer));
        }

        private decodeSuccessCallback(buffer: AudioBuffer) {

            this._buffer = buffer;

            if (this._success)
                this._success(this);
        }

        private onended(ev: Event): void {

        }

        private oncanplaythrough(ev: Event): void {

            if (!this.isLoaded) {
                this.isLoaded = true;

                if (this._success)
                    this._success(this);
            }
        }
    }
} 