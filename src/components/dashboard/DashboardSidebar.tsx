import { Link, useLocation } from 'react-router-dom';
import { 
  Leaf, LayoutDashboard, Scan, TrendingUp, ShoppingBag, 
  CloudSun, MessageSquare, Settings, LogOut, Menu, X
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Scan, label: 'Disease Detection', path: '/dashboard/disease-detection' },
  { icon: TrendingUp, label: 'Market Prices', path: '/dashboard/market-prices' },
  { icon: ShoppingBag, label: 'Marketplace', path: '/dashboard/marketplace' },
  { icon: CloudSun, label: 'Weather', path: '/dashboard/weather' },
  { icon: MessageSquare, label: 'Expert Consult', path: '/dashboard/experts' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

interface DashboardSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const DashboardSidebar = ({ isOpen, setIsOpen }: DashboardSidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl accent-gradient flex items-center justify-center">
                <Leaf className="w-6 h-6 text-accent-foreground" />
              </div>
              <span className="text-lg font-bold">AgriConnect</span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-sidebar-accent"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-glow'
                      : 'hover:bg-sidebar-accent text-sidebar-foreground/80 hover:text-sidebar-foreground'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <Link
              to="/logout"
              className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
