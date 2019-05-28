import React from 'react';
import { List, Datagrid, TextField, ReferenceField, EditButton, Edit, ReferenceInput, SelectInput, TextInput, SimpleForm, Create, DisabledInput, LongTextInput, Filter, Responsive, SimpleList} from 'react-admin';

const TaskFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);
const TaskTitle = ({ record }) => {
    return <span> Task {record ? `"${record.title}"` : ''}</span>;
};

export const TaskList = props => (

    <List filters={<TaskFilter />} {...props}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.title}
                    secondaryText={record => `${record.name} 'name`}
                    tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
                />
            }
            medium={
                <Datagrid>
                    <ReferenceField source="userId" reference="users">
                        <TextField source="name"/>
                    </ReferenceField>
                    <TextField source="title"/>
                    <TextField source="body"/>
                    <EditButton/>
                </Datagrid>
            }
        />
        </List>
    );



export const TaskEdit = props => (
    <Edit title={<TaskTitle />} {...props}>
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

export const TaskCreate = props => (
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

