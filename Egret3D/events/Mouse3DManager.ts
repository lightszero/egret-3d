module egret3d {
                
    /**
	* @private
    * @language zh_CN
    * @class egret3d.Mouse3DManager
    * @classdesc
    * 鼠标事件管理。
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Mouse3DManager {
        public static left_mouse_over: string = "left_mouse_over" ;
        public static left_mouse_down: string = "left_mouse_down";
        public static left_mouse_up: string = "left_mouse_up";
        public static left_mouse_click: string = "left_mouse_click";

        public static right_mouse_over: string = "right_mouse_over";
        public static right_mouse_down: string = "right_mouse_down";
        public static right_mouse_up: string = "right_mouse_up";
        public static right_mouse_click: string = "right_mouse_click";

        public static middle_mouse_over: string = "middle_mouse_over";
        public static middle_mouse_down: string = "middle_mouse_down";
        public static middle_mouse_up: string = "middle_mouse_up";
        public static middle_mouse_click: string = "middle_mouse_click";

        public static mouse_move: string = "mouse_move";

        public type: string;
        public data: PickResult;

        private _camera: Camera3D;
        private _collect: CollectBase;

        /**
        * @language zh_CN
        * 创建一个新的 Mouse3DManager 对象。
        * @param camera {Camera3D}
        * @param collect {CollectBase}
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(camera: Camera3D) {

            this._camera = camera;

            Input.instance.addListenerKeyClick((code:number)=>this.onMouseClick(code));
            Input.instance.addListenerKeyDown((code: number) => this.onMouseDown(code));
            Input.instance.addListenerKeyUp((code: number) => this.onMouseUp(code));
            Input.instance.addListenerMouseMove((e: MouseEvent) => this.onMouseMove(e));

            Input.instance.addTouchStartCallback((e: TouchEvent) => this.onTouchStart(e));
            Input.instance.addTouchEndCallback((e: TouchEvent) => this.onTouchEnd(e));
            Input.instance.addTouchMoveCallback((e: TouchEvent) => this.onTouchMove(e));
        }


        private onTouchMove(e: TouchEvent) {
            if (!this._collect) return;
            var ret: Array<Object3D> = Picker.pickObject3DList(this._camera, this._collect.mousePickList);
            var event: Event3D;
            for (var i: number = 0; i < ret.length; i++) {
                event = new Event3D(Event3D.TOUCH_MOVE);
                event.currentTarget = ret[i];
                event.data = e;
                ret[i].dispatchEvent(event);
            }
        }
        private onTouchEnd(e: TouchEvent) {
            if (!this._collect) return;
            var ret: Array<Object3D> = Picker.pickObject3DList(this._camera, this._collect.mousePickList);
            var event: Event3D;
            for (var i: number = 0; i < ret.length; i++) {
                event = new Event3D(Event3D.TOUCH_END);
                event.currentTarget = ret[i];
                event.data = e;
                ret[i].dispatchEvent(event);
            }
        }
        private onTouchStart(e: TouchEvent) {
            if (!this._collect) return;
            var ret: Array<Object3D> = Picker.pickObject3DList(this._camera, this._collect.mousePickList);
            var event: Event3D;
            for (var i: number = 0; i < ret.length; i++) {
                event = new Event3D(Event3D.TOUCH_START);
                event.currentTarget = ret[i];
                event.data = e;
                ret[i].dispatchEvent(event);
            }
        }
        private onMouseClick(code: number) {

            if (!this._collect) return;
            var ret: Array<Object3D> = Picker.pickObject3DList(this._camera, this._collect.mousePickList);
            var event: Event3D;
            for (var i: number = 0; i < ret.length; i++) {
                event = new Event3D(Event3D.MOUSE_CLICK);
                event.data = code;
                event.currentTarget = ret[i];
                ret[i].dispatchEvent(event);
            }
        }

        private onMouseDown(code: number) {

            if (!this._collect) return;
            var ret: Array<Object3D> = Picker.pickObject3DList(this._camera, this._collect.mousePickList);
            var event: Event3D;

            for (var i: number = 0; i < ret.length; i++) {
                event = new Event3D(Event3D.MOUSE_DOWN);
                event.currentTarget = ret[i];
                event.data = code;
                ret[i].dispatchEvent(event);
            }
        }

        private onMouseUp(code: number) {

            if (!this._collect) return;
            var ret: Array<Object3D> = Picker.pickObject3DList(this._camera, this._collect.mousePickList);
            var event: Event3D;
            for (var i: number = 0; i < ret.length; i++) {
                event = new Event3D(Event3D.MOUSE_UP);
                event.currentTarget = ret[i];
                event.data = code;
                ret[i].dispatchEvent(event);
            }
        }


        private onMouseMove(e: MouseEvent) {

            if (!this._collect) return;
            var ret: Array<Object3D> = Picker.pickObject3DList(this._camera, this._collect.mousePickList);
            var event: Event3D;
            for (var i: number = 0; i < ret.length; i++) {
                event = new Event3D(Event3D.MOUSE_MOVE);
                event.currentTarget = ret[i];
                event.data = e;
                ret[i].dispatchEvent(event);
            }
        }


        public update(collect: CollectBase) {
            this._collect = collect; 
        }
    }
} 