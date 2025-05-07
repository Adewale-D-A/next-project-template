export default function queryParamsExtractor({
  dataset,
}: {
  dataset: { [key: string]: string | number | undefined };
}) {
  try {
    let concateString = "";
    // turn object into array of key-value pairs and filter result
    //  to only contain objects with a valid value
    const keyArray = Object.keys(dataset).filter((key) =>
      dataset[key] ? true : false
    );
    keyArray?.forEach((item, index) => {
      // concatenate query parameter options
      concateString = concateString + item + "=" + String(dataset[item]);
      // only add the symbol "&" when iteration index is not the final
      concateString =
        index + 1 === keyArray.length ? concateString : concateString + "&";
    });
    // provided remakeRequest is 'true' new api request is made without considering
    // store data
    const remakeRequest = Boolean(
      keyArray.includes("search") || String(dataset["sort"] || "") === "desc"
        ? true
        : false || Number(dataset["limit"] || 10) > 10
        ? true
        : false
    );
    return {
      queryString: concateString,
      validKeys: keyArray,
      remakeRequest: remakeRequest,
    };
  } catch (error) {
    return { queryString: "", validKeys: [], remakeRequest: false };
  }
}
