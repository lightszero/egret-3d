module egret3d {

     /**
     * @language zh_CN
     * @class egret3d.TextureMaterial
     * @classdesc
     * 纹理材质。
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class TextureMaterial extends MaterialBase {
        /**
         * @language zh_CN
         * 创建一个新的 TextureMaterial 对象。
         * @param texture {TextureBase}
         * @param materialData {MaterialData}
         * @version Egret 3.0
         * @platform Web,Native
         */
        constructor(texture: TextureBase = null , materialData:MaterialData = null ) {
            super(materialData);
            
            if (!texture) {
                this.diffuseTexture = CheckerboardTexture.texture;
            } else {
                this.diffuseTexture = texture;
            }

            this.initMatPass();
        }

        /**
         * @language zh_CN
         * 克隆方法。
         * @returns {TextureMaterial}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public clone(): TextureMaterial {
            var mat: TextureMaterial = new TextureMaterial(this.diffuseTexture, this.materialData.clone());
            return mat ;
        }
    }
} 