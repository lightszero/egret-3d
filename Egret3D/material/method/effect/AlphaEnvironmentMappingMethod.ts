module egret3d {
     /**
     * @private
     * @language zh_CN
     * @class egret3d.EnvironmentMappingMethod
     * @classdesc
     * 环境贴图方法。
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class AlphaEnvironmentMappingMethod extends EffectMethod {

        private texture: TextureBase; 
        private reflectValue: number = 1.0;
        /**
        * @language zh_CN
        * 创建一个新的 EnvironmentMappingMethod 对象。
        * @param texture {TextureBase}
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(texture: TextureBase) {
            super();
            this.fsMethodName = "AlphaEnvironmentMapping_fragment";
            this.lightTexture = texture; 
        }

        

        /**
         * @language zh_CN
         * 设置材质信息。
         * @param materialData {MaterialData}
         * @param usage {MethodUsageData}
        * @version Egret 3.0
        * @platform Web,Native
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
         * @param texture {TextureBase}
         * @version Egret 3.0
         * @platform Web,Native
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
         * 销毁
         * @version Egret 3.0
         * @platform Web,Native
         */
        public dispose() {
        }
    }
} 