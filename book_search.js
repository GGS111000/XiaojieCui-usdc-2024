/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
    
//Assumption: searchTerm i.e is 'a', will only return result when 'a' is a word alone, 
//'dark' contains 'a' but won't be considered a found for this function.
function findSearchTermInBooks(searchTerm, scannedTextObj) {
    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };

    // Validate inputs, check the input type
    if (typeof searchTerm !== 'string' || !Array.isArray(scannedTextObj)) {
        throw new Error("Invalid input: searchTerm must be a string and scannedTextObj must be an array.");
    }
    // If the search term is empty, return the empty result immediately
    if (searchTerm.length === 0) {
        return result;
    }

    // Regular expression to find standalone word
    const regex = new RegExp(`\\b${searchTerm}\\b`, 'g');

    // Iterate through each book in the scanned text object, time complexity: O(n) where n is size of input
    scannedTextObj.forEach(book => {
        if (book.Content && Array.isArray(book.Content)) {
            // Iterate through each content item (page) in the book
            book.Content.forEach(page => {
                // Check if the line contains the search term in a case-sensitive manner
                // We use 'indexOf' instead of 'includes' because 'indexOf' is case-sensitive
                if (page.Text.indexOf(searchTerm) !== -1) {
                    // If the term is found, add the relevant details to the results array
                    result.Results.push({
                        "ISBN": book.ISBN,
                        "Page": page.Page,
                        "Line": page.Line,
                    });
                }
            });
        }
    });

    // Return the result object containing the search term and the found results
    return result;
}


/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            },
            {
                "Page": 32,
                "Line": 11,
                "Text": "asd! @ #$%^&*()_+~ 1234567890"
            },
            {
                "Page": 32,
                "Line": 11,
                "Text": "hello astr agasd sgag"
            },
            {
                "Page": 39,
                "Line": 888,
                "Text": "sdfsdf hello fjfjfjfjfj"
            }
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}


// Positive Test: Search for a word that appears in the text
const positiveTest1Result = findSearchTermInBooks("profound", twentyLeaguesIn);
const expectedPositiveTest1Result = {
    "SearchTerm": "profound",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
};

if (JSON.stringify(positiveTest1Result) === JSON.stringify(expectedPositiveTest1Result)) {
    console.log("PASS: Positive Test");
} else {
    console.log("FAIL: Positive Test");
    console.log("Expected:", JSON.stringify(expectedPositiveTest1Result, null, 2));
    console.log("Received:", JSON.stringify(positiveTest1Result, null, 2));
}

// Negative Test
const negativeTestResult = findSearchTermInBooks("nonexistentword", twentyLeaguesIn);
if (negativeTestResult.Results.length === 0) {
    console.log("PASS: Negative Test");
} else {
    console.log("FAIL: Negative Test");
}

// Case-Sensitive Test 1: Testing for the word 'THE' which should not appear in the text.
const caseSensitiveTest1Result = findSearchTermInBooks("THE", twentyLeaguesIn);
if (caseSensitiveTest1Result.Results.length === 0) {
    console.log("PASS: Case-Sensitive Test 1");
} else {
    console.log("FAIL: Case-Sensitive Test 1");
}
// Case-Sensitive Test 2: Testing for the word 'The' which should give the result as 'The' but not 'the'.

const caseSensitiveTest2Result = findSearchTermInBooks("The", twentyLeaguesIn);
const expectedCaseSensitiveTest2Result = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
};

if (JSON.stringify(caseSensitiveTest2Result) === JSON.stringify(expectedCaseSensitiveTest2Result)) {
    console.log("PASS: Case-Sensitive Test 2");
} else {
    console.log("FAIL: Case-Sensitive Test 2");
    console.log("Expected:", JSON.stringify(expectedCaseSensitiveTest2Result, null, 2));
    console.log("Received:", JSON.stringify(caseSensitiveTest2Result, null, 2));
}


// Empty test - Test for an empty string which is allowed and should return an empty result
const negativeTest2 = findSearchTermInBooks("", twentyLeaguesIn);
if (negativeTest2.Results.length === 0 && negativeTest2.SearchTerm === "") {
    console.log("PASS: Empty Test");
} else {
    console.log("FAIL: Empty Test");
    console.log("Expected empty Results array and empty SearchTerm");
    console.log("Received:", negativeTest2);
}

// Empty test - Test for Empty scannedTextObj Array
const resultEmptyScannedText = findSearchTermInBooks("test", []);
if (resultEmptyScannedText.Results.length === 0) {
    console.log("PASS: Test with empty scannedTextObj");
} else {
    console.log("FAIL: Test with empty scannedTextObj");
}

