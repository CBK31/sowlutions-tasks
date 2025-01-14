class NameConverter {
  // find the occurrences indexs of an array of special characters in a string
  async findOccurence(text, searchValue) {
    if (!Array.isArray(searchValue)) {
      searchValue = [searchValue];
    }
    const occurrenceIndex = [];
    for (const val of searchValue) {
      let starter = 0;
      let index;
      do {
        index = text.indexOf(val, starter);
        if (index >= 0) {
          occurrenceIndex.push(index);
          starter = index + 1;
        }
      } while (index >= 0);
    }
    occurrenceIndex.sort((a, b) => a - b);
    return occurrenceIndex;
  }

  // replace the character at a specific index with another character
  async replaceChar(origString, replaceChar, index) {
    const firstPart = origString.substr(0, index);
    const lastPart = origString.substr(index + 1);
    const newString = firstPart + replaceChar + lastPart;
    return newString;
  }

  // remove and upper case all characters at specific indexs (occurrenceIndex array)
  async removeAndUpperCaseNextChar(text, indexToReplace, replacement) {
    let result = text;
    for (let i = 0; i < indexToReplace.length; i++) {
      const targetIndex = indexToReplace[i] - i;
      result = await this.replaceChar(result, replacement, targetIndex);
      if (targetIndex < result.length) {
        const upperChar = result.charAt(targetIndex).toUpperCase();
        result = await this.replaceChar(result, upperChar, targetIndex);
      }
    }
    return result;
  }

  async toCamelCase(input) {
    if (await this.verifyInput(input)) {
      input = input.trim().toLowerCase();
      const occurrences = await this.findOccurence(input, ["_", " "]);
      const cleanedResult = await this.removeAndUpperCaseNextChar(
        input,
        occurrences,
        ""
      );
      console.log("Camel case : ", cleanedResult);
      return cleanedResult;
    }
  }

  async toPascalCase(input) {
    if (await this.verifyInput(input)) {
      input = input.trim().toLowerCase();
      const occurrences = await this.findOccurence(input, ["_", " "]);
      const cleanedResult = await this.removeAndUpperCaseNextChar(
        input,
        occurrences,
        ""
      );
      const result = await this.replaceChar(
        cleanedResult,
        cleanedResult.charAt(0).toUpperCase(),
        0
      );
      console.log("Pascal case : ", result);
      return result;
    }
  }

  async toKebabCase(input) {
    if (await this.verifyInput(input)) {
      input = input.trim().toLowerCase();
      const occurrences = await this.findOccurence(input, [" ", "_"]);
      for (let i = occurrences.length - 1; i >= 0; i--) {
        input = await this.replaceChar(input, "-", occurrences[i]);
      }
      console.log("Kebab case : ", input);
      return input;
    }
  }

  async toSnackCase(input) {
    if (await this.verifyInput(input)) {
      if (!input || input == null) {
        console.warn("wrong input ");
        return "";
      }
      input = input.trim().toLowerCase();
      const occurrences = await this.findOccurence(input, [" ", "-"]);
      for (let i = occurrences.length - 1; i >= 0; i--) {
        input = await this.replaceChar(input, "_", occurrences[i]);
      }
      console.log("Snack case : ", input);
      return input;
    }
  }
  // i should remove all the if else that are at the beining of the functions
  // if (await this.verifyInput(item))
  // and throw an error in verifyInput

  async verifyInput(input) {
    if (!input || input == null) {
      console.warn("wrong input ");
      return false;
    }
    return true;
  }
}
try {
  // example
  let name1 = new NameConverter();
  name1.toCamelCase(null);
  name1.toCamelCase("hello_word");

  let name2 = new NameConverter();
  name2.toPascalCase(null);
  name2.toPascalCase("hello word");
  name2.toPascalCase("hello_word");

  let name3 = new NameConverter();
  name3.toKebabCase(undefined);
  name3.toKebabCase("hello word");

  let name4 = new NameConverter();
  name4.toSnackCase("sfwer verf");
} catch (error) {
  console.warn(error);
}
