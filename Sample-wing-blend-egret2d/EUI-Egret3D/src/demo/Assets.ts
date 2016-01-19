/**
 *
 * @author 
 *
 */
class Assets {
    
    private loadComplete: Function ;
	public constructor( onComplete:Function ) {
        this.loadComplete = onComplete ; 
    	
        egret3d.AssetsManager.getInstance().setRootURL("resource/");
        egret3d.AssetsManager.getInstance().addLoadModel("","f1/body.esm");
        egret3d.AssetsManager.getInstance().addLoadModel("","f1/brake.esm");
        egret3d.AssetsManager.getInstance().addLoadModel("","f1/carbon_fiber.esm");
        egret3d.AssetsManager.getInstance().addLoadModel("","f1/fender.esm");
        egret3d.AssetsManager.getInstance().addLoadModel("","f1/other.esm");
        egret3d.AssetsManager.getInstance().addLoadModel("","f1/wheel.esm");
        egret3d.AssetsManager.getInstance().addLoadModel("","f1/Plane001.esm");
        egret3d.AssetsManager.getInstance().addLoadModel("","f1/Wheel_hub.esm");
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
        egret3d.AssetsManager.getInstance().addEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE,(e: egret3d.Event3D) => this.asseteOncomplete(e));
        egret3d.AssetsManager.getInstance().startLoad();
        
	}
	
    private asseteOncomplete(e: egret3d.Event3D) {
        this.loadComplete();
	}
}
