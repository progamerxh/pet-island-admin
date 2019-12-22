import React from 'react';
import { List, Datagrid, TextField, DateField, EditButton, DeleteButton } from 'react-admin';
import { CustomFilter } from '../category/CategoryList';

export const TagList = (props) => (
    <List {...props}
     filters={<CustomFilter source="title" keyword='title'/>}>
        <Datagrid>
            <TextField source="id" label="ID"/>
            <TextField source="title" label="Title"/>
            <TextField source="description" label="Description"/>
            <DateField source="updatedAt" label="Updated at" showTime locales="vi-VN"/>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);