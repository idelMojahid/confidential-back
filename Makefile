corporeal-api-staging-provision:
ifdef ANSIBLE_TAGS
	ansible-playbook -i ansible/inventories/corporeal/staging ansible/playbook.yml --ask-vault-pass --tags=$(ANSIBLE_TAGS)
else
	ansible-playbook -i ansible/inventories/corporeal/staging ansible/playbook.yml --ask-vault-pass
endif

corporeal-api-staging-deploy:
	./node_modules/.bin/shipit staging deploy

docker-install:
	docker build -t corporeal_postgresql .
	docker run --name pg_corporeal -p 54327:5432  -e POSTGRES_PASSWORD=docker -d corporeal_postgresql
	docker exec -i -t pg_corporeal psql -h localhost -p 5432 -d postgres -U postgres --password -c "CREATE DATABASE corporeal";
	docker exec -i -t pg_corporeal psql -h localhost -p 5432 -d postgres -U postgres --password -c "CREATE DATABASE corporeal_test";

docker-start:
	docker start pg_corporeal
