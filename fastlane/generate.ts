import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const image = new Dockerfile()
  .from("ghcr.io/fluent-ci-templates/android:latest")
  .run(
    "devbox global add jdk@17.0.7+7 ruby@3.2.2 bun@0.8.1 nodejs@18.16.1 watchman@2023.01.30.00"
  )
  .cmd("devbox");

const dockerfile = image.toString();

console.log(dockerfile);
