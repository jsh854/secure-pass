'use client';

import { useState, useCallback, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Copy, RefreshCw, Lock, AlertCircle } from 'lucide-react';
import EntropyIndicator from './entropy-indicator';
import SaltSection from './salt-section';
import {
  generatePassword as generatePasswordUtil,
  getStrengthLabel,
  PASSWORD_CONFIG,
  PasswordGeneratorOptions,
} from '@/lib/password-utils';

const CHARACTER_TYPE_OPTIONS = [
  { key: 'uppercase', label: 'Uppercase (A-Z)' },
  { key: 'lowercase', label: 'Lowercase (a-z)' },
  { key: 'numbers', label: 'Numbers (0-9)' },
  { key: 'symbols', label: 'Symbols (!@#$...)' },
] as const;

interface PasswordState {
  password: string;
  entropy: number;
  error: string | null;
}

export default function PasswordGenerator() {
  const [passwordState, setPasswordState] = useState<PasswordState>({
    password: '',
    entropy: 0,
    error: null,
  });

  const [length, setLength] = useState<number>(PASSWORD_CONFIG.DEFAULT_LENGTH);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [salt, setSalt] = useState('');
  const [copied, setCopied] = useState(false);

  const options: PasswordGeneratorOptions = useMemo(
    () => ({
      length,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
    }),
    [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]
  );

  const handleGeneratePassword = useCallback(() => {
    try {
      const result = generatePasswordUtil(options);
      const finalPassword = salt ? result.password + salt : result.password;

      setPasswordState({
        password: finalPassword,
        entropy: result.entropy,
        error: null,
      });
      setCopied(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate password';
      setPasswordState((prev) => ({
        ...prev,
        error: errorMessage,
      }));
    }
  }, [options, salt]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(passwordState.password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      setPasswordState((prev) => ({
        ...prev,
        error: 'Failed to copy to clipboard',
      }));
    }
  }, [passwordState.password]);

  const strengthLabel = useMemo(() => getStrengthLabel(passwordState.entropy), [passwordState.entropy]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Password Display */}
      <Card className="p-6 bg-card border border-border">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-accent" />
            <Label htmlFor="password-display" className="text-sm font-medium">
              Generated Password
            </Label>
          </div>
          <div className="relative">
            <Input
              id="password-display"
              value={passwordState.password}
              readOnly
              className="pr-12 font-mono text-sm bg-secondary text-foreground border-border"
              placeholder="Your password will appear here"
              aria-label="Generated password output"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              disabled={!passwordState.password}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-accent hover:text-accent hover:bg-secondary disabled:opacity-50"
              aria-label="Copy password to clipboard"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          {copied && <p className="text-xs text-accent font-medium">Copied to clipboard!</p>}
          {passwordState.error && (
            <div className="flex items-center gap-2 p-2 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-600">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {passwordState.error}
            </div>
          )}
        </div>
      </Card>

      {/* Entropy Indicator */}
      {passwordState.password && <EntropyIndicator entropy={passwordState.entropy} label={strengthLabel} />}

      {/* Password Options */}
      <Card className="p-6 bg-card border border-border">
        <div className="space-y-5">
          {/* Length Slider */}
          <div className="space-y-2">
            <Label htmlFor="length-slider" className="text-sm font-medium">
              Password Length: {length}
            </Label>
            <input
              id="length-slider"
              type="range"
              min={PASSWORD_CONFIG.MIN_LENGTH}
              max={PASSWORD_CONFIG.MAX_LENGTH}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
              aria-label="Password length slider"
            />
            <p className="text-xs text-muted-foreground">
              NIST recommends {PASSWORD_CONFIG.MIN_LENGTH}-15 characters minimum for strong passwords
            </p>
          </div>

          {/* Character Type Options */}
          <fieldset>
            <legend className="text-sm font-medium mb-3">Character Types</legend>
            <div className="grid grid-cols-2 gap-3">
              {[
                { state: includeUppercase, setState: setIncludeUppercase, ...CHARACTER_TYPE_OPTIONS[0] },
                { state: includeLowercase, setState: setIncludeLowercase, ...CHARACTER_TYPE_OPTIONS[1] },
                { state: includeNumbers, setState: setIncludeNumbers, ...CHARACTER_TYPE_OPTIONS[2] },
                { state: includeSymbols, setState: setIncludeSymbols, ...CHARACTER_TYPE_OPTIONS[3] },
              ].map(({ key, label, state, setState }) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state}
                    onChange={(e) => setState(e.target.checked)}
                    className="w-4 h-4 rounded border-border accent-accent"
                    aria-label={`Include ${label}`}
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </Card>

      {/* Salt Section */}
      <SaltSection salt={salt} onSaltChange={setSalt} />

      {/* Generate Button */}
      <Button
        onClick={handleGeneratePassword}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-12 font-semibold text-base"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Generate Password
      </Button>

      {/* Info Section */}
      <Card className="p-4 bg-secondary/50 border border-border">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">About Entropy:</span> Your password entropy is calculated using Shannon&apos;s formula: H = log₂(R^n), where R is the character pool
          size and n is the length. A strong password requires at least {PASSWORD_CONFIG.MIN_ENTROPY_BITS} bits of entropy.
        </p>
      </Card>
    </div>
  );
}
