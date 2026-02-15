'use client';

import { useState, useCallback } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { RefreshCw, Info, AlertCircle } from 'lucide-react';
import { generateSalt, validateSalt } from '@/lib/password-utils';

interface SaltSectionProps {
  salt: string;
  onSaltChange: (salt: string) => void;
}

const SALT_INFO = {
  title: 'What is a salt?',
  description:
    'A salt is a unique, random string appended to a password before hashing. It serves as additional entropy during cryptographic processing.',
  research:
    'According to cryptographic research, salts neutralize precomputation attacks (rainbow tables) by ensuring each password has unique entropy. You can provide your own salt or generate one automatically.',
};

export default function SaltSection({ salt, onSaltChange }: SaltSectionProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [saltError, setSaltError] = useState<string | null>(null);

  const handleGenerateSalt = useCallback(() => {
    const newSalt = generateSalt();
    onSaltChange(newSalt);
    setSaltError(null);
  }, [onSaltChange]);

  const handleSaltChange = useCallback(
    (value: string) => {
      onSaltChange(value);
      const validation = validateSalt(value);
      setSaltError(validation.error || null);
    },
    [onSaltChange]
  );

  const handleClearSalt = useCallback(() => {
    onSaltChange('');
    setSaltError(null);
  }, [onSaltChange]);

  return (
    <Card className="p-6 bg-card border border-border space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="salt-input" className="text-sm font-medium">
          Salt (Optional)
        </Label>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Toggle salt information"
          aria-pressed={showInfo}
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {showInfo && (
        <div className="bg-secondary/50 border border-border rounded-lg p-3 text-xs text-muted-foreground space-y-2">
          <p>
            <span className="font-semibold text-foreground">{SALT_INFO.title}</span> {SALT_INFO.description}
          </p>
          <p>{SALT_INFO.research}</p>
        </div>
      )}

      <div className="space-y-2">
        <Input
          id="salt-input"
          value={salt}
          onChange={(e) => handleSaltChange(e.target.value)}
          placeholder="Enter custom salt or generate one..."
          className="font-mono text-sm bg-secondary text-foreground border-border"
          aria-label="Salt input field"
          aria-invalid={!!saltError}
        />
        {salt && !saltError && <p className="text-xs text-muted-foreground">Salt length: {salt.length} characters</p>}
        {saltError && (
          <div className="flex items-center gap-2 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs text-yellow-600">
            <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            {saltError}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleGenerateSalt}
          variant="outline"
          className="flex-1 border-border text-foreground hover:bg-secondary"
          aria-label="Generate random salt"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Generate Salt
        </Button>
        {salt && (
          <Button
            onClick={handleClearSalt}
            variant="outline"
            className="flex-1 border-border text-destructive hover:bg-destructive/10"
            aria-label="Clear salt"
          >
            Clear Salt
          </Button>
        )}
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        <span className="font-semibold text-foreground">Note:</span> Your generated password will have this salt appended to it. Salts
        are typically stored separately in secure systems for cryptographic operations.
      </p>
    </Card>
  );
}
