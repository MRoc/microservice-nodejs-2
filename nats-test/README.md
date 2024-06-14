# History

```
npm init -y
npm install node-nats-streaming ts-node-dev typescript @types/node
npx tsc --init
```

```
kubectl get pods
kubectl port-forward nats-depl-7b89b4bb96-h8jpv 4222:4222
kubectl port-forward nats-depl-7b89b4bb96-h8jpv 8222:8222
npm run listen
npm run publish
http://localhost:8222/streaming
```