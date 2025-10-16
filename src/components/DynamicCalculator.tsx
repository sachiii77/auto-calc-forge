import React, { useState, useEffect } from 'react';
import { transform } from '@babel/standalone';

interface DynamicCalculatorProps {
  code: string;
}

const DynamicCalculator: React.FC<DynamicCalculatorProps> = ({ code }) => {
  const [CalculatorComponent, setCalculatorComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const transformedCode = transform(code, {
        presets: ['react'],
        plugins: [
            ["transform-modules-commonjs", { "allowTopLevelThis": true }]
        ]
      }).code;

      if (!transformedCode) {
        throw new Error('Code transformation failed');
      }

      const exports: { default?: React.ComponentType } = {};
      const require = (name: string) => {
        if (name === 'react') return React;
        // You might need to handle other dependencies here
        throw new Error(`Module not found: ${name}`);
      };
      
      new Function('exports', 'require', transformedCode)(exports, require);

      if (exports.default) {
        setCalculatorComponent(() => exports.default);
      } else {
        throw new Error('No default export found in the code');
      }

    } catch (e) {
      console.error('Error rendering calculator:', e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred');
    }
  }, [code]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!CalculatorComponent) {
    return <div>Loading calculator...</div>;
  }

  return <CalculatorComponent />;
};

export default DynamicCalculator;
