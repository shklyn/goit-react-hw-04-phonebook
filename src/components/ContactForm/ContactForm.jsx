import { Formik } from 'formik';
import { MainForm, Label, Input, Button } from './ContactForm.styled';
import { useState } from 'react';
import PropTypes from 'prop-types';

export function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onChange = e => {
    e.currentTarget.name === 'name'
      ? setName(e.currentTarget.value)
      : setNumber(e.currentTarget.value);
  };

  const handleSubmit = (values, { resetForm }) => {
    resetForm();
    const userObj = {
      name: name,
      number: number,
    };
    console.log(userObj);
    onSubmit(userObj);
    setName('');
    setNumber('');
  };

  return (
    <Formik initialValues={( name, number )} onSubmit={handleSubmit}>
      <MainForm autoComplete="off">
        <Label>
          Name
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={onChange}
            value={name}
          />
        </Label>
        <Label>
          Number
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={onChange}
            value={number}
          />
        </Label>

        <Button type="submit">Add contact</Button>
      </MainForm>
    </Formik>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};