import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "~/components/ui/Header";
import { formatToCurrency, formatToTitleCase } from "~/utils";
import { api } from "~/utils/api";

export default function Funds() {
  const funds = api.funds.getAll.useQuery();

  return (
    <div className="container flex max-w-md flex-col items-center justify-center gap-12 px-4 py-10">
      <div className="flex w-full flex-col items-center gap-4">
        <Header
          title="Funds"
          subtitle={"Total: $165,972.35"}
          icon={
            <FontAwesomeIcon
              className="h-6 w-6 text-primary-light hover:text-white"
              icon={faGear}
            />
          }
        />

        {/* Chart block component */}
        <div className="h-64 w-full rounded-xl bg-secondary-med"></div>

        {funds?.data?.map((fund) => (
          <div
            key={fund.id}
            className="group flex w-full flex-col rounded-xl bg-primary-med p-4 hover:bg-primary-light hover:text-primary-dark"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-secondary-dark">
                  <div className="h-5 w-5 rounded-full bg-secondary-med" />
                </div>
                <h3 className="text-xl font-bold">
                  {formatToTitleCase(fund.name)}
                </h3>
              </div>
              <span className="text-xl font-bold text-primary-light group-hover:text-primary-med">
                {formatToCurrency(fund.initial_amount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
