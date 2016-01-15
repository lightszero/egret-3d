class SampleBase{
    constructor() {

        this.initView();

        egret3d.AssetsManager.getInstance().addEventListener(egret3d.Event3D.EVENT_LOAD_PROGRESS, (e: egret3d.Event3D) => this.progress(e));
    }


    private progress(e: egret3d.Event3D) {
        var loading = document.getElementById("loading");
        var progressDiv = document.getElementById("loadingtiao");

        var percent = egret3d.AssetsManager.getInstance().loadCompleteNumber / egret3d.AssetsManager.getInstance().loadTotalNumber;
        var value = Math.floor(percent * 100);
        var width = Math.floor(loading.clientWidth * percent);

        (document.getElementById("percent")).innerHTML = "Loading......" + (value > 100 ? 100 : value) + "% ......";


        progressDiv.style.width = (width > loading.clientWidth ? loading.clientWidth : width) + 'px';
    }

    public remove(){
        var ui = document.getElementById("mask");
        document.body.style.backgroundColor = "#000000";
        document.body.removeChild(ui);
    }


    private initView(): void {

        var w = document.body.clientWidth;

        var mask = document.createElement("div");
        mask.id = "mask";
        mask.style.position = "absolute";
        mask.style.width = "100%";
        mask.style.height = "100%";
        mask.style.backgroundColor = "#545454";
        mask.style.zIndex = '100';
        document.body.appendChild(mask)

        var div = document.createElement("div");
        div.id = "loading";
        div.style.position = 'absolute';
        div.style.width = w * 0.5 + "px";
        div.style.top = '40%';
        div.style.left = (w - w * 0.5) * 0.5 + "px";

        document.body.style.backgroundColor = "#545454";
        mask.appendChild(div);


        var img = document.createElement("img");
        img.src = "resource/logo.png";
        img.style.position = 'absolute';
        img.style.left = (div.clientWidth - 85) * .5 + "px";


        var loadingcao = document.createElement("div");
        loadingcao.id = "loadingcao";
        loadingcao.style.borderRadius = "15px 15px 15px 15px";
        loadingcao.style.backgroundColor = '#404040';
        loadingcao.style.width = div.clientWidth + 'px';
        loadingcao.style.height = '5px';
        loadingcao.style.position = 'absolute';
        loadingcao.style.top = 100 + 'px';

        var loadingtiao = document.createElement("div");
        loadingtiao.id = "loadingtiao";
        loadingtiao.style.borderRadius = "15px 15px 15px 15px";
        loadingtiao.style.backgroundColor = '#ffffff';
        loadingtiao.style.height = '5px';
        loadingtiao.style.position = 'absolute';
        loadingtiao.style.top = 100 + 'px';


        var textWidth = 150;
        var percent = document.createElement("div");
        percent.id = "percent";
        percent.style.width = textWidth + "px";
        percent.style.color = "#000000";
        percent.style.position = 'absolute';
        percent.style.left = (div.clientWidth - textWidth) * .5 + "px";
        percent.style.top = 140 + 'px';
        percent.style.textShadow = "#fff 1px 0 2px,#fff 0 1px 2px,#fff -1px 0 2px,#fff 0 -1px 2px";

        div.appendChild(loadingcao);
        div.appendChild(loadingtiao);
        div.appendChild(img);
        div.appendChild(percent);

    }
} 