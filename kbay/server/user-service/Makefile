start_db:
	docker-compose up -d
stop_db:
	docker-compose down
migrate:
	db-migrate up
migrate_down:
	db-migrate down
create_tables:
	db-migrate create $(n) --sql-file
.PHONY: start_db stop_db migrate migrate_down create_tables