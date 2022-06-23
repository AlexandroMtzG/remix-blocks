import LogoReact from "~/assets/logos/colors/react.png";
import LogoTailwind from "~/assets/logos/colors/tailwindcss.png";
import LogoPrisma from "~/assets/logos/colors/prisma.png";
import LogoPrismaDark from "~/assets/logos/colors/prisma-dark.png";
import LogoStripe from "~/assets/logos/colors/stripe.png";
import LogoPostmark from "~/assets/logos/colors/postmark.png";
import LogoRemix from "~/assets/logos/colors/remix.png";
import LogoRemixDark from "~/assets/logos/colors/remix-dark.png";

export default function LogoCloudsColor() {
  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-3">
          <div className="col-span-1 flex justify-center order-none">
            <a href="https://tailwindcss.com/">
              <img className="h-20 object-cover" src={LogoTailwind} alt="Tailwind CSS" />
            </a>
          </div>
          <div className="col-span-1 flex justify-center order-first sm:order-none">
            <a href="https://remix.run/">
              <img className="h-20 object-cover dark:hidden" src={LogoRemix} alt="Remix" />
              <img className="h-20 object-cover hidden dark:block" src={LogoRemixDark} alt="Remix" />
            </a>
          </div>
          <div className="col-span-1 flex justify-center order-none">
            <a href="https://www.prisma.io/">
              <img className="h-20 object-cover dark:hidden" src={LogoPrisma} alt="Remix" />
              <img className="h-20 object-cover hidden dark:block" src={LogoPrismaDark} alt="Remix" />
            </a>
          </div>
          <div className="col-span-1 flex justify-center order-none">
            <a href="https://reactjs.org/">
              <img className="h-20 object-cover" src={LogoReact} alt="React" />
            </a>
          </div>
          <div className="col-span-1 flex justify-center order-none">
            <a href="https://stripe.com/">
              <img className="h-20 object-cover" src={LogoStripe} alt="Stripe" />
            </a>
          </div>
          <div className="col-span-1 flex justify-center order-none">
            <a href="https://postmarkapp.com/">
              <img className="h-20 object-cover" src={LogoPostmark} alt="Postmark" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
