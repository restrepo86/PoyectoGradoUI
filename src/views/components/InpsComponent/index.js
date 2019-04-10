import React from "react";
import { Link } from 'react-router-dom';
import "./index.css";
import { List, Card, Button } from "antd";

const data = [
  {
    title: "INP 1"
  },
  {
    title: "INP 2"
  },
  {
    title: "INP 3"
  },
  {
    title: "INP 4"
  }
];

class InpsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.dataListComponent = this.props.stores.dataListComponent;
  }

  componentDidMount = () => {
    this.dataListComponent.setProgramClickSuccess(false);
  }


    render = () => {
      console.log('program ', this.dataListComponent.programClickData)
        return(

            <List
            grid={{ gutter: 10, column: 4 }}
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <Button 
                    style={{ 
                        backgroundColor: '#026F35', 
                        color: '#fff',
                        height: 'auto'    
                    }}
                >
                  <Link to="/main/programs/inps/studyplan">
                    <Card title={item.title}>Card content</Card>
                  </Link>
                </Button>
              </List.Item>
            )}
          />

        );
    }


}

export default InpsComponent;

