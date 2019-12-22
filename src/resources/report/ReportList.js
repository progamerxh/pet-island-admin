import { Badge, Button, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import { Datagrid, DateField, List, TextField } from 'react-admin';
import { apiUrl } from '../../provider/dataProvider';

const handleStatusClick = (id, action) => {
    const token = localStorage.getItem('token')
    const settings = {
        method: 'PUT',
        body: JSON.stringify(
            {
                action
            }
        ),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    }
    fetch(`${apiUrl}/report/${id}`, settings).then(() => window.location.reload());
}

const StatusField = ({ record, source }) => {
    const colors = {
        New: 'default',
        Resolve: 'green',
        Reject: 'red'
    }
    return <Typography
        style={{ color: colors[record[source]] }}
    >
        {record[source]}
    </Typography >
}

const ActionField = ({ record, source }) => {
    const disabled = record[source] !== 'New';
    return (
        <div style={{
            display: 'flex',
        }}>
            <Button
                variant="contained"
                color="primary"
                size='small'
                style={{ marginRight: 15, backgroundColor: disabled ? 'normal' : 'green' }}
                disabled={disabled}
                onClick={() => handleStatusClick(record.id, "Resolve")}
            >
                Resolve
            </Button>
            <Button
                variant="contained"
                color="primary"
                size='small'
                style={{ marginRight: 15, backgroundColor: disabled ? 'normal' : 'red' }}
                disabled={disabled}
                onClick={() => handleStatusClick(record.id, "Reject")}
            >
                Reject
            </Button>
        </div>
    )
}

const Reporter = ({ record }) => {
    const { reports } = record;
    return (
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="left">Reporter</TableCell>
                    <TableCell align="left">Reason</TableCell>
                    <TableCell align="left">Created at</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {reports.map(({ reportedBy, reason, createdAt }) => (
                    <TableRow key={createdAt}>
                        <TableCell align="left">{reportedBy.username}</TableCell>
                        <TableCell align="left">{reason}</TableCell>
                        <TableCell align="left">{new Date(createdAt).toLocaleString('vi-VN')}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

const ViolateField = ({ record }) => {
    const { reasons } = record;
    const top3 = reasons.sort((a, b) => b.count - a.count).slice(0, 3)
    return (
        <>
            {top3.map(({ key, rate, count }) => (
                <Badge key={key} badgeContent={count} color="primary">
                    <Chip 
                    style={{margin: '0px 0px 12px 0px'}}
                    label={`${key} ${rate}%`}/>
                </Badge>
            ))}
        </>
    )
}


export const ReportList = (props) => (
    <List {...props} >
        <Datagrid expand={<Reporter />}>
            <TextField source="id" label="ID" />
            <TextField source="title" label="Post Title" />
            <TextField source="description" label="Post Description" />
            <TextField source="images" label="Post Images" />
            <TextField source="account.username" label="Author" />
            <DateField source="createdAt" label="Created at" showTime locales="vi-VN" />
            <ViolateField source="reasons" label="Violate" />
            <StatusField source="status" label="Status" />
            <ActionField source="status" label="Action" />
        </Datagrid>
    </List>
);