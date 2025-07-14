import { createContext, useState, useReducer, type ReactNode, useEffect } from "react";
import { cyclesReducer, type Cycle} from '../reducers/cycle/reducer'
import { ActionType, addNewCycleAction, interruptCurrentCyclesAction, markCurrentCyclesAsFinishedAction } from "../reducers/cycle/actions";
import { differenceInSeconds } from "date-fns";

interface CreateCycleData{
    task: string
    minuteAmount: number
}


interface CyclesContextType{
    cycles: Cycle[],
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCyclesAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
    CreateNewCycle: (data: CreateCycleData) => void
    InterruptCurrentCycle: () => void
}

interface cyclesState{
    cycles: Cycle[]
    activeCycleId: string | null;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps{
    children: ReactNode //Tudo que for escrito pelo html é válido dentro do component
}
          
    
const initialState: cyclesState = {
    cycles: [],
    activeCycleId: null,
}
    export function CyclesContextProvider( {children}: CyclesContextProviderProps){ //childres do React quando estamos passando um component dentro dele
        const [cyclesState, dispatch] = useReducer(cyclesReducer,
        initialState
    ,  () => {
        const storedStateAsJson =localStorage.getItem('@ignite-timer:cycles-state-1.0.0');

        if(storedStateAsJson){
            return JSON.parse(storedStateAsJson);
        }

        return initialState
    })

    const {cycles, activeCycleId} = cyclesState;
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId); 

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if(activeCycle){
            return differenceInSeconds(
            new Date(), new Date(activeCycle.startDate));
        }
        
        

        return 0
    });  

    //Salvando os dados no navegador 
    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)

        localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
    }, [cyclesState])

    
    
    function markCurrentCyclesAsFinished(){
            dispatch(markCurrentCyclesAsFinishedAction())
        
        /*setCycle(state => 
                state.map((cycle) => {
                if(cycle.id == activeCycleId){
                    return { ...cycle, finishedDate: new Date() }
                }else{
                    return cycle;
                }
            })
            )*/
    }

    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds);
    }

    function CreateNewCycle(data: CreateCycleData){  //uncontrolled e Controlled
            const id = String(new Date().getTime()); //Utilizando minissegundo para id

            const newCycle: Cycle = {
                id,
                task: data.task,
                minuteAmount: data.minuteAmount,
                startDate: new Date(),
            }

            dispatch(addNewCycleAction(newCycle))

            //setCycle((state) => [...state, newCycle]); // Sempre que o status dependeno do valor anterior, usar Arrow Function
            setAmountSecondsPassed(0);

        
        }

        function InterruptCurrentCycle(){

                dispatch(interruptCurrentCyclesAction())
            }


        return (
            <CyclesContext.Provider value={{
            cycles,    
            activeCycle,
            activeCycleId, 
            markCurrentCyclesAsFinished, 
            amountSecondsPassed, 
            setSecondsPassed,
            CreateNewCycle,
            InterruptCurrentCycle
            }}>
            {children}
            </CyclesContext.Provider>
        )
    }