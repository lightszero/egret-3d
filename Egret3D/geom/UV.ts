module egret3d {
    /**
     * @private
     * @language zh_CN
     * @class egret3d.UV
     * @classdesc
     * UV类，用来存储模型顶点uv数据
     * 
     * @see egret3d.GeometryData
     *
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class UV {
        
        /**
        * @language zh_CN
        * u
        */
        public u: number = 0;
        
        /**
        * @language zh_CN
        * v
        */
        public v: number = 0;
                
        /**
        * @language zh_CN
        * constructor
        */
        constructor(u: number = 0, v: number = 0) {
            this.u = u;
            this.v = v;
        }
    } 
} 