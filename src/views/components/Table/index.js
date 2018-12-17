import React from 'react';
import { Table } from 'antd';
import { Input } from 'antd';
import PropTypes from 'prop-types'; 

const Search = Input.Search;

const RenderedTable = ({
  headers, 
  data, 
  onSelectRow, 
  selectAll, 
  onFilter, 
  selectedRowKeys, 
  isSelectable, 
  onChange,
  pagination,
  onRow,
 }) => {
 const rowSelection = selectedRowKeys ?
 {
    selectedRowKeys,
    onChange: (selectedRowKeys) => onSelectRow(selectedRowKeys),
    hideDefaultSelections: true,
    selections: [{
      key: 'all-data',
      text: 'Seleccionar todo',
      onSelect: () => selectAll(),
    }],
    onSelection: true,
  } : {}

  return (
    <div>
        <Search
            placeholder="Filtrar"
            onSearch={value => onFilter ? onFilter(value) : console.log(value)}
            onChange={event => onFilter ? onFilter(event.target.value) : console.log(event.target.value)}
            enterButton
            style={{ width: '90%' }}
        />
        { isSelectable &&
          <Table 
            rowSelection={rowSelection} 
            columns={headers} 
            dataSource={data} 
            size="small"
            pagination={pagination}
            onChange={onChange}
         /> 
         || 
         <Table 
            columns={headers} 
            dataSource={data} 
            size="small"
            onChange={onChange}
            pagination={pagination}
            onRow={onRow ? onRow : null}
         /> 
        }
    </div>
  );
};

RenderedTable.propTypes = {
   headers: PropTypes.array,
   data: PropTypes.array,
   selectedRows:  PropTypes.array,
   onSelectRow: PropTypes.func,
   onFilter: PropTypes.func, 
   selectAll: PropTypes.func,
   isSelectable: PropTypes.bool,
   onChange: PropTypes.func,
   pagination: PropTypes.object,
   onRow: PropTypes.object,
}

export default RenderedTable;