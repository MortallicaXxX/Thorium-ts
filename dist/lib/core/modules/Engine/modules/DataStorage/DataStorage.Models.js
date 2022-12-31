"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _KeyGen_guidKeys, _Collection_instances, _Collection_storage, _Collection_keyGen, _Collection_storageExist, _Collection_guid, _DB_storage;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = exports.Collection = exports.KeyGen = void 0;
class KeyGen {
    constructor() {
        _KeyGen_guidKeys.set(this, {});
    }
    Load(storage) {
        const _this = this;
        Object.keys(storage).forEach(function (key) {
            __classPrivateFieldGet(_this, _KeyGen_guidKeys, "f")[key] = key;
        });
    }
    Hash32(str) {
        let hash = 0;
        if (str.length == 0)
            return String(hash);
        for (const i of Array.from({ length: str.length }, (x, i) => i)) {
            var char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return String(hash);
    }
    Hash53(str, seed = 0) {
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
    guid() {
        let guid = this.Hash53(`guid_${Math.round(Math.random() * 100000000)}`);
        if (!__classPrivateFieldGet(this, _KeyGen_guidKeys, "f")[guid])
            return guid;
        else
            return this.guid();
    }
}
exports.KeyGen = KeyGen;
_KeyGen_guidKeys = new WeakMap();
class Collection {
    constructor(storage, collection) {
        _Collection_instances.add(this);
        _Collection_storage.set(this, void 0);
        _Collection_keyGen.set(this, new KeyGen());
        __classPrivateFieldSet(this, _Collection_storage, storage, "f");
        this.collectionName = collection;
        if (this.collectionName in __classPrivateFieldGet(this, _Collection_storage, "f")) {
            __classPrivateFieldGet(this, _Collection_keyGen, "f").Load(__classPrivateFieldGet(this, _Collection_instances, "m", _Collection_storageExist).call(this));
        }
    }
    Insert(object, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const storage = __classPrivateFieldGet(this, _Collection_instances, "m", _Collection_storageExist).call(this);
            const guid = __classPrivateFieldGet(this, _Collection_instances, "m", _Collection_guid).call(this).toString();
            if (!storage[guid]) {
                storage[guid] = Object.assign({}, { _id: guid }, object);
                __classPrivateFieldGet(this, _Collection_storage, "f").setItem(this.collectionName, JSON.stringify(storage));
                if (callback)
                    callback(null, storage[guid]);
            }
            else {
                if (callback) {
                    callback({ code: 1, message: `${guid} existe déjà` }, storage[guid]);
                }
            }
        });
    }
    Find(filter, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            function CompareObjects(filter, source) {
                const filterKeys = Object.keys(filter);
                const filterValues = Object.values(filter);
                const sourceKeys = Object.keys(source);
                const sourceValues = Object.values(source);
                return !Array.from(filterKeys, function (filterKey, i) {
                    if (filterKey in source) {
                        return CompareValue(filter[filterKey], source[filterKey]);
                    }
                    else
                        return false;
                }).includes(false);
            }
            function CompareValue(filterValue, sourceValue) {
                if (typeof filterValue == "object" && Array.isArray(filterValue) == false) {
                    return CompareObjects(filterValue, sourceValue);
                }
                else
                    return (filterValue == sourceValue ? true : false);
            }
            const storage = __classPrivateFieldGet(this, _Collection_instances, "m", _Collection_storageExist).call(this);
            const results = Array.from(Object.values(storage), function (data, iterator) {
                if (CompareObjects(filter, data) == true)
                    return data;
            }).filter((x, i) => x);
            if (callback)
                callback(results);
            return results;
        });
    }
    Update(filter, newDocument, callback) {
        const _this = this;
        const storage = __classPrivateFieldGet(this, _Collection_instances, "m", _Collection_storageExist).call(this);
        return new Promise(function (next) {
            _this.Find(filter, function (result) {
                storage[result[0]._id] = Object.assign(result[0], newDocument);
                __classPrivateFieldGet(_this, _Collection_storage, "f").setItem(_this.collectionName, JSON.stringify(storage));
                if (callback)
                    next(callback(storage[result[0]._id]));
                else
                    next(storage[result[0]._id]);
            });
        });
    }
    Delete(filter, callback) {
        const _this = this;
        const storage = __classPrivateFieldGet(this, _Collection_instances, "m", _Collection_storageExist).call(this);
        return new Promise(function (next) {
            _this.Find(filter, function (result) {
                delete storage[result[0]._id];
                __classPrivateFieldGet(_this, _Collection_storage, "f").setItem(_this.collectionName, JSON.stringify(storage));
                if (callback) {
                    next(result[0]._id in storage ? { result: false } : { result: true });
                }
                else {
                    next(result[0]._id in storage ? { result: false } : { result: true });
                }
            });
        });
    }
    Dump() {
        __classPrivateFieldGet(this, _Collection_storage, "f").clear();
    }
}
exports.Collection = Collection;
_Collection_storage = new WeakMap(), _Collection_keyGen = new WeakMap(), _Collection_instances = new WeakSet(), _Collection_storageExist = function _Collection_storageExist() {
    if (!__classPrivateFieldGet(this, _Collection_storage, "f")[this.collectionName]) {
        __classPrivateFieldGet(this, _Collection_storage, "f").setItem(this.collectionName, JSON.stringify({}));
        return JSON.parse(__classPrivateFieldGet(this, _Collection_storage, "f")[this.collectionName]);
    }
    else
        return JSON.parse(__classPrivateFieldGet(this, _Collection_storage, "f")[this.collectionName]);
}, _Collection_guid = function _Collection_guid() {
    return __classPrivateFieldGet(this, _Collection_keyGen, "f").guid();
};
class DB {
    constructor(engine) {
        _DB_storage.set(this, window.localStorage);
        this.engine = engine;
    }
    Collection(collection) {
        return new Collection(__classPrivateFieldGet(this, _DB_storage, "f"), collection);
    }
    CollectionList() {
        return Object.keys(__classPrivateFieldGet(this, _DB_storage, "f"));
    }
}
exports.DB = DB;
_DB_storage = new WeakMap();
//# sourceMappingURL=DataStorage.Models.js.map