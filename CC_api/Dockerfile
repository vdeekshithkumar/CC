# Base image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
ENV ASPNETCORE_ENVIRONMENT=Development
EXPOSE 80
EXPOSE 443

# Build image
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["./*.csproj", "./"]
RUN dotnet restore
COPY . .
WORKDIR "/src/"
RUN dotnet build -c Release -o /app/build

# Publish image
FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

# Final image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CC_api.dll"]

# ---------------COMMANDS
#docker run -p 80:80 -p 443:443 container-api-image
#docker build -t container-api-image
