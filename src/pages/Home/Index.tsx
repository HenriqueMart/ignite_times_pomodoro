import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton} from "./style";
import { FormProvider, useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod' // Permitindo exportar tudo da biblioteca
import { createContext, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/Countdown";




type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema> //Esse infer -> permite criar tipagem com base em outra variável.
//<typeof> -> (TypeScript) Não podemos passar um variável do JS para TS, então convertemos om typeof. Esse função permite referenciar uma variável
//Poderiamos fazer criando na mão com interface do TS, mesma coisa. 

interface Cycle{
    id: string
    task: string
    minuteAmount: number 
    startDate: Date
    interruptDate?: Date
    finishedDate?: Date
}

interface CyclesContextType{
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCyclesAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
}

const newCycleFormValidationSchema = zod.object({ //Validando objeto com esse validação nos campos
        task : zod.string()
            .min(1, 'Informe a Tarefa'),
        minuteAmount: zod.
            number()
            .min(1, "O ciclo precisa ser de no Mínimo 5 minutos")
            .max(60, "O ciclo precisa ser de no Máximo 60 minutos"),
    
})

export const CyclesContext = createContext({} as CyclesContextType);

export function Home(){
        const [cycles, setCycle] = useState<Cycle[]>([]);
        const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
        const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
        

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

       const newCycleForm = useForm<newCycleFormData>({
               resolver: zodResolver(newCycleFormValidationSchema), //Passando a validação dos objetos para o formulário
               defaultValues: { // Passando como objeto os atributos que suas variável iniciadas com esses valores
                   task: '',
                   minuteAmount: 0,
               }
           });
        
        const {  handleSubmit, watch, reset} = newCycleForm;


        function handleCreateNewCycle(data: newCycleFormData){  //uncontrolled e Controlled
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

            reset(); //Voltando para os valores originais, mas só volta para o valor definido no defaultValues
        }

        function HandleInterruptCycle(){

            

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

        const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);  

        const task = watch('task');
        const isSubmitDisabled = !task;

        
    return(
         <HomeContainer>
           
           <form onSubmit={handleSubmit(handleCreateNewCycle)}>

            <CyclesContext.Provider value={{activeCycle, activeCycleId, markCurrentCyclesAsFinished, amountSecondsPassed, setSecondsPassed}}>
                <FormProvider {...newCycleForm}>
                    <NewCycleForm/>
                </FormProvider>
                
                <CountDown/>
            </CyclesContext.Provider>

                {activeCycle ? (
                    <StopCountdownButton onClick={HandleInterruptCycle}
                        type="button">
                           <HandPalm size={24}/> 
                            Interroper
                    </StopCountdownButton>
                ): (
                    <StartCountdownButton 
                        disabled={isSubmitDisabled} 
                        type="submit">
                        <Play size={24}/>   
                            Começar
                    </StartCountdownButton>
                )
                
                
                }
                
            </form>
        </HomeContainer>
    )
}