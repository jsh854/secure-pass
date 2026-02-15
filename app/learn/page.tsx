'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary/20 dark:from-background dark:to-secondary/10">
      {/* Header with Back Link */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Generator
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Password Security Research</h1>
          <p className="text-muted-foreground mt-2">
            Deep dive into modern password security research, best practices, and cryptographic fundamentals.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Key Findings */}
        <section className="bg-card border border-border rounded-lg p-8 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Key Findings</h2>
          <ul className="text-sm text-muted-foreground space-y-3">
            <li className="flex gap-2">
              <span className="text-accent font-bold">•</span>
              <span><span className="font-semibold text-foreground">NIST Guidelines:</span> Length matters more than complexity</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent font-bold">•</span>
              <span><span className="font-semibold text-foreground">60+ bits:</span> Minimum entropy for strong passwords</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent font-bold">•</span>
              <span><span className="font-semibold text-foreground">Salts:</span> Prevent rainbow table attacks</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent font-bold">•</span>
              <span><span className="font-semibold text-foreground">No expiration:</span> Only change on compromise</span>
            </li>
          </ul>
        </section>

        {/* NIST Recommendations Quick Reference */}
        <section className="bg-card border border-border rounded-lg p-8 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">NIST Recommendations at a Glance</h2>
          <div className="text-sm space-y-3 text-muted-foreground">
            <p><span className="font-semibold text-foreground">Length:</span> 8-15 characters minimum (longer is better)</p>
            <p><span className="font-semibold text-foreground">No rules:</span> Don't require complexity patterns</p>
            <p><span className="font-semibold text-foreground">Breach check:</span> Compare against known breaches</p>
            <p><span className="font-semibold text-foreground">No expiration:</span> Only change on suspected compromise</p>
          </div>
        </section>

        {/* Entropy Examples */}
        <section className="bg-card border border-border rounded-lg p-8 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Entropy Examples</h2>
          <div className="text-xs space-y-2 font-mono text-muted-foreground">
            <div className="flex justify-between">
              <span>8 chars lowercase:</span>
              <span className="text-red-500">37.6 bits</span>
            </div>
            <div className="flex justify-between">
              <span>10 chars alphanumeric:</span>
              <span className="text-yellow-500">59.5 bits</span>
            </div>
            <div className="flex justify-between">
              <span>16 chars full set:</span>
              <span className="text-accent">93.4 bits</span>
            </div>
            <div className="flex justify-between">
              <span>5-word Diceware:</span>
              <span className="text-accent">64.6 bits</span>
            </div>
          </div>
        </section>

        {/* Hashing Evolution */}
        <section className="bg-card border border-border rounded-lg p-8 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Modern Hashing Algorithms</h2>
          <p className="text-muted-foreground">
            Password hashing has evolved significantly. Here's how different algorithms compare:
          </p>
          <ul className="text-sm text-muted-foreground space-y-3 pl-6">
            <li className="flex gap-3">
              <span className="font-semibold text-red-500 min-w-fit">MD5:</span>
              <span>Broken algorithm with practical collision attacks. Never use for passwords.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-red-500 min-w-fit">SHA-1:</span>
              <span>Deprecated due to collision vulnerabilities. Too fast for password hashing.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-yellow-500 min-w-fit">SHA-256:</span>
              <span>Cryptographically secure but too fast. Better for non-password hashing.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-accent min-w-fit">Bcrypt:</span>
              <span>Adaptive cost factor prevents hardware acceleration. Industry standard for passwords.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-accent min-w-fit">Argon2id:</span>
              <span>Memory-hard function resists GPU attacks. State-of-the-art password hashing algorithm.</span>
            </li>
          </ul>
        </section>

        {/* Entropy & Security */}
        <section className="bg-card border border-border rounded-lg p-8 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Shannon Entropy & Password Strength</h2>
          <p className="text-muted-foreground">
            Real password strength is measured in entropy bits, not arbitrary complexity scores.
          </p>
          
          <div className="bg-secondary/50 border border-border rounded-lg p-6 space-y-4">
            <h3 className="font-semibold text-foreground text-lg">Shannon Entropy Formula</h3>
            <div className="font-mono text-center py-4 bg-background/50 rounded p-4 border border-border">
              <p className="text-xl font-bold text-accent mb-4">H = log₂(R^n)</p>
              <div className="text-sm text-muted-foreground space-y-2 text-left">
                <p><span className="font-semibold text-foreground">H</span> = Total entropy in bits</p>
                <p><span className="font-semibold text-foreground">R</span> = Size of character pool (alphabet)</p>
                <p><span className="font-semibold text-foreground">n</span> = Password length in characters</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">How it Works:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Each additional character multiplies possibilities by the character pool size</li>
                <li>Each bit of entropy doubles the attack difficulty</li>
                <li>60+ bits withstands modern brute-force attacks for reasonable time periods</li>
                <li>128+ bits provides strong security even against quantum computing estimates</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Entropy Examples */}
        <section className="bg-card border border-border rounded-lg p-8 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Real-World Entropy Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-secondary/50 border border-border rounded p-4 space-y-3">
              <h3 className="font-semibold text-foreground text-sm">Character Pool Sizes</h3>
              <div className="text-xs space-y-2 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Lowercase only (a-z):</span>
                  <span className="font-semibold">26</span>
                </div>
                <div className="flex justify-between">
                  <span>+Uppercase (A-Z):</span>
                  <span className="font-semibold">52</span>
                </div>
                <div className="flex justify-between">
                  <span>+Numbers (0-9):</span>
                  <span className="font-semibold">62</span>
                </div>
                <div className="flex justify-between">
                  <span>+Symbols (!@#$...):</span>
                  <span className="font-semibold">94</span>
                </div>
              </div>
            </div>

            <div className="bg-secondary/50 border border-border rounded p-4 space-y-3">
              <h3 className="font-semibold text-foreground text-sm">Password Strength Benchmarks</h3>
              <div className="text-xs space-y-2 text-muted-foreground">
                <div className="flex justify-between items-center">
                  <span>8 chars lowercase:</span>
                  <span className="text-red-500 font-semibold">37.6 bits</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>10 chars alphanumeric:</span>
                  <span className="text-yellow-500 font-semibold">59.5 bits</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>12 chars all types:</span>
                  <span className="text-accent font-semibold">79.3 bits</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>16 chars all types:</span>
                  <span className="text-accent font-semibold">105.8 bits</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>5-word Diceware:</span>
                  <span className="text-accent font-semibold">64.6 bits</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Salts, Peppers & Entropy */}
        <section className="bg-card border border-border rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Salts, Peppers & Entropy Injection</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-secondary/50 border border-border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-foreground text-lg">Salt</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p className="font-semibold text-foreground">Purpose:</p>
                <p>Prevents rainbow table attacks and identical passwords hashing to same values.</p>
                <p className="font-semibold text-foreground mt-2">Implementation:</p>
                <p>Unique random value generated per user. Stored in database alongside hash.</p>
                <p className="font-semibold text-foreground mt-2">Size:</p>
                <p>Typically 16-32 bytes (128-256 bits) of random data.</p>
              </div>
            </div>

            <div className="bg-secondary/50 border border-border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-foreground text-lg">Pepper</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p className="font-semibold text-foreground">Purpose:</p>
                <p>Additional secret that protects against database compromise.</p>
                <p className="font-semibold text-foreground mt-2">Implementation:</p>
                <p>Secret system-wide value stored separately from database (config/vault).</p>
                <p className="font-semibold text-foreground mt-2">Usage:</p>
                <p>Appended to password before hashing. Database breach doesn't expose it.</p>
              </div>
            </div>

            <div className="bg-secondary/50 border border-border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-foreground text-lg">Combined Security</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p className="font-semibold text-foreground">Best Practice:</p>
                <p>Use both salt + pepper with strong adaptive hashing algorithm.</p>
                <p className="font-semibold text-foreground mt-2">Formula:</p>
                <p className="font-mono bg-background/50 p-2 rounded mt-1">
                  hash(salt + password + pepper)
                </p>
                <p className="font-semibold text-foreground mt-2">Result:</p>
                <p>Maximum security against all known password cracking techniques.</p>
              </div>
            </div>
          </div>
        </section>

        {/* NIST Guidelines */}
        <section className="bg-card border border-border rounded-lg p-8 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">NIST 800-63B Guidelines</h2>
          <p className="text-muted-foreground">
            Modern NIST recommendations prioritize simplicity and user experience over complexity rules.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-secondary/50 border border-border rounded p-4 space-y-3">
              <h3 className="font-semibold text-foreground">Do This</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex gap-2">
                  <span className="text-accent font-bold">✓</span>
                  <span>Require minimum 8+ characters (preferably 12+)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">✓</span>
                  <span>Allow any characters including spaces</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">✓</span>
                  <span>Check against known breach databases</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">✓</span>
                  <span>Use Argon2id for hashing</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">✓</span>
                  <span>Change only on suspected compromise</span>
                </li>
              </ul>
            </div>

            <div className="bg-secondary/50 border border-border rounded p-4 space-y-3">
              <h3 className="font-semibold text-foreground">Avoid This</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Composition rules (UPPERCASE, lowercase, 1234, !@#$)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Periodic password expiration</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Security questions for authentication</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Hints about password content</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Fast hashing functions like SHA-256</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>SecurePass — Educational password generator based on cryptographic research</p>
          <p className="mt-2 text-xs">All information based on NIST 800-63B and modern cryptographic best practices</p>
        </div>
      </footer>
    </main>
  );
}
