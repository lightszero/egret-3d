class Sample_360 {
    private _view3D: egret3d.View3D;
    private _viewPort: egret3d.Rectangle;
    private _cameraController: egret3d.HoverController;
    constructor() {
        this._viewPort = new egret3d.Rectangle(0,0,800,400);
        egret3d.Egret3DDrive.requstContext3D(DeviceUtil.getGPUMode, this._viewPort , () => this.init3D());
    }

    private init3D() {
        egret3d.CheckerboardTexture.texture.upload( egret3d.Egret3DDrive.context3D);
        this._view3D = new egret3d.View3D(this._viewPort);
        this._view3D.camera3D.position = new egret3d.Vector3D(0, 5, -10);
        //this._view3D.backImageTexture = egret3d.CheckerboardTexture.texture;
        egret3d.AssetsManager.getInstance().setRootURL("resource/");
        egret3d.AssetsManager.getInstance().addLoadTexture("360photo/1.JPG");
        egret3d.AssetsManager.getInstance().addEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE, (e: egret3d.Event3D) => this.initScene(e));
        egret3d.AssetsManager.getInstance().startLoad();
    }

    private initScene(e) {

        var photoTexture: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("360photo/1.JPG"); 
        var material: egret3d.TextureMaterial = new egret3d.TextureMaterial(photoTexture);
        material.ambientPower = 0.5;
        var mesh: egret3d.Mesh = new egret3d.Mesh(new egret3d.SphereGeometry(200, 45, 45), material);
        material.cullMode = egret3d.Egret3DDrive.FRONT;
        this._view3D.addChild3D(mesh);

        this._cameraController = new egret3d.HoverController(this._view3D.camera3D);
        window.requestAnimationFrame(() => this.update());
    }

    private time: number = 0;
    private timeDate: Date;
    private delay: number = 0;
    private update() {

        this.timeDate = new Date();

        this.delay = this.timeDate.getTime() - this.time;

        this.time = this.timeDate.getTime();

        this._cameraController.update();

        this._view3D.renden(this.time, this.delay);

        window.requestAnimationFrame(() => this.update());
    }

}
