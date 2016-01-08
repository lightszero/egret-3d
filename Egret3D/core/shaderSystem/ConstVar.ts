module egret3d.GLSL {
                                    
    /**
    * @class egret3d.ConstVar
    * @classdesc
    * shader中常量类型变量的所有数据
    * 包含变量类型，变量名，变量的值
    *
    * @see egret3d.core.shaderSystem.AttributeType
    *
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ConstVar extends VarRegister {
                
        /**
        * @language zh_CN
        * constructor
        * @param name
        * @param valueType
        */
        constructor(name: string, valueType: string, value: string) {
            super();
            this.name = name;
            this.computeVarName();
            this.key = "const";
            this.valueType = valueType;
            this.value = value;
        }
    }
}  