import { useLocation } from 'react-router-dom';
import './App.css';
import Footer from './Components/Layout/Footer';
import Heard from './Components/Layout/Heard';
import Menuleft from './Components/Layout/MenuLeft';

function App(props) {

    let params1 = useLocation();

    return (
        <>
            <Heard />
            <section>
                <div className="container">
                    <div className="row">

                       {params1['pathname'].includes("account") ? '' : <Menuleft />}
                        {props.children}

                    </div>
                </div>
            </section>

            <Footer />


        </>
    );
}


export default App;
