import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LabelList,
  } from "recharts";
  

export default function LocationStats({clicks}) {
    if(clicks === null || clicks.length === 0){
        return <div className="flex justify-center items-center border-2 border-solid rounded-md p-5 py-10">No Location Stats available yet
        </div>
    }

    const cityCount = clicks.reduce((acc,item)=>{
        if(acc[item.city]){
            acc[item.city] += 1;
        }else acc[item.city] = 1;

        return acc;
    },{})

    const cities = Object.entries(cityCount).map(([city,count]) => ({
        city,
        count,
    }))


    return (
      <ResponsiveContainer width={"100%"} height={300}>
        <LineChart data={cities.slice(0, 5)} margin={{ top: 20 }}>
          <XAxis dataKey="city" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip labelStyle={{color: "green"}}/>
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
          >
            <LabelList position="top" offset={10} />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    );
  }