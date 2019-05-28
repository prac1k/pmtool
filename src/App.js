import React from 'react';
import { Admin, Resource} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { UsersList, UserEdit, UserCreate } from './components/colegues.js';
import { PostList, PostEdit, PostCreate} from './components/boards.js';
import PostIcon from '@material-ui/icons/Work';
import UserIcon from '@material-ui/icons/Face';
import Dashboard from './components/dashboard.js';
import authProvider from './components/authProvider';

const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
const App = () => (
    <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
        <Resource name="users" list={UsersList} edit={UserEdit} create={UserCreate} icon={UserIcon}/>
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon}/>
    </Admin>
);

export default App;
