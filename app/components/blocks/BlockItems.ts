import LogoTailwindCSS from "~/assets/logos/tailwindcss.png";
import LogoPrisma from "~/assets/logos/prisma.png";
import LogoStripe from "~/assets/logos/stripe.png";
import LogoPostmark from "~/assets/logos/postmark.png";
import LogoFormspree from "~/assets/logos/formspree.png";
import LogoConvertKit from "~/assets/logos/convertkit.png";

export type BlockItem = {
  group: string;
  title: string;
  path: string;
  createdAt?: Date;
  integrations?: {
    title: string;
    url: string;
    img?: string;
    className?: string;
  }[];
};

// const groups: { title: string; path: string }[] = [
//   {
//     title: "Forms",
//     path: "/forms",
//   },
//   {
//     title: "Email",
//     path: "/email",
//   },
//   {
//     title: "Subscriptions",
//     path: "/subscriptions",
//   },
//   {
//     title: "Database",
//     path: "/database",
//   },
// ];

export function getAllBlocksByGroup(availableOnly: boolean = false) {
  const groups: { title: string; path: string; items: BlockItem[] }[] = [];
  let blocks: BlockItem[] = getAllBlocks();
  if (availableOnly) {
    blocks = getAllBlocks().filter((f) => f.createdAt);
  }
  blocks.forEach((block) => {
    const group = groups.find((f) => f.title === block.group);
    if (group) {
      group.items.push(block);
    } else {
      groups.push({
        title: block.group,
        path: "/blocks/" + block.group.toLowerCase(),
        items: [block],
      });
    }
  });
  return groups;
}

export function getBlockByPath(path: string) {
  return getAllBlocks().find((f) => f.path === path);
}

export function getAllBlocks(): BlockItem[] {
  return [
    {
      group: "Forms",
      title: "Simple form",
      path: "/blocks/forms/simple-form",
      createdAt: new Date("2022-06-22"),
      integrations: [],
    },
    {
      group: "Forms",
      title: "Form with confirmation dialog",
      path: "/blocks/forms/form-with-confirmation-dialog",
      createdAt: new Date("2022-06-22"),
      integrations: [],
    },
    {
      group: "Forms",
      title: "Multiple forms on one route",
      path: "/blocks/forms/multiple-forms-on-one-route",
      createdAt: new Date("2022-06-22"),
      integrations: [],
    },
    {
      group: "Forms",
      title: "Form with all input types",
      path: "/blocks/forms/form-with-all-input-types",
      createdAt: new Date("2022-06-22"),
      integrations: [],
    },
    {
      group: "Email",
      title: "Contact form with Formspree",
      path: "/blocks/email/contact-form-with-formspree",
      createdAt: new Date("2022-06-22"),
      integrations: [formspree],
    },
    {
      group: "Email",
      title: "Newsletter with ConvertKit",
      path: "/blocks/email/newsletter-with-convertkit",
      createdAt: new Date("2022-06-22"),
      integrations: [convertKit],
    },
    {
      group: "Email",
      title: "Send email with Postmark template",
      path: "/blocks/email/send-email-with-postmark-template",
      createdAt: new Date("2022-06-22"),
      integrations: [postmark],
    },
    {
      group: "Subscriptions",
      title: "Create pricing plans with Stripe",
      path: "/blocks/subscriptions/create-pricing-plans-with-stripe",
      createdAt: new Date("2022-06-22"),
      integrations: [stripe],
    },
    {
      group: "Database",
      title: "Table Pagination with Prisma",
      path: "/blocks/database/table-pagination-with-prisma",
      createdAt: undefined,
      integrations: [prisma],
    },
  ];
}

const tailwindcss = {
  title: "Tailwind CSS",
  url: "https://tailwindcss.com",
  img: LogoTailwindCSS,
  className: "hover:text-teal-500",
};

const prisma = {
  title: "Prisma",
  url: "https://prisma.io/",
  img: LogoPrisma,
  className: "hover:text-indigo-500",
};

const postmark = {
  title: "Postmark",
  url: "https://postmarkapp.com/",
  img: LogoPostmark,
  className: "hover:text-yellow-600",
};

const stripe = {
  title: "Stripe",
  url: "https://stripe.com/",
  img: LogoStripe,
  className: "hover:text-indigo-500",
};

const convertKit = {
  title: "ConvertKit",
  url: "https://convertkit.com/",
  img: LogoConvertKit,
  className: "hover:text-orange-600",
};

const formspree = {
  title: "Formspree",
  url: "https://formspree.io/",
  img: LogoFormspree,
  className: "hover:text-red-600",
};
