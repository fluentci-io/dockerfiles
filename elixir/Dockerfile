# Do not edit this file directly. It is generated by FluentDocker.

FROM ghcr.io/fluentci-io/devbox:latest
RUN devbox version
RUN devbox global add elixir
RUN eval "$(devbox global shellenv --recompute)" && elixir --version
CMD eval "$(devbox global shellenv --recompute)" && elixir
