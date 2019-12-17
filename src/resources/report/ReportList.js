import { Chip } from '@material-ui/core';
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
        Pending: 'default',
        Resolve: 'primary',
        Reject: 'secondary'
    }
    return <Chip
        label={record[source]}
        color={colors[record[source]]}
    />
}

const ActionField = ({ record, source }) => {
    return (
        record[source] === 'Pending' ?
            <div style={{
                display: 'flex',
            }}>
                <Chip
                    style={{ marginRight: 15 }}
                    label="Resolve"
                    color="primary"
                    onClick={() => handleStatusClick(record.id, "Resolve")}
                />
                <Chip
                    style={{ marginRight: 15 }}
                    label="Reject"
                    color="secondary"
                    onClick={() => handleStatusClick(record.id, "Reject")}
                />
            </div>
            : null
    )
}

const Reporter = ({ record }) => {
    const { reason, createdAt, reportedBy } = record;
    const { username } = reportedBy;
    return (
        <div
            style={{ marginLeft: 40 }}>
            <p><span style={{ fontWeight: 'bold' }}>Reporter: </span>{username}</p>
            <p><span style={{ fontWeight: 'bold' }}>Reason: </span>{reason}</p>
            <p><span style={{ fontWeight: 'bold' }}>Created At: </span>{new Date(createdAt).toLocaleString("vi-VN")}</p>
        </div>
    );
}



export const ReportList = (props) => (
    <List {...props}>
        <Datagrid expand={<Reporter />}>
            <TextField source="id" label="Post ID" />
            <TextField source="name" label="Post Title" />
            <TextField source="description" label="Post Description" />
            <TextField source="images" label="Post Images" />
            <TextField source="createdBy" label="Author" />
            <DateField source="createdAt" label="Created at" showTime locales="vi-VN" />
            <TextField source="numberOfReporter" label="Number of Reporters" />
            <StatusField source="status" label="Status" />
            <ActionField source="status" label="Action" />
        </Datagrid>
    </List>
);