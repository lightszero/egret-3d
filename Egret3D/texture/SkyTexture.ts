module egret3d {
     /**
     * @class egret3d.SkyTexture
     * @classdesc
     * SkyTexture 类为天空贴图
     *
     * 天空贴图用于Sky类使用，其内部是将6张HTMLImageElement（网页图片元素）封装到CubeTexture对象，CubeTexture为引擎内部使用对象。
     *
     * 示例：
     * 假设html中已有 
     *     <img id="t1" src="image_front.png" />
     *     <img id="t2" src="image_back.png" />
     *     <img id="t3" src="image_left.png" />
     *     <img id="t4" src="image_right.png" />
     *     <img id="t5" src="image_up.png" />
     *     <img id="t6" src="image_down.png" />
     *
     * 使用示例：
     * var skyTexture: egret3d.SkyTexture = new egret3d.SkyTexture(
     *     <HTMLImageElement>document.getElementById("t1"),
     *     <HTMLImageElement>document.getElementById("t2"),
     *     <HTMLImageElement>document.getElementById("t3"),
     *     <HTMLImageElement>document.getElementById("t4"),
     *     <HTMLImageElement>document.getElementById("t5"),
     *     <HTMLImageElement>document.getElementById("t6")
     * );
     * 
     * view3D.sky = new egret3d.Sky(skyTexture);
     * 
     * @see egret3d.Sky
     * @version Egret 3.0
     * @platform Web,Native
     * @includeExample egret3d/texture/SkyTexture.ts
     */
    export class SkyTexture extends TextureBase  {

         private image_front: HTMLImageElement;
         private image_back: HTMLImageElement;
         private image_left: HTMLImageElement;
         private image_right: HTMLImageElement;
         private image_up: HTMLImageElement;
         private image_down: HTMLImageElement;


        /**
         * @language zh_CN
         * 构造函数
         * @param image_front 前部HTMLImageElement图片元素
         * @param image_back 背部HTMLImageElement图片元素
         * @param image_left 左部HTMLImageElement图片元素
         * @param image_right 右部HTMLImageElement图片元素
         * @param image_up 顶部HTMLImageElement图片元素
         * @param image_down 底部HTMLImageElement图片元素
         */
         constructor(
            image_front: HTMLImageElement,
            image_back: HTMLImageElement,
            image_left: HTMLImageElement,
            image_right: HTMLImageElement,
            image_up: HTMLImageElement,
            image_down: HTMLImageElement
             ) {
            super();

         imageData: HTMLImageElement;

         this.image_front = image_front;
         this.image_back = image_back;
         this.image_left = image_left;
         this.image_right = image_right;
         this.image_up = image_up;
         this.image_down = image_down;

        }

        /**
         * @language zh_CN
         * 上传贴图数据给GPU
         * @param context3D 
         */
        public upload(context3D: Context3D) {
            if (!this.cubeTexture) {
                this.cubeTexture = context3D.creatCubeTexture();
                //this.texture.gpu_internalformat = InternalFormat.ImageData;
                //this.texture.gpu_colorformat = egret3d.ColorFormat_RGBA8888;
                this.cubeTexture.image_front = this.image_front;
                this.cubeTexture.image_back = this.image_back;
                this.cubeTexture.image_left = this.image_left;
                this.cubeTexture.image_right = this.image_right;
                this.cubeTexture.image_up = this.image_up;
                this.cubeTexture.image_down  = this.image_down;

                context3D.uploadCubetexture(this.cubeTexture);
                //context3D.setTexture2DSamplerState(egret3d.NEAREST, egret3d.NEAREST, egret3d.CLAMP_TO_EDGE, egret3d.CLAMP_TO_EDGE);
            }
        }
    }
}