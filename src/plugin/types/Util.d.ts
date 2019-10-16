declare interface UtilInstance {
    /**
     * 向缓存中添加数据
     * @param key 数据key
     * @param value 数据对象
     * */
    setItem(key: string, value: any): void;

    /**
     * 从缓存中获取数据
     * @param key 存放数据时的数据key
     * @return 数据对象，未找到数据时，返回null
     * */
    getItem(key: string): any;

    /**
     * 清空缓存
     * */
    clearStorage(): void;

    /**
     * 简单日期格式化
     * @param date 时间对象或时间戳
     * @return yyyy-MM-dd 格式化结果
     * */
    getSimpleDate(date: Date | number): string;

    /**
     * 日期时间格式化
     * @param date 时间对象或时间戳
     * @return yyyy-MM-dd HH:mm:ss 格式化结果
     * */
    getFullDate(date: Date | number): string;

    /**
     * 根据列表生成树型结构
     * @param data 数组数据
     * @param parentNodeKey 当前节点的父节点对象的属性key，undefined,null,"" 则不设置父节点属性
     * @param mapCache 数组转map对象，生成树节点时，可同时，将列表数据放入map中
     * @param idKey 对象id属性key 默认为 id
     * @param parentKey 对象父节点id属性key，默认为 parent
     * @param childrenKey 子节点属性key，默认为 children
     * @return Array 树型数据
     */
    generateTree(data: any[], parentNodeKey: string, mapCache?: any, idKey?: string, parentKey?: string, childrenKey?: string): any[];

    /**
     * 根据对象的parentNode 获得 节点 path
     * @param data 树节点对象数据，需包含 父节点 对象 属性，{@link generateTree}方法第三个参数的结果
     * @param fromId 开始位置 id
     * @param pushId 返回结果值，默认为 id
     * @param parentNode 父节点属性 key
     * @return Array path 数组
     */
    getTreePath(data: any, fromId: string, pushId?: string, parentNode?: string): any[];

    /**
     * 设置当前节点及子节点 某个属性
     * @param current 当前节点对象
     * @param propKey 需设置的属性key
     * @param propValue 需设置的属性值
     * @param childrenNode 子节点属性key，默认为children
     */
    setCurrentAndChildProp(current: any, propKey: string, propValue: any, childrenNode?: string): void;

    /**
     * 获得当前节点及子节点的某个属性，并返回数组
     * @param current 当前节点
     * @param propKey 获取的属性key
     * @param childrenNode 子节点属性key，默认为 children
     * @return Array 属性列表
     */
    getCurrentAndChildProp(current: any, propKey: string, childrenNode?: string): any[];

    /**
     * 时间格式化
     * @param date 时间对象或时间戳
     * @param pattern 格式化参数，目前支持，Y 年，M 月，d 日，H 24小时时间，m 分，s 秒，S 毫秒
     * */
    dateFormat(date: Date | number, pattern: string): string;

}
