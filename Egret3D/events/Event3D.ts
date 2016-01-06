module egret3d {
            
    /**
    * @language zh_CN
    * @class egret3d.EventDispatcher
    * @classdesc
    * EventDispatcher 类是可调度事件的所有类的基类。 
    * @includeExample events/Event3D.ts
    */
    export class EventDispatcher {
        listeners: any = {};

        /**
         * @language zh_CN
         * 派发一个 Event3D 事件到所有注册了特定类型侦听器的对象中。 
         * @param event {any} 事件类型
         */
        public dispatchEvent(event: any): void {
            var e: Event3D;
            var type: string;
            if (event instanceof Event3D) {
                type = event.type;
                e = event;
            } else {
                type = event;
                e = new Event3D(type);
            }

            if (this.listeners[type] != null) {
                e.currentTarget = this;
                for (var i: number = 0; i < this.listeners[type].length; i++) {
                    var listener: EventListener = this.listeners[type][i];
                    try {
                        listener.handler(e);
                    } catch (error) {
                        if (window.console) {
                            console.error(error.stack);
                        }
                    }
                }
            }
        }

        /**
        * @language zh_CN
        * 使用 EventDispatcher 对象注册事件侦听器对象，以使侦听器能够接收事件通知。可以为特定类型的事件和优先级注册事件侦听器。成功注册一个事件侦听器后，无法通过额外调用 addEventListener() 来更改其优先级。要更改侦听器的优先级，必须首先调用 removeListener()。然后，可以使用新的优先级再次注册该侦听器。  
        * @param type {string} 事件的类型。
        * @param callback {Function} 处理事件的侦听器函数。此函数必须接受 Event3D 对象作为其唯一的参数，并且不能返回任何结果，
        * 如下面的示例所示： function(evt:Event3D):void 函数可以有任何名称。
        * @param  priority {number} 事件侦听器的优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在
        * 优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
        */
        public addEventListener(type: string, callback: Function, priolity: number = 0): void {
            if (this.listeners[type] == null) {
                this.listeners[type] = [];
            }


            this.listeners[type].push(new EventListener(type, callback, priolity));
            this.listeners[type].sort(function (listener1: EventListener, listener2: EventListener) {
                return listener2.priolity - listener1.priolity;
            });
        }
        /**
         * @language zh_CN
         * 移除事件侦听器
         * @param type {string} 事件名
         * @param callback {Function} 侦听函数
         */
        public removeEventListener(type: string, callback: Function): void {
            if (this.hasEventListener(type, callback)) {
                for (var i: number = 0; i < this.listeners[type].length; i++) {
                    var listener: EventListener = this.listeners[type][i];
                    if (listener.equalCurrentListener(type, callback)) {
                        listener.handler = null;
                        this.listeners[type].splice(i, 1);
                        return;
                    }
                }
            }
        }
        /**
         * @language zh_CN
         * 移除所有事件侦听器
         */
        public clearEventListener(): void {
            this.listeners = {};
        }

        /**
        * @language zh_CN
        * 检测是否存在监听器
        * @param type {string} 
        * @returns {boolean}
        */
        public containEventListener(type: string): boolean {
            if (this.listeners[type] == null) return false;
            return this.listeners[type].length > 0;
        }

        /**
        * @language zh_CN
        * 检测是否存在监听器
        * @param type {string} 事件名
        * @param callback {Function} 处理事件的侦听器函数
        * @returns {boolean}
        */
        public hasEventListener(type: string, callback: Function): boolean {
            if (this.listeners[type] == null) return false;
            for (var i: number = 0; i < this.listeners[type].length; i++) {
                var listener: EventListener = this.listeners[type][i];
                if (listener.equalCurrentListener(type, callback)) {
                    return true;
                }
            }
            return false;
        }
    }

    /**
    *
    * @language zh_CN
    * @class egret3d.EventListener
    * @classdesc
    * EventListener 类 用于添加或删除事件侦听器
    */
    class EventListener {
        /**
        * @language zh_CN
        * constructor
        * @param type {string} 事件的类型。
        * @param handler {Function} 处理事件的侦听器函数
        * @param  priority {number} 事件侦听器的优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在
        * 优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
        */
        constructor(public type: string = null, public handler: Function = null, public priolity: number = 0) {
        }

        /**
        * @language zh_CN
        * 比较两个事件是否相等
        * @param type {string} 事件的类型。
        * @param handler {Function} 处理事件的侦听器函数
        */
        public equalCurrentListener(type: string, handler: Function): boolean {
            if (this.type == type && this.handler == handler) {
                return true;
            }
            return false;
        }
    }



    /**
    * @language zh_CN
    * @class egret3d.Event3D
    * @classdesc
    * Event3D 类作为创建 Event3D 对象的基类，当发生事件时，Event3D 对象将作为参数传递给事件侦听器。Event3D 类的属性包含有关事件的基本信息，例如事件的类型。对于许多事件（如由 Event3D 类常量表示的事件），此基本信息就足够了。但其他事件可能需要更详细的信息。例如，与鼠标单击关联的事件需要包括有关单击事件的位置以及在单击事件期间是否按下了任何键的其他信息。您可以通过扩展 Event3D 类（MouseEvent 类执行的操作）将此类其他信息传递给事件侦听器。
    * @includeExample events/Event3D.ts
    */
    export class Event3D {

        /**
        * @language zh_CN
        * EVENT_LOAD_COMPLETE 常量定义 load_complete 事件对象的 type 属性的值。
        */
        static EVENT_LOAD_COMPLETE: string = "load_complete";
        /**
        * @language zh_CN
        * MOUSE_CLICK 常量定义 onClick 事件对象的 type 属性的值。
        */
        static MOUSE_CLICK = "onClick";
        /**
        * @language zh_CN
        * MOUSE_DOWN 常量定义 onMouseDown 事件对象的 type 属性的值。
        */
        static MOUSE_DOWN = "onMouseDown";
        /**
        * @language zh_CN
        * MOUSE_UP 常量定义 onMouseUp 事件对象的 type 属性的值。
        */
        static MOUSE_UP = "onMouseUp";

        /**
        * @language zh_CN
        * MOUSE_MOVE 常量定义 onMouseMove 事件对象的 type 属性的值。
        */
        static MOUSE_MOVE = "onMouseMove";
        /**
        * @language zh_CN
        * TOUCH_MOVE 常量定义 onTouchMove 事件对象的 type 属性的值。
        */
        static TOUCH_MOVE = "onTouchMove";
        /**
        * @language zh_CN
        * TOUCH_START 常量定义 onTouchStart 事件对象的 type 属性的值。
        */
        static TOUCH_START = "onTouchStart";
        /**
        * @language zh_CN
        * TOUCH_END 常量定义 onTouchEnd 事件对象的 type 属性的值。
        */
        static TOUCH_END   = "onTouchEnd";
        /**
        * @language zh_CN
        * COMPLETE 常量定义 complete 事件对象的 type 属性的值。
        */
        static COMPLETE: string = "complete";
        /**
        * @language zh_CN
        * CHANGE_PROPERTY 常量定义 changeProperty 事件对象的 type 属性的值。
        */
        static CHANGE_PROPERTY: string = "changeProperty";


        private _currentTarget: any;
        /**
        * @language zh_CN
        * 事件当前对象
        * @returns {any}
        */
        public get currentTarget():any {
            return this._currentTarget;
        }
        /**
        * @language zh_CN
        * 事件当前对象
        * @param value {any} 
        */
        public set currentTarget(value:any) {
            this._currentTarget = value;
        }


        private _type: string;
        /**
        * @language zh_CN
        * 事件类型
        * @returns {string}
        */
        public get type(): string {
            return this._type;
        }
        /**
        * @language zh_CN
        * 事件类型
        * @param value {string} 
        */
        public set type(value: string) {
            this._type = value
        }

        private _data: string;
        /**
        * @language zh_CN
        * 附加数据
        * @returns {any}
        */
        public get data(): any {
            return this._data;
        }
        /**
        * @language zh_CN
        * 附加数据
        * @param value {any} 
        */
        public set data(value: any) {
            this._data = value;
        }
        /**
        * @language zh_CN
        * 创建一个作为参数传递给事件侦听器的 Event3D 对象。
        * @param typeName {string} 事件类型
        * @param data {any}附加数据(可选)
        */
        constructor(type: string = null,data: any = null) {
            this._type = type;
            this._data = data;
        }
    }
}