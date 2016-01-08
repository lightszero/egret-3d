module egret3d {

     /**
    * @private
     * @language zh_CN
     * @class egret3d.MaterialData
     * @classdesc
     * 材质数据。
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class MaterialData {

        /**
        * @language zh_CN
        * 材质类型。默认为 MaterialType.DIFFUSE。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public matType: MaterialType = MaterialType.DIFFUSE; 

        /**
        * @language zh_CN
        * diffuse pass usage 数据。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public diffusePassUsageData: MethodUsageData = new MethodUsageData(); 

        /**
        * @language zh_CN
        * 深度 pass usage data。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public depthPassUsageData: MethodUsageData = new MethodUsageData(); 

        /**
        * @language zh_CN
        * 法线 pass usage 数据。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public normalPassUsageData: MethodUsageData = new MethodUsageData(); 

        /**
        * @language zh_CN
        * position pass usage 数据。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public positionPassUsageData: MethodUsageData = new MethodUsageData(); 

        /**
        * @language zh_CN
        * post pass usage 数据。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public postPassUsageData: MethodUsageData = new MethodUsageData(); 

        /**
        * @language zh_CN
        * 灯光 pass usage 数据。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public lightPassUsageData: MethodUsageData = new MethodUsageData(); 

        /**
        * @language zh_CN
        * 阴影 pass usage 数据。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public shadowPassUsageData: MethodUsageData = new MethodUsageData(); 


        /**
        * @language zh_CN
        * 渲染模式。默认为 DrawMode.TRIANGLES。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public drawMode: number = DrawMode.TRIANGLES ; 


        /**
        * @language zh_CN
        * Context3D 设备。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public context3D: Context3D;

  
        /**
        * @language zh_CN
        * 阴影贴图。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public shadowMapTex: TextureBase;

        /**
        * @language zh_CN
        * 漫反射贴图。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public diffuseTex: TextureBase;//= CheckerboardTexture.texture ;

        /**
        * @language zh_CN
        * 法线贴图。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public normalTex: TextureBase = CheckerboardTexture.texture;

        /**
        * @language zh_CN
        * 特效贴图。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public specularTex: TextureBase = CheckerboardTexture.texture;

        /**
        * @language zh_CN
        * 灯光贴图。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public lightMapTex: TextureBase = CheckerboardTexture.texture;

        /**
        * @language zh_CN
        * ao 贴图。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public aoMapTex: TextureBase = CheckerboardTexture.texture;

        /**
        * @language zh_CN
        * 环境贴图。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public environmentMapTex: TextureBase = CheckerboardTexture.texture;


        /**
        * @language zh_CN
        * mask 贴图。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public maskTex: TextureBase = CheckerboardTexture.texture ;

        /**
        * @language zh_CN
        * splat_0 贴图。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public splat_0Tex: TextureBase = CheckerboardTexture.texture;

        /**
        * @language zh_CN
        * splat_1 贴图。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public splat_1Tex: TextureBase = CheckerboardTexture.texture;

        /**
        * @language zh_CN
        * splat_2 贴图。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public splat_2Tex: TextureBase = CheckerboardTexture.texture;

        /**
        * @language zh_CN
        * splat_3 贴图。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public splat_3Tex: TextureBase = CheckerboardTexture.texture;


        /**
        * @language zh_CN
        * 方向光列表。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public directLightList: Array<DirectLight> = new Array<DirectLight>();

        /**
        * @language zh_CN
        * 聚光灯列表。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public sportLightList: Array<SpotLight> = new Array<SpotLight>();

        /**
        * @language zh_CN
        * 点光源列表。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public pointLightList: Array<PointLight> = new Array<PointLight>();


        /**
        * @language zh_CN
        * 层。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public layer: number = 0;

        /**
        * @language zh_CN
        * castShadow 默认值为 false。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public castShadow: boolean = false;

        /**
        * @language zh_CN
        * acceptShadow 默认值为 true。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public acceptShadow: boolean = true ;

        /**
        * @language zh_CN
        * depthTest 默认值为 true。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public depthTest: boolean = true;

        /**
        * @language zh_CN
        * smooth 默认值为 true。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public smooth: boolean = true; 

        /**
        * @language zh_CN
        * 混合模式 默认值为 BlendMode.NORMAL。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public blendMode: BlendMode = BlendMode.NORMAL ; 

        /**
        * @language zh_CN
        * blend_src。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public blend_src: number;

        /**
        * @language zh_CN
        * blend_dest。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public blend_dest: number ;

        /**
        * @language zh_CN
        * alphaBlending 默认值为 false。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public alphaBlending: boolean = false; 

        /**
        * @language zh_CN
        * ambientColor 默认值为 0x0。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public ambientColor: number = 0x0;
        //public ambientColor: number = 0x00235c;

        /**
        * @language zh_CN
        * diffuseColor 默认值为 0xffffff。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public diffuseColor: number = 0xffffff;

        /**
        * @language zh_CN
        * specularColor 默认值为 0xffffff。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public specularColor: number = 0xffffff ;

        /**
        * @language zh_CN
        * shininess 默认值为 8.0。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public shininess: number = 8.0;

        /**
        * @language zh_CN
        * cutAlpha 默认值为 0.7。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public cutAlpha: number = 0.7;

        /**
        * @language zh_CN
        * repeat 默认值为 false。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public repeat: boolean = false;


        /**
        * @language zh_CN
        * bothside 默认值为 false。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bothside: boolean = false;

        /**
        * @language zh_CN
        * alpha 默认值为 1。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public alpha: number = 1.0;

        /**
        * @language zh_CN
        * specularPower 默认值为 1.0。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public specularPower: number = 1.0; 

        /**
        * @language zh_CN
        * ambientPower 默认值为 1.0。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public ambientPower: number = 1.0; 

        /**
        * @language zh_CN
        * diffusePower 默认值为 1.0。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public diffusePower: number = 1.0; 

        /**
        * @language zh_CN
        * normalPower 默认值为 1.0。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public normalPower: number = 1.0; 

        /**
        * @language zh_CN
        * materialDataNeedChange 默认值为 true。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public materialDataNeedChange: boolean = true;


        /**
        * @language zh_CN
        * textureChange 默认值为 false。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public textureChange: boolean = false; 

        /**
        * @language zh_CN
        * passChange 默认值为 true。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public passChange: boolean = true;


        /**
        * @language zh_CN
        * cullFrontOrBack 默认值为 Egret3DDrive.BACK。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public cullFrontOrBack: number = Egret3DDrive.BACK;



        /**
        * @language zh_CN
        * 克隆方法。
        * @returns {MaterialData}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): MaterialData {

            var data: MaterialData = new MaterialData();
            data.diffusePassUsageData = this.diffusePassUsageData;
            data.depthPassUsageData = this.depthPassUsageData;
            data.normalPassUsageData = this.normalPassUsageData;
            data.positionPassUsageData = this.positionPassUsageData;
            data.postPassUsageData = this.positionPassUsageData;
            data.lightPassUsageData = this.positionPassUsageData;
            data.shadowPassUsageData = this.positionPassUsageData;

            data.diffuseTex = CheckerboardTexture.texture;
            data.textureChange = true;
            data.matType = MaterialType.DIFFUSE; 

            data.drawMode = this.drawMode;
            data.context3D = this.context3D;
            data.diffuseTex = this.diffuseTex;
            data.specularTex = this.specularTex;
            data.lightMapTex = this.lightMapTex;
            data.environmentMapTex = this.environmentMapTex;
            data.shadowMapTex = this.shadowMapTex;
            data.splat_0Tex = this.splat_0Tex;
            data.splat_1Tex = this.splat_1Tex;
            data.splat_2Tex = this.splat_2Tex;
            data.splat_3Tex = this.splat_3Tex;

            data.layer = this.layer;
            data.castShadow = this.castShadow;
            data.acceptShadow = this.acceptShadow;
            data.depthTest = this.depthTest;
            data.smooth = this.smooth;
            data.blendMode = this.blendMode;
            data.blend_src = this.blend_src;
            data.blend_dest = this.blend_dest;

            data.ambientColor = this.ambientColor;
            data.diffuseColor = this.diffuseColor;
            data.specularColor = this.specularColor;
            data.shininess = this.shininess;

            data.shininess = this.shininess;
            data.cutAlpha = this.cutAlpha;
            data.alpha = this.alpha;
            data.specularPower = this.specularPower;
            data.ambientPower = this.ambientPower;
            data.diffusePower = this.diffusePower;
            data.normalPower = this.normalPower;

            data.passChange = this.passChange;
            data.materialDataNeedChange = this.materialDataNeedChange;
            data.textureChange = true;

            data.cullFrontOrBack = this.cullFrontOrBack;

            //material state
            return data;
        }

        /**
        * @language zh_CN
        * 销毁。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public dispose() {

            if (this.diffusePassUsageData)
                this.diffusePassUsageData.dispose();
            if (this.depthPassUsageData)
                this.depthPassUsageData.dispose();
            if (this.normalPassUsageData)
                this.normalPassUsageData.dispose();
            if (this.normalPassUsageData)
                this.normalPassUsageData.dispose();
            if (this.positionPassUsageData)
                this.positionPassUsageData.dispose();
            if (this.postPassUsageData)
                this.postPassUsageData.dispose();
            if (this.lightPassUsageData)
                this.lightPassUsageData.dispose();
            if (this.shadowPassUsageData)
                this.shadowPassUsageData.dispose();

            if (this.directLightList.length>0){
                this.directLightList.length = 0;
                this.directLightList = null; 
            }
            if (this.sportLightList.length > 0) {
                this.sportLightList.length = 0;
                this.sportLightList = null;
            }
            if (this.pointLightList.length > 0) {
                this.pointLightList.length = 0;
                this.pointLightList = null;
            }

        }
    }
} 