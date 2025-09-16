.PHONY: dev build preview install lint clean

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

install:
	npm install

lint:
	npm run lint

clean:
	rm -rf node_modules
	rm -rf dist

setup: install
	@echo "Frontend setup complete!"