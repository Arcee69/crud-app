import { Routes, Route } from "react-router-dom"
import Login from './component/Login';
import Register from './component/Register';
import Home from './component/Home';
import User from "./component/User";
import Account from "./component/Account";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      <Route element={<Home />}>
        <Route path="/users" element={<User />} />
        <Route path="/account" element={<Account />} />
      </Route>
    </Routes>
  );
}

export default App;
