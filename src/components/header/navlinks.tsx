import NextLink from "next/link";
import { useRouter } from "next/router";

interface Props {
  text: string;
  to: string;
  icon?: any;
}

const NavLinkDesktop = ({ text, to, icon }: Props): JSX.Element => {
  const router = useRouter();
  const active: boolean = router.asPath === to;

  return (
    <NextLink href={to} passHref>
      <a>
        <div
          className={`flex bg-transparent border-b-2 ${
            active ? "border-b-white" : "border-transparent"
          } hover:cursor-pointer`}
        >
          <p className="flex flex-row gap-2 items-center min-w-fit my-2 rounded py-1 px-2 hover:bg-[#333]">
            {icon} {text}
          </p>
        </div>
      </a>
    </NextLink>
  );
};

const NavLinkMobile = ({ text, to }: Props): JSX.Element => {
  const router = useRouter();
  const active: boolean = router.asPath === to;

  return (
    <NextLink href={to} passHref>
      <a>
        <div
          className={`flex ${active ? "underline" : ""} hover:cursor-pointer`}
        >
          <div className="child items-center min-w-fit rounded-md p-2">
            <p className="text-3xl">{text}</p>
          </div>
        </div>
      </a>
    </NextLink>
  );
};

export { NavLinkDesktop, NavLinkMobile };
