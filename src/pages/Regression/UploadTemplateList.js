import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

//新建窗口
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, typeList } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="新建字段类型"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="测试集类型">
        {form.getFieldDecorator('datasetTypeId', {
          rules: [{ required: true, message: '请输选择测试类型！' }],
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            {
              typeList.length && typeList.map(item => (
                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)
              )
            }
          </Select>)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="请求字段名称">
        {form.getFieldDecorator('requestColumName', {
          rules: [{ required: true }],
        })(<Input placeholder="请输入并用逗号隔开字段名称" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="请求字段类型">
        {form.getFieldDecorator('requestColumDataType', {
          rules: [{ required: true }],
        })(<Input placeholder="请输入并用逗号隔开字段类型" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="返回字段名称">
        {form.getFieldDecorator('responseColumName', {
          rules: [{ required: true }],
        })(<Input placeholder="请输入并用逗号隔开字段名称" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="返回字段类型">
        {form.getFieldDecorator('responseColumDataType', {
          rules: [{ required: true }],
        })(<Input placeholder="请输入并用逗号隔开字段类型" />)}
      </FormItem>
    </Modal>
  );
});

//更新组件
@Form.create()
class UpdateForm extends PureComponent {
  static defaultProps = {
    handleUpdate: () => { },
    handleUpdateModalVisible: () => { },
    values: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      formVals: {
        id: props.values.id,
        requestColumName: props.values.requestColumName,
        requestColumDataType: props.values.requestColumDataType,
        responseColumName: props.values.responseColumName,
        responseColumDataType: props.values.responseColumDataType,
        testDatasetTypesInfo: { id: props.values.testDatasetTypesInfo.id },
      },
    };
  }

  okUpdateHandle = () => {
    const { form, handleUpdate } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals,
        },
        () => {
          handleUpdate(formVals);
        }
      );
    });

  };

  renderContent = (formVals) => {
    const { form, typeList } = this.props;

    return [
      <FormItem key="datasetTypeId" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="测试类型">
        {form.getFieldDecorator('datasetTypeId', {
          rules: [{ required: true, message: '请选择试类型！' }],
          initialValue: formVals.testDatasetTypesInfo.id,
        })(<Select placeholder="请选择" style={{ width: '100%' }}>
          {
            typeList.length && typeList.map(item => (
              <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)
            )
          }
        </Select>)}
      </FormItem>,
      <FormItem key="requestColumName" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="请求字段名称">
        {form.getFieldDecorator('requestColumName', {
          rules: [{ required: true }],
          initialValue: formVals.requestColumName,
        })(<Input placeholder="请输入并用逗号隔开字段名称" />)}
      </FormItem>,
      <FormItem key="requestColumDataType" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="请求字段类型">
        {form.getFieldDecorator('requestColumDataType', {
          rules: [{ required: true }],
          initialValue: formVals.requestColumDataType,
        })(<Input placeholder="请输入并用逗号隔开字段类型" />)}
      </FormItem>,
      <FormItem key="responseColumName" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="返回字段名称">
        {form.getFieldDecorator('responseColumName', {
          rules: [{ required: true }],
          initialValue: formVals.responseColumName,
        })(<Input placeholder="请输入并用逗号隔开字段名称" />)}
      </FormItem>,
      <FormItem key="responseColumDataType" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="返回字段类型">
        {form.getFieldDecorator('responseColumDataType', {
          rules: [{ required: true }],
          initialValue: formVals.responseColumDataType,
        })(<Input placeholder="请输入并用逗号隔开字段类型" />)}
      </FormItem>,
    ];
  };

  render() {
    const { updateModalVisible, handleUpdateModalVisible, values } = this.props;
    const { formVals } = this.state;

    return (
      <Modal
        destroyOnClose
        title="更新字段类型"
        visible={updateModalVisible}
        onOk={() => this.okUpdateHandle()}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
      >
        {this.renderContent(formVals)}
      </Modal>
    );
  }
}

@connect(({ upload, loading }) => ({
  upload,
  loading: loading.models.upload,
}))
@Form.create()
class UploadTemplateList extends PureComponent {
  paginationProps = {
    currentPage: 1,
    pageSize: 10,
  };

  state = {
    modalVisible: false,
    updateModalVisible: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };

