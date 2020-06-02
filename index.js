class j2x {
    static json2xml(jsonObj) {
        if (typeof (jsonObj) == 'number') {
            return jsonObj
        }
        if (typeof (jsonObj) == 'string') {
            return '<![CDATA[' + jsonObj + ']]>'
        }
        let xmlstr = ''
        for (var key in jsonObj) {
            if (jsonObj[key] instanceof Array) {
                jsonObj[key].forEach((element) => {
                    xmlstr += '<' + key + '>'
                    xmlstr += j2x.json2xml(element)
                    xmlstr += '</' + key + '>'
                })
                continue
            }
            xmlstr += '<' + key + '>'
            xmlstr +=j2x.json2xml(jsonObj[key])
            xmlstr += '</' + key + '>'
        }
        return xmlstr
    }

    static xml2json(xmlStr) {
        xmlStr = xmlStr.replace(/^\s*<\?xml[\S\s]*?\?>/, '')

        let obj = {}
        while (/<([^>\s]+)[\S\s]*?>/.test(xmlStr)) {
            let tagName = RegExp.$1
            if (/\s*\/\s*>$/.test(RegExp['$&'])) {
                xmlStr = xmlStr.replace(RegExp['$&'], '')
                obj[tagName] = ''
                continue
            }

            if (/!\[CDATA\[([\S\s]*?)\]\]/.test(xmlStr)) {
                xmlStr = xmlStr.replace(/<!\[CDATA\[([\S\s]*?)\]\]>/, '$1')
                continue
            }

            let regex = '<' + tagName + '[\\S\\s]*?>([\\S\\s]*?)<\\/' + tagName + '>'
            regex = new RegExp(regex)
            xmlStr = xmlStr.replace(regex, '')

            let subNode = j2x.xml2json(RegExp.$1)

            if (typeof (obj[tagName]) != 'undefined') {
                if (obj[tagName] instanceof Array) {
                    obj[tagName].push(subNode)
                    continue
                }
                obj[tagName] = [obj[tagName], subNode]

                continue
            }

            obj[tagName] = subNode
        }

        if (!Object.getOwnPropertyNames(obj).length) {
            return xmlStr
        }

        return obj
    }
}

export default j2x;