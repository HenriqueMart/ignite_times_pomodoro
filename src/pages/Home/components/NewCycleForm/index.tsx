import { useForm } from "react-hook-form";
import { FormContainer, MinutesAmountInput, TaksInput } from "./style";
import * as zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";


export function NewCycleForm() {
    
    const newCycleFormValidationSchema = zod.object({ //Validando objeto com esse validação nos campos
        task : zod.string()
            .min(1, 'Informe a Tarefa'),
        minuteAmount: zod.
            number()
            .min(1, "O ciclo precisa ser de no Mínimo 5 minutos")
            .max(60, "O ciclo precisa ser de no Máximo 60 minutos"),
    
    })
    
    
    const { register, handleSubmit, watch, reset} = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema), //Passando a validação dos objetos para o formulário
        defaultValues: { // Passando como objeto os atributos que suas variável iniciadas com esses valores
            task: '',
            minuteAmount: 0,
        }
    });

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