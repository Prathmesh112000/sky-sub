import {SENDDATA, GETDATA } from "./action";

const initstate={
    data:"",
    isLoading:false
}

export const reducer=(state=initstate,{type,payload})=>{
    switch (type) {
        case GETDATA:
            
            return{
                ...state,
                data:payload,
                isLoading:true
            }
        case  SENDDATA:
            return{
                ...state,
                isLoading:true
            }    
        default:
            return state
    }

}