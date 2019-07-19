import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AuthForm from './AuthForm';
import PersonalPage from './PersonalPage';
import { getContext } from './storage';

const auth = () => getContext();

const protect = (elementToProtect) => {
  if (auth()) {
    return elementToProtect;
  } else {
    return AuthForm;
  }
};

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={protect(PersonalPage)} />
      </div>
    </Router>
  );
};

//
//     <nav>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link className="btn btn-primary" to="/auth/">Auth</Link>
//         </li>
//       </ul>
//     </nav>
export default App;
