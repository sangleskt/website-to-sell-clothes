import Login from "./Login";
import Register from "./Register";

function Index() {

    return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 ">
                        {/*/login form*/}
                        <Login />
                        {/*/login form*/}
                    </div>
                    <div className="col-sm-1">
                        <h2 className="or">OR</h2>
                    </div>
                    <div className="col-sm-4">
                        {/*sign up form*/}
                        <Register />
                        {/*sign up form*/}
                    </div>
                </div>
            </div>
    )
}
export default Index;