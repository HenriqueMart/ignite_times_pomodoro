import { createContext, useState, useReducer, type ReactNode } from "react";
import { cyclesReducer, type Cycle} from '../reducers/cycle/reducer'
import { ActionType, addNewCycleAction, interruptCurrentCyclesAction, markCurrentCyclesAsFinishedAction } from "../reducers/cycle/actions";

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
    )

    const {cycles, activeCycleId} = cyclesState;

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);  

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId); 
    
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