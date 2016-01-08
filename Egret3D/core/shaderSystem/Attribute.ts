module egret3d.GLSL {
    
    /**
    * @private
    * @class egret3d.Attribute
    * @classdesc
    * 变量属性
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Attribute extends VarRegister {
        
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
            this.key = "attribute";
            this.valueType = valueType;
        }
    }
} 