# How to run this test vault

1. Start the vault server
```
docker compose up -d
```

2. Run init on the server
```
export VAULT_ADDR=http://localhost:8200
vault operator init
```
3. For 3 of the five keys listed run
```
vault operator unseal $KEY
```

### Restarting the server
Just repeat step 3 with 3 keys again
