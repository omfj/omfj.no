import { MdMail } from 'react-icons/md';
import { AiOutlineGithub, AiOutlineLinkedin } from 'react-icons/ai';
import { SiKeybase } from 'react-icons/si';
import { IconType } from 'react-icons';

export interface Contact {
  title: string;
  name: string;
  url: string;
  icon: IconType;
}

export function getContactInfo(): Array<Contact> {
  return [
    {
      title: 'Email',
      name: 'hei@omfj.no',
      url: 'mailto:hei@omfj.no',
      icon: MdMail,
    },
    {
      title: 'GitHub',
      name: 'omfj',
      url: 'https://github.com/omfj',
      icon: AiOutlineGithub,
    },
    {
      title: 'LinkedIn',
      name: 'omfj',
      url: 'https://www.linkedin.com/in/omfj/',
      icon: AiOutlineLinkedin,
    },
    {
      title: 'Keybase',
      name: 'omfj',
      url: 'https://keybase.io/omfj',
      icon: SiKeybase,
    },
  ];
}
