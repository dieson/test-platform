import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Popover } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';


@connect(({ result, loading }) => ({
    result,
    loading: loading.models.result,
}))
class ExecutionResultProfile extends Component {
    paginationProps = {
        currentPage: 1,
        pageSize: 10,
    };

    componentDidMount() {
        const { dispatch, match } = this.props;
        const { params } = match;
        
        dispatch({
            type: 'result/fetch',
            payload: {
                currentPage: this.paginationProps.currentPage,
                pageSize: this.paginationProps.pageSize,
                data: { testExecutionId: params.testExecutionId, },
            },
        });
    }

    render() {
        const { result: { data: { list, pagination } }, loading } = this.props;
        const goodsColumns = [
            {
                title: '测试用例ID',
                dataIndex: 'testcaseId',
            },
            {
                title: '执行名称',
                dataIndex: 'testExecutionsInfo.name',
            },
            {
                title: '执行状态',
                dataIndex: 'executionStatus',
                render: text =>
                    text === 'success' ? (
                        <Badge status="success" text="成功" />
                    ) : (
                            <Badge status="error" text="失败" />
                        ),
            },
            {
                title: '响应数据',
                dataIndex: 'resultData',
                render: text =>
                    <Popover content={text} title="期望结果" trigger="hover">
                        <p className={styles.pItem}>{text}</p>
                    </Popover>,
            },
            {
                title: '测试结果',
                dataIndex: 'passed',
            },
        ];
        return (
            <PageHeaderWrapper title="测试结果" loading={loading}>
                <Card bordered={false}>

                    <div className={styles.title}>测试结果</div>
                    <Table
                        style={{ marginBottom: 24 }}
                        pagination={pagination}
                        loading={loading}
                        dataSource={list}
                        columns={goodsColumns}
                        rowKey="id"
                    />
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default ExecutionResultProfile;
