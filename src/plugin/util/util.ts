import dateFormat from "../feature/DateFormatter";

const sessionStorage = window.sessionStorage;

export function setItem(key: string, value: any) {
    if (!key) {
        throw new Error("cache key cannot be null");
    }
    if (sessionStorage) {
        sessionStorage.setItem(key, JSON.stringify(value));
    } else {
        return null;
    }
}

export function getItem(key: string): any {
    if (!key) {
        throw new Error("cannot get data from null key");
    }
    if (sessionStorage) {
        const data = sessionStorage.getItem(key);
        return data ? JSON.parse(data) : data;
    } else {
        return null;
    }
}

export function clearStorage() {
    if (sessionStorage) {
        sessionStorage.clear();
    }
}

export function getSimpleDate(date: Date | number) {
    return dateFormat(date, "yyyy-MM-dd");
}

export function getFullDate(date: Date | number) {
    return dateFormat(date, "yyyy-MM-dd HH:mm:ss");
}

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
export function generateTree(data: any[], parentNodeKey: string, mapCache: any = {}, idKey = "id", parentKey = "parent", childrenKey = "children") {
    const result: any[] = [];
    data.forEach((item) => {
        mapCache[item[idKey]] = item;
    });
    data.forEach((item) => {
        const cacheParentKey = item[parentKey];
        if (cacheParentKey) {
            if (mapCache[cacheParentKey]) {
                if (!mapCache[cacheParentKey][childrenKey]) {
                    mapCache[cacheParentKey][childrenKey] = [];
                }
                mapCache[cacheParentKey][childrenKey].push(item);
                if (parentNodeKey) {
                    item[parentNodeKey] = mapCache[cacheParentKey];
                }
            } else { // 如果当前节点的父节点id未找到指定对象，则当前对象作为根节点的自己节点
                result.push(item);
            }
        } else {
            result.push(item);
        }
    });
    return result;
}

/**
 * 根据对象的parentNode 获得 节点 path
 * @param data 树节点对象数据，需包含 父节点 对象 属性，{@link generateTree}方法第三个参数的结果
 * @param fromId 开始位置 id
 * @param pushId 返回结果值，默认为 id
 * @param parentNode 父节点属性 key
 * @return Array path 数组
 */
export function getTreePath(data: any, fromId: string, pushId = "id", parentNode = "parentNode") {
    const pathArr = [];
    let parent = data[fromId];
    while (parent) {
        pathArr.push(parent[pushId]);
        parent = parent[parentNode];
    }
    return pathArr.reverse();
}

/**
 * 设置当前节点及子节点 某个属性
 * @param current 当前节点对象
 * @param propKey 需设置的属性key
 * @param propValue 需设置的属性值
 * @param childrenNode 子节点属性key，默认为children
 */
export function setCurrentAndChildProp(current: any, propKey: string, propValue: any, childrenNode = "children") {
    const childArr: any[] = [];
    current[propKey] = propValue;
    if (current[childrenNode]) {
        current[childrenNode].forEach((item: any) => {
            childArr.push(item);
        });
    }
    while (childArr.length > 0) {
        const childItem = childArr.pop();
        childItem[propKey] = propValue;
        if (childItem[childrenNode]) {
            childItem[childrenNode].forEach((item: any) => {
                childArr.push(item);
            });
        }
    }
}

/**
 * 获得当前节点及子节点的某个属性，并返回数组
 * @param current 当前节点
 * @param propKey 获取的属性key
 * @param childrenNode 子节点属性key，默认为 children
 * @return Array 属性列表
 */
export function getCurrentAndChildProp(current: any, propKey: string, childrenNode = "children") {
    const result: any[] = [];
    if (current[propKey]) {
        result.push(current[propKey]);
    }
    const childArr: any[] = [...current[childrenNode]];
    let childItem = childArr.shift();
    while (childItem) {
        if (childItem[propKey]) {
            result.push(childItem[propKey]);
        }
        if (childItem[childrenNode]) {
            childItem[childrenNode].forEach((item: any) => {
                childArr.push(item);
            });
        }
        childItem = childArr.shift();
    }
    return result;
}

export {
    dateFormat,
};
