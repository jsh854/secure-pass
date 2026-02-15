'use client';

import { useMemo } from 'react';
import { Card } from './ui/card';
import { Zap } from 'lucide-react';
import { getEntropyColor, getEntropyPercentage, ENTROPY_THRESHOLDS } from '@/lib/password-utils';

interface EntropyIndicatorProps {
  entropy: number;
  label: string;
}

const STRENGTH_REFERENCE = [
  { label: 'Weak', range: `< ${ENTROPY_THRESHOLDS.WEAK}b` },
  { label: 'Moderate', range: `${ENTROPY_THRESHOLDS.WEAK}-${ENTROPY_THRESHOLDS.MODERATE}b` },
  { label: 'Strong', range: `${ENTROPY_THRESHOLDS.MODERATE}-${ENTROPY_THRESHOLDS.STRONG}b` },
  { label: 'Very Strong', range: `> ${ENTROPY_THRESHOLDS.STRONG}b` },
] as const;

export default function EntropyIndicator({ entropy, label }: EntropyIndicatorProps) {
  const colorClass = useMemo(() => getEntropyColor(entropy), [entropy]);
  const percentage = useMemo(() => getEntropyPercentage(entropy), [entropy]);

  return (
    <Card className="p-4 bg-card border border-border">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" aria-hidden="true" />
            <span className="text-sm font-medium">Password Strength</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-accent">{label}</p>
            <p className="text-xs text-muted-foreground" aria-label={`Entropy: ${entropy.toFixed(1)} bits`}>
              {entropy.toFixed(1)} bits
            </p>
          </div>
        </div>

        {/* Entropy Progress Bar */}
        <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-300`}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={Math.round(entropy)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Entropy strength indicator"
          />
        </div>

        {/* Strength Reference Guide */}
        <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground">
          {STRENGTH_REFERENCE.map((item) => (
            <div key={item.label}>
              {item.label}
              <br />
              {item.range}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
