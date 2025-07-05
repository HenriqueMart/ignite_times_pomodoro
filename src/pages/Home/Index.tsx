import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaksInput } from "./style";
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod' // Permitindo exportar tudo da biblioteca


const newCycleFormValidationSchema = zod.object({ //Validando objeto com esse validação nos campos
    task : zod.string()
        .min(1, 'Informe a Tarefa'),
    minuteAmount: zod.
        number()
        .min(5, "O ciclo precisa ser de no Mínimo 5 minutos")
        .max(60, "O ciclo precisa ser de no Máximo 60 minutos"),

})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema> //Esse infer -> permite criar tipagem com base em outra variável.
//<typeof> -> (TypeScript) Não podemos passar um variável do JS para TS, então convertemos om typeof. Esse função permite referenciar uma variável
//Poderiamos fazer criando na mão com interface do TS, mesma coisa. 

export function Home(){
       const { register, handleSubmit, watch, reset} = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema), //Passando a validação dos objetos para o formulário
        defaultValues: { // Passando como objeto os atributos que suas variável iniciadas com esses valores
            task: '',
            minuteAmount: 0,
        }
    });

        function handleCreateNewCycle(data: newCycleFormData){  //uncontrolled e Controlled
           console.log(data);
           reset(); //Voltando para os valores originais, mas só volta para o valor definido no defaultValues
        }

        const task = watch('task');
        const isSubmitDisabled = !task;

    return(
         <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>
                    <label id="task">Vou trabalhar em</label>
                    <TaksInput 
                        placeholder="Dê um nome para seu projeto" 
                        id="task" 
                        type="text" 
                        list="task-suggestion"
                        {...register('task')}
                        />

                        <datalist id="task-suggestion"> 
                            <option value="Projeto 1"/>
                            <option value="Projeto 2"/>
                            <option value="Faculdade"/>
                        </datalist>

                    <label>Durante</label>
                    <MinutesAmountInput 
                        placeholder="00" 
                        type="number" 
                        id="minuteAmount"
                        step={5}
                        min={0}
                        max={60}
                        {...register('minuteAmount', {valueAsNumber:true})}/>

                    <span>Minutos.</span>
                </FormContainer>

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton disabled={isSubmitDisabled} type="submit">Começar
                    <Play size={24}/>
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}