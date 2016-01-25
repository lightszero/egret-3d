class Sample_Character extends SampleBase{

    private _view3D: egret3d.View3D;
    private _cameraCtl: egret3d.HoverController;
    private _viewPort: egret3d.Rectangle;

    private _shadowMaping: egret3d.ShadowMapingMethod;
    constructor() {
        super();
        this._viewPort = new egret3d.Rectangle(0, 0, window.innerWidth, window.innerHeight );
        console.log(window.innerWidth + "----" + window.innerHeight);
        egret3d.Egret3DDrive.requstContext3D(DeviceUtil.getGPUMode, new egret3d.Rectangle(0, 0, this._viewPort.width, this._viewPort.height), () => this.init3D());
    }

    protected onResize(x: number,y: number,width: number,height: number) {
        this._view3D.resize(x,y,width,height);
    }
    
    private init3D() {

        this._view3D = new egret3d.View3D(this._viewPort);
        window.addEventListener("resize",() => super.resize());
        
        this._view3D.useShadow = true;
        this._view3D.camera3D.position = new egret3d.Vector3D(0, 5, -10);

    
        this._cameraCtl = new egret3d.HoverController(this._view3D.camera3D,null,90,0,1000);
        this._cameraCtl.lookAtPosition = new egret3d.Vector3D(0,180,0);

        window.requestAnimationFrame(() => this.update());

        egret3d.AssetsManager.getInstance().setRootURL("resource/");
        egret3d.AssetsManager.getInstance().addLoadModel("suoluo/","hair.esm");
        egret3d.AssetsManager.getInstance().addLoadModel("suoluo/", "body.esm");
        egret3d.AssetsManager.getInstance().addLoadTexture("SkyBox/skybox_clear_f.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("SkyBox/skybox_clear_b.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("SkyBox/skybox_clear_l.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("SkyBox/skybox_clear_r.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("SkyBox/skybox_clear_u.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("SkyBox/skybox_clear_d.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("suoluo/suoluomen_cl.png");
        egret3d.AssetsManager.getInstance().addLoadTexture("suoluo/suoluomen_nm.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("suoluo/suoluomen_sp.jpg");
        egret3d.AssetsManager.getInstance().addEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE, (e: egret3d.Event3D) => this.initScene(e));
        egret3d.AssetsManager.getInstance().startLoad();
    }


    private body: egret3d.Mesh;
    private initScene(e: egret3d.Event3D) {
        setTimeout(super.remove,1000);
        var sky_f: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("SkyBox/skybox_clear_f.jpg");
        var sky_b: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("SkyBox/skybox_clear_b.jpg");
        var sky_l: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("SkyBox/skybox_clear_l.jpg");
        var sky_r: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("SkyBox/skybox_clear_r.jpg");
        var sky_u: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("SkyBox/skybox_clear_u.jpg");
        var sky_d: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("SkyBox/skybox_clear_d.jpg");
        
        var skyTexture: egret3d.SkyTexture = new egret3d.SkyTexture(sky_f, sky_b, sky_l, sky_r, sky_u, sky_d);
        var sky: egret3d.Sky = new egret3d.Sky(skyTexture);
        this._view3D.sky = sky; 

        var sprherMesh: egret3d.Mesh = new egret3d.Mesh(new egret3d.CubeGeometry(25, 25, 25), new egret3d.TextureMaterial());
        sprherMesh.x = 120;
        sprherMesh.y = 120;
        sprherMesh.z = -120;
        var lightGroup: egret3d.LightGroup = new egret3d.LightGroup();
        var directLight: egret3d.DirectLight = new egret3d.DirectLight(sprherMesh.position.clone());
        directLight.position = sprherMesh.position;
        directLight.diffuse = 0xffffff;
        directLight.halfColor = 0xffffff;
        directLight.halfIntensity = 0.6;
        lightGroup.addDirectLight(directLight);

        var planeMesh: egret3d.Mesh = new egret3d.Mesh(new egret3d.PlaneGeometry(10000,10000,1,1,1,1) , new egret3d.TextureMaterial() );
        planeMesh.material.lightGroup = lightGroup; 
        planeMesh.material.repeat = true; 
        planeMesh.material.specularColor = 0xffffff; 
        planeMesh.material.specularPower = 0.5;
        planeMesh.material.ambientColor = 0x00235c; 
        planeMesh.material.shininess = 10.0;

        var suoluo_texture_d:egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("suoluo/suoluomen_cl.png");
        var suoluo_texture_n: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("suoluo/suoluomen_nm.jpg");
        var suoluo_texture_s: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("suoluo/suoluomen_sp.jpg");
        
        var material: egret3d.TextureMaterial = new egret3d.TextureMaterial(suoluo_texture_d);
        material.diffuseTexture = suoluo_texture_d;
        material.normalTexture = suoluo_texture_n;
        material.specularTexture = suoluo_texture_s;
        material.lightGroup = lightGroup;
        material.specularPower = 1.0;
        material.ambientColor = 0x00235c;
       
        var hairmesh: egret3d.Mesh = egret3d.AssetsManager.getInstance().findModel("suoluo/hair.esm");
        hairmesh.material = material;
        this._view3D.addChild3D(hairmesh);

        var bodyMaterial: egret3d.TextureMaterial = new egret3d.TextureMaterial(suoluo_texture_d);
        bodyMaterial.diffuseTexture = suoluo_texture_d;
        bodyMaterial.normalTexture = suoluo_texture_n;
        bodyMaterial.specularTexture = suoluo_texture_s;
        bodyMaterial.lightGroup = lightGroup;
        bodyMaterial.ambientColor = 0x00235c;
        bodyMaterial.specularPower = 5.3;
        var bodymesh: egret3d.Mesh = egret3d.AssetsManager.getInstance().findModel("suoluo/body.esm");
        bodymesh.material = bodyMaterial;
        bodymesh.material.bothside = true; 
       
        this._view3D.addChild3D(bodymesh);
        this._view3D.addChild3D(sprherMesh);
        
    }

    private time: number = 0;
    private timeDate: Date;
    private delay: number = 0;
    private update() {

        this.timeDate = new Date();

        this.delay = this.timeDate.getTime() - this.time;

        this.time = this.timeDate.getTime();

        this._cameraCtl.update();

        this._view3D.update(this.time, this.delay);

        window.requestAnimationFrame(() => this.update());
    }
}