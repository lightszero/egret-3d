class Sample_360Photo {
    private _view3D: egret3d.View3D;
    private _cameraCtl: egret3d.ControllerBase;
    private _viewPort: egret3d.Rectangle;
    constructor() {
        this._viewPort = new egret3d.Rectangle(0, 0, window.innerWidth, window.innerHeight);
        egret3d.Egret3DDrive.requstContext3D(DeviceUtil.getGPUMode, new egret3d.Rectangle(0, 0, this._viewPort.width, this._viewPort.height), () => this.init3D());
    }

    private init3D() {
        this._view3D = new egret3d.View3D(this._viewPort);
        this._view3D.camera3D.position = new egret3d.Vector3D(0, 5, -10);

        this._cameraCtl = new egret3d.HoverController(this._view3D.camera3D, null);
        (<egret3d.HoverController>this._cameraCtl).panAngle = -36;
        (<egret3d.HoverController>this._cameraCtl).tiltAngle = -2.46;
        window.requestAnimationFrame(() => this.update());

        egret3d.AssetsManager.getInstance().setRootURL("resource/");
        egret3d.AssetsManager.getInstance().addLoadTexture("360photo/2.JPG");
        egret3d.AssetsManager.getInstance().addEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE, (e: egret3d.Event3D) => this.initScene(e));
        egret3d.AssetsManager.getInstance().startLoad();
    }

    private initScene(e: egret3d.Event3D) {

        var photoTexture: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("360photo/2.JPG") ;
        var sphereSky: egret3d.SphereSky = new egret3d.SphereSky(photoTexture);
        this._view3D.sphereSky = sphereSky;
        
    }

    private time: number = 0;
    private timeDate: Date;
    private delay: number = 0;
    private update() {

        this.timeDate = new Date();

        this.delay = this.timeDate.getTime() - this.time;

        this.time = this.timeDate.getTime();

        this._cameraCtl.update();

        this._view3D.renden(this.time, this.delay);

        window.requestAnimationFrame(() => this.update());
    }
}