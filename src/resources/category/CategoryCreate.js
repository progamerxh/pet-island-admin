import React from 'react';
import { SimpleForm, TextInput, Create, required, ImageInput, ImageField } from 'react-admin';

export default (props) => {
    return (
        <Create {...props}>
            <SimpleForm redirect="list">
                <ImageInput
                    source="image"
                    label="Upload image"
                    accept="image/*"
                >
                    <ImageField source="image" label="Upload Image" />
                </ImageInput>
                {/* <TextInput source="image" label="Name"/> */}
                <TextInput source="name" label="Name" validate={required()} />
                <TextInput source="description" label="Description" validate={required()} />
            </SimpleForm>
        </Create>
    );
}
