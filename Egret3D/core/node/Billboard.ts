module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.Billboard
     * @classdesc
     * 公告板渲染对象 始终面朝摄像机的面板
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class Billboard extends Object3D{

        /**
         * @language zh_CN
         * 指定材质，和公告板宽、高，构建一个公告板
         * @param material 渲染材质
         * @param width 公告板宽
         * @param height 公告板高
         * @version Egret 3.0
         * @platform Web,Native
         */
        constructor(material:MaterialBase, width:number = 100, height:number = 100) {
            super();
            this.material = material;
            this.geometry = new PlaneGeometry(width, height);
            this.box.fillBox(this.geometry.minPos, this.geometry.maxPos);
        }

        /**
        * @language zh_CN
        * 数据更新，不前对象的旋转和摄像机的旋转一致
        * @param camera 当前渲染的摄相机
        * @param time 当前时间
        * @param delay 间隔时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(camera: Camera3D, time: number, delay: number) {
            this._qut.fromEulerAngles(-90, 0, 0);
            this._qut.multiply(camera.orientation, this._qut);
            this.orientation = this._qut;
        }
    }
}