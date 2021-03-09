import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Container, Table, Dropdown, Button, Input } from 'semantic-ui-react';
import { displayRowClass, displayOrderStatus, FILTER_OPTIONS } from './utilities';
import { fetchOrders } from './state/actions';
import AppHeader from './components/Header';
import Avatar from './components/Avatar';
import AccountDropdown from './components/AccountDropdown';
import Footer from './components/Footer';

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

  componentDidUpdate(prevProps, prevState) {
    const { orders } = this.props;

    if (prevState.tableState.length !== orders.length) {
      this.setState({ initialTableState: orders, tableState: orders });
    }
  }

  setOrderNumber(e) {
    this.setState({ orderNumberFilterInput: e.target.value });
  }

  setStatus(e, data) {
    this.setState({ statusFilter: data.value });
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
        return {
          tableState: state.tableState.filter(row => row.orderStatus === statusFilter),
          statusFilter: '',
        };
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
      <Container fluid className="app-wrapper">
        <AppHeader
          title="Orders"
          headerRightContent={(
            <Fragment>
              <Avatar />
              <AccountDropdown handleClick={this.logout} />
            </Fragment>
          )}
        />
        <div className="app-content">
          <p>Filter Order Results:</p>
          <div>
            <Input
              placeholder="Order #"
              value={orderNumberFilterInput}
              onChange={this.setOrderNumber}
            />
          </div>
          <div style={{ marginTop: 14 }}>
            <Dropdown
              placeholder="Choose a status"
              clearable
              selection
              options={FILTER_OPTIONS}
              onChange={this.setStatus}
            />
          </div>
          <div style={{ marginTop: 14 }}>
            <Button primary onClick={this.handleFilter}>Filter</Button>
          </div>

          <Table celled fixed singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Order Number</Table.HeaderCell>
                <Table.HeaderCell>Order Date</Table.HeaderCell>
                <Table.HeaderCell>Order Status</Table.HeaderCell>
                <Table.HeaderCell>Scheduled Date Time</Table.HeaderCell>
                <Table.HeaderCell>Delivered Date Time</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {tableState.length > 0 ? tableState.map(order => {
                const {
                  orderNumber,
                  orderDate,
                  orderStatus,
                  scheduledDateTime,
                  deliveredDateTime
                } = order;

                return (
                  <Table.Row key={orderNumber} className={displayRowClass(scheduledDateTime, deliveredDateTime)}>
                    <Table.Cell>{orderNumber}</Table.Cell>
                    <Table.Cell>{moment(orderDate).format(dateDisplay)}</Table.Cell>
                    <Table.Cell>{displayOrderStatus(orderStatus)}</Table.Cell>
                    <Table.Cell>{moment(scheduledDateTime).format(dateDisplay)}</Table.Cell>
                    <Table.Cell>
                      {deliveredDateTime ? moment(deliveredDateTime).format(dateDisplay) : 'In Transit'}
                    </Table.Cell>
                  </Table.Row>
                );
              }) : <Table.Row><Table.Cell colSpan={5} className="no-orders">No Orders Found</Table.Cell></Table.Row>}
            </Table.Body>
          </Table>

          <Button style={{ marginBottom: 14 }} secondary onClick={this.resetFilter}>Reset Results</Button>
        </div>
        <Footer />
      </Container>
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
