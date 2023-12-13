import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, ResponsiveContainer } from "recharts"
import Typography from "../common/components/Typography"
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

      <ResponsiveContainer width="90%" aspect={2}>
        <LineChart height={250} data={data.analytics} margin={{ left: -25, right: 16 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis type="number" domain={[0, 400]} allowDataOverflow />
          <Tooltip />
          <Line type="monotone" dataKey="clicks" stroke="#633CFF" />
        </LineChart>  
      </ResponsiveContainer> 
    </>
  )
}

export default AnalyticsChart
