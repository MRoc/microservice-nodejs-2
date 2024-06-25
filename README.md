# microservice-nodejs-2

```
npm init -y
npm install typescript ts-node-dev express @types/express
npx tsc --init
```

```
skaffold dev
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


## Digital Ocean

- Create Kubernetes cluster in Digital Ocean
- Install `doctl` from https://docs.digitalocean.com/reference/doctl/how-to/install/
- Create a access token at https://cloud.digitalocean.com/account/api/tokens
- Run `doctl auth init` and use the new token
- Run `doctl kubernetes cluster kubeconfig save <cluster-name>` (microservice-nodejs-3-cluster)
- Run `kubectl get nodes` to see if there are any nodes

- Create access token in Docker Hub
- Store token on the project settings "secret" in GitHub as DOCKER_USERNAME and DOCKER_PASSWORD

- Create access token in Digital Ocean
- Store token on project settings "secret" in GitHub as DIGITALOCEAN_ACCESS_TOKEN

- Create secrets for JWT and Stripe as described under `Secret` section.

- Install ingress controller `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.1/deploy/static/provider/do/deploy.yaml` (https://kubernetes.github.io/ingress-nginx/deploy/)
- Get IP address of load balancer
- Add IP with domain to `C:\Windows\System32\drivers\etc\hosts`


## Locally

- Switch kubernetes context to local
- Create secret `kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<SECRET_KEY>`
- Check secret `kubectl get secrets`
- Edit `C:\Windows\System32\drivers\etc\hosts` to `127.0.0.1 microservice-nodejs-2-dev.com`
- Run `kubectl apply -f ./infra/k8s/ingress-srv.yaml`
- Run `kubectl apply -f ./infra/k8s/auth-mongo-depl.yaml`
- Run `make docker-build`
- Run `docker build -t mroc/auth ./auth/`
- Run `docker push mroc/auth`
- Change `image: us.gcr.io/microservice-nodejs-2/auth` to `image: mroc/auth`
- Run `kubectl apply -f ./infra/k8s/auth-depl.yaml`
- Change `const response = await axios[method](url, body);` to `const response = await axios[method]('https://microservice-nodejs-2-dev.com' + url, body);`
- Once visit `https://microservice-nodejs-2-dev.com` and accepd insecure connection

- `cd ./client`
- `npm run dev`

- If having problem with self signed certificate while rendering NextJS server side on windows, run `$env:NODE_TLS_REJECT_UNAUTHORIZED=0` first.

## Kubernetes

### Contexts

```
kubectl config view
kubectl config use-context <context-name>

kubectl config unset contexts.<context-name> 
kubectl config unset users.<user-name>
kubectl config unset clusters.<cluster-name>
```


### Secret

Secrets are created using an imperative command because they are sensitive data.
The secret is then forwarded as env variable to the pod in the deployment file.

```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<SECRET_KEY>
kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=<SECRET_KEY>
kubectl get secrets
```

### Namespaces

```
kubectl get namespace
kubectl get services -n <namespace>
http://service.namespace.svc.cluster.local
```

ingress-nginx-controller
http://ingress-nginx-controller.ingress-nginx.svc.cluster.local


## How to add a service

- Create a new folder in the root directory
- Add package.json and install dependencies
- Add Dockerfile
- Create index.ts to run the service
- Build image, push to docker hub
- Update k8s deployment file
- Update skaffold file
- Write k8s file for services (mongodb, service, ...)


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
npm install mongoose-update-if-current
```


### Bull


https://github.com/taskforcesh/bullmq?tab=readme-ov-file
https://docs.bullmq.io/

```
npm install bullmq
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

### Next JS

Install Next.js:

```
npx create-next-app@latest
npm install axios @types/axios
```


### Cors

```
npm install cors @types/cors
```

### Stripe

```
npm install stripe

kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=<SECRET_KEY>
kubectl get secrets

npm install react-stripe-checkout
npm install prop-types
```