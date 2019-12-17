import React from 'react';
import { List, Datagrid, TextField, DateField, EditButton, DeleteButton } from 'react-admin';

export const TagList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" label="ID"/>
            <TextField source="title" label="Title"/>
            <TextField source="description" label="Description"/>
            <DateField source="updatedAt" label="Updated at" showTime locales="vi-VN"/>
            <TextField source="numberofpost" label="Number of posts"/>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);