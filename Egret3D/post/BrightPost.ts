﻿module egret3d {

     /**
     * @private
     * @class egret3d.BrightPost
     * @classdesc
     * 后期亮度调整
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class BrightPost extends PostEffectBase{

        /**
         * @language zh_CN
         * 构造
         * @version Egret 3.0
         * @platform Web,Native
         */
        constructor() {
            super();
            this.postCanvas = new PostCanvas("postCanvas_vertex","BrightPassFilter");
        }

        /**
         * @language zh_CN
         * 渲染到目标帧缓冲上
         * @param source 数据来源buffer
         * @param target 渲染的目标buffer
         * @param context3D  gpu设备
         * @param viewPort 视口
         * @version Egret 3.0
         * @platform Web,Native
         */
        public drawToTarget(source: FrameBuffer, target: FrameBuffer,context3D: Context3D, viewPort:Rectangle) {
            context3D.setRenderToTexture(this.nextFrameBuffer.texture.texture, true, 0);
            this.postCanvas.width = this.rec.width;
            this.postCanvas.height = this.rec.height;
            this.postCanvas.texture = target.texture;
            this.postCanvas.draw(context3D, this.rec);
            //context3D.setRenderToBackBuffer();
           //this.postCanvas.width = viewPort.width;
           //this.postCanvas.height = viewPort.height;
           //this.postCanvas.draw(context3D, this.nextFrameBuffer.texture.texture, viewPort);
        } 
    }
}