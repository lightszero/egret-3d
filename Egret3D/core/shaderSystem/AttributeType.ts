module egret3d.GLSL {
        
    /**
    * @class egret3d.AttributeType
    * @classdesc
    *
    * shader中的变量属性类型
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class AttributeType {
        static int: string = "int";
        static float: string = "float";
        static vec2: string = "vec2";
        static vec3: string = "vec3";
        static vec4: string = "vec4";

        static mat2: string = "mat2";
        static mat3: string = "mat3";
        static mat4: string = "mat4";
    } 
}