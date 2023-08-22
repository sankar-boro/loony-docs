build-backend:
	cargo build

build: build-backend

start-lily-web:
	yarn start

start-backend: 
	./target/debug/backend

start-frontend: start-lily-web