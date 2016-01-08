module egret3d.GLSL {
        
    /**
    * @private
    * @class egret3d.VaryingType
    * @classdesc
    * shader中varying 变量 类型
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class VaryingType {
                
        /**
        * shader bool类型
        * @version Egret 3.0
        * @platform Web,Native
        */
        static bool: string = "bool";
                        
        /**
        * shader int类型
        * @version Egret 3.0
        * @platform Web,Native
        */
        static int: string = "int";
                        
        /**
        * shader float类型
        * @version Egret 3.0
        * @platform Web,Native
        */
        static float: string = "float";
                               
        /**
        * shader vec2类型 两个 float 组成
        * @version Egret 3.0
        * @platform Web,Native
        */
        static vec2: string = "vec2";
                                       
        /**
        * shader vec3类型 三个 float 组成
        * @version Egret 3.0
        * @platform Web,Native
        */
        static vec3: string = "vec3";
                                               
        /**
        * shader vec4类型 四个 float 组成
        * @version Egret 3.0
        * @platform Web,Native
        */
        static vec4: string = "vec4";
        
        /**
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        static bvec2: string = "bvec2";
                
        /**
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        static bvec3: string = "bvec3";
                
        /**
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        static bvec4: string = "bvec4";
                
        /**
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        static ivec2: string = "ivec2";
                
        /**
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        static ivec3: string = "ivec3";
                
        /**
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        static ivec4: string = "ivec4";
                
        /**
        * shader 2x2 矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        static mat2: string = "mat2";
                
        /**
        * shader 3x3 矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        static mat3: string = "mat3";
                
        /**
        * shader 4x4 矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        static mat4: string = "mat4";
                
        /**
        * shader 贴图对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        static sampler2D: string = "sampler2D";
                
        /**
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        static sampleCube: string = "sampleCube";
    }
} 