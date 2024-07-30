# Pet-microservice-cluster

Others have pets, I have a kubernetes cluster. This project is a pet-project microservice kubernetes cluster. It's a bit messy and hairy. Welcome to my journey of becoming a cloud native. It is based on Stephen Grinder "Microservices with Node JS and React" course on Udemy. It progresses so far by:

- [X] Volumes are now persistent.
- [X] Use of Kustomize to deploy to `dev` or `production`.
- [X] Configure all URLs using ~~properties~~ kustomize.
- [ ] Add prometheus
  - [ ] Base package
  - [ ] Service monitor for applications
- [ ] Streamline creation of PersistentVolumes between dev and prod.
- [ ] Consider fixing CI/CD when wanting to pay for prod.

## Deployment

### Local Windows

- Switch context `kubectl config use-context docker-desktop`
- Create secret `kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<SECRET_KEY>`
- Create secret `kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=<SECRET_KEY>>`
- Edit `C:\Windows\System32\drivers\etc\hosts` to `127.0.0.1 <my_url>`
- Deploy ingress nginx `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.11.1/deploy/static/provider/cloud/deploy.yaml` (https://kubernetes.github.io/ingress-nginx/deploy/#quick-start)
- Run `kubectl apply -k ./infra/overlays/dev`
- Once visit `https://<my_url>` and accept kubectl insecure connection


Notes:
  - In case of https errors in browser, remind `thisisunsafe` ;)
  - If having problem with self signed certificate while rendering NextJS server side on windows, run `$env:NODE_TLS_REJECT_UNAUTHORIZED=0` first.
  - The PVs are located in `/mnt/wsl/data`


### Digital Ocean

- Create Kubernetes cluster in Digital Ocean
- Install `doctl` from https://docs.digitalocean.com/reference/doctl/how-to/install/
- Create a access token at https://cloud.digitalocean.com/account/api/tokens
- Run `doctl auth init` and use the new token
- Run `doctl kubernetes cluster kubeconfig save <cluster-name>` (microservice-nodejs-9-cluster)
- Run `kubectl get nodes` to see if there are any nodes
- Create access token in Docker Hub
- Store token on the project settings "secret" in GitHub as DOCKER_USERNAME and DOCKER_PASSWORD
- Create access token in Digital Ocean
- Store token on project settings "secret" in GitHub as DIGITALOCEAN_ACCESS_TOKEN
- Create secret `kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<SECRET_KEY>`
- Create secret `kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=<SECRET_KEY>>`
- Install ingress controller `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.1/deploy/static/provider/do/deploy.yaml` (https://kubernetes.github.io/ingress-nginx/deploy/)
- Run `kubectl apply -k ./infra/overlays/prod`
- Get IP address of load balancer
- Add IP with domain to `C:\Windows\System32\drivers\etc\hosts`

### Google cloud

- Visit https://console.cloud.google.com/welcome?hl=en&project=microservice-nodejs-2
- Enable Kubernetes Engine API
- Create a cluster
- Install Google Cloud SDK https://cloud.google.com/sdk/docs/install
- Run `gcloud` from terminal
- Run `gcloud init`
- Run `gcloud components install gke-gcloud-auth-plugin`
- Run `gcloud container clusters get-credentials autopilot-microservice-nodejs-2 --location europe-west3`
- Change `image: mroc/xyz` to `image: us.gcr.io/microservice-nodejs-2/xyz` in all YAMLs.
- Run `kubectl config current-context`
- Visit https://console.cloud.google.com/marketplace/product/google/cloudbuild.googleapis.com?q=search&referrer=search&hl=en&project=microservice-nodejs-2
- Enable Cloud Build
- Run `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.1/deploy/static/provider/cloud/deploy.yaml` (https://kubernetes.github.io/ingress-nginx/deploy/)
- Visit https://console.cloud.google.com/net-services/loadbalancing/list/loadBalancers?referrer=search&hl=en&project=microservice-nodejs-2
- Get IP address of load balancer
- Add IP with domain to `C:\Windows\System32\drivers\etc\hosts`

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

## How to add a service

To create a new microservice, the following commands are used:

```bash
npm init -y
npm install typescript ts-node-dev express @types/express
npx tsc --init
skaffold dev
```

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

```bash
npm install bullmq
```

### Cookie session

https://github.com/expressjs/cookie-session

```bash
npm install cookie-session @types/cookie-session
```

### JWT

https://github.com/auth0/node-jsonwebtoken

```bash
npm install jsonwebtoken @types/jsonwebtoken
```

### Tests

Allows to test a express server and routes.

```bash
npm install --save-dev jest @types/jest supertest @types/supertest ts-jest mongodb-memory-server
```

### Next JS

Install Next.js:

```bash
npx create-next-app@latest
npm install axios @types/axios
```

### Cors

```bash
npm install cors @types/cors
```

### Stripe

```bash
npm install stripe

kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=<SECRET_KEY>
kubectl get secrets

npm install react-stripe-checkout
npm install prop-types
```