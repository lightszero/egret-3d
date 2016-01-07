
module egret3d {

     /**
     * @language zh_CN
     * @class egret3d.ShadowMapingMethod
     * @classdesc
     * @version Egret 3.0
     * @platform Web,Native
     * 阴影映射。
     */
    export class ShadowMapingMethod extends MethodBase {
        /**
         * @language zh_CN
         * 偏移值。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public bias: number = 0.002; 
        /**
         * @language zh_CN
         * 阴影颜色红色通道值。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public shdowColorR: number = 0.3; 
        /**
         * @language zh_CN
         * 阴影颜色绿色通道值。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public shdowColorG: number = 0.3; 
        /**
         * @language zh_CN
         * 阴影颜色蓝色通道值。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public shdowColorB: number = 0.5; 

        private weightUniformIndex: any; 


        /**
        * @language zh_CN
        * 创建一个新的 ShadowMapingMethod 对象。
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
            this.vsMethodName = "ShadowMapping_vertex";
            this.fsMethodName = "shadowmapping_fragment";
        }

        /**
         * @language zh_CN
         * 设置材质信息。
         * @version Egret 3.0
         * @platform Web,Native
         * @param materialData {MaterialData}
         * @param usage {MethodUsageData}
         */
        public setMaterialData(materialData: MaterialData, usage: MethodUsageData) {
            this.usage = usage;
            this.materialData = materialData;
            this.materialData.shadowMapTex = ShadowRender.frameBuffer.texture;
        }

        /**
         * @language zh_CN
         * 激活。
         * @version Egret 3.0
         * @platform Web,Native
         * @param context3D {Context3D}
         * @param program3D {IProgram3D}
         * @param modeltransform {Matrix4_4}
         * @param camera3D {Camera3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         */
        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase,  animation: IAnimation  ) {
            super.activate(context3D, program3D, modeltransform, camera3D,geometry, animation);
            program3D["shadowParameterUniformIndex"] = context3D.getUniformLocation(program3D, "shadowParameter" );
        }

        /**
         * @language zh_CN
         * 更新。
         * @version Egret 3.0
         * @platform Web,Native
         * @param context3D {Context3D}
         * @param program3D {IProgram3D}
         * @param modeltransform {Matrix4_4}
         * @param camera3D {Camera3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         */
        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation ) {
            context3D.uniform4f(program3D["shadowParameterUniformIndex"], this.shdowColorR, this.shdowColorG, this.shdowColorB, this.bias);
        }

    }
} 