module egret3d {

     /**
     * @language zh_CN
     * @class egret3d.TerrainMaterial
     * @classdesc
     * 地形材质。
     * 地形材质球，可以使用 一张control 的rgba 贴图控制融合地表纹理，最大只能融合4张地表纹理，后期可以进行拓展，也可设置单独的纹理重复次数，纹理的uv映射方式，具体可以看官方的示例教程
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class TerrainMaterial extends MaterialBase {
        /**
         * @language zh_CN
         * 创建一个新的 TerrainMaterial 对象。
         * @param colormap {TextureBase}
         * @param controlTex {TextureBase}
         * @param splat_0 {TextureBase}
         * @param splat_1 {TextureBase}
         * @param splat_2 {TextureBase}
         * @param splat_3 {TextureBase}
         * @param lightMap {TextureBase}
         * @version Egret 3.0
         * @platform Web,Native
         */
        constructor(colormap: TextureBase, controlTex: TextureBase, splat_0: TextureBase, splat_1: TextureBase, splat_2: TextureBase, splat_3: TextureBase,lightMap:TextureBase=null) {

            super();
            this.materialData.diffuseTex = colormap;
            this.materialData.maskTex = controlTex;
            this.materialData.splat_0Tex = splat_0;
            this.materialData.splat_1Tex = splat_1;
            this.materialData.splat_2Tex = splat_2;
            this.materialData.splat_3Tex = splat_3;

            if (!lightMap)
                this.materialData.lightMapTex = CheckerboardTexture.texture;
            else
                this.materialData.lightMapTex = lightMap ;

            this.initMatPass();
        }

        protected initMatPass() {
            this.diffusePass = new TerrainMapPass( this.materialData );
        }

        /**
         * @language zh_CN
         * 设置 UVTitling。
         * @param index {Number} 图层索引
         * @param x {Number}
         * @param y {Number}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public setUVTitling(index: number, x: number, y: number) {
            (<TerrainMethod>this.diffusePass.diffuseMethod).setUVTitling(index, x, y);
        }

    }
}