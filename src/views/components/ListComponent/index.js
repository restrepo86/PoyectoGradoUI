import React from 'react';
import { List } from 'antd';

const ListComponent = ({ listConfig, dataSet }) => (
  <List
    itemLayout="horizontal"
    dataSource={listConfig}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          title={item.title}
          description={dataSet[item.value]}
        />
      </List.Item>
    )}
  />
);

export default ListComponent;
