import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../Modal";
import "../../styles/modal.css"

const CreateColumn = ({open, boardId, onClose, getColumns}) => {
    const [column_title, set_column_title] = useState('')
    const [column_position, set_column_position] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();
        const obj = {
            column_title,
            column_position
        };

        console.log(obj);
        axios.post('http://localhost:4000/boards/project/'+boardId+'/column/add', obj)
            .then(res => console.log(res))
            .catch(err =>  console.log(err));
        set_column_title('');
        set_column_position('');
    }

    return (
        <Modal open={open}>
            <div style={{ marginTop: 10 }}>
                <h3>New Column</h3>
                <button onClick={() => onClose()} className="closeIcon">X</button>
                <form onSubmit={e =>{onSubmit(e); onClose()}}>
                    <div className="form-group">
                        <label>Title:  </label>
                        <input
                            type="text"
                            className="form-control"
                            value={column_title}
                            onChange={e => set_column_title(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Position: </label>
                        <input type="text"
                               className="form-control"
                               value={column_position}
                               onChange={e => set_column_position(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className={"adduserbuttonform"}><FontAwesomeIcon className={"adduserbuttonformicon"} icon="plus"/>
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default CreateColumn;
