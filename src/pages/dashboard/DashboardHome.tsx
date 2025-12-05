import { Link } from 'react-router-dom';
import {
  Scan, TrendingUp, ShoppingBag, CloudSun,
  ArrowUpRight, ArrowDownRight, MessageSquare, Calendar,
  Store, Heart, Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserProfile } from '@/hooks/use-user-profile';

const farmerQuickActions = [
  { icon: Scan, label: 'Scan Crop', path: '/dashboard/disease-detection', color: 'bg-secondary/20 text-secondary' },
  { icon: TrendingUp, label: 'View Prices', path: '/dashboard/market-prices', color: 'bg-accent/20 text-accent' },
  { icon: ShoppingBag, label: 'Marketplace', path: '/dashboard/marketplace', color: 'bg-primary/20 text-primary' },
  { icon: CloudSun, label: 'Weather', path: '/dashboard/weather', color: 'bg-secondary/20 text-secondary' },
];

const buyerQuickActions = [
  { icon: Store, label: 'Browse Products', path: '/dashboard/marketplace', color: 'bg-primary/20 text-primary' },
  { icon: TrendingUp, label: 'Market Prices', path: '/dashboard/market-prices', color: 'bg-accent/20 text-accent' },
  { icon: CloudSun, label: 'Weather', path: '/dashboard/weather', color: 'bg-secondary/20 text-secondary' },
  { icon: Heart, label: 'Saved Items', path: '/dashboard/marketplace', color: 'bg-destructive/20 text-destructive' },
];

const farmerStats = [
  { label: 'Active Listings', value: '3', change: '+1', trend: 'up' },
  { label: 'Buyer Messages', value: '5', change: '+2', trend: 'up' },
  { label: 'Profile Views', value: '28', change: '-5', trend: 'down' },
  { label: 'Avg. Price/kg', value: 'KES 45', change: '+7%', trend: 'up' },
];

const buyerStats = [
  { label: 'Orders Placed', value: '2', change: '+1', trend: 'up' },
  { label: 'Saved Sellers', value: '8', change: '+3', trend: 'up' },
  { label: 'Products Viewed', value: '42', change: '+12', trend: 'up' },
  { label: 'Avg. Savings', value: '15%', change: '+5%', trend: 'up' },
];

const farmerActivity = [
  { icon: MessageSquare, text: 'New message from Grace Wanjiku about your maize listing', time: '10 min ago' },
  { icon: TrendingUp, text: 'Maize prices increased by 7% in Nakuru', time: '1 hour ago' },
  { icon: CloudSun, text: 'Weather alert: Heavy rain expected tomorrow', time: '2 hours ago' },
  { icon: Calendar, text: 'Reminder: Harvest tomatoes this week', time: '5 hours ago' },
];

const buyerActivity = [
  { icon: Package, text: 'Your order from Kamau Farms is ready for pickup', time: '30 min ago' },
  { icon: TrendingUp, text: 'Price drop on potatoes - now KES 35/kg', time: '1 hour ago' },
  { icon: Store, text: 'New products available from your saved sellers', time: '3 hours ago' },
  { icon: MessageSquare, text: 'Reply from Njeri Greens about bulk order', time: '5 hours ago' },
];

const DashboardHome = () => {
  const { profile, loading } = useUserProfile();

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const userRole = profile?.role || 'farmer';
  const userName = profile?.full_name?.split(' ')[0] || 'User';
  const isBuyer = userRole === 'buyer';
  const quickActions = isBuyer ? buyerQuickActions : farmerQuickActions;
  const stats = isBuyer ? buyerStats : farmerStats;
  const recentActivity = isBuyer ? buyerActivity : farmerActivity;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Karibu, {userName}! 👋
          </h1>
          <p className="text-muted-foreground">
            {isBuyer
              ? "Find fresh produce directly from farmers today."
              : "Here's what's happening with your farm today."
            }
          </p>
        </div>
        <Link to="/dashboard/marketplace">
          <Button variant="accent">
            {isBuyer ? (
              <>
                <Store className="w-4 h-4" />
                Browse Products
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                Create Listing
              </>
            )}
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
              key={action.path + action.label}
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
