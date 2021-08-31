import React from 'react';
import Axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';
import './nav.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup'

function Modify(props) {
    return (
        <TableCell align='right'>
            <ButtonGroup variant='contained'>
                <Button style={{ backgroundColor: 'green', color: 'white' }}
                    onClick={() => {
                        Axios.post('http://localhost:9000/m', { id: props.id, status: "Accepted" })
                            .then(doc => {
                                if (doc.data === "Success")
                                    window.location.reload();
                            });
                    }}>Accept</Button>
                <Button style={{ backgroundColor: 'red', color: 'white' }}
                    onClick={() => {
                        Axios.post('http://localhost:9000/m', { id: props.id, status: "Rejected" })
                            .then(doc => {
                                if (doc.data === "Success")
                                    window.location.reload();
                            });
                    }}>Reject</Button>
            </ButtonGroup>
        </TableCell>
    );
}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


let Details = ({ data }) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: 'bold' }}>Reason</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} align="right">Employee</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} align="right">From(YYYY-MM-DD)</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} align="right">To(YYYY-MM-DD)</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.reason}>
                            <TableCell component="th" scope="row">
                                {row.reason}
                            </TableCell>
                            <TableCell align="right">{row.username}</TableCell>
                            <TableCell align="right">{row.from.substring(0, 10)}</TableCell>
                            <TableCell align="right">{row.to.substring(0, 10)}</TableCell>
                            <Modify id={row._id} />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}

class Manager extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: sessionStorage.getItem('userid'), gotstatus: false, data: [] };
    }
    componentDidMount() {
        this.connect();
    }
    connect() {
        Axios.get('http://localhost:9000/m', { params: this.state })
            .then(res => {
                if (res.status === 200) {
                    this.setState({ gotstatus: true });
                    this.setState({ data: res.data });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    logout = (e) => {
        sessionStorage.clear();
        this.props.history.push('/');
    }
    render() {
        let data = sessionStorage.getItem('userid');
        if (data === null)
            return <Redirect exact to='/' />
        else if (!this.state.gotstatus) {
            return <div><h1>Loading</h1></div>
        }
        else if (this.state.gotstatus) {
            return (
                <div>
                    <nav>
                        <ul>
                            <li class='links' onClick={this.logout}>Logout</li>
                        </ul>
                    </nav>
                    <Details data={this.state.data} />
                </div>
            );
        }
    }
}
export default withRouter(Manager);