import BreadcrumbSimple from "~/components/ui/breadcrumbs/BreadcrumbSimple";

interface Props {
  items: { title: string; routePath: string }[];
}

export default function BlocksBreadcrumb({ items }: Props) {
  return <BreadcrumbSimple menu={[{ title: "Blocks", routePath: "/" }, ...items]} />;
}
