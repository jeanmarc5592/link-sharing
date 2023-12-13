import Typography from "../common/components/Typography"
import AnalyticsChart from "./AnalyticsChart";
import { useAppSelector } from "../common/hooks/useAppSelector";

const Analytics = () => {
  const data = useAppSelector((state) => state.analytics.data);

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
