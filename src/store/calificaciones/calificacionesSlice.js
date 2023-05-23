import { createSlice } from "@reduxjs/toolkit";

export const calificacionesSlice = createSlice({
    name: 'calificaciones',
    initialState: {
        status: 'checking', //'checking'
        calificaciones: [],
        errorMessage: undefined,
        calFiltradas: []
    },
    reducers: {
        onLoadCalificaciones: ( state ) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
            state.calFiltradas = [];

        },
        calificaciones: (state, { payload }) => {
            state.status         = 'loaded';
            state.calificaciones = payload;
            state.errorMessage   = undefined;
            state.calFiltradas   = [];
        },
        onFiltrando:(state, { payload }) => {
            state.calFiltradas = payload
        }
        
      
    }
});

export const { onLoadCalificaciones, calificaciones, onFiltrando } = calificacionesSlice.actions;