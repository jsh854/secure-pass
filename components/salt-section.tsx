'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { RefreshCw, Info } from 'lucide-react';

interface SaltSectionProps {
  salt: string;
  onSaltChange: (salt: string) => void;
}

export default function SaltSection({ salt, onSaltChange }: SaltSectionProps) {
  const [showInfo, setShowInfo] = useState(false);

  const generateRandomSalt = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let generatedSalt = '';
    for (let i = 0; i < 16; i++) {
      generatedSalt += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    onSaltChange(generatedSalt);
  };

  const clearSalt = () => {
    onSaltChange('');
  };

  return (
    <Card className="p-6 bg-card border border-border space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Label className="text-sm font-medium">Salt (Optional)</Label>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="text-muted-foreground hover:text-foreground"
            title="What is a salt?"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showInfo && (
        <div className="bg-secondary/50 border border-border rounded-lg p-3 text-xs text-muted-foreground space-y-2">
          <p>
            <span className="font-semibold text-foreground">What is a salt?</span> A salt is a unique, random string appended to a password before hashing. It serves as additional entropy during cryptographic processing.
          </p>
          <p>
            According to your research, salts neutralize precomputation attacks (rainbow tables) by ensuring each password has unique entropy. You can provide your own salt or generate one automatically.
          </p>
        </div>
      )}

      <div className="space-y-2">
        <Input
          value={salt}
          onChange={(e) => onSaltChange(e.target.value)}
          placeholder="Enter custom salt or generate one..."
          className="font-mono text-sm bg-secondary text-foreground border-border"
        />
        {salt && (
          <p className="text-xs text-muted-foreground">
            Salt length: {salt.length} characters
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          onClick={generateRandomSalt}
          variant="outline"
          className="flex-1 border-border text-foreground hover:bg-secondary"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Generate Salt
        </Button>
        {salt && (
          <Button
            onClick={clearSalt}
            variant="outline"
            className="flex-1 border-border text-destructive hover:bg-destructive/10"
          >
            Clear Salt
          </Button>
        )}
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        <span className="font-semibold text-foreground">Note:</span> Your generated password will have this salt appended to it. Salts are typically stored separately in secure systems for cryptographic operations.
      </p>
    </Card>
  );
}
