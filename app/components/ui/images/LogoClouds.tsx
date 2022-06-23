import LogoReact from "~/assets/logos/react.png";
import LogoTypescript from "~/assets/logos/typescript.png";
import LogoTailwind from "~/assets/logos/tailwindcss.png";
import LogoPrisma from "~/assets/logos/prisma.png";
import LogoStripe from "~/assets/logos/stripe.png";
import LogoPostmark from "~/assets/logos/postmark.png";
import LogoRemix from "~/assets/logos/remix.png";

export default function LogoClouds() {
  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-8 md:grid-cols-4 lg:grid-cols-7">
          <div className="col-span-1 flex justify-center">
            <img className="h-12 object-cover" src={LogoReact} alt="React" />
          </div>
          <div className="col-span-1 flex justify-center">
            <img className="h-12 object-cover" src={LogoTypescript} alt="TypeScript" />
          </div>
          <div className="col-span-1 flex justify-center">
            <img className="h-12 object-cover" src={LogoTailwind} alt="Tailwind CSS" />
          </div>
          <div className="col-span-1 flex justify-center">
            <img className="h-12 object-cover" src={LogoRemix} alt="Remix" />
          </div>
          <div className="col-span-1 flex justify-center">
            <img className="h-12 object-cover" src={LogoPrisma} alt="Prisma" />
          </div>
          <div className="col-span-1 flex justify-center">
            <img className="h-12 object-cover" src={LogoStripe} alt="Stripe" />
          </div>
          <div className="col-span-1 flex justify-center">
            <img className="h-12 object-cover" src={LogoPostmark} alt="Postmark" />
          </div>
        </div>
      </div>
    </div>
  );
}
