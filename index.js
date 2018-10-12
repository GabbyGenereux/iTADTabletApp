'use strict';

if (!window.navigator.userAgent) {
  window.navigator.userAgent = "react-native";
}

var SERVER_IP = '192.168.0.44';
var SERVER_PORT = 9000;
var DOCTOR_ID = "doc";
var ITAD_ID = "itad";
var localStream = null;

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  ListView,
  Platform,
} from 'react-native';

import {
    RTCView
    ,RTCMediaStream
    ,MediaStreamTrack
    ,getUserMedia
} from 'react-native-webrtc';

require('./peer.js');

// PeerJS server location
// the ID set for this client
var callerId = ITAD_ID;

var container = null;

// PeerJS object, instantiated when this client connects with its
// caller ID
var peer = null;

//PeerJS object, instantiated when this client makes a call
var call = null;

// the local video stream captured with getUserMedia()
var localStream = null;

// get the local video and audio stream and show preview in the
// "LOCAL" video element
// successCb: has the signature successCb(stream); receives
// the local video stream as an argument
function getLocalStream(callback) {
    getUserMedia({
        audio: true
        ,video: {
            madatory: {
                minWidth: 640
                ,minHeight: 360
                ,minFrameRate: 30
            }, facingMode: "user"
        }
    }, (stream) => {
        callback(stream);
    }, () => {});
}

// set caller ID and connect to the PeerJS server

class TabletApp3 extends Component {
  constructor() {
      super();
      this.state ={
          viewSrc: null
          ,msg: null
          ,remoteSrc: null
      };
  }
  
  componentDidMount() {
    container = this;
    peer = new Peer(callerId, {host: SERVER_IP, port: SERVER_PORT, debug: 2});
    peer.socket._socket.onclose = () => {
        alert('No connection');
        peer = null;
    };
    peer.socket._socket.onopen = () => {
        getLocalStream(function(stream) {
            localStream = stream;
            container.setState({viewSrc: stream.toURL()});
        });
    };
    peer.on('call', (call) => {
        call.on('stream', (stream) => {
            alert('streaman');
            container.setState({remoteSrc: stream.toURL()});
        });
        call.answer(localStream);
    });
  }
  
  render() {
    return(
      <View style={{flex: 1, alignSelf: 'stretch'}}>
        <RTCView
            key={1}
            streamURL={this.state.remoteSrc}
            style={{flex:1}}/>
      </View>

    );
  }
}

AppRegistry.registerComponent('TabletApp3', () => TabletApp3);
