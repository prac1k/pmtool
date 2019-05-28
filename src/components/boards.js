import React from 'react';
import { List, Datagrid, TextField, ReferenceField, EditButton, Edit, ReferenceInput, SelectInput, TextInput, SimpleForm, Create, DisabledInput, LongTextInput, Filter} from 'react-admin';

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);
const PostTitle = ({ record }) => {
    return <span> Post {record ? `"${record.title}"` : ''}</span>;
};

export const PostList = props => (
    <List filters={<PostFilter />} {...props}>
                <Datagrid>
                <ReferenceField source="userId" reference="users">
                    <TextField source="name" />
                </ReferenceField>
                <TextField source="title" />
                <TextField source="body" />
                <EditButton />
            </Datagrid>
        </List>
    );



export const PostEdit = props => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <ReferenceInput source="userId" reference="users"><SelectInput optionText="id" />
            </ReferenceInput>
            <LongTextInput source="body" />
            <TextInput source="name" />
            <TextInput source="title" />
            <TextInput source="body" />
        </SimpleForm>
    </Edit>
);

export const PostCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <LongTextInput source="body" />
        </SimpleForm>
    </Create>
);

