import { createContext, useState, type ReactNode } from "react";

interface CreateCycleData{
    task: string
    minuteAmount: number
}

interface Cycle{
    id: string
    task: string
    minuteAmount: number 
    startDate: Date
    interruptDate?: Date
    finishedDate?: Date
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

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps{
    children: ReactNode //Tudo que for escrito pelo html é válido dentro do component
}
          
    

    export function CyclesContextProvider( {children}: CyclesContextProviderProps){ //childres do React quando estamos passando um component dentro dele
        const [cycles, setCycle] = useState<Cycle[]>([]);
        const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
        const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);  

        const activeCycle = cycles.find(cycle => cycle.id === activeCycleId); 
        
        function markCurrentCyclesAsFinished(){
                setCycle(state => 
                    state.map((cycle) => {
                    if(cycle.id == activeCycleId){
                        return { ...cycle, finishedDate: new Date() }
                    }else{
                        return cycle;
                    }
                })
                )
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

                setCycle((state) => [...state, newCycle]); // Sempre que o status dependeno do valor anterior, usar Arrow Function
                setActiveCycleId(id);
                setAmountSecondsPassed(0);

           
            }

        function InterruptCurrentCycle(){

                setCycle(state => 
                    state.map((cycle) => {
                        if(cycle.id == activeCycleId){
                            
                            return { ...cycle, interruptDate: new Date() }
                        }else{
                            return cycle;
                        }
                    })
                );
                setActiveCycleId(null);
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