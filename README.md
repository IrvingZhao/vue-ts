## static-new
> 项目基于vue-cli 3.x构建

### 分支说明
1. `master`：主分支，存放全部feature代码
2. `plugin`：插件分支，存放公共插件代码
3. `platform`：开发平台分支，存放开发平台基础设置，如：路由、store、api等
4. `dev`：开发基础分支
5. `base`：新的feature开始位置，存放组件库、依赖、结构调整等内容
6. `featureXX`：根据业务、特定需求存放不同的代码块，彼此间无互相依赖
7. `prodXX`：存放XX特性下的依赖固定组件的发布版

### 执行脚本说明

#### 安装

```
yarn install
```

#### 开发启动

```
yarn run serve
```

#### 编译

```
yarn run build
```

语法检查

```
yarn run lint
```

#### 清里缓存

```
yarn run clean
```

### 使用说明

> 各个业务代码模块需在`src`目录下建立各自业务独立目录，并编写主路由对象。
>
> 各个模块如需使用store，需调用`store.registerModule`/`store.unregisterModule`独立管理store信息
>
> 各个模块需在各自主主目录下新建`index.ts`并`export`路由主对象配置信息，以供框架加载使用
