import {produce} from 'immer'

import { ActionType } from "./actions"

export interface Cycle{
    id: string
    task: string
    minuteAmount: number 
    startDate: Date
    interruptDate?: Date
    finishedDate?: Date
}

interface CyclesState{
    cycles: Cycle[]
    activeCycleId: string | null;
}

export function cyclesReducer(state: CyclesState, action: any){      
            switch(action.type){
                case ActionType.ADD_NEW_CYCLE:
                    return produce(state, (draft) => {
                        draft.cycles.push(action.payload.newCycle)
                        draft.activeCycleId = action.payload.newCycle.id
                    })
                   /* return {
                    ...state,
                    cycles: [...state.cycles, action.payload.newCycle],
                    activeCycleId: action.payload.newCycle.id,
                }*/
                case ActionType.INTERRUPT_CURRENT_CYCLE:{
                    const currentCycleIndex = state.cycles.findIndex((cycle) => {
                        return cycle.id == state.activeCycleId
                    })

                    if(currentCycleIndex < 0){
                        return state
                    }

                    return produce(state, (draft) => {
                        draft.activeCycleId = null
                        draft.cycles[currentCycleIndex].interruptDate = new Date()
                    })
                
                    /*return {
                    ...state,
                    cycles: state.cycles.map((cycle) => {
                        if(cycle.id == state.activeCycleId){
                            
                            return { ...cycle, interruptDate: new Date() }
                        }else{
                            return cycle;
                        }
                    }),
                    activeCycleId: null,
                    }*/
                }
                case ActionType.MARK_CURRENT_CYCLE_AS_FINISHED:{
                    const currentCycleIndex = state.cycles.findIndex((cycle) => {
                        return cycle.id == state.activeCycleId
                    })

                    if(currentCycleIndex < 0){
                        return state
                    }

                    return produce(state, (draft) => {
                        draft.activeCycleId = null
                        draft.cycles[currentCycleIndex].finishedDate = new Date()
                    })
                }
                default:
                     return state;
            }
        }
