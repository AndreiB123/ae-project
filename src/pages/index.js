import React, { Component } from 'react';
import Main from '../components/main';
import * as firebase from '../../node_modules/firebase';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FirebaseConfig } from '../config/firebase_config';
import * as axios from '../../node_modules/axios';

class App extends Component {
  state = {
    firebaseInstance: null,
    db: null,
    user: null,
    users: [],
    storage: null
  };

  constructor(props) {
    super(props);
  }

  askForPermissioToReceiveNotifications = async () => {
    try {
      const messaging = firebase.messaging();
      await messaging.requestPermission();
      const token = await messaging.getToken();
      console.log('Token:', token);
      console.log(this.state.user);
      this.state.db.collection("Utilizator")
            .doc(this.state.user.uid)
            .set({
                token: token
            }, { merge: true })
            .then(function (docRef) {
                // console.log("Document written with ID: ", docRef.id);
            }).catch(function (error) {
                console.error("Error adding document: ", error);
            });


      return token;
    } catch (error) {
      console.error(error);
    }
  }

  sendNotification = (token, title, body, icon) => {
    axios.post('https://fcm.googleapis.com/fcm/send', {
      "notification": {
        "title": title,
        "body": body,
        "click_action": "https://localhost:8000",
        "icon": icon,
        // actions: [
        //   {
        //     action: 'explore', title: 'Explore this new world',
        //     icon: 'https://png.icons8.com/search'
        //   },
        //   {
        //     action: 'close', title: 'Close notification',
        //     icon: 'https://png.icons8.com/search'
        //   },
        // ],
        //   "tag": "test"
      },
      "to": token
    },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'key=AAAAq9Dx9sU:APA91bEBXP3BdtwTtFfId0XpEjD1u01c86gCaQoNFqCgNGy8qxI01OFElT1dNfMgWQbiMXFehuT0w256jlWflTR_Qepi1TbaRmlRU8rbwKs0l_kK5_05k9sRiNwJbecJ5mjY2lulxqbU'
        }
      }
    )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getFirebase = () => {
    return this.state.firebaseInstance;
  }

  handleLogin = (email, password) => {
    const self = this;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      console.log(error);
      alert(error.message);
    });
  }

  handleLogout = () => {
    firebase.auth().signOut().then(function () {
      console.log("Sign out success.")
    }).catch(function (error) {
      console.error("Sign out error: " + error);
    });
  }

  componentDidMount() {
    if (this.state.firebaseInstance === null) {
      const firebaseInstance = firebase.initializeApp(FirebaseConfig);
      const db = firebase.firestore();
      const storage = firebase.storage();
      const users = [];
      const self = this;
      firebase.auth().onAuthStateChanged(function (user) {
        self.setState({ user });
        // self.forceUpdate();
      });
      db.settings({
        timestampsInSnapshots: true
      });
      this.setState({ db, firebaseInstance, storage });
      db.collection("Utilizator").get().then((querySnapshot) => {

        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          let docLocal = doc.data();
          users.push(docLocal);
          console.log(docLocal);
          console.log(users);
          self.setState({
            users: users
          });
        });
      });

      this.forceUpdate();
    }
  }

  render() {
    const { firebaseInstance, db, user, users, storage } = this.state;
    return (
      <Main storage={storage} sendNotification={this.sendNotification} askPermission={this.askForPermissioToReceiveNotifications} users={users} handleLogout={this.handleLogout} handleLogin={this.handleLogin} firebase={firebaseInstance} db={db} user={user} getFirebase={this.getFirebase}></Main>
    );
  }
}

export default App;
