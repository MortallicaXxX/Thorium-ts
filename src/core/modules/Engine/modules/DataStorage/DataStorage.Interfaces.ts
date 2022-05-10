import { EngineInterface } from "../../../Engine/Engine";

export interface DBError {
  code: number;
  message: string;
}

export interface KeyGenInterface {
  Load(storage:any):void;
  Hash32(str:string):string;
  Hash53(str:string,seed:number):string
  guid():string;
}

export interface CollectionInterface{
  collectionName:string;
  Insert(object: object,callback?: (error: DBError | null, result: object | null) => void):Promise<void>;
  Find(filter: any, callback?: (results: any) => void):Promise<any[]>;
  Update(filter: any, newDocument: any, callback?: (result: any) => void):Promise<unknown>;
  Delete(filter: any, callback?: (result: any) => void):Promise<unknown>;
  Dump():void;
}

export interface DbInterface{
  engine:EngineInterface;
  Collection(collection: string):CollectionInterface;
  CollectionList():string[];
}
