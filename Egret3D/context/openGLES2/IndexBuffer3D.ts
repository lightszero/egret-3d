module egret3d.openGLES {

    /**
    * @class egret3d.openGLES.IndexBuffer3D
    * @classdesc
    * IndexBuffer3D 用于表示顶点索引列表，由图形子系统保留的图形元素构成。</p>
    *
    * 定义一个立方图纹理，以便在渲染期间使用。立方体贴图可用于多种渲染技术，例如环境图、skyboxes 和 skylight 光照。</p>
    * 不能直接创建 CubeTexture 对象，而应使用 Context3D createCubeTexture()。</p>
    * 
    * 由 IndexBuffer3D 对象管理的索引可用于从顶点流中选择顶点。索引为 16 位无符号整数。所允许的最大索引值为 65535 (0xffff)。图形子系统不会保留对提供给此对象的顶点的引用。修改或丢弃上载到此对象中的数据不会影响已存储的值。</p>

    * 无法直接实例化 IndexBuffer3D。使用 Context3D.CreateIndexBuffer() 可创建实例。</p>
    * @see egret3d.Context3D
    * @see egret3d.openGLES.CubeTexture
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class IndexBuffer3D implements egret3d.IndexBuffer3D {

        /**
        * @language zh_CN
        * @private
        * WebGLBuffer 的引用
        */
        public buffer: WebGLBuffer;
                                
        /**
        * @language zh_CN
        * 构造
        * @param buffer webglbuffer
        */
        constructor(buffer: WebGLBuffer) {
            this.buffer = buffer;
        }
    }
}