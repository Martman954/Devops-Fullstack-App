# Use official .NET SDK for build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Install EF Core tools
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

# Copy csproj and restore
COPY ./BackendApp.csproj ./
RUN dotnet restore

# Copy all source and build
COPY . ./

# Create migration if it doesn't exist
RUN if [ ! -d "Migrations" ]; then dotnet ef migrations add InitialCreate; fi

RUN dotnet publish -c Release -o out

# Use runtime image for production
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# Expose port 8080 (to match your docker-compose mapping)
EXPOSE 8080
ENTRYPOINT ["dotnet", "BackendApp.dll"]