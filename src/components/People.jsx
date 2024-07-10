import PropTypes from 'prop-types';
import { Person } from './Person';
import { useState } from 'react';

export const People = ({ persons, setPersons }) => {

  //Estado para identificar a la persona que se esta editando
  const [editingId, setIditingId] = useState(null);
  //Estado para persona que se edito
  const [editedPerson, setEditedPerson] = useState({
    name: '',
    rol: '',
    img: ''
  });
  //Estado para establecer si se esta editando o no
  const [isEditing, setIsEditing] = useState(false);

  //Metodo para capturar datos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPerson(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  //Metodo para editar los datos
  const handleEdit = (id, e) =>{

    //Establecemos el Id de la persona a editar
    setIditingId(id);

    //Activa el estado de edicion
    setIsEditing(true);

    //Buscar la persona a editar
    const personToEdit = persons.find(person => person.id === id);

    setEditedPerson({...personToEdit});
  }

  // Metodo para actualizar los datos en las card
  const handleSave = (e) =>{
    //Actualizar el estado de persona al guardar los datos modificados
    const updatedPersons = persons.map(person => person.id === editingId ? editedPerson :person);

    setPersons(updatedPersons)
  }
  return (
    <div>
      <h2 className='text-center my-4'>IT Team</h2>
      <div className='container'>
        <div className='row d-flex flex-wrap row-cols-1 row-cols-md-2 row-cols-lg-3'>
          {persons.map((person) => {
              return (
                <div key={person.id}>
                  <Person
                  id={person.id}
                  name={person.name}
                  img={person.img}
                  role={person.role}
                  />
                </div>
              );
          })}
        </div>
      </div>
      {/* Renderizar el formulario para crear o editar los datos de una persona */}
      <div className='container mt-4 row p-2'>
        <h2 className='text-center my-4'>Crear nuevo empleado</h2>
        <form className='border border-dark rounded p-4'>
          <div className="mb-3">
            <label className="form-label">Nombres</label>
            <input type="text" name="name" value={editedPerson.name} onChange={handleChange} className="form-control" aria-describedby="nombre" />
          </div>
          <div className="mb-3">
            <label className="form-label">Cargo</label>
            <input type="text" name="rol" value={editedPerson.rol} onChange={handleChange}  className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Avatar</label>
            <input type="text" name="img" value={editedPerson.img} onChange={handleChange}  className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">Crear</button>
        </form>
      </div>
    </div>
  )
}

People.propTypes = {
  persons: PropTypes.array,
  setPersons: PropTypes.func
}