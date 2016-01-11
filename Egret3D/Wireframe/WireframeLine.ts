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
        * @param vs vs文件名
        * @param fs fs文件名
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(vs: string = "wireframe_vertex", fs: string = "wireframe_fragment") {
            super(vs, fs);
        }
                
        /**
        * @language zh_CN
        * 根据两个顶点创建一条线段
        * @param first 线段的起始点
        * @param second 线段的结束点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public createFromData(first: Vector3D, second: Vector3D) {
            this.vertexData = [];
            this.vertexCount = 0;
            this.vertexData.push(
                first.x, first.y, first.z,
                second.x, second.y, second.z
            );
            this.vertexCount = 2;
        }
    }
} 