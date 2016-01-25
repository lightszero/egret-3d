/**
 *
 * @author 
 *
 */
class ColorSelect extends eui.Component {
    public colorCroup: eui.Group;
	public constructor() {
        super();
        this.initUI();
	}
	
    private initUI(){
        this.skinName = "resource/eui_skins/ColorPickSkin.exml";
    }
    
}
