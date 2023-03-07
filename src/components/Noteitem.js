import React, {useContext} from 'react';
import noteContext from '../context/notes/noteContext';


const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
   const {note, updateNote} = props;
  return (
    <div className='col-md-3' style={{"color": "white"}}>
        <div className="card my-3 border-info" style={{"backgroundColor": "#1e293b"}}>
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <i className="fa-solid fa-pen-to-square mx-4" onClick={()=>{updateNote(note);}}></i>
                <i className="fa-solid fa-trash mx-4" onClick={()=>{deleteNote(note._id);
                  props.showAlert("Deleted Successfully", "success");}}></i>
            </div>
        </div>
    </div>
  );
}

export default Noteitem; 