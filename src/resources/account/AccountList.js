import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { Datagrid, DateField, List, TextField } from 'react-admin';
import { apiUrl } from '../../provider/dataProvider';
import { CustomFilter } from '../category/CategoryList';

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
  const colors = {
    Active: 'blue',
    Deactive: 'normal',
  }
  return <Typography
    style={{ color: colors[record[source]] }}
  >
    {record[source]}
  </Typography >
}

const ActionField = ({ record, source }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      size='small'
      style={{
        marginRight: 15,
        backgroundColor: record[source] === 'Active' ? 'red' : 'blue'
      }}
      onClick={() => handleStatusClick(record.id, record[source] === 'Active' ? 'Deactive' : 'Active')}
    >
      {record[source] === 'Active' ? 'Deactive' : 'Active'}
    </Button>

  )
}

export const AccountList = (props) => (
  <List {...props}
  filters={<CustomFilter source="User name" />}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="username" label="User name" />
      <TextField source="role" label="Role" />
      <TextField source="email" label="Email" />
      <TextField source="user.name" label="Name" />
      <TextField source="user.phoneNumber" label="Phone" />
      <TextField source="user.address.city" label="Address" />
      <TextField source="user.dob" label="DOB" />
      <TextField source="post" label="Number post" />
      <DateField source="updatedAt" label="Updated at" showTime locales="vi-VN" />
      <StatusField source="status" label="Status" />
      <ActionField source="status" label="Action" />
    </Datagrid>
  </List>
);