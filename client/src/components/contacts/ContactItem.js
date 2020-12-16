import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({contact}) => {
    const contactContext = useContext(ContactContext)

    const {deleteContact, setCurrent, clearCurrent} = contactContext;
    
    const {id, name, email, phone, type} = contact;

    const onDelete = () => {
        deleteContact(id);
        clearCurrent();
    }

    return (
        <div className='card bg-light'>
            <h3 className="text-primar text-left">
                {name}{' '}
                <span style={{float: 'right'}}
                className={'badge ' + (type === 'professional' ? 'badge-success' :
                'badge-primary')}>{type}
                </span>
            </h3>
            <ul className='list'>
                {email && (<li>
                    {email}
                </li>)}
                {email && (<li>
                    {phone}
                </li>)}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={() => setCurrent(contact)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>
        </div>
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
}

export default ContactItem;