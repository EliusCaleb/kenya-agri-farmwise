import { Link } from 'react-router-dom';
import { 
  Scan, TrendingUp, ShoppingBag, CloudSun, 
  ArrowUpRight, ArrowDownRight, MessageSquare, Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const quickActions = [
  { icon: Scan, label: 'Scan Crop', path: '/dashboard/disease-detection', color: 'bg-secondary/20 text-secondary' },
  { icon: TrendingUp, label: 'View Prices', path: '/dashboard/market-prices', color: 'bg-accent/20 text-accent' },
  { icon: ShoppingBag, label: 'Marketplace', path: '/dashboard/marketplace', color: 'bg-primary/20 text-primary' },
  { icon: CloudSun, label: 'Weather', path: '/dashboard/weather', color: 'bg-secondary/20 text-secondary' },
];

const stats = [
  { label: 'Active Listings', value: '3', change: '+1', trend: 'up' },
  { label: 'Buyer Messages', value: '5', change: '+2', trend: 'up' },
  { label: 'Profile Views', value: '28', change: '-5', trend: 'down' },
  { label: 'Avg. Price/kg', value: 'KES 45', change: '+7%', trend: 'up' },
];

const recentActivity = [
  { icon: MessageSquare, text: 'New message from Grace Wanjiku about your maize listing', time: '10 min ago' },
  { icon: TrendingUp, text: 'Maize prices increased by 7% in Nakuru', time: '1 hour ago' },
  { icon: CloudSun, text: 'Weather alert: Heavy rain expected tomorrow', time: '2 hours ago' },
  { icon: Calendar, text: 'Reminder: Harvest tomatoes this week', time: '5 hours ago' },
];

const DashboardHome = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Karibu, John! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your farm today.
          </p>
        </div>
        <Link to="/dashboard/marketplace">
          <Button variant="accent">
            <ShoppingBag className="w-4 h-4" />
            Create Listing
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card p-4 md:p-6 rounded-2xl border border-border shadow-card"
          >
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
              <div className={`flex items-center text-sm ${stat.trend === 'up' ? 'text-secondary' : 'text-destructive'}`}>
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.path}
              to={action.path}
              className="flex flex-col items-center p-6 bg-card rounded-2xl border border-border hover:shadow-elevated hover:-translate-y-1 transition-all duration-200"
            >
              <div className={`w-14 h-14 rounded-xl ${action.color} flex items-center justify-center mb-3`}>
                <action.icon className="w-7 h-7" />
              </div>
              <span className="font-medium text-foreground">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity & Weather */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                  <activity.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground">{activity.text}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Widget */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Weather Today</h2>
          <div className="text-center">
            <div className="text-6xl mb-2">⛅</div>
            <p className="text-4xl font-bold text-foreground">24°C</p>
            <p className="text-muted-foreground mb-4">Partly Cloudy</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-muted/50 p-3 rounded-xl">
                <p className="text-muted-foreground">Humidity</p>
                <p className="font-semibold text-foreground">65%</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-xl">
                <p className="text-muted-foreground">Wind</p>
                <p className="font-semibold text-foreground">12 km/h</p>
              </div>
            </div>
            <Link to="/dashboard/weather">
              <Button variant="outline" className="w-full mt-4">
                View Forecast
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
