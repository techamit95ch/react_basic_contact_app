import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
export class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
  };
  state = { query: "" };
  updateQuery = (q) => {
    this.setState({ query: q.trim() });
  };
  clearQuery = () => {
    this.updateQuery("");
  };
  render() {
    const { query } = this.state;
    const { contacts, onDeleteContact } = this.props;
    const showingContacts =
      query === ""
        ? contacts
        : contacts.filter((contact) =>
            contact.name.toLowerCase().includes(query.toLowerCase())
          );
    return (
      <div className="list-contacts">
        {JSON.stringify(this.state)}
        <div className="list-contact-top">
          <input
            className="search-contacts"
            value={query}
            onChange={(e) => this.updateQuery(e.target.value)}
          />
          <Link
            to="/create"
            className="add-contact"
            // onClick={onNavigate}
          >
            Add Contact
          </Link>
        </div>
        {showingContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>
              {" "}
              Now showing {showingContacts.length} of {contacts.length}
            </span>
            <button className="show-all-contact" onClick={this.clearQuery}>
              Show All
            </button>
          </div>
        )}
        <ol className="contact-list">
          {showingContacts.map((contact) => (
            <li key={contact.id} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{
                  backgroundImage: `url(${contact.avatarUrl})`,
                }}
              ></div>
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.handle}</p>
              </div>
              <button
                className="contact-remove"
                onClick={() => onDeleteContact(contact)}
              >
                X
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default ListContacts;
