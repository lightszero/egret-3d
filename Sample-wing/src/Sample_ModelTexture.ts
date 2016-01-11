/**
 *
 * @author 
 *
 */
class Sample_ModelTexture {
  
    private viewPort: egret3d.Rectangle; 
    private _view3D: egret3d.View3D; 
    private delay: number = 0 ;
    private time: number = 0 ;
    private _cameraCtl: egret3d.HoverController;
    private sampleMesh: egret3d.Mesh;
	public constructor() {
    	  //获取网页内屏幕大小
        this.viewPort = new egret3d.Rectangle(0,0,window.innerWidth,window.innerHeight);
        egret3d.Egret3DDrive.requstContext3D(DeviceUtil.getGPUMode,new egret3d.Rectangle(0,0,this.viewPort.width,this.viewPort.height),() => this.init3D());
	}
	
    private init3D() {
        this._view3D = new egret3d.View3D( this.viewPort );
        this._cameraCtl = new egret3d.HoverController(this._view3D.camera3D,null,90,0,300);
        this._cameraCtl.lookAtPosition = new egret3d.Vector3D(0,0,0);
        
        var loadModel: egret3d.ModeLoader = new egret3d.ModeLoader("resource/", "box.esm" ); 
        loadModel.addEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE,(e: egret3d.Event3D) => this.modelComplete(e));
        loadModel.load();
        
        requestAnimationFrame( ()=>this.update() );
    }
    
    private modelComplete(e:egret3d.Event3D) {
        var loader: egret3d.ModeLoader = <egret3d.ModeLoader>e.data; 
        this.sampleMesh = loader.mesh ;
     
        
        var textureLoad: egret3d.TextureLoader = new egret3d.TextureLoader("resource/sky/Mars_skybox_left.jpg");
        textureLoad.addEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE,(e: egret3d.Event3D) => this.textureComplete(e));
        textureLoad.load();
    }
    
    private textureComplete(e: egret3d.Event3D) {
        var loader: egret3d.TextureLoader = <egret3d.TextureLoader>e.data; 
        this.sampleMesh.material.diffuseTexture = loader.texture ; 
        this.sampleMesh.material.ambientPower = 0.5;
        this._view3D.addChild3D(this.sampleMesh);
    }
    
    private update() {
        
        this._cameraCtl.update();
        var data = new Date();
        this.delay = data.getTime() - this.time;
        this.time = data.getTime();
        this._view3D.renden(this.time,this.delay);
        window.requestAnimationFrame(() => this.update());
    }
  
}
