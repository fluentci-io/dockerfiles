# Do not edit this file directly. It is generated by FluentDocker.

FROM ghcr.io/fluentci-io/nix:latest
RUN adduser --disabled-password devenv
RUN addgroup devenv nixbld
ENV USER=root
RUN echo "trusted-users = root $USER" | tee -a /etc/nix/nix.conf
RUN nix profile install --accept-flake-config github:cachix/cachix
RUN cachix use devenv
RUN nix profile install --accept-flake-config github:cachix/devenv/latest
RUN devenv version
CMD devenv
