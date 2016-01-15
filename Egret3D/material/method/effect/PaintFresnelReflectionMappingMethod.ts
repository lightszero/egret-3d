module egret3d {
     /**
     * @private
     * @language zh_CN
     * @class egret3d.EnvironmentMappingMethod
     * @classdesc
     * 模拟汽车油漆
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class PaintFresnelReflectionMappingMethod extends EffectMethod {

        private _envtexture: TextureBase; 
        private _rimPower: number = 0.9;
        private _envLightPower: number = 0.5;
        private _randomTexture: TextureBase; 
        private _maskColor: number = 0xffffff;
        private _maskColorR: number = 1.0;
        private _maskColorG: number = 0.0;
        private _maskColorB: number = 0.0;
        /**
        * @language zh_CN
        * 创建一个新的 EnvironmentMappingMethod 对象。
        * @param texture {TextureBase}
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(texture: TextureBase,randomTexture:TextureBase) {
            super();
            this.fsMethodName = "PaintFresnelReflection_fragment";
            this.envtexture = texture; 
            this.randomTexture = randomTexture; 
        }

        /**
        * @language zh_CN
        * 设置反射值。
        * @param value{Number}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set rimPower(value: number) {
            this._rimPower = value; 
        }

        /**
        * @language zh_CN
        * 获取反射值。
        * @returns {Number}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get rimPower(): number {
            return this._rimPower;
        }

        /**
        * @language zh_CN
        * 设置反射值。
        * @param value{Number}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set envLightPower(value: number) {
            this._envLightPower = value;
        }

        /**
        * @language zh_CN
        * 获取反射值。
        * @returns {Number}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get envLightPower(): number {
            return this._envLightPower;
        }

        public set maskColor(value: number) {
            this._maskColor = value;
            this._maskColorR = (value >> 16 & 0xff) / 255;
            this._maskColorG = (value >> 8 & 0xff) / 255;
            this._maskColorB = (value & 0xff) / 255;
        }

        public get maskColor(): number {
            return this._maskColor; 
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

            if (this._envtexture)
                this.materialData.environmentMapTex = this._envtexture;
            else
                this.materialData.environmentMapTex = CheckerboardTexture.texture;

            if (this._randomTexture)
                this.materialData.maskTex = this._randomTexture;
            else
                this.materialData.maskTex = CheckerboardTexture.texture;
        }

        /**
         * @language zh_CN
         * 设置灯光贴图。
         * @param texture {TextureBase}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set envtexture(texture: TextureBase) {
            this._envtexture = texture; 
            if (texture) {
                if (this.materialData) {
                    this.materialData.environmentMapTex = texture;
                    this.materialData.textureChange = true;
                }
            }
        }

        /**
         * @language zh_CN
         * 设置灯光贴图。
         * @param texture {TextureBase}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set randomTexture(texture: TextureBase) {
            this._randomTexture = texture;
            if (texture) {
                if (this.materialData) {
                    this.materialData.maskTex = texture;
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
            usage["maskColor"] = context3D.getUniformLocation(usage.program3D, "maskColor"); 
            usage["rimPower"] = context3D.getUniformLocation(usage.program3D, "rimPower");
            usage["envLightPower"] = context3D.getUniformLocation(usage.program3D, "envLightPower");
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
            context3D.gl.uniform3f(usage["maskColor"], this._maskColorR, this._maskColorG, this._maskColorB);
            context3D.gl.uniform1f(usage["rimPower"], this._rimPower);
            context3D.gl.uniform1f(usage["envLightPower"], this._envLightPower);
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