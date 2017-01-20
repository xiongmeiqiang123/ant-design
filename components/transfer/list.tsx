import React from 'react';
import classNames from 'classnames';
import Animate from 'rc-animate';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import assign from 'object-assign';
import { TransferItem } from './index';
import Search from './search';
import Item from './item';
import Checkbox from '../checkbox';

function noop() {
}

export interface TransferListProps {
  prefixCls: string;
  dataSource: TransferItem[];
  filter?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  titleText?: string;
  style?: React.CSSProperties;
  handleFilter: (e: any) => void;
  handleSelect: (selectedItem: any, checked: boolean) => void;
  handleSelectAll: (dataSource: any[], checkAll: boolean) => void;
  handleClear: () => void;
  render?: (item: any) => any;
  body?: (props: any) => any;
  footer?: (props: any) => void;
  checkedKeys: string[];
  checkStatus?: boolean;
  position?: string;
  notFoundContent?: React.ReactNode | string;
  filterOption: (filterText: any, item: any) => boolean;
  lazy?: boolean | {};
}

export interface TransferListContext {
  antLocale?: {
    Transfer?: any,
  };
}

export default class TransferList extends React.Component<TransferListProps, any> {
  static defaultProps = {
    dataSource: [],
    titleText: '',
    showSearch: false,
    render: noop,
    lazy: {},
  };

  static contextTypes = {
    antLocale: React.PropTypes.object,
  };

  context: TransferListContext;
  timer: number;
  _filteredItemCount: number;
  _searchFilteredDataSource: TransferItem[];

  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
      searchFilteredDataSource: this.props.dataSource,
    };
    this._searchFilteredDataSource = this.props.dataSource.slice();
    this._filteredItemCount = 0;
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({
        mounted: true,
      });
    }, 0);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  shouldComponentUpdate(...args) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.dataSource && nextProps.dataSource !== this.props.dataSource) {
      this._searchFilteredDataSource = nextProps.dataSource.slice();
      this.setState({
        searchFilteredDataSource: nextProps.dataSource,
      });
    }
  }
  getCheckStatus(filteredDataSource) {
    const { checkedKeys } = this.props;
    if (checkedKeys.length === 0) {
      return 'none';
    } else if (filteredDataSource.every(item => checkedKeys.indexOf(item.key) >= 0)) {
      return 'all';
    }
    return 'part';
  }

  handleSelect = (selectedItem) => {
    const { checkedKeys } = this.props;
    const result = checkedKeys.some((key) => key === selectedItem.key);
    this.props.handleSelect(selectedItem, !result);
  }

  handleFilter = (e) => {
    this.props.handleFilter(e);
  }

  handleClear = () => {
    this.props.handleClear();
  }
  handleSearchFilter = (item, matchSearch) => {
    const index = this._searchFilteredDataSource.findIndex(dataItem => dataItem.key === item.key);
    if (matchSearch && index === -1) {
        this._searchFilteredDataSource.push(item);
    }
    if (!matchSearch && index !== -1) {
      this._searchFilteredDataSource.splice(index, 1);
    }
    if (++this._filteredItemCount === this.props.dataSource.length) {
        this._filteredItemCount = 0;
        setTimeout(() => {
          this.setState({
            searchFilteredDataSource: this._searchFilteredDataSource.slice(),
           });
        }, 0);
    }
  }

  render() {
    const { prefixCls, dataSource, titleText, filter, checkedKeys, lazy, filterOption,
            body = noop, footer = noop, showSearch, render = noop, style } = this.props;

    let { searchPlaceholder, notFoundContent } = this.props;

    // Custom Layout
    const footerDom = footer(assign({}, this.props));
    const bodyDom = body(assign({}, this.props));

    const listCls = classNames(prefixCls, {
      [`${prefixCls}-with-footer`]: !!footerDom,
    });

    const filteredDataSource: TransferItem[] = [];

    const showItems = dataSource.map((item) => {
      if (!item.disabled) {
        filteredDataSource.push(item);
      }
      const checked = checkedKeys.indexOf(item.key) >= 0;
      return (
        <Item
          key={item.key}
          item={item}
          lazy={lazy}
          render={render}
          filter={filter}
          filterOption={filterOption}
          onSearchFilter={this.handleSearchFilter}
          checked={checked}
          prefixCls={prefixCls}
          onClick={this.handleSelect}
        />
      );
    });

    let unit = '';
    const antLocale = this.context.antLocale;
    if (antLocale && antLocale.Transfer) {
      const transferLocale = antLocale.Transfer;
      unit = dataSource.length > 1 ? transferLocale.itemsUnit : transferLocale.itemUnit;
      searchPlaceholder = searchPlaceholder || transferLocale.searchPlaceholder;
      notFoundContent = notFoundContent || transferLocale.notFoundContent;
    }

    const search = showSearch ? (
      <div className={`${prefixCls}-body-search-wrapper`}>
        <Search
          prefixCls={`${prefixCls}-search`}
          onChange={this.handleFilter}
          handleClear={this.handleClear}
          placeholder={searchPlaceholder || 'Search'}
          value={filter}
        />
      </div>
    ) : null;

    const listBody = bodyDom || (
      <div className={showSearch ? `${prefixCls}-body ${prefixCls}-body-with-search` : `${prefixCls}-body`}>
        {search}
        <Animate
          component="ul"
          className={`${prefixCls}-content`}
          transitionName={this.state.mounted ? `${prefixCls}-content-item-highlight` : ''}
          transitionLeave={false}
        >
          {showItems}
        </Animate>
        <div className={`${prefixCls}-body-not-found`}>
          {notFoundContent || 'Not Found'}
        </div>
      </div>
    );

    const listFooter = footerDom ? (
      <div className={`${prefixCls}-footer`}>
        {footerDom}
      </div>
    ) : null;

    const { searchFilteredDataSource } = this.state;
    const checkStatus = this.getCheckStatus(searchFilteredDataSource);
    const checkedAll = checkStatus === 'all';
    const checkAllCheckbox = (
      <Checkbox
        ref="checkbox"
        checked={checkedAll}
        indeterminate={checkStatus === 'part'}
        onChange={() => this.props.handleSelectAll(searchFilteredDataSource.filter(item => !item.disabled), checkedAll)}
      />
    );
    return (
      <div className={listCls} style={style}>
        <div className={`${prefixCls}-header`}>
          {checkAllCheckbox}
          <span className={`${prefixCls}-header-selected`}>
            <span>
              {(checkedKeys.length > 0 ? `${checkedKeys.length}/` : '') + searchFilteredDataSource.length} {unit}
            </span>
            <span className={`${prefixCls}-header-title`}>
              {titleText}
            </span>
          </span>
        </div>
        {listBody}
        {listFooter}
      </div>
    );
  }
}
