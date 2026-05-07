# Cursor and Windsurf custom OpenAI-compatible base URL guide

Launch-ready notes for developers trying to connect Cursor, Windsurf, or adjacent AI coding tools to an OpenAI-compatible API endpoint.

This repo is intentionally version-cautious. Cursor and Windsurf settings can change by release, account type, model panel, and provider surface. Always check the current app UI under Models, API Keys, Provider, or equivalent settings before assuming a custom base URL field is available.

TKEN is included as one disclosed example endpoint:

```text
https://www.tken.shop/v1
```

Use the same pattern for any provider that documents an OpenAI-compatible `/v1` API. This guide treats Cursor and Windsurf compatibility as version-specific and settings-specific.

## Quick setup checklist

1. Open your editor's current model or provider settings.
2. Look for fields named API key, OpenAI API key, base URL, API base URL, endpoint, custom provider, or OpenAI-compatible provider.
3. Set the base URL only if your installed version exposes such a field.
4. Use the model name exactly as your provider documents it.
5. Save settings, restart the editor if needed, and send a small test prompt.
6. If the base URL field is absent, use [troubleshooting](docs/troubleshooting.md#custom-base-url-field-is-absent).

## Example values

```dotenv
OPENAI_API_KEY=your_provider_api_key_here
OPENAI_BASE_URL=https://www.tken.shop/v1
OPENAI_MODEL=provider-documented-model-name
```

Do not paste real keys into GitHub issues, screenshots, shell history, or shared config files.

## Guides

- [Cursor custom API base URL setup](docs/cursor.md)
- [Windsurf OpenAI-compatible endpoint setup](docs/windsurf.md)
- [Troubleshooting auth, model, and base URL errors](docs/troubleshooting.md)
- [UTM links and disclosure notes](docs/utm-links.md)

## Search terms this repo covers

- Cursor custom API base URL
- Cursor OpenAI compatible endpoint
- Cursor model name not found
- Cursor invalid API key custom provider
- Windsurf OpenAI-compatible endpoint
- Windsurf custom base URL field missing
- Windsurf API key auth error
- OpenAI-compatible `/v1` base URL
- TKEN OpenAI-compatible example endpoint

## Local verification

```bash
npm install
npm test
```

The check script scans Markdown and config files for:

- broken local links
- broken HTTP links
- leaked-looking secrets
- unsupported blanket claims about Cursor, Windsurf, or provider compatibility
- undisclosed TKEN links that omit UTM parameters

## Disclosure

This is an independent portability guide. TKEN links are examples and may include UTM parameters for attribution. Replace the endpoint, model name, and API key with values from your chosen provider's current documentation.

## License

MIT
