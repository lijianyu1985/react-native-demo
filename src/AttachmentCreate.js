import React, {PropTypes, Component} from 'react';
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ListView,
  Text,
  View,
  ActivityIndicator,
  NativeModules
} from 'react-native';
import {put} from './Api';

class AttachmentCreate extends Component {

  constructor(props, context) {
    super(props, context);
    this.save = this
      .save
      .bind(this);
    this.pickFile = this
      .pickFile
      .bind(this);
      this.state={};
  }
  save() {
    put('attachment', {
      fileName: this.state.fileName,
      category: this.state.category
    }).then(() => {
      this
        .props
        .navigator
        .pop();
    })
  }
  pickFile() {
    NativeModules.RNDocumentPicker.show({
      filetype: ['*/*']
    }, (error, file) => {
      this.setState({
        fileName:file.fileName
      });
      let formData = new FormData();
      formData.append('file', {uri: file.uri, name: file.fileName, type: 'multipart/form-data'});
      formData.append('category', this.state.category);
      formData.append('fileName', this.state.fileName);
      put('attachment', formData).then(() => {
        this
          .props
          .navigator
          .pop();
      })
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={(fileName) => {
          this.setState({fileName});
        }}
        value={this.state.fileName}
          placeholder="file name"
          style={styles.textInput}/>
        <TextInput
          onChangeText={(category) => {
          this.setState({category});
        }}
        value={this.state.category}
          placeholder="category"
          style={styles.textInput}/>
        <TouchableOpacity onPress={this.save} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.pickFile} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Pick</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    paddingTop: 56
  },
  textInput: {
    fontSize: 20,
    margin: 7
  },
  saveButton: {
    alignSelf: 'stretch',
    margin: 7
  },
  saveButtonText: {
    alignSelf: 'stretch',
    textAlign: 'center',
    backgroundColor: 'green',
    fontSize: 20,
    padding: 15
  }
});

export default AttachmentCreate;
