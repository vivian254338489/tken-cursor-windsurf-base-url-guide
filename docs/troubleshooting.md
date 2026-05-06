# Troubleshooting

## Auth Error

Make sure the API key is copied from TKEN and sent as a bearer token.

## Model Route Error

Check that the model route exists in your account. Start with `free-model` and `premium-gpt`.

## Base URL Error

Use the `/v1` endpoint:

```text
https://www.tken.shop/v1
```

## When To Use Premium

Use a premium route for code generation, multi-file reasoning, and final high-risk changes. Use a low-cost route for summaries and formatting.
