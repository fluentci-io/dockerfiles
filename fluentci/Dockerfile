# Do not edit this file directly. It is generated by FluentDocker.

FROM denoland/deno:ubuntu-1.44.0
RUN apt-get update
RUN apt-get install -y curl wget git sudo build-essential
RUN apt-get install -y --no-install-recommends ca-certificates iptables openssl pigz xz-utils
RUN curl https://pkgx.sh | sh
RUN pkgx install docker.com/cli
ARG USER=fluentci
ARG USER_ID=30033
ARG GROUP_ID=30033
RUN addgroup --gid $GROUP_ID ${USER} \
  && useradd --groups sudo --no-create-home --shell /bin/bash ${USER} --uid ${USER_ID} --gid ${GROUP_ID} \
  && echo "${USER} ALL=(ALL) NOPASSWD:ALL" >/etc/sudoers.d/${USER} \
  && chmod 0440 /etc/sudoers.d/${USER}
RUN mkdir -p /home/${USER} && chown -R ${USER}:${USER} /home/${USER} /root
RUN wget https://github.com/fluentci-io/fluentci-engine/releases/download/v0.4.7/fluentci-engine_v0.4.7_x86_64-unknown-linux-gnu.tar.gz
RUN tar xvf fluentci-engine_v0.4.7_x86_64-unknown-linux-gnu.tar.gz
RUN mv fluentci-engine /usr/local/bin
RUN rm fluentci-engine_v0.4.7_x86_64-unknown-linux-gnu.tar.gz
RUN wget https://dl.fluentci.io/fluentci-studio/v0.1.6/fluentci-studio_v0.1.6_x86_64-unknown-linux-gnu.tar.gz
RUN tar xvf fluentci-studio_v0.1.6_x86_64-unknown-linux-gnu.tar.gz
RUN mv fluentci-studio /usr/local/bin
RUN rm fluentci-studio_v0.1.6_x86_64-unknown-linux-gnu.tar.gz
RUN which fluentci-studio
RUN fluentci-engine --version
RUN curl -L https://dl.dagger.io/dagger/install.sh | DAGGER_VERSION=0.12.0 sh
RUN mv bin/dagger /usr/local/bin
RUN dagger version
RUN deno install -A -r -g --unstable-kv --import-map https://raw.githubusercontent.com/fluentci-io/fluentci/main/import_map.json  https://raw.githubusercontent.com/fluentci-io/fluentci/main/main.ts -n fluentci
COPY entry.sh /usr/local/bin/entrypoint.sh
RUN fluentci --version
WORKDIR /root
ENV DOCKER_TLS_CERTDIR=/certs
RUN mkdir /certs /certs/client && chmod 1777 /certs /certs/client
COPY --from=docker:27-dind /usr/local/bin/ /usr/local/bin/
VOLUME /var/lib/docker
CMD ["fluentci"]
ENTRYPOINT ["/tini", "--", "entrypoint.sh"]
