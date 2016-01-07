module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.SkinGeometry
     * @classdesc
     * SkinGeometry类 表示带有蒙皮信息的几何图形。
     * 
     * @version Egret 3.0
     * @platform Web,Native
     * @includeExample egret3d/geometry/SkinGeometry.ts
     */
    export class SkinGeometry extends GeometryBase {

        /**
        * @language zh_CN
        * 
        */
        public initialSkeleton: Skeleton;

        /**
        * @language zh_CN
        * 
        */
        public time0: number = 0;
        /**
        * @language zh_CN
        * constructor
        */
        constructor() {
            super();
            this.geomtryType = GeometryType.Skin;
        }

        /**
        * @language zh_CN
        * 设置网格数据
        * @param indexData 顶点
        * @param vertexData: 索引
        * @param skeleton: 骨骼
        */
        public setGeomtryData(indexData: Array<number>, vertexData: Array<number>, skeleton: Skeleton) {
            this.indexData = indexData;
            this.verticesData = vertexData;
            this.numItems = indexData.length;
            this.initialSkeleton = skeleton;
        }
    }
} 