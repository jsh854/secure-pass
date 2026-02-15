'use client';

import { useState, useCallback } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Copy, RefreshCw, Lock } from 'lucide-react';
import EntropyIndicator from './entropy-indicator';
import SaltSection from './salt-section';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [salt, setSalt] = useState('');
  const [copied, setCopied] = useState(false);

  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  const calculateEntropy = useCallback(() => {
    let pool = '';
    if (includeUppercase) pool += uppercase;
    if (includeLowercase) pool += lowercase;
    if (includeNumbers) pool += numbers;
    if (includeSymbols) pool += symbols;

    if (pool.length === 0) return 0;
    // Entropy formula: H = log2(R^n) where R is pool size and n is length
    return Math.log2(Math.pow(pool.length, length));
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const generatePassword = useCallback(() => {
    let pool = '';
    if (includeUppercase) pool += uppercase;
    if (includeLowercase) pool += lowercase;
    if (includeNumbers) pool += numbers;
    if (includeSymbols) pool += symbols;

    if (pool.length === 0) {
      setPassword('Please select at least one character type');
      return;
    }

    let generated = '';
    // Ensure at least one character from each enabled type
    if (includeUppercase) generated += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    if (includeLowercase) generated += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    if (includeNumbers) generated += numbers.charAt(Math.floor(Math.random() * numbers.length));
    if (includeSymbols) generated += symbols.charAt(Math.floor(Math.random() * symbols.length));

    // Fill the rest randomly
    for (let i = generated.length; i < length; i++) {
      generated += pool.charAt(Math.floor(Math.random() * pool.length));
    }

    // Shuffle the password
    generated = generated.split('').sort(() => Math.random() - 0.5).join('');

    // Append salt if provided
    const finalPassword = salt ? generated + salt : generated;
    setPassword(finalPassword);
    setCopied(false);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, salt]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = calculateEntropy();
  const getStrengthLabel = () => {
    if (strength < 30) return 'Weak';
    if (strength < 50) return 'Moderate';
    if (strength < 70) return 'Strong';
    return 'Very Strong';
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Password Display */}
      <Card className="p-6 bg-card border border-border">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-accent" />
            <Label className="text-sm font-medium">Generated Password</Label>
          </div>
          <div className="relative">
            <Input
              value={password}
              readOnly
              className="pr-12 font-mono text-sm bg-secondary text-foreground border-border"
              placeholder="Your password will appear here"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-accent hover:text-accent hover:bg-secondary"
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          {copied && (
            <p className="text-xs text-accent font-medium">Copied to clipboard!</p>
          )}
        </div>
      </Card>

      {/* Entropy Indicator */}
      {password && (
        <EntropyIndicator entropy={strength} label={getStrengthLabel()} />
      )}

      {/* Password Options */}
      <Card className="p-6 bg-card border border-border">
        <div className="space-y-5">
          {/* Length Slider */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Password Length: {length}</Label>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
            />
            <p className="text-xs text-muted-foreground">
              NIST recommends 8-15 characters minimum for strong passwords
            </p>
          </div>

          {/* Character Type Options */}
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-4 h-4 rounded border-border accent-accent"
              />
              <span className="text-sm">Uppercase (A-Z)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-4 h-4 rounded border-border accent-accent"
              />
              <span className="text-sm">Lowercase (a-z)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 rounded border-border accent-accent"
              />
              <span className="text-sm">Numbers (0-9)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 rounded border-border accent-accent"
              />
              <span className="text-sm">Symbols (!@#$...)</span>
            </label>
          </div>
        </div>
      </Card>

      {/* Salt Section */}
      <SaltSection salt={salt} onSaltChange={setSalt} />

      {/* Generate Button */}
      <Button
        onClick={generatePassword}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-12 font-semibold text-base"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Generate Password
      </Button>

      {/* Info Section */}
      <Card className="p-4 bg-secondary/50 border border-border">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">About Entropy:</span> Your password entropy is calculated using Shannon's formula: H = log₂(R^n), where R is the character pool size and n is the length. A strong password requires at least 60 bits of entropy.
        </p>
      </Card>
    </div>
  );
}
