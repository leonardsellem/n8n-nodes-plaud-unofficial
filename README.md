# n8n-nodes-plaud-unofficial

This is an n8n community node for the **unofficial Plaud API**. It lets you interact with your [Plaud](https://plaud.ai/) voice recorder data in n8n workflows.

Plaud is a voice recording device that captures meetings, conversations, and notes with AI-powered transcription and summarization.

> **Note:** This node uses an unofficial, reverse-engineered API. It may break if Plaud changes their API.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### File

| Operation | Description |
|-----------|-------------|
| **Get All** | List all recordings |
| **Get** | Get details for a specific recording |
| **Get Batch** | Get details for multiple recordings by ID |
| **Download** | Download the audio file (MP3) |

### Folder

| Operation | Description |
|-----------|-------------|
| **Get All** | List all folders/tags |

### AI

| Operation | Description |
|-----------|-------------|
| **Get Status** | Check AI processing status for a recording |
| **Get Notes** | Get AI-generated notes for a recording |
| **Get Questions** | Get AI-recommended questions for a recording |

### Share

| Operation | Description |
|-----------|-------------|
| **Get Private** | Get private share link for a recording |
| **Get Public** | Get public share link for a recording |

## Credentials

This node requires a Plaud API access token.

### Obtaining your access token

1. Log into the [Plaud web app](https://app.plaud.ai/)
2. Open browser DevTools (F12) → Network tab
3. Perform any action (e.g., view a recording)
4. Find a request to `api-euc1.plaud.ai`
5. Copy the `Authorization` header value (remove the `Bearer ` prefix)

### Setting up credentials in n8n

1. Go to **Credentials** → **New Credential**
2. Search for "Plaud Unofficial API"
3. Paste your access token
4. Save

> **Warning:** Access tokens may expire. You'll need to obtain a new one when that happens.

## Compatibility

- Tested with n8n version 1.x
- Requires Node.js 22+

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Lint
npm run lint

# Development mode (watch)
npm run dev
```

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Plaud official website](https://plaud.ai/)

## Legal Basis

This is an **unofficial** community integration, not affiliated with or endorsed by PLAUD, Inc.

### Interoperability Under EU Law

This project is developed and distributed under the interoperability provisions of **EU Directive 2009/24/EC** (the Software Directive):

- **Article 5(3)** permits users to observe, study, and test software to determine underlying ideas and principles
- **Article 6** permits decompilation and reverse engineering when necessary to achieve interoperability with independently created software
- **Article 9** renders contractual clauses restricting these rights null and void

The Court of Justice of the European Union has consistently upheld these protections, notably in *SAS Institute v. World Programming* (C-406/10) and *Top System v. Belgian State* (C-13/20).

### Interoperability Intent

This node enables PLAUD users to connect their data with [n8n](https://n8n.io), an independently created workflow automation platform. PLAUD already supports third-party automation through their official Zapier integration, demonstrating acceptance of interoperability use cases. This project extends similar functionality to the n8n ecosystem.

### Disclaimer

This software is provided as-is for interoperability purposes. Users are responsible for compliance with PLAUD's Terms of Service and applicable laws in their jurisdiction. The maintainers make no warranty regarding account standing or service availability.

## License

MIT
