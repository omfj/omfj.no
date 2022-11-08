import ContactBox from '@/ui/ContactBox';
import Heading from '@/ui/Heading';
import Main from '@/ui/Main';
import { getContactInfo } from './contact';

const Page = () => {
  const cs = getContactInfo();

  return (
    <Main>
      <Heading>Contact page</Heading>
      <p>My contact page.</p>
      <ul className="my-3 flex flex-col gap-4">
        {cs.map((c) => (
          <li key={c.title}>
            <ContactBox {...c} />
          </li>
        ))}
      </ul>
      <div className="text-center">
        <p>My PGP key ID:</p>
        <a className="text-blue-500 hover:underline" href="/pgp-key.asc">
          CA2C 0707 5170 9E32 343F 6D58 A20C 4384 0D84 1F41
        </a>
      </div>
    </Main>
  );
};

export default Page;
