import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts"
import Typography from "../common/components/Typography"
import { Platform } from "@prisma/client"
import { StringUtils } from "@/lib/utils/string";
import { AnalyticsData } from "./types";

interface AnalyticsChartProps {
  data: AnalyticsData;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data }) => {
  const label = StringUtils.capitalize(data.linkName);

  return (
    <>
      <Typography variant="Heading S" className="mb-4">{label}</Typography>

      <LineChart width={650} height={250} data={data.analytics} margin={{ left: -25, right: 16 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="clicks" stroke="#633CFF" />
      </LineChart> 
    </>
  )
}

export default AnalyticsChart
