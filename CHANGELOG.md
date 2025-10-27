# Change Log

All notable changes to the "JSON Anonymizer" extension will be documented in this file.

## [0.2.0] - 2025-01-27

### 🎉 Initial Release

#### Added
- ✨ **Core Features**
  - Instant JSON anonymization with structure preservation
  - Anonymize entire files or selected portions
  - Create new anonymized files to preserve originals
  - Reproducible anonymization using seeds
  - Smart type preservation (numbers stay numbers, strings stay strings)

- 🎨 **User Interface**
  - Right-click context menu integration
  - Command palette commands
  - Status bar indicator for JSON files
  - Keyboard shortcuts (Shift+Cmd+A / Shift+Alt+A)
  - Progress notifications for large files

- ⚙️ **Configuration Options**
  - Preserve types setting
  - Preserve keys setting
  - Preserve array length setting
  - Auto-backup option
  - Default seed configuration

- 🛡️ **Safety Features**
  - JSON validation before processing
  - Error handling with helpful messages
  - Option to create backups
  - Non-destructive "new file" option

#### Technical Details
- Pure TypeScript implementation
- Zero external dependencies
- Webpack bundling for optimal performance
- Support for large JSON files (tested up to 1000+ lines)

---

## [0.1.0] - 2025-10-06

### Beta Release (Pre-release)

#### Added
- Basic anonymization functionality
- Command palette integration
- Initial TypeScript implementation

#### Changed
- Migrated from Python prototype to TypeScript

#### Fixed
- JSON parsing edge cases
- Unicode character handling

---

## Version History Summary

| Version | Date | Status | Key Changes |
|---------|------|---------|------------|
| 0.2.0 | 2025-10-27 | Beta | Full feature release |
| 0.1.0 | 2025-10-06 | Beta | Core functionality complete |
| 0.0.1 | 2025-10-01 | Alpha | Initial prototype |

## Roadmap

### [1.0.0] - Planned Q4 2025
- [ ] Custom anonymization rules
- [ ] Field-specific preservation patterns
- [ ] Export/import anonymization profiles
- [ ] Batch file processing

### [1.1.0] - Planned Q1 2026
- [ ] XML support
- [ ] YAML support
- [ ] CSV support
- [ ] Performance improvements for 10MB+ files

---

## Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Test additions or fixes
- `chore:` Build process or auxiliary tool changes

---

**For detailed release notes, visit the [GitHub Releases](https://github.com/paulb79/json-anonymizer/releases) page.**
