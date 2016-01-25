module egret3d {
 /**
    * @class egret3d.FrameBuffer
    * @classdesc
    * FrameBuffer 类提供了用于呈现几何定义图形的上下文的帧缓冲对象。</p>
    *
    * 渲染上下文包括一个绘图表面及其关联的资源帧缓冲对象。</p>
    * 通过context creatFrameBuffer 来创建，不能直接使用 new 的方式实例化。</p>
    * @see egret3d.openGLES.Program3D
    * @see egret3d.openGLES.IndexBuffer3D
    * @see egret3d.openGLES.VertexBuffer3D
    * @see egret3d.openGLES.Texture2D
    * @see egret3d.openGLES.Shader
    * @see egret3d.openGLES.CubeTexture
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class FrameBuffer {

        /**
        * @language zh_CN
        * @private
        * frame buferr 的buffer 名字
        */
        frameBufferName: number;

        /**
        * @language zh_CN
        * @private
        * frame buferr 的 像素宽度
        */
        width: number;

        /**
        * @language zh_CN
        * @private
        * frame buferr 的 像素高度
        */
        height: number;
         
        /**
        * @language zh_CN
        * @private
        * RenderTexture 的引用
        */
        texture: RenderTexture;
    } 
}