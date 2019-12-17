import React from 'react';
import { Admin, Resource } from 'react-admin';
import './App.css';
import authProvider from './provider/authProvider';
import dataProvider from './provider/dataProvider';
import { ReportList } from './resources/report/ReportList';
import { CategoryList } from './resources/category/CategoryList';
import { TagList } from './resources/tag/TagList';
import { AccountList } from './resources/account/AccountList';
import TagCreate from './resources/tag/TagCreate';
import TagEdit from './resources/tag/TagEdit';
import CategoryEdit from './resources/category/CategoryEdit';
import CategoryCreate from './resources/category/CategoryCreate';

function App() {
  return (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}>
      <Resource
        name="pet-category"
        list={CategoryList}
        edit={CategoryEdit}
        create={CategoryCreate} />
      <Resource
        name="tag"
        list={TagList}
        create={TagCreate}
        edit={TagEdit} />
      <Resource
        name="account"
        list={AccountList} />
      <Resource
        name="report"
        list={ReportList}
      />
    </Admin>
  );
}

export default App;
