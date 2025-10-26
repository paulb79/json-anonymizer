# JSON Anonymizer - Quick Reference Card

## 🎯 Commands

| Command | Description | Access Method |
|---------|-------------|---------------|
| **Anonymize JSON** | Replace current file with anonymized version | • Right-click → "Anonymize JSON"<br>• `Shift+Cmd+A` (Mac)<br>• Command Palette → "JSON: Anonymize JSON"<br>• Status bar shield icon |
| **Anonymize to New File** | Create new file with anonymized content | • Right-click → "Anonymize JSON to New File"<br>• Command Palette |
| **Anonymize with Seed** | Reproducible anonymization | • Command Palette → "JSON: Anonymize JSON with Seed" |
| **Anonymize Selection** | Anonymize only selected text | • Select text → Right-click<br>• `Shift+Cmd+S` (Mac) |

## ⚙️ Settings

Access via: VSCode Settings (`Cmd+,`) → Search "JSON Anonymizer"

| Setting | Default | Description |
|---------|---------|-------------|
| `preserveTypes` | `true` | Keep numbers as numbers |
| `preserveKeys` | `true` | Don't anonymize object keys |
| `preserveArrayLength` | `true` | Keep same array sizes |
| `createBackup` | `false` | Auto-backup before anonymizing |
| `defaultSeed` | `null` | Set for reproducible results |

## ⌨️ Keyboard Shortcuts

| Action | Mac | Windows/Linux |
|--------|-----|---------------|
| Anonymize current file | `Shift+Cmd+A` | `Shift+Alt+A` |
| Anonymize selection | `Shift+Cmd+S` | `Shift+Alt+S` |
| Command Palette | `Cmd+Shift+P` | `Ctrl+Shift+P` |

## 📝 Anonymization Rules

### What Gets Anonymized:
- **Strings**: `"John Doe"` → `"X7kL9mN2"`
- **Numbers**: `12345` → `67890` (similar magnitude)
- **Booleans**: `true` → `true/false` (random)
- **Arrays**: Each element anonymized
- **Objects**: Values anonymized (keys preserved by default)

### What Stays the Same:
- JSON structure
- Array lengths (by default)
- Object keys (by default)
- Data types (by default)
- `null` values

## 🧪 Testing Examples

### Quick Test 1: Basic
```json
{
  "name": "Test User",
  "id": 12345
}
```
→ Becomes →
```json
{
  "name": "K9xM nL3Q",
  "id": 54321
}
```

### Quick Test 2: With Seed
Using seed `123`:
- First run: `"John"` → `"B7xK"`
- Second run with same seed: `"John"` → `"B7xK"` (same!)

### Quick Test 3: Selection
Select just the email:
```json
{
  "name": "John",
  "email": "john@example.com"  ← Select this line
}
```
Only email gets anonymized!

## 🚦 Status Bar Indicator

Look for: `🛡️ Anonymize` in bottom-right when editing JSON files

## 🐛 Debug Commands

```bash
# Watch TypeScript compilation
npm run watch

# Manual compile
npm run compile

# Check for errors
npm run lint

# View extension output
# Developer Tools → Console (Cmd+Alt+I)
```

## 📁 Output Files

| Operation | Result |
|-----------|--------|
| Anonymize | Replaces current file |
| Anonymize to New File | `filename_anonymized_2025-01-27-10-30-45.json` |
| Create Backup | `filename_backup_2025-01-27-10-30-45.json` |

## 💡 Pro Tips

1. **Reproducible Anonymization**: Use same seed for consistent results across team
2. **Partial Anonymization**: Select sensitive fields only
3. **Safe Testing**: Use "Anonymize to New File" first
4. **Batch Processing**: Open multiple JSON files, use command on each
5. **Undo**: Regular `Cmd+Z` works after anonymization

## ⚡ Common Workflows

### Workflow 1: Test Data Creation
1. Open production data
2. `Shift+Cmd+A` to anonymize
3. Save as test fixture

### Workflow 2: Share Sensitive Data
1. Open sensitive JSON
2. Right-click → "Anonymize to New File"
3. Share the anonymized version

### Workflow 3: Consistent Test Data
1. Command Palette → "Anonymize with Seed"
2. Enter team seed (e.g., 9999)
3. Everyone gets same anonymized data

## 🔍 Troubleshooting

| Issue | Solution |
|-------|----------|
| Command not showing | Ensure file has `.json` extension |
| No right-click menu | Check if file is recognized as JSON |
| Settings not working | Reload window (`Cmd+R`) |
| Extension not active | Check status bar for shield icon |

---
**Version**: 0.1.0 | **Extension ID**: json-anonymizer
