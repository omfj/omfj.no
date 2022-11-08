import { Contact } from 'app/contact/contact';
import React from 'react';

const ContactBox = ({ title, name, url, icon }: Contact) => (
  <a href={url}>
    <div className="flex flex-row items-center justify-center gap-2 rounded-md border py-3">
      {React.createElement(icon, { size: 24 })}
      <p>{title}:</p>
      <p>{name}</p>
    </div>
  </a>
);

export default ContactBox;
