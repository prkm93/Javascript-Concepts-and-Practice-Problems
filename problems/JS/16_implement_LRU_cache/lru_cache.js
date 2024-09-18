class LRUCache {
  constructor(maxCacheSize = 3) {
    this.cache = new Map();
    this.maxCacheSize = maxCacheSize;
  }

  addEntry(key, val) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size === this.maxCacheSize) {
      this.cache.delete(this.first());
    }

    this.cache.set(key, val);
  }

  first() {
    return this.cache.keys().next().value;
  }

  removeEntry(key) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else {
      throw new Error("Key to be deleted not found");
    }
  }

  getEntry(key) {
    let item = this.cache.get(key);
    if (item) {
      this.cache.delete(key);
      this.cache.set(key, item);
    }
    return item;
  }
}

const createCache = new LRUCache();

createCache.addEntry("a", 10);
createCache.addEntry("b", 20);
createCache.addEntry("c", 30);
console.log("before", createCache.cache);

createCache.getEntry("b");
console.log("After accessing b", createCache.cache);
createCache.addEntry("d", 40);
console.log("After adding ", createCache.cache);

createCache.getEntry("c");
console.log("After accessing c", createCache.cache);

createCache.getEntry("c");
