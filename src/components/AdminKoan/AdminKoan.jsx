import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'


//page needs to GET koans on load, arm them with a DELETE button
//DISPATCH get request for all koans to SAGA
//store GET in REDUCER -> RENDER REDUCER contents on page LOAD

//BUILD FORM to POST new koan
//PROTECT POST, GET, DELETE routes on SERVER from KOAN ROUTER

export default function AdminKoan() {

    //state to store user in put
    const [koan, setKoan] = useState('');
    //reducer with all koans
    const koanList = useSelector(store => store.koan)

    const history = useHistory();
    const dispatch = useDispatch();

    //dispatch GET to koan.saga.js
    const getKoans = () => {
        dispatch({ type: 'GET_KOANS' })
    }

    //buttons send user back on to dashboard OR post

    //ADD DELETE ROUTE
    const handleClick = (type, event) => {
        event.preventDefault();

        switch (type) {
            case 'back':
                history.push('/admin');
                break;
            case 'submit':
                console.log('submitting')
                dispatch({ type: 'POST_KOAN', payload: {koan: koan}})

        }
    }

    useEffect(() => {
        getKoans();
    }, [])

    return (
        <div>
            <p>on Admin Koan</p>
            <div>
                <form>
                    <label htmlFor="koan">New Koan</label>
                    <textarea
                        name="koan"
                        id="koan"
                        value={koan}
                        required
                        onChange={(event) => setKoan(event.target.value)}
                    >
                    </textarea>
                    <button onClick={(event) => handleClick('submit', event)}>Submit</button>
                </form>
            </div>
            <div>
                <button onClick={() => handleClick('back')}>Back to Dashboard</button>
            </div>
        </div>

    )
}
