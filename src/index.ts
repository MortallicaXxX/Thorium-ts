import { ThoriumWindow , Thorium , View , Style , Variable } from './core/Core';

(function(w:ThoriumWindow):void{
  w.thorium = Thorium;
  w.Var = function(value:any,options?:any){return new Variable(value,options)}
  w.Style = Style;
  w.View = View;
})(window as ThoriumWindow);
