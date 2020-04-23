import { FOCUSE_IN, FOCUSE_OUT } from "../types";

export const select = (selected) => {
    if(selected){
        return {
            type:FOCUSE_IN
        }
    } else {
        return {
            type:FOCUSE_OUT
        }
    }
}