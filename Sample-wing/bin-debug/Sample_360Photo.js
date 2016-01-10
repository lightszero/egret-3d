var Sample_360Photo = (function () {
    function Sample_360Photo() {
        var _this = this;
        this.time = 0;
        this.delay = 0;
        this._viewPort = new egret3d.Rectangle(0, 0, window.innerWidth, window.innerHeight);
        egret3d.Egret3DDrive.requstContext3D(DeviceUtil.getGPUMode, new egret3d.Rectangle(0, 0, this._viewPort.width, this._viewPort.height), function () { return _this.init3D(); });
    }
    var d = __define,c=Sample_360Photo;p=c.prototype;
    p.init3D = function () {
        var _this = this;
        this._view3D = new egret3d.View3D(this._viewPort);
        this._view3D.camera3D.position = new egret3d.Vector3D(0, 5, -10);
        this._cameraCtl = new egret3d.HoverController(this._view3D.camera3D, null);
        this._cameraCtl.panAngle = -36;
        this._cameraCtl.tiltAngle = -2.46;
        window.requestAnimationFrame(function () { return _this.update(); });
        egret3d.AssetsManager.getInstance().setRootURL("resource/");
        egret3d.AssetsManager.getInstance().addLoadTexture("360photo/R0010038.JPG");
        egret3d.AssetsManager.getInstance().addEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE, function (e) { return _this.initScene(e); });
        egret3d.AssetsManager.getInstance().startLoad();
    };
    p.initScene = function (e) {
        var photoTexture = egret3d.AssetsManager.getInstance().findTexture("360photo/R0010038.JPG");
        var sphereSky = new egret3d.SphereSky(photoTexture);
        this._view3D.sphereSky = sphereSky;
    };
    p.update = function () {
        var _this = this;
        this.timeDate = new Date();
        this.delay = this.timeDate.getTime() - this.time;
        this.time = this.timeDate.getTime();
        this._cameraCtl.update();
        this._view3D.renden(this.time, this.delay);
        window.requestAnimationFrame(function () { return _this.update(); });
    };
    return Sample_360Photo;
})();
egret.registerClass(Sample_360Photo,"Sample_360Photo");
//# sourceMappingURL=Sample_360Photo.js.map