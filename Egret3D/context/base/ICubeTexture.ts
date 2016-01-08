module egret3d {

    /**
    * @private
    */
    export interface ICubeTexture {
        
        /**
        *  
        */
        gpu_texture: any;

        /**
        *  
        */
        image: HTMLImageElement;
        
        /**
        *  
        */
        image_front: TextureBase;
        
        /**
        *  
        */
        image_back: TextureBase;
        
        /**
        *  
        */
        image_left: TextureBase;
        
        /**
        *  
        */
        image_right: TextureBase;
        
        /**
        *  
        */
        image_up: TextureBase;
        
        /**
        *  
        */
        image_down: TextureBase;
    }
}