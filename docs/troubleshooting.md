# Troubleshooting custom base URL setup

Use this page when Cursor, Windsurf, or another AI coding tool fails with a custom OpenAI-compatible endpoint.

## Custom base URL field is absent

Cursor and Windsurf support can vary by version, release channel, account state, and UI surface. If you cannot find a custom base URL, API base URL, endpoint, custom provider, or OpenAI-compatible provider field:

1. Update the app and restart it.
2. Check the current Models, API Keys, Provider, and account settings.
3. Search settings for `base URL`, `endpoint`, `provider`, `OpenAI`, and `BYOK`.
4. Check the app's current official docs or release notes.
5. Use only supported provider fields exposed by your version.
6. Test your provider outside the editor with a small OpenAI-compatible request.
7. Consider a local proxy or router only if your organization approves it.

Do not paste a base URL into an API-key field or a model-name field.

## 401 or invalid API key

Likely causes:

- key copied from a different provider than the base URL
- key revoked, expired, or restricted
- extra whitespace around the key
- missing billing or account access
- a full `Bearer ...` header pasted into a field that expects only the raw token

Fix by generating a fresh key, storing it locally, and testing it with the provider's documented endpoint.

## 403 or model not allowed

Likely causes:

- account lacks access to the selected model
- organization, project, or region restriction
- provider blocks the route used by the editor
- key is valid but scoped too narrowly

Use a model ID that the provider says is enabled for your account.

## 404 model not found

Likely causes:

- wrong model ID
- typo or display name instead of API name
- base URL points to the wrong provider, region, or API version
- missing `/v1` path when the provider requires it
- duplicated `/v1/v1` path from combining app and provider settings

Check the final request URL if the app exposes logs. A provider endpoint like `https://www.tken.shop/v1` should not become `https://www.tken.shop/v1/v1`.

## Network, TLS, or timeout errors

Check:

- corporate proxy or VPN rules
- firewall allowlists
- endpoint certificate validity
- provider service status
- whether the editor can access the public internet

Keep retry tests small so failures are cheap and easy to inspect.

## TKEN example does not work

TKEN is included as a disclosed example endpoint, not a guarantee of support in every editor version:

```text
https://www.tken.shop/v1
```

If it fails, verify your key, model ID, account access, and whether your editor exposes a real custom base URL field. Visit [TKEN with troubleshooting UTM attribution](https://www.tken.shop/?utm_source=github&utm_medium=docs&utm_campaign=cursor_windsurf_base_url_guide&utm_content=troubleshooting) for provider-side details.

## Secret handling

Never commit real provider keys. Use `.env` locally and commit only `.env.example` placeholders.
