frontend on [localhost:3000](http://localhost:3000)
npx create-react-app frontend --template typescript

backend on [localhost:5000](http://localhost:5000/weatherforecast)
dotnet new webapi -n BackendApp -o backend

Postgres on port 5432


To Test Data Persistence:
1. First run:
docker-compose up --build

2. Add some data via your API (POST to /notes)
http://localhost:5000/swagger

Stop containers:
docker-compose down

Start again:
docker-compose up

