import { useEffect, useState } from "react";
import { CountdownContainer, Separator } from "./style";
import { differenceInSeconds } from "date-fns";

interface CountdownProps{
    activeCycle: any
    setCycle: any
    activeCycleId: any
}


export function CountDown({
    activeCycle, 
    setCycle, 
    activeCycleId
    }: CountdownProps){
        
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);


    const allSeconds = activeCycle ? activeCycle.minuteAmount * 60 : 0;
    

    useEffect(() => {
            let interval: number;

            if(activeCycle){
                interval = setInterval(() => {
                    const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate);

                    if(secondsDifference >= allSeconds){
                        setCycle( state => 
                            state.map((cycle) => {
                            if(cycle.id == activeCycleId){
                                return { ...cycle, finishedDate: new Date() }
                            }else{
                                return cycle;
                            }
                        })
                    );

                    setAmountSecondsPassed(allSeconds);

                    clearInterval(interval);
                    }else{
                        setAmountSecondsPassed(secondsDifference);
                    }
                }, 1000) //Sendo nativa do JS para contagem de intervalo, passando o que vai ocorrer nesse período, e depois o tempo quem que cada execução estará ocorrendo
            }

            return () => { //Usado para limpar utilização anterior
                clearInterval(interval)
            }
    }, [activeCycle, allSeconds, activeCycleId])
        
    return(
        <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
        </CountdownContainer>
    )
}