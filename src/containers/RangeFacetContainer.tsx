import { connect } from "react-redux";
import * as React from "react";
import { Store, asyncActions, facetsActions, searchParameterActions } from "@microsoft/azsearchstore";
import * as redux from "redux";
import RangeFacet from "../components/RangeFacet";

function getReturnType<RT>(expression: (...params: any[]) => RT): RT {
    return {} as RT;
}

export interface OwnProps {
    facet: string;
    css: { [key: string]: string; };
}

const mapDispatchToProps = (dispatch: redux.Dispatch<any>, ownProps: OwnProps) => {
    return {
        onRangeChange: (lowerBound: number | Date, upperBound: number | Date) => {
            dispatch(facetsActions.setFacetRange(ownProps.facet, lowerBound, upperBound));
        },
        afterRangeChange: () => {
            dispatch(searchParameterActions.setPage(1));
            dispatch(asyncActions.fetchSearchResultsFromFacet);
        }
    };
};

function mapStateToProps(state: Store.SearchState, ownProps: OwnProps) {
    return {
        facet: state.facets.facets[ownProps.facet],
        beforeFirstRequest: state.results.lastUpdated < 1,
        css: ownProps.css
    };
};

export const stateProps = getReturnType(mapStateToProps);
export const dispatchProps = getReturnType(mapDispatchToProps);

export type PropsType = typeof stateProps & typeof dispatchProps & OwnProps;
type State = {};

export const RangeFacetContainer = connect(mapStateToProps, mapDispatchToProps)(RangeFacet);