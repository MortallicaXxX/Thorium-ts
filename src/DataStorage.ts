import { Engine } from "./Engine";

export namespace DataStorage {
  interface DBError {
    code: number;
    message: string;
  }

  class KeyGen {
    #guidKeys: object = {};

    /** @{desc} Chargement des keys de la collection */
    Load(storage: any) {
      const _this: any = this;
      Object.keys(storage).forEach(function (key) {
        _this.#guidKeys[key] = key;
      });
    }

    Hash32(str: string): string {
      let hash: number = 0;
      if (str.length == 0) return String(hash);
      for (const i of Array.from({ length: str.length }, (x, i) => i)) {
        var char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return String(hash);
    }

    Hash53(str: string, seed: number = 0): string {
      let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
      for (const i of Array.from({ length: str.length }, (x, i) => i)) {
        let ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
      }
      h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
        Math.imul(h2 ^ (h2 >>> 13), 3266489909);
      h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
        Math.imul(h1 ^ (h1 >>> 13), 3266489909);
      return String(4294967296 * (2097151 & h2) + (h1 >>> 0));
    }

    guid(): string {
      let guid = this.Hash53(`guid_${Math.round(Math.random() * 100000000)}`);
      if (!this.#guidKeys[guid]) return guid;
      else return this.guid();
    }
  }

  class Collection {
    collectionName: string;
    #storage: any;
    #keyGen: KeyGen = new KeyGen();

    constructor(storage, collection) {
      this.#storage = storage;
      this.collectionName = collection;
      if (this.collectionName in this.#storage) {
        this.#keyGen.Load(this.#storageExist());
      }
    }

    #storageExist(): object[] {
      if (!this.#storage[this.collectionName]) {
        this.#storage.setItem(this.collectionName, JSON.stringify({}));
        return JSON.parse(this.#storage[this.collectionName]);
      } else return JSON.parse(this.#storage[this.collectionName]);
    }

    #guid(): string {
      return this.#keyGen.guid();
    }

    /** @{desc} Permet insert de document dans une collection de localStorage */
    async Insert(
      object: object,
      callback?: (error: DBError | null, result: object | null) => void,
    ) {
      const storage: any = this.#storageExist();
      const guid = this.#guid().toString();

      if (!storage[guid]) {
        storage[guid] = Object.assign({}, { _id: guid }, object);
        this.#storage.setItem(this.collectionName, JSON.stringify(storage));
        if (callback) callback(null, storage[guid]);
      } else {
        if (callback) {
          callback({ code: 1, message: `${guid} existe déjà` }, storage[guid]);
        }
      }
    }

    /** @{desc} Permet find de document dans une collection de localStorage */
    async Find(filter: any, callback?: (results: any) => void) {
      /** @{desc} Permet de comparer deux object et retourne true / false */
      function CompareObjects(filter: object, source: object): boolean {
        const filterKeys = Object.keys(filter);
        const filterValues = Object.values(filter);
        const sourceKeys = Object.keys(source);
        const sourceValues = Object.values(source);

        return !Array.from(filterKeys, function (filterKey: string, i: number) {
          if (filterKey in source) {
            return CompareValue(filter[filterKey], source[filterKey]);
          } else return false;
        }).includes(false);
      }

      /** @{desc} Permet de comparer deux valeurs au seins d un object et retourne true / false */
      function CompareValue(filterValue: any, sourceValue: any): boolean {
        if (
          typeof filterValue == "object" && Array.isArray(filterValue) == false
        ) {
          return CompareObjects(filterValue, sourceValue);
        } else return (filterValue == sourceValue ? true : false);
      }

      const storage = this.#storageExist();
      const results = Array.from(
        Object.values(storage),
        function (data: any, iterator: number) {
          if (CompareObjects(filter, data) == true) return data;
        },
      ).filter((x, i) => x);
      if (callback) callback(results);
      return results;
    }

    /** @{desc} Permet Update de document dans une collection de localStorage */
    Update(filter: any, newDocument: any, callback?: (result: any) => void) {
      const _this: Collection = this;
      const storage = this.#storageExist();
      return new Promise(function (next) {
        _this.Find(filter, function (result) {
          storage[result[0]._id] = Object.assign(result[0], newDocument);
          _this.#storage.setItem(_this.collectionName, JSON.stringify(storage));
          if (callback) next(callback(storage[result[0]._id]));
          else next(storage[result[0]._id]);
        });
      });
    }

    /** @{desc} Permet Delete de document dans une collection de localStorage */
    Delete(filter: any, callback?: (result: any) => void) {
      const _this: Collection = this;
      const storage = this.#storageExist();
      return new Promise(function (next) {
        _this.Find(filter, function (result) {
          delete storage[result[0]._id];
          _this.#storage.setItem(_this.collectionName, JSON.stringify(storage));
          if (callback) {
            next(
              result[0]._id in storage ? { result: false } : { result: true },
            );
          } else {
            next(
              result[0]._id in storage ? { result: false } : { result: true },
            );
          }
        });
      });
    }

    /** @{desc} Permet Dump la collection de localStorage */
    Dump() {
      this.#storage.clear();
    }
  }

  export class DB {
    #storage: Storage = window.localStorage;
    engine: Engine;

    constructor(engine: Engine) {
      this.engine = engine;
    }

    Collection(collection: string) {
      return new Collection(this.#storage, collection);
    }

    CollectionList(): string[] {
      return Object.keys(this.#storage);
    }
  }
}
