module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.Billborad
     * @classdesc
     * @version Egret 3.0
     * @platform Web,Native
     * 公告板渲染对象 始终面朝摄像机的面板
     */
    export class Billborad extends Object3D{

        /**
         * @language zh_CN
         * constructor
         * @param material 渲染材质
         * @param width 
         * @param height 
         */
        constructor(material:MaterialBase, width:number = 100, height:number = 100) {
            super();
            this.material = material;
            this.geometry = new PlaneGeometry(width, height);
        }

        /**
        * @language zh_CN
        * 数据更新
        * @param camera 当前渲染的摄相机
        * @param time 当前时间
        * @param delay 间隔时间
        */
        public update(camera: Camera3D, time: number, delay: number) {
            this.rotationX = camera.rotationX - 90;
            this.rotationY = camera.rotationY;
            this.rotationZ = camera.rotationZ;
        }
    }
}