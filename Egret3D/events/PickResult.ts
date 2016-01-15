module egret3d {
                    
    /**
    * @language zh_CN
    * @class egret3d.PickResult
    * @classdesc
    * 鼠标拾取返回数据。</p>
    * 鼠标拾取模型上的交点 (本地坐标、世界坐标)。</p>
    * 鼠标拾取模型的uv。</p>
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class PickResult {
        /**
        * @language zh_CN
        * 鼠标拾取模型上的交点 (本地坐标)。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public localPosition: Vector3D = new Vector3D();
                        
        /**
        * @language zh_CN
        * 鼠标拾取模型上的交点 (世界坐标)。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public globalPosition: Vector3D = new Vector3D();

        /**
        * @language zh_CN
        * 鼠标拾取模型的uv。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uv: Vector3D = new Vector3D();

    }
}