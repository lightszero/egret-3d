module egret3d.GLSL {
    
    /**
    * @private
    * @class egret3d.Varying
    * @classdesc
    * 
    * shader中varying类型的所有数据
    * 包含变量类型，变量名，变量的值
    *
    * @see egret3d.AttributeType
    *
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Varying extends VarRegister {
                                                
        /**
        * @language zh_CN
        * 构造函数
        * @param name 变量名
        * @param valueType 变量类型
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