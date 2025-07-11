import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./style";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../Contexts/CyclesContext";




export function CountDown(){

    const { activeCycle, activeCycleId, markCurrentCyclesAsFinished, amountSecondsPassed, setSecondsPassed } = useContext(CyclesContext);
    
    const allSeconds = activeCycle ? activeCycle.minuteAmount * 60 : 0;
    const currentSeconds = activeCycle ? allSeconds - amountSecondsPassed : 0;
    const minutesAmount = Math.floor(currentSeconds / 60); //Arredondamento para baixo
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, '0'); //Caso seja 1 cada decimail, coloca o zero na frente
    const seconds = String(secondsAmount).padStart(2, '0');

     useEffect(() => {
            if(activeCycle){
                document.title = `${minutes}:${seconds}`
            }
            }, [minutes, seconds])

    useEffect(() => {
            let interval: number;

            if(activeCycle){
                interval = setInterval(() => {
                    const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate);

                    if(secondsDifference >= allSeconds){
                        markCurrentCyclesAsFinished();
                    
                        setSecondsPassed(allSeconds);

                        clearInterval(interval);
                    }else{
                        setSecondsPassed(secondsDifference);
                    }
                }, 1000) //Sendo nativa do JS para contagem de intervalo, passando o que vai ocorrer nesse período, e depois o tempo quem que cada execução estará ocorrendo
            }

            return () => { //Usado para limpar utilização anterior
                clearInterval(interval)
            }
    }, [activeCycle, allSeconds, activeCycleId, markCurrentCyclesAsFinished])
        
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