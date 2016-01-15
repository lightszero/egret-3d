module egret3d {

     /**
     * @private
     * @class egret3d.Debug
     * @classdesc
     * 调试面板
     */
    export class Debug {

        private _console: HTMLElement;
        public isDebug: boolean = false;


        /**
         * @language zh_CN
         * 构造
         */
        constructor() {
            this._console = document.createElement('console');
            document.body.appendChild(this._console);
            this._console.style.color = "red";
            this._console.style.zIndex = "1000"; 
            this._console.style.position = "absolute";
            this._console.style.top = "10px";
            this._console.style.left = "10px";
        }


        /**
         * @language zh_CN
         * 输出调试信息
         * @param parameters 
         */
        public trace(...parameters: string[]): void {
            if (this.isDebug) {      
                this.reset();
                var len: number = parameters.length;
                for (var i: number = 0; i < len; i++) {
                    this._console.innerHTML += parameters[i] + "</br>";

                }
            }
        }

        /**
         * @language zh_CN
         * 重置显示数据
         */
        public reset(): void {
            this._console.innerHTML = "";
        }

        private static _instance: Debug = null;
        
        /**
         * @language zh_CN
         * 取到当前Debug单例对象
         */
        public static get instance(): Debug {
            if (this._instance == null) {
                this._instance = new Debug();
            }
            return this._instance;
        }
    }

} 