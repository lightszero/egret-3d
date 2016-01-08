module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.FaceData
     * @classdesc
     * FaceData类 表示三角面索引数据
     * 
     * FaceData用于储存三角面所需的各类索引数据，如顶点索引、UV纹理索引、法线索引、定点颜色索引等。
     *
     * @version Egret 3.0
     * @platform Web,Native
     * @includeExample egret3d/geometry/FaceData.ts
     */
    export class FaceData {

        /**
        * @language zh_CN
        * 顶点索引数据
        */
        public vertexIndices: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * uv索引数据
        */
        public uvIndices: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * uv2索引数据
        */
        public uv2Indices: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * 法线索引数据
        */
        public normalIndices: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * 顶点色索引数据
        */
        public colorIndices: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * 索引数据数组
        */
        public indexIds: Array<any> = new Array<any>(); // used for real index lookups
    } 
}