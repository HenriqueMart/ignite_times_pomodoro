import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaksInput } from "./style";
import { useForm } from 'react-hook-form'

export function Home(){
       const { register, handleSubmit, watch} = useForm();

        function handleCreateNewCycle(data: any){  //uncontrolled 
           console.log(data)

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
                        id="minutesAmount"
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