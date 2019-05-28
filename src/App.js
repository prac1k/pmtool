import React from 'react';
import { Admin, Resource} from 'react-admin';
import { UsersList, UserEdit, UserCreate } from './components/colegues.js';
import { TaskList, TaskEdit, TaskCreate} from './components/boards.js';
import TaskIcon from '@material-ui/icons/Work';
import UserIcon from '@material-ui/icons/Face';
import Dashboard from './components/dashboard.js';
import authProvider from './components/authProvider';
import dataProvider from './components/dataProvider';

const App = () => (
    <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
        <Resource name="users" list={UsersList} edit={UserEdit} create={UserCreate} icon={UserIcon}/>
        <Resource name="tasks" list={TaskList} edit={TaskEdit} create={TaskCreate} icon={TaskIcon}/>
    </Admin>
);

export default App;
