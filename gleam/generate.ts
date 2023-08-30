import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const image = new Dockerfile()
  .from("alpine:latest")
  .run("apk update")
  .run("apk add curl bash python3 alpine-sdk")
  .run(
    'curl --proto =https --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install linux --extra-conf "sandbox = false" --init none --no-confirm'
  )
  .env("PATH", "${PATH}:/nix/var/nix/profiles/default/bin")
  .run(
    "sed -i 's/auto-allocate-uids = true/auto-allocate-uids = false/g' /etc/nix/nix.conf"
  )
  .run("adduser --disabled-password devbox")
  .run("addgroup devbox nixbld")
  .env("FORCE", "1")
  .run("curl -fsSL https://get.jetpack.io/devbox | bash")
  .run("devbox global add gleam erlang rebar3")
  .run('eval "$(devbox global shellenv)" && gleam --version')
  .cmd("devbox version");

const dockerfile = image.toString();

console.log(dockerfile);
