# Contributing to n8n-nodes-plaud-unofficial

Thank you for your interest in contributing to this n8n community node for the Plaud API.

## Before You Start

This project uses a **reverse-engineered, unofficial API**. Please keep in mind:

- The API may change without notice, breaking existing functionality
- There is no official documentation; we learn through observation
- Token expiration behavior and rate limits are unknown

## Getting Started

### Prerequisites

- Node.js 22+
- npm
- A Plaud account with recordings (for testing)

### Setup

```bash
# Clone the repository
git clone https://github.com/leonardsellem/n8n-nodes-plaud-unofficial.git
cd n8n-nodes-plaud-unofficial

# Install dependencies
npm install

# Build the project
npm run build
```

### Development

```bash
# Watch mode for development
npm run dev

# Run linter
npm run lint

# Auto-fix lint issues
npm run lint:fix
```

## Quality Gates

Before submitting a PR, ensure your changes pass:

```bash
npm run lint && npm run build
```

CI runs these checks on every PR and push to main.

## Project Structure

```
├── credentials/                    # n8n credential definitions
│   └── PlaudUnofficialApi.credentials.ts
├── nodes/PlaudUnofficial/
│   ├── PlaudUnofficial.node.ts     # Main node implementation
│   ├── PlaudUnofficial.node.json   # Node metadata
│   ├── resources/                  # Operations by resource
│   │   ├── file/                   # File operations
│   │   ├── folder/                 # Folder operations
│   │   ├── ai/                     # AI operations
│   │   └── share/                  # Share operations
│   └── *.svg                       # Node icons
└── dist/                           # Build output (gitignored)
```

## Adding New Operations

1. Create an operation file in the appropriate `resources/<resource>/` folder
2. Export it from `resources/<resource>/index.ts`
3. Add a case in `PlaudUnofficial.node.ts` execute switch
4. Run `npm run lint && npm run build`

### API Patterns

- **Base URL:** `https://api-euc1.plaud.ai`
- **Auth:** Bearer token in `Authorization` header
- **HTTP calls:** Use `httpRequestWithAuthentication` helper
- **Response data:** Typically in `.data` or `.data_file_list` fields

### Example Operation

```typescript
import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function execute(
  this: IExecuteFunctions,
  i: number,
): Promise<INodeExecutionData[]> {
  const response = await this.helpers.httpRequestWithAuthentication.call(
    this,
    'plaudUnofficialApi',
    {
      method: 'GET',
      url: 'https://api-euc1.plaud.ai/your/endpoint',
      json: true,
    },
  );

  return this.helpers.returnJsonArray(response.data);
}
```

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `refactor:` Code refactoring
- `build:` Build system changes
- `chore:` Maintenance tasks

Examples:
```
feat(ai): add transcript export operation
fix(file): handle missing audio_url gracefully
docs: update README with new operations
```

## Pull Request Guidelines

1. **One feature/fix per PR** - Keep PRs focused and reviewable
2. **Descriptive title** - Use conventional commit format
3. **Test your changes** - Verify with a real Plaud account if possible
4. **Update documentation** - If adding new operations, update the README
5. **Pass quality gates** - `npm run lint && npm run build` must succeed

## Reporting Issues

When reporting bugs, please include:

- n8n version
- Node.js version
- Steps to reproduce
- Expected vs actual behavior
- Any error messages

## API Research

If you discover new API endpoints or behaviors:

1. Document your findings in the issue/PR
2. Include example requests/responses (redact sensitive data)
3. Note any limitations or edge cases observed

## Code Style

- Follow the existing code patterns
- Use TypeScript strict mode
- Let ESLint guide formatting decisions
- Keep functions small and focused

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Open an issue for questions about contributing. For usage questions, see the README.
