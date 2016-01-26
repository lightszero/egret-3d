module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.AssetsManager
     * @classdesc
     * AssetsManager 资源管理类.
     * 用于加载各类3d美术资源.
     * 模型.场景.贴图,等.
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class AssetsManager extends EventDispatcher {

        /**
         * @language zh_CN
         * @private
         */
        static _instance:AssetsManager = new AssetsManager();

        private loadList:Array<BaseLoader> = [];
        private completeCount:number = 0;
        private assets:Object = {};
        private assetsModel:Object = {};
        private assetsScene:Object = {};
        private assetsTexture:Object = {};
        private rootURL:string = "";

        /**
         * @language zh_CN
         * 获取单例实例
         * @returns AssetsManager
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static getInstance():AssetsManager {
            return AssetsManager._instance;
        }

        /**
         * @private
         * @language zh_CN
         * constructor
         * @version Egret 3.0
         * @platform Web,Native
         */
        constructor() {
            super();
        }

        /**
         * @language zh_CN
         * 获取已加载完成的总数
         * @param rootURL
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get loadCompleteNumber():number {
            return this.completeCount;
        }

        /**
         * @language zh_CN
         * 获取等待加载的总数
         * @param rootURL
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get loadTotalNumber(): number {
            return this.loadList.length;
        }

        /**
         * @language zh_CN
         * 设置根路径
         * @param rootURL
         * @version Egret 3.0
         * @platform Web,Native
         */
        public setRootURL(rootURL:string):void {
            this.rootURL = rootURL;
        }

        /**
         * @language zh_CN
         * 查找资源
         * @param url 路径地址
         * @returns 返回对应url的资源
         * @version Egret 3.0
         * @platform Web,Native
         */
        public findAssets(url:string):any {
            return this.assets[this.rootURL + url];
        }

        /**
         * @language zh_CN
         * 查找已下载的模型.
         * @param url 路径地址
         * @returns mesh
         * @version Egret 3.0
         * @platform Web,Native
         */
        public findModel(url:string):Mesh {
            return this.assetsModel[this.rootURL + url];
        }

        /**
         * @language zh_CN
         * 查找已下载的动作模型文件
         * @param url 路径地址
         * @returns Mesh
         * @version Egret 3.0
         * @platform Web,Native
         */
        public findAnimModel(url:string):Mesh {
            return this.assetsModel[this.rootURL + url];
        }

        /**
         * @language zh_CN
         * 查找已经下载完成的场景资源文件
         * @param url 路径地址
         * @returns Array<Mesh>
         * @version Egret 3.0
         * @platform Web,Native
         */
        public findScene(url:string):Array<Mesh> {
            return this.assetsScene[this.rootURL + url];
        }

        /**
         * @language zh_CN
         * 查找贴图
         * @param url 路径地址
         * @returns TexureBase
         * @version Egret 3.0
         * @platform Web,Native
         */
        public findTexture(url:string):TextureBase {
            return this.assetsTexture[this.rootURL + url];
        }

        /**
         * @language zh_CN
         * 启动加载, 加载目标为通过add系列方法添加的资源路径
         * @version Egret 3.0
         * @platform Web,Native
         */
        public startLoad() {

            for (var i:number = 0; i < this.loadList.length; i++) {

                var loader:BaseLoader = this.loadList[i];

                loader.addEventListener(Event3D.EVENT_LOAD_COMPLETE, (e:Event3D) => this.checkComplete(e));

                loader.load();
            }
        }

        /**
         * @language zh_CN
         * 加载模型, 将地址传入加载队列, 调用startLoad之后才会进行加载
         * @param url 模型路径
         * @param ESMFile 模型文件名
         * @version Egret 3.0
         * @platform Web,Native
         */
        public addLoadModel(url:string, ESMFile:string) {

            var modelLoad:ModeLoader = new ModeLoader(this.rootURL + url, ESMFile);

            this.loadList.push(modelLoad);
        }


        /**
         * @language zh_CN
         * 加载模型动作文件, 将加入加载队列, 在调用startLoad()之后进行加载  加载完成后, 会自动将加载的动作文件和模型一起绑定
         * @param url 模型路径
         * @param ESMFile 模型文件名
         * @param EAMFiles 模型动作名列表
         * @version Egret 3.0
         * @platform Web,Native
         */
        public addLoadAnimModel(url:string, ESMFile:string, EAMFiles:string[]) {

            var modelLoad:ModeLoader = new ModeLoader(this.rootURL + url, ESMFile, EAMFiles);

            this.loadList.push(modelLoad);
        }


        /**
         * @language zh_CN
         * 加载场景, 将加入加载队列, 在调用startLoad()之后进行加载
         * @param url 场景文件地址
         * @version Egret 3.0
         * @platform Web,Native
         */
        public addLoadScene(url:string) {

            var sceneLoader:SceneLoader = new SceneLoader(this.rootURL + url);

            this.loadList.push(sceneLoader);
        }

        /**
         * @language zh_CN
         * 加载贴图文件, 将加入加载队列, 在调用startLoad()之后进行加载
         * @param url 要加载的贴图文件地址
         * @version Egret 3.0
         * @platform Web,Native
         */
        public addLoadTexture(url:string) {

            var textureLoader:TextureLoader = new TextureLoader(this.rootURL + url);

            this.loadList.push(textureLoader);
        }


        /**
         * @private
         * @param e
         * @version Egret 3.0
         * @platform Web,Native
         */
        private checkComplete(e:Event3D) {

            var loader:BaseLoader = <BaseLoader>e.data;

            switch (loader.type) {
                case LoaderType.LOADER_MODEL_TYPE:
                    var modeLoader:ModeLoader = <ModeLoader>loader;
                    this.assets[modeLoader.url + modeLoader.esmFile] = modeLoader.mesh;
                    this.assetsModel[modeLoader.url + modeLoader.esmFile] = modeLoader.mesh;
                    break;
                case LoaderType.LOADER_SCENE_TYPE:
                    this.assets[loader.url] = (<SceneLoader>loader).meshList;
                    this.assetsScene[loader.url] = (<SceneLoader>loader).meshList;
                    break;
                case LoaderType.LOADER_TEXTURE_TYPE:
                    this.assets[loader.url] = (<TextureLoader>loader).texture;
                    this.assetsTexture[loader.url] = (<TextureLoader>loader).texture;
                    break;
            }

            this.completeCount++;

            this.dispatchEvent(new Event3D(Event3D.EVENT_LOAD_PROGRESS, this));

            if (this.completeCount >= this.loadList.length) {
                this.dispatchEvent(new Event3D(Event3D.EVENT_LOAD_COMPLETE, this));
            }
        }

    }
}