module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.Billborad
     * @classdesc
     * 公告板
     */
    export class Billborad extends Object3D{

        protected _camrea: Camera3D = null;
        
        /**
         * @language zh_CN
         * constructor
         * @param camrea
         * @param material
         * @param width 
         * @param height 
         */
        constructor(camrea: Camera3D, material:MaterialBase, width:number = 100, height:number = 100) {
            super();
            this.material = material;
            this._camrea = camrea;
            this.geometry = new PlaneGeometry(width, height);
        }
                                
        /**
        * @language zh_CN
        * 数据更新
        * @param time 当前时间
        * @param delay 间隔时间
        */
        public update(time: number, delay: number) {

            this.rotationX = this._camrea.rotationX + (-90);
            this.rotationY = this._camrea.rotationY;
            this.rotationZ = this._camrea.rotationZ;
        }
    }
}