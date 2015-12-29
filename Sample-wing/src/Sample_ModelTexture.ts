/**
 *
 * @author 
 *
 */
class Sample_ModelTexture {
  
    private viewPort: egret3d.Rectangle; 
    private view3D: egret3d.View3D; 
    private delay: number = 0 ;
    private time: number = 0 ;
    private cameraController: egret3d.LookAtController;
    
    private sampleMesh: egret3d.Mesh;
	public constructor() {
    	  //获取网页内屏幕大小
        this.viewPort = new egret3d.Rectangle(0,0,window.innerWidth,window.innerHeight);
        egret3d.Egret3DDrive.requstContext3D(DeviceUtil.getGPUMode,new egret3d.Rectangle(0,0,this.viewPort.width,this.viewPort.height),() => this.init3D());
	}
	
    private init3D() {
        this.view3D = new egret3d.View3D( this.viewPort );
        
        var loadModel: egret3d.ModeLoader = new egret3d.ModeLoader("resource/robot/", "body.esm" ); 
        loadModel.addEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE,(e: egret3d.Event3D) => this.modelComplete(e));
        loadModel.load();
        
        //this.view3D.camera3D.y = 800;
        this.view3D.camera3D.lookAt(new egret3d.Vector3D(0,800,1) , new egret3d.Vector3D(0,0,0) , egret3d.Vector3D.Y_AXIS);
        
        requestAnimationFrame( ()=>this.update() );
    }
    
    private modelComplete(e:egret3d.Event3D) {
        var loader: egret3d.ModeLoader = <egret3d.ModeLoader>e.data; 
        this.sampleMesh = loader.mesh ;
        this.view3D.addChild3D(this.sampleMesh);
        
        var textureLoad: egret3d.TextureLoader = new egret3d.TextureLoader("resource/sky/Mars_skybox_left.jpg");
        textureLoad.addEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE,(e: egret3d.Event3D) => this.textureComplete(e));
        textureLoad.load();
    }
    
    private textureComplete(e: egret3d.Event3D) {
        var loader: egret3d.TextureLoader = <egret3d.TextureLoader>e.data; 
        this.sampleMesh.material.diffuseTexture = loader.texture ; 
    }
    
    private update() {
        var data = new Date();
        this.delay = data.getTime() - this.time;
        this.time = data.getTime();
        this.view3D.renden(this.time,this.delay);
        window.requestAnimationFrame(() => this.update());
    }
  
}
