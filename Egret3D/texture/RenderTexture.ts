module egret3d {
     /**
     * @class egret3d.RenderTexture
     * @private
     * @classdesc
     * RenderTexture 类为渲染目标纹理，用于离屏渲染中。
     * 
     * @version Egret 3.0
     * @platform Web,Native
     * @includeExample texture/RenderTexture.ts
     */
    export class RenderTexture extends TextureBase{
        /**
         * @language zh_CN
         * 构造函数
         * @param texture ITexture2D对象
         */
        constructor( texture:ITexture2D ) {
            super();
            this.useMipmap = false;
            this.texture = texture; 
        }
    }
} 