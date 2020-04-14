# AzSearch.js
Automagical UI and sample react controls for [Azure Search](https://docs.microsoft.com/en-us/azure/search/) using [AzSearchStore](https://github.com/EvanBoyle/AzSearchStore). Written in [TypeScript](https://www.typescriptlang.org/).

[![Build Status](https://travis-ci.org/EvanBoyle/AzSearch.js.svg?branch=master)](https://travis-ci.org/EvanBoyle/AzSearch.js)

## Live Demo
* [Real estate demo](https://azsearchstore.azurewebsites.net/realestate.html) | [source](https://github.com/EvanBoyle/AzSearch.js/blob/master/realestate.html)

## Get started developing an AzSearch.js app in Typescript
* [Sample TypeScript project](https://github.com/EvanBoyle/AzSearch.jsTypeScriptStarter): clone, customize, and go.

## App Generator
The following link contains a tool to help generate starting sample app that you can further customeize:

* [AzSearch.js application generator](http://azsearchstore.azurewebsites.net/azsearchgenerator/index.html). Generate an app to explore your data with just your service name, query key, and index definition JSON.

## Overview video

* [Building a search app with Azure Search and AzSearch.js (channel9)](https://channel9.msdn.com/Shows/Data-Exposed/Building-Search-Apps-with-Azure-Search-and-AzSearchjs)

## CORS

Don't forget to enable CORS on your index. Make sure to always use a [query key](https://docs.microsoft.com/en-us/azure/search/search-query-rest-api#identify-your-azure-search-services-query-api-key).
## Quick note on data
Samples and documentation assume the real estate sample index available through the portal. A demo account is provided for the samples. To create your own service and load the real estate sample [see this guide](https://docs.microsoft.com/en-us/azure/search/search-get-started-portal).

## Contents
* [Installation](https://github.com/EvanBoyle/AzSearch.js#installation)
    * [CDN](https://github.com/EvanBoyle/AzSearch.js#cdn)
    * [NPM](https://github.com/EvanBoyle/AzSearch.js#npm)
* [Automagic](https://github.com/EvanBoyle/AzSearch.js#automagic)
    * [Basic usage](https://github.com/EvanBoyle/AzSearch.js#basic-usage)
    * [constructor](https://github.com/EvanBoyle/AzSearch.js#constructor)
    * [addSearchBox](https://github.com/EvanBoyle/AzSearch.js#addsearchbox)
    * [addResults](https://github.com/EvanBoyle/AzSearch.js#addresults)
    * [addLoadingIndicator](https://github.com/EvanBoyle/AzSearch.js#addLoadingIndicator)
    * [addPager](https://github.com/EvanBoyle/AzSearch.js#addpager)
    * [addRangeFacet](https://github.com/EvanBoyle/AzSearch.js#addrangefacet)
    * [addCheckboxFacet](https://github.com/EvanBoyle/AzSearch.js#addcheckboxfacet)
    * [addClearFiltersButton](https://github.com/EvanBoyle/AzSearch.js#addClearFiltersButton)
    * [addSortBy](https://github.com/EvanBoyle/AzSearch.js#addSortBy)
    * [addStaticFilter](https://github.com/EvanBoyle/AzSearch.js#addStaticFilter)
    * [store](https://github.com/EvanBoyle/AzSearch.js#store)
    * [Custom CSS](https://github.com/EvanBoyle/AzSearch.js#custom-css)
* [Components & Containers](https://github.com/EvanBoyle/AzSearch.js#components--containers)
* [Development](https://github.com/EvanBoyle/AzSearch.js#development)

## Installation

### CDN

```html

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/azsearch.js@0.0.21/dist/AzSearch.css">
<!-- Dependencies -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/react/15.5.4/react.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/react/15.5.4/react-dom.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/redux/3.6.0/redux.min.js"></script>
<!-- Main -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/azsearch.js@0.0.21/dist/AzSearch.bundle.js"></script>
```

### NPM

```
npm install azsearch.js --save
```

## Automagic

Automagic provides a set of simple APIs to generate a sample search UI. Automagic is a wrapper of [AzSearchStore](https://github.com/EvanBoyle/AzSearchStore) (for state management) and the sample react components in this repo. 

### Basic usage

```js
    // Initialize
    var automagic = new AzSearch.Automagic({ 
        index: "realestate-us-sample", 
        queryKey: "D1CD08C7AC6A1886024E0F23B1824417", 
        service: "azs-playground" });

    // Add a search box on id #seachBox that uses suggester "sg", grabbing some additional 
    // fields to display during suggestions.
    automagic.addSearchBox("searchBox",
        {
            highlightPreTag: "<b>",
            highlightPostTag: "</b>",
            suggesterName: "sg",
            select: "number,street,city,region,countryCode"
        });
    // add a results view
    automagic.addResults("results");
    // Adds a pager control << 1 2 3 ... >>
    automagic.addPager("pager");
    // range facet for sqft
    automagic.addRangeFacet("sqftFacet", "sqft", "number", 0, 17000);
    // checkbox facet for numeric field beds
    automagic.addCheckboxFacet("bedsFacet", "beds", "number");
    // checkbox facet for numeric field baths
    automagic.addCheckboxFacet("bathsFacet", "baths", "number");
    // checkbox facet for string field type
    automagic.addCheckboxFacet("typeFacet", "type", "string");
    // checkbox facet for collection field tags
    automagic.addCheckboxFacet("tagsFacet", "tags", "collection");
```

### constructor
* ```constructor(config)```

Sets basic configuration to connect to service. Expects an object of type Config from AzSearchStore

```js
    // constructs and instance of Automagic
    // will also create an instance of AzSearchStore that connects to your service
    var automagic = new AzSearch.Automagic({ 
        index: "realestate-us-sample", 
        queryKey: "D1CD08C7AC6A1886024E0F23B1824417", 
        service: "azs-playground" });
```

```ts
    type Config = {
        index: string;
        queryKey: string;
        service: string;
        suggestCallback?: (state: Store.SearchState, postBody: {
            [key: string]: any;
        }) => Promise<any>;
        searchCallback?: (state: Store.SearchState, postBody: {
            [key: string]: any;
        }) => Promise<any>;
    };
```

### addSearchBox
* ```addSearchBox(htmlId, suggestionsParametersUpdate?, suggestionValueKey?, suggestionTemplate?, css?)```

Adds an input field capable of suggestions/autocomplete and executing search requests. Attaches on the specified htmlID. Optionally takes SuggestionUpdateParameters (from AzSearchStore), an optional key indicating which suggestion value should be set when a suggestion is clicked (defaults to "@search.text"), a [mustache template](https://mustache.github.io/mustache.5.html) to customize rendering, or css overrides. When template is not specified, a json representation of the suggestions is displayed. When specified, the mustache template is rendered against east suggestion. The content of each  suggestion can be customized by adding fields via the select parameter as shown in the example below, or by setting a 
[suggestions processor](https://github.com/EvanBoyle/AzSearchStore#client-side-results-processing) on the store.
```js
    // css class overrides
    var css = {
            searchBox__button: "searchBox__button btn btn-default",
    };
    // mustache template for custom suggestion rendering. Default displays formatted JSON
    var suggestionsTemplate = "{{displayText}} <br/> {{{searchText}}}";
    // Add a search box that uses suggester "sg", grabbing some additional fields to 
    // display during suggestions. Use the template defined above
    automagic.addSearchBox("searchBox",
        {
            highlightPreTag: "<b>",
            highlightPostTag: "</b>",
            suggesterName: "sg",
            select: "number,street,city,region,countryCode"
        },
        "displayText"
        suggestionsTemplate,
        css);

    // Set a processor to format suggestions for display
    var suggestionsProcessor = function(results) {
        return results.map(function(result){
            result.displayText = result.number + " " + 
                result.street+ " " +result.city+ ", " +result.region+ " " +
                result.countryCode;
            result.searchText = result["@search.text"];
            return result;
        });
    };
    automagic.store.setSuggestionsProcessor(suggestionsProcessor);
```

```ts
    type SuggestionsParametersUpdate = {
        top?: number;
        filter?: string;
        orderby?: string;
        fuzzy?: boolean;
        highlightPreTag?: string;
        highlightPostTag?: string;
        select?: string;
        searchFields?: string;
        minimumCoverage?: string;
        apiVersion?: SearchApiVersion;
        suggesterName?: string;
    };
    type SearchApiVersion = "2016-09-01" | "2015-02-28-Preview";

```
### addResults
* ```addResults(htmlId, searchParametersUpdate?, resultsTemplate?, css?)```

Adds a view the search results on the specifed htmlId. Optionally takes searchParametersUpdate (from AzSearchStore), a mustache template used to format individual results, or css class overrides. When specified, the mustace template will be rendered against each individual search result. Otherwise formatted JSON will be displayed. The content of each search result can be customized by setting a 
[results processor](https://github.com/EvanBoyle/AzSearchStore#client-side-results-processing) on the store.
```js
    var resultTemplate =
        `<div class="col-xs-12 col-sm-5 col-md-3 result_img">
            <img class="img-responsive result_img" src={{thumbnail}} alt="image not found" />
        </div>
        <div class="col-xs-12 col-sm-7 col-md-9">
            <h4>{{displayText}}</h4>
            <div class="resultDescription">
                {{{summary}}}
            </div>
            <div>
                sqft: <b>{{sqft}}</b>
            </div>
            <div>
                beds: <b>{{beds}}</b>
            </div>
            <div>
                baths: <b>{{baths}}</b>
            </div>
        </div>`;
    // add a results view, updates parameters to include count, uses the above template
    automagic.addResults("results", { count: true }, resultTemplate);
    // add a resultsProcessor to more easily format the results display
    var resultsProcessor = function(results) {
        return results.map(function(result){
            result.displayText = result.number + " " + result.street+ " " +result.city+ ", " +result.region+ " " +result.countryCode;
            var summary = result.description;
            result.summary = summary.length < 200 ? summary : summary.substring(0, 200) + "...";
            return result;
        });
    };
    automagic.store.setResultsProcessor(resultsProcessor);
```
```ts
    type SearchParametersUpdate = {
        count?: boolean;
        top?: number;
        skip?: number;
        orderby?: string;
        searchMode?: SearchMode;
        scoringProfile?: string;
        select?: string;
        searchFields?: string;
        minimumCoverage?: string;
        apiVersion?: SearchApiVersion;
        queryType?: QueryType;
    };
    type QueryType = "simple" | "full";
    type SearchApiVersion = "2016-09-01" | "2015-02-28-Preview";
    type SearchMode = "any" | "all";
```
### addLoadingIndicator
* ```addLoadingIndicator(htmlId)```

Adds a component to show loading state there are inflight requests for searching/faceting on the specified id.

```js
    // Adds a loading indicator: . -> .. -> ... -> . -> .. -> ...
    automagic.addLoadingIndicator("spinner");
```
### addPager
* ```addPager(htmlId, css?)```

Adds a pagination control ```<<< 1 2 3 ... >>> ``` on the specified id after all of the results

```js
    // Adds a pager control << 1 2 3 ... >>
    automagic.addPager("pager");
```
### addRangeFacet
* ```addRangeFacet(htmlId, fieldName, dataType, min, max, css?) ```
    Adds a range facet control for on the specified htmlId for the given fieldName. dataType can be either "number" or "date". Range will go from min to max. Type of min and max should correspond to specified dataType. 

```js
    // range facet numeric field sqft
    automagic.addRangeFacet("sqftFacet", "sqft", "number", 0, 17000);
    // adding a range facet on date field 'published'
    // notice that this one is for example only and is not in the realestate index
    // initialize the date range at the year 2007
    let startDate = new Date();
    startDate.setFullYear(2007);
    // allow date range to go all the way up to present
    let endDate = new Date();
    automagic.addRangeFacet("publishedFacet", "published", "date", startDate, endDate);
```

### addCheckboxFacet

* ```addCheckboxFacet(htmlId, fieldName, dataType, css?)```

Adds a checkbox style faceting control to the specified htmlId over the specified field. Supported dataTypes are ```"number" | "string" | "collection"```. Also accepts optional css overrides

```js
    automagic.addCheckboxFacet("bedsFacet", "beds", "number");
    // checkbox facet for numeric field baths
    automagic.addCheckboxFacet("bathsFacet", "baths", "number");
    // checkbox facet for string field type
    automagic.addCheckboxFacet("typeFacet", "type", "string");
    // checkbox facet for collection field tags
    automagic.addCheckboxFacet("tagsFacet", "tags", "collection");
```

### addClearFiltersButton

* ```addClearFiltersButton(htmlId, css?)```

Adds a button (anchor) to the specified element (```htmlId```) which when triggered clears all applied filters (facets) and updates the search results. Also accepts optional css overrides.

### addSortBy

* ```addSortBy(htmlId, fields, defaultSortFieldName?, css?)```

Adds sorting control to the specified htmlId for the specified sortable fields. Accepts optional default sorting field name & css overrides.

```js
    // With optional displayName & default sort fieldName
    var fields = [
        {displayName: "Relevance", fieldName: ""},
        {displayName: "Size", fieldName: "sqft"},
        {displayName: "Beds", fieldName: "beds"}, 
        {displayName: "Baths", fieldName: "baths"},
        // set lat/long to do geo distance ordering
        {displayName: "Distance", fieldName: "location", latitude: 47.673988099999995, longitude: -122.12151199999998}
    ];
    automagic.addSortBy("sortBy", fields, "sqft");
```

### addStaticFilter

* ```addStaticFilter(htmlId, filterKey, filters, defaultFilter, title?, css?)```

Adds a dropdown style filter control with static pre-defined filters. Can be useful for scenarios such as language or geo filtering. You may want to allow user to set a constant filter for language to be english, or for only results within 50 miles to be shown. ```filterKey``` is a unique key that will be used to lookup and set the filter from state within the store ```state.facets.globalFilter[filterKey]```, as it is possible to have multiple global filters. 

```js
    // static filter for home type
    var filters = [
        { displayName: "Any", filter: "" },
        { displayName: "House", filter: "type eq 'House'"},
        { displayName: "Apartment", filter: "type eq 'Apartment'"}
    ];
    var defaultFilter = "";
    var title = "Home Type";
    automagic.addStaticFilter("typeFilter", "type", filters, defaultFilter, title);
```

### store
* ```store```

Instance of [AzSearchStore](https://github.com/EvanBoyle/AzSearchStore). Methods can be called directly on the store, and actions can be dispatched to the store using APIs documented in the [AzSearchStore repo](https://github.com/EvanBoyle/AzSearchStore).
```js
    // set api version to preview
    automagic.store.setSearchApiVersion("2015-02-28-Preview");
    // set a pre-defined input to search/suggest
    automagic.store.setInput("bears beets battlestar galactica");
    // log state changes to console
    automagic.store.subscibe(function() {
        var state = automagic.store.getState();
        console.info(JSON.stringify(state, null, 4));
    });
    // clear all facets
    automagic.store.clearFacetsSelections();

```

### Custom CSS

If you wish to use a custom theme. Please use the browser tools element inspector ```ctrl shift C```and compare against [css constants used in the project](https://github.com/EvanBoyle/AzSearch.js/blob/master/src/utils/css.ts). Css classes can be overridden in the following manner and passed in to a component:

```js
//...
// css class overrides
    var css = {
            searchBox__buttonIcon: "searchBox__button-icon glyphicon glyphicon-search",
            searchBox__button: "searchBox__button btn btn-default",
    };

        automagic.addSearchBox("searchBox",
        {
            highlightPreTag: "<b>",
            highlightPostTag: "</b>",
            suggesterName: "sg",
            select: "number,street,city,region,countryCode"
        },
        "@search.text",
        suggestionsTemplate,
        css);

```


## Components & Containers

AzSearch.js is build with react components and react-redux containers. Both of these are exposed and available for direct consumption/extension with your own instance of AzSearchStore. More docs on this coming soon.

## Development

Set up should be as simple as running ```yarn install```. Run ```yarn run devbuild``` for tslint, typescript compilation, and webpack dev bundling all in one step. Run ```yarn run prodpack``` for a minified bundle. Testing: ```yarn test```
