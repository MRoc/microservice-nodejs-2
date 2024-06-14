# History

```
npm init -y
npm install node-nats-streaming ts-node-dev typescript @types/node
npx tsc --init
```

```
kubectl get pods
kubectl port-forward nats-depl-649878db65-px5tg 4222:4222
kubectl port-forward nats-depl-649878db65-px5tg 8222:8222
npm run listen
npm run publish
http://localhost:8222/streaming
```