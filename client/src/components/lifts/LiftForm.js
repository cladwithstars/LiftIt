import React, {useState, useContext, useEffect} from 'react';
import LiftContext from '../../context/lift/liftContext';

const LiftForm = () => {
    const liftContext = useContext(LiftContext);

    const {addLift, updateLift, clearCurrent, current} = liftContext;

    useEffect(() => {
        if(current !== null) {
            setLift(current);
        } else {
        setLift({
            name: '',
            weight: '',
            reps: '', 
            type: 'personal' //default val
        });
        }
    }, [liftContext, current])

    const [lift, setLift] = useState({
        name: '',
        weight: '',
        reps: '', 
        type: 'personal' //default val
    });
    const {name, weight, reps, type} = lift;

    const onChange = e => setLift({...lift, [e.target.name]: e.target.value}); 

    const onSubmit = e => {
        e.preventDefault();
        if(current === null) {
            addLift(lift);
        } else {
            updateLift(lift);
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
            min={1} 
            name="weight" 
            value={weight} 
            onChange={onChange}/>

            <input 
            type="number" 
            min={1}
            placeholder="Reps" 
            name="reps" 
            value={reps} 
            onChange={onChange}
            />

            

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

export default LiftForm;
