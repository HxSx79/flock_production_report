import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LineGraphProps {
  title: string;
  data: Array<{ time: string; value: number }>;
  color: string;
}

export const LineGraph: React.FC<LineGraphProps> = ({ title, data, color }) => {
  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke={color} name="Production Rate" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};