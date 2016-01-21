/**
 *
 * @author 
 *
 */
class LoadingPanel extends eui.Component{
    public pr: eui.Label;
    public loadProgress:eui.ProgressBar;
	public constructor() {
    	super();
    	this.init();
	}
	
	private init(){
        this.skinName = "resource/eui_skins/LoadingSkin.exml" ;
	}
	
    public setProgress(loaded:number,total:number){
         this.pr.text = "loading:" + loaded.toString() + "/" + total.toString();
         this.loadProgress.value = Math.floor(loaded / total) ;
    }
}
