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

### 5. Add entries to your Cogits

```bash
# Add a progress update
sep add progress "Finished the API integration" --cogit 6

# Ask a question
sep add question "Should we refactor this?" --cogit 6

# Add a synthesis
sep add synthesis "The key insight is..." --cogit 6
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

### `sep add <type> <content>`

Add an entry to a Cogit.

**Options:**
- `-c, --cogit <cogit-id>` - Cogit ID to add entry to (required)

**Entry Types:**
- `progress` - Track progress and updates
- `question` - Ask questions or raise doubts
- `synthesis` - Summarize conclusions or insights
- `adjustment` - Note changes in approach or direction
- `resource` - Share links, references, or resources

**Examples:**

```bash
# Add a progress update
sep add progress "Completed the authentication system" --cogit 6

# Ask a question
sep add question "Should we use REST or GraphQL?" --cogit 6

# Add a synthesis
sep add synthesis "The best approach is to start simple and iterate" --cogit 6

# Document an adjustment
sep add adjustment "Changed from MySQL to PostgreSQL for better JSON support" --cogit 6

# Share a resource
sep add resource "Great article: https://example.com/api-design" --cogit 6
```

## Configuration

Configuration is stored in `~/.config/septerional-sep/config.json`

- `apiKey` - Your Septerional API key
- `apiUrl` - API endpoint (default: https://api.septerional.com)

## Requirements

- Node.js >= 18.0.0

## License

MIT
