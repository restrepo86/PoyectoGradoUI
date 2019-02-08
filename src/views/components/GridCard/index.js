import React from 'react';
import { Card } from 'antd';

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

class GridCard extends React.Component {


    render() {
        return(
            <Card title="Programas">
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
            </Card>
        );
    }
    

}

export default GridCard;

  