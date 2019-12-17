import React from 'react';
import { List, Datagrid, TextField, DateField, EditButton, DeleteButton } from 'react-admin';

export const CategoryList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" label="ID"/>
            <TextField source="image" label="Image"/>
            <TextField source="name" label="Name"/>
            <TextField source="description" label="Description"/>
            <TextField source="numberofpet" label="Number of pets"/>
            <DateField source="updatedAt" label="Updated at" showTime locales="vi-VN"/>
            <TextField source="createdby" label="Created by"/>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);