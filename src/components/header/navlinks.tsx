import NextLink from "next/link";
import { useRouter } from "next/router";

interface Props {
  text?: string;
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
            active ? "border-b-slate-50" : "border-transparent"
          } hover:cursor-pointer`}
        >
          <p
            className={`flex flex-row gap-2 text-2xl items-center min-w-fit my-2 rounded py-1 px-2 transition-colors dark:text-gray-400 text-neutral-500 hover:text-neutral-900 dark:hover:text-slate-50 ${
              active && "text-slate-50"
            } `}
          >
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
        <div className="hover:cursor-pointer flex">
          <div className="child items-center min-w-fit rounded-md p-2">
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

export { NavLinkDesktop, NavLinkMobile };
