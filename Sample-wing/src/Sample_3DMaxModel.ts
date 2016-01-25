/**
 *
 * @author 
 *
 */
class Sample_3DMaxModel extends SampleBase{
  
    private viewPort: egret3d.Rectangle; 
    private view3D: egret3d.View3D; 
    private delay: number = 0 ;
    private time: number = 0 ;
    private cameraController: egret3d.LookAtController;
	public constructor() {
        super();
    	  //获取网页内屏幕大小
        this.viewPort = new egret3d.Rectangle(0,0,window.innerWidth,window.innerHeight);
        egret3d.Egret3DDrive.requstContext3D(DeviceUtil.getGPUMode,new egret3d.Rectangle(0,0,this.viewPort.width,this.viewPort.height),() => this.init3D());
    }
    
    protected onResize(x: number,y: number,width: number,height: number) {
        this.view3D.resize(x,y,width,height);
    }
	
    private init3D() {
        this.view3D = new egret3d.View3D( this.viewPort );
        window.addEventListener("resize",() => super.resize());
        var loadModel: egret3d.ModeLoader = new egret3d.ModeLoader("resource/","Planet_Trees_Tree_42_Top5_Cone_46.esm"); 
        //var loadModel: egret3d.ModeLoader = new egret3d.ModeLoader("resource/", "body.esm" ); 
        loadModel.addEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE,(e: egret3d.Event3D) => this.checkComplete(e));
        loadModel.load();
         
        this.cameraController = new egret3d.LookAtController(this.view3D.camera3D,new egret3d.Object3D());
        this.cameraController.setEyesLength(400);
        
        requestAnimationFrame( ()=>this.update() );
    }
    
    private checkComplete(e:egret3d.Event3D) {
        setTimeout(super.remove,1000);
        var loader: egret3d.ModeLoader = <egret3d.ModeLoader>e.data; 
        var mesh: egret3d.Mesh = loader.mesh ;
        this.view3D.addChild3D(mesh);
    }
    
    private update() {
        var data = new Date();
        this.delay = data.getTime() - this.time;
        this.time = data.getTime();
        this.view3D.update(this.time,this.delay);
        this.cameraController.update();
        window.requestAnimationFrame(() => this.update());
    }
  
}
