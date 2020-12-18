import React, {useContext, useRef, useEffect} from 'react'
import LiftContext from '../../context/lift/liftContext'

const LiftFilter = () => {
    const liftContext = useContext(LiftContext);
    const text = useRef('');

    const {filterLifts, clearFilter, filtered} = liftContext;

    useEffect(() => {
        if(filtered === null) {
            text.current.value = '';
        }
    })
    const onChange = e => {
        if(text.current.value !== ''){
            filterLifts(e.target.value);
        } else {
            clearFilter();
        }
    }
    return (
        <form>
            <input ref={text} type="text" placeholder="Filter lifts..."
            onChange={onChange}></input>
        </form>
    )
}

export default LiftFilter;
