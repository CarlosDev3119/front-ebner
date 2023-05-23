

export const signInWithEmailPassword = async (email, password) => {

    try{    

        const { id_user, name_user, staff_id, user_type } = {
            id_user: 1, name_user: 'Carlos', email: 'carlos@gmail.com', staff_id: '202011399', user_type: 'profesor'
        }

        return {
            ok: true,
            id_user, name_user, staff_id, user_type, email
        }

    }catch(error){
        return {
            ok:false,
            message: error
        }
    }

}