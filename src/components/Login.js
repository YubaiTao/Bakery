import React, { Component } from 'react';

import { Form, Icon, Input, Button, message } from 'antd';
import { API_ROOT } from "../Constant";
import $ from 'jquery';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginForm extends Component {


    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }



    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                $.ajax({
                    url: `${API_ROOT}/fetch.php`,
                    method: 'POST',
                    data: values["userName"],
                }).then((response) => {
                    console.log(response);
                    this.props.handleLogin(response);
                }, (error) => {
                    message.error(error.responseText);
                }).catch((error) => {
                    console.log(error);
                });
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        return (
            <Form layout="inline" onSubmit={this.handleSubmit} className="login-form">
                <FormItem
                    validateStatus={userNameError ? 'error' : ''}
                    help={userNameError || ''}
                >
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your customer ID!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Customer ID" />
                    )}
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                    >
                        Ok
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export const Login = Form.create()(LoginForm);

