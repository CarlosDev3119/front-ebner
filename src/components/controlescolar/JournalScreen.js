import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFiltro } from '../../store/calificaciones/filtros';
import { onFiltrando } from '../../store/calificaciones/calificacionesSlice';



export const JournalScreen = () => {

  const [selectedOption, setSelectedOption] = useState('');
  
  const { calificaciones, calFiltradas } = useSelector( state => state.calificaciones );
  
  const { filtros } = useSelector( state => state.filtros );
  const dispatch = useDispatch();



  const aplicarFiltros = (filtros) => {
    const filtradas = calificaciones.filter((calificacion) => {
      // Verificar si cada filtro está presente en los datos de calificación
      return (
        filtros.includes(calificacion.tipo_evaluacion) 

      );
    });

    return filtradas;
  };
  
  const handleSelectChange = (event) => {
    const datosFiltrar = [];
    setSelectedOption(event.target.value);
    const newfiltros = {...filtros};
    newfiltros.evaluacion = event.target.value;

    dispatch( setFiltro( newfiltros));
    Object.keys(newfiltros).forEach( value => {
      datosFiltrar.push(newfiltros[value]);
    })
    const califFiltradas = aplicarFiltros(datosFiltrar);
    // filtrarCalificaciones(datosFiltrar, calificaciones)
    dispatch( onFiltrando( califFiltradas ) );

  };

  const totalAlumnosApobados = ( calificaciones ) => {
    const total = calificaciones.filter( califFiltradas => califFiltradas.calificacion !== 'NA');
    return total.length;

  }

  const calcularIndice = ( calificaciones ) => {
    const total = calificaciones.filter( califFiltradas => califFiltradas.calificacion === 'NA');
    const totalReprobados = total.length / calificaciones.length;
    return (totalReprobados * 100).toFixed(2);

  }

  
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-2">
      <a className="navbar-brand" href="#">Control Escolar</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
          </li>
        </ul>
      </div>
        {/* <button className="btn btn-danger" style={{ float: 'right', marginLeft: '10px' }}>Logout</button> */}
    </nav>

    <div className="container shadow p-3 mb-5 bg-white rounded mt-3">
      <h1>Índice de Reprobación</h1>
      <h3>Alumnos</h3>
      
    </div>


    <div className="container">
      <h2>Parciales</h2>
      <label htmlFor="mySelect">Filtros:</label>
      <div className="form-group col-3">
        <select className="form-select" id="mySelect" value={selectedOption} onChange={handleSelectChange}>
          <option value="">Elige una parcial</option>
          <option value="primer parcial">Parcial1</option>
          <option value="segundo parcial">Parcial2</option>
          <option value="tercer parcial">Parcial3</option>
        </select>
      </div>

      {/* <div className="form-group col-3">
        <select className="form-select" id="mySelect" value={selectedOption} onChange={handleSelectChange}>
          <option value="taller de base de datos">taller de base de datos</option>
          <option value="ingenieria de software">ingenieria de software</option>
          <option value="segundo parcial">Parcial2</option>
          <option value="tercer parcial">Parcial3</option>
        </select>
      </div> */}
     
 
    </div>

    <div className="container shadow p-3 mb-5 bg-white rounded mt-3">
      <div className="row">
        <div className="col-10">
          <h2>Tabla</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Calificacion</th>
                <th>Grupo</th>
                <th>Usuario</th>
                <th>Semestre</th>
                <th>Evaluacion</th>
                <th>Materia</th>
              </tr>
            </thead>
            <tbody>
                {
                  (calFiltradas.length == 0) ? calificaciones.map( (value, i) => (
                        
                          <tr key={i}>
                            <td>{value.calificacion}</td>
                            <td>{value.grupo}</td>
                            <td>{value.name_user}</td>
                            <td>{value.semestre}</td>
                            <td>{value.tipo_evaluacion}</td>
                            <td>{value.materia}</td>

                          </tr>

                        )): calFiltradas.map( (value, i) => (
                        
                          <tr key={i}>
                            <td>{value.calificacion}</td>
                            <td>{value.grupo}</td>
                            <td>{value.name_user}</td>
                            <td>{value.semestre}</td>
                            <td>{value.tipo_evaluacion}</td>
                            <td>{value.materia}</td>

                          </tr>

                        ))
                }
             
              
            </tbody>
          </table>
        </div>
      </div>
    </div>

    
    <div className="container">
      <div className="card shadow p-4 mx-auto" style={{ width: '400px', margin: '20px' }}>
        <h5 className="card-title text-center">Índice Calculado</h5>
        <div className="card-text">
          <label>Total Alumnos:</label>
          <span>{(calFiltradas.length == 0) ? calificaciones.length : calFiltradas.length}</span>
        </div>
        <div className="card-text">
          <label>Total Alumnos Aprobados:</label>
          <span>{(calFiltradas.length == 0) ? totalAlumnosApobados(calificaciones) :totalAlumnosApobados(calFiltradas)}</span>
        </div>
        <div className="card-text">
          <label>% de reprobacion:</label>
          <span>{(calFiltradas.length == 0) ? calcularIndice(calificaciones) :calcularIndice(calFiltradas)}</span>
        </div>
       
      </div>
    </div>

</>
  )
}
