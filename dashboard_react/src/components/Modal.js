import React from 'react';
import '../assets/css/modalStyles.css'

import person from '../assets/images/person.png'

function Modal(props) {
    return (
        <>
            {props.status &&
                <div className="modal__overlay">
                    <img className="modal__img" src = { person } alt="Person" style={{ width: '10%' }} />
                    <div className="modal__container">
                        <div className="card-header py-3">
                            <h5 className="m-0 font-weight-bold text-gray-800">{ props.title }</h5>
                        </div>

                        <button className="modal__close-button" onClick={ () => props.changeStatus(false) }>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </button>
                        {props.children}
                    </div>
                </div>
            }
        </>
    )
}

export default Modal;