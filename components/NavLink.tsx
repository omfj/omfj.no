import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface Props {
  title: string;
  to: string;
}

const NavLink = ({ title, to }: Props) => {
  const router = useRouter();
  const isActive = router.pathname === to;

  return (
    <NextLink className="hover:underline" href={to} passHref>
      <Link fontWeight="semibold" textDecor={isActive ? "underline" : "none"}>
        {title}
      </Link>
    </NextLink>
  );
};

export default NavLink;
