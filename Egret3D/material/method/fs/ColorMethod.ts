﻿module egret3d {
     /**
    * @private
     * @language zh_CN
     * @class egret3d.ColorMethod
     * @classdesc
     * 颜色方法。
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class ColorMethod extends MethodBase {

        /**
        * @language zh_CN
        * 创建一个新的 ColorMethod 对象。
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
            this.fsMethodName = "Color_fragment";

        }

        /**
         * @private
         * @language zh_CN
         * 激活 ColorMethod。
         * @param context3D {Context3D}
         * @param program3D {IProgram3D}
         * @param modeltransform {Matrix4_4}
         * @param camera3D {Camera3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
            super.activate(context3D, program3D, modeltransform, camera3D, geometry, animation);
        }

        /**
         * @private
         * @language zh_CN
         * 更新 ColorMethod。
         * @param context3D {Context3D}
         * @param program3D {IProgram3D}
         * @param modeltransform {Matrix4_4}
         * @param camera3D {Camera3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
        }

        /**
         * @language zh_CN
         * 销毁 ColorMethod。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public dispose() {
        }
    }
}