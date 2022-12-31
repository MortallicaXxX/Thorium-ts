import { EngineInterface } from "../../../Engine/Engine";
import { DBError, KeyGenInterface, CollectionInterface, DbInterface } from "./DataStorage.Interfaces";
export { DBError, KeyGenInterface, CollectionInterface, DbInterface };
export declare class KeyGen implements KeyGenInterface {
    #private;
    Load(storage: any): void;
    Hash32(str: string): string;
    Hash53(str: string, seed?: number): string;
    guid(): string;
}
export declare class Collection implements CollectionInterface {
    #private;
    collectionName: string;
    constructor(storage: any, collection: any);
    Insert(object: object, callback?: (error: DBError | null, result: object | null) => void): Promise<void>;
    Find(filter: any, callback?: (results: any) => void): Promise<any[]>;
    Update(filter: any, newDocument: any, callback?: (result: any) => void): Promise<unknown>;
    Delete(filter: any, callback?: (result: any) => void): Promise<unknown>;
    Dump(): void;
}
export declare class DB implements DbInterface {
    #private;
    engine: EngineInterface;
    constructor(engine: EngineInterface);
    Collection(collection: string): Collection;
    CollectionList(): string[];
}
