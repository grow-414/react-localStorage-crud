import { useSelector, useDispatch } from 'react-redux';
import Routers from './Routers';
import { useEffect, useState } from 'react';
import { APP_LOAD, USER_LIST } from './actions';

function App() {
  const login = useSelector(state => state.app.token);
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isComponentReady, setComponentReady] = useState(false);

  useEffect(() =>{
    if(!login){
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      if(token && user){
        const users = JSON.parse(localStorage.getItem('users'));
        console.log("users", users);
        dispatch({type: APP_LOAD, payload: {token, user}})
        dispatch({type: USER_LIST, payload: users})
        setIsLoggedIn(true);
        setComponentReady(true);
      }else{
        setComponentReady(true);
      }
    }else{
      setIsLoggedIn(true);
      setComponentReady(true);
    }
  }, [login]);

  return (
      <>
        {isComponentReady ? <Routers isLoggedIn={isLoggedIn} /> : <p>loading...</p>}
      </>
  );
}

export default App;
