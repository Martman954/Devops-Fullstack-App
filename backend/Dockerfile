# Use official .NET SDK for build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj and restore
COPY ./BackendApp.csproj ./
RUN dotnet restore

# Copy all source and build
COPY . ./
RUN dotnet publish -c Release -o out

# Use runtime image for production
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# Expose port used by Kestrel
EXPOSE 5000
ENTRYPOINT ["dotnet", "BackendApp.dll"]
