class F1 extends SampleBase {
    private _view3D: egret3d.View3D;
    private _cameraCtl: egret3d.HoverController;
    private _viewPort: egret3d.Rectangle;
    
    
    constructor() {
        super();
        this._viewPort = new egret3d.Rectangle(0,0,document.body.clientWidth ,document.body.clientHeight );
        egret3d.Egret3DDrive.requstContext3D(DeviceUtil.getGPUMode, new egret3d.Rectangle(0, 0, this._viewPort.width, this._viewPort.height), () => this.init3D());
        egret3d.Debug.instance.isDebug = true;
        window.addEventListener("resize",() => this.resize( ) );
    }
    
    private _resizeTime: number = -1; 
    private resize(){
        this._resizeTime = setTimeout(() => this.setResize(),300 );
    }
    
    private setResize() {
        clearTimeout(this._resizeTime);
        this._view3D.resize(0,0, document.body.clientWidth  ,document.body.clientHeight );
        egret3d.Debug.instance.trace(document.body.clientWidth.toString(),document.body.clientHeight.toString() );
    }

    private init3D() {
        this._view3D = new egret3d.View3D(this._viewPort);
        this._view3D.camera3D.position = new egret3d.Vector3D(0, 5, -10);

        this._cameraCtl = new egret3d.HoverController(this._view3D.camera3D, null, 45, 45, 200, 8, 85);
        this._cameraCtl.lookAtPosition = new egret3d.Vector3D(0, 10, 0);
        this._cameraCtl.minDistance = 188;
        this._cameraCtl.maxDistance = 524;
        window.requestAnimationFrame(() => this.update());

        egret3d.AssetsManager.getInstance().setRootURL("resource/");
        //对象001 对象002 对象003 wheel Plane001
        egret3d.AssetsManager.getInstance().addLoadModel("", "f1/body.esm");
        egret3d.AssetsManager.getInstance().addLoadModel("", "f1/brake.esm");
        egret3d.AssetsManager.getInstance().addLoadModel("", "f1/carbon_fiber.esm");
        egret3d.AssetsManager.getInstance().addLoadModel("", "f1/fender.esm");
        egret3d.AssetsManager.getInstance().addLoadModel("", "f1/other.esm");
        egret3d.AssetsManager.getInstance().addLoadModel("", "f1/wheel.esm");
        egret3d.AssetsManager.getInstance().addLoadModel("", "f1/Plane001.esm");
        egret3d.AssetsManager.getInstance().addLoadModel("", "f1/Wheel_hub.esm");
        egret3d.AssetsManager.getInstance().addLoadTexture("f1/texture/env/BackLight_8K_12_f.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("f1/texture/env/BackLight_8K_12_b.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("f1/texture/env/BackLight_8K_12_l.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("f1/texture/env/BackLight_8K_12_r.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("f1/texture/env/BackLight_8K_12_u.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("f1/texture/env/BackLight_8K_12_d.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("f1/texture/Lotus_dif_blackvrsn.jpg"); 
        egret3d.AssetsManager.getInstance().addLoadTexture("f1/texture/Lotus_spc_1.jpg"); 
        egret3d.AssetsManager.getInstance().addLoadTexture("f1/texture/flap.png");
        egret3d.AssetsManager.getInstance().addLoadTexture("f1/texture/ao/bodyAo.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("f1/texture/ao/carbon_fiberAo.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("f1/texture/ao/fenderAo.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("f1/texture/ao/otherAo.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("f1/texture/ao/Plane001Ao.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("f1/texture/ao/Wheel_hubAo.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("f1/texture/ao/wheelAo.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("f1/texture/white.jpg");
        //egret3d.AssetsManager.getInstance().addLoadTexture("Egret-3D_power.png");
       
        egret3d.AssetsManager.getInstance().addEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE, (e: egret3d.Event3D) => this.initScene(e));
        egret3d.AssetsManager.getInstance().startLoad();
    }

    private initScene(e: egret3d.Event3D) {
        this._removeID = setTimeout(super.remove,0);
        var sky_f: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/env/BackLight_8K_12_f.jpg");
        var sky_b: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/env/BackLight_8K_12_b.jpg");
        var sky_l: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/env/BackLight_8K_12_l.jpg");
        var sky_r: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/env/BackLight_8K_12_r.jpg");
        var sky_u: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/env/BackLight_8K_12_u.jpg");
        var sky_d: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/env/BackLight_8K_12_d.jpg");
        var random: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/flap.png");

        var skyTexture: egret3d.SkyTexture = new egret3d.SkyTexture(sky_b, sky_f, sky_l, sky_r, sky_u, sky_d);
        //this._view3D.sky = new egret3d.Sky(skyTexture);
        //var cubeGeomtry: egret3d.CubeGeometry = new egret3d.CubeGeometry(200, 200, 200);
        //cubeGeomtry.transfromVertex( new egret3d.Vector3D(0,100,0) );
        //var mesh: egret3d.Mesh = new egret3d.Mesh(cubeGeomtry, new egret3d.TextureMaterial(skyTexture));
        //mesh.material.cullMode = egret3d.Egret3DDrive.FRONT;
        //this._view3D.addChild3D(mesh);

        var lightGroup: egret3d.LightGroup = new egret3d.LightGroup();
        var directLight: egret3d.DirectLight = new egret3d.DirectLight(new egret3d.Vector3D(0.5,1.0,-0.6));
        directLight.diffuse = 0xffffff;
        directLight.halfColor = 0xffffff;
        directLight.halfIntensity = 1.0;
        lightGroup.addDirectLight(directLight);

        var f1_texture_d: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/Lotus_dif_blackvrsn.jpg");
        var f1_texture_s: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/Lotus_spc_1.jpg");
        var floor_texture_d: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/white.jpg");
        //var powerByEgret3D_d: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("Egret-3D_power.png");
       
        this._view3D.backImageTexture = floor_texture_d;

        var f1_car: egret3d.Object3D = new egret3d.Object3D();
        var body: egret3d.Mesh = egret3d.AssetsManager.getInstance().findModel("f1/body.esm");
        var brake: egret3d.Mesh = egret3d.AssetsManager.getInstance().findModel("f1/brake.esm");
        var carbon_fiber: egret3d.Mesh = egret3d.AssetsManager.getInstance().findModel("f1/carbon_fiber.esm");
        var fender: egret3d.Mesh = egret3d.AssetsManager.getInstance().findModel("f1/fender.esm");
        var other: egret3d.Mesh = egret3d.AssetsManager.getInstance().findModel("f1/other.esm");
        var wheel: egret3d.Mesh = egret3d.AssetsManager.getInstance().findModel("f1/wheel.esm");
        var Wheel_hub: egret3d.Mesh = egret3d.AssetsManager.getInstance().findModel("f1/Wheel_hub.esm");
        var Plane001: egret3d.Mesh = egret3d.AssetsManager.getInstance().findModel("f1/Plane001.esm");

        var body_ao: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/ao/bodyAo.jpg");
        var carbon_fiber_ao: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/ao/carbon_fiberAo.jpg");
        var fenderAmbient_ao: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/ao/fenderAo.jpg");
        var otherAmbient_fiber_ao: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/ao/otherAo.jpg");
        var plane001Ambient_fiber_ao: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/ao/Plane001Ao.jpg");
        var wheel_hubAmbient_fiber_ao: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/ao/Wheel_hubAo.jpg");
        var wheelAmbient_fiber_ao: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/ao/wheelAo.jpg");

        var bodyEnv: egret3d.PaintFresnelReflectionMappingMethod = new egret3d.PaintFresnelReflectionMappingMethod(skyTexture, random);
        bodyEnv.envLightPower = 0.5;
        body.material.diffuseTexture = f1_texture_d;
        body.material.specularTexture = f1_texture_s;
        body.material.lightGroup = lightGroup;
        body.material.ambientColor = 0x00235c;
        body.material.addDiffusePassEffectMothod(bodyEnv);
        body.material.addDiffusePassEffectMothod(new egret3d.AOMapMethod(body_ao));

        var brakeEnv: egret3d.PaintFresnelReflectionMappingMethod = new egret3d.PaintFresnelReflectionMappingMethod(skyTexture, random);
        brakeEnv.envLightPower = 0.4;
        brake.material.diffuseTexture = f1_texture_d;
        brake.material.specularTexture = f1_texture_s;
        brake.material.lightGroup = lightGroup;
        brake.material.ambientColor = 0x00235c;
     
        carbon_fiber.material.diffuseTexture = f1_texture_d;
        carbon_fiber.material.specularTexture = f1_texture_s;
        carbon_fiber.material.lightGroup = lightGroup;
        carbon_fiber.material.ambientColor = 0x333333;
        var carbon_fiberEnv: egret3d.PaintFresnelReflectionMappingMethod = new egret3d.PaintFresnelReflectionMappingMethod(skyTexture, random);
        carbon_fiberEnv.envLightPower = 0.3;
        carbon_fiberEnv.maskColor = 0x333333;
        carbon_fiber.material.addDiffusePassEffectMothod(carbon_fiberEnv);
        carbon_fiber.material.addDiffusePassEffectMothod(new egret3d.AOMapMethod(carbon_fiber_ao));

        var fenderEnv: egret3d.PaintFresnelReflectionMappingMethod = new egret3d.PaintFresnelReflectionMappingMethod(skyTexture, random);
        fenderEnv.envLightPower = 0.5;
        fender.material.diffuseTexture = f1_texture_d;
        fender.material.specularTexture = f1_texture_s;
        fender.material.lightGroup = lightGroup;
        fender.material.ambientColor = 0x00235c;
        fender.material.addDiffusePassEffectMothod(fenderEnv);
        fender.material.addDiffusePassEffectMothod(new egret3d.AOMapMethod(fenderAmbient_ao));

        other.material.diffuseTexture = f1_texture_d;
        other.material.specularTexture = f1_texture_s;
        other.material.lightGroup = lightGroup;
        other.material.ambientColor = 0x00235c;
        other.material.addDiffusePassEffectMothod(new egret3d.AOMapMethod(otherAmbient_fiber_ao));

        wheel.material.diffuseTexture = f1_texture_d;
        wheel.material.specularTexture = f1_texture_s;
        wheel.material.lightGroup = lightGroup;
        wheel.material.ambientColor = 0x00235c; 
        wheel.material.specularPower = 20.0;
        wheel.material.addDiffusePassEffectMothod(new egret3d.AOMapMethod(wheelAmbient_fiber_ao));

        var Wheel_hubEnv: egret3d.PaintFresnelReflectionMappingMethod = new egret3d.PaintFresnelReflectionMappingMethod(skyTexture, random);
        Wheel_hubEnv.envLightPower = 0.5;
        Wheel_hubEnv.maskColor = 0xffffff;
        Wheel_hub.material.diffuseTexture = f1_texture_d;
        Wheel_hub.material.specularTexture = f1_texture_s;
        Wheel_hub.material.lightGroup = lightGroup;
        Wheel_hub.material.ambientColor = 0x00235c;
        Wheel_hub.material.addDiffusePassEffectMothod(Wheel_hubEnv);
        Wheel_hub.material.addDiffusePassEffectMothod(new egret3d.AOMapMethod(wheel_hubAmbient_fiber_ao));
        
        var plane001Env: egret3d.AlphaEnvironmentMappingMethod = new egret3d.AlphaEnvironmentMappingMethod(skyTexture);
        Plane001.material.diffuseTexture = floor_texture_d;
        Plane001.material.ambientColor = 0xffffff;
        Plane001.material.ambientPower = 0.5;
        Plane001.y = -0.01;
        var planeAO: egret3d.AOMapMethod = new egret3d.AOMapMethod(plane001Ambient_fiber_ao);
        planeAO.aoPower = 1.0 ;
        Plane001.material.addDiffusePassEffectMothod(planeAO);

        var planeGeo: egret3d.PlaneGeometry = new egret3d.PlaneGeometry(800,800,30,30);
        var planeWirframe: egret3d.WireframeMesh = new egret3d.WireframeMesh();
        planeWirframe.createFromGeometry(planeGeo);

        f1_car.addChild(body);
        f1_car.addChild(brake);
        f1_car.addChild(carbon_fiber);
        f1_car.addChild(fender);
        f1_car.addChild(other);
        f1_car.addChild(wheel);
        f1_car.addChild(Wheel_hub);
        f1_car.addChild(Plane001);

        //var hud: egret3d.HUD = new egret3d.HUD();
        //hud.texture = powerByEgret3D_d; 
        //hud.width = 128;
        //hud.height = 53;
        //this._view3D.addHUD(hud);

        this._view3D.addChild3D(f1_car);
        this._view3D.addWireframe(planeWirframe);
    }

    private time: number = 0;
    private timeDate: Date;
    private delay: number = 0;
    private lastTime: number = 0;
    private update() {

       

        this.timeDate = new Date();

        this.delay = this.timeDate.getTime() - this.time;

        this.time = this.timeDate.getTime();

        this._cameraCtl.update();

        this._view3D.renden(this.time, this.delay);

        window.requestAnimationFrame(() => this.update());
    }
}