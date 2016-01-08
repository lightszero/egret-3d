module egret3d {

     /**
    * @private
     * @language zh_CN
     * @class egret3d.PixelShader
     * @classdesc
     * 像素着色器。
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class PixelShader extends GLSL.ShaderBase {
       
        /**
        * @language zh_CN
        * 创建一个新的 PixelShader 对象。
        * @param materialData {MaterialData}
        * @param usage {MethodUsageData}
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(materialData: MaterialData, usage: MethodUsageData) {
            super(materialData, usage);
            this.useage = usage;
            this.materialData = materialData;
        }


        /**
        * @language zh_CN
        * 添加 Method。
        * @param method {MethodBase}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addMethod(method: MethodBase) {
            this.stateChange = true;
            this.useage.fsMethodList.push(method);
        }
 
        /**
        * @language zh_CN
        * 添加 EffectMethod。
        * @param method {EffectMethod}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addEffectMethod(method: EffectMethod) {
            this.stateChange = true;
            this.useage.effectMethodList.push(method);
        }


        /**
        * @language zh_CN
        * 返回 Shader 源。
        * @returns {String}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getShaderSource(): string {
            var shaderSource: string = super.getShaderSource();
            var index: number = shaderSource.lastIndexOf("}");
            var endS: string = shaderSource.substr(index, shaderSource.length - index);

            shaderSource = shaderSource.substr(0, index);
            shaderSource += "   gl_FragColor = diffuse;\r\n";
            shaderSource += endS;
            return shaderSource ;
        }
        /**
        /**
        * @language zh_CN
        * 构建 PixelShader。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public build() {
            this.stateChange = false;
            for (this.index = 0; this.index < this.useage.fsMethodList.length; this.index++) {
                this.useage.fsMethodList[this.index].setMaterialData(this.materialData, this.useage);
            }
            this.stateChange = false;
            for (this.index = 0; this.index < this.useage.effectMethodList.length; this.index++) {
                this.useage.effectMethodList[this.index].setMaterialData(this.materialData, this.useage);
            }
        }
       
    }
}  