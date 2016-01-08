module egret3d {

    /**
    * @language zh_CN
    * 渲染混合模式
    * BlendMode 类中的一个值，用于指定要使用的混合模式。 内部绘制位图的方法有两种。 如果启用了混合模式或外部剪辑遮罩，则将通过向矢量渲染器添加有位图填充的正方形来绘制位图。 如果尝试将此属性设置为无效值，则 Flash 运行时会将此值设置为 BlendMode.NORMAL。 
    * blendMode 属性影响显示对象的每个像素。每个像素都由三种原色（红色、绿色和蓝色）组成，每种原色的值介于 0x00 和 0xFF 之间。Flash Player 或 Adobe AIR 将影片剪辑中一个像素的每种原色与背景中像素的对应颜色进行比较。例如，如果 blendMode 设置为 BlendMode.LIGHTEN，则 Flash Player 或 Adobe AIR 会将显示对象的红色值与背景的红色值进行比较，然后使用两者中较亮的一种颜色作为显示颜色的红色成分的值。
    * 下表将对 blendMode 设置进行说明。BlendMode 类定义可使用的字符串值。表中的插图显示应用于交叠于显示对象 (1) 之上的圆形显示对象 (2) 的 blendMode 值。
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum BlendMode {
        /**
         * @language zh_CN
         * 将显示对象的每个像素的 Alpha 值应用于背景。
         * @version Egret 3.0
         * @platform Web,Native
         */
        ALPHA,
        
        /**
         * @language zh_CN
         * 强制为该显示对象创建一个透明度组。
         * @version Egret 3.0
         * @platform Web,Native
         */         
        LAYER, 

         /**
         * @language zh_CN
         * 该显示对象出现在背景前面。
         * @version Egret 3.0
         * @platform Web,Native
         */ 
        NORMAL, 

         /**
         * @language zh_CN
         * 将显示对象的原色值与背景颜色的原色值相乘，然后除以 0xFF 进行标准化，从而得到较暗的颜色。
         * @version Egret 3.0
         * @platform Web,Native
         */ 
        MULTIPLY, 

         /**
         * @language zh_CN
         * 将显示对象的原色值添加到它的背景颜色中，上限值为 0xFF。
         * @version Egret 3.0
         * @platform Web,Native
         */ 
        ADD, 


         /**
         * @language zh_CN
         * 从背景颜色的值中减去显示对象原色的值，下限值为 0。
         * @version Egret 3.0
         * @platform Web,Native
         */ 
        SUB, 
         /**
         * @language zh_CN
         * 将显示对象颜色的补色（反色）与背景颜色的补色相除。
         * @version Egret 3.0
         * @platform Web,Native
         */ 
        DIV, 
         /**
         * @language zh_CN
         * 将显示对象颜色的补色（反色）与背景颜色的补色相乘，会产生漂白效果。
         * @version Egret 3.0
         * @platform Web,Native
         */ 
        SCREEN 
    }
    /**
     * @private
     * @class egret3d.ContextSamplerType
     * @classdesc
     * 贴图采样类型
     */
    export class ContextSamplerType {

        /**
        * @language zh_CN
        * 纹理0数据
        */
        public static TEXTURE_0: any;

        /**
        * @language zh_CN
        * 纹理1数据
        */
        public static TEXTURE_1: any;
        
        /**
        * @language zh_CN
        * 纹理2数据
        */
        public static TEXTURE_2: any;
        
        /**
        * @language zh_CN
        * 纹理3数据
        */
        public static TEXTURE_3: any;
        
        /**
        * @language zh_CN
        * 纹理4数据
        */
        public static TEXTURE_4: any;
        
        /**
        * @language zh_CN
        * 纹理5数据
        */
        public static TEXTURE_5: any;
        
        /**
        * @language zh_CN
        * 纹理6数据
        */
        public static TEXTURE_6: any;
        
        /**
        * @language zh_CN
        * 纹理7数据
        */
        public static TEXTURE_7: any;
        
        /**
        * @language zh_CN
        * 纹理8数据
        */
        public static TEXTURE_8: any;

        /**
        * @language zh_CN
        * 重复 0~1 的纹理坐标 例如：5.2 % 1 = 0.2
        */
        public static REPEAT: number;

        /**
        * @language zh_CN
        * 重复 0~1 的纹理坐标 例如：5.2 % 1 = 0.2
        */
        public static NEAREST: number;

        /**
        * @language zh_CN
        * 重复 0~1 的纹理坐标 例如：5.2 % 1 = 0.2
        */
        public static LINEAR: number;
    }

} 