// Invalid Input Test - Test for a non-string searchTerm
const invalidSearchTerm = 123; // searchTerm should be a string, but a number is provided
const invalidScannedTextObj = twentyLeaguesIn; // Valid scanned text object for reference

try {
    const invalidTestResult = findSearchTermInBooks(invalidSearchTerm, invalidScannedTextObj);
    console.log("FAIL: Invalid Input Test - Non-string searchTerm");
    console.log("Expected an error due to invalid searchTerm type.");
} catch (error) {
    console.log("PASS: Invalid Input Test - Non-string searchTerm");
    console.log("Correctly threw an error for invalid searchTerm type:", error.message);
}

// Null scannedTextObj Test
try {
    findSearchTermInBooks("test", null);
    console.log("FAIL: Test with null scannedTextObj");
} catch (error) {
    console.log("PASS: Test with null scannedTextObj");
}

// Undefined scannedTextObj Test
try {
    findSearchTermInBooks("test", undefined);
    console.log("FAIL: Test with undefined scannedTextObj");
} catch (error) {
    console.log("PASS: Test with undefined scannedTextObj");
}


//  Long String in searchTerm Test
const longSearchTerm = "a".repeat(1000); // A string of 1000 'a's
const resultWithLongString = findSearchTermInBooks(longSearchTerm, twentyLeaguesIn);
// If your function is designed to handle long search terms and 'a' is not expected to be found,
// the results should be empty.
if (resultWithLongString.Results.length === 0) {
    console.log("PASS: Test with Long String in searchTerm");
} else {
    console.log("FAIL: Test with Long String in searchTerm");
    console.log("Received:", resultWithLongString);
}

// Non-English searchTerm Test
const nonEnglishSearchTerm = "测试"; // "测试" means "test" in Chinese
const resultWithNonEnglishString = findSearchTermInBooks(nonEnglishSearchTerm, twentyLeaguesIn);
// if '测试' is expected to be found in the text, the results should contain the matches.

if (resultWithNonEnglishString.Results.length === 0) {
    console.log("PASS: Test with Non-English String in searchTerm");
} else {
    console.log("FAIL: Test with Non-English String in searchTerm");
    console.log("Received:", resultWithNonEnglishString);
}

// Irregular Data Structures in scannedTextObj Test
const irregularScannedTextObj = [{ "ISBN": "12345", "Content": "This is not an array" }];
const resultIrregularStructure = findSearchTermInBooks("test", irregularScannedTextObj);

if (resultIrregularStructure.Results.length === 0) {
    console.log("PASS: Test with Irregular Data Structure in scannedTextObj");
} else {
    console.log("FAIL: Test with Irregular Data Structure in scannedTextObj");
    console.log("Received:", resultIrregularStructure);
}

// Numbers in searchTerm Test
const resultNumericSearchTerm = findSearchTermInBooks("123", twentyLeaguesIn);

if (resultNumericSearchTerm.Results.length > 0) {
    console.log("PASS: Test with Numeric String in searchTerm");
} else {
    console.log("FAIL: Test with Numeric String in searchTerm");
}

//Boolean/Object as searchTerm Test
// Testing with a Boolean as searchTerm
try {
    findSearchTermInBooks(true, twentyLeaguesIn);
    console.log("FAIL: Test with Boolean as searchTerm");
} catch (error) {
    console.log("PASS: Test with Boolean as searchTerm");
}

// Testing with an Object as searchTerm
try {
    findSearchTermInBooks({ word: "test" }, twentyLeaguesIn);
    console.log("FAIL: Test with Object as searchTerm");
} catch (error) {
    console.log("PASS: Test with Object as searchTerm");
}


// Test for a word that appears multiple times
const searchTermMultipleResults = "hello"; // Choose a common word
const resultMultipleResults = findSearchTermInBooks(searchTermMultipleResults, twentyLeaguesIn);

// Define the expected number of occurrences based on the data provided
const expectedNumberOfOccurrences = 2; // Update this based on the actual content in twentyLeaguesIn

if (resultMultipleResults.Results.length === expectedNumberOfOccurrences) {
    console.log("PASS: Test with multiple found results for 'hello'");
    console.log(resultMultipleResults)
} else {
    console.log("FAIL: Test with multiple found results for 'hello'");
    console.log("Expected occurrences:", expectedNumberOfOccurrences);
    console.log("Found occurrences:", resultMultipleResults.Results.length);
}
