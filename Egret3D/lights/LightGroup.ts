module egret3d {
   
     /**
    * @class egret3d.DirectLight
    * @classdesc
    * @public 
    * 灯光组管理器
    * 可以定义场景内所有的灯光，根据灯光组来设定材质受多少光照影响，方便材质光照管理
    * 不同的

    * @see egret3d.Object3D
    * @see egret3d.LightGroup
    * @see egret3d.LightBase
    * @see egret3d.PointLight
    * @see egret3d.SportLight
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class LightGroup {
        /**
         * @language en_US 
         */
        /**
         * @language zh_CN  
         */
        public lightNum: number = 0;
        /**
         * @language en_US 
         */
        /**
         * @language zh_CN  
         * 方向光列表
         */
        public directLightList: Array<DirectLight>;
        /**
         * @language en_US 
         */
        /**
         * @language zh_CN  
         * 聚光灯列表
         */
        public spotLightList: Array<SpotLight>;
        /**
         * @language en_US 
         */
        /**
         * @language zh_CN  
         * 点光源列表
         */
        public pointLightList: Array<PointLight>;
        /**
        * @language zh_CN
        * constructor
        */
        constructor() {
            this.directLightList = new Array<DirectLight>();
            this.spotLightList = new Array<SpotLight>();
            this.pointLightList = new Array<PointLight>();
        }

        /**
         * @language en_US 
         * @param light 
         */
        /**
         * @language zh_CN
         * 增加一个方向光
         * @param light  Direct Light
         */
        public addDirectLight(light: DirectLight) {
            this.directLightList.push(light);
            this.lightNum++;
        }

        /**
         * @language en_US 
         * @param light 
         */
        /**
         * @language zh_CN 
         * 增加一个聚光灯
         * @param light Spot Light
         */
        public addSpotLight(light: SpotLight) {
            this.spotLightList.push(light);
            this.lightNum++;
        } 

        /**
         * @language en_US
         * @param light 
         */
        /**
         * @language zh_CN
         * 增加一个点光源
         * @param light  Point Light
         */
        public addPointLight(light: PointLight) {
            this.pointLightList.push(light);
            this.lightNum++;
        }

    }
} 