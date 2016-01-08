module egret3d {

    export interface ICubeTexture {

        /**
        * @readOnly
        */
        gpu_texture: any;

        /**
        * @readOnly
        */
        image: HTMLImageElement;
        
        /**
        * @readOnly
        */
        image_front: TextureBase;
        
        /**
        * @readOnly
        */
        image_back: TextureBase;
        
        /**
        * @readOnly
        */
        image_left: TextureBase;
        
        /**
        * @readOnly
        */
        image_right: TextureBase;
        
        /**
        * @readOnly
        */
        image_up: TextureBase;
        
        /**
        * @readOnly
        */
        image_down: TextureBase;
    }
}