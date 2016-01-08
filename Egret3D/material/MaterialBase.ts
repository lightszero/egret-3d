module egret3d {
    export enum MaterialType { DIFFUSE, DIFFUSE_BUMP, DIFFUSE_BUMP_SPECULAR, RGBATERRAIN }

     /**
     * @language zh_CN
     * @class egret3d.MaterialBase
     * @classdesc
     * TerrainMaterial,TextureMaterial 的基类。
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class MaterialBase {

        /**
         * @language zh_CN
         * 材质数据。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public materialData: MaterialData;

        /**
         * @language zh_CN
         * diffuse pass。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public diffusePass: MaterialPassBase;
        /**
         * @language zh_CN
         * shadow pass。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public shadowPass    : ShadowMapPass ;
        /**
         * @language zh_CN
         * 法线pass。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public normalPass: NormalMapPass;
        /**
         * @language zh_CN
         * depthPass。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public depthPass: DepthMapPass;
        /**
         * @language zh_CN
         * position pass。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public positionPass: MaterialPassBase;
        /**
         * @language zh_CN
         * outLin pass。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public outLinePass: MaterialPassBase;
        /**
        * @language zh_CN
        * 创建一个新的 MethodBase 对象。
        * @version Egret 3.0
        * @platform Web,Native
        * @param materialData {MaterialData}
        */
        constructor(materialData: MaterialData = null) {
            if (materialData == null) {
                this.materialData = new MaterialData();
                this.materialData.diffusePassUsageData.materialSourceData = new Float32Array(16);
            } else {
                this.materialData = materialData; 
            }
            this.setData(this.materialData);
            
        }

        /**
        * @language zh_CN
        * 初始化 MatPass。
        * @version Egret 3.0
        * @platform Web,Native
        */
        protected initMatPass() {
            switch (this.materialData.matType) {
                case MaterialType.DIFFUSE:
                    this.diffusePass = new DiffuseMapPass(this.materialData);
                    break;
                case MaterialType.DIFFUSE_BUMP:
                    this.diffusePass = new DiffuseMapPass(this.materialData);
                    break;
                case MaterialType.DIFFUSE_BUMP_SPECULAR:
                    this.diffusePass = new DiffuseMapPass(this.materialData);
                    break;
                case MaterialType.RGBATERRAIN:
                    this.diffusePass = new TerrainMapPass(this.materialData);
                    break;
            }
        }

        /**
        * @language zh_CN
        * 设置材质球数据。
        * @version Egret 3.0
        * @platform Web,Native
        * @param materialData {MaterialData}
        */
        public setData(matData: MaterialData) {
            if (this.materialData) {
                this.materialData.dispose();
            } 

            this.materialData = matData;
            this.ambientColor = this.materialData.ambientColor;
            this.ambientPower = this.materialData.ambientPower;
            this.normalPower = this.materialData.normalPower;
            this.specularColor = this.materialData.specularColor;
            this.specularPower = this.materialData.specularPower;
            this.blendMode = this.materialData.blendMode;
        }

        /**
         * @language zh_CN
         * 返回材质球数据。
         * @version Egret 3.0
         * @platform Web,Native
         * @returns {MaterialData}
         */
        public getData(): MaterialData {
            return this.materialData; 
        }

        /**
        * @language zh_CN
        * 添加材质 DiffusePass 方法。
        * @version Egret 3.0
        * @platform Web,Native
        * @param method {MethodBase}
        */
        public addDiffusePassMothod(method: MethodBase) {
            this.diffusePass.addMethod(method);
        }

        /**
        * @language zh_CN
        * 添加材质 DiffusePassEffect 方法。
        * @version Egret 3.0
        * @platform Web,Native
        * @param method {EffectMethod}
        */
        public addDiffusePassEffectMothod(method: EffectMethod) {
            this.diffusePass.addEffectMethod(method);
        }

        /**
        * @language zh_CN
        * 设置材质 shadowMaping 方法。
        * @version Egret 3.0
        * @platform Web,Native
        * @param method {ShadowMapingMethod}
        */
        public set shadowMapingMethod(method: ShadowMapingMethod) {
            this.diffusePass.shadowMaping = method;
        }

        /**
        * @language zh_CN
        * 返回 shadowMaping 方法。
        * @version Egret 3.0
        * @platform Web,Native
        * @returns {ShadowMapingMethod}
        */
        public get shadowMapingMethod( ): ShadowMapingMethod {
            return this.diffusePass.shadowMaping;
        }

        /**
        * @language zh_CN
        * 设置材质 diffuseColor。
        * @version Egret 3.0
        * @platform Web,Native
        * @param color {Number}
        */
        public set diffuseColor(color: number) {
            this.materialData.materialDataNeedChange = true;
            this.materialData.diffuseColor = color ;
        }

        /**
        * @language zh_CN
        * 设置材质 ambientColor。
        * @version Egret 3.0
        * @platform Web,Native
        * @param color {Number}
        */
        public set ambientColor(color: number) {
            this.materialData.materialDataNeedChange = true;
            this.materialData.ambientColor = color;
        }

        /**
        * @language zh_CN
        * 设置材质 specularColor。
        * @version Egret 3.0
        * @platform Web,Native
        * @param color {Number}
        */
        public set specularColor(color: number) {
            this.materialData.materialDataNeedChange = true;
            this.materialData.specularColor = color;
        }


        /**
         * @language zh_CN
         * 设置材质 alpha 值。
         * @version Egret 3.0
         * @platform Web,Native
         * @param value {Number}
         */
        public set alpha(value: number) {
            if (this.materialData.alpha != value){
                this.materialData.alpha = value;
                this.materialData.materialDataNeedChange = true;
            }
        }

        /**
         * @language zh_CN
         * 返回材质 alpha 值。
         * @version Egret 3.0
         * @platform Web,Native
         * @returns {Number}
         */
        public get alpha(): number {
            return this.materialData.alpha;
        }

        /**
         * @language zh_CN
         * 设置材质 shininess 值。
         * @version Egret 3.0
         * @platform Web,Native
         * @param value {Number}
         */
        public set shininess(value: number) {
            if (this.materialData.shininess != value) {
                this.materialData.shininess = value;
                this.materialData.materialDataNeedChange = true;
            }
        }

        /**
         * @language zh_CN
         * 返回材质 shininess 值。
         * @version Egret 3.0
         * @platform Web,Native
         * @returns {Number}
         */
        public get shininess(): number {
            return this.materialData.shininess;
        }

        /**
         * @language zh_CN
         * 设置材质 specularPower 值。
         * @version Egret 3.0
         * @platform Web,Native
         * @param value {Number}
         */
        public set specularPower(value: number) {
            if (this.materialData.specularPower != value) {
                this.materialData.specularPower = value;
                this.materialData.materialDataNeedChange = true;
            }
        }

        /**
         * @language zh_CN
         * 返回材质 specularPower 值。
         * @version Egret 3.0
         * @platform Web,Native
         * @returns {Number}
         */
        public get specularPower(): number {
            return this.materialData.specularPower;
        }


        /**
         * @language zh_CN
         * 设置材质 ambientPower 值。
         * @version Egret 3.0
         * @platform Web,Native
         * @param value {Number}
         */
        public set ambientPower(value: number) {
            if (this.materialData.ambientPower != value) {
                this.materialData.ambientPower = value;
                this.materialData.materialDataNeedChange = true;
            }
        }

        /**
         * @language zh_CN
         * 返回材质 ambientPower 值。
         * @version Egret 3.0
         * @platform Web,Native
         * @returns {Number}
         */
        public get ambientPower(): number {
            return this.materialData.ambientPower;
        }
        

        /**
         * @language zh_CN
         * 设置材质 diffusePower 值。
         * @version Egret 3.0
         * @platform Web,Native
         * @param value {Number}
         */
        public set diffusePower(value: number) {
            if (this.materialData.diffusePower != value) {
                this.materialData.diffusePower = value;
                this.materialData.materialDataNeedChange = true;
            }
        }

        /**
         * @language zh_CN
         * 返回材质 diffusePower 值。
         * @version Egret 3.0
         * @platform Web,Native
         * @returns {Number}
         */
        public get diffusePower(): number {
            return this.materialData.diffusePower;
        }

        /**
         * @language zh_CN
         * 设置材质 normalPower 值。
         * @version Egret 3.0
         * @platform Web,Native
         * @param value {Number}
         */
        public set normalPower(value: number) {
            if (this.materialData.normalPower != value) {
                this.materialData.normalPower = value;
                this.materialData.materialDataNeedChange = true;
            }
        }

        /**
         * @language zh_CN
         * 返回材质 normalPower 值。
         * @version Egret 3.0
         * @platform Web,Native
         * @returns {Number}
         */
        public get normalPower(): number {
            return this.materialData.normalPower;
        }

        /**
         * @language zh_CN
         * 设置材质 castShadow 值。
         * @version Egret 3.0
         * @platform Web,Native
         * @param value {boolean}
         */
        public set castShadow(value: boolean) {
            this.materialData.castShadow  = value;
            if (value) {
                if (!ShadowRender.frameBuffer) {
                    alert("要使用shadow view3D.useShadow = true ");
                } else {
                    if (!this.shadowPass)
                        this.shadowPass = new ShadowMapPass(this.materialData);
                }
            }
        }

        /**
         * @language zh_CN
         * 返回材质 castShadow 值。
         * @version Egret 3.0
         * @platform Web,Native
         * @returns {boolean}
         */
        public get castShadow(): boolean {
            return this.materialData.castShadow ;
        }

        /**
         * @language zh_CN
         * 设置材质 acceptShadow 值。
         * @version Egret 3.0
         * @platform Web,Native
         * @param value {boolean}
         */
        public set acceptShadow(value: boolean) {
            this.materialData.acceptShadow = value;
        }

         /**
         * @language zh_CN
         * 返回材质 acceptShadow 值。
         * @version Egret 3.0
         * @platform Web,Native
         * @returns {boolean}
         */
        public get acceptShadow(): boolean {
            return this.materialData.acceptShadow;
        }

        /**
         * @language zh_CN
         * 设置材质 smooth 值。
         * @version Egret 3.0
         * @platform Web,Native
         * @param value {boolean}
         */
        public set smooth(val:boolean) {
            this.materialData.smooth = val;
        }
         /**
         * @language zh_CN
         * 返回材质 smooth 值。
         * @version Egret 3.0
         * @platform Web,Native
         * @returns {boolean}
         */
        public get smooth(): boolean {
            return this.materialData.smooth; 
        }
        /**
         * @language zh_CN
         * 设置材质 repeat 值。
         * @version Egret 3.0
         * @platform Web,Native
         * @param value {boolean}
         */
        public set repeat(val: boolean) {
            this.materialData.repeat = val;
        }
         /**
         * @language zh_CN
         * 返回材质 repeat 值。
         * @version Egret 3.0
         * @platform Web,Native
         * @returns {boolean}
         */
        public get repeat(): boolean {
            return this.materialData.repeat;
        }
        /**
         * @language zh_CN
         * 设置材质 bothside 值。
         * @version Egret 3.0
         * @platform Web,Native
         * @param value {boolean}
         */
        public set bothside(val: boolean) {
            this.materialData.bothside = val;
        }
         /**
         * @language zh_CN
         * 返回材质 bothside 值。
         * @version Egret 3.0
         * @platform Web,Native
         * @returns {boolean}
         */
        public get bothside(): boolean {
            return this.materialData.bothside;
        }

        
        /**
         * @language zh_CN
         * 设置材质 blendMode 值。
         * @version Egret 3.0
         * @platform Web,Native
         * @param value {BlendMode}
         */
        public set blendMode(value: BlendMode) {
            this.materialData.blendMode = value;
            switch (value) {
                case BlendMode.NORMAL:
                    this.materialData.blend_src = Egret3DDrive.ONE;
                    this.materialData.blend_dest = Egret3DDrive.ZERO;
                    break;
                case BlendMode.LAYER:
                    this.materialData.blend_src = Egret3DDrive.SRC_ALPHA;
                    this.materialData.blend_dest = Egret3DDrive.ZERO;
                    this.materialData.alphaBlending = true ;
                    break;
                case BlendMode.MULTIPLY:
                    this.materialData.blend_src = Egret3DDrive.ZERO;
                    this.materialData.blend_dest = Egret3DDrive.SRC_COLOR;
                    this.materialData.alphaBlending = true;
                    break;
                case BlendMode.ADD:
                    this.materialData.blend_src = Egret3DDrive.SRC_ALPHA;
                    this.materialData.blend_dest = Egret3DDrive.ONE;
                    this.materialData.alphaBlending = true ;
                    break;
                case BlendMode.ALPHA:
                    this.materialData.blend_src = Egret3DDrive.SRC_ALPHA;
                    this.materialData.blend_dest = Egret3DDrive.ONE_MINUS_SRC_ALPHA;
                    this.materialData.alphaBlending = true;
                    break;
                case BlendMode.SCREEN:
                    this.materialData.blend_src = Egret3DDrive.ONE;
                    this.materialData.blend_dest = Egret3DDrive.ONE_MINUS_SRC_COLOR;
                    break;
            }
        }

        /**
         * @language zh_CN
         * 设置材质 Outline 样式。
         * @version Egret 3.0
         * @platform Web,Native
         * @param color {Number}
         * @param thickness {Number}
         */
        public setOutlineStyler(color: number, thickness: number) {
            if (!this.outLinePass){
                //this.outLinePass = new OutLinePass();
            }
        }

        /**
         * @language zh_CN
         * 设置材质 depthTest。
         * @version Egret 3.0
         * @platform Web,Native
         * @param value {boolean}
         */
        public set depthTest(value: boolean) {
            this.materialData.depthTest = value; 
        }

         /**
         * @language zh_CN
         * 返回材质 depthTest 值。
         * @version Egret 3.0
         * @platform Web,Native
         * @returns {boolean}
         */
        public get depthTest(): boolean {
            return this.materialData.depthTest; 
        }

         /**
         * @language zh_CN
         * 返回材质 blendMode 值。
         * @version Egret 3.0
         * @platform Web,Native
         * @returns {boolean}
         */
        public get blendMode(): BlendMode {
            return this.materialData.blendMode ;
        }

        /**
         * @language zh_CN
         * 设置材质 lightGroup 。
         * @version Egret 3.0
         * @platform Web,Native
         * @param lightGroup {LightGroup}
         */
        public set lightGroup(lightGroup: LightGroup) {
            this.materialData.directLightList = lightGroup.directLightList;
            this.materialData.sportLightList = lightGroup.spotLightList;
            this.materialData.pointLightList = lightGroup.pointLightList;
        }

        /**
         * @language zh_CN
         * 设置材质 diffuseTexture 。
         * @version Egret 3.0
         * @platform Web,Native
         * @param texture {TextureBase}
         */
        public set diffuseTexture(texture: TextureBase) {
            if (texture) {
                this.materialData.diffuseTex = texture;
                this.materialData.textureChange = true;
            }
        }

         /**
         * @language zh_CN
         * 返回材质 diffuseTexture。
         * @version Egret 3.0
         * @platform Web,Native
         * @returns {TextureBase}
         */
        public get diffuseTexture(): TextureBase {
            return this.materialData.diffuseTex;
        }

        /**
         * @language zh_CN
         * 设置材质 normalTexture 。
         * @version Egret 3.0
         * @platform Web,Native
         * @param texture {TextureBase}
         */
        public set normalTexture(texture: TextureBase) {
            if (texture) {
                this.materialData.normalTex = texture;
                this.materialData.textureChange = true;
                if (this.materialData.matType != MaterialType.DIFFUSE_BUMP) {
                    this.materialData.matType = MaterialType.DIFFUSE_BUMP; 
                    this.materialData.passChange = true ;
                }
            }
        }

        /**
         * @language zh_CN
         * 设置材质 specularTexture 。
         * @version Egret 3.0
         * @platform Web,Native
         * @param texture {TextureBase}
         */
        public set specularTexture(texture: TextureBase) {
            if (texture) {
                this.materialData.specularTex = texture;
                this.materialData.textureChange = true;
                if (this.materialData.matType != MaterialType.DIFFUSE_BUMP_SPECULAR) {
                    this.materialData.matType = MaterialType.DIFFUSE_BUMP_SPECULAR;
                    this.materialData.passChange = true ;
                }
            }
        }

        /**
         * @language zh_CN
         * 克隆材质。
         * @version Egret 3.0
         * @platform Web,Native
         * @returns {MaterialBase}
         */
        public clone(): MaterialBase {
            var mat: MaterialBase = new MaterialBase(this.materialData.clone());
            return mat;
        }

        /**
         * @language zh_CN
         * 激活 DiffusePass
         * @version Egret 3.0
         * @platform Web,Native
         * @language zh_CN
         * @param context3D {Context3D}
         * @param camera3D {Camera3D}
         * @param modelMatrix {Matrix4_4}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         */
        public activateDiffusePass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeometryBase, animation: IAnimation) {
            if (this.outLinePass){
                this.outLinePass.initShader(context3D, geometry, animation);
                this.outLinePass.activate(context3D, modelMatrix, camera3D, geometry, animation);
            }
            this.diffusePass.initShader(context3D, geometry, animation);
            this.diffusePass.activate(context3D, modelMatrix, camera3D, geometry, animation);
        }

        /**
         * @language zh_CN
         * 渲染 DiffusePass
         * @version Egret 3.0
         * @platform Web,Native
         * @language zh_CN
         * @param context3D {Context3D}
         * @param camera3D {Camera3D}
         * @param modelMatrix {Matrix4_4}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         */
        public rendenDiffusePass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4,geometry:GeometryBase , animation: IAnimation ) {
            if (this.outLinePass) {
                this.outLinePass.draw(context3D, modelMatrix, camera3D, geometry, animation);
            }
            if (!this.materialData.passChange) {
                this.diffusePass.draw(context3D, modelMatrix, camera3D, geometry, animation);
            } else {
                this.activateDiffusePass(context3D, camera3D, modelMatrix, geometry, animation);
                this.materialData.passChange = false ;
            }
        }

        /**
         * @language zh_CN
         * 激活 ShadowPass
         * @version Egret 3.0
         * @platform Web,Native
         * @language zh_CN
         * @param context3D {Context3D}
         * @param camera3D {Camera3D}
         * @param modelMatrix {Matrix4_4}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         */
        public activateShadowPass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeometryBase,animation: IAnimation ) {
            this.shadowPass.initShader(context3D, geometry, animation);
            this.shadowPass.activate(context3D, modelMatrix, camera3D, geometry , animation );
        }

        /**
         * @language zh_CN
         * 渲染 ShadowPass
         * @version Egret 3.0
         * @platform Web,Native
         * @language zh_CN
         * @param context3D {Context3D}
         * @param camera3D {Camera3D}
         * @param modelMatrix {Matrix4_4}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         */
        public rendenShadowPass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeometryBase,animation: IAnimation ) {
            if (!this.materialData.passChange) {
                this.shadowPass.draw(context3D, modelMatrix, camera3D, geometry, animation)
            } else {
                this.activateShadowPass(context3D, camera3D, modelMatrix, geometry, animation);
            }
        }

        /**
         * @language zh_CN
         * 激活 NormalPass
         * @version Egret 3.0
         * @platform Web,Native
         * @language zh_CN
         * @param context3D {Context3D}
         * @param camera3D {Camera3D}
         * @param modelMatrix {Matrix4_4}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         */
        public activateNormalPass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeometryBase, animation: IAnimation ) {
            this.normalPass.initShader(context3D, geometry, animation);
            this.normalPass.activate(context3D, modelMatrix, camera3D, geometry,  animation );
        }
        /**
         * @language zh_CN
         * 渲染 NormalPass
         * @version Egret 3.0
         * @platform Web,Native
         * @language zh_CN
         * @param context3D {Context3D}
         * @param camera3D {Camera3D}
         * @param modelMatrix {Matrix4_4}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         */
        public rendenNormalPass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeometryBase, animation: IAnimation  ) {
            //if (this.materialData._NormalActiveState) {
            //    this.normalPass.draw(context3D, modelMatrix, camera3D,geometry, animation )
            //} else {
            //    this.materialData._NormalActiveState = true;
            //    this.activateNormalPass(context3D, camera3D,modelMatrix,geometry, animation);
            //}
        }

        /**
         * @language zh_CN
         * 激活 DepthPass
         * @version Egret 3.0
         * @platform Web,Native
         * @language zh_CN
         * @param context3D {Context3D}
         * @param camera3D {Camera3D}
         * @param modelMatrix {Matrix4_4}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         */
        public activateDepthPass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeometryBase, animation: IAnimation) {
            this.depthPass.initShader(context3D, geometry, animation);
            this.depthPass.activate(context3D, modelMatrix, camera3D, geometry, animation);
        }
        /**
         * @language zh_CN
         * 渲染 DepthPass
         * @version Egret 3.0
         * @platform Web,Native
         * @language zh_CN
         * @param context3D {Context3D}
         * @param camera3D {Camera3D}
         * @param modelMatrix {Matrix4_4}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         */
        public rendenDepthPass(context3D: Context3D, camera3D: Camera3D, modelMatrix: Matrix4_4, geometry: GeometryBase, animation: IAnimation) {
            //if (this.materialData._DepthActiveState) {
            //    this.depthPass.draw(context3D, modelMatrix, camera3D, geometry, animation)
            //} else {
            //    this.materialData._DepthActiveState = true;
            //    this.activateDepthPass(context3D, camera3D, modelMatrix, geometry, animation);
            //}
        }
        /**
         * @language zh_CN
         * 销毁
         * @version Egret 3.0
         * @platform Web,Native
         */
        public dispose() {
        }
      
    }
} 