module egret3d {
     /**
     * @class egret3d.RenderTexture
     * @classdesc
     * 渲染材质
     */
    export class RenderTexture extends TextureBase{
        /**
         * @language zh_CN
         * @param texture 
         */
        constructor( texture:ITexture2D ) {
            super();
            this.useMipmap = false;
            this.texture = texture; 
        }
    }
} 