module egret3d {

     /**
    * @private
     * @language zh_CN
     * @class egret3d.DiffuseMapPass
     * @classdesc
     * cube贴图用的漫反射渲染通道
     * 漫反射贴图通道渲染器，TerrainMapPass 的基类
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class CubeDiffuseMapPass extends DiffuseMapPass {

        /**
        * @language zh_CN
        * 创建一个新的 DiffuseMapPass 对象。
        * @param data {MaterialData} 材质数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(data: MaterialData) {
            super(data);
        }
           
        /**
         * @language zh_CN
         * 初始化 UseMethod。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public initUseMethod() {
            var i: number = 0;

            this.materialData.diffusePassUsageData.directLightData = new Float32Array(this.materialData.directLightList.length * DirectLight.stride);
            this.materialData.diffusePassUsageData.sportLightData = new Float32Array(this.materialData.sportLightList.length * SpotLight.stride);
            this.materialData.diffusePassUsageData.pointLightData = new Float32Array(this.materialData.pointLightList.length * PointLight.stride);

            this.diffuseMethod = new DiffuseMethod();
            this.pixelShader.addMethod(this.diffuseMethod);
            this.pixelShader.addShader(this.diffuseMethod.fragMethodName);

            if (this.materialData.textureMethodTypes.indexOf( TextureMethodType.DIFFUSE ) != -1 ) {
                this.pixelShader.addShader("cubeDiffuseMap_fragment");
            }
            if (this.materialData.textureMethodTypes.indexOf(TextureMethodType.NORMAL) != -1) {
                this.pixelShader.addShader("normalMap_fragment");
            }
            if (this.materialData.textureMethodTypes.indexOf(TextureMethodType.SPECULAR) != -1) {
                this.pixelShader.addShader("specularMap_fragment");
            }
            for (i = 0; i < this.materialData.directLightList.length; i++) { 
                this.pixelShader.addShader("directLight_fragment");
            }

            for (i = 0; i < this.materialData.sportLightList.length; i++) {
                this.pixelShader.addShader("sportLight_fragment");
            }

            for (i = 0; i < this.materialData.pointLightList.length; i++) {
                this.pixelShader.addShader("pointLight_fragment");
            }

            if (this.animation) {
                if (this.animation.animaNodeCollection){
                    var vsShaderNames: string[] = this.animation.animaNodeCollection.getNodesVertexShaders();
                    var fsShaderNames: string[] = this.animation.animaNodeCollection.getNodesFragmentShaders();
                    for (i = 0; i < vsShaderNames.length; i++) {
                        this.vertexShader.addShader(vsShaderNames[i]);
                    }
                    for (i = 0; i < fsShaderNames.length; i++) {
                        this.pixelShader.addShader(fsShaderNames[i]);
                    }
                }
            }

            if (this.materialData.acceptShadow && this.shadowMaping) {
                this.pixelShader.addMethod(this.shadowMaping);
                this.vertexShader.addShader(this.shadowMaping.vertexMethodName);
                this.pixelShader.addShader(  this.shadowMaping.fragMethodName);
            }

            this.pixelShader.addShader("diffuse_fragmentEnd");

            if (this.effectMethodList){
                for (var i: number = 0; i < this.effectMethodList.length; i++) {
                    this.pixelShader.addEffectMethod(this.effectMethodList[i]);
                    this.pixelShader.addShader(this.effectMethodList[i].fragMethodName);
                }
            }

  
            
        }


        /**
         * @language zh_CN
         * 初始化 shader 。
         * @param context3D {Context3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
        * @version Egret 3.0
        * @platform Web,Native
         */
        public initShader(context3D: Context3D, geometry: GeometryBase, animation: IAnimation) {
            super.initShader(context3D, geometry, animation);
        }

