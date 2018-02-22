# How to run this test vault

1. Start the vault server
```
docker compose up -d
```

2. Run init on the server
```
export VAULT_ADDR=http://localhost:8200
vault operator init | tee keys
```
This will keep a copy of the keys for you to use later. (Don't commit this)

3. For 3 of the five keys listed run
```
vault operator unseal $KEY
```
Do not forget to save your vault root token

## Restarting the server
Just repeat step 3 with 3 keys again

## Populate vault with test data
1. Login to vault
```
vault auth $ROOT_TOKEN
```

2. Run load script
```
./populate-vault
```


