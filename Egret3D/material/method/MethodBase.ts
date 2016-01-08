module egret3d {

     /**
     * @language zh_CN
     * @class egret3d.MethodBase
     * @classdesc
     * ColorMethod，DepthMethod，DiffuseMethod，NormalMethod，ShadowMapingMethod，ShadowMapMethod，TerrainMethod ，ParticleVertexMethod，ShadowVertexMethod，SkinVertexMethod，StaticVertexMethod 方法的基类。
     * @version Egret 3.0
     * @platform Web,Native 
     */
    export class MethodBase {
        /**
         * @private
         */
        protected materialData: MaterialData;
        /**
         * @private
         */
        protected usage: MethodUsageData;
        /**
         * @private
         */
        protected vsMethodName: string = ""; 
        /**
         * @private
         */
        protected fsMethodName: string = ""; 
        /**
         * @private
         */
        protected context3D: Context3D;

        /**
         * @language zh_CN
         * 是否支持Shadow。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public acceptShadow: boolean = false;

        /**
        * @language zh_CN
        * 创建一个新的 MethodBase 对象。
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
        }

        /**
         * @language zh_CN
         * 设置材质信息。
         * @param materialData {MaterialData}
         * @param usage {MethodUsageData}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public setMaterialData(materialData: MaterialData, usage: MethodUsageData ) {
            this.usage = usage;
            this.materialData = materialData;
        }

        /**
        * @language zh_CN
        * 获取顶点方法名。
        * @returns {String} 
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get vertexMethodName(): string {
            return this.vsMethodName; 
        }

        /**
        * @language zh_CN
        * 获取frag方法名。
        * @returns {String} 
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get fragMethodName(): string {
            return this.fsMethodName;
        }

        /**
         * @language zh_CN
         * 激活。
         * @param context3D {Context3D}
         * @param program3D {IProgram3D}
         * @param modeltransform {Matrix4_4}
         * @param camera3D {Camera3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
        * @version Egret 3.0
        * @platform Web,Native
         */
        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D ,geometry:GeometryBase , animation:IAnimation ) {
            //change constData
            this.context3D = context3D;
        }

        /**
         * @language zh_CN
         * 更新。
         * @param context3D {Context3D}
         * @param program3D {IProgram3D}
         * @param modeltransform {Matrix4_4}
         * @param camera3D {Camera3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
        * @version Egret 3.0
        * @platform Web,Native
         */
        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry:GeometryBase , animation: IAnimation ) {

        }
        /**
         * @language zh_CN
         * 销毁。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public dispose() {
        }
    }
}