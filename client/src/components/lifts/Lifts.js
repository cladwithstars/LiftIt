import React, {Fragment, useContext, useEffect} from 'react'
import LiftItem from './LiftItem';
import LiftContext from '../../context/lift/liftContext'

const Lifts = () => {

    
    const liftContext = useContext(LiftContext);

    const {lifts, filtered, getLifts, loading} = liftContext;
    console.log(lifts);
    useEffect(() => {
        getLifts();
        // eslint-disable-next-line
    }, [])

    if(lifts !== null && lifts.length === 0 && !loading) {
        return <h4>Please add a Lift</h4>
    }
    return (
        <Fragment>
            {filtered !== null ? filtered.map(lift => 
            (<LiftItem key={lift._id} lift={lift} />)) :
            lifts.map(lift => ( 
                <LiftItem key={lift._id} lift={lift} />
                )) 
            }
        </Fragment>
    )
}

export default Lifts;
