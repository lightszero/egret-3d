module egret3d {
    
    /**
     * @class egret3d.WireframeLine
     * @classdesc
     *
     * 线渲染把两个顶点之间以线渲染的形式渲染出来
     * @includeExample Wireframe/WireframeLine.ts
     * @version Egret 3.0
     * @platform Web,Native
     *
     */   
    export class WireframeLine extends WireframeBase {
                                
        /**
        * @language zh_CN
        * 构建一个线框渲染对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
        }

        /**
        * @language zh_CN
        * 根据顶点数据创建条线段
        * @param vertexData 线段的顶点数据 3个number是一个顶点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public createFromData(vertexData: Array<number>) {
            if (vertexData.length % 3 != 0) {
                console.log("error: vertexData.length % 3 != 0");
                return;
            }
            this.vertexData = [];
            this.vertexCount = 0;
            this.vertexData = vertexData.slice(0, vertexData.length);
            this.vertexCount = this.vertexData.length / 3;
        }

        /**
        * @language zh_CN
        * 根据顶点数据创建条线段
        * @param vertexData 线段的顶点数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public createFromArray(vertexData: Array<Vector3D>) {
            if (vertexData.length % 3 != 0) {
                console.log("error: vertexData.length % 3 != 0");
                return;
            }
            this.vertexData = [];
            this.vertexCount = 0;
            for (var i: number = 0; i < vertexData.length; ++i) {
                this.vertexData.push(vertexData[i].x);
                this.vertexData.push(vertexData[i].y);
                this.vertexData.push(vertexData[i].z);
            }
            this.vertexCount = this.vertexData.length;
        }
    }
} 