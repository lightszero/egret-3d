class F1 extends SampleBase {
    private _view3D: egret3d.View3D;
    private _cameraCtl: egret3d.HoverController;
    private _viewPort: egret3d.Rectangle;
    
    private body: egret3d.Mesh;
    private brake: egret3d.Mesh;
    private carbon_fiber: egret3d.Mesh;
    private fender: egret3d.Mesh;
    private other: egret3d.Mesh;
    private wheel: egret3d.Mesh;
    private Wheel_hub: egret3d.Mesh;
    private Plane001: egret3d.Mesh;

    private bodyEnv: egret3d.PaintFresnelReflectionMappingMethod;
    constructor() {
        super();
        this._viewPort = new egret3d.Rectangle(0,0,document.body.clientWidth ,document.body.clientHeight );
        egret3d.Egret3DDrive.requstContext3D(DeviceUtil.getGPUMode, new egret3d.Rectangle(0, 0, this._viewPort.width, this._viewPort.height), () => this.init3D());
        
    } 
    
    protected onResize(x: number,y: number,width: number,height: number) {
        this._view3D.resize(0,0,document.body.clientWidth,document.body.clientHeight);
    }

    private init3D() {
        this._view3D = new egret3d.View3D(this._viewPort);
        this._view3D.camera3D.position = new egret3d.Vector3D(0, 5, -10);
        window.addEventListener("resize",() => this.resize());
        
        this._cameraCtl = new egret3d.HoverController(this._view3D.camera3D, null, 45, 45, 200, 8, 85);
        this._cameraCtl.lookAtPosition = new egret3d.Vector3D(0, 10, 0);
        this._cameraCtl.minDistance = 80;
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
        this.body = egret3d.AssetsManager.getInstance().findModel("f1/body.esm");
        this.brake = egret3d.AssetsManager.getInstance().findModel("f1/brake.esm");
        this.carbon_fiber = egret3d.AssetsManager.getInstance().findModel("f1/carbon_fiber.esm");
        this.fender = egret3d.AssetsManager.getInstance().findModel("f1/fender.esm");
        this.other = egret3d.AssetsManager.getInstance().findModel("f1/other.esm");
        this.wheel = egret3d.AssetsManager.getInstance().findModel("f1/wheel.esm");
        this.Wheel_hub = egret3d.AssetsManager.getInstance().findModel("f1/Wheel_hub.esm");
        this.Plane001 = egret3d.AssetsManager.getInstance().findModel("f1/Plane001.esm");

        var body_ao: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/ao/bodyAo.jpg");
        var carbon_fiber_ao: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/ao/carbon_fiberAo.jpg");
        var fenderAmbient_ao: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/ao/fenderAo.jpg");
        var otherAmbient_fiber_ao: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/ao/otherAo.jpg");
        var plane001Ambient_fiber_ao: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/ao/Plane001Ao.jpg");
        var wheel_hubAmbient_fiber_ao: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/ao/Wheel_hubAo.jpg");
        var wheelAmbient_fiber_ao: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/ao/wheelAo.jpg");

        this.bodyEnv = new egret3d.PaintFresnelReflectionMappingMethod(skyTexture, random);
        this.bodyEnv.envLightPower = 0.5;
        this.body.material.diffuseTexture = f1_texture_d;
        this.body.material.specularTexture = f1_texture_s;
        this.body.material.lightGroup = lightGroup;
        this.body.material.ambientColor = 0x00235c;
        this.body.material.addDiffusePassEffectMothod(this.bodyEnv);
        this.body.material.addDiffusePassEffectMothod(new egret3d.AOMapMethod(body_ao));

        var brakeEnv: egret3d.PaintFresnelReflectionMappingMethod = new egret3d.PaintFresnelReflectionMappingMethod(skyTexture, random);
        brakeEnv.envLightPower = 0.4;
        this.brake.material.diffuseTexture = f1_texture_d;
        this.brake.material.specularTexture = f1_texture_s;
        this.brake.material.lightGroup = lightGroup;
        this.brake.material.ambientColor = 0x00235c;
     
        this.carbon_fiber.material.diffuseTexture = f1_texture_d;
        this.carbon_fiber.material.specularTexture = f1_texture_s;
        this.carbon_fiber.material.lightGroup = lightGroup;
        this.carbon_fiber.material.ambientColor = 0x333333;
        var carbon_fiberEnv: egret3d.PaintFresnelReflectionMappingMethod = new egret3d.PaintFresnelReflectionMappingMethod(skyTexture, random);
        carbon_fiberEnv.envLightPower = 0.3;
        carbon_fiberEnv.maskColor = 0x333333;
        this.carbon_fiber.material.addDiffusePassEffectMothod(carbon_fiberEnv);
        this.carbon_fiber.material.addDiffusePassEffectMothod(new egret3d.AOMapMethod(carbon_fiber_ao));

        var fenderEnv: egret3d.PaintFresnelReflectionMappingMethod = new egret3d.PaintFresnelReflectionMappingMethod(skyTexture, random);
        fenderEnv.envLightPower = 0.5;
        this.fender.material.diffuseTexture = f1_texture_d;
        this.fender.material.specularTexture = f1_texture_s;
        this.fender.material.lightGroup = lightGroup;
        this.fender.material.ambientColor = 0x00235c;
        this.fender.material.addDiffusePassEffectMothod(fenderEnv);
        this.fender.material.addDiffusePassEffectMothod(new egret3d.AOMapMethod(fenderAmbient_ao));

        this.other.material.diffuseTexture = f1_texture_d;
        this.other.material.specularTexture = f1_texture_s;
        this.other.material.lightGroup = lightGroup;
        this.other.material.ambientColor = 0x00235c;
        this.other.material.addDiffusePassEffectMothod(new egret3d.AOMapMethod(otherAmbient_fiber_ao));

        this.wheel.material.diffuseTexture = f1_texture_d;
        this.wheel.material.specularTexture = f1_texture_s;
        this.wheel.material.lightGroup = lightGroup;
        this.wheel.material.ambientColor = 0x00235c; 
        this.wheel.material.specularPower = 20.0;
        this.wheel.material.addDiffusePassEffectMothod(new egret3d.AOMapMethod(wheelAmbient_fiber_ao));

        var Wheel_hubEnv: egret3d.PaintFresnelReflectionMappingMethod = new egret3d.PaintFresnelReflectionMappingMethod(skyTexture, random);
        Wheel_hubEnv.envLightPower = 0.5;
        Wheel_hubEnv.maskColor = 0xffffff;
        this.Wheel_hub.material.diffuseTexture = f1_texture_d;
        this.Wheel_hub.material.specularTexture = f1_texture_s;
        this.Wheel_hub.material.lightGroup = lightGroup;
        this.Wheel_hub.material.ambientColor = 0x00235c;
        this.Wheel_hub.material.addDiffusePassEffectMothod(Wheel_hubEnv);
        this.Wheel_hub.material.addDiffusePassEffectMothod(new egret3d.AOMapMethod(wheel_hubAmbient_fiber_ao));
        
        var plane001Env: egret3d.AlphaEnvironmentMappingMethod = new egret3d.AlphaEnvironmentMappingMethod(skyTexture);
        this.Plane001.material.diffuseTexture = floor_texture_d;
        this.Plane001.material.ambientColor = 0xffffff;
        this.Plane001.material.ambientPower = 0.5;
        this.Plane001.y = -0.01;
        var planeAO: egret3d.AOMapMethod = new egret3d.AOMapMethod(plane001Ambient_fiber_ao);
        planeAO.aoPower = 1.0 ;
        this.Plane001.material.addDiffusePassEffectMothod(planeAO);

        var planeGeo: egret3d.PlaneGeometry = new egret3d.PlaneGeometry(800,800,30,30);
        var planeWirframe: egret3d.WireframeMesh = new egret3d.WireframeMesh();
        planeWirframe.createFromGeometry(planeGeo);

        f1_car.addChild(this.body);
        f1_car.addChild(this.brake);
        f1_car.addChild(this.carbon_fiber);
        f1_car.addChild(this.fender);
        f1_car.addChild(this.other);
        f1_car.addChild(this.wheel);
        f1_car.addChild(this.Wheel_hub);
        f1_car.addChild(this.Plane001);

        //var hud: egret3d.HUD = new egret3d.HUD();
        //hud.texture = powerByEgret3D_d; 
        //hud.width = 128;
        //hud.height = 53;
        //this._view3D.addHUD(hud);

        this._view3D.addChild3D(f1_car);
        this._view3D.addWireframe(planeWirframe);
        
        var config: any = {};
        config.customBG = '#222';
        config.read = true;
        //config.actionCallback = (elm: any,colors: any) => this.selectColor(elm,colors);
        config.renderCallback = (color: any,model: any) => this.updatctColor(color,model);
        
        this.jsColor = new jsColorPicker('input.color',config);
    }
    
    private jsColor: jsColorPicker;
    private updatctColor(color,model) {
        if(this.jsColor.current) {
            var pr: number = this.jsColor.current.color.colors.rgb.r * 255.0;
            var pg: number = this.jsColor.current.color.colors.rgb.g * 255.0;
            var pb: number = this.jsColor.current.color.colors.rgb.b * 255.0;
            this.bodyEnv.maskColor = pr << 16 | pg << 8 | pb;
        }
    }
    

    private selectColor(event,action) {
        if(this.jsColor.current){
            var pr: number = this.jsColor.current.color.colors.rgb.r * 255.0;
            var pg: number = this.jsColor.current.color.colors.rgb.g * 255.0;
            var pb: number = this.jsColor.current.color.colors.rgb.b * 255.0;
            this.bodyEnv.maskColor = pr << 16 | pg << 8 | pb; 
        }
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