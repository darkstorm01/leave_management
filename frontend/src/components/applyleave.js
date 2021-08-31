import Axios from 'axios';
import React from 'react';
import { Redirect, withRouter } from "react-router-dom";

class ApplyLeave extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: sessionStorage.getItem('userid'), reason: "", from: "", to: "", mngr_email: "", error: "" };
    }
    changehandler = (event) => {
        let name = event.target.name;
        let val = event.target.value;
        this.setState({ [name]: val });
    }
    submithandler = (event) => {
        event.preventDefault();
        let today_date = new Date();
        let given_fromdate = this.state.from.toString();
        let given_todate = this.state.to.toString();
        let yy = today_date.getFullYear();
        let mm = today_date.getMonth() + 1;
        let dd = today_date.getDate();
        if (mm < 10)
            mm = '0' + mm;
        if (dd < 10)
            dd = '0' + dd;
        today_date = yy + '-' + mm + '-' + dd;



        if (today_date > given_fromdate || given_fromdate > given_todate)
            this.setState({ error: "Enter valid dates" });
        else if (this.state.reason === "")
            this.setState({ error: "Reason cannot be empty" });
        else if (this.state.mngr_email === "")
            this.setState({ error: "Manager Email cannot be empty" });
        else {
            Axios.get('http://localhost:9000/e/check_manager', { params: { username: this.state.mngr_email } })
                .then(doc => {
                    if (doc.data.length !== 1)
                        this.setState({ error: "Manager doesnot exist" });
                    else {
                        this.setState({ error: "" });
                        Axios.post('http://localhost:9000/e', this.state)
                            .then(res => {
                                if (res.data === "Success")
                                    this.props.history.push('/e');
                                else
                                    this.setState({ error: "Error in applying Try again" });
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                });
        }
    }
    render() {
        let data = sessionStorage.getItem('userid');
        if (data === null)
            return <Redirect exact to='/' />
        return (
            <div>
                <form onSubmit={this.submithandler}>
                    <p>Manager Email:</p>
                    <input type='email' onChange={this.changehandler} name='mngr_email' placeholder="abc@domain.com"></input>
                    <p>From</p>
                    <input type='date' onChange={this.changehandler} name='from' />
                    <p>To</p>
                    <input type='date' onChange={this.changehandler} name='to' />
                    <p>Reason</p>
                    <textarea onChange={this.changehandler} name='reason' rows='4' cols='50' ></textarea><br />
                    <input type='submit' value='Apply' />
                    <p>{this.state.error}</p>
                </form>
            </div>
        );
    }
}

export default withRouter(ApplyLeave);