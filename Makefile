start:
	npm start

client-build:
	npm run client:build

dev-client:
	npm run dev --prefix client

upd-client:
	git pull
	npm run client:build

.PHONY: build