/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator
} from 'react-native';
import AttachmentList from './src/AttachmentList';
import AttachmentCreate from './src/AttachmentCreate';

export default class demo extends Component {

  constructor(props, context) {
    super(props, context);

    this.reloadAttachments = this
      .reloadAttachments
      .bind(this);
    this.gotoCreatePage = this
      .gotoCreatePage
      .bind(this);
    this.renderRoute = this
      .renderRoute
      .bind(this);
  }

  reloadAttachments() {
    if (this.attachment && this.attachment.reload) {
      this
        .attachment
        .reload();
    }
  }

  gotoCreatePage(navigator) {
    navigator.push({title: 'Create Attachment', index: 1});
  }

  renderRoute(route, navigator) {
    if (route.index === 1) {
      return <AttachmentCreate navigator={navigator}/>
    } else {
      return <View style={styles.container}>
        <AttachmentList
          ref={(attachment) => {
          this.attachment = attachment;
        }}/>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.buttonLeft}
            onPress={() => {
            this.reloadAttachments();
          }}>
            <Text style={styles.button}>Load</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonRight}
            onPress={() => {
            this.gotoCreatePage(navigator);
          }}>
            <Text style={styles.button}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>;
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{
        title: 'Attachments',
        index: 0
      }}
        renderScene={(route, navigator) => {
        return this.renderRoute(route, navigator);
      }}
        style={{
        padding: 0
      }}
        navigationBar={<Navigator.NavigationBar routeMapper = {
        {
          LeftButton: (route, navigator, index, navState) => {
            if (route.index === 0) {
              return null;
            } else {
              return (
                <TouchableOpacity
                  style={styles.navBackContainer}
                  onPress={() => navigator.pop()}>
                  <Text style={styles.navBack}>Back</Text>
                </TouchableOpacity>
              );
            }
          },
          RightButton: (route, navigator, index, navState) => {
            return <Text></Text>;
          },
          Title: (route, navigator, index, navState) => {
            return (
              <Text style={styles.navTitle}>
                {route.title}
              </Text>
            );
          }
        }
      }
      style = {
        {
          backgroundColor: 'gray'
        }
      } />}/>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop:56,
  },
  bottom: {
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  buttonLeft: {
    flex: 0.5,
    backgroundColor: 'green'
  },
  buttonRight: {
    flex: 0.5,
    backgroundColor: 'yellow'
  },
  button: {
    alignSelf: 'stretch',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  navBackContainer: {
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  navBack: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    textAlign: 'center',
    fontSize: 20,
    margin: 5
  },
  navTitle: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    textAlign: 'center',
    fontSize: 20,
    margin: 5
  }
});

AppRegistry.registerComponent('demo', () => demo);
