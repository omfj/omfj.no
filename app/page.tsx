import Heading from '@/ui/Heading';
import Main from '@/ui/Main';

const Page = () => {
  return (
    <Main>
      <Heading>Hello, WWW 👋</Heading>
      <div className="flex flex-col gap-3">
        <p>
          My name is Ole Magnus. Currently I am studying Computer Technology at
          the University of Bergen. I am interested in web development, and I
          have a passion for learning new things.
        </p>
        <p>
          I am also a member of echo Webkom at the University of Bergen. Here I
          help develop and maintain the website of echo.
        </p>
        <p>
          When I am not at the computer I enjoy playing video games. I also do
          Tennis during the summer and downhill skiing during the winter.
        </p>
      </div>
    </Main>
  );
};

export default Page;
