/**
 *
 * @author
 *
 */
var Sample_3DMaxScene = (function () {
    function Sample_3DMaxScene() {
        var _this = this;
        this.delay = 0;
        this.time = 0;
        //获取网页内屏幕大小
        this.viewPort = new egret3d.Rectangle(0, 0, window.innerWidth, window.innerHeight);
        egret3d.Egret3DDrive.requstContext3D(DeviceUtil.getGPUMode, new egret3d.Rectangle(0, 0, this.viewPort.width, this.viewPort.height), function () { return _this.init3D(); });
    }
    var d = __define,c=Sample_3DMaxScene;p=c.prototype;
    p.init3D = function () {
        var _this = this;
        this.view3D = new egret3d.View3D(this.viewPort);
        this.view3D.backImageTexture;
        this.cameraController = new egret3d.LookAtController(this.view3D.camera3D, new egret3d.Object3D());
        this.cameraController.setEyesLength(400);
        egret3d.AssetsManager.getInstance().setRootURL("resource/");
        egret3d.AssetsManager.getInstance().addLoadScene("Christmas_Planet");
        egret3d.AssetsManager.getInstance().addLoadTexture("white.jpg");
        egret3d.AssetsManager.getInstance().addEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE, function (e) { return _this.onLoadComplete(e); });
        egret3d.AssetsManager.getInstance().startLoad();
    };
    p.onLoadComplete = function (e) {
        var _this = this;
        var texture = egret3d.AssetsManager.getInstance().findTexture("white.jpg");
        var lightGroup = new egret3d.LightGroup();
        var dirLight = new egret3d.DirectLight(new egret3d.Vector3D(0.5, 1.0, 0.3));
        lightGroup.addDirectLight(dirLight);
        var meshList = egret3d.AssetsManager.getInstance().findScene("Christmas_Planet");
        var container = new egret3d.Object3D();
        for (var i = 0; i < meshList.length; i++) {
            container.addChild(meshList[i]);
            meshList[i].material.lightGroup = lightGroup;
            meshList[i].material.diffuseTexture = texture;
        }
        this.view3D.addChild3D(container);
        requestAnimationFrame(function () { return _this.update(); });
    };
    p.update = function () {
        var _this = this;
        var data = new Date();
        this.delay = data.getTime() - this.time;
        this.time = data.getTime();
        this.view3D.renden(this.time, this.delay);
        this.cameraController.update();
        window.requestAnimationFrame(function () { return _this.update(); });
    };
    return Sample_3DMaxScene;
})();
egret.registerClass(Sample_3DMaxScene,"Sample_3DMaxScene");
