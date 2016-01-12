module egret3d {

     /**
    * @private
     * @language zh_CN
     * @class egret3d.MaterialPassBase
     * @classdesc
     * 材质通道渲染器。ColorMapPass，DepthMapPass，DiffuseMapPass，NormalMapPass，OutLinePass的基类。
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class MaterialPassBase {
        
        /**
         * @private
         * @language zh_CN
         */
        protected shaderChange: boolean = false;
        /**
         * @private
         * @language zh_CN
         */
        protected context3DChange: boolean = false;
        /**
         * @private
         * @language zh_CN
         */
        protected materialData: MaterialData;
        /**
         * @private
         * @language zh_CN
         */
        protected vertexShader: VertexShader;
        /**
         * @private
         * @language zh_CN
         */
        protected pixelShader: PixelShader;
        /**
         * @private
         * @language zh_CN
         */
        protected methodList: Array<MethodBase>;
        /**
         * @private
         * @language zh_CN
         */
        protected effectMethodList: Array<EffectMethod>;
        /**
         * @private
         * @language zh_CN
         */
        public diffuseMethod: MethodBase;
        /**
         * @private
         * @language zh_CN
         */
        public shadowMaping: ShadowMapingMethod;
        /**
         * @private
         * @language zh_CN
         */
        protected animation: IAnimation;
        /**
        * @language zh_CN
        * 创建一个新的 MaterialPassBase 对象。
        * @param data {MaterialData} 材质数据
         * @version Egret 3.0
         * @platform Web,Native
        */
        constructor(data: MaterialData = null) {
            this.materialData = data; 
        }

        /**
         * @language zh_CN
         * 添加方法。
         * @param method {MethodBase}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public addMethod(method: MethodBase) {
            this.methodList = this.methodList || new Array<MethodBase>();
            this.methodList.push(method);
            this.shaderChange = true;
        }

        /**
         * @language zh_CN
         * 移除方法。
         * @param method {MethodBase}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public removeMethod(method: MethodBase) {
            var index: number = this.methodList.indexOf(method);
            this.methodList.splice(index, 1);
            method.dispose();
        }

        /**
         * @language zh_CN
         * 添加EffectMethod。
         * @param method {EffectMethod}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public addEffectMethod(method: EffectMethod) {
            this.effectMethodList = this.effectMethodList || new Array<EffectMethod>();
            this.effectMethodList.push(method);
            this.shaderChange = true;
        }

        /**
         * @language zh_CN
         * 移除 EffectMethod。
         * @param method {EffectMethod}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public removeEffectMethod(method: EffectMethod) {
            var index: number = this.effectMethodList.indexOf(method);
            this.effectMethodList.splice(index, 1);
            method.dispose();
        }

        ///**
        // * @language zh_CN
        // * 设置 cull 模式。
        // * @param value {Number}
        // * @version Egret 3.0
        // * @platform Web,Native
        // */
        //public set cullMode(value: number) {
        //    this.materialData.cullFrontOrBack = value;
        //}

        ///**
        // * @language zh_CN
        // * 返回 cull 模式。
        // * @returns {Number}
        // * @version Egret 3.0
        // * @platform Web,Native
        // */
        //public get cullMode( ): number {
        //    return this.materialData.cullFrontOrBack ;
        //}

        ///**
        // * @language zh_CN
        // * 设置 bothSides。
        // * @param flag {boolean}
        // * @version Egret 3.0
        // * @platform Web,Native
        // */
        //public set bothSides(flag: boolean) {
        //    this.materialData.cullFrontOrBack = -1; 
        //}

        ///**
        // * @language zh_CN
        // * 返回bothSides。
        // * @returns {boolean}
        // * @version Egret 3.0
        // * @platform Web,Native
        // */
        //public get bothSides( ): boolean {
        //    if (this.materialData.cullFrontOrBack == -1)
        //        return true
        //    return false ;
        //}

        ///**
        // * @language zh_CN
        // * 设置 lightGroup。
        // * @param lights {Array<LightBase>}
        // * @version Egret 3.0
        // * @platform Web,Native
        // */
        //public set lightGroup(lights: Array<LightBase> ) {
      
        //}

        /**
         * @language zh_CN
         * 初始化 shader 。
         * @param context3D {Context3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public initShader(context3D: Context3D, geomtry: GeometryBase, animation: IAnimation) {
            this.animation = animation; 
        }

        /**
         * @private
         * @language zh_CN
         * @returns {} 
         */
        protected resetTexture() {

        }

        private buildShader(context3D: Context3D) {
          
        }
         
        /**
         * @language zh_CNa
         * 激活 材质通道渲染器。
         * @param context3D {Context3D}
         * @param modeltransform {Matrix4_4}
         * @param camera3D {Camera3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public activate(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation ) {
        }

        /**
         * @language zh_CNa
         * 绘制。
         * @param context3D {Context3D}
         * @param modeltransform {Matrix4_4}
         * @param camera3D {Camera3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         * @version Egret 3.0
         * @platform Web,Native
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
         * 设置为非活动。
         * @param context3D {Context3D}
         * @param camera3D {Camera3D}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public unActive(context3D: Context3D, camera3D: Camera3D) {
        }

    }
} 
