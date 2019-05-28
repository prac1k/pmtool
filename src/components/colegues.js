import React from 'react';
import CompanySiteField from './CompanySiteField';
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
        <ReferenceInput label="Company Name" source="company.name" reference="users" allowEmpty>
            <SelectInput optionText="company.name" />
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
                    tertiaryText={record => `${record.company.name} company.name`}
                />
            }
            medium={
                <Datagrid rowClick="edit">
                    <TextField source="name"/>
                    <EmailField source="email"/>
                    <TextField source="phone"/>
                    <CompanySiteField source="website"/>
                    <TextField source="company.name"/>
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
            <TextInput source="address.street" />
            <TextInput source="phone" />
            <TextInput source="website" />
            <TextInput source="company.name" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="username" />
            <TextInput source="email" />
            <TextInput source="address.street" />
            <TextInput source="phone" />
            <TextInput source="website" />
            <TextInput source="company.name" />
        </SimpleForm>
    </Create>
);
