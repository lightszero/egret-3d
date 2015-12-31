module egret3d {
        
    /**
     * @language zh_CN
     * @class egret3d.DirectLight
     * @classdesc
     * 方向光数据处理
     */
    export class DirectLight extends LightBase {
        public static stride: number = 10;

        /**
        * @language en_US
        * constructor
        */
        /**
        * @language zh_CN
        * constructor
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

        public set halfColor(color: number) {
            this._halfColor.w = (color >> 24 & 0xff) / 255;
            this._halfColor.x = (color >> 16 & 0xff) / 255;
            this._halfColor.y = (color >> 8 & 0xff) / 255;
            this._halfColor.z = (color & 0xff) / 255;
            this._change = false;
        }

        /**
         * @language en_US
         * @param value 
         */
         /**
         * @language zh_CN
         * @param value 是否投影
         */
        public set castShadow(value: boolean) {
            //if (value )
            //    RttManager.getInstance().shadowMapRender.castShadowLight = this; 
        }
        /**
         * @language en_US 
         * @param index 
         * @param lightData 
         */
        /**
         * @language zh_CN
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
        }
    }
} 