
import React from 'react';

interface PageHeaderProps {
  pillText: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
}

const PageHeader: React.FC<PageHeaderProps> = ({ pillText, title, subtitle, icon: Icon }) => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16 space-y-6 animate-fade-in">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-full text-primary-foreground text-sm font-medium shadow-primary">
        <Icon className="w-4 h-4" />
        {pillText}
      </div>
      <h1 className="text-4xl md:text-6xl font-bold gradient-text-primary">
        {title}
      </h1>
      <p className="text-xl text-muted-foreground">
        {subtitle}
      </p>
    </div>
  );
};

export default PageHeader;
