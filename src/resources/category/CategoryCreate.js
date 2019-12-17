import React from 'react';
import { SimpleForm, TextInput, Create, required } from 'react-admin';

export default (props) => {
    return(
    <Create {...props}>
        <SimpleForm redirect="list">
            {/* <TextInput source="image"  label="Image" validate={required()}/> */}
            <TextInput source="name"  label="Name" validate={required()}/>
            <TextInput source="description"  label="Description" validate={required()}/>
        </SimpleForm>
    </Create>
);}
