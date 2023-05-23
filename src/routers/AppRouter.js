import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { JournalScreen } from '../components/controlescolar/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import { useSelector } from 'react-redux'
import { useAuthStore } from '../hooks/useAuthStore'



export const AppRouter = () => {

    const { checkAuthToken, status, loadCalificaciones} = useAuthStore();
    
    useEffect(() => {
        checkAuthToken();
    },[]);

    useEffect(() => {
        loadCalificaciones();
    },[]);
    
    if(status === 'checking'){
        return (
            <h1>Cargando...</h1>
        )
    }

    const isLoggedIn = ( status === 'authenticated') ? true : false;

    return (
        <BrowserRouter>
            <Routes>
                
                <Route path="/auth/*" element={
                    <PublicRoute isAuth={isLoggedIn}>
                        <AuthRouter/>
                    </PublicRoute>
                    }
                />
            
                <Route 
                    exact
                    path="/"
                    element={
                        <PrivateRoute isAuth={isLoggedIn}>
                            <JournalScreen />
                        </PrivateRoute>
                    }
                /> 
    

            </Routes>

            
        </BrowserRouter>
        
    )
}
