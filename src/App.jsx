import { useContext } from 'react';
import './App.css'
import { LoginRoutes, Routers } from './routes';
import { Context } from './context/Context';

function App() {
    const {token} = useContext(Context)
    if (token) {
        return <Routers />
    }
    else{
        return <LoginRoutes />
    }
}

export default App
