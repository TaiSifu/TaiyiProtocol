# @taiyi/subgraph

A subgraph that indexes actors or sifus events.

## Quickstart

```sh
pnpm install
```

## Taiyi subgraph

This repo contains the templates for compiling and deploying a graphql schema to thegraph.

### Authenticate

To authenticate for thegraph deployment use the `Access Token` from thegraph dashboard:

```sh
pnpm run graph auth https://api.thegraph.com/deploy/ $ACCESS_TOKEN
```

### Local subgraph server

You can start a custom graph-node for local subgrah server.

1. Prepare graph-node docker from source
```sh
git clone https://github.com/graphprotocol/graph-node/
cd graph-node/docker
```

2. If you use some external evm network such as BSC, you can do this 
```sh
vim docker-compose.yml
```
change `ethereum: 'mainnet:http://host.docker.internal:8545'` to `ethereum: 'bsc:https://bsc-dataseed3.defibit.io/'`

3. Start graph-node from docker
```sh
docker-compose up
```

4. Create subgraph space for taiyi
```sh
graph create --node http://localhost:8020 taiyi
```

### Create subgraph.yaml from config template

```sh
pnpm prepare:[network] # Supports rinkeby and mainnet and local
```

### Generate types to use with Typescript

```sh
pnpm codegen
```

### Compile and deploy to thegraph (must be authenticated)

```sh
pnpm deploy:[network] # Supports rinkeby and mainnet(in local mode, set mainnet in graph-node docker)
```
