module egret3d {

     /**
     * @language zh_CN
     * @class egret3d.OutLinePass
     * @classdesc
     * 边框通道渲染器。
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class OutLinePass extends MaterialPassBase {

        /**
        * @language zh_CN
        * 创建一个新的 OutLinePass 对象。
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super(new MaterialData());
        }

        /**
         * @language zh_CN
         * 设置颜色。
         * @param color {Number} 
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set color(color: number) {
            this.materialData.diffuseColor = color;
        }

        /**
         * @language zh_CN
         * 返回颜色。
         * @returns {Number}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get color(): number {
            return this.materialData.diffuseColor;
        }

        /**
         * @language zh_CN
         * 设置笔触值。
         * @param thickness {Number}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set thickness(thickness: number) {
            this.materialData.normalPower = thickness;
        }

        /**
         * @language zh_CN
         * 返回笔触值。
         * @returns {Number}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get thickness(): number {
            return this.materialData.normalPower;
        }
           
        /**
         * @language zh_CN
         * 初始化 UseMethod。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public initUseMethod() {
            var i: number = 0;

            this.diffuseMethod = new ColorMethod();
            this.pixelShader.addMethod(this.diffuseMethod);
            this.pixelShader.addShader(this.diffuseMethod.fragMethodName);

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

            this.vertexShader = new VertexShader(this.materialData, this.materialData.diffusePassUsageData);
            this.pixelShader = new PixelShader(this.materialData, this.materialData.diffusePassUsageData);

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

            this.materialData.diffusePassUsageData.program3D = context3D.creatProgram(vs_shader, fs_shader);

            this.context3DChange = true;
        }

        /**
         * @language zh_CNa
         * 激活 边框通道渲染器。
         * @param context3D {Context3D}
         * @param modeltransform {Matrix4_4}
         * @param camera3D {Camera3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public activate(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry:GeometryBase, animation: IAnimation ) {
          
            for (this.index = 0; this.index < this.materialData.diffusePassUsageData.vsMethodList.length; this.index++) {
                this.materialData.diffusePassUsageData.vsMethodList[this.index].activate(context3D, this.materialData.diffusePassUsageData.program3D, modeltransform, camera3D ,geometry, animation );
            }
            for (this.index = 0; this.index < this.materialData.diffusePassUsageData.fsMethodList.length; this.index++) {
                this.materialData.diffusePassUsageData.fsMethodList[this.index].activate(context3D, this.materialData.diffusePassUsageData.program3D, modeltransform, camera3D ,geometry, animation);
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
         * 更新 边框通道渲染器。
         * @param context3D {Context3D}
         * @param modeltransform {Matrix4_4}
         * @param camera3D {Camera3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public updata(context3D: Context3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase , animation: IAnimation ) {
            super.draw(context3D, modeltransform, camera3D, geometry, animation);
            var i: number = 0;
          
            for (i = 0; i < this.materialData.directLightList.length; i++) {
                this.materialData.directLightList[i].updateLightData(i, this.materialData.diffusePassUsageData.directLightData);
            }

            for (i = 0; i < this.materialData.sportLightList.length; i++) {
                this.materialData.sportLightList[i].updateLightData(i, this.materialData.diffusePassUsageData.sportLightData);
            }

            for (i = 0; i < this.materialData.pointLightList.length; i++) {
                this.materialData.pointLightList[i].updateLightData(i, this.materialData.diffusePassUsageData.pointLightData);
            }

            if (this.context3DChange) {
                this.activate(context3D, modeltransform, camera3D,geometry, animation);
                this.context3DChange = false;
            }

            for (this.index = 0; this.index < this.materialData.diffusePassUsageData.vsMethodList.length; this.index++) {
                this.materialData.diffusePassUsageData.vsMethodList[this.index].updata(context3D, this.materialData.diffusePassUsageData.program3D, modeltransform, camera3D , geometry, animation );
            }

            for (this.index = 0; this.index < this.materialData.diffusePassUsageData.fsMethodList.length; this.index++) {
                this.materialData.diffusePassUsageData.fsMethodList[this.index].updata(context3D, this.materialData.diffusePassUsageData.program3D, modeltransform, camera3D , geometry, animation );
            }

            context3D.gl.bindBuffer(Egret3DDrive.ELEMENT_ARRAY_BUFFER, geometry.sharedIndexBuffer.buffer);
            context3D.drawElement(this.materialData.drawMode, geometry.sharedIndexBuffer, 0, geometry.numItems);

        }

    }
} 