module egret3d.openGLES {

    /**
     * @class egret3d.openGLES.IndexBuffer3D
     * @classdesc
     * IndexBuffer3D 用于表示顶点索引列表，由图形子系统保留的图形元素构成。</p>
     * VertexBuffer3D 类表示上载到渲染上下文的一组顶点数据。</p>
     * 使用 VertexBuffer3D 对象定义与一组顶点中每个点相关联的数据。</p>
     * 您可以从 Vector 数组或 ByteArray 上载顶点数据。（上载完成后，将不再引用原始数组中的数据；更改或放弃源数组不会更改顶点数据。）</p>
     * 与每个顶点相关联的数据采用应用程序定义的格式，并用作顶点着色器程序的输入。</p>
     * 使用 Context3D.vertexAttribPointer  函数标识哪些值属于哪个顶点程序输入。</p>
     * 一个顶点程序最多可以使用 8 个输入（也称为顶点属性寄存器）。</p>
     * 每个输入可能需要 1 到 4 个 32 位值。</p>
     * 例如，一个顶点的 [x,y,z] 位置坐标可以作为包含 3 个 32 位值的矢量传递到顶点程序。</p>
     * 您最多可以为每个点提供 64 个 32 位值（256 字节）数据（但在这种情况下，单个顶点着色器无法使用所有数据）。</p>
     * @see egret3d.Context3D
     * @see egret3d.openGLES.CubeTexture
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class VertexBuffer3D implements egret3d.IVertexBuffer3D {

        /**
         *
         * @language zh_CN
         * @private
         * WebGLBuffer的引用
         */
        public buffer:WebGLBuffer;

        /**
         * @language zh_CN
         * 构造
         * @param buffer webglbuffer
         */
        constructor(buffer:WebGLBuffer) {
            this.buffer = buffer;
        }
    }
}