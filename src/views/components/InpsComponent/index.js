import React from "react";
import "./index.css";
import { List, Card, Button } from "antd";

const data = [
  {
    title: "Title 1"
  },
  {
    title: "Title 2"
  },
  {
    title: "Title 3"
  },
  {
    title: "Title 4"
  }
];

class InpsComponent extends React.Component {

    render = () => {

        return(

            <List
            grid={{ gutter: 10, column: 4 }}
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <Button 
                    class="button-card"
                    style={{ 
                        backgroundColor: '#026F35', 
                        color: '#fff',
                        height: 'auto'    
                    }}
                >
                  <Card title={item.title}>Card content</Card>
                </Button>
              </List.Item>
            )}
          />

        );
    }


}

export default InpsComponent;

