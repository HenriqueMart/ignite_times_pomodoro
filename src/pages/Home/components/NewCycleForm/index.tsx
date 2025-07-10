import { FormContainer, MinutesAmountInput, TaksInput } from "./style";
import { useContext } from "react";
import { CyclesContext } from "../../Index";
import { useFormContext } from "react-hook-form";

export function NewCycleForm() {

    const {activeCycle} = useContext(CyclesContext)
    const {register} = useFormContext(); // Específico do Form para usar context específico, tendo um provider antes
    
     const disable = !!activeCycle; //Convertendo para Boolean

    return (
                <FormContainer>
                    <label id="task">Vou trabalhar em</label>
                    <TaksInput 
                        placeholder="Dê um nome para seu projeto" 
                        id="task" 
                        type="text" 
                        list="task-suggestion"
                        disabled={disable}
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
                        min={1}
                        max={60}
                        disabled={disable}
                        {...register('minuteAmount', {valueAsNumber:true})}/>

                    <span>Minutos.</span>
                </FormContainer>
    )
}