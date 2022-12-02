start:
	npm start

dev-client:
	npm run dev --prefix client

upd-client:
	git pull
	npm run client:build

.PHONY: build