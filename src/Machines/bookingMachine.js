 import { createMachine, assign } from 'xstate';

import { fetchCountries } from "../Utils/api";

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      invoke: { //forma de invocar a un servicio
        id: 'getCountries',
        src: () => fetchCountries,
        onDone: { 
          target: 'success',
          actions: assign({
            countries: (context, event) => event.data,
          })
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: 'Fallo el request',
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
            selectedCountry: ({context, event}) => 
            event.selectedCountry
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
        DONE:"tickets",
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
  }
}
);

export  { bookingMachine, fillCountries };