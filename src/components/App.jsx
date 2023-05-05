import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Section } from 'components/Section/Section';
import { ContactForm } from 'components/ContactForm/ContactForm';
import Notiflix from 'notiflix';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { Filter } from 'components/Filter/Filter';

export function App() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [visibleContacts, setVisibleContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );

  useEffect(() => {
    setVisibleContacts(getVisibleContacts(contacts, filter));
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts, filter]);

  const getVisibleContacts = (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const addContact = values => {
    for (const contact of contacts) {
      if (
        values.name.toLowerCase() === contact.name.toLowerCase() ||
        values.number === contact.number
      ) {
        return Notiflix.Notify.failure(`${values.name} is already in contact`);
      }
    }
    // setContacts(prevState => [...prevState, { id: nanoid(), ...values }]);
    setContacts([...contacts, { ...values, id: nanoid() }]);

    Notiflix.Notify.success('The contact has been added to the contact list.');
  };

  const deleteContact = (contactId, contactName) => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
    Notiflix.Notify.success(`Contact ${contactName} deleted successfully`);
  };

  const onChangeFind = e => {
    setFilter(e.target.value);
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Section>

      <Section title="Contacts">
        <Filter onChangeFind={onChangeFind} value={filter} />
        <ContactsList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      </Section>
    </>
  );
}
