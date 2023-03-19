# Isaiah Griego's - Solution

Here I would like to submit my solution to the take home assessment. I have provided a NodeJS application to parse the `data.json` file and produce the ouput. The application can also be run from the command line and is called out in the [scripts](#scripts) section of this document.

Thank you for taking time and consideration of my submission and I hope it finds you well! I had fun with this little exercise and I hope it is pretty straight forward and easy to follow. Again, thank you for reading this and have a great day! - Isaiah Griego (me@isaiahgriego.dev)

## Assumptions

I assumed that the input data would have props that were not required or that the input would be given in more or less good form. Some props that exist on the data but were not used were still called out in the type definitions for those objects and marked as optional. Another assumption I made in case of malformed data was to respond with empty results as opposed to throwing error as that seemed logical as to not break the app in the case this was to run as a service, and that could be called out in a log entry but I did not want to stop the flow of the application. I did not handle the case where `idina_response.sources` was not an array as that was made explicit in the requirements.

I also assumed by the prompt that the output was to be to the console so that is where I logged the data.

I used JSDoc and Jest for documentation and documentation for their ease of use and limited configuration, although they might not be my first choice for this example seemed it made sense.

Future enhancements and additional features I though would be next steps for this, albeit arbitrary, exercise are called out in the [Future Enhancements](#future-enhancements) section of this README, here instead of logging to the console the output would be in the response and up to the consumer of the API what to do with the data.

## Setup

To setup this project you will need to have NodeJS installed on your system as well as `node` in your path. This should be confirmed by running `node -v` and the output is something like `18.15.0`.

To install dependencies run `npm install` or alternatively if you are using `yarn` then run `yarn install`.

## Scripts

### `run:dev`

Run this project directly in development mode (e.g. `process.env.TS_NODE_DEV === true`) run `npm run run:dev` or `yarn run:dev`. This takes an optional command line parameter which should point to JSON file whose shape is:

```json
{
  "idina_response": {
    "sources": [
      {
        "url": "abc.def",
        "spam_score": 8,
        "matching_target_indexes": [
          8
        ],
        "matching_source_urls": [
          {
            "url": "abc.xyz",
            "page_authority": 99
          }
        ],
        "domain_authority": 9
      }
    ]
  }
}
```

### `run:prod`

Run this project in production mode (e.g. `process.env.TS_NODE_DEV !== 'production'`) run `npm run run:prod` or `yarn run:prod`. This has the same input parameters as `run:dev` and takes the same input data shape.

## Testing

### `test`

Runs the test suite for use in CI/CS pipelines.

### `test:watch`

Runs the test suite in watch mode for running tests during active development.

## Time Complexity Analysis

Since I am using a `Set` adding of additional spam scores or domain authorities is in O(1) operation and I only loop once through all sources of the input data the time complexity is O(N).

## Space Complexity Analysis

Again I am using 2 sets for both spam scores and domain authorities and 2 maps from number (spam_score or domain_authority) to url that will be at most N large then the space complexity is also O(N).

## Future Enhancements

To extend this even further and make it easier to interface with I would start by turning this into an API. Utilizing something like `express` we could expose an endpoint `GET /api/getSourceDuplicates` that would take the data we need to parse in the body of the request. We could also expose query parameters to generalize the functionality of our endpoint. For example, instead of having `spam_score` and `domain_authority` hardcoded as part of our solution we could have those as a query params `GET /api/getSourceDuplicates?prop=spam_score&prop=domain_authority` to our API. This would require some abstraction of my method 

Going even further I would like to see a `Dockerfile` so that we could create an image of our new API. This would allow us to deploy this as a container in multiple instances or distributed across multiple regions.

Other things that I would add would be logging something like `express-winston` or `morgan` to log requests and response times.

Other considerations I did not have time to address were the ability to specify not just `url` but another parameter or parameters to report on, but since the question explicitly asked for it I hardcoded that value.

## Question
This question should take about 1-2 hours to solve. When you're done, email your source code and solution to us at takehome@moz.com. The easiest way is to send the JS file with a `.txt` extension, e.g. `solution.js.txt`. Even if you don't complete the solution in 2 hours, please email in your progress.

You will be given a large set of data with the following JSON format in `data.json`
```
{
  "idina_response":{
    "sources":[
      {
        "url":"example.com",
        "spam_score": 1,
        "matching_target_indexes":[
          0
        ],
        "matching_source_urls":[
          {
            "url":"example.com/news/current/",
            "page_authority":44
          }
        ],
        "domain_authority":95
      },
      // ...
    ]
  }
}
```
From this data we would like you to write code that produces two lists. The first will be the list of all the URLs that have a duplicate `spam_score`, and the second will be a list of all the URLs with a duplicate `domain_authority`.

Example: The following simplified data would return the following JSON object:

###### Example Data
```
{
  "idina_response":{
    "sources":[
      {
        "url":"example.com",
        "spam_score": 1,
        "domain_authority":95
      },
      {
        "url":"foo.com",
        "spam_score": 2,
        "domain_authority":100
      },
      {
        "url":"bar.com",
        "spam_score": 1,
        "domain_authority":100
      },
      {
        "url":"baz.com",
        "spam_score": 1,
        "domain_authority":12
      },
      {
        "url":"qux.com",
        "spam_score": 2,
        "domain_authority":401
      },
      {
        "url":"moz.com",
        "spam_score": 186,
        "domain_authority":99
      },
    ]
  }
}
```
###### Example output
```
{
  "duplicate_spam_scores": [
    "example.com", 
    "bar.com",
    "foo.com",
    "baz.com",
    "qux.com"
  ],
  "duplicate_domain_authorities": [
    "foo.com",
    "bar.com"
  ]
}
```
