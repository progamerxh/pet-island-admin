import React from 'react';
import { List, Datagrid, TextField, DateField, EditButton, DeleteButton, Filter, TextInput, ImageField } from 'react-admin';

export const CustomFilter = (props) => (
    <Filter {...props}>
        <TextInput label={`Search ${props.source}`} source={props.keyword || 'keyword'} alwaysOn />
    </Filter>
);

export const CategoryList = (props) => (
    <List
        {...props}
        filters={<CustomFilter source="name" />}>
        <Datagrid>
            <TextField source="id" label="ID" />
            <ImageField source="image.url" label="Image" />
            <TextField source="name" label="Name" />
            <TextField source="description" label="Description" />
            <TextField source="numberofpet" label="Number of pets" />
            <DateField source="updatedAt" label="Updated at" showTime locales="vi-VN" />
            <TextField source="createdby" label="Created by" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);