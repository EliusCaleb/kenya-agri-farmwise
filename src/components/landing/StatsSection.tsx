const stats = [
  { value: '10,000+', label: 'Active Farmers' },
  { value: '500+', label: 'Verified Buyers' },
  { value: '47', label: 'Counties Covered' },
  { value: 'KES 50M+', label: 'Transactions Processed' },
];

const StatsSection = () => {
  return (
    <section className="py-16 primary-gradient">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-primary-foreground/70">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
