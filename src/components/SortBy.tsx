import * as React from "react";
import { PropsType } from "../containers/SortByContainer";
import * as objAssign from "object-assign";
import { Store } from "azsearchstore";
import { defaultCss } from "../utils/css";

export type State = {};

class SortBy extends React.PureComponent<PropsType, State> {
  render() {
    const { fields, beforeFirstRequest, onSortChange, orderby } = this.props;
    let css = objAssign({}, defaultCss, this.props.css);
    let order = "desc";
    if (beforeFirstRequest) return <div></div>;

    let options = fields.map((field, index) => {
      return <option  key={index} selected={field.orderbyClause === orderby} value={field.orderbyClause}>{field.displayName}</option>;
    });

    let onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      onSortChange(event.target.value);
    };

    let container = <div className={css.sorting__sortBy}>
      <div className={css.searchFacets__facetHeaderContainer}>
          <h4 className={css.searchFacets__facetHeader}>
              <a data-toggle="collapse" className={css.searchFacets__facetHeaderLink}  >
                  <span className={css.searchFacets__facetHeaderIconOpen} aria-hidden="true"></span> Sort By
              </a>
          </h4>
      </div>
      <div className={css.searchFacets__facetControlContainer}>
        <div className={css.searchFacets__facetControlList}>
          <select className={css.sorting__sortByControl} onChange={onChange}>
            {options}
          </select>
        </div>
      </div>
    </div>;

    return (container);
  }
}

export default SortBy;