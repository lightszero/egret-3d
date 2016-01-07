module egret3d {

     /**
     * @language zh_CN
     * @class egret3d.MaterialPassBase
     * @classdesc
     * 材质通道渲染器。ColorMapPass，DepthMapPass，DiffuseMapPass，NormalMapPass，OutLinePass的基类。
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class MaterialPassBase {
        
        /**
         * @language zh_CN
         */
        protected shaderChange: boolean = false;
        /**
         * @language zh_CN
         */
        protected context3DChange: boolean = false;

        /**
         * @language zh_CN
         */
        protected materialData: MaterialData;

        /**
         * @language zh_CN
         */
        protected vertexShader: VertexShader;
        /**
         * @language zh_CN
         */
        protected pixelShader: PixelShader;

        /**
         * @language zh_CN
         */
        protected methodList: Array<MethodBase>;
        /**
         * @language zh_CN
         */
        protected effectMethodList: Array<EffectMethod>;

        /**
         * @language zh_CN
         */
        public diffuseMethod: MethodBase;
        /**
         * @language zh_CN
         */
        public shadowMaping: ShadowMapingMethod;

        /**
         * @language zh_CN
         */
        protected animation: IAnimation;
        /**
        * @language zh_CN
        * 创建一个新的 MaterialPassBase 对象。
        * @version Egret 3.0
        * @platform Web,Native
        * @param data {MaterialData} 材质数据
        */
        constructor(data: MaterialData = null) {
            this.materialData = data; 
        }

        /**
         * @language zh_CN
         * 添加方法。
         * @version Egret 3.0
         * @platform Web,Native
         * @param method {MethodBase}
         */
        public addMethod(method: MethodBase) {
            this.methodList = this.methodList || new Array<MethodBase>();
            this.methodList.push(method);
            this.shaderChange = true;
        }

        /**
         * @language zh_CN
         * 移除方法。
         * @version Egret 3.0
         * @platform Web,Native
         * @param method {MethodBase}
         */
        public removeMethod(method: MethodBase) {
            var index: number = this.methodList.indexOf(method);
            this.methodList.splice(index, 1);
            method.dispose();
        }

        /**
         * @language zh_CN
         * 添加EffectMethod。
         * @version Egret 3.0
         * @platform Web,Native
         * @param method {EffectMethod}
         */
        public addEffectMethod(method: EffectMethod) {
            this.effectMethodList = this.effectMethodList || new Array<EffectMethod>();
            this.effectMethodList.push(method);
            this.shaderChange = true;
        }

        /**
         * @language zh_CN
         * 移除 EffectMethod。
         * @version Egret 3.0
         * @platform Web,Native
         * @param method {EffectMethod}
         */
        public removeEffectMethod(method: EffectMethod) {
            var index: number = this.effectMethodList.indexOf(method);
            this.effectMethodList.splice(index, 1);
            method.dispose();
        }

        /**
         * @language zh_CN
         * 设置 cull 模式。
         * @version Egret 3.0
         * @platform Web,Native
         * @param value {Number}
         */
        public set cullMode(value: number) {
            this.materialData.cullFrontOrBack = value;
        }

        /**
         * @language zh_CN
         * 返回 cull 模式。
         * @version Egret 3.0
         * @platform Web,Native
         * @returns {Number}
         */
        public get cullMode( ): number {
            return this.materialData.cullFrontOrBack ;
        }

        /**
         * @language zh_CN
         * 设置 bothSides。
         * @version Egret 3.0
         * @platform Web,Native
         * @param flag {boolean}
         */
        public set bothSides(flag: boolean) {
            this.materialData.cullFrontOrBack = -1; 
        }

        /**
         * @language zh_CN
         * 返回bothSides。
         * @version Egret 3.0
         * @platform Web,Native
         * @returns {boolean}
         */
        public get bothSides( ): boolean {
            if (this.materialData.cullFrontOrBack == -1)
                return true
            return false ;
        }

        /**
         * @language zh_CN
         * 设置 lightGroup。
         * @version Egret 3.0
         * @platform Web,Native
         * @param lights {Array<LightBase>}
         */
        public set lightGroup(lights: Array<LightBase> ) {
      
        }

        /**
         * @language zh_CN
         * 初始化 shader 。
         * @version Egret 3.0
         * @platform Web,Native
         * @param context3D {Context3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         */
        public initShader(context3D: Context3D, geomtry: GeometryBase, animation: IAnimation) {
            this.animation = animation; 
        }

        /**
         * @language zh_CN
         * @returns {} 
         */
        protected resetTexture() {

        }

        private buildShader(context3D: Context3D) {
          
        }
         
        /**
         * @language zh_CNa
         * 激活。
         * @version Egret 3.0
         * @platform Web,Native
         * @param context3D {Context3D}
         * @param modeltransform {Matrix4_4}
         * @param camera3D {Camera3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         */
        public activate(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation ) {
        }

        /**
         * @language zh_CNa
         * 绘制。
         * @version Egret 3.0
         * @platform Web,Native
         * @param context3D {Context3D}
         * @param modeltransform {Matrix4_4}
         * @param camera3D {Camera3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         */
        public draw(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
            var i: number = 0;
           
            if (this.materialData.depthTest) {
                context3D.gl.enable(context3D.gl.DEPTH_TEST);
                context3D.gl.depthFunc(context3D.gl.LEQUAL);
            }
            else {
                context3D.gl.disable(context3D.gl.DEPTH_TEST);
                context3D.gl.depthFunc(context3D.gl.LEQUAL);
            }

            context3D.gl.cullFace(this.materialData.cullFrontOrBack);

            if (this.materialData.bothside){
                context3D.gl.disable(context3D.gl.CULL_FACE);
            } else
                context3D.gl.enable(context3D.gl.CULL_FACE);

            context3D.gl.enable(context3D.gl.BLEND);
            context3D.setBlendFactors(this.materialData.blend_src, this.materialData.blend_dest);

            if (this.materialData.alphaBlending)
                context3D.gl.depthMask(false);
        }

        /**
         * @language zh_CNa
         * 非活动。
         * @version Egret 3.0
         * @platform Web,Native
         * @param context3D {Context3D}
         * @param camera3D {Camera3D}
         */
        public unActive(context3D: Context3D, camera3D: Camera3D) {
        }

    }
} 
