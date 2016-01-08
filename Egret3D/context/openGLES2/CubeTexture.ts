module egret3d.openGLES {

    /**
    * @class egret3d.CubeTexture
    * @classdesc
    * CubeTexture 类表示上载到渲染上下文的立方体纹理。
    *
    * 定义一个立方图纹理，以便在渲染期间使用。立方体贴图可用于多种渲染技术，例如环境图、skyboxes 和 skylight 光照。
    * 不能直接创建 CubeTexture 对象，而应使用 Context3D createCubeTexture()。
    * 
    *
    * @see egret3d.base.Texture2D
    * @see egret3d.base.CubeTexture
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class CubeTexture implements egret3d.ICubeTexture {
        /**
        * @language zh_CN
        * @private
        * gpu texture 的引用
        */
        public gpu_texture: any;

        /**
        * @language zh_CN
        * @private
        * texture 的引用
        */
        public image: HTMLImageElement;

        /**
        * @language zh_CN
        *  
        * 立方体贴图的 前面
        */
        public image_front: HTMLImageElement;

        /**
        * @language zh_CN
        *  
        * 立方体贴图的 后面
        */
        public image_back: HTMLImageElement;

        /**
        * @language zh_CN
        *  
        * 立方体贴图的 左面
        */
        public image_left: HTMLImageElement;

        /**
        * @language zh_CN
        *  
        * 立方体贴图的 右面
        */
        public image_right: HTMLImageElement;

        /**
        * @language zh_CN
        *  
        * 立方体贴图的 上面
        */
        public image_up: HTMLImageElement;

        /**
        * @language zh_CN
        *  
        * 立方体贴图的 下面
        */
        public image_down: HTMLImageElement;
        constructor(cubeTexture: WebGLTexture) {
            this.gpu_texture = cubeTexture;
        }
    }
}