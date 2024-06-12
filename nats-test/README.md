# History

```
npm init -y
npm install node-nats-streaming ts-node-dev typescript @types/node
npx tsc --init
```

```
kubectl get pods
kubectl port-forward nats-depl-649878db65-9h5vm 4222:4222
npm run listen
npm run publish
```