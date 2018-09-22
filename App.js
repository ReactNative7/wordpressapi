import React from 'react';
import { StyleSheet, Text, View, FlatList, WebView  } from 'react-native';
import { Container, Header,Content, Form, Item, Input, Label, Button} from 'native-base';
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {userdata:'',url:'',maindata:[]}
  }
  render() {
    return (     
      <Container>
        <Header />
        <Content>
          {this.newFunc()}
          <Text style={{marginTop:30,marginBottom:30,textAlign:'center'}}>Enter Wordpress website url to get posts data</Text>
          <Item floatingLabel>
            <Label>Enter URL</Label>
            <Input
              onChangeText={(text) => this.setState({url:text})}
            />
          </Item>
          <Button success block
            onPress = {this.getData.bind(this)}
          >
            <Text>Click Me</Text>
          </Button>
        </Content>
      </Container> 
    );
  }
  getData(){
    fetch(this.state.url+'/wp-json/wp/v2/posts')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({userdata:responseJson})
      let arr = [];
      this.state.userdata.map((values) => {
        arr.push({id:values.id,title:values.title.rendered,date:values.date,content:values.content.rendered});
      })
      this.setState({maindata:arr});
    });
  }
  newFunc(){
    if(this.state.maindata.length > 0){
      return this.state.maindata.map((abcd,i) => {
        return (
          <View style={{flex:1,backgroundColor:'#c6ffc8',margin:10, padding:10}}>
            <Text style={{fontSize:20,textAlign:'left'}} key={i}>{abcd.title}</Text>
            <Text>{abcd.date}</Text>
          </View>
        )
      });
    }else{
      return (
        <View style={{flex:1,backgroundColor:'#c6ffc8',margin:10, padding:10}}>
          <Text style={{fontSize:20,textAlign:'left'}} >URL Should be started from http://</Text>
        </View>
      )
    }
  }
}
