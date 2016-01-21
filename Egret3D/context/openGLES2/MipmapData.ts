module egret3d {

    /**
    * @class egret3d.MipmapData
    * @classdesc
    * 一个贴图的不同LOD层级数据
    * 生成 mipmap 可以使用 TextureUtil.generateMipMaps() 来制作lod mipmapdata
    * 
    *
    * @see egret3d.Program3D
    * @see egret3d.IndexBuffer3D
    * @see egret3d.VertexBuffer3D
    * @see egret3d.Texture2D
    * @see egret3d.Shader
    * @see egret3d.CubeTexture
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class MipmapData {

        /**
        *  
        * @language zh_CN
        *    
        * array buffer类型的 像素值信息
        */
        public data: Uint8Array;

        /**
        *  
        * @language zh_CN
        *    
        * 此mipmap的大小宽度
        */
        public width: number;

        /**
        *  
        * @language zh_CN
        *    
        * 此mipmap的大小高度
        */       
        public height: number;

        constructor(data: Uint8Array, width: number, height: number) {
            this.data = data;
            this.width = width;
            this.height = height;
        }


    }
} 