import styled from "styled-components";
import { MainLayout } from "./styles/Layouts";
import Orb from './components/Orb/Orb'
import Navigation from "./components/Navigation/Navigation";


function App() {
  return (
    <AppStyled className="App">
        <Orb/>
      <MainLayout>
        <Navigation />
      </MainLayout>
    </AppStyled>
  );
}
const AppStyled = styled.div`
  height: 100vh;
  position:relative;
`; 

export default App;
