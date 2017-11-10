# blockchain-dapp-hack-starter

Blockchain dapp template


## Prerequisites


* Node - tested on `NodeJS v8+`
* **Truffle Version 4+**

```
> npm install -g truffle
```

* testrpc 



## Installing

Install npm dependencies: 

``` 
> npm install
```

Clean `build` directory:

```
> npm run clean 
```

Run Truffle Console:

```
> npm start 
```
or

```
> truffle develop
```

## Running Tests

In the truffle console:

```
truffle(develop)> test
```

## Running (Migrate & Deploy Contracts)

In the truffle console:

```
truffle(develop)> migrate --reset --compile-all
```

## Deploy Web App

Another Terminal: 

```
> npm run dev  
```

**Contract State Reading:**

![](./images/list-view.png)

**Contract State Changing:**

![](./images/edit-view-1.png)

**Contract Event Watching:**

![](./images/edit-view.png)


## Built With

* [Truffle](http://truffleframework.com/) - The Ethereum development framework


## Authors

* **Claudius Mbemba** - [User1m](https://github.com/user1m)

## License

This project is licensed under the ISC License