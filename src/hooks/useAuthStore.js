import { useDispatch, useSelector } from "react-redux"
import controlApi from "../api/controlApi";
import { clearErrorMessage, onCheking, onLogin, onLogout } from "../store/auth/authSlice";
import { calificaciones } from "../store/calificaciones/calificacionesSlice";

export const useAuthStore = () => {

    const {status, user, errorMessage} = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async ({email, password}) => {

        dispatch( onCheking());

        try{

            const { data } = await controlApi.post('/auth', {email: email, pass: password});
            localStorage.setItem('token', data.data.token.data);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( onLogin(data.data) );

        }catch(err){

            dispatch( onLogout('Credenciales incorrectas') );
            console.error(err);
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10)

        }
    }

    const checkAuthToken = async () => {

        const token = localStorage.getItem('token');
        if(!token) return dispatch( onLogout() );

        try{

            const { data } = await controlApi.get('auth/renew');
            localStorage.setItem('token', data.data.token.data);
            
            const dataUser = {
                id_user: data.data.id_user,
                name_user: data.data.name,
                email:data.data.email,
                staff_id:data.data.staff_id,
                user_type: data.data.user_type,
                status_user: data.data.status_user,
                token: data.data.token
            }

            return dispatch( onLogin(dataUser) );
        }catch(error){
            localStorage.clear();
            return dispatch( onLogout() );
        }
    }

    const loadCalificaciones = async () => {
        const token = localStorage.getItem('token');
        if(!token) return dispatch( onLogout() );

        try{
            
            const { data } = await controlApi.get('calificaciones');
            dispatch( calificaciones(data.resp) )
            
          

        }catch(error){
        }

    }


    return{
        status, 
        user, 
        errorMessage,


        startLogin,
        checkAuthToken,
        loadCalificaciones
    }
}