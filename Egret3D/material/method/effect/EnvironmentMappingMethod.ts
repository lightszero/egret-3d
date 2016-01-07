module egret3d {
     /**
     * @language zh_CN
     * @class egret3d.EnvironmentMappingMethod
     * @classdesc
     * 环境贴图方法。
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class EnvironmentMappingMethod extends EffectMethod {

        private texture: TextureBase; 

        private reflectValue: number = 1.0;
        /**
        * @language zh_CN
        * 创建一个新的 EnvironmentMappingMethod 对象。
        * @version Egret 3.0
        * @platform Web,Native
        * @param texture {TextureBase}
        */
        constructor(texture: TextureBase) {
            super();
            this.fsMethodName = "EnvironmentMapping_fragment";
            this.lightTexture = texture; 
        }

        /**
        * @language zh_CN
        * 设置反射值。
        * @version Egret 3.0
        * @platform Web,Native
        * @param value{Number}
        */
        public set reflect(value: number) {
            this.reflectValue = value; 
        }

        /**
        * @language zh_CN
        * 获取反射值。
        * @version Egret 3.0
        * @platform Web,Native
        * @returns {Number}
        */
        public get reflect(): number {
            return this.reflectValue;
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

            if (this.texture)
                this.materialData.environmentMapTex = this.texture;
            else
                this.materialData.environmentMapTex = CheckerboardTexture.texture;
        }

        /**
         * @language zh_CN
         * 设置灯光贴图。
         * @version Egret 3.0
         * @platform Web,Native
         * @param texture {TextureBase}
         */
        public set lightTexture(texture: TextureBase) {
            this.texture = texture; 
            if (texture) {
                if (this.materialData) {
                    this.materialData.environmentMapTex = texture;
                    this.materialData.textureChange = true;
                }
            }
        }

        /**
         * @private
         * @language zh_CN
         * 激活特效
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
        public activateEffect(context3D: Context3D, usage: MethodUsageData, materialData: MaterialData, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
            this.context3D = context3D;
            usage["reflectValue"] = context3D.getUniformLocation(usage.program3D, "reflectValue");
        }

        /**
         * @private
         * @language zh_CN
         * 更新特效
         * @param context3D {Context3D}
         * @param usage {MethodUsageData}
         * @param materialData {MaterialData}
         * @param modeltransform {Matrix4_4}
         * @param camera3D {Camera3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         */
        public updataEffect(context3D: Context3D, usage: MethodUsageData, materialData: MaterialData, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
            context3D.gl.uniform1f(usage["reflectValue"], this.reflectValue );
        }


        /**
         * @private
         * @language zh_CN
         * 销毁
         * @version Egret 3.0
         * @platform Web,Native
         */
        public dispose() {
        }
    }
} 