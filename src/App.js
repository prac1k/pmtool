import React from 'react';
import { Admin, Resource, EditGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { UsersList } from './components/colegues.js';
import { PostList } from './components/boards'

const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
const App = () => (
        <Admin dataProvider={dataProvider}>
                <Resource name="Users" list={UsersList} edit={EditGuesser}/>
                <Resource name="Posts" list={PostList} edit={EditGuesser}/>
            </Admin>
    );

export default App;
