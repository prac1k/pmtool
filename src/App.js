import React from 'react';
import { Admin, Resource} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { UsersList, UserEdit, UserCreate } from './components/colegues.js';
import { PostList, PostEdit, PostCreate} from './components/boards.js';

const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
const App = () => (
        <Admin dataProvider={dataProvider}>
                <Resource name="users" list={UsersList} edit={UserEdit} create={UserCreate} />
                <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate}/>
            </Admin>
    );

export default App;
