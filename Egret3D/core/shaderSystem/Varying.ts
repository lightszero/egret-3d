module egret3d.GLSL {
    
    /**
    * @class egret3d.Varying
    * @classdesc
    * 
    * shader中varying类型的所有数据
    * 包含变量类型，变量名，变量的值
    *
    * @see egret3d.core.shaderSystem.AttributeType
    *
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Varying extends VarRegister {
                                                
        /**
        * @language zh_CN
        * constructor
        * @param name
        * @param valueType
        */
        constructor(name: string, valueType: string) {
            super();
            this.name = name;
            this.computeVarName();
            this.key = "varying";
            this.valueType = valueType;
        }
    }
} 