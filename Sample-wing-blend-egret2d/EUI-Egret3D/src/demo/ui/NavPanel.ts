/**
 *
 * @author 
 *
 */
class NavPanel extends eui.Component {
    static debug:eui.Label ;
    private _colorSelect: ColorSelect;
    private _currentSelect: eui.RadioButton;
    private _currentSelectRect: eui.Rect;
    private _currentSelectColor:number ; 
    
    public bodyColor_label: eui.Rect;
    public fenderColor_label: eui.Rect;
    public wheelHubColor_label: eui.Rect;
    public colorCroup: eui.Group;
    public partGroup: eui.Group;
    
    private callList:Object = new Object();
    public constructor() {
        super();
        this.initUI();
    }

    private initUI() {
        this.skinName = "resource/eui_skins/NavSkin.exml";
        this.left = 0;
        this.bottom = 0;
        this.right = 0;
        
        this._colorSelect = new ColorSelect();
        this.colorCroup.addChild(this._colorSelect);
        this._colorSelect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.selectColorHandler,this);
      
        var partList: Array<eui.RadioButton> = <Array<eui.RadioButton>>this.partGroup.$children;
        for(var i = 0;i < partList.length; i++) {
            partList[i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
        }
        
        this._currentSelect = partList[0] ;
        this._currentSelect.selected = true; 
    }
    
    private selectColorHandler(event: egret.TouchEvent): void {
        this._currentSelectRect = <eui.Rect>event.target ;
        this._currentSelectColor = this._currentSelectRect.fillColor ;
        this.change();
    }

    private touchHandler(event: egret.TouchEvent): void {
        this._currentSelect = <eui.RadioButton>event.target;
        console.log(this._currentSelect.label);
    }
    
    private change(  ){
        switch(this._currentSelect.label){
            case "body" :
                this.bodyColor_label.fillColor = this._currentSelectColor ;
                this.callList["body"](this._currentSelectColor) ;
                break ;
            case "fender":
                this.fenderColor_label.fillColor = this._currentSelectColor;
                this.callList["fender"](this._currentSelectColor);
                break;
            case "wheelHub":
                this.wheelHubColor_label.fillColor = this._currentSelectColor;
                this.callList["wheelHub"](this._currentSelectColor);
                break;
        }
    }
    
    public colorChange( label:string , callBack:Function ){
        this.callList[label] = callBack ; 
    }
}


