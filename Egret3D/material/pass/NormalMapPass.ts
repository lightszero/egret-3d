/// <reference path="../method/fs/normalmethod.ts" />
module egret3d {

     /**
     * @language zh_CN
     * @class egret3d.NormalMapPass
     * @classdesc
     * 发现贴图通道渲染器。
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class NormalMapPass extends MaterialPassBase {

        private normalMethod: NormalMethod;
        /**
        * @language zh_CN
        * 创建一个新的 NormalMapPass 对象。
        * @version Egret 3.0
        * @platform Web,Native
        * @param data {MaterialData} 材质数据
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
           
            this.normalMethod = new NormalMethod();
            this.pixelShader.addMethod(this.normalMethod);
            this.pixelShader.addShader(this.normalMethod.fragMethodName);

            if (this.animation) {
                var vsShaderNames: string[] = this.animation.animaNodeCollection.getNodesVertexShaders();
                var fsShaderNames: string[] = this.animation.animaNodeCollection.getNodesFragmentShaders();
                for (i = 0; i < vsShaderNames.length; i++) {
                    this.vertexShader.addShader(vsShaderNames[i]);
                }
                for (i = 0; i < vsShaderNames.length; i++) {
                    this.pixelShader.addShader(fsShaderNames[i]);
                }
            }
            //if (this.materialData.useNormalMap) {
            //    this.pixelShader.addShader("normalMap_fragment");
            //}
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
        public initShader(context3D: Context3D, geometry: GeometryBase, animation: IAnimation ) {

            this.vertexShader = new VertexShader(this.materialData, this.materialData.normalPassUsageData);
            this.pixelShader = new PixelShader(this.materialData, this.materialData.normalPassUsageData);

            this.materialData.context3D = context3D;
            
            this.vertexShader.setVertexShader(geometry);
            this.initUseMethod();

            this.vertexShader.build();
            this.pixelShader.build();

            if (animation) {
                this.vertexShader.maxBone = (<SkeletonAnimation>animation).jointNumber * 2;
            }

            var vs: string = this.vertexShader.getShaderSource();
            var fs: string = this.pixelShader.getShaderSource();

            var vs_shader: IShader = context3D.creatVertexShader(vs);
            var fs_shader: IShader = context3D.creatFragmentShader(fs);

            this.materialData.normalPassUsageData.program3D = context3D.creatProgram(vs_shader, fs_shader);

            this.context3DChange = true;
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
          
            for (this.index = 0; this.index < this.materialData.normalPassUsageData.vsMethodList.length; this.index++) {
                this.materialData.normalPassUsageData.vsMethodList[this.index].activate(context3D, this.materialData.normalPassUsageData.program3D, modeltransform, camera3D ,geometry, animation );
            }
            for (this.index = 0; this.index < this.materialData.normalPassUsageData.fsMethodList.length; this.index++) {
                this.materialData.normalPassUsageData.fsMethodList[this.index].activate(context3D, this.materialData.normalPassUsageData.program3D, modeltransform, camera3D ,geometry, animation);
            }
        }

        /**
         * @language zh_CN
         * 索引。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public index: number = 0;

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
        public draw(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase,  animation: IAnimation ) {
           
            super.draw(context3D, modeltransform, camera3D, geometry, animation );
            var i: number = 0;

            if (this.context3DChange) {
                this.activate(context3D, modeltransform, camera3D,geometry, animation);
                this.context3DChange = false;
            }
        
            for (this.index = 0; this.index < this.materialData.normalPassUsageData.vsMethodList.length; this.index++) {
                this.materialData.normalPassUsageData.vsMethodList[this.index].updata(context3D, this.materialData.normalPassUsageData.program3D, modeltransform, camera3D ,geometry, animation );
            }

            for (this.index = 0; this.index < this.materialData.normalPassUsageData.fsMethodList.length; this.index++) {
                this.materialData.normalPassUsageData.fsMethodList[this.index].updata(context3D, this.materialData.normalPassUsageData.program3D, modeltransform, camera3D ,geometry, animation );
            }

            context3D.gl.bindBuffer(Egret3DDrive.ELEMENT_ARRAY_BUFFER, geometry.sharedIndexBuffer.buffer); 
            context3D.gl.drawElements(this.materialData.drawMode, geometry.numItems, Egret3DDrive.UNSIGNED_SHORT, 0 );
        }

    }
} 