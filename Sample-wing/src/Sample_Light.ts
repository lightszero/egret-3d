class Sample_Light extends SampleBase{
    protected _time: number = 0;
    protected _delay: number = 0;
    protected _timeDate: Date = null;
    protected _view3D: egret3d.View3D = null;
    protected _viewPort: egret3d.Rectangle = null;
    protected _cameraCtl: egret3d.HoverController = null;

    public constructor(width: number = 800,height: number = 600) {
        super();
        
        this._viewPort = new egret3d.Rectangle(0,0,width,height);

        egret3d.Egret3DDrive.requstContext3D(DeviceUtil.getGPUMode,this._viewPort,() => this.onInit3D());
    } 
    
    protected onResize(x: number,y: number,width: number,height: number) {
        this._view3D.resize(x,y,width,height);
    }
    
    protected onInit3D(): void {

        //创建View3D对象;
        this._view3D = new egret3d.View3D(this._viewPort);
        window.addEventListener("resize",() => super.resize());
        //创建像机控制器;
        this._cameraCtl = new egret3d.HoverController(this._view3D.camera3D,null, 0, 30);
        this._cameraCtl.distance = 1500;
     

        //View3D初始化完成;
        this.onView3DInitComplete();

        egret3d.AssetsManager.getInstance().setRootURL("resource/");
        egret3d.AssetsManager.getInstance().addLoadTexture("SkyBox/skybox_clear_f.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("SkyBox/skybox_clear_b.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("SkyBox/skybox_clear_l.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("SkyBox/skybox_clear_r.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("SkyBox/skybox_clear_u.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("SkyBox/skybox_clear_d.jpg");
        egret3d.AssetsManager.getInstance().addEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE,(e: egret3d.Event3D) => this.initScene(e));
        egret3d.AssetsManager.getInstance().startLoad();
    }

    private initScene(e: egret3d.Event3D) {
        setTimeout(super.remove,1000);
        var sky_f: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("SkyBox/skybox_clear_f.jpg");
        var sky_b: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("SkyBox/skybox_clear_b.jpg");
        var sky_l: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("SkyBox/skybox_clear_l.jpg");
        var sky_r: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("SkyBox/skybox_clear_r.jpg");
        var sky_u: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("SkyBox/skybox_clear_u.jpg");
        var sky_d: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("SkyBox/skybox_clear_d.jpg");

        var skyTexture: egret3d.SkyTexture = new egret3d.SkyTexture(sky_b,sky_f,sky_l,sky_r,sky_u,sky_d);
        var sky: egret3d.Sky = new egret3d.Sky(skyTexture);
        this._view3D.sky = sky;
        
        var directLight: egret3d.DirectLight = new egret3d.DirectLight(new egret3d.Vector3D(-0.3,1.0,-0.2));
        directLight.diffuse = 0xffcfcf;
        directLight.halfColor = 0xccccff;
        directLight.halfIntensity = 0.1;
        var lightGroup: egret3d.LightGroup = new egret3d.LightGroup();
        lightGroup.addDirectLight(directLight);
        
        var material: egret3d.TextureMaterial = new egret3d.TextureMaterial(null);
        material.ambientColor = 0xcccccc;
        material.ambientPower = 0.1;
        material.lightGroup = lightGroup; 
        var mesh: egret3d.Mesh = new egret3d.Mesh(new egret3d.CubeGeometry(300,300,300),material);
        this._view3D.addChild3D(mesh);
       
        this._time = new Date().getTime();
        requestAnimationFrame(() => this.onUpdate());
    }

    protected onView3DInitComplete(): void {
    }

    protected onUpdate(): void {

        this._timeDate = new Date();

        this._delay = this._timeDate.getTime() - this._time;

        this._time = this._timeDate.getTime();

        this._cameraCtl.update();

        this._view3D.update(this._time,this._delay);

        requestAnimationFrame(() => this.onUpdate());
    }
}