import React from 'react';
import { SimpleForm, TextInput, Edit, required, ImageField, ImageInput } from 'react-admin';

export default (props) => {
    return (
        <Edit {...props}>
            <SimpleForm>
                <ImageField source="image.url" label="Current Image" />
                <ImageInput
                    source="image"
                    label="Upload image"
                    accept="image/*"
                >
                    <ImageField source="image" label="Upload Image" />
                </ImageInput>
                <TextInput source="name" label="Name" validate={required()} />
                <TextInput source="description" label="Description" validate={required()} />
            </SimpleForm>
        </Edit>
    );
}
