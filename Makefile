tsc-check:
	tsc --noEmit -p ./auth
	tsc --noEmit -p ./client
	tsc --noEmit -p ./common
	tsc --noEmit -p ./expiration
	tsc --noEmit -p ./orders
	tsc --noEmit -p ./payments
	tsc --noEmit -p ./tickets
docker-build:
	docker build -t mroc/auth ./auth/
	docker push mroc/auth
k8s-apply:
	kubectl apply -f ./infra/k8s/.
k8s-restart:
	kubectl rollout restart deployment auth-depl
k8s-delete:
	kubectl delete deployment auth-depl
	kubectl delete deployment auth-mongo-depl
	kubectl delete deployment client-depl
k8s-status:
	kubectl get deployments
	kubectl get pods
	kubectl get services