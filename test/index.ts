import Thorium , { View , Style , Prototype , UserInterface , Controller , Components , useState} from '../src/index';

console.warn(document.readyState);

const clock = new class Clock extends Components.Div<Controller>{
  constructor(){

    /// Définission des différents variables qui vont être utiliser dans cette exemple
      /// loaded représente l'état de chargement du component, définis à false au début
    const [loaded,setloaded] = useState<boolean>(false);
      /// timer est la valeur du temps actuel dans ce format hh:mm:ss
    const [timer,setTimer] = useState<string>('');

    super({
      prop : {
        name : 'clock',
        class : 'clock',
        /// définission d'attributs mutants, càd qu'il serront observée
        ':loaded' : loaded.value,
        ':timer' : timer.value,
      },
      proto : {
        /// callback de la détection de mutations
        onMutation : function(mutation){

          const {
            attributeName:name
          } = mutation;

          /// Si le chargement est finis et que le nom de la mutation est 'timer',
          /// on affiche la valeur de timer dans la clock
          if(loaded.value && name == 'timer')this.innerHTML = `<p>${timer.value}</p>`;

        },
        AfterInitialise(){

          /// Pour simuler un chargement, un delais de 1s exécute
          /// le passage de l'attribut loaded à true.
          setTimeout(() => {
            this.setAttribute('loaded' , setloaded(true));
          } , 1000)

          /// Pour simuler une update toute les 1s de la clock,
          /// un interval va exécuter le changement de temps
          setInterval(() => {
            const date = new Date();
            this.setAttribute('timer' , setTimer(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`));
          } , 1000);

        }
      }
    })
  }
}()

const clickMe = new class extends Components.Button<Controller>{
  constructor(){

    /// count 
    const [count,addCount] = useState<number>(0);

    super({
      prop : {
        name : 'clickMe',
        class : 'clickMe',
        ':count' : count.value,
        text : 'click'
      },
      proto : {
        onMutation(mutation){
          if(mutation.attributeName == 'count')this.innerText = count.value;
        },
        onMouseDown(){
          this.setAttribute('count' , addCount(count.value + 1));
        }
      }
    })
  }
}

const sampleContainer = new class extends Components.Container<Controller>{
  constructor(){
    super({
      prop : {class : 'sampleContainer'},
      childrens : [clock,clickMe]
    })
  }
}

const App = new class App extends Components.App<Controller>{

  constructor(){
    super({
      prop : {
        id : 'app'
      },
      childrens : [sampleContainer],
      proto : {
        BeforeInitialise(){
          console.timeLog('appInit');
          console.warn('BeforeInitialise',document.readyState);
        },
        AfterInitialise(){
          console.timeEnd('appInit');
          console.warn('BeforeInitialise',document.readyState);
        }
      }
    })
  }

}

const AppView = class AppView extends View.View{

  constructor(){
    super(App as any);
  }

}

Thorium.Vue(AppView).Show();
