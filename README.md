# uni_rest-api3uzd
# Paleidimas
```
docker-compose up
```
# Endpointai

**Parduotuves daiktu isgavimas:**
```
getItems

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header/>
   <soapenv:Body>
   	<ItemsRequest></ItemsRequest>
   </soapenv:Body>
</soapenv:Envelope>
```

**Parduotuves daiktu pirkimas**
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header/>
   <soapenv:Body>
   	<ItemsBuyRequest>
      <itemId>0</itemId>
    <userId>1</userId>
   </soapenv:Body>
</soapenv:Envelope>
```
