module egret3d {

     /**
     * @language zh_CN
     * @class egret3d.LightMapMethod
     * @classdesc
     * 光照贴图方法。
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class LightMapMethod extends EffectMethod {

        private texture: TextureBase; 

        /**
        * @language zh_CN
        * 创建一个新的 LightMapMethod 对象。
        * @version Egret 3.0
        * @platform Web,Native
        * @param texture {TextureBase}
        */
        constructor(texture: TextureBase) {
            super();
            this.fsMethodName = "lightMap_fragment";
            this.lightTexture = texture; 
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
                this.materialData.lightMapTex = this.texture;
            else
                this.materialData.lightMapTex = CheckerboardTexture.texture;
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
                    this.materialData.lightMapTex = texture;
                    this.materialData.textureChange = true;
                }
            }
        }

        /**
         * @private
         * @language zh_CN
         * 激活特效
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
            //usage["uniform_globalFog"] = context3D.getUniformLocation(usage.program3D, "uniform_globalFog");
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
           // context3D.gl.uniform1fv(usage["uniform_globalFog"], this._data);
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