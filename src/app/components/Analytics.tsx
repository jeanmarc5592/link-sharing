import Typography from "../common/components/Typography"
import AnalyticsChart from "./AnalyticsChart";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { useQuery } from "@tanstack/react-query";
import { getLinkAnalytics } from "../services/links";
import { useEffect } from "react";

const Analytics = () => {
  const getLinkAnalyticsQuery = useQuery({
    queryKey: ["linkAnalytics"],
    queryFn: getLinkAnalytics,
  });

  const data = useAppSelector((state) => state.analytics.data);

  useEffect(() => {
    if (!getLinkAnalyticsQuery.data) {
      return;
    }

    // TODO: Dispatch to redux
    console.log(getLinkAnalyticsQuery.data);
  }, [getLinkAnalyticsQuery.data]);

  return (
    <div className="overflow-auto">
      <Typography variant="Heading M">Link analytics</Typography>
      <Typography className="mb-12">Get insights on your links and how they are performing.</Typography>

      {/* TODO: Render UI when no data is there */}

      <div className="grid grid-cols-2">
        {data.map((el, index) => {
          return (
            <div className="mb-10 col-span-2 xl:col-span-1" key={index}>
              <AnalyticsChart data={el} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Analytics
