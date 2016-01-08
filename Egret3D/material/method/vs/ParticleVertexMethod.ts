module egret3d {
     /**
     * @language zh_CN
     * @class egret3d.ParticleVertexMethod
     * @classdesc
     * 粒子顶点方法。
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class ParticleVertexMethod extends MethodBase {

        private index: number = 0; 
        /**
        * @language zh_CN
        * 创建一个新的 ParticleVertexMethod 对象。
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
            this.vsMethodName = "particle_vertex";
        }

        /**
         * @language zh_CN
         * 激活 粒子顶点方法。
         * @param context3D {Context3D}
         * @param program3D {IProgram3D}
         * @param modeltransform {Matrix4_4}
         * @param camera3D {Camera3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         * -pos            3       12      0
         * -uv0            2        8      12
         * -speed          3       12      20
         * -lifecycle      1       4       32
         * @version Egret 3.0
         * @platform Web,Native
         */
        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
            // 绑定同时包含顶点位置和颜色信息的缓冲
            geometry.sharedVertexBuffer = context3D.creatVertexBuffer(geometry.verticesData);

            geometry.numberOfVertices = animation.animaNodeCollection.numberOfVertices;
            geometry.vertexSizeInBytes = animation.animaNodeCollection.vertexSizeInBytes;
            
            geometry.sharedIndexBuffer = context3D.creatIndexBuffer(geometry.indexData);
            context3D.bindVertexBuffer(geometry.sharedVertexBuffer);

            //pos
            //offset
            //uv
            this.usage.attribute_position.uniformIndex = context3D.getShaderAttribLocation(program3D, this.usage.attribute_position.name);
            this.usage.attribute_offset.uniformIndex = context3D.getShaderAttribLocation(program3D, this.usage.attribute_offset.name);
            this.usage.attribute_uv0.uniformIndex = context3D.getShaderAttribLocation(program3D, this.usage.attribute_uv0.name);

            for (this.index = 0; this.index < animation.animaNodeCollection.nodes.length; this.index++) {
                if (animation.animaNodeCollection.nodes[this.index].usageAttributeLen > 0)
                   animation.animaNodeCollection.nodes[this.index].uniformIndex = context3D.getShaderAttribLocation(program3D, animation.animaNodeCollection.nodes[this.index].usageAttribute);
            }

            this.usage.uniform_ModelMatrix.uniformIndex = context3D.getUniformLocation(program3D, this.usage.uniform_ModelMatrix.name);
            this.usage.uniform_ProjectionMatrix.uniformIndex = context3D.getUniformLocation(program3D, this.usage.uniform_ProjectionMatrix.name);
            //this.usage.uniform_normalMatrix.uniformIndex = context3D.getUniformLocation(program3D, this.usage.uniform_normalMatrix.name);
            this.usage.uniform_eyepos.uniformIndex = context3D.getUniformLocation(program3D, this.usage.uniform_eyepos.name);
            this.usage.uniform_time.uniformIndex = context3D.getUniformLocation(program3D, this.usage.uniform_time.name);
            this.usage.uniform_cameraMatrix.uniformIndex = context3D.getUniformLocation(program3D, this.usage.uniform_cameraMatrix.name);
        }

        private time: number = 0 ; 
        private normalMatrix: Matrix4_4 = new Matrix4_4();
        /**
         * @language zh_CN
         * 更新 粒子顶点方法。
         * @param context3D {Context3D}
         * @param program3D {IProgram3D}
         * @param modeltransform {Matrix4_4}
         * @param camera3D {Camera3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
            // 绑定同时包含顶点位置和颜色信息的缓冲
            context3D.bindVertexBuffer(geometry.sharedVertexBuffer);

            context3D.vertexAttribPointer(program3D, this.usage.attribute_position.uniformIndex, 4, Egret3DDrive.FLOAT, false, geometry.vertexSizeInBytes, 0);
            context3D.vertexAttribPointer(program3D, this.usage.attribute_offset.uniformIndex, 3, Egret3DDrive.FLOAT, false, geometry.vertexSizeInBytes, 16);
            context3D.vertexAttribPointer(program3D, this.usage.attribute_uv0.uniformIndex, 2, Egret3DDrive.FLOAT, false, geometry.vertexSizeInBytes, 28);
            var node: AnimNodeBase; 
            for (this.index = 0; this.index < animation.animaNodeCollection.nodes.length; this.index++) {
                if (animation.animaNodeCollection.nodes[this.index].usageAttributeLen > 0) {
                    node = animation.animaNodeCollection.nodes[this.index];
                    context3D.vertexAttribPointer(program3D, node.uniformIndex, node.usageAttributeLen, Egret3DDrive.FLOAT, false, geometry.vertexSizeInBytes, node.offsetBytes);
                }
            }

            context3D.uniformMatrix4fv(this.usage.uniform_ModelMatrix.uniformIndex, false, modeltransform.rawData);
            context3D.uniformMatrix4fv(this.usage.uniform_ProjectionMatrix.uniformIndex, false, camera3D.viewProjectionMatrix.rawData);
            context3D.uniformMatrix4fv(this.usage.uniform_cameraMatrix.uniformIndex, false, camera3D.modelMatrix.rawData);
            context3D.uniform3f(this.usage.uniform_eyepos.uniformIndex, camera3D.x, camera3D.y, camera3D.z);
            context3D.uniform1f(this.usage.uniform_time.uniformIndex, animation.time ); 

        }
    }
} 