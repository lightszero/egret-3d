module egret3d {

    /**
    * @class egret3d.MipmapData
    * @classdesc
    * 一个贴图的不同LOD层级数据。</p>
    * 生成 mipmap 可以使用 TextureUtil.generateMipMaps() 来制作lod mipmapdata。</p>
    * 
    *
    * @see egret3d.openGLES.Program3D
    * @see egret3d.openGLES.IndexBuffer3D
    * @see egret3d.openGLES.VertexBuffer3D
    * @see egret3d.openGLES.Texture2D
    * @see egret3d.openGLES.Shader
    * @see egret3d.openGLES.CubeTexture
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