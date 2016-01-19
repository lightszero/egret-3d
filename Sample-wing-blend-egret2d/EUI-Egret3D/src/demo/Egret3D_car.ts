/**
 *
 * @author 
 *
 */
class Egret3D_car extends SampleBase{
    
    protected _boxs: egret3d.Mesh[] = [null,null];
    protected _currentSelected: egret3d.Mesh = null;

    protected _time: number = 0;
    protected _delay: number = 0;
    protected _timeDate: Date = null;
    protected _view3D: egret3d.View3D = null;
    protected _viewPort: egret3d.Rectangle = null;
    protected _cameraCtl: egret3d.HoverController = null;
    
    public constructor(width: number = 800,height: number = 600) {
        super();
        this._viewPort = new egret3d.Rectangle(0,0,width,height);
        egret3d.Egret3DDrive.requstContext3D(DeviceUtil.getGPUMode,this._viewPort,() => this.onInit3D());
	}
	
    protected onResize(x: number,y: number,width: number,height: number) {
        this._view3D.resize(0,0,document.body.clientWidth,document.body.clientHeight);
    }
	
    protected onInit3D(): void {
        //创建View3D对象;
        this._view3D = new egret3d.View3D(this._viewPort);
        window.addEventListener("resize",() => this.resize());
       
        new Assets( () => this.onAssetsComplete() );
        this.resize();
   
    }
    
    private onAssetsComplete() {
        var floor_texture_d: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("f1/texture/white.jpg");
        this._view3D.backImageTexture = floor_texture_d;

        this._cameraCtl = new egret3d.HoverController(this._view3D.camera3D,null,45,45,200,8,85);
        this._cameraCtl.lookAtPosition = new egret3d.Vector3D(0,10,0);
        this._cameraCtl.minDistance = 80;
        this._cameraCtl.maxDistance = 524;
        
        var f1_car: F1_car = new F1_car();
        this._view3D.addChild3D(f1_car);
        
//      var navPanel: NavPanel = new NavPanel();
//      this.addChild(navPanel);
        
        window.requestAnimationFrame(() => this.onUpdate());
    }

    protected onUpdate(): void {

        this._timeDate = new Date();

        this._delay = this._timeDate.getTime() - this._time;

        this._time = this._timeDate.getTime();

        this._cameraCtl.update();

        this._view3D.renden(this._time,this._delay);

        requestAnimationFrame(() => this.onUpdate());
    }
}
