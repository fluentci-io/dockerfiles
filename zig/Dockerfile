# Do not edit this file directly. It is generated by FluentDocker.

FROM ghcr.io/fluent-ci-templates/devbox:latest
RUN devbox global add zig@0.10.1
RUN eval "$(devbox global shellenv)" && zig version
CMD eval "$(devbox global shellenv)" && zig
