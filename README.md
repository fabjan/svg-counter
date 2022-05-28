# SVG Counter

SVG counter manages an arbitrary set of named counters and serves SVG images to
show them.

https://svg-counter.fmb.workers.dev

## Setup

You will need npm and a Cloudflare account (free).

1. Run `npm install`.

1. You'll need a Workers account, register at
https://dash.cloudflare.com/sign-up/workers

1. Create an API token from the "Edit Cloudflare Workers" template on
https://dash.cloudflare.com/profile/api-tokens

1. Export `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in the shell you
use `wrangler`

1. Create a COUNTERS KV namespace through wrangler:
https://developers.cloudflare.com/workers/wrangler/cli-wrangler/commands/#kv

1. Edit [wrangler.toml](./wrangler.toml) to replace the KV space ids with your
own (id and preview_id can be the same).

## Running

`npm run start-worker`

## Publishing

`npm run publish-worker` will make your worker public.

## License

MIT, see [LICENSE](./LICENSE).

## Notes

(as of 2022-05-28) `wrangler` has a transitive dependency on a vulnerable
version of `dicer`, it's been bumped in `miniflare`
https://github.com/cloudflare/miniflare/pull/269 so should soon be fixed in
`wrangler` I assume.

## TODO

- [ ] themes
