export default class Cache {
  /**
   * 用于缓存数据
   */
  private cache: any = {};

  getCache(name: string) {
    return this.cache[name];
  }

  setCache<T>(name: string, value: T): T {
    return (this.cache[name] = value);
  }

  hasCache(name: string) {
    return typeof this.cache[name] !== "undefined";
  }

  getOrSetCache(name: string, runBackSync: () => any): any {
    if (this.hasCache(name)) {
      return this.getCache(name);
    }
    return this.setCache(name, runBackSync());
  }
}
