import React from 'react';
import { SimpleForm, TextInput, Edit, required } from 'react-admin';

export default (props) => {
    return(
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="image"  label="Image" validate={required()}/>
            <TextInput source="name"  label="Name" validate={required()}/>
            <TextInput source="description"  label="Description" validate={required()}/>
        </SimpleForm>
    </Edit>
);}
