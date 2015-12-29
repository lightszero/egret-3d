/**
 *
 * @author 
 *
 */
class Sample_3DMaxScene {
  
    private viewPort: egret3d.Rectangle; 
    private view3D: egret3d.View3D; 
    private delay: number = 0 ;
    private time: number = 0 ;
    private cameraController: egret3d.LookAtController;
	public constructor() {
    	  //获取网页内屏幕大小
        this.viewPort = new egret3d.Rectangle(0,0,window.innerWidth,window.innerHeight);
        egret3d.Egret3DDrive.requstContext3D(DeviceUtil.getGPUMode,new egret3d.Rectangle(0,0,this.viewPort.width,this.viewPort.height),() => this.init3D());
	}
	
    private init3D() {
        this.view3D = new egret3d.View3D( this.viewPort );
        this.view3D.backImageTexture
        this.cameraController = new egret3d.LookAtController(this.view3D.camera3D,new egret3d.Object3D());
        this.cameraController.setEyesLength(400);
        egret3d.AssetsManager.getInstance().setRootURL("resource/");
        egret3d.AssetsManager.getInstance().addLoadScene("Christmas_Planet");
        egret3d.AssetsManager.getInstance().addLoadTexture("white.jpg");
        egret3d.AssetsManager.getInstance().addEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE,(e: egret3d.Event3D) => this.onLoadComplete(e));
        egret3d.AssetsManager.getInstance().startLoad();
    }

    protected onLoadComplete(e: egret3d.Event3D): void {
        
        var texture: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture( "white.jpg" );
        
        var lightGroup: egret3d.LightGroup = new egret3d.LightGroup();
        var dirLight: egret3d.DirectLight = new egret3d.DirectLight( new egret3d.Vector3D(0.5,1.0,0.3));
        lightGroup.addDirectLight(dirLight);
        
        var meshList: egret3d.Mesh[] = egret3d.AssetsManager.getInstance().findScene("Christmas_Planet");
        var container: egret3d.Object3D = new egret3d.Object3D();
        for(var i: number = 0;i < meshList.length;i++) {
            container.addChild(meshList[i]);
            meshList[i].material.lightGroup = lightGroup ; 
            meshList[i].material.diffuseTexture = texture; 
        }
        this.view3D.addChild3D(container);
        requestAnimationFrame(() => this.update());
    }

    
    private update() {
        var data = new Date();
        this.delay = data.getTime() - this.time;
        this.time = data.getTime();
        this.view3D.renden(this.time,this.delay);
        this.cameraController.update();
        window.requestAnimationFrame(() => this.update());
    }
  
}
