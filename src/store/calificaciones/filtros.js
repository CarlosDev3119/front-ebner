import { createSlice } from "@reduxjs/toolkit";

export const filtrosSlice = createSlice({
    name: 'filtros',
    initialState: {
        filtros: {
            evaluacion: '',
            materia: '',
            grupo: '',
            semestre: '',
        },
    },
    reducers: {
     
        setFiltro:(state, { payload }) => {
            state.filtros = payload
        }
        
      
    }
});

export const { setFiltro } = filtrosSlice.actions;