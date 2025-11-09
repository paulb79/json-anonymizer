# Security Policy

## 🔒 Security Statement

This extension runs entirely locally with zero network requests and zero runtime dependencies, minimizing the attack surface.

## Supported Versions

| Version | Supported          | Status |
| ------- | ------------------ | ------ |
| 1.0.x   | :white_check_mark: | Active |
| < 1.0   | :x:                | EOL    |

## Reporting a Vulnerability

### ⚠️ DO NOT create public GitHub issues for security vulnerabilities

### Reporting Process

1. **Email**: json-anonymizer-security@proton.me
2. **Expected Response**: 48-72 hours
3. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What Happens Next

1. **Acknowledgment**: You'll receive confirmation within 48 hours
2. **Investigation**: We'll investigate and verify the issue
3. **Fix Development**: Critical issues will be patched immediately
4. **Disclosure**: Coordinated disclosure after fix is released
5. **Credit**: Security researchers will be credited (unless you prefer anonymity)

## Security Architecture

### What This Extension Does
- ✅ Processes JSON files locally only
- ✅ No network requests ever made
- ✅ No data collection or telemetry
- ✅ No external dependencies at runtime
- ✅ No file system access beyond user selection
- ✅ No persistent storage

### What This Extension Cannot Do
- ❌ Cannot send data externally
- ❌ Cannot access other extensions
- ❌ Cannot read files without user action
- ❌ Cannot execute external commands
- ❌ Cannot modify system settings

## Supply Chain Security

```json
{
  "runtime_dependencies": 0,
  "dev_dependencies": "pinned versions only",
  "security_scanning": "GitHub Dependabot enabled",
  "build_verification": "npm audit on every build",
  "code_review": "all changes reviewed before merge"
}
```

## Security Checklist for Contributors

- [ ] No new runtime dependencies without justification
- [ ] All dev dependencies pinned to specific versions
- [ ] No network requests
- [ ] No file system access beyond VSCode API
- [ ] No eval() or dynamic code execution
- [ ] No external command execution
- [ ] Input validation for all JSON parsing
- [ ] Signed commits preferred

## Incident Response

In case of a security incident:

1. **Immediate**: Vulnerable versions will be deprecated
2. **Within 24h**: Security patch released
3. **Within 48h**: All users notified via GitHub
4. **Within 7d**: Post-mortem published

## Security Headers

Not applicable (VSCode extension, not web application)

## Verification

You can verify the extension's behavior:

1. Check network tab - no requests
2. Review source code - fully open source
3. Check permissions - minimal VSCode API usage
4. Monitor file system - no unexpected file access

## Bug Bounty

This is a personal open-source project without a formal bug bounty program. However, security researchers who report valid vulnerabilities will be:
- Credited in the CHANGELOG
- Thanked in the release notes
- Added to SECURITY.md acknowledgments

## Past Security Issues

| Date | Issue | Severity | Status |
|------|-------|----------|---------|
| None | No security issues reported to date | N/A | ✅ |

## Contact

- **Security Issues**: json-anonymizer-security@proton.me
- **General Issues**: Use GitHub Issues
- **Response Time**: Best effort, typically 48-72 hours

## Acknowledgments

Thanks to the following security researchers:
- *Your name could be here*

---

**Last Updated**: January 2025  
**Next Review**: April 2025

## Disclaimer

This is a personal open-source project. While I take security seriously and will address issues promptly, this software is provided "AS IS" without any warranty. See LICENSE for full details.
