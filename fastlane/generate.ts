import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const image = new Dockerfile()
  .from("ghcr.io/fluentci-io/pkgx:latest")
  .run("apt-get update")
  .run("apt-get install -y build-essential ruby ruby-dev ")
  .run("pkgx install bun node unzip rtx wget")
  .run(
    "wget https://github.com/facebook/watchman/releases/download/v2023.10.23.00/watchman-v2023.10.23.00-linux.zip"
  )
  .run("unzip watchman-v2023.10.23.00-linux.zip")
  .run("chmod +x watchman-v2023.10.23.00-linux/bin/*")
  .run("cp watchman-v2023.10.23.00-linux/bin/* /usr/local/bin")
  .run("cp watchman-v2023.10.23.00-linux/lib/* /usr/local/lib")
  .run("wget https://www.openssl.org/source/openssl-1.1.1o.tar.gz")
  .run("tar xvf openssl-1.1.1o.tar.gz")
  .run(
    "cd openssl-1.1.1o && ./config && make && make install && cp libcrypto.so.1.1 /usr/lib"
  )
  .run("watchman --version")
  .run("echo 'eval $(rtx activate bash)' >> ~/.bashrc")
  .run("rtx install java@zulu-17.46.19")
  .run("rtx global java@zulu-17.46.19")
  .env("JAVA_HOME", "/root/.local/share/rtx/installs/java/zulu-17.46.19")
  .env("PATH", "/root/.local/share/rtx/installs/java/zulu-17.46.19/bin:${PATH}")
  .run("gem install bundler")
  .env("ANDROID_HOME", "/root/android-sdk")
  .run(
    "mkdir -p $ANDROID_HOME && wget --output-document=$ANDROID_HOME/cmdline-tools.zip https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip"
  )
  .run(
    "cd $ANDROID_HOME && rm -rf cmdline-tools && unzip -d cmdline-tools cmdline-tools.zip && mv cmdline-tools/cmdline-tools cmdline-tools/latest"
  )
  .env("PATH", "${ANDROID_HOME}/cmdline-tools/latest/bin:${PATH}")
  .run('sdkmanager "platforms;android-33"')
  .run("yes | sdkmanager --licenses")
  .cmd("bash -i");

const dockerfile = image.toString();

console.log(dockerfile);
