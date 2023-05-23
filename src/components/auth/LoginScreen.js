import { useDispatch, useSelector } from 'react-redux'
import '../../css/stylesLogin.css'
import { useForm } from '../../hooks/useForm'
import { useEffect, useMemo } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';
import Swal from 'sweetalert2';

export const LoginScreen = () => {

  const { startLogin, errorMessage } = useAuthStore();



  const {handleInputChange, formState } = useForm({
    email: 'alberto@gmail.com',
    password: 'Carlos123'
  })

  // const isAuthenticated = useMemo(() => status === 'checking', [status]);

  const {email, password} = formState

  const onSubmit = (event) => {
    event.preventDefault();
    startLogin({email, password})
  }

  useEffect(() => {
    if(errorMessage !== undefined) {
      Swal.fire('Error en autenticacion', errorMessage, 'error')
    }
  },[errorMessage])
  
  return (
      <>
        <div className="login-container">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image" style={{ backgroundImage: "url('https://posgrados.tesi.org.mx/img/bg-img/gallery6.jpg')" }}></div>
                  <div className="col-lg-6" >
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">BIENVENIDO</h1>
                      </div>
                      <form className="user" onSubmit={ onSubmit }>
                        <div className="form-group mt-3">
                          <input
                            type="email"
                            name="email"
                            onChange={ handleInputChange }
                            value= {email}
                            className="form-control form-control-user"
                            placeholder="Correo Electrónico..."
                          />
                        </div>
                        <div className="form-group mt-3">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            placeholder="Contraseña"
                            name="password"
                            onChange={ handleInputChange}
                            value={password}
                          />
                        </div>

                        <button 
                          // disabled={isAuthenticated}
                          type="submit" className="btn btn-success btn-user btn-block mt-3">
                          LOGIN
                        </button>
                      </form>
                      <div className="text-center mt-3">
                        <a className="small text-success" href="">REGISTRATE</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  )
}
