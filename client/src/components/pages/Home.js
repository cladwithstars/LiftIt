import React, {useContext, useEffect} from 'react';
import Lifts from '../lifts/Lifts'
import LiftForm from '../lifts/LiftForm'
import LiftFilter from '../lifts/LiftFilter'
import AuthContext from '../../context/auth/authContext'
const Home = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser(); 
        //esline-disable-next-line
    }, []);
    return (
        <div className="grid-2">
            <div>
                <LiftForm/>
            </div>
            <div>
                <LiftFilter/>
                <Lifts />
            </div>
        </div>
    )
}

export default Home;
