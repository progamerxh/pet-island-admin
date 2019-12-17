import { Chip } from '@material-ui/core';
import React from 'react';
import { Datagrid, DateField, List, TextField } from 'react-admin';
import { apiUrl } from '../../provider/dataProvider';

const handleStatusClick = (id, status) => {
  const token = localStorage.getItem('token')
  const settings = {
    method: 'PUT',
    body: JSON.stringify(
      {
        status
      }
    ),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  }
  fetch(`${apiUrl}/account/${id}/status`, settings).then(() => window.location.reload());
}

const StatusField = ({ record, source }) => {
  return (
    <Chip
      label={record[source]}
      color={record[source] === 'Active' ? 'primary' : 'default'}
    />
  )
}

const ActionField = ({ record, source }) => {
  return (
    <Chip
      label={record[source] === 'Active' ? 'Deactive' : 'Active'}
      color={record[source] === 'Active' ? 'secondary' : 'primary'}
      onClick={() => handleStatusClick(record.id, record[source] === 'Active' ? 'Deactive' : 'Active')}
    />
  )
}

export const AccountList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="username" label="User name" />
      <TextField source="email" label="Email" />
      <TextField source="name" label="Name" />
      <TextField source="address" label="Address" />
      <TextField source="dob" label="DOB" />
      <TextField source="number" label="Number of reporters" />
      <DateField source="updatedAt" label="Updated at" showTime locales="vi-VN" />
      <StatusField source="status" label="Status" />
      <ActionField source="status" label="Action" />
    </Datagrid>
  </List>
);