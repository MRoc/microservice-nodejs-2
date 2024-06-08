# microservice-nodejs-2

```
npm init -y
npm install typescript ts-node-dev express @types/express
npx tsc --init
```

```
skaffold dev
make docker-build
make k8s-apply
```

```
http://microservice-nodejs-2-dev.com/api/users/currentuser
```

## Google cloud

- Visit https://console.cloud.google.com/welcome?hl=en&project=microservice-nodejs-2
- Enable Kubernetes Engine API
- Create a cluster
- Install Google Cloud SDK https://cloud.google.com/sdk/docs/install
- Run `gcloud` from terminal
- Run `gcloud init`
- Run `gcloud components install gke-gcloud-auth-plugin`
- Run `gcloud container clusters get-credentials autopilot-microservice-nodejs-2 --location europe-west3`
- Run `kubectl config current-context`
- Visit https://console.cloud.google.com/marketplace/product/google/cloudbuild.googleapis.com?q=search&referrer=search&hl=en&project=microservice-nodejs-2
- Enable Cloud Build
- Run `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.1/deploy/static/provider/cloud/deploy.yaml` (https://kubernetes.github.io/ingress-nginx/deploy/)
- Visit https://console.cloud.google.com/net-services/loadbalancing/list/loadBalancers?referrer=search&hl=en&project=microservice-nodejs-2
- Get IP address of load balancer
- Add IP with domain to `C:\Windows\System32\drivers\etc\hosts`

## Kubernetes

### Secret

Secrets are created using an imperative command because they are sensitive data.
The secret is then forwarded as env variable to the pod in the deployment file.

```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<SECRET_KEY>
kubectl get secrets
```

## NPM

### express-validator

https://express-validator.github.io/docs/

```
 npm install express-validator
 ```

Add error handlers `error-handlers.ts`

### ExpressJS Async Errors

Allow express to catch errors in async handlers.

https://github.com/davidbanham/express-async-errors

```
npm install express-async-errors
```

### Mongo

```
npm install mongoose @types/mongoose
```

### Cookie session

https://github.com/expressjs/cookie-session

```
npm install cookie-session @types/cookie-session
```

### JWT

https://github.com/auth0/node-jsonwebtoken

```
npm install jsonwebtoken @types/jsonwebtoken
```

### Tests

Allows to test a express server and routes.

```
npm install --save-dev jest @types/jest supertest @types/supertest ts-jest mongodb-memory-server
```