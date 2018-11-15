import React, { Component } from 'react';
import $ from 'jquery';
import { API_ROOT } from "../Constant";
import { Table } from 'antd';

export class Home extends Component {


    state = {
        order_rows: [],
        dataSource: [],
        columns: [],
        cake_names: [],
        ingredients_map: new Map(),
    };

    fetchOrders() {
        $.ajax({
            url: `${API_ROOT}/fetch_orders.php`,
            method: 'POST',
            data: this.props.customer_id,
        }).then((response) => {
            console.log(response);
            const str = '[' + response.replace(/}\n?{/g, '},{') + ']';

            let rows = JSON.parse(str);
            rows.forEach((val, index) => {
                val.key = (index + 1).toString();
                this.state.cake_names.push(val.cakename);
            });
            this.setState({order_rows: rows});
            this.setTable();
            this.fetchAllIngredients();
        }, (error) => {
            console.log(error);
        }).catch((error) => {
            console.log(error);
        });
    }

    setTable() {
        this.setState({dataSource:
            this.state.order_rows,
        });
        this.setState({columns : [{
                title: 'Cake Name',
                dataIndex: 'cakename',
                key: 'cakename',
            }, {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
            }, {
                title: 'Time',
                dataIndex: 'time',
                key: 'time',
            }, {
                title: 'Price Paid',
                dataIndex: 'pricepaid',
                key: 'pricepaid',
            }]});
    }

    fetchAllIngredients() {
        this.state.cake_names.forEach((cake_name) => {
            this.fetchIngredients(cake_name);
        });
    }

    fetchIngredients(cake_name) {
        $.ajax({
            url: `${API_ROOT}/fetch_ingredients.php`,
            method: 'POST',
            data: cake_name,
        }).then((response) => {
            console.log(response);
            const str = '[' + response.replace(/}\n?{/g, '},{') + ']';

            let rows = JSON.parse(str);
            rows.forEach((val, index) => {
                val.key = (index + 1).toString();
            });

            if(!this.state.ingredients_map.has(cake_name)) {
                this.state.ingredients_map.set(cake_name, rows);
            }
        }, (error) => {
            console.log(error);
        }).catch((error) => {
            console.log(error);
        });
    }


    expandedRowRender = (record) => {
        const columns = [
            { title: 'Ingredient', dataIndex: 'iname', key: 'iname' },
            { title: 'Quantity', dataIndex: 'qty', key: 'qty' },
        ];

        return (
            <Table
                columns={columns}
                dataSource={this.state.ingredients_map.get(record.cakename)}
                pagination={false}
            />
        );
    };


    componentWillMount() {
        this.fetchOrders();
    }



    render() {
        return (
          <div>
              {console.log(this.state.dataSource)}
              {console.log(this.state.columns)}
              <Table dataSource={this.state.dataSource} columns={this.state.columns} expandedRowRender={this.expandedRowRender}/>
          </div>
        );
    }
}