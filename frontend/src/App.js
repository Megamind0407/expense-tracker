import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { MainLayout } from "./styles/Layouts";
import Orb from './components/Orb/Orb';
import Navigation from "./components/Navigation/Navigation";
import Dashboard from "./components/Dashboard/Dashboard";
import Income from "./components/Incomes/Income";
import Expenses from "./components/Expenses/Expenses";
import { useGlobalContext } from "./context/globalContext";
import SignUp from './pages/SignUp';
import SignIn from "./pages/SignIn";

function AppContent() {
  const [active, setActive] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const global = useGlobalContext();
  const navigate = useNavigate();
  
  console.log(global);
  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  const handleSignIn = () => {
    setIsAuthenticated(true);
    navigate("/dashboard"); // Navigate to dashboard after sign-in
  };

  return (
    <AppStyled className="App">
      {orbMemo}
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="" element={<SignIn onSignIn={handleSignIn} />} />
        {isAuthenticated ? (
          <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
          
        ) : (
          <Route
            path="/dashboard"
            element={
              <MainLayout>
                <Navigation active={active} setActive={setActive} />
                <main>{displayData()}</main>
              </MainLayout>
            }
          />
        )}
      </Routes>
    </AppStyled>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  position:relative;

  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow:auto;
    overflow-x : hidden;
    &::-webkit-scrollbar{
      width:0;
    }
  }
`; 

export default App;
