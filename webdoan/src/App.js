import './App.css';
import LoginScreen from "./screen/login/LoginScreen";
import {useSelector} from "react-redux";
import HeaderUser from "./components/Header/HeaderUser";
import HeaderAdmin from "./components/Header/HeaderAdmin";

function App() {
    const isAdmin = useSelector(state => state.reducerAuth.isAdmin);
    const isLogin = useSelector(state => state.reducerAuth.isLogin);

    return (
        <div className="App">
            {!isLogin ? <LoginScreen/> : (!isAdmin ? <HeaderUser /> : <HeaderAdmin />)}
        </div>
  );
}

export default App;
