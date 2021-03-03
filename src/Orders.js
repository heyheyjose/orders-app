import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { displayRowClass, displayOrderStatus } from './utilities';
import { fetchOrders } from './state/actions';
import './App.css';

const dateDisplay = 'YYYY-MM-DD';

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialTableState: [],
      tableState: [],
      orderNumberFilterInput: '',
      statusFilter: ''
    }

    this.setOrderNumber = this.setOrderNumber.bind(this);
    this.setStatus = this.setStatus.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.fetchOrders();
  }

  componentDidUpdate(prevProps) {
    const { orders } = this.props;
    if (prevProps.orders.length !== orders.length) {
      this.setState({ initialTableState: orders, tableState: orders });
    }
  }

  setOrderNumber(e) {
    this.setState({ orderNumberFilterInput: e.target.value });
  }

  setStatus(e) {
    this.setState({ statusFilter: e.target.value });
  }

  handleFilter() {
    const { tableState, orderNumberFilterInput, statusFilter } = this.state;

    if (orderNumberFilterInput.length) {
      // filter here
      const filteredResults = tableState.filter(row => row.orderNumber === orderNumberFilterInput);
      this.setState({ tableState: filteredResults, orderNumberFilterInput: '' });
    }

    if (statusFilter.length > 0) {
      // filter again (or for the first time)
      this.setState(state => {
        return { tableState: state.tableState.filter(row => row.orderStatus === statusFilter) };
      });
    }
  }

  resetFilter() {
    this.setState({ tableState: this.state.initialTableState });
  }

  logout() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { tableState, orderNumberFilterInput } = this.state;

    return (
      <div className="orders-box">
        
        <h2>Orders</h2>

        <div style={{ marginBottom: 25 }}>
          <p>Filter Order Results:</p>
          <div style={{ marginBottom: 5 }}>
            <input
              type="text"
              placeholder="Order #"
              value={orderNumberFilterInput}
              onChange={this.setOrderNumber}
            />
          </div>
          <div style={{ marginBottom: 5 }}>
            <select onChange={this.setStatus}>
              <option value="">Choose a status</option>
              <option value="A">Active</option>
              <option value="C">Completed</option>
            </select>
          </div>
          <button onClick={this.handleFilter}>Filter</button>
        </div>
  
        <table>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Order Date</th>
              <th>Order Status</th>
              <th>Scheduled Date Time</th>
              <th>Delivered Date Time</th>
            </tr>
          </thead>

          <tbody>
            {tableState.length > 0 ? tableState.map(order => {
              const {
                orderNumber,
                orderDate,
                orderStatus,
                scheduledDateTime,
                deliveredDateTime
              } = order;

              return (
                <tr key={orderNumber} className={displayRowClass(scheduledDateTime, deliveredDateTime)}>
                  <td>{orderNumber}</td>
                  <td>{moment(orderDate).format(dateDisplay)}</td>
                  <td>{displayOrderStatus(orderStatus)}</td>
                  <td>{moment(scheduledDateTime).format(dateDisplay)}</td>
                  <td>{deliveredDateTime ? moment(deliveredDateTime).format(dateDisplay) : 'In Transit'}</td>
                </tr>
              );
            }) : <tr><td colSpan={5}>No Orders Found</td></tr>}
          </tbody>
        </table>
          
        <div className="wrap">
          <button onClick={this.resetFilter}>Reset Filter</button>
          <button className="right" onClick={this.logout}>Log Out</button>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  orders: state?.ordersState?.orders || []
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators({ fetchOrders }, dispatch)
});

export default connect(mapState, mapDispatch)(Orders);
