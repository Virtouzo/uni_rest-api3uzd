# uni_rest-api2uzd
# Paleidimas
```
docker-compose up
```
# Endpointai


**Parduotuves daiktu isgavimas:**
```
GET localhost/items
```

**Parduotuves daiktu pirkimas**
```
POST localhost/buy
Body: 
{
  "userId": number,
  "itemId": number
}
```
