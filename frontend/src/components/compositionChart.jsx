import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function CompositionChart (props) {
  return (
    <ResponsiveContainer width="100%" height="100%" >
      <BarChart data={ props.data }>
        <Bar dataKey='value' fill='#8884d8' />
      </BarChart>
    </ResponsiveContainer>
  )
}