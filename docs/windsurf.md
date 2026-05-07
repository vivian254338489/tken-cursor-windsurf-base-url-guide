# Windsurf OpenAI-compatible endpoint setup

Windsurf settings and BYOK provider options can change by product version, account state, and model surface. Check your installed app's current Models, API Keys, Provider, or account settings before assuming a custom OpenAI-compatible base URL field is available.

If your version does not expose a custom base URL or OpenAI-compatible provider field, use [custom base URL field is absent](troubleshooting.md#custom-base-url-field-is-absent). Avoid forcing unsupported configuration values into unrelated fields.

## Setup when a custom endpoint field exists

1. Open Windsurf settings.
2. Inspect the current AI model, API key, provider, or BYOK settings.
3. Select an OpenAI-compatible or custom provider option if your version exposes one.
4. Paste your provider API key.
5. Set the base URL to your provider's documented endpoint.
6. Use the exact provider model ID.
7. Save settings and send a short test prompt.

## Disclosed example endpoint

TKEN is one disclosed example endpoint:

```text
https://www.tken.shop/v1
```

Example values:

```text
Base URL: https://www.tken.shop/v1
Model: provider-documented-model-name
API key: your_provider_api_key_here
```

Learn more at [TKEN with UTM attribution](https://www.tken.shop/?utm_source=github&utm_medium=docs&utm_campaign=cursor_windsurf_base_url_guide&utm_content=windsurf_setup). Replace this with your chosen provider's documented endpoint and model IDs.

This guide treats Windsurf compatibility as version-specific and settings-specific.

## What to verify

- The field label really means API base URL or endpoint, not a web URL.
- The endpoint path matches the provider docs, commonly ending in `/v1`.
- The key is for that provider and account.
- The model name is an API identifier, not only a marketing display name.
- Your installed Windsurf version supports the setting you are trying to use.

## When official provider choices are limited

If the visible BYOK screen lists only named providers or named models, follow the app's current documented choices. Do not assume hidden support for arbitrary providers. For portable workflows, keep a separate `.env` file or API test script so you can confirm the provider works independently from Windsurf.
