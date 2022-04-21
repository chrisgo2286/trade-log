import { 
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export default function ValueChart (props) {
  return (
    <ResponsiveContainer width="100%" height="100%" >
      <AreaChart data={ props.data } margin={{ top:5, right:0, bottom:-25, left:-60 }}>
        <Area dataKey="value" type='monotone' stroke='lightblue' />
        <XAxis dataKey="date" tick={ false }/>
        <YAxis dataKey="value" tick={{ dx: 35 }} />
        <Tooltip />
        <CartesianGrid stroke='grey' strokeOpacity={ .2 } />
      </AreaChart>
    </ResponsiveContainer>
  )
}