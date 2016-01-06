module egret3d.openGLES {

    
    /**
    * @class egret3d.Texture2D
    * @classdesc
    * Texture 类表示上载到渲染上下文的二维纹理。
    *
    * 定义一个 2D 纹理，以便在渲染期间使用。
    * 无法直接实例化 Texture。使用 Context3D createTexture() 方法创建实例。
    * @see egret3d.base.Program3D
    * @see egret3d.base.IndexBuffer3D
    * @see egret3d.base.VertexBuffer3D
    * @see egret3d.base.Texture2D
    * @see egret3d.base.Shader
    * @see egret3d.base.CubeTexture
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Texture2D implements egret3d.ITexture2D {

        /**
        * @language zh_CN
        * @private
        * Context3D 引用
        */
        private context3D: Context3D;

        /**
        * @language zh_CN
        * @private
        * 提交显卡的 index
        */
        public gpu_index: number;

        /**
        * @language zh_CN
        * @private
        * 显卡中上传使用的 border 边框像素大小
        */
        public gpu_border: number;

        /**
        * @language zh_CN
        * @private
        * 纹理贴图的颜色模式
        */
        public gpu_colorformat: number;

        /**
        * @language zh_CN
        * @private
        * 纹理贴图标准的格式
        */
        public gpu_internalformat: InternalFormat;

        /**
        * @language zh_CN
        * @private
        * context.creatTexture()接口生成的GPU纹理
        */
        public gpu_texture: any;

        /**
        * @language zh_CN
        * @private
        * 网页imageElement 的标签贴图
        */
        public image: HTMLImageElement;

        /**
        * @language zh_CN
        * @private
        * 二维纹理中的mimap
        * 二维纹理中的 LOD texture 贴图这个可以通过 textureUtil.generateMipMaps() api 来生成
        */
        public mipmapDatas: Array<MipmapData>;

        /**
        * @private
        */
        frameBuffer: WebGLFramebuffer;

        /**
        * @private
        */
        renderbuffer: WebGLRenderbuffer;

        /**
        * @language zh_CN
        * @public
        * 二维纹理中的 像素宽度
        */
        public width: number = 0;

        /**
        * @language zh_CN
        * @public
        * 二维纹理中的 像素高度
        */
        public height: number = 0;

        constructor(texture2D: WebGLTexture , context3D: any ) {
            this.gpu_texture = texture2D;
            this.context3D = context3D
            this.mipmapDatas = new Array<MipmapData>();
        }
    }
}