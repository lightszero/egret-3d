module egret3d.GLSL {
                                    
    /**
    * @private
    * @class egret3d.Sampler2D
    * @classdesc
    * 
    * shader中sampler2D类型变量的所有数据
    * 包含变量类型，变量名，变量的值
    *
    * @see egret3d.AttributeType
    *
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Sampler2D extends VarRegister {
                
        /**
        * @language zh_CN
        * 构造
        * @param name 变量名
        */
        constructor(name: string) {
            super();
            this.name = name;
            this.computeVarName();
            this.key = "sampler2D";
            ///this.valueType = valueType;
        }
    }
} 