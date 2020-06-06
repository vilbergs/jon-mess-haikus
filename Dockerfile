FROM hayd/alpine-deno:1.0.3

WORKDIR /app

# Prefer not to run as root.
USER deno

COPY deps.ts .
RUN deno cache deps.ts

ADD . .

CMD ["run", "--allow-net", "--allow-read", "--allow-env", "main.ts"]