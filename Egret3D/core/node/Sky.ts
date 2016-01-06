module egret3d {
                    
    /**
    * @class egret3d.Sky
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    * 场景中天空盒子，是6面体cube，以6张无缝结合的贴图构成.
    */
    export class Sky {

        private viewMatIndex: WebGLUniformLocation;
        private skyTexture: SkyTexture;

        private vsShaderSource: string;
        private fsShaderSource: string;

        private usage: MethodUsageData;
        private vsShader: GLSL.ShaderBase;
        private fsShader: GLSL.ShaderBase;
        private cubeGeometry: CubeGeometry;

        private skyMatrix: Matrix4_4;
        private modelMatrix: Matrix4_4;
                
        /**
        * @language zh_CN
        * constructor
        * @param skyTexture 天空盒子贴图
        */
        constructor(skyTexture:SkyTexture ) {
            this.skyTexture = skyTexture;
            this.usage = new MethodUsageData();
            this.vsShader = new GLSL.ShaderBase(null, this.usage);
            this.fsShader = new GLSL.ShaderBase(null, this.usage);
            this.setShader("sky_vertex", "sky_fragment");
            this.skyMatrix = new Matrix4_4();
            this.modelMatrix = new Matrix4_4();
        } 
                        
        /**
        * @language zh_CN
        * 设置渲染用的shader文件名字
        * @param vsName vs文件名
        * @param fsName fs文件名
        */
        public setShader(vsName: string, fsName: string) {
            this.vsShader.addShader(vsName);
            this.fsShader.addShader(fsName);

            this.vsShaderSource = this.vsShader.getShaderSource();
            this.fsShaderSource = this.fsShader.getShaderSource();
        }

        private rebuild(context3D: Context3D) {
            var vertexShader: IShader = context3D.creatVertexShader(this.vsShaderSource);
            var fragmentShader: IShader = context3D.creatFragmentShader(this.fsShaderSource);

            this.usage.program3D = context3D.creatProgram(vertexShader, fragmentShader);

            if (this.usage.program3D) {
                context3D.setProgram(this.usage.program3D);
            }

            this.cubeGeometry = this.cubeGeometry || new CubeGeometry( );
            if (!this.cubeGeometry.sharedVertexBuffer) {
                this.cubeGeometry.sharedVertexBuffer = context3D.creatVertexBuffer(this.cubeGeometry.verticesData);
                this.cubeGeometry.numberOfVertices = this.cubeGeometry.verticesData.length / this.cubeGeometry.vertexAttLength;
                this.cubeGeometry.vertexSizeInBytes = this.cubeGeometry.positionSize * Float32Array.BYTES_PER_ELEMENT + ///pos 0
                3 * Float32Array.BYTES_PER_ELEMENT + ///normal 12
                3 * Float32Array.BYTES_PER_ELEMENT + ///tangent 24
                4 * Float32Array.BYTES_PER_ELEMENT + ///color 36 
                2 * Float32Array.BYTES_PER_ELEMENT + ///uv 52
                2 * Float32Array.BYTES_PER_ELEMENT; ///uv2 60
                this.cubeGeometry.sharedIndexBuffer = context3D.creatIndexBuffer(this.cubeGeometry.indexData);
            }

            this.usage.attribute_position.uniformIndex = context3D.getShaderAttribLocation(this.usage.program3D, "attribute_position");
            this.usage.uniform_ProjectionMatrix.uniformIndex = context3D.getUniformLocation(this.usage.program3D, "uniform_ProjectionMatrix");
            this.usage.uniform_ModelMatrix.uniformIndex = context3D.getUniformLocation(this.usage.program3D, "uniform_ModelMatrix");

            ///--------texture----------------
            var sampler3D: GLSL.Sampler3D;
            for (var index in this.usage.sampler3DList) {
                sampler3D = this.usage.sampler3DList[index];
                sampler3D.uniformIndex = context3D.getUniformLocation(this.usage.program3D, sampler3D.varName);
                if (sampler3D.varName=="sky_texture"){
                    sampler3D.texture = this.skyTexture;
                }
            }
        }

        private skyUni: any;
        private texUni: any;
        private test: TextureBase; 
        private px: number = 0;
        private py: number = 0;
        private pz: number = 0;

        private offest: Vector3D = new Vector3D(); 
                                
        /**
        * @language zh_CN
        * 渲染
        * @param context3D 设备上下文
        * @param camera 渲染时的相机
        */
        public draw(context3D: Context3D, camera:Camera3D ) {

            if (!this.usage.program3D)
                this.rebuild(context3D);

            context3D.setProgram(this.usage.program3D);

            context3D.gl.enable(Egret3DDrive.CULL_FACE)
            context3D.gl.cullFace(Egret3DDrive.FRONT);

            context3D.bindVertexBuffer(this.cubeGeometry.sharedVertexBuffer);
            context3D.vertexAttribPointer(this.usage.program3D, this.usage.attribute_position.uniformIndex, 3, Egret3DDrive.FLOAT, false, this.cubeGeometry.vertexSizeInBytes , 0);

            this.skyMatrix.identity();
            this.skyMatrix.appendTranslation(camera.x, camera.y, camera.z);

            context3D.uniformMatrix4fv(this.usage.uniform_ProjectionMatrix.uniformIndex, false, camera.viewProjectionMatrix.rawData);
            context3D.uniformMatrix4fv(this.usage.uniform_ModelMatrix.uniformIndex, false, this.skyMatrix.rawData);
          
            ///--------texture----------------
            var sampler3D: GLSL.Sampler3D;
            for (var index in this.usage.sampler3DList) {
              sampler3D = this.usage.sampler3DList[index];
              sampler3D.texture.upload(context3D);
              context3D.setCubeTextureAt(sampler3D.activeTextureIndex , sampler3D.uniformIndex, sampler3D.index , sampler3D.texture.cubeTexture );
            }
            context3D.drawElement(DrawMode.TRIANGLES, this.cubeGeometry.sharedIndexBuffer, 0, this.cubeGeometry.numItems);
        }

    }
} 