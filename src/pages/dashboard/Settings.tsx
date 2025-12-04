import { useState } from 'react';
import { User, Bell, Globe, Shield, HelpCircle, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: 'John Kamau',
    email: 'john.kamau@example.com',
    phone: '+254 700 123 456',
    county: 'Nakuru',
    farmSize: '5',
  });

  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    weatherAlerts: true,
    newMessages: true,
    marketUpdates: false,
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Profile Information
        </h2>
        
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-2xl font-bold text-foreground">
              JK
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <p className="font-medium text-foreground">{profile.name}</p>
            <p className="text-sm text-muted-foreground">Farmer • Member since Jan 2024</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="county">County</Label>
            <Input
              id="county"
              value={profile.county}
              onChange={(e) => setProfile({ ...profile, county: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="farmSize">Farm Size (acres)</Label>
            <Input
              id="farmSize"
              type="number"
              value={profile.farmSize}
              onChange={(e) => setProfile({ ...profile, farmSize: e.target.value })}
            />
          </div>
        </div>

        <Button variant="accent" className="mt-6">
          Save Changes
        </Button>
      </div>

      {/* Notifications Section */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notification Preferences
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-foreground">Price Alerts</p>
              <p className="text-sm text-muted-foreground">Get notified when prices change significantly</p>
            </div>
            <Switch
              checked={notifications.priceAlerts}
              onCheckedChange={(checked) => setNotifications({ ...notifications, priceAlerts: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between py-2 border-t border-border">
            <div>
              <p className="font-medium text-foreground">Weather Alerts</p>
              <p className="text-sm text-muted-foreground">Receive severe weather warnings</p>
            </div>
            <Switch
              checked={notifications.weatherAlerts}
              onCheckedChange={(checked) => setNotifications({ ...notifications, weatherAlerts: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between py-2 border-t border-border">
            <div>
              <p className="font-medium text-foreground">New Messages</p>
              <p className="text-sm text-muted-foreground">Get notified of new buyer messages</p>
            </div>
            <Switch
              checked={notifications.newMessages}
              onCheckedChange={(checked) => setNotifications({ ...notifications, newMessages: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between py-2 border-t border-border">
            <div>
              <p className="font-medium text-foreground">Market Updates</p>
              <p className="text-sm text-muted-foreground">Weekly market summary emails</p>
            </div>
            <Switch
              checked={notifications.marketUpdates}
              onCheckedChange={(checked) => setNotifications({ ...notifications, marketUpdates: checked })}
            />
          </div>
        </div>
      </div>

      {/* Language Section */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Language
        </h2>
        <div className="flex gap-3">
          <Button variant="default">English</Button>
          <Button variant="outline">Kiswahili</Button>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5" />
          Help & Support
        </h2>
        <div className="space-y-3">
          <button className="w-full text-left p-3 rounded-xl hover:bg-muted transition-colors">
            <p className="font-medium text-foreground">FAQs</p>
            <p className="text-sm text-muted-foreground">Find answers to common questions</p>
          </button>
          <button className="w-full text-left p-3 rounded-xl hover:bg-muted transition-colors">
            <p className="font-medium text-foreground">Contact Support</p>
            <p className="text-sm text-muted-foreground">Get help from our team</p>
          </button>
          <button className="w-full text-left p-3 rounded-xl hover:bg-muted transition-colors">
            <p className="font-medium text-foreground">WhatsApp Support</p>
            <p className="text-sm text-muted-foreground">Chat with AgriBot</p>
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-card rounded-2xl border border-destructive/30 p-6">
        <h2 className="text-lg font-semibold text-destructive mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Danger Zone
        </h2>
        <p className="text-muted-foreground mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <Button variant="destructive">Delete Account</Button>
      </div>
    </div>
  );
};

export default Settings;
