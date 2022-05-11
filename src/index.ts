import { Thorium , View , Style , Prototype , UserInterface , ProtoGhost} from './core/Core';

const App = new class App extends Thorium.Components.Div{

  constructor(){
    super({
      prop : {
        id : 'app',
        text : 'Hello ts-World!'
      },
      proto : new class appProto implements ProtoGhost{
        x:string = "10";
        test = function( ){
          (this as ProtoGhost).innerHTML = (this as appProto).x;
        }
        onMouseDown = function( ){
          (this as appProto).test();
        }
      }
    })
  }
}

const AppView = class AppView extends View.View{

  constructor(){
    super(App);
  }

}

Thorium.Vue(AppView).Show();
