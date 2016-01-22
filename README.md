# Egret Engine 3D API(CodeName:HummingBird)

## 概述

Egret Engine 3.0 包含了白鹭时代研发的遵循HTML5标准的2D引擎及全新打造的3D引擎。
它解决了HTML5性能问题及碎片化问题，灵活地满足开发者开发2D或3D游戏的需求，并有着极强的跨平台运行能力。

当前版本为 Egret Engine 3.0 3D API 的Beta版本,欢迎开发者根据试用此版本并与我们的核心开发者进行反馈,交流与贡献。

## Egret  新功能
----
#### •    模型系统
Egret3D封装了自己的引擎静态模型及动画模型，并提供了3Dmax 导出插件，也就是说支持任意3D模型格式。

#### •    材质系统
可以根据自己的渲染风格，灵活的通过调整参数或增加材质特效的方式对材质进行编辑。

#### •    灯光系统
支持TBN直接光照系统，未来还会支持间接光照，提高光影效果。

#### •    动画系统
支持了3Dmax中高级骨骼动画及相机动画，满足绝大部分游戏需要。

#### •    shadow系统（阴影系统）
支持shadowmaping 的方式投射纹理,可自定义阴影颜色,透明度,提高渲染质量,增强视觉效果。

#### •    shader系统
基于OpenGL ES2.0 标准的原生webgl shader，并与引擎功能紧密结合及拓展。为未来的shader编辑器做好了铺垫。

## Egret  使用
----

### 3DMax export
支持任何3Dmax能打开的模型，方便Egret开发者保存、输出Egret 3D动态模型、静态模型等内容的插件。
### 3DMax 插件的使用
* 1.	将对应的3Dmax插件放到 Autodesk\3ds Max 2012\stdplugs 的目录中，就可以直接使用3Dmax export 的导出功能
* 2.	静态模型使用 static 导出,如果需要灯光贴图，需要勾选第二uv
* 3.	动态模型也就是骨骼动画，需要使用 anim export
* 
----
![](http://sedn.egret.com/asset/20151224/567b9e15dffc1.png)
### lightmap效果
![](http://sedn.egret.com/asset/20151224/567b9a64e27b5.png)![](http://sedn.egret.com/asset/20151224/567b9a65123e0.png)
### particle效果
![](http://sedn.egret.com/asset/20151224/567b9a65439fa.png)


### 如何运行

* 下载 Egret 3D 项目,确认您拥有以下项目文件夹

```
|--Egret3D
|--Sample
|--script
|--3Dmax-Export-tool
|--package.json
|--README.md


```

##### 使用 Egret Wing
###### Egret 3D 示例创建

###### 准备文件
* 1.	egret engine 安装 下载：http://www.egret.com/egretengine 最新的引擎
* 2.	egret wing 安装 下载：http://www.egret.com/egretwing 最新工具
* 3.	egret engine 3D sample-wing 下载: https://github.com/egret-labs/egret-3d

###### 使用步骤：
1.	打开安装好的wing 导入 准备文件中的第三步的 egret engine 3D  sample-wing文件夹 例如("E:\git_egret3D\HummingBird\egret-3d\Sample-wing");
 
2.	编译运行，如果遇到编译无反应，可以关闭项目再开一次
3.	继续编译运行。
4.	Main 文件有多个示例的应用，打开注释就可以


##### 使用终端或其他开发工具
##### Egret3D编译
###### 方法一
*1.		安装node.js
*2.		下载Egret3D: https://github.com/egret-labs/egret-3d
*3.		在Egret3D目录下打开控制台，执行```tsc```.成功后会生成egret3d.js和egret3d.d.ts在当前目录下，这两个文件就是编译好的引擎代码，可以Egret-Wing使用引擎了。

###### 方法二
*1.		安装VisulaStudio2013
*2.		下载Egret3D: https://github.com/egret-labs/egret-3d
*3.		用VS创建一个新的TypeScript应用程序。
*4.		把下载的Egret3D目录复制到和index.html的同级目录,并在VS把目录包含在项目中。
*5.		点击项目属性--TypeScript生成--Redirect JavaScript output to directory: ./js
*6.		设置好js的输出目录后就可以直接F7生成当前项目。
*7.		在index.html中导入js/egret3d/Egret3DEngine.js这个文件。
*8.		然后在入口处执行egret3d.Egret3DEngine.preload(oncallback)，如果所有js加载成功 ，就会调用oncallback这个回调，然后就可以在这个回调中实现你的逻辑了。如果加载失败就有可能是tsconfig.json这个文件没有加载到。解决方法是在web.config中加上.json这个文件扩展。




### 简单示例代码

```
var cubeGeometry:egret3d.CubeGeometry = new egret3d.CubeGeometry(50, 50, 50);
var textureMaterial:egret3d.TextureMaterial = new egret3d.TextureMaterial();
var mesh:egret3d.Mesh = new egret3d.Mesh( cubeGeometry,textureMaterial );

```


### 路线图

##### 在下个版本中,我们专注解决以下问题

* 添加 3D 粒子系统
* 特效动画系统
