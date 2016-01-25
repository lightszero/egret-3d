class F1_car extends egret3d.Object3D {
    private body: egret3d.Mesh;
    private brake: egret3d.Mesh;
    private carbon_fiber: egret3d.Mesh;
    private fender: egret3d.Mesh;
    private other: egret3d.Mesh;
    private wheel: egret3d.Mesh;
    private Wheel_hub: egret3d.Mesh;
    private Plane001: egret3d.Mesh;

    private bodyEnv: egret3d.PaintFresnelReflectionMappingMethod;
    private fenderEnv: egret3d.PaintFresnelReflectionMappingMethod;
    private wheelHubEnv: egret3d.PaintFresnelReflectionMappingMethod;
    
    constructor() {
        super();
        this.buildCar();
    } 
    
    private buildCar() {
        var lightGroup: egret3d.LightGroup = new egret3d.LightGroup();
        var directLight: egret3d.DirectLight = new egret3d.DirectLight(new egret3d.Vector3D(0.5,1.0,-0.6));
        directLight.diffuse = 0xffffff;
        directLight.halfColor = 0xffffff;
        directLight.halfIntensity = 1.0;
        lightGroup.addDirectLight(directLight);
        
        var sky_f: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/env/BackLight_8K_12_f.jpg");
        var sky_b: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/env/BackLight_8K_12_b.jpg");
        var sky_l: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/env/BackLight_8K_12_l.jpg");
        var sky_r: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/env/BackLight_8K_12_r.jpg");
        var sky_u: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/env/BackLight_8K_12_u.jpg");
        var sky_d: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/env/BackLight_8K_12_d.jpg");
        var random: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/flap.png");
        var skyTexture: egret3d.SkyTexture = new egret3d.SkyTexture(sky_b, sky_f, sky_l, sky_r, sky_u, sky_d);
        var floor_texture_d: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/white.jpg");
        var f1_texture_d: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/Lotus_dif_blackvrsn.jpg");
        var f1_texture_s: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/Lotus_spc_1.jpg");

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

//        var brakeEnv: egret3d.PaintFresnelReflectionMappingMethod = new egret3d.PaintFresnelReflectionMappingMethod(skyTexture, random);
//        brakeEnv.envLightPower = 0.4;
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

        this.fenderEnv = new egret3d.PaintFresnelReflectionMappingMethod(skyTexture, random);
        this.fenderEnv.envLightPower = 0.5;
        this.fender.material.diffuseTexture = f1_texture_d;
        this.fender.material.specularTexture = f1_texture_s;
        this.fender.material.lightGroup = lightGroup;
        this.fender.material.ambientColor = 0x00235c;
        this.fender.material.addDiffusePassEffectMothod(this.fenderEnv);
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

        this.wheelHubEnv = new egret3d.PaintFresnelReflectionMappingMethod(skyTexture, random);
        this.wheelHubEnv.envLightPower = 0.5;
        this.wheelHubEnv.maskColor = 0xffffff;
        this.Wheel_hub.material.diffuseTexture = f1_texture_d;
        this.Wheel_hub.material.specularTexture = f1_texture_s;
        this.Wheel_hub.material.lightGroup = lightGroup;
        this.Wheel_hub.material.ambientColor = 0x00235c;
        this.Wheel_hub.material.addDiffusePassEffectMothod(this.wheelHubEnv);
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

        this.addChild(this.body);
        this.addChild(this.brake);
        this.addChild(this.carbon_fiber);
        this.addChild(this.fender);
        this.addChild(this.other);
        this.addChild(this.wheel);
        this.addChild(this.Wheel_hub);
        this.addChild(this.Plane001);
        
        this.initController();
    }
    
    private initController() {
        var nav: NavPanel = window["nav"];
        nav.colorChange("body",(color) => this.changeBodyColor(color));
        nav.colorChange("fender",(color) => this.changeFenderColor(color));
        nav.colorChange("wheelHub",(color) => this.changeWheelHubColor(color));
    }

    private changeBodyColor(color:number){
        this.bodyEnv.maskColor = color;
    }
    
    private changeFenderColor(color: number){
        this.fenderEnv.maskColor = color;
    }
        
    private changeWheelHubColor(color: number){
        this.wheelHubEnv.maskColor = color;
    }
}