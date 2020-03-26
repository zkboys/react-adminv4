import React, {Component} from 'react';
import {Form} from 'antd';
import {FormElement, FormRow} from 'src/library/components';
import config from 'src/commons/config-hoc';
import {ModalContent} from 'src/library/components';

@config({
    ajax: true,
    modal: {
        title: props => props.isEdit ? '修改用户' : '添加用户',
    },
})
export default class EditModal extends Component {
    state = {
        loading: false, // 页面加载loading
        data: {},       // 表单回显数据
    };

    componentDidMount() {
        const {isEdit} = this.props;

        if (isEdit) {
            this.fetchData();
        }
    }

    fetchData = () => {
        if (this.state.loading) return;

        const {id} = this.props;

        this.setState({loading: true});
        this.props.ajax.get(`/mock/users/${id}`)
            .then(res => {
                this.setState({data: res || {}});
            })
            .finally(() => this.setState({loading: false}));
    };

    handleSubmit = (values) => {
        if (this.state.loading) return;

        console.log(values);
        const {isEdit} = this.props;
        const ajaxMethod = isEdit ? this.props.ajax.put : this.props.ajax.post;
        const successTip = isEdit ? '修改成功！' : '添加成功！';

        this.setState({loading: true});
        ajaxMethod('/mock/users', values, {successTip})
            .then(() => {
                const {onOk} = this.props;
                onOk && onOk();
            })
            .finally(() => this.setState({loading: false}));
    };

    render() {
        const {isEdit} = this.props;
        const {loading, data} = this.state;
        const formProps = {
            width: '50%',
            labelWidth: 100,
        };
        console.log('render');
        return (
            <ModalContent
                loading={loading}
                okText="保存"
                cancelText="重置"
                onOk={() => this.form.submit()}
                onCancel={() => this.form.resetFields()}
            >
                <Form
                    ref={form => this.form = form}
                    onFinish={this.handleSubmit}
                    initialValues={data}
                >
                    {isEdit ? <FormElement {...formProps} type="hidden" name="id"/> : null}

                    <FormRow>
                        <FormElement
                            {...formProps}
                            label="用户名"
                            name="name"
                            required
                            noSpace
                        />
                        <FormElement
                            {...formProps}
                            type="number"
                            label="年龄"
                            name="age"
                            required
                        />
                    </FormRow>
                    <FormElement
                        {...formProps}
                        type="select"
                        label="工作"
                        name="job"
                        options={[
                            {value: '1', label: '前端开发'},
                            {value: '2', label: '后端开发'},
                        ]}
                    />
                    <FormElement
                        {...formProps}
                        type="select"
                        label="职位"
                        name="position"
                        options={[
                            {value: '1', label: '员工'},
                            {value: '2', label: 'CEO'},
                        ]}
                    />
                </Form>
            </ModalContent>
        );
    }
}

