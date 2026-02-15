'use client';

import { Card } from './ui/card';
import { Zap } from 'lucide-react';

interface EntropyIndicatorProps {
  entropy: number;
  label: string;
}

export default function EntropyIndicator({ entropy, label }: EntropyIndicatorProps) {
  const getColor = () => {
    if (entropy < 30) return 'from-red-500 to-red-600';
    if (entropy < 50) return 'from-yellow-500 to-yellow-600';
    if (entropy < 70) return 'from-blue-500 to-blue-600';
    return 'from-accent to-green-600';
  };

  const getPercentage = () => {
    return Math.min((entropy / 100) * 100, 100);
  };

  return (
    <Card className="p-4 bg-card border border-border">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Password Strength</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-accent">{label}</p>
            <p className="text-xs text-muted-foreground">{entropy.toFixed(1)} bits</p>
          </div>
        </div>
        
        {/* Entropy Bar */}
        <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getColor()} transition-all duration-300`}
            style={{ width: `${getPercentage()}%` }}
          />
        </div>

        {/* Strength Reference */}
        <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground">
          <div>Weak<br/>&lt;30b</div>
          <div>Moderate<br/>30-50b</div>
          <div>Strong<br/>50-70b</div>
          <div>Very Strong<br/>&gt;70b</div>
        </div>
      </div>
    </Card>
  );
}
