import React from 'react';
import TableRow from '@material-ui/core/TableRow'; 
import TableCell from '@material-ui/core/TableCell'; //테이블에 들어가는 각 원소

class Customer extends React.Component {
    render() {
        return (
                <TableRow>
                    <TableCell>{this.props.id}</TableCell>
                    <TableCell><img src={this.props.image} alt={"profile"}/></TableCell>
                    <TableCell>{this.props.name}</TableCell>
                    <TableCell>{this.props.birthday}</TableCell>
                    <TableCell>{this.props.gender}</TableCell>
                    <TableCell>{this.props.job}</TableCell>
                </TableRow>
            );
    }
}

export default Customer;