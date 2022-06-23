import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, useTransition } from "remix";
import ButtonSecondary from "../buttons/ButtonSecondary";

interface Props {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
export default function TablePagination({ page, pageSize, totalItems, totalPages }: Props) {
  const { t } = useTranslation();
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  // const submit = useSubmit();
  const transition = useTransition();
  const loading = transition.state === "loading" || transition.state === "submitting";
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setFrom(page * pageSize - pageSize + 1);

    let to = page * pageSize;
    if (to > totalItems) {
      to = totalItems;
    }
    setTo(to);
  }, [page, pageSize, totalItems]);

  function onChange(page: number) {
    // const form = new FormData();
    // form.set("action", "set-page");
    // form.set("page", page.toString());
    // submit(form, { method: "post" });
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  }

  return (
    <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" aria-label="Pagination">
      <div className="hidden sm:block">
        <p className="sm:text-sm text-gray-700">
          <>
            {t("shared.showing")} <span className="font-medium">{totalItems === 0 ? 0 : from}</span> {t("shared.to").toLowerCase()}{" "}
            <span className="font-medium">{to}</span> {t("shared.of").toLowerCase()} <span className="font-medium">{totalItems}</span>{" "}
            {t("shared.results").toLowerCase()}
          </>
        </p>
      </div>
      <div className="flex-1 flex justify-between sm:justify-end space-x-2">
        <ButtonSecondary disabled={page === 1 || loading} onClick={() => onChange(page - 1)}>
          {t("shared.previous")}
        </ButtonSecondary>
        <ButtonSecondary disabled={page >= totalPages || loading} type="button" onClick={() => onChange(page + 1)}>
          {t("shared.next")}
        </ButtonSecondary>
      </div>
    </nav>
  );
}
