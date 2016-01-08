module egret3d.GLSL {
        
    /**
    * @private
    * @class egret3d.FuncData
    * @classdesc
    * shader函数内容的数据
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class FuncData {

        /**
        * @private
        * 函数名
        * @version Egret 3.0
        * @platform Web,Native
        */
        public name: string = "";
        
        /**
        * @private
        * 函数内容
        * @version Egret 3.0
        * @platform Web,Native
        */
        public func: string = "";
    }
        
    /**
    * @private
    * @class egret3d.ShaderContent
    * @classdesc
    * shader文件解析后的数据内容
    * 每种变量类型都进行了规类
    * 用相应的列表进行存储，这样可以便于shader文件进行合并
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ShaderContent {

        /**
        * @private
        * shader文件名
        * @version Egret 3.0
        * @platform Web,Native
        */
        public name: string = "";
        private funcDict: { [name: string]: string; } = {};
        
        /**
        * @private
        * 结构体列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public structDict: { [name: string]: string; } = {};
                
        /**
        * @private
        * attribute列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public attributeList: Array<Attribute> = new Array<Attribute>();
                        
        /**
        * @private
        * varying列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public varyingList: Array<Varying> = new Array<Varying>();
                                
        /**
        * @private
        * uniform列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uniformList: Array<Uniform> = new Array<Uniform>();
                                        
        /**
        * @private
        * const列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public constList: Array<ConstVar> = new Array<ConstVar>();
                                                
        /**
        * @private
        * 临时变量列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public tempList: Array<TmpVar> = new Array<TmpVar>();
                                                
        /**
        * @private
        * sampler2D列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public sampler2DList: Array<Sampler2D> = new Array<Sampler2D>();
                                                        
        /**
        * @private
        * sampler3D列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public sampler3DList: Array<Sampler3D> = new Array<Sampler3D>();
                                                                
        /**
        * @private
        * 函数列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public funcList: Array<FuncData> = new Array<FuncData>();
                                                                        
        /**
        * @private
        * 增加一个变量对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addVar(sVar: VarRegister) {

            if (sVar.key == "attribute") {
                this.attributeList.push(sVar);
            }
            else if (sVar.key == "varying") {
                this.varyingList.push(sVar);
            }
            else if (sVar.key == "uniform") {
                this.uniformList.push(sVar);
            }
            else if (sVar.key == "const") {
                this.constList.push(sVar);
            }
            else if (sVar.key == "sampler2D") {
                this.sampler2DList.push(sVar);
            }
            else if (sVar.key == "samplerCube") {
                this.sampler3DList.push(sVar);
            }
            else {
                this.tempList.push(sVar);
            }
        }
                                                                        
        /**
        * @private
        * 增加一个函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addFunc(name: string, func: string) {
            if (this.funcDict[name] == undefined) {
                this.funcDict[name] = func;
                var funcData: FuncData = new FuncData();
                funcData.name = name;
                funcData.func = func;
                if (name == "main") {
                    this.funcList.push(funcData);
                }
                else {
                    this.funcList.unshift(funcData);
                }
            }
            else {
                if (name == "main") {
                    var newfunc: string = this.mergeMainFunc(this.funcDict[name], func);
                    this.funcDict[name] = newfunc;
                    var funcData: FuncData = this.findFunc(name);
                    if (funcData) {
                        funcData.func = newfunc;
                    }

                }
                else {
                    console.log("<" + name + ">" + "函数重复");
                }
            }
        }
                                                                        
        /**
        * @private
        * 增加一个结构体
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addStruct(name: string, structStr: string) {
            if (this.structDict[name] == undefined) {
                this.structDict[name] = structStr;
            }
            else {
                console.log("<" + name + ">" + "struct重复");
            }
        }
                                                                        
        /**
        * @private
        * 合并一个shader内容
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addContent(otherContent: ShaderContent) {
            for (var key in otherContent.structDict) {
                this.structDict[key] = otherContent.structDict[key];
            }

            for (var key in otherContent.funcDict) {
                this.addFunc(key, otherContent.funcDict[key]);
            }

            for (var i: number = 0; i < otherContent.attributeList.length; ++i) {
                var isAdd: boolean = true;
                for (var j: number = 0; j < this.attributeList.length; ++j) {
                    if (otherContent.attributeList[i].name == this.attributeList[j].name) {
                        if (otherContent.attributeList[i].valueType != this.attributeList[j].valueType ||
                            otherContent.attributeList[i].key != this.attributeList[j].key) {
                            console.log("Error :addContent");
                        }

                        isAdd = false;
                        break;
                    }
                }
                if (isAdd) {
                    this.attributeList.push(otherContent.attributeList[i].clone());
                }
            }

            for (var i: number = 0; i < otherContent.varyingList.length; ++i) {

                var isAdd: boolean = true;
                for (var j: number = 0; j < this.varyingList.length; ++j) {
                    if (otherContent.varyingList[i].name == this.varyingList[j].name) {
                        if (otherContent.varyingList[i].valueType != this.varyingList[j].valueType ||
                            otherContent.varyingList[i].key != this.varyingList[j].key) {
                            console.log("Error :addContent");
                        }

                        isAdd = false;
                        break;
                    }
                }
                if (isAdd) {
                    this.varyingList.push(otherContent.varyingList[i].clone());
                }
            }

            for (var i: number = 0; i < otherContent.uniformList.length; ++i) {

                var isAdd: boolean = true;
                for (var j: number = 0; j < this.uniformList.length; ++j) {
                    if (otherContent.uniformList[i].name == this.uniformList[j].name) {
                        if (otherContent.uniformList[i].valueType != this.uniformList[j].valueType ||
                            otherContent.uniformList[i].key != this.uniformList[j].key) {
                            console.log("Error :addContent");
                        }

                        isAdd = false;
                        break;
                    }
                }
                if (isAdd) {
                    this.uniformList.push(otherContent.uniformList[i].clone());
                }
            }

            for (var i: number = 0; i < otherContent.constList.length; ++i) {

                var isAdd: boolean = true;
                for (var j: number = 0; j < this.constList.length; ++j) {
                    if (otherContent.constList[i].name == this.constList[j].name) {
                        if (otherContent.constList[i].valueType != this.constList[j].valueType ||
                            otherContent.constList[i].key != this.constList[j].key) {
                            console.log("Error :addContent");
                        }

                        isAdd = false;
                        break;
                    }
                }
                if (isAdd) {
                    this.constList.push(otherContent.constList[i].clone());
                }
            }

            for (var i: number = 0; i < otherContent.tempList.length; ++i) {
                var isAdd: boolean = true;
                for (var j: number = 0; j < this.tempList.length; ++j) {
                    if (otherContent.tempList[i].name == this.tempList[j].name) {
                        if (otherContent.tempList[i].valueType != this.tempList[j].valueType ||
                            otherContent.tempList[i].key != this.tempList[j].key) {
                            console.log("Error :addContent");
                        }

                        isAdd = false;
                        break;
                    }
                }
                if (isAdd) {
                    this.tempList.push(otherContent.tempList[i].clone());
                }
            }

            for (var i: number = 0; i < otherContent.sampler2DList.length; ++i) {

                var isAdd: boolean = true;
                for (var j: number = 0; j < this.sampler2DList.length; ++j) {
                    if (otherContent.sampler2DList[i].name == this.sampler2DList[j].name) {
                        if (otherContent.sampler2DList[i].valueType != this.sampler2DList[j].valueType ||
                            otherContent.sampler2DList[i].key != this.sampler2DList[j].key) {
                            console.log("Error :addContent");
                        }

                        isAdd = false;
                        break;
                    }
                }
                if (isAdd) {
                    this.sampler2DList.push(otherContent.sampler2DList[i].clone());
                }
            }

            for (var i: number = 0; i < otherContent.sampler3DList.length; ++i) {
                var isAdd: boolean = true;
                for (var j: number = 0; j < this.sampler3DList.length; ++j) {
                    if (otherContent.sampler3DList[i].name == this.sampler3DList[j].name) {
                        if (otherContent.sampler2DList[i].valueType != this.sampler3DList[j].valueType ||
                            otherContent.sampler3DList[i].key != this.sampler3DList[j].key) {
                            console.log("Error :addContent");
                        }

                        isAdd = false;
                        break;
                    }
                }
                if (isAdd) {
                    this.sampler3DList.push(otherContent.sampler3DList[i].clone());
                }
            }
        }

        private mergeMainFunc(func1: string, func2: string): string {
            var ret: string = func1;

            var func: string = "";
            var s_pos: number = func2.indexOf("{");
            var e_pos: number = func2.lastIndexOf("}");
            s_pos++;
            func = func2.slice(s_pos, e_pos);
            s_pos = ret.lastIndexOf("}");
            var f_func: string = ret.substr(0, s_pos);
            var s_func: string = ret.substr(s_pos, ret.length - s_pos);

            ret = f_func;
            ret += func;

            var temp: string = "";
            var line: string = "";
            var old: string = ret;
            ///while (true) {
            ///    s_pos = ret.indexOf("gl_FragColor");
            ///    if (s_pos >= 0) {
            ///        e_pos = ret.indexOf(";", s_pos);
            ///        temp = ret.substring(s_pos, e_pos + 1);
            ///        ret = ret.replace(temp, "");
            ///        line += temp;
            ///    }

            ///    s_pos = ret.indexOf("gl_Position");
            ///    if (s_pos >= 0) {
            ///        e_pos = ret.indexOf(";", s_pos);
            ///        temp = ret.substring(s_pos, e_pos + 1);
            ///        ret = ret.replace(temp, "");
            ///        line += temp;
            ///    }
            ///    if (old == ret) {
            ///        break;
            ///    }
            ///    old = ret;
            ///}
            ret += line;
            ret += s_func;
            return ret;
        }

        private findFunc(name: string): FuncData {
            var funcData: FuncData = null;
            for (var i: number = 0; i < this.funcList.length; ++i) {
                if (this.funcList[i].name == name) {
                    funcData = this.funcList[i];
                    break;
                }
            }

            return funcData;
        }
    }
}