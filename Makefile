# Determine Docker Compose command
DOCKER_COMPOSE := $(shell \
    if command -v docker-compose >/dev/null 2>&1; then \
        echo "docker-compose"; \
    elif docker compose version >/dev/null 2>&1; then \
        echo "docker compose"; \
    else \
        echo ""; \
    fi)

# Check if Docker Compose is available
ifeq ($(DOCKER_COMPOSE),)
    $(error "Neither 'docker-compose' nor 'docker compose' found. Please install Docker Compose.")
endif

DOCKER_COMPOSE_FILE := docker-compose.yml
DOCKER_COMPOSE_CMD := $(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE)

.PHONY: help build run stop logs test test-watch test-coverage

help:
	@echo "Available commands:"
	@echo "  make build         - Build the Docker image"
	@echo "  make run           - Run the Docker container and show logs"
	@echo "  make stop          - Stop the Docker container"
	@echo "  make logs          - Show Docker logs"
	@echo "  make test          - Run tests"
	@echo "  make test-watch    - Run tests in watch mode"
	@echo "  make test-coverage - Run tests with coverage"
	@echo "  make help          - Show this help message"

build:
	@echo "Building Docker images..."
	@$(DOCKER_COMPOSE_CMD) build

run:
	@echo "Starting Docker containers..."
	@$(DOCKER_COMPOSE_CMD) up -d
	@echo "Showing Docker logs..."
	@$(MAKE) logs

stop:
	@echo "Stopping Docker containers..."
	@$(DOCKER_COMPOSE_CMD) down -v

logs:
	@echo "Showing Docker logs..."
	@$(DOCKER_COMPOSE_CMD) logs -f

test:
	@echo "Running tests..."
	@npm test

test-watch:
	@echo "Running tests in watch mode..."
	@npm run test:watch

test-coverage:
	@echo "Running tests with coverage..."
	@npm run test:coverage