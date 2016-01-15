module egret3d {

     /**
     * @language zh_CN
     * @class egret3d.TextureMaterial
     * @classdesc
     * 纹理材质。
     * 标准的贴图材质球，可以设置三种贴图， diffuse ， normal ， speclar 贴图
     * 材质球中默认不设置纹理，显示的黑白棋盘格
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

        protected initMatPass() {
            if (this.diffuseTexture instanceof SkyTexture) {
                this.diffusePass = new CubeDiffuseMapPass( this.materialData );
            }
            else {
                this.diffusePass = new DiffuseMapPass( this.materialData );
            }
        }

        /**
         * @language zh_CN
         * 克隆方法。
         * 将材质球克隆一份，公用shader着色器和贴图，不公用参数
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