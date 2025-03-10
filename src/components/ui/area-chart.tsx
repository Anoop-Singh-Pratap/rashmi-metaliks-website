
import React from "react";
import { Area, AreaChart as RechartsAreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface AreaChartProps {
  data: any[];
  config: {
    [key: string]: {
      label: string;
      color: string;
    };
  };
  height?: number | string;
  className?: string;
  title?: string;
  description?: string;
  timeRanges?: { label: string; value: string }[];
  onTimeRangeChange?: (value: string) => void;
  selectedTimeRange?: string;
}

export const AreaChart = ({
  data,
  config,
  height = 300,
  className = "",
  title,
  description,
}: AreaChartProps) => {
  const chartKeys = Object.keys(config).filter(key => key !== "label");
  
  const renderGradients = () => {
    return chartKeys.map((key) => (
      <linearGradient key={`gradient-${key}`} id={`fill${key}`} x1="0" y1="0" x2="0" y2="1">
        <stop
          offset="5%"
          stopColor={config[key].color}
          stopOpacity={0.8}
        />
        <stop
          offset="95%"
          stopColor={config[key].color}
          stopOpacity={0.1}
        />
      </linearGradient>
    ));
  };

  const formatDateTick = (value: string) => {
    if (!value) return "";
    const date = new Date(value);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatTooltipLabel = (value: string) => {
    return formatDateTick(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-3 rounded shadow-md">
          <p className="text-sm font-medium mb-1">{formatTooltipLabel(label)}</p>
          {payload.map((entry: any, index: number) => (
            <div className="flex items-center" key={`item-${index}`}>
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <p className="text-sm text-muted-foreground">
                {config[entry.dataKey]?.label}: {entry.value}%
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`w-full rounded-xl overflow-hidden ${className}`}>
      {(title || description) && (
        <div className="mb-4 text-left">
          {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart data={data} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
            <defs>
              {renderGradients()}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} vertical={false} />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDateTick}
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--foreground)', fontSize: 12 }} 
              minTickGap={30}
            />
            <YAxis 
              tickFormatter={(value) => `${value}%`}
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--foreground)', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend formatter={(value, entry) => {
              const key = entry.dataKey as string;
              return <span className="text-sm">{config[key]?.label}</span>;
            }} />
            {chartKeys.map((key) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stackId="1"
                stroke={config[key].color}
                fill={`url(#fill${key})`}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            ))}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
