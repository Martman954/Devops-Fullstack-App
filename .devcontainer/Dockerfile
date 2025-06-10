FROM mcr.microsoft.com/devcontainers/dotnet:8.0

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm

RUN apt-get update && apt-get install -y postgresql-client
