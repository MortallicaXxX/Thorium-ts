import Thorium , { View , Style , Prototype , UserInterface , Controller , Components , useState} from '../';

// import NotificationsHanlder , { Notifications , simpleNotification } from '../../Thorium-Toolkit-ui/std-components/Notification/src/Notifications';

const {
  Template,
  ElementUI
} = UserInterface;

// import Icon from '../../Thorium-Toolkit-ui/std-components/Icon/src/Icon';

// const notificationContainerId = crypto.randomUUID();

// const NotificationsHanlder = new class {

//   #_notifications:Map<string,Controller> = new Map();
//   get notificationZone(){return document.querySelectorAll(`[id='${notificationContainerId}'][name=notifications]`)[0]}
//   get notificationContainer(){return this.notificationZone.querySelectorAll('[name=content]')[0]}
//   get notifications(){return this.#_notifications};

//   add(notificationTemplate):Promise<string>{
//     return new Promise((next) => {
//       const notificationId = crypto.randomUUID();
//       // const notification = (new notificationTemplate()).CreateElement(this.notificationContainer);
//       // this.notificationContainer.insertBefore(notification , this.notificationContainer.children[0]);
//       // notification.Initialise();
//       // this.#_notifications.set(notificationId , notification);
//       // next(notificationId);
//       new UserInterface.NodeUI([new notificationTemplate(notificationId)])
//       .BuildIn(this.notificationContainer)
//       .then((node) => {
//         node.Initialise();
//         this.notificationContainer.insertBefore((node.elements[0] as Element) , this.notificationContainer.children[0]);
//         this.#_notifications.set(notificationId , node.elements[0]);
//         next(notificationId);
//       })
//     })
//   }
//   delete(notificationId:string){
//     if(this.#_notifications.has(notificationId)){
//       (this.#_notifications.get(notificationId) as Element).setAttribute('deletion','true');
//     }
//   }

// }();

// interface NotificationsController extends Controller{
//   add:()=>void;
//   remove:()=>void;
// }

// type NotificationType = "simple" | "actions";

// interface NotificationOptionsInit{
//   id:string;
//   type : NotificationType;
//   line : any;
//   description?:any;
//   buttons?:any[];
// }

// const Notification = class extends Components.Div<Controller>{
//   constructor(options:NotificationOptionsInit){
//     super({
//       prop : {
//         id:options.id,
//         class : `context`,
//         name : 'notification',
//         type : options.type,
//         ':deletion':false
//       },
//       childrens : [
//         new Components.Div<Controller>({
//           prop : {
//             name : 'content'
//           },
//           childrens : (() => {
//             return [
//               new options.line(),
//               ...(options.description ? [new options.description()] : [])
//             ]
//           })(),
//         })
//       ],
//       proto : {
//         onMutation(mutation){
//           const value = this.getAttribute(mutation.attributeName);

//           if(mutation.attributeName == 'deletion'){
//               setTimeout(() => {
//                 this.remove();
//               } , 500)
//           }

//         }
//       }
//     })
//   }
// }

// class Notifications extends Components.Div<Controller>{
//   constructor(){
//     super({
//       prop : {
//         id : notificationContainerId,
//         name : 'notifications',
//         class : `${style.Notifications}`
//       },
//       childrens : [
//         new Components.Div<Controller>({
//           prop : {
//             name : 'content'
//           }
//         })
//       ]
//     })
//   }
// }

// interface simpleNotificationOptionsInit extends LineControlInitOptions{
//   description?:string;
// }

// export async function simpleNotification(options?:simpleNotificationOptionsInit){

//   const notificationId:string = await NotificationsHanlder.add(class extends Notification{
//     constructor(notifId:string){

//       // setTimeout(() => {
//       //   NotificationsHanlder.delete(notificationId);
//       // } , 6000)

//       super({
//         id : notifId,
//         type : 'simple',
//         line : class extends LineControls{
//           constructor(){
//             super({
//               text : 'notification',
//               icon : { type : 'mask' },
//               controls : [{
//                 class : `${style.NotificationClose}`,
//                 action : () => {
                  
//                 }
//               }],
//               ...(options ? options : {})
//             })
//           }
//         },
//         ...(options && options.description ? {description : class extends Components.Label<Controller>{
//           constructor(){
//             super({
//               prop : { name : 'description' , text : (options as simpleNotificationOptionsInit).description as string}
//             })
//           }
//         }} : {})
//       })
//     }
//   })

// }

// export function actionNotification(){

//   // new Notification({
//   //   type : 'simple',
//   //   line : class extends LineControls{
//   //     constructor(){
//   //       super({
//   //         text : 'Hello World',
//   //         icon : { type : 'mask' , path : 'hello' },
//   //         controls : []
//   //       })
//   //     }
//   //   },
//   //   description : class extends Components.Text<Controller>{
//   //     constructor(){
//   //       super({
//   //         text : 'Hello'
//   //       })
//   //     }
//   //   }
//   // });

// }

const App = new class App extends Components.App<Controller>{

  constructor(){
    super({
      prop : {
        id : 'app'
      },
      childrens : [
        // new Notifications()
        // new Icon({ type : 'mask' })
      ],
      proto : {
        // AfterInitialise(){

        //   setTimeout(() => {

        //     simpleNotification({
        //       text : 'hello',
        //       // icon : { type : 'mask' , path : './notification.svg' },
        //       description : crypto.randomUUID(),
        //       controls : [
        //         {
        //           // class : `${style.NotificationClose}`,
        //           class : `close`,
        //           action : (e) => {
        //             const notification = (e.target as any).context();
        //             NotificationsHanlder.delete(notification.getAttribute('id'));
        //           }
        //         }
        //       ]
        //     });

        //   } , 2000)

        // }
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
