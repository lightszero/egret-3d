module egret3d {
    /**
     * @private
     * @language zh_CN
     * @class egret3d.SubGeometry
     * @classdesc
     * SubGeometry类 
     * 
     * @version Egret 3.0
     * @platform Web,Native
     * @includeExample geometry/SubGeometry.ts
     */
    export class SubGeometry extends GeometryBase {
        /**
        * @language zh_CN
        * 构造函数
        */
        constructor() {
            super();
        }

        /**
        * @language zh_CN
        * 设置网格数据
        * @param indexData 顶点
        * @param vertexData: 索引
        */
        public setGeomtryData(indexData: Array<number>, vertexData: Array<number>) {
            this.indexData = indexData;
            this.verticesData = vertexData;
            this.numItems = indexData.length;
        }

    }
} 