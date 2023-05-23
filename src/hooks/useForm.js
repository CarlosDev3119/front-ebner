import { useState } from "react";

export const useForm = ( initialState = {}) => {
    const [formState, setValues] = useState(initialState);

    const reset = () => {
        setValues( initialState );
    }

    const handleInputChange = ({ target }) => {
        setValues({
            ...formState,
            [ target.name ]: target.value
        })
    }

    return { formState, handleInputChange, reset }

}