import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaksInput } from "./style";

export function Home(){
    return(
         <HomeContainer>
            <form>
                <FormContainer>
                    <label id="task">Vou trabalhar em</label>
                    <TaksInput 
                        placeholder="Dê um nome para seu projeto" 
                        id="task" 
                        type="text" 
                        list="task-suggestion"
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
                        max={60}/>

                    <span>Minutos.</span>
                </FormContainer>

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton disabled type="submit">Começar
                    <Play size={24}/>
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}