module egret3d {
    /**
    * @class egret3d.CameraAnimationManager
    * @classdesc
    * 摄像机动画控制器管理
    * 管理所有摄像机动画
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class CameraAnimationManager {

        private _animation: { [name: string]: CameraAnimationController} = {};
        
        /**
        * @language zh_CN
        * 构建一个摄像机动画管理对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
        }

        /**
        * @language zh_CN
        * 播放某个动画
        * 根据动画名字来播放，指定摄像机，并且控制动画是否循环播放
        * @param name 动画名
        * @param camera 相机
        * @param isLoop 是否循环
        * @version Egret 3.0
        * @platform Web,Native
        */
        public play(name: string, camera: Camera3D, isLoop:boolean) {
            if (this._animation[name] != undefined) {
                this._animation[name].bindCamera(camera);
                this._animation[name].play(isLoop);
            }
            else {
                var loader: egret3d.URLLoader = new egret3d.URLLoader();
                loader.onLoadComplete = (loader: egret3d.URLLoader) => this.onCallback(loader, name, camera, isLoop);
                loader.load(name);
            }
        }

        /**
        * @language zh_CN
        * 更新所有的摄像机动画
        * @param time 当前时间
        * @param delay 每帧间隔时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time:number, delay:number) {

            for (var key in this._animation) {
                this._animation[key].update(time, delay);
            }
        }

        private onCallback(loader: egret3d.URLLoader, name: string, camera: Camera3D, isLoop: boolean) {
            this._animation[name] = loader.data;
            this._animation[name].bindCamera(camera);
            this._animation[name].play(isLoop);
        }
    }
} 