module egret3d {
        
    /**
    * @class egret3d.DirectLight
    * @classdesc
    * 平行灯光</p>
    * 平行光是一种只有方向，强弱度，没有大小范围的灯光，一般情况下，directlight 可以产生阴影;</p>
    * 如果要产生阴影 需要设置 egret3d.ShadowRender.castShadowLight = directLight; 及其他相关模型的设置.</p>
    * 
    * @see egret3d.LightGroup
    * @see egret3d.LightBase
    * @see egret3d.PointLight
    * @see egret3d.SpotLight
    * @includeExample lights/DirectLight.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class DirectLight extends LightBase {
      
        /**
        * @language zh_CN
        * @private
        * 光源数据结构长度
        */
        public static stride: number = 11;

        /**
        * @language zh_CN
        * @private
        * @param dir 光线的方向
        */
        constructor(dir: Vector3D) {
            super();
            dir.normalize();
            this._lightType = 0;
            this._rot.x = dir.x;
            this._rot.y = dir.y;
            this._rot.z = dir.z;
        }

        /**
        * @language zh_CN
        *  
        * 背光颜色
        * 模拟间接光照而开发的背光，而不用去同时打两盏不同方向的组合灯光，可以优化显示效果
        * @param color 背光颜色色值
        */
        public set halfColor(color: number) {
            this._halfColor.w = (color >> 24 & 0xff) / 255;
            this._halfColor.x = (color >> 16 & 0xff) / 255;
            this._halfColor.y = (color >> 8 & 0xff) / 255;
            this._halfColor.z = (color & 0xff) / 255;
            this._change = false;
        }

       /**
        * @language zh_CN
        *  
        * 是否产生阴影
        * 模拟间接光照而开发的背光，而不用去同时打两盏不同方向的组合灯光，可以优化显示效果
        * @param color 背光颜色色值
        */
        //public set castShadow(value: boolean) {
            //if (value )
            //    RttManager.getInstance().shadowMapRender.castShadowLight = this; 
        //}
        /**
         * @language en_US 
         * @param index 
         * @param lightData 
         */
        /**
         * @language zh_CN
         * @private
         * 更新灯光数据
         * @param index 灯光ID
         * @param lightData 灯光数据
         */
        public updateLightData(index: number, lightData: Float32Array) {
            lightData[index * DirectLight.stride + 0] = this._rot.x;
            lightData[index * DirectLight.stride + 1] = this._rot.y;
            lightData[index * DirectLight.stride + 2] = this._rot.z;
            
            lightData[index * DirectLight.stride + 3] = this._diffuse.x;
            lightData[index * DirectLight.stride + 4] = this._diffuse.y;
            lightData[index * DirectLight.stride + 5] = this._diffuse.z;

            lightData[index * DirectLight.stride + 6] = this._halfColor.x;
            lightData[index * DirectLight.stride + 7] = this._halfColor.y;
            lightData[index * DirectLight.stride + 8] = this._halfColor.z;

            lightData[index * DirectLight.stride + 9] = this._intensity;
            lightData[index * DirectLight.stride + 10] = this._halfIntensity;
        }
    }
} 