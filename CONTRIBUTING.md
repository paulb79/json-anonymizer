# Contributing to JSON Anonymizer

First off, thank you for considering contributing! This is a personal open-source project, and contributions are welcome.

## 🔒 Security First

**IMPORTANT**: This extension handles potentially sensitive data. All contributions must prioritize security.

### Security Requirements

All contributions MUST:
- ✅ Include no runtime dependencies (zero dependency policy)
- ✅ Make no network requests
- ✅ Store no data persistently
- ✅ Pass security review before merge
- ✅ Include tests for any new functionality

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help maintain a welcoming environment

## How Can I Contribute?

### 🐛 Reporting Bugs

**Security Issues**: See [SECURITY.md](SECURITY.md) - DO NOT open public issues

**Regular Bugs**:
1. Check existing issues first
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, VSCode version)
   - Sample JSON (anonymized!)

### 💡 Suggesting Features

1. Check existing issues/discussions
2. Open a discussion (not an issue) for new features
3. Explain the use case and benefit
4. Consider security implications

### 🔧 Pull Requests

#### Before You Start
1. Open an issue first to discuss the change
2. Fork the repository
3. Create a feature branch from `main`

#### Development Setup
```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/vscode-json-anonymizer.git
cd vscode-json-anonymizer

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run compile
```

#### PR Requirements

**Code Quality**:
- [ ] TypeScript with no `any` types
- [ ] Follows existing code style
- [ ] Includes JSDoc comments
- [ ] No console.log statements

**Testing**:
- [ ] Includes tests for new features
- [ ] All existing tests pass
- [ ] Manual testing completed

**Security**:
- [ ] No new dependencies added
- [ ] No network requests
- [ ] No file system access beyond VSCode API
- [ ] No eval() or dynamic code execution
- [ ] Input validation for edge cases

**Documentation**:
- [ ] README updated if needed
- [ ] CHANGELOG entry added
- [ ] JSDoc comments for public APIs

#### Commit Messages

Follow conventional commits:
```
feat: add new anonymization pattern
fix: handle unicode characters correctly
docs: update README examples
test: add tests for nested arrays
chore: update dev dependencies
```

#### Pull Request Process

1. **Create PR** with clear description
2. **Link issue** being addressed
3. **Wait for review** - may take a few days
4. **Address feedback** promptly
5. **Squash commits** before merge

## Development Guidelines

### Architecture Principles

1. **Zero Runtime Dependencies**: Core functionality must work without external packages
2. **Local Processing Only**: All operations happen client-side
3. **Predictable Behavior**: Seeded randomization for reproducibility
4. **Performance**: Should handle files up to 10MB efficiently
5. **Security**: Never trust user input, validate everything

### Code Style

- Use TypeScript strict mode
- Prefer `const` over `let`
- Use meaningful variable names
- Keep functions small and focused
- Add error handling for all user input

### Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

Test categories:
- Unit tests for anonymization logic
- Integration tests for VSCode commands
- Edge cases (empty files, invalid JSON, huge files)
- Security tests (injection attempts, malformed input)

### Adding New Features

1. **Discuss First**: Open an issue to discuss
2. **Design**: Consider security and performance
3. **Implement**: Follow existing patterns
4. **Test**: Comprehensive test coverage
5. **Document**: Update README and add examples

## Release Process

Releases are managed by the maintainer:

1. Version bump following semver
2. Update CHANGELOG.md
3. Security audit: `npm audit`
4. Build and test
5. Tag and release
6. Publish to marketplace

## Questions?

- **General**: Open a GitHub discussion
- **Bugs**: Open an issue
- **Security**: Email security contact (see SECURITY.md)

## Recognition

Contributors will be:
- Listed in CHANGELOG.md
- Thanked in release notes
- Added to contributors list

## Legal

By contributing, you agree that your contributions will be licensed under the same MIT License that covers this project.

## Maintainer Notes

This is a personal project maintained in spare time. Response times may vary. Priority is given to:
1. Security issues
2. Bug fixes
3. Performance improvements
4. New features

---

**Thank you for contributing to make JSON Anonymizer better and more secure!** 🙏
