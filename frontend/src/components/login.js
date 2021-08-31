import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import './nav.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            pwd: "",
            j_type: ["m"],
            err: ""
        };
    }
    changehandler = (event) => {
        let name = event.target.name;
        let val = event.target.value;
        this.setState({ [name]: [val] });
    }
    submithandler = (event) => {
        event.preventDefault();
        Axios.post('http://localhost:9000/user', this.state)
            .then(res => {
                if (res.data.length === 1) {
                    sessionStorage.setItem('userid', this.state.username);
                    if (this.state.j_type[0] === "m") {
                        this.props.history.push('/m');
                    }
                    else if (this.state.j_type[0] === "e") {
                        this.props.history.push('/e');
                    }
                }
                else {
                    this.setState({ err: "Invalid username or password" });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.submithandler}>
                    <p>UserId</p>
                    <input type='email' onChange={this.changehandler} name='username' placeholder="abc@domain.com"></input>
                    <p> Password</p>
                    <input type='password' onChange={this.changehandler} name='pwd'></input><br />
                    <select type='select' onChange={this.changehandler} name='j_type'>
                        <option value='m'>Manager</option>
                        <option value='e'>Employee</option>
                    </select><br />
                    <br></br>
                    <p style={{ color: 'red' }}>{this.state.err}</p>
                    <br></br>
                    <input type='submit' value='Login'></input>
                </form >
            </div >
        )
    }
}
export default withRouter(Login);