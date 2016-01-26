module egret3d {
   
    /**
     * @class egret3d.VideoTexture
     * @classdesc
     * VideoTexture 使用 Video 标签采集 video 视频 </p>
     * VideoTexture 仅且暂时只能在pc上正常使用，移动端需要直接与用户交互才可正常生成播放</p>
     * 需要设置贴图的宽度和高度。必须为2的N次</p>
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class VideoTexture extends TextureBase {
        private video: HTMLVideoElement;
        private canUpdataTexture: boolean = false; 
        private context: CanvasRenderingContext2D;
        private tmpCanvas: HTMLCanvasElement;
        private _width: number;
        private _height: number;
        constructor( width:number = 256 , height:number = 256 ) {
            super();

            this._width = width;
            this._height = height;

            this.tmpCanvas = document.createElement("canvas");
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;

            this.context = this.tmpCanvas .getContext('2d');

            this.video = document.createElement("video");
            this.video.msZoom = true;
            this.video.width = width;
            this.video.height = height;
            this.video.videoWidth = width;
            this.video.videoHeight = height;
            this.video.controls = false;
            this.video.autoplay = true;

            this.video.addEventListener("canplaythrough", () => this.loadReady(), true);
            this.tmpCanvas.hidden = true;
        }

        private loadReady() {
            this.canUpdataTexture = true; 
        }

        
        /**
         * @language zh_CN
         * 设置 视频链接
         * 设置 视频的链接地址，只要是h5 支持的格式都支持， 例如:ogv,mp4,avi
         * @param src 视频格式的链接地址
         */
        public set source(src:string) {
            this.video.src = src;
        }

         /**
         * @language zh_CN
         * 返回 视频链接
         * 视频的链接地址，只要是h5 支持的格式都支持， 例如:ogv,mp4,avi
         */
        public get source(): string {
            return this.video.src;
        }

         /**
         * @language zh_CN
         * 播放视频
         * 当视频缓冲好之后才能正常播放视频
         */
        public play() {
            this.video.play();
        }

        
         /**
         * @language zh_CN
         * 暂停视频
         * 控制视频的播放暂停状态
         */
        public pause() {
            this.video.pause();
        }

        /**
         * @language zh_CN
         * 上传贴图数据给GPU
         * 将video的视频数据实时传输到GPU上
         * @param context3D 
        */
        public upload(context3D: Context3D) {
            if (!this.texture) {
                this.texture = context3D.creatTexture2D();
                this.texture.gpu_internalformat = this.internalFormat;
                this.texture.gpu_colorformat = this.colorFormat;
                this.texture.mipmapDatas = this.mimapData;
                this.texture.image = this.imageData;
                this.texture.gpu_border = 0;
                context3D.gl.bindTexture(context3D.gl.TEXTURE_2D, this.texture.gpu_texture);
                context3D.gl.texParameteri(context3D.gl.TEXTURE_2D, context3D.gl.TEXTURE_MAG_FILTER, context3D.gl.LINEAR);
                context3D.gl.texParameteri(context3D.gl.TEXTURE_2D, context3D.gl.TEXTURE_MIN_FILTER, context3D.gl.NEAREST);
            }

            if (this.canUpdataTexture) {
                this.context.drawImage(this.video, 0, 0, this._width, this._height);
                context3D.gl.pixelStorei(context3D.gl.UNPACK_ALIGNMENT, 1)
                context3D.gl.bindTexture(context3D.gl.TEXTURE_2D, this.texture.gpu_texture);
                context3D.gl.texImage2D(context3D.gl.TEXTURE_2D, 0, context3D.gl.RGB, context3D.gl.RGB, context3D.gl.UNSIGNED_BYTE, this.tmpCanvas );
            }
           
        }
    }
} 