import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const image = new Dockerfile()
  .from("alpine:latest")
  .run("apk update")
  .run("apk add bash curl openjdk11 wget unzip git libstdc++ zlib gcompat")
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
  .env("ANDROID_HOME", "/root/android-sdk")
  .run(
    "mkdir -p $ANDROID_HOME && wget --output-document=$ANDROID_HOME/cmdline-tools.zip https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip"
  )
  .run(
    "cd $ANDROID_HOME && rm -rf cmdline-tools && unzip -d cmdline-tools cmdline-tools.zip && mv cmdline-tools/cmdline-tools cmdline-tools/latest"
  )
  .env("PATH", "$PATH:$ANDROID_HOME/cmdline-tools/latest/bin")
  .run("sdkmanager --version")
  .run('sdkmanager "platforms;android-33"')
  .run("yes | sdkmanager --licenses")
  .cmd("devbox version");

const dockerfile = image.toString();

console.log(dockerfile);
