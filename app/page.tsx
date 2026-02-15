import PasswordGenerator from '@/components/password-generator';
import Link from 'next/link';
import { Shield, BookOpen, Zap, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Strong Password Generator | Entropy-Based Security',
  description: 'Generate cryptographically strong passwords with custom salts. Calculate real entropy using NIST guidelines and Shannon entropy formula.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary/20 dark:from-background dark:to-secondary/10">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-accent" />
            <h1 className="text-3xl font-bold text-foreground">SecurePass</h1>
          </div>
          <p className="text-muted-foreground max-w-lg">
            Generate cryptographically strong passwords based on the latest security research. Understand entropy, salts, and modern password best practices.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Password Generator */}
        <div className="mb-12">
          <PasswordGenerator />
        </div>

        {/* Learning Link Section */}
        <Link href="/learn">
          <div className="bg-gradient-to-r from-accent/20 to-accent/10 border-2 border-accent/50 hover:border-accent hover:from-accent/30 hover:to-accent/20 rounded-lg p-8 transition-all duration-300 group cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Want to learn more about password security?</h2>
                <p className="text-muted-foreground">
                  Dive deep into cryptographic research, entropy calculation, hashing algorithms, and modern security best practices from NIST 800-63B.
                </p>
              </div>
              <div className="flex-shrink-0">
                <ArrowRight className="w-8 h-8 text-accent group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>SecurePass — Educational password generator based on cryptographic research</p>
          <p className="mt-2 text-xs">All passwords are generated locally in your browser. Nothing is stored or transmitted.</p>
        </div>
      </footer>
    </main>
  );
}
