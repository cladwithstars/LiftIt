import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import LiftContext from '../../context/lift/liftContext';

const LiftItem = ({lift}) => {
    const liftContext = useContext(LiftContext)

    const {deleteLift, setCurrent, clearCurrent} = liftContext;
    
    const {_id, name, weight, reps, type, date} = lift;

    const onDelete = () => {
        deleteLift(_id);
        clearCurrent();
    }

    return (
        <div className='card bg-light'>
            <h3 className="text-primar text-left">
                {name}{' '}
                <span style={{float: 'right'}}
                className={'badge ' + (type === 'professional' ? 'badge-success' :
                'badge-primary')}>{date.toString().slice(0, 10)}
                </span>
                {/* <span style={{float: 'right'}}
                className={'badge ' + (type === 'professional' ? 'badge-success' :
                'badge-primary')}>{type}
                </span> */}
            </h3>
            <ul className='list'>
                {weight && (<li>
                    {weight + 'lb'}
                </li>)}
                {reps && (<li>
                    {reps + ' reps'}
                </li>)}
                {
                    (weight && reps) && 
                    (<li>
                        {Math.floor(weight * (reps/30 + 1)) + ' one rep max'}
                    </li>)
                }
                
               
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={() => setCurrent(lift)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>
        </div>
    )
}

LiftItem.propTypes = {
    lift: PropTypes.object.isRequired,
}

export default LiftItem;