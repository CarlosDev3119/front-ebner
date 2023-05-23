import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { calificacionesSlice } from './calificaciones/calificacionesSlice'
import { filtrosSlice } from './calificaciones/filtros'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    calificaciones: calificacionesSlice.reducer,
    filtros: filtrosSlice.reducer,
  },
})