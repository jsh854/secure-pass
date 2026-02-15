# 🔐 SecurePass - Strong Password Generator

A modern, educational password generation tool built on cryptographic research and security best practices. Generate truly strong passwords using entropy-based calculations, custom salts, and real-time security metrics.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)

---

## ✨ Features

### 🎯 Core Functionality
- **Entropy-Based Password Generation** - Real Shannon entropy calculation (H = log₂(R^n)) shows actual password strength in bits
- **Customizable Character Sets** - Choose from uppercase, lowercase, numbers, and special characters
- **Custom Salt Support** - Provide your own salt or auto-generate random 16-character salts
- **Real-Time Entropy Display** - Live entropy calculation as you configure your password parameters
- **Strength Indicator** - Visual representation of password security based on entropy thresholds

### 📚 Educational Content
- **NIST 800-63B Compliance** - Follows modern NIST password guidelines
- **Cryptographic Research** - Comprehensive learning section covering:
  - Shannon entropy formula and calculations
  - Modern hashing algorithms (MD5, SHA-1, SHA-256, Bcrypt, Argon2id)
  - Salt, pepper, and entropy injection concepts
  - Why password complexity rules fail
- **Entropy Examples** - Real-world entropy calculations for common password types
- **Key Findings** - Quick reference to password security research

### 🎨 Design & UX
- **Dark Theme** - Professional, security-focused interface with green accents
- **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- **Copy-to-Clipboard** - One-click password copying with visual feedback
- **Interactive Learning** - Educational content on dedicated learn page

---

## 🖼️ Screenshots

### Home Page - Password Generator
*Screenshot placeholder: Shows the main password generator interface with customizable options and real-time entropy display*

The home page features:
- Password length slider
- Character type toggles (uppercase, lowercase, numbers, symbols)
- Real-time entropy calculation
- Generate button
- Copy-to-clipboard functionality
- Visual strength indicator

### Salt Management Section
*Screenshot placeholder: Shows the salt input/generation interface*

Users can:
- Manually enter custom salts
- Auto-generate random salts
- Understand salt importance through helpful explanations
- Copy generated salts

### Learn Page - Security Research
*Screenshot placeholder: Shows the comprehensive learning section*

Covers:
- Key findings from password security research
- NIST recommendations at a glance
- Entropy examples with bit calculations
- Modern hashing algorithms comparison
- Salt vs Pepper explanations
- Interactive entropy formula visualization

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/securepass.git
cd securepass
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Run the development server**
```bash
pnpm dev
```

4. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production
```bash
pnpm build
pnpm start
```

---

## 📖 How to Use

### Generating a Password

1. **Set Password Length** - Adjust the slider to your desired length (typically 12-20 characters)
2. **Select Character Types** - Toggle which character sets to include:
   - Uppercase letters (A-Z)
   - Lowercase letters (a-z)
   - Numbers (0-9)
   - Special characters (!@#$%^&*...)
3. **Add Salt (Optional)** - Either:
   - Provide a custom salt value
   - Click "Generate Salt" for a random 16-character salt
4. **Generate Password** - Click the generate button
5. **Copy Password** - Click copy button or use keyboard shortcut

### Understanding Entropy

The entropy meter shows password strength in bits:
- **0-40 bits** (Red) - Weak - Can be cracked quickly
- **40-60 bits** (Yellow) - Fair - Reasonable for some uses
- **60+ bits** (Green) - Strong - Resistant to modern attacks

**Formula Used:** `H = log₂(R^n)` where:
- R = Size of character pool
- n = Password length
- H = Total entropy in bits

---

## 🔬 Cryptographic Principles

### Shannon Entropy
Measures the randomness and unpredictability of a password:
```
H = log₂(R^n)
```

Each bit of entropy doubles the number of guesses needed to crack a password.

### Hashing Algorithms

| Algorithm | Status | Speed | Use Case |
|-----------|--------|-------|----------|
| MD5 | ❌ Broken | Very Fast | Legacy only |
| SHA-1 | ⚠️ Deprecated | Fast | Legacy only |
| SHA-256 | ⚠️ Not recommended | Fast | Not for passwords |
| Bcrypt | ✅ Recommended | Adaptive | Password hashing |
| Argon2id | ✅ State-of-art | Memory-hard | Best choice |

### Salt & Pepper

- **Salt**: Unique random value per user, stored in database. Prevents rainbow table attacks.
- **Pepper**: System-wide secret, stored separately. Protects against database breaches.
- **Combined**: Salt + Pepper + strong hashing = Maximum security

---

## 🛡️ Security Notes

### Privacy First
- All passwords are generated **locally in your browser**
- Nothing is stored or transmitted to any server
- No analytics, no tracking, no cookies

### Best Practices
- Generate unique passwords for each account
- Use a password manager to store generated passwords
- Enable two-factor authentication (2FA) when available
- Never share passwords via email or chat
- Change passwords only when compromised (not on expiration)

---

## 📚 Research & References

This project is based on:
- **NIST 800-63B** - Digital Identity Guidelines
- **Shannon Entropy Formula** - Information Theory
- **Password Security Research** - Academic papers on cryptanalysis
- **Modern Hashing Standards** - Argon2, Bcrypt, PBKDF2

Key insights from research:
- ✅ Length matters more than complexity
- ❌ Don't require special character combinations
- ✅ Check against breach databases
- ❌ Don't force expiration without compromise
- ✅ Use memory-hard hashing algorithms
- ✅ Salt all passwords uniquely

---

## 🏗️ Project Structure

```
securepass/
├── app/
│   ├── page.tsx                 # Home page with password generator
│   ├── learn/
│   │   └── page.tsx             # Educational content page
│   ├── layout.tsx               # Root layout with dark theme
│   └── globals.css              # Global styles and design tokens
├── components/
│   ├── password-generator.tsx    # Main generator component
│   ├── entropy-indicator.tsx     # Entropy visualization
│   └── salt-section.tsx          # Salt management component
├── lib/
│   └── utils.ts                 # Utility functions
└── public/                       # Static assets

```

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🤝 Contributing

Contributions are welcome! Whether it's:
- Bug reports and fixes
- Feature suggestions
- Improved documentation
- Security research insights

Please feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📧 Feedback & Support

Found a bug or have suggestions? Please open an issue on GitHub.

---

## 🌟 If This Helped You

If you found SecurePass useful, consider:
- ⭐ Giving it a star on GitHub
- 📢 Sharing it with others
- 📝 Providing feedback and suggestions
- 🐛 Reporting bugs and issues

---

## ⚖️ Disclaimer

This tool is provided for educational purposes. While it implements security best practices:
- Always use a reputable password manager for production use
- This tool is not suitable as a primary password storage solution
- For critical systems, consult with security professionals
- Stay updated with latest security guidelines

---

**Created with 🔐 for password security education and best practices**
