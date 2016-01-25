module egret3d.openGLES {

    /**
    * @class egret3d.openGLES.Shader
    * @classdesc
    * Shader 类表示上载到渲染上下文的一对渲染程序中的 顶点找色shader，或片段着色的shader 。</p>
    * 
    * shader 是基于 opengl es 2.0 标准 也就是webgl版本的shader着色器。</p>
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
    export class Shader implements egret3d.IShader {

         /**
        * @language zh_CN
        * @private
        * 获取已经有的shader 的ID
        */
        static ID_COUNT: number = 0;

        /**
        * @language zh_CN
        *  
        * 获取已经有的shader 的ID
        */
        public id: number;

        
        /**
        * @language zh_CN
        * @private
        * WebGLShader 的引用
        */
        private _shader: WebGLShader;
                        
        /**
        * @language zh_CN
        * 构造
        */
        constructor(shader: WebGLShader) {
            this._shader = shader;
        }

        /**
        * @language zh_CN
        * @private
        * WebGLShader 的引用
        */
        public get shader(): WebGLShader {
            return this._shader;
        }
    }
} 