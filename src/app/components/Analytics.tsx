import Typography from "../common/components/Typography"
import { Platform } from "@prisma/client";
import AnalyticsChart from "./AnalyticsChart";
import { AnalyticsData } from "./types";

const DATA: AnalyticsData[] = [
  {
    linkName: Platform.GITHUB,
    analytics: [
      {
        date: "Dec 5th",
        clicks: "56"
      },
      {
        date: "Dec 6th",
        clicks: "38"
      },
      {
        date: "Dec 7th",
        clicks: "25"
      },
      {
        date: "Dec 8th",
        clicks: "73"
      },
      {
        date: "Dec 9th",
        clicks: "46"
      },
      {
        date: "Dec 10th",
        clicks: "50"
      },
      {
        date: "Dec 11th",
        clicks: "32"
      },
    ]
  },
  {
    linkName: Platform.HASHNODE,
    analytics: [
      {
        date: "Dec 5th",
        clicks: "99"
      },
      {
        date: "Dec 6th",
        clicks: "74"
      },
      {
        date: "Dec 7th",
        clicks: "88"
      },
      {
        date: "Dec 8th",
        clicks: "64"
      },
      {
        date: "Dec 9th",
        clicks: "70"
      },
      {
        date: "Dec 10th",
        clicks: "56"
      },
      {
        date: "Dec 11th",
        clicks: "92"
      },
    ]
  }
];

const Analytics = () => {
  return (
    <div className="overflow-auto">
      <Typography variant="Heading M">Link analytics</Typography>
      <Typography className="mb-12">Get insights on your links and how they are performing.</Typography>

      <div className="grid grid-cols-2">
        {/* TODO: Get DATA from Redux */}
        {DATA.map((el, index) => {
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
