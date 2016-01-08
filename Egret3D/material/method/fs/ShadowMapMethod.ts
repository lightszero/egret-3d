module egret3d {

     /**
     * @language zh_CN
     * @class egret3d.ShadowMapMethod
     * @classdesc
     * 阴影采样。
     * 材质球接受阴影的着色片段，即使在模型中写入acceptShdow 也需要在材质球中加入这个阴影映射方法
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class ShadowMapMethod extends MethodBase {

        /**
        * @language zh_CN
        * 创建一个新的 ShadowMapMethod 对象。
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
            this.fsMethodName = "Shadow_fragment";
        }

        /**
         * @language zh_CN
         * 激活 阴影采样。
         * @private
         * @param context3D {Context3D}
         * @param program3D {IProgram3D}
         * @param modeltransform {Matrix4_4}
         * @param camera3D {Camera3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase,  animation: IAnimation ) {
            super.activate(context3D, program3D, modeltransform, camera3D,geometry, animation);
        }

        /**
         * @language zh_CN
         * 更新 阴影采样。
         * @private
         * @param context3D {Context3D}
         * @param program3D {IProgram3D}
         * @param modeltransform {Matrix4_4}
         * @param camera3D {Camera3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase,  animation: IAnimation  ) {
        }

    }
} 