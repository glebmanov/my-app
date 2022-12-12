start:
	npm start

server:
	npm run server

client-build:
	npm run client:build

client-dev:
	npm run dev --prefix client

client-upd:
	git pull
	npm run client:build

.PHONY: build