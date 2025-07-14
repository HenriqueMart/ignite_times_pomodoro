import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton} from "./style";
import { FormProvider, useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod' // Permitindo exportar tudo da biblioteca
import {  useContext } from "react";
import { CountDown } from "./components/Countdown";
import { CyclesContext } from "../../Contexts/CyclesContext";
import { NewCycleForm } from "./components/NewCycleForm";


const newCycleFormValidationSchema = zod.object({ //Validando objeto com esse validação nos campos
        task : zod.string()
            .min(1, 'Informe a Tarefa'),
        minuteAmount: zod.
            number()
            .min(1, "O ciclo precisa ser de no Mínimo 1 minutos")
            .max(60, "O ciclo precisa ser de no Máximo 60 minutos"),
    
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema> //Esse infer -> permite criar tipagem com base em outra variável.
//<typeof> -> (TypeScript) Não podemos passar um variável do JS para TS, então convertemos om typeof. Esse função permite referenciar uma variável
//Poderiamos fazer criando na mão com interface do TS, mesma coisa. 





export function Home(){
        const {activeCycle,CreateNewCycle, InterruptCurrentCycle} = useContext(CyclesContext);
        
        

        const newCycleForm = useForm<newCycleFormData>({
            resolver: zodResolver(newCycleFormValidationSchema),
            defaultValues: {
                task: '',
                minuteAmount: 0,
            }
        })

        const {handleSubmit, watch, reset} = newCycleForm;
        const task = watch('task');
        const isSubmitDisabled = !task;

        function handleCreateNewCycle(data: newCycleFormData){
            CreateNewCycle(data);
            reset();
        }

        
    return(
         <HomeContainer>
           
           <form onSubmit={handleSubmit(handleCreateNewCycle)}>
            
                <FormProvider {...newCycleForm}>
                    <NewCycleForm/>
                </FormProvider>
                
                <CountDown/>

                {activeCycle ? (
                    <StopCountdownButton onClick={InterruptCurrentCycle}
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