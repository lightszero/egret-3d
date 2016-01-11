class Sample_AnimationModel {

    protected _xiaoQiao: egret3d.Mesh = null;
    protected _time: number = 0;
    protected _delay: number = 0;
    protected _timeDate: Date = null;
    protected _view3D: egret3d.View3D = null;
    protected _viewPort: egret3d.Rectangle = null;
    protected _cameraCtl: egret3d.LookAtController = null;
    public constructor(width: number = 800,height: number = 600) {

        this._viewPort = new egret3d.Rectangle(0,0,width,height);

        egret3d.Egret3DDrive.requstContext3D(DeviceUtil.getGPUMode,this._viewPort,() => this.onInit3D());
    }
    
    protected onInit3D(): void {

        //创建View3D对象;
        this._view3D = new egret3d.View3D(this._viewPort);

        //创建像机控制器;
        this._cameraCtl = new egret3d.LookAtController(this._view3D.camera3D,new egret3d.Object3D());

        //设置像机视野距离;
        this._cameraCtl.setEyesLength(0.1);

        egret3d.AssetsManager.getInstance().setRootURL("resource/");
        egret3d.AssetsManager.getInstance().addLoadTexture("SkyBox/skybox_clear_f.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("SkyBox/skybox_clear_b.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("SkyBox/skybox_clear_l.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("SkyBox/skybox_clear_r.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("SkyBox/skybox_clear_u.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("SkyBox/skybox_clear_d.jpg");
        egret3d.AssetsManager.getInstance().addLoadAnimModel("xiaoqiao/","xiaoqiao.esm",
            ["idle_1.eam","run_1.eam","attack_1.eam","death_1.eam","skill_1.eam","skill_2.eam","skill_3.eam","skill_4.eam"]);
        egret3d.AssetsManager.getInstance().addEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE,(e: egret3d.Event3D) => this.onLoadComplete(e));
        egret3d.AssetsManager.getInstance().startLoad();
        this._cameraCtl.setEyesLength(600);
    }

    protected onKeyUp(keyCode:number): void {
        switch (keyCode) {
            case egret3d.KeyCode.Key_1:
            case egret3d.KeyCode.Key_2:
            case egret3d.KeyCode.Key_3:
            case egret3d.KeyCode.Key_4:
            case egret3d.KeyCode.Key_5:
            case egret3d.KeyCode.Key_6:
            case egret3d.KeyCode.Key_7:
            case egret3d.KeyCode.Key_8:
                if (this._xiaoQiao != null) {
                    var index: number = egret3d.KeyCode.Key_8 - keyCode;
                    var animList: string[] = this._xiaoQiao.animation.skeletonAnimationController.getAnimList();
                    if (index >= animList.length)
                        return;
                    this._xiaoQiao.animation.skeletonAnimationController.play(animList[index]);
                }
                break;
        }
    }

    protected onLoadComplete(e: egret3d.Event3D): void {
        
        var sky_f: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("SkyBox/skybox_clear_f.jpg");
        var sky_b: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("SkyBox/skybox_clear_b.jpg");
        var sky_l: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("SkyBox/skybox_clear_l.jpg");
        var sky_r: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("SkyBox/skybox_clear_r.jpg");
        var sky_u: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("SkyBox/skybox_clear_u.jpg");
        var sky_d: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("SkyBox/skybox_clear_d.jpg");

        var skyTexture: egret3d.SkyTexture = new egret3d.SkyTexture(sky_b,sky_f,sky_l,sky_r,sky_u,sky_d);
        var sky: egret3d.Sky = new egret3d.Sky(skyTexture);
        this._view3D.sky = sky;
        
        this._xiaoQiao = egret3d.AssetsManager.getInstance().findAnimModel("xiaoqiao/xiaoqiao.esm");
        this._xiaoQiao.material.ambientPower = 0.3;
        this._view3D.addChild3D(this._xiaoQiao);
        egret3d.Input.instance.addListenerKeyUp((keyCode: number) => this.onKeyUp(keyCode));
        
        this._time = new Date().getTime();
        requestAnimationFrame(() => this.onUpdate());
    }

    protected onUpdate(): void {
        this._timeDate = new Date();
        this._delay = this._timeDate.getTime() - this._time;
        this._time = this._timeDate.getTime();
        this._cameraCtl.update();
        this._view3D.renden(this._time,this._delay);
        requestAnimationFrame(() => this.onUpdate());
    }
}