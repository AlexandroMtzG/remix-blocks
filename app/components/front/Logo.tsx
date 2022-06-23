import LogoLight from "~/assets/img/logo-light.png";
import LogoDark from "~/assets/img/logo-dark.png";
import clsx from "clsx";
import { Link } from "@remix-run/react";

interface Props {
  className?: string;
  size?: string;
}

export default function Logo({ className = "", size = "h-9" }: Props) {
  return (
    <Link to="/" className={clsx(className, "flex")}>
      {/* <BrandLogo className="h-10 w-auto mx-auto" /> */}
      <img className={clsx(size, "hidden dark:block w-auto mx-auto")} src={LogoDark} alt="Logo" />
      <img className={clsx(size, "dark:hidden w-auto mx-auto")} src={LogoLight} alt="Logo" />
    </Link>
  );
}
