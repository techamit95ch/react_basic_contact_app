import React, { Component } from "react";
import ListContacts from "./ListContacts";
import CreateContact from "./CreateContact";
import * as ContactsAPI from "./utils/contactsAPI";
import { Route } from "react-router-dom";
// import logo from "./logo.svg";
// import "./App.css";
class App extends Component {
  state = {
    contacts: [],
    screens: "list",
  };
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState(() => ({ contacts }));
    });
  }
  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id;
      }),
    }));
    ContactsAPI.remove(contact);
  };
  removeContact2 = (id) => {
    this.setState({
      contacts: [...this.state.contacts.filter((ct) => ct.id !== id.id)],
    });
  };
  createContact = (contact) => {
    ContactsAPI.create(contact).then(() => {
      this.setState((currentState) => {
        contacts: currentState.contacts.concat([contact]);
      });
    });
  };
  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.removeContact}
              onNavigate={() => {
                this.setState({ screens: "create" });
              }}
            />
          )}
        />
        <Route
          path="/create"
          render={({ history }) => (
            <CreateContact
              onCreateContact={(contact) => {
                this.createContact(contact);
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
