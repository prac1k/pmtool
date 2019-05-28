import React from 'react';
import { List, Datagrid, TextField, EmailField, EditButton, Edit, SimpleForm, TextInput, Create, DisabledInput, Filter, ReferenceInput, SelectInput, Responsive, SimpleList} from 'react-admin';

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="Phone" source="phone" reference="users" allowEmpty>
            <SelectInput optionText="phone" />
        </ReferenceInput>
        <ReferenceInput label="Email" source="email" reference="users" allowEmpty>
            <SelectInput optionText="email" />
        </ReferenceInput>
        <ReferenceInput label="Site" source="website" reference="users" allowEmpty>
            <SelectInput optionText="website" />
        </ReferenceInput>
    </Filter>
);

export const UsersList = props => (
    <List filters={<UserFilter />} {...props}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.name}
                    secondaryText={record => `${record.email} email`}
                    tertiaryText={record => `${record.companyname} companyname`}
                />
            }
            medium={
                <Datagrid rowClick="edit">
                    <TextField source="name"/>
                    <EmailField source="email"/>
                    <TextField source="phone"/>
                    <TextField source="website"/>
                    <TextField source="companyname"/>
                    <EditButton/>
                </Datagrid>
            }
            />
    </List>
);
const UserTitle = ({ record }) => {
    return <span>User {record ? `"${record.name}"` : ''}</span>;
};
export const UserEdit = props => (
    <Edit title={<UserTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
            <TextInput source="username" />
            <TextInput source="email" />
            <TextInput source="address_street" />
            <TextInput source="phone" />
            <TextInput source="website" />
            <TextInput source="companyname" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="username" />
            <TextInput source="email" />
            <TextInput source="address_street" />
            <TextInput source="phone" />
            <TextInput source="website" />
            <TextInput source="companyname" />
        </SimpleForm>
    </Create>
);
