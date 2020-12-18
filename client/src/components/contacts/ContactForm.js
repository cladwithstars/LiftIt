import React, {useState, useContext, useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);

    const {addContact, updateContact, clearCurrent, current} = contactContext;

    useEffect(() => {
        if(current !== null) {
            setContact(current);
        } else {
        setContact({
            name: '',
            email: '',
            phone: '', 
            type: 'personal' //default val
        });
        }
    }, [contactContext, current])

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '', 
        type: 'personal' //default val
    });
    const {name, email, phone, type} = contact;

    const onChange = e => setContact({...contact, [e.target.name]: e.target.value}); 

    const onSubmit = e => {
        e.preventDefault();
        if(current === null) {
            addContact(contact);
        } else {
            updateContact(contact);
        }
        
        clearAll();
    }
    const clearAll = () => {
        clearCurrent(); 
    }
    return (
        <form onSubmit={onSubmit}>
          <h2 className="text-primary">
              {current ? 'Edit Lift' : 'Add Lift'}
          </h2>
            <input 
            type="text" 
            placeholder="Name of lift" 
            name="name" 
            value={name} 
            onChange={onChange}/>

            <input 
            type="number" 
            placeholder="Weight (lb)" 
            name="email" 
            value={email} 
            onChange={onChange}/>

            <input 
            type="number" 
            placeholder="Reps" 
            name="phone" 
            value={phone} 
            onChange={onChange}/>

            

            <div>
                <input type="submit" 
                value={current ? 'Update Lift' : 'Add Lift'}
                 className="btn btn-primary btn-block"
                 ></input>
            </div>
            {current && <div>
                <button 
                className="btn btn-light btn-block"
                onClick={clearAll}
                >Clear</button>
                </div>}
        </form>
    )
}

export default ContactForm;
