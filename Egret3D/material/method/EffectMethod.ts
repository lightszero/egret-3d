module egret3d {

     /**
     * @language zh_CN
     * @class egret3d.EffectMethod
     * @classdesc
     * AOMapMethod，DistanceFog，EnvironmentMappingMethod，LightMapMethod 的基类。
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class EffectMethod {

        protected materialData: MaterialData; 

        protected usage: MethodUsageData;

        protected vsMethodName: string = ""; 

        protected fsMethodName: string = ""; 

        protected context3D: Context3D;
        /**
        * @language zh_CN
        * 创建一个新的 EffectMethod 对象。
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
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
        }

        /**
        * @language zh_CN
        * 返回顶点方法名。
        * @version Egret 3.0
        * @platform Web,Native
        * @returns {String}
        */
        public get vertexMethodName(): string {
            return this.vsMethodName; 
        }

        /**
        * @language zh_CN
        * 返回frag方法名。
        * @version Egret 3.0
        * @platform Web,Native
        * @returns {String}
        */
        public get fragMethodName(): string {
            return this.fsMethodName;
        }

        /**
         * @private
         * @language zh_CN
         * 激活特效。
         * @version Egret 3.0
         * @platform Web,Native
         * @param context3D {Context3D}
         * @param usage {MethodUsageData}
         * @param materialData {MaterialData}
         * @param modeltransform {Matrix4_4}
         * @param camera3D {Camera3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         */
        public activateEffect(context3D: Context3D,usage:MethodUsageData,materialData:MaterialData, modeltransform: Matrix4_4, camera3D: Camera3D ,geometry:GeometryBase , animation:IAnimation ) {
            //change constData
            this.context3D = context3D;
        }
        /**
         * @private
         * @language zh_CN
         * 更新特效。
         * @version Egret 3.0
         * @platform Web,Native
         * @param context3D {Context3D}
         * @param usage {MethodUsageData}
         * @param materialData {MaterialData}
         * @param modeltransform {Matrix4_4}
         * @param camera3D {Camera3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         */
        public updataEffect(context3D: Context3D, usage: MethodUsageData, materialData: MaterialData, modeltransform: Matrix4_4, camera3D: Camera3D, geometry:GeometryBase , animation: IAnimation ) {

        }

        /**
         * @private
         * @language zh_CN
         * 销毁。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public dispose() {
        }
    }
}