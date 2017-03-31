import React, {PropTypes, Component} from 'react';
import {Alert, StyleSheet, TouchableOpacity, ListView, Text, View, ActivityIndicator} from 'react-native';
import {get} from './Api';

class Attachment extends Component {

  constructor(props, context) {
    super(props, context);

    this.renderRow = this.renderRow.bind(this);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.reload = this.reload.bind(this);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: ds.cloneWithRows([])
    };

    this.ds = ds;
  }

  componentWillMount(){
    this.reload();
  }

  reload(){
      get('attachments').then((data)=>{
        this.setState({
          dataSource: this.ds.cloneWithRows(data)
        });
      });
  }

  renderSeparator(sectionID, rowID) {
    return <View key={`${sectionID}-${rowID}`} style={styles.separator} />;
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <View style={styles.attachmentContainer}>
          <Text style={styles.attachmentBody}>
              {rowData.fileName}
          </Text>
      </View>
    );
  }

  render() {
    return (
        <ListView
          style={styles.container}
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf:'stretch'
  },
  separator: {
    marginLeft:25,
    marginRight:25,
    height: 1,
    backgroundColor: '#CCCCCC',
    alignSelf:'stretch'
  },
  attachmentContainer:{
    marginTop:7,
    marginLeft:25,
    marginRight:25,
    alignSelf:'stretch',
  },
  attachmentBody:{
    fontSize:20,
    margin:7
  }
});

export default Attachment;
