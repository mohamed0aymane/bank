import libxml from "libxmljs2";
import { parseStringPromise } from "xml2js";

export function validateXmlAgainstXsd(xmlBuffer, xsdString) {
  const xmlDoc = libxml.parseXml(xmlBuffer.toString());
  const xsdDoc = libxml.parseXml(xsdString);

  const valid = xmlDoc.validate(xsdDoc);

  return {
    valid,
    errors: xmlDoc.validationErrors
  };
}

export async function parseXmlToJson(xmlBuffer) {
  return await parseStringPromise(xmlBuffer.toString(), {
    explicitArray: true,  
    mergeAttrs: false
  });
}