        /**
         * @language zh_CN
         * 重置纹理。
         * @version Egret 3.0
         * @platform Web,Native
         */
        protected resetTexture() {
            //--------texture----------------
            var sampler2D: GLSL.Sampler2D;
            for (var index in this.materialData.diffusePassUsageData.sampler2DList) {
                sampler2D = this.materialData.diffusePassUsageData.sampler2DList[index];
                if (this.materialData[sampler2D.varName]) {
                    sampler2D.texture = this.materialData[sampler2D.varName];
                }
            }

            var sampler3D: GLSL.Sampler3D;
            for (var index in this.materialData.diffusePassUsageData.sampler3DList) {
                sampler3D = this.materialData.diffusePassUsageData.sampler3DList[index];
                if (this.materialData[sampler3D.varName]) {
                    sampler3D.texture = this.materialData[sampler3D.varName];
                }
            }
            this.materialData.textureChange = false; 
        }   
        /**
         * @language zh_CNa
         * 激活 漫反射贴图通道渲染器。
         * @param context3D {Context3D}
         * @param modeltransform {Matrix4_4}
         * @param camera3D {Camera3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public activate(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {

            this.materialData.diffusePassUsageData.uniform_materialSource.uniformIndex = context3D.getUniformLocation(this.materialData.diffusePassUsageData.program3D, this.materialData.diffusePassUsageData.uniform_materialSource.varName);

            if (this.materialData.directLightList.length > 0) {
               this.materialData.diffusePassUsageData.uniform_directLightSource.uniformIndex = context3D.getUniformLocation(this.materialData.diffusePassUsageData.program3D, this.materialData.diffusePassUsageData.uniform_directLightSource.varName);
            }
            if (this.materialData.sportLightList.length > 0) {
               this.materialData.diffusePassUsageData.uniform_sportLightSource.uniformIndex = context3D.getUniformLocation(this.materialData.diffusePassUsageData.program3D, this.materialData.diffusePassUsageData.uniform_sportLightSource.varName);
            }
            if (this.materialData.pointLightList.length > 0) {
               this.materialData.diffusePassUsageData.uniform_pointLightSource.uniformIndex = context3D.getUniformLocation(this.materialData.diffusePassUsageData.program3D, this.materialData.diffusePassUsageData.uniform_pointLightSource.varName);
            }

            for (this.index = 0; this.index < this.materialData.diffusePassUsageData.vsMethodList.length; this.index++) {
                this.materialData.diffusePassUsageData.vsMethodList[this.index].activate(context3D, this.materialData.diffusePassUsageData.program3D, modeltransform, camera3D, geometry, animation);
            }
            for (this.index = 0; this.index < this.materialData.diffusePassUsageData.fsMethodList.length; this.index++) {
                this.materialData.diffusePassUsageData.fsMethodList[this.index].activate(context3D, this.materialData.diffusePassUsageData.program3D, modeltransform, camera3D, geometry, animation);
            }
            for (this.index = 0; this.index < this.materialData.diffusePassUsageData.effectMethodList.length; this.index++) {
                this.materialData.diffusePassUsageData.effectMethodList[this.index].activateEffect(context3D, this.materialData.diffusePassUsageData, this.materialData , modeltransform, camera3D, geometry, animation);
            }

            this.resetTexture();

            //--------texture----------------
            var sampler2D: GLSL.Sampler2D;
            for (var index in this.materialData.diffusePassUsageData.sampler2DList) {
                sampler2D = this.materialData.diffusePassUsageData.sampler2DList[index];
                sampler2D.uniformIndex = context3D.getUniformLocation(this.materialData.diffusePassUsageData.program3D, sampler2D.varName);
            }

                  //--------texture----------------
            var sampler3D: GLSL.Sampler3D;
            for (var index in this.materialData.diffusePassUsageData.sampler3DList) {
                sampler3D = this.materialData.diffusePassUsageData.sampler3DList[index];
                sampler3D.uniformIndex = context3D.getUniformLocation(this.materialData.diffusePassUsageData.program3D, sampler3D.varName);
            }

        }

        /**
         * @language zh_CNa
         * 索引。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public index: number = 0;
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
            super.draw(context3D, modeltransform, camera3D, geometry, animation);
        }
    }
} 