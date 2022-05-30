import NextLink from "next/link";
import { useRouter } from "next/router";

interface Props {
  text?: string;
  to: string;
  icon?: any;
  isOpen?: void;
  open?: boolean;
}

const NavLinkDesktop = ({ text, to, icon }: Props): JSX.Element => {
  const router = useRouter();
  const active: boolean = router.asPath === to;

  return (
    <NextLink href={to} passHref>
      <a>
        <div
          className={`flex bg-transparent border-b-2 ${
            active
              ? "border-b-neutral-900 dark:border-b-slate-50"
              : "border-transparent"
          } hover:cursor-pointer`}
        >
          <p
            className={`flex flex-row gap-2 text-2xl items-center min-w-fit my-2 rounded py-1 px-2 transition-colors hover:text-neutral-900 dark:hover:text-slate-50 ${
              active
                ? "text-neutral-900 dark:text-slate-50"
                : "text-neutral-500 dark:text-gray-400"
            } `}
          >
            {icon} {text}
          </p>
        </div>
      </a>
    </NextLink>
  );
};

interface NavLinksMobileProps {
  text?: string;
  to: string;
  icon?: any;
  isOpen(open: boolean): void;
  open: boolean;
}

const NavLinkMobile = ({
  text,
  to,
  isOpen,
  open,
}: NavLinksMobileProps): JSX.Element => {
  const router = useRouter();
  const active: boolean = router.asPath === to;

  return (
    <NextLink href={to} passHref>
      <a className="w-fit flex" onClick={() => void isOpen(!open)}>
        <div className="hover:cursor-pointer">
          <div className="items-center min-w-fit rounded-md p-2">
            <p
              className={`text-5xl hover:underline ${
                active ? "underline" : ""
              }`}
            >
              {text}
            </p>
          </div>
        </div>
      </a>
    </NextLink>
  );
};

interface IconLinkProps {
  to: string;
  icon: any;
  isMobile?: boolean;
}

const IconLink = ({ to, icon, isMobile }: IconLinkProps) => (
  <NextLink href={to} passHref>
    <a>
      <div
        className={`w-fit transition-colors dark:text-gray-400 ${
          isMobile
            ? "text-neutral-900 dark:text-slate-50 p-2"
            : "text-neutral-500"
        } hover:text-neutral-900 dark:hover:text-slate-50 hover:cursor-pointer`}
      >
        {icon}
      </div>
    </a>
  </NextLink>
);

export { NavLinkDesktop, NavLinkMobile, IconLink };
