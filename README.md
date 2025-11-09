# JSON Anonymizer for Visual Studio Code

<div align="center">
  <img src="icon.png" width="128" height="128" alt="JSON Anonymizer Logo">
  
  **Instantly anonymize sensitive data in JSON files while preserving structure**
  
  [![Version](https://img.shields.io/visual-studio-marketplace/v/Redjamjar.json-anonymizer)](https://marketplace.visualstudio.com/items?itemName=Redjamjar.json-anonymizer)
  [![Downloads](https://img.shields.io/visual-studio-marketplace/d/Redjamjar.json-anonymizer)](https://marketplace.visualstudio.com/items?itemName=Redjamjar.json-anonymizer)
  [![Rating](https://img.shields.io/visual-studio-marketplace/r/Redjamjar.json-anonymizer)](https://marketplace.visualstudio.com/items?itemName=Redjamjar.json-anonymizer)
  [![License](https://img.shields.io/github/license/paulb79/json-anonymizer)](https://github.com/paulb79/json-anonymizer/blob/master/LICENSE)
</div>

---

## ✨ Features

Transform sensitive JSON data into anonymized versions for testing, sharing, or demonstrations - all while maintaining the exact structure and data types of your original files.

### 🎯 Key Features

- **🔒 Instant Anonymization** - One-click to anonymize any JSON file
- **🎲 Reproducible Results** - Use seeds for consistent anonymization across teams
- **📝 Selective Anonymization** - Anonymize only selected portions of your JSON
- **💾 Safe Operations** - Create new files or backups to preserve originals
- **⚡ Lightning Fast** - Pure TypeScript implementation with zero external dependencies
- **🎨 Smart Preservation** - Maintains JSON structure, types, and array lengths


## Demo

![Example JSON Anonymization](/assets/demo.gif "Demo of Json Anonymizer")

## 📥 Installation

### Method 1: VSCode Marketplace
1. Open VSCode
2. Press `Ctrl+P` / `Cmd+P`
3. Type: `ext install redjamjar.json-anonymizer`
4. Click Install

### Method 2: Extension View
1. Open Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`)
2. Search for "JSON Anonymizer"
3. Click Install

## 🚀 Usage

### Quick Start

1. Open any `.json` file
2. **Right-click** in the editor
3. Select **"Anonymize JSON"**

That's it! Your sensitive data is now anonymized.

### Available Commands

| Command | Description | Shortcut |
|---------|-------------|----------|
| **Anonymize JSON** | Replace current file with anonymized version | `Shift+Cmd+A` (Mac)<br>`Shift+Alt+A` (Win/Linux) |
| **Anonymize JSON to New File** | Create a new file with anonymized content | Via context menu |
| **Anonymize JSON with Seed** | Use a seed for reproducible anonymization | Via command palette |
| **Anonymize Selected JSON** | Anonymize only the selected portion | `Shift+Cmd+S` (Mac)<br>`Shift+Alt+S` (Win/Linux) |

### Access Methods

- **Right-Click Menu** - Available on any JSON file
- **Command Palette** - `Cmd+Shift+P` → Type "JSON Anonymizer"
- **Status Bar** - Click the shield icon when editing JSON
- **Keyboard Shortcuts** - Customizable in VSCode settings

## 🎮 Examples

### Before Anonymization
```json
{
  "user": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "ssn": "123-45-6789",
    "phone": "+1-555-0123"
  },
  "creditCard": {
    "number": "4532-1234-5678-9012",
    "expiry": "12/25",
    "cvv": "123"
  },
  "transactions": [
    {
      "date": "2024-01-15",
      "amount": 250.00,
      "merchant": "Amazon"
    }
  ]
}
```

### After Anonymization
```json
{
  "user": {
    "name": "K9xM L3Q",
    "email": "b7xk.n5m2@ql9w8x.3rp",
    "ssn": "847-92-3651",
    "phone": "+5-219-7483"
  },
  "creditCard": {
    "number": "9183-5672-4039-2847",
    "expiry": "08/29",
    "cvv": "582"
  },
  "transactions": [
    {
      "date": "3729-85-03",
      "amount": 748.23,
      "merchant": "Hy4K9m"
    }
  ]
}
```

## ⚙️ Configuration

Customize the extension behavior through VSCode settings:

```json
{
  // Preserve numeric types (numbers stay as numbers)
  "jsonAnonymizer.preserveTypes": true,
  
  // Keep object keys unchanged
  "jsonAnonymizer.preserveKeys": true,
  
  // Maintain original array lengths
  "jsonAnonymizer.preserveArrayLength": true,
  
  // Create backup before anonymizing
  "jsonAnonymizer.createBackup": false,
  
  // Default seed for reproducible results (null for random)
  "jsonAnonymizer.defaultSeed": null
}
```

## 🔑 Reproducible Anonymization

Need consistent anonymization across your team? Use the seed feature:

1. `Cmd+Shift+P` → "JSON: Anonymize JSON with Seed"
2. Enter a seed number (e.g., `12345`)
3. Share the seed with your team
4. Everyone gets identical anonymized results!

Perfect for:
- Creating consistent test data
- Reproducible demos
- Team collaboration
- Debugging scenarios

## 🎯 Use Cases

- **🧪 Test Data Generation** - Create realistic test data from production samples
- **📊 Safe Data Sharing** - Share data structures without exposing sensitive information
- **🎓 Educational Demos** - Show JSON processing without privacy concerns
- **🐛 Bug Reports** - Include data structures in bug reports without sensitive data
- **📝 Documentation** - Create example JSON files for documentation
- **🔐 GDPR Compliance** - Quickly anonymize personal data for compliance

## 💡 Pro Tips

### Selective Anonymization
Only anonymize specific sensitive fields:
1. Select the sensitive portion
2. Right-click → "Anonymize Selected JSON"
3. Only selected data is anonymized

### Batch Processing
Process multiple files quickly:
1. Open each JSON file in tabs
2. Use `Shift+Cmd+A` on each
3. All files anonymized in seconds

### Safe Testing
Always test on copies first:
- Use "Anonymize to New File" for safety
- Enable "Create Backup" in settings
- Review changes before saving

## 🛡️ Privacy & Security

- **No Data Collection** - All processing happens locally
- **No Network Requests** - Completely offline operation
- **No External Dependencies** - Pure TypeScript implementation
- **Open Source** - Inspect the code yourself

## 📋 Requirements

- Visual Studio Code v1.85.0 or higher
- Works on Windows, macOS, and Linux

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- Large files (>10MB) may take a moment to process
- Complex nested structures with 10+ levels may impact performance

## 📮 Support

- **Issues**: [GitHub Issues](https://github.com/paulb79/json-anonymizer/issues)
- **Discussions**: [GitHub Discussions](https://github.com/paulb79/json-anonymizer/discussions)
- **Email**: support@redjamjar.net

## 🎉 Acknowledgments

- Thanks to all contributors and users
- Inspired by the need for better data privacy tools
- Built with TypeScript and the VSCode Extension API

---

<div align="center">
  Made with ❤️ for the developer community
  
  **[Install Now](https://marketplace.visualstudio.com/items?itemName=redjamjar.json-anonymizer)** | **[GitHub](https://github.com/paulb79/json-anonymizer)** | **[Report Issue](https://github.com/paulb79/json-anonymizer/issues)**
</div>
