# Do not edit this file directly. It is generated by FluentDocker.

FROM denoland/deno:alpine
RUN apk update
RUN apk add --no-cache curl docker-cli wget bash
RUN wget https://github.com/fluentci-io/fluentci-engine/releases/download/v0.4.1/fluentci-engine_v0.4.1_x86_64-unknown-linux-gnu.tar.gz
RUN tar xvf fluentci-engine_v0.4.1_x86_64-unknown-linux-gnu.tar.gz
RUN mv fluentci-engine /usr/local/bin
RUN rm fluentci-engine_v0.4.1_x86_64-unknown-linux-gnu.tar.gz
RUN wget https://dl.fluentci.io/fluentci-studio/v0.1.0/fluentci-studio_v0.1.0_x86_64-unknown-linux-gnu.tar.gz
RUN tar xvf fluentci-studio_v0.1.0_x86_64-unknown-linux-gnu.tar.gz
RUN mv fluentci-studio /usr/local/bin
RUN rm fluentci-studio_v0.1.0_x86_64-unknown-linux-gnu.tar.gz
RUN which fluentci-studio
RUN fluentci-engine --version
RUN curl -L https://dl.dagger.io/dagger/install.sh | DAGGER_VERSION=0.11.0 sh
RUN mv bin/dagger /usr/local/bin
RUN dagger version
RUN deno install -A -r https://cli.fluentci.io -n fluentci
COPY entry.sh /usr/local/bin/entrypoint.sh
RUN fluentci upgrade
RUN fluentci --version
WORKDIR /workspace
CMD ["fluentci"]
ENTRYPOINT ["/tini", "--", "entrypoint.sh"]
