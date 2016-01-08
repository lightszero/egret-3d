module egret3d {

    /**
     * @language zh_CN
     * @class egret3d.AnimNodeBase
     * @classdesc
     * 动画节点基类
     * 
     * 动画驱动的基本节点父类，实现基本统一的动画节点结构
     *  
     * @version Egret 3.0
     * @platform Web,Native
     * @includeExample egret3d/animation/AnimNodeBase.ts
     */
    export class AnimNodeBase {

        /**
        * @language zh_CN
        * 顶点Shader
        * @private
        */
        public vertexShader: string; 

        /**
        * @language zh_CN
        * 片元Shader
        * @private
        */
        public fragmentShader: string; 

        /**
        * @language zh_CN
        * 使用的属性
        * @private
        */
        public usageAttribute: string;

        /**
        * @language zh_CN
        * 属性长度
        * @private
        */
        public usageAttributeLen: number;

        /**
        * @language zh_CN
        * uniform索引
        * @private
        */
        public uniformIndex: any; 

        /**
        * @language zh_CN
        * 偏移字节数
        * @private
        */
        public offsetBytes: number;

        /**
        * @language zh_CN
        * 偏移量
        * @private
        */
        public offset: number;

        /**
        * @language zh_CN
        * 填充GeomtryData
        * @param geometry: Geometry对象
        * @private
        */
        public fillGeomtryData(geometry: GeometryBase): void {
        }
    }
}
