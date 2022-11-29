start:
	npm start

dev-client:
	npm run dev --prefix client

upd-front:
	git pull
	npm run client:build
	npm start

.PHONY: build