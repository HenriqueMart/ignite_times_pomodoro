import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton} from "./style";
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod' // Permitindo exportar tudo da biblioteca
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns" //Comparar secondos
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

export function Home(){
        const [cycles, setCycle] = useState<Cycle[]>([]);
        const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
        

       

        

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

        const allSeconds = activeCycle ? activeCycle.minuteAmount * 60 : 0;
        const currentSeconds = activeCycle ? allSeconds - amountSecondsPassed : 0;
        const minutesAmount = Math.floor(currentSeconds / 60); //Arredondamento para baixo
        const secondsAmount = currentSeconds % 60;

        const minutes = String(minutesAmount).padStart(2, '0'); //Caso seja 1 cada decimail, coloca o zero na frente
        const seconds = String(secondsAmount).padStart(2, '0');
        
        const disable = !!activeCycle; //Convertendo para Boolean

        useEffect(() => {
            if(activeCycle){
                document.title = `${minutes}:${seconds}`
            }
            }, [minutes, seconds])
            

        const task = watch('task');
        const isSubmitDisabled = !task;

        
    return(
         <HomeContainer>
           
           <form onSubmit={handleSubmit(handleCreateNewCycle)}>


           </form>

            <NewCycleForm/>
            <CountDown activeCycle={activeCycle} setCycle={setCycle} activeCycleId={activeCycleId}/>


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