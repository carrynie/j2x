### Install

``` javascript
 $ npm i j2x -D
```

### Import

``` javascript
 import j2x from "j2x"
```

### DEMO

``` javascript
 import j2x from "j2x"

 let jsonObj = {
     someKey: 'example'
 }

 let xmlStr = j2x.json2xml(jsonObj)

 xmlStr = `<someKey><![CDATA[example]]></someKey>`
```

``` javascript
 import j2x from "j2x"

 let xmlStr = `<someKey><![CDATA[example]]></someKey>`

 let jsonObj = j2x.xml2json(xmlStr)

 jsonObj = {
     someKey: 'example'
 }
```
