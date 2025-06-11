 import { createMachine, assign, fromPromise } from 'xstate';

import { fetchCountries } from "../Utils/api";

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      invoke: { //forma de invocar a un servicio
        id: 'getCountries',
        src:  fromPromise(fetchCountries),
        onDone: { 
          target: 'success',
          actions: assign({
            countries: ({_, event}) =>  event.output,
          })
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: ({_, event}) => event.error,
          })
        }
      }
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: "loading" },
      },
    },
  },
};

const bookingMachine = createMachine({
    id: "buy",
    initial: "inicial",
    context:{
      passengers: [],
      selectedCountry: '',
      countries: [],
      error: '',
    },
    states: {
      inicial: {
        on:{
          START: {
            target: "search",
            // actions: 'imprimirInicio',
          },
        },
        /* configuration */
      },
      search: {
        // entry: 'imprimirEntrada',
        // exit: 'imprimirSalida',
        on:{
          CONTINUE:{
            target:"passengers",
            actions: assign({
              selectedCountry: ({context, event}) =>{ console.log(context);
              return event.selectedCountry}
            }),
          },
          CANCEL: {
            target:"inicial",
            actions: assign(
              ({context,event}) =>{
                context.selectedCountry = '';
                context.passengers = []
                console.log(context)
              })
          }
        },
        ...fillCountries,

      },
      passengers: {
        on:{
          DONE:{
            target:"tickets",
            guard: "moreThanOnePassenger",

          },
          
          CANCEL:{
            target:"inicial",
            actions: 'reiniciarContext',
            
            // assign(
            //   ({context,event}) =>{
            //     context.selectedCountry = '';
            //     context.passengers = []
            //     console.log(context)
            //   })
          },
          ADD:{
            target: 'passengers',
            actions: assign(
              ({context, event}) => {context.passengers.push(event.newPassenger); console.log("contexto",context)}
            ),

          }
        }
      },
      tickets: {
        after:{
          5000:{
            target:'inicial',
            actions: 'reiniciarContext'
          }
        },
        on:{
          FINISH: {
            target:"inicial",
            actions: 'reiniciarContext',
          },
        }
      },

      // Otros estados aquí
    },
  },{
    
    actions:{
      imprimirInicio (){ console.log('Imprimir inicio')},
      imprimirEntrada (){ console.log('Imprimir Entrada del Search')},
      imprimirSalida (){ console.log('Imprimir Salida del Search')},
      reiniciarContext: assign(
              {
                selectedCountry : '',
                passengers : [],
                
              })
    },
    guards:{
      moreThanOnePassenger: ({context,event}) => {console.log(context); return context.passengers?.length > 0},
    },
  }
);

export  { bookingMachine, fillCountries };