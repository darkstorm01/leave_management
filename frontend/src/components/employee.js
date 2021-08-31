import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import './nav.css';
import Axios from 'axios';
import Applyleave from './applyleave';


import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

/*                              Table
                TableHead                       TableBody
            TableRow->TableCell
*/

let Hello = ({ data }) => {
    let scolor;
    if (data === 'Rejected')
        scolor = 'red';
    else if (data === 'Accepted')
        scolor = 'green';
    else
        scolor = 'violet';
    return (
        <TableCell align='right' style={{ color: scolor }}>{data}</TableCell>
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
                            <TableCell align="right">{row.from.substring(0, 10)}</TableCell>
                            <TableCell align="right">{row.to.substring(0, 10)}</TableCell>
                            <Hello data={row.status} />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}


class Employee extends React.Component {
    constructor(props) {
        super(props);
        this.state = { getstatus: false, data: [] }
    }
    logout = (e) => {
        sessionStorage.clear();
        this.props.history.push('/');
    }
    componentWillMount() {
        this.getdetails();
    }
    getdetails = () => {
        let data = sessionStorage.getItem('userid');
        Axios.get('http://localhost:9000/e', { params: { username: data } })
            .then(doc => {
                this.setState({ data: doc.data });
                this.setState({ getstatus: true });
            });
    }
    render() {
        let data = sessionStorage.getItem('userid');
        if (data === null)
            return <Redirect exact to='/' />
        else if (!this.state.getstatus)
            return <div>Loading</div>
        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li className='links' onClick={this.logout}>Logout</li>
                            <li><Link to='/e' className='links'>Leave Status</Link></li>
                            <li><Link to='/e/apply_leave' className='links'>Apply Leave</Link></li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path="/e"><Details data={this.state.data} /></Route>
                        <Route exact path="/e/apply_leave"><Applyleave /></Route>
                    </Switch>
                </div >
            </Router>
        )
    }
}
export default withRouter(Employee);