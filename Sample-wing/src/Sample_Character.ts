class Sample_Character {

    private _view3D: egret3d.View3D;
    private _cameraCtl: egret3d.LookAtController;
    private _viewPort: egret3d.Rectangle;

    private _shadowMaping: egret3d.ShadowMapingMethod;
    constructor() {
        this._viewPort = new egret3d.Rectangle(0, 0, window.innerWidth, window.innerHeight );
        egret3d.Egret3DDrive.requstContext3D(DeviceUtil.getGPUMode, new egret3d.Rectangle(0, 0, this._viewPort.width, this._viewPort.height), () => this.init3D());
    }

    private init3D() {

        this._view3D = new egret3d.View3D(this._viewPort);
        this._view3D.useShadow = true;
        this._view3D.camera3D.position = new egret3d.Vector3D(0, 5, -10);

        this._cameraCtl = new egret3d.LookAtController(this._view3D.camera3D, new egret3d.Object3D());

        this._cameraCtl.setEyesLength(400);

        window.requestAnimationFrame(() => this.update());

        egret3d.AssetsManager.getInstance().setRootURL("resource/");
        egret3d.AssetsManager.getInstance().addLoadModel("","suoluo/hair.esm");
        egret3d.AssetsManager.getInstance().addLoadModel("", "suoluo/body.esm");
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
        directLight.halfIntensity = 1.0;
        lightGroup.addDirectLight(directLight);
        egret3d.ShadowRender.castShadowLight = directLight; 

        var planeMesh: egret3d.Mesh = new egret3d.Mesh(new egret3d.PlaneGeometry(10000,10000,1,1,1,1) , new egret3d.TextureMaterial() );
       // var wireframeMesh: egret3d.WireframeMesh = new egret3d.WireframeMesh();
        planeMesh.material.lightGroup = lightGroup; 
        planeMesh.material.repeat = true; 
        planeMesh.material.shadowMapingMethod = this._shadowMaping;

        planeMesh.material.specularColor = 0xffffff; 
        planeMesh.material.specularPower = 0.5;
        planeMesh.material.ambientColor = 0x00235c; 
        planeMesh.material.shininess = 10.0;

        var suoluo_texture_d:egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("suoluo/suoluomen_cl.png");
        var suoluo_texture_n: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("suoluo/suoluomen_nm.jpg");
        var suoluo_texture_s: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("suoluo/suoluomen_sp.jpg");
        
        var mesh: egret3d.Mesh = egret3d.AssetsManager.getInstance().findModel("suoluo/hair.esm");
        mesh.material.diffuseTexture = suoluo_texture_d;
        mesh.material.normalTexture = suoluo_texture_n;
        mesh.material.specularTexture = suoluo_texture_s;
        mesh.material.lightGroup = lightGroup; 
        mesh.material.castShadow = true;
        mesh.material.ambientColor = 0x00235c; 
        mesh.material.acceptShadow = true; 
        mesh.material.shadowMapingMethod = this._shadowMaping;
        this._view3D.addChild3D(mesh);

        var mesh: egret3d.Mesh = egret3d.AssetsManager.getInstance().findModel("suoluo/body.esm");
        mesh.material.diffuseTexture = suoluo_texture_d;
        mesh.material.normalTexture = suoluo_texture_n;
        mesh.material.specularTexture = suoluo_texture_s;
        mesh.material.lightGroup = lightGroup; 
        mesh.material.castShadow = true;
        mesh.material.ambientColor = 0x00235c; 
        mesh.material.ambientPower = 0.0; 
        mesh.material.specularPower = 5.0;
        mesh.material.shininess = 10.0;
        //mesh.material.acceptShadow = true; 
        mesh.material.shadowMapingMethod = this._shadowMaping;
        mesh.material.bothside = true; 

        //var env: egret3d.SpecularEnvironmentMappingMethod = new egret3d.SpecularEnvironmentMappingMethod(skyTexture);
        //mesh.material.addDiffusePassEffectMothod(env);
        //var wireframeMesh: egret3d.WireframeMesh = new egret3d.WireframeMesh();
        //wireframeMesh.creatByMesh(mesh);
        //this._view3D.addWireframe(wireframeMesh);
        this.body = mesh; 
       
        this._view3D.addChild3D(mesh);
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

        this._view3D.renden(this.time, this.delay);

        window.requestAnimationFrame(() => this.update());
    }
}