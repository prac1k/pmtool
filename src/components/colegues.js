import React from 'react';
import CompanySiteField from './CompanySiteField';
import { List, Datagrid, TextField, EmailField} from 'react-admin';

    export const UsersList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name"/>
            <EmailField source="email" />
            <TextField source="phone" />
            <CompanySiteField source="website" />
            <TextField source="company.name" />
        </Datagrid>
    </List>
);
