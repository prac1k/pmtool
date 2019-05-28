import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { UsersList } from './components/colegues.js';
import { BoardsList } from './components/boards'

const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
const App = () => (
        <Admin dataProvider={dataProvider}>
                <Resource name="Users" list={UsersList} />
                <Resource name="Boards" list={BoardsList} />
            </Admin>
    );

export default App;
