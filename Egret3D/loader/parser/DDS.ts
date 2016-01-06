module Egret3D {
    /**
     * @private 
     */
    export class DDS {
        public mipmaps: Array<egret3d.MipmapData>;
        public width: number;
        public height: number;
        public format: number;
        public mipmapCount: number;
        public isCubemap: boolean;
        constructor() {
            this.mipmaps = new Array<egret3d.MipmapData>();
            this.width = 0;
            this.height = 0;
            this.format = null;
            this.mipmapCount = 1;
        }
    }

}