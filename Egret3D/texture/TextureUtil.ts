module egret3d {
    /**
     * @class egret3d.TextureUtil
     * @private
     * @classdesc
     * TextureUtil
     * 
     * @version Egret 3.0
     * @platform Web,Native
     * @includeExample texture/TextureUtil.ts
     */
    export class TextureUtil {
        private static context2D: CanvasRenderingContext2D; 
        private static canvas2D: HTMLCanvasElement; 

        /**
         * @language zh_CN
         * 获取纹理数据
         * @private
         * @param image 
         * @returns HTMLCanvasElement 
         */
        public static getTextureData(image: HTMLImageElement): HTMLCanvasElement {
            
            var width: number = 1024 ;//image["width"];
            var height: number = 1024  ;//image["height"];
            
            TextureUtil.canvas2D.width = width;
            TextureUtil.canvas2D.height = height;

            TextureUtil.context2D.clearRect(0, 0, width, height);
            TextureUtil.context2D.drawImage(image, 0, 0, width, height ,
                0, 0, width, height); 

            return TextureUtil.canvas2D;
      
        }

        /**
         * @language zh_CN
         * @private
         */
        public static regist() {
            if (!TextureUtil.canvas2D){
              TextureUtil.canvas2D = <HTMLCanvasElement>document.getElementById("TextureCanvasUtil");
                if (!TextureUtil.context2D) {
                    TextureUtil.canvas2D = <HTMLCanvasElement>document.createElement("canvas");
                    TextureUtil.canvas2D.id = "TextureCanvasUtil";
                    TextureUtil.canvas2D.hidden = true; 
                    document.body.appendChild(TextureUtil.canvas2D);
                    TextureUtil.context2D = <CanvasRenderingContext2D>TextureUtil.canvas2D.getContext("2d");
                }
            }
        }

        /**
         * @language zh_CN
         * 生成MipMap
         * @param source  未生成MipMap的MipmapData对象
         */
        public static generateMipMaps(source: MipmapData) {
            var minW = 1;
            var minH = 1;
            var w = Math.ceil(source.width / 2);
            var h = Math.ceil(source.height / 2);
            var mipmaps: Array<MipmapData> = new Array<MipmapData>();
            mipmaps.push(source);
            var mipmap: MipmapData;
            while (w >= minW || h >= minH) {
                mipmap = new MipmapData(getHalfArray(source.data), w, h);
                w >>= 1;
                h >>= 1;
                source = mipmap;
            }

            function getHalfArray(ary: Uint8Array): Uint8Array {
                var result: Uint8Array = new Uint8Array(Math.ceil(ary.length / 2));
                var index = 0;
                for (var i = 0; i < ary.length; i++) {
                    if (i % 2 == 0) {
                        result[index++] = ary[i];
                    }
                }
                return result;
            }
        }
    }
} 