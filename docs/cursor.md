# Cursor custom API base URL setup

Cursor's model and API-key UI can vary by version and account state. Before changing anything, open your installed Cursor app and inspect the current settings surface for model, API key, provider, or base URL controls.

This page is written for the common case where your Cursor version exposes an OpenAI API key and a custom base URL or equivalent override field. If that field is not present, see [custom base URL field is absent](troubleshooting.md#custom-base-url-field-is-absent).

## Setup

1. Open Cursor settings.
2. Go to the current Models, API Keys, Provider, or equivalent AI settings section.
3. Look for a provider row or custom endpoint option for OpenAI-compatible APIs.
4. Add your provider API key.
5. If available, set the base URL to the provider's documented `/v1` endpoint.
6. Enter the model name exactly as documented by the provider.
7. Save, reload Cursor if requested, and test with a short prompt.

## Disclosed example endpoint

TKEN can be used as one example of a `/v1` style endpoint:

```text
https://www.tken.shop/v1
```

Example values:

```text
Base URL: https://www.tken.shop/v1
Model: provider-documented-model-name
API key: your_provider_api_key_here
```

Start from [TKEN with UTM attribution](https://www.tken.shop/?utm_source=github&utm_medium=docs&utm_campaign=cursor_windsurf_base_url_guide&utm_content=cursor_setup) if you want to inspect that example provider. This guide does not claim Cursor officially supports TKEN or every OpenAI-compatible provider in every version.

## Model names

Model-name errors usually come from one of these:

- using an OpenAI model name when your provider exposes a different alias
- omitting a provider prefix required by the provider
- selecting a model that is not enabled for your account
- typing a display name instead of the API model ID

Use the provider's current model list as the source of truth. If a model fails in Cursor, test the same base URL, key, and model name with a small API request or provider dashboard before changing editor settings again.

## Auth notes

For OpenAI-compatible APIs, most providers expect a bearer token style key. In app UI, paste only the raw API key unless the field explicitly asks for a full header value.

If you see `401`, `403`, `invalid_api_key`, or `unauthorized`, check:

- the key belongs to the same provider as the base URL
- the base URL includes `/v1` only when the provider documents it
- the key has model access
- the key was not copied with whitespace
- no real key was committed to a repo
