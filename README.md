# Septerional Sep CLI

Command-line interface for managing Cogits on Septerional.

## Installation

```bash
npm install -g @septerional/sep
```

## Quick Start

### 1. Initialize with your API key

```bash
sep init
```

This will prompt you for your API key. Get one from [console.septerional.com](https://console.septerional.com).

### 2. Create a Cogit

```bash
sep create "My First Cogit"
```

With options:

```bash
sep create "Project Ideas" \
  --description "Ideas for my next project" \
  --tags "ideas,projects,todo" \
  --private
```

### 3. List your Cogits

```bash
sep list
```

Show more results:

```bash
sep list --limit 20
```

### 4. Search Cogits

```bash
sep search "javascript"
```

## Commands

### `sep init`

Authenticate with your API key.

### `sep create <title>`

Create a new Cogit.

**Options:**
- `-d, --description <text>` - Cogit description
- `-t, --tags <tags>` - Comma-separated tags
- `--private` - Make the Cogit private (default: public)

**Examples:**

```bash
# Simple cogit
sep create "Morning thoughts"

# With description and tags
sep create "API Design Notes" \
  --description "Notes on REST API design patterns" \
  --tags "api,design,backend"

# Private cogit
sep create "Personal Journal" --private
```

### `sep list`

List your Cogits.

**Options:**
- `-l, --limit <number>` - Number of Cogits to show (default: 10)

**Examples:**

```bash
# List last 10 cogits
sep list

# List last 50 cogits
sep list --limit 50
```

### `sep search <query>`

Search for Cogits.

**Examples:**

```bash
# Search by keyword
sep search "react hooks"

# Search for a specific topic
sep search "machine learning"
```

## Configuration

Configuration is stored in `~/.config/septerional-sep/config.json`

- `apiKey` - Your Septerional API key
- `apiUrl` - API endpoint (default: https://api.septerional.com)

## Requirements

- Node.js >= 18.0.0

## License

MIT
