class SampleBase extends eui.Component {
    
    protected _removeID: number = -1; 
    private _resizeTime: number = -1;
    protected rect: eui.Rect = new eui.Rect() ; 
    protected resize() {
        if(this._resizeTime == -1) {
            this._resizeTime = setTimeout(() => this.setResize(),300);
        }
    }
    
    protected onResize(x:number, y:number, width:number,height:number){
        this.rect.x = x; 
        this.rect.y = y; 
        this.rect.width = width; 
        this.rect.height = height - 88; 
    }

    private setResize() {
        clearTimeout(this._resizeTime);
        this._resizeTime = -1;
        this.onResize(0,0,document.body.clientWidth,document.body.clientHeight);
    }
    
    constructor() {
        super();
        
        this.rect.fillColor = 0xff0000;
        this.rect.fillAlpha = 0.0;
  
        this.addChild(this.rect);
    }

    
} 