module egret3d {
                    
    /**
    * @class egret3d.DirectLight
    * @classdesc
    *   
    * 点光源
    * 所有的灯光基本要素 灯光的颜色，强度，位置，方向
    * 颜色的色值均是16进制 red:0xffff0000 argb的定义模式
    * 每个材质球所能最大使用的灯光建议别太多，能省则省，尤其是移动端，能用灯光缓存图 lightmap 最好
    * 点光源是游戏中常常用到的动态光源，实时渲染中，灯光的数量会直接影响渲染性能
    * @see egret3d.Object3D
    * @see egret3d.LightGroup
    * @see egret3d.LightBase
    * @see egret3d.PointLight
    * @see egret3d.SpotLight
    * @includeExample lights/PointLight.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class PointLight extends LightBase {

        /**
         * @language zh_CN
         * @private
         * 点光源的数据长度 
         */
        public static stride: number = 7;
   

        /**
         * @language zh_CN
         * @private
         * constructor 
         * @param color {Number}
         */
        constructor( color:number ) {
            super();
            this._lightType = 1; 
            this.diffuse = color;
        }

        /**
         * @language zh_CN
         * @private
         * 更新灯光数据
         * @param index 灯光ID
         * @param lightData 灯光数据
         */
        public updateLightData(index: number, lightData: Float32Array) {
            lightData[index * PointLight.stride] = this.x;
            lightData[index * PointLight.stride + 1] = this.y;
            lightData[index * PointLight.stride + 2] = this.z;

            lightData[index * PointLight.stride + 3] = this._diffuse.x;
            lightData[index * PointLight.stride + 4] = this._diffuse.y;
            lightData[index * PointLight.stride + 5] = this._diffuse.z;

            lightData[index * PointLight.stride + 6] = this._intensity;
        }
    }
} 