  //标题名称
  columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '测试集类型',
      dataIndex: 'testDatasetTypesInfo.name',
      // render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '请求字段名称',
      dataIndex: 'requestColumName',
    },
    {
      title: '请求字段类型',
      dataIndex: 'requestColumDataType',
    },
    {
      title: '返回字段名称',
      dataIndex: 'responseColumName',
    },
    {
      title: '返回字段类型',
      dataIndex: 'responseColumDataType',
    },
    {
      title: '操作',
      render: (record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>更新</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleDelete(record)}>删除</a>
        </Fragment>
      ),
    },
  ];

  handleDelete = (record) => {
    Modal.confirm({
      title: '删除数据格式',
      content: '确定删除数据格式吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => this.deleteItem(record.id),
    });
  };

  deleteItem = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'upload/remove',
      payload: { id },
      callback: (res) => {
        if (res.code === 1000) {
          message.success('删除成功');
        } else {
          message.error(res.msg)
        }
        this.handleGetList();
      },
    });
  };

  //通过数据格式转到type详情页
  previewItem = id => {
    router.push(`/profile/basic/${id}`);
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'upload/fetch',
      payload: this.paginationProps,
    });

    dispatch({
      type: 'upload/getTypeList',
    });
  }

  //使用查询条件查询数据
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'upload/fetch',
      payload: params,
    });
  };

  //重置清空查询条件
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'upload/fetch',
      payload: this.paginationProps,
    });
  };

  //批量删除
  handleBatchDelete = () => {
    Modal.confirm({
      title: '批量删除数据格式',
      content: '确定批量删除数据格式吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => this.batchDeleteItem(),
    });
  };

  //批量删除
  batchDeleteItem = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (selectedRows.length === 0) return;
    dispatch({
      type: 'upload/batchRemove',
      payload: {
        ids: selectedRows.map(row => row.id),
      },
      callback: (res) => {
        if (res.code === 1000) {
          message.success('删除成功');
        } else {
          message.error(res.msg)
        }
        this.handleGetList();
      },
    });
  };

  //多选方法
  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  //查询方法
  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        formValues: fieldsValue,
      });

      const params = {
        currentPage: this.paginationProps.currentPage,
        pageSize: this.paginationProps.pageSize,
        data: fieldsValue,
      };

      dispatch({
        type: 'upload/fetch',
        payload: params,
      });
    });
  };

  //控制打开创建窗口
  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  //控制打开更新窗口
  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  //收缩查询状态
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
      upload: { typeList },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="测试类型">
              {getFieldDecorator('datasetTypeId')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {
                    typeList.length && typeList.map(item => (
                      <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)
                    )
                  }
                </Select>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
                </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
                </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  //获取列表
  handleGetList() {
    const { dispatch } = this.props;
    dispatch({
      type: 'upload/fetch',
      payload: this.paginationProps,
    });
  }

  //调用新建接口
  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'upload/add',
      payload: {
        datasetTypeId: fields.datasetTypeId,
        requestColumName: fields.requestColumName,
        requestColumDataType: fields.requestColumDataType,
        responseColumName: fields.responseColumName,
        responseColumDataType: fields.responseColumDataType,
      },
      callback: (res) => {
        if (res.code === 1000) {
          message.success('创建成功');
          this.handleModalVisible();
        } else {
          message.error(res.msg);
        }
        this.handleGetList();
      },
    });
  };

  //调用更新接口
  handleUpdate = fields => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    
    dispatch({
      type: 'upload/update',
      payload: {
        id: fields.id,
        body: {
          datasetTypeId: fields.datasetTypeId,
          requestColumName: fields.requestColumName,
          requestColumDataType: fields.requestColumDataType,
          responseColumName: fields.responseColumName,
          responseColumDataType: fields.responseColumDataType,
        },
      },
      callback: (res) => {
        if (res.code === 1000) {
          message.success('更新成功');
          this.handleUpdateModalVisible();
        } else {
          message.error(res.msg);
        }
        this.handleGetList();
      },
    });
  };

  render() {
    const {
      upload: { data, typeList },
      loading,
    } = this.props;

    //selectRows选中的数据，modalVisible 新建规则的描述，
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
    //调用新建方法
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    //调用更新方法
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };

    return (
      <PageHeaderWrapper title="字段类型">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
                </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button onClick={() => this.handleBatchDelete()}>批量删除</Button>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        {/* 新建窗口 */}
        <CreateForm {...parentMethods} modalVisible={modalVisible} typeList={typeList} />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          // 更新窗口
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
            typeList={typeList}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default UploadTemplateList;