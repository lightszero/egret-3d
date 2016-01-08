module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.AOMapMethod
     * @classdesc
     * AO贴图方法。
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class AOMapMethod extends EffectMethod {

        private texture: TextureBase;
        private useSecond: boolean = false ;
        /**
         * @language zh_CN
         * 创建一个新的 AOMapMethod 对象。
         * @param texture {TextureBase}
         * @version Egret 3.0
         * @platform Web,Native
         */
        constructor(texture: TextureBase,useSecond:boolean=true) {
            super();
            this.fsMethodName = "AOMap_fragment";
            this.lightTexture = texture;
            this.useSecond = useSecond;
        }

        /**
         * @language zh_CN
         * 设置MaterialData。
         * @param materialData {MaterialData}
         * @param usage {MethodUsageData}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public setMaterialData(materialData: MaterialData, usage: MethodUsageData) {
            this.usage = usage;
            this.materialData = materialData;

            if (this.texture)
                this.materialData.aoMapTex = this.texture;
            else
                this.materialData.aoMapTex = CheckerboardTexture.texture;
        }

        /**
         * @language zh_CN
         * 设置lightTexture。
         * @param texture {TextureBase}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set lightTexture(texture: TextureBase) {
            this.texture = texture;
            if (texture) {
                if (this.materialData) {
                    this.materialData.aoMapTex = texture;
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
         * @version Egret 3.0
         * @platform Web,Native
         */
        public activateEffect(context3D: Context3D, usage: MethodUsageData, materialData: MaterialData, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
            this.context3D = context3D;
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
         * @version Egret 3.0
         * @platform Web,Native
         */
        public updataEffect(context3D: Context3D, usage: MethodUsageData, materialData: MaterialData, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
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