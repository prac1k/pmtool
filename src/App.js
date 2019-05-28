import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { UsersList } from './components/colegues.js';

const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
const App = () => (
        <Admin dataProvider={dataProvider}>
                <Resource name="Users" list={UsersList} />
                <Resource name="Boards" list={ListGuesser} />
                <Resource name="My Cards" list={ListGuesser} />
            </Admin>
    );

export default App;
