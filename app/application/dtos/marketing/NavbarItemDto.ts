export interface NavbarItemDto {
  title: string;
  path?: string;
  description?: string;
  className?: string;
  items?: NavbarItemDto[];
}
