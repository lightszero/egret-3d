module egret3d {

    /**
     * @language zh_CN
     * @class egret3d.AnimaNodeCollection
     * @classdesc
     * 动画功能节点收集器
     * 动画功能的收集，整理，初始化容器，一般在粒子系统里使用
     * @version Egret 3.0
     * @platform Web,Native
     * @includeExample animation/AnimaNodeCollection.ts
     */
    export class AnimaNodeCollection {

        /**
        * @language zh_CN
        * 动画节点容器
        * @priavte 
        */
        public nodes: Array<AnimNodeBase> = new Array<AnimNodeBase>();

        /**
        * @language zh_CN
        * 顶点数
        * @priavte 
        */
        public numberOfVertices: number;

        /**
        * @language zh_CN
        * 顶点字节大小
        * @priavte 
        */
        public vertexSizeInBytes: number;
        
        /**
        * @language zh_CN
        * @priavte 
        */
        private _nodeData: Float32Array;

        /**
        * @language zh_CN
        * @priavte 
        */
        private _vertexAttributes: Object = {};

        /**
        * @language zh_CN
        * 构造函数
        * @priavte 
        */
        constructor() {
            this.nodes = new Array<AnimNodeBase>();
        }

        /**
        * @language zh_CN
        * 添加动画功能节点
        * 添加继承 animNodeBase 功能节点 例如粒子的 加速度功能节点，匀速功能节点
        * @param node 节点对象
        */
        public addNode(node: AnimNodeBase) {
            this.nodes.push(node);
        }

        /**
        * @language zh_CN
        * 移除动画功能节点
        * 删除指定的动画功能节点，但是不能动态删除，需要进行 功能重置
        * @param node 节点对象
        */
        public removeNode(node: AnimNodeBase) {
            var index: number = this.nodes.indexOf(node);
            if (index != -1)
                this.nodes.splice(index, 1);
        }

        /**
        * @language zh_CN
        * 获取节点容器
        * 获取整体的功能节点列表
        * @return 节点容器
        */
        public getNodes(): Array<AnimNodeBase> {
            return this.nodes;
        }

        /**
        * @language zh_CN
        * 获取节点顶点Shader
        * @return 顶点Shader容器
        * @private 
        */
        public getNodesVertexShaders(): Array<string> {
            var shaderNames: string[] = [];
            for (var i: number = 0; i < this.nodes.length; i++) {
                if (this.nodes[i].vertexShader != "" && this.nodes[i].vertexShader != undefined && this.nodes[i].vertexShader != null)
                    shaderNames.push(this.nodes[i].vertexShader);
            }
            return shaderNames;
        }

        /**
        * @language zh_CN
        * 获取节点片元Shader
        * @return 片元Shader容器
        * @private 
        */
        public getNodesFragmentShaders(): Array<string> {
            var shaderNames: string[] = [];
            for (var i: number = 0; i < this.nodes.length; i++) {
                if (this.nodes[i].fragmentShader != "" && this.nodes[i].fragmentShader != undefined && this.nodes[i].fragmentShader != null)
                    shaderNames.push(this.nodes[i].fragmentShader);
            }
            return shaderNames;
        }

        /**
        * @language zh_CN
        * 计算节点
        * @private 
        */
        public calculateNode() {
            ///init data to updata gpu
            ///this.vertexInfos = this.vertexInfos || new Array<VertexInfo>();
            ///this.vertexInfos.length = 0; 
            var offset: number = 4 + 3 + 2;
            for (var i: number = 0; i < this.nodes.length; i++) {
                if (this.nodes[i].usageAttributeLen > 0) {
                    this.nodes[i].offset = offset;
                    this.nodes[i].offsetBytes = offset * Float32Array.BYTES_PER_ELEMENT;
                    offset += this.nodes[i].usageAttributeLen;
                }
            }

            this.numberOfVertices = offset;
            this.vertexSizeInBytes = offset * Float32Array.BYTES_PER_ELEMENT;
        }
    }
}