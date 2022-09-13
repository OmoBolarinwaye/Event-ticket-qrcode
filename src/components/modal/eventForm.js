import React,{ useState, useReducer } from 'react'
import { RiCloseLine } from "react-icons/ri";
import QrCode from './qrCode';
import './eventForm.css'

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
 }


export default function EventForm() {
    const [ openQr, setOpenQr] = useState(false);
    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);

    const [formBox, setFormBox] = useState(true);

    const [openModal, setOpenModal] = useState(true);


    // const qrGen =() =>{
    //   
    // }

    const closeModal =() =>{
      setOpenModal(!openModal);
    }

    const handleSubmit = event => {
      event.preventDefault();
      setSubmitting(true);
      setFormBox(false);
      setOpenQr(!openQr);

      setTimeout(() => {
        setSubmitting(false);
        setFormBox(true);
        setOpenQr(openQr);
      }, 10000)
    }
    const handleChange = event => {
      setFormData({
        name: event.target.name,
        value: event.target.value,
      });
  }
  return (
    <div className="darkBdg rounded-lg">{openModal &&
      <div className="centered">
        <div className="modal">
            <div className="modalHeader">
              <h5 className="text-xl text-center p-3 text-white">Book Ticket Form</h5>
            </div>
            <button className="closeBtn" onClick={closeModal}>
              <RiCloseLine style={{ marginBottom: "-3px" }} />
            </button>

            <div>
              {openQr &&
              <QrCode />
              }
            </div>

            <div className="modalContent">
              <p className="text-white">{submitting &&
                <div>Data submitted
                  <ul>
                    {Object.entries(formData).map(([name, value]) => (
                      <li key={name}><strong>{name}</strong>:{value.toString()}</li>
                    ))}
                  </ul>
                </div>
              }</p>
              <div>{formBox &&
                  <form onSubmit={handleSubmit} className="text-center">
                    <div className="w-full px-3 mb-6 md:mb-0">
                      <input className="appearance-none w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="First Name" onChange={ handleChange } name="firstname"/>
                    </div>
                    <div className="w-full px-3 mb-6 md:mb-0">
                      <input className="appearance-none w-full bg-gray-200 text-black-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Last Name"  onChange={ handleChange } name="Lastname"/>
                    </div>
                    <div className="w-full px-3 mb-6 md:mb-0">
                      <input className=" appearance-none w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="Email" placeholder="Email Address" onChange={ handleChange } name="Gmail"/>
                    </div>
                    <button type="submit" className='submitBtn'>Submit</button>
                  </form>
                }
              </div>
          </div>
        </div>
      </div>
    }
    </div>
  )
}

