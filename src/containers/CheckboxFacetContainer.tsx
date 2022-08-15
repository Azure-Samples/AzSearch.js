import { connect } from "react-redux";
import * as React from "react";
import { Store, asyncActions, facetsActions, searchParameterActions } from "@microsoft/azsearchstore";
import * as redux from "redux";
import CheckboxFacet from "../components/CheckboxFacet";

function getReturnType<RT>(expression: (...params: any[]) => RT): RT {
    return {} as RT;
}

export interface OwnProps {
    facet: string;
    css: { [key: string]: string; };
}

const mapDispatchToProps = (dispatch: redux.Dispatch<any>, ownProps: OwnProps) => {
    return {
        toggleFacet: (value: string) => {
            dispatch(searchParameterActions.setPage(1));
            dispatch(facetsActions.toggleCheckboxFacetSelection(ownProps.facet, value));
            dispatch(asyncActions.fetchSearchResultsFromFacet);
        },
    };
};

function mapStateToProps(state: Store.SearchState, ownProps: OwnProps) {
    return {
        facet: state.facets.facets[ownProps.facet],
    };
};

export const stateProps = getReturnType(mapStateToProps);
export const dispatchProps = getReturnType(mapDispatchToProps);

export type PropsType = typeof stateProps & typeof dispatchProps & OwnProps;
type State = {};

export const CheckboxFacetContainer = connect(mapStateToProps, mapDispatchToProps)(CheckboxFacet);