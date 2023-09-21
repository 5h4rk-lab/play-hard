import './App.css';
import Signin from './Components/auth/signin';
import SignUp from './Components/auth/signup';
import AuthDetails from './Components/auth/authDetails';

function App() {
  return (
    <div className="App">
      <Signin />
      <SignUp />
      <AuthDetails />
    </div>
  );
}

export default App;
