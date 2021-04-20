import React from 'react'
import { connect } from 'react-redux'
import { Button, Pagination } from '@icedesign/base'
import { Table, Modal } from 'antd'
import { DETAIL, UPDATE } from './../../constants'
import { timeToMoment } from './../../constants/timeFormat'
import {
  saveCreate,
  del,
  saveCreateParams,
  getTableList,
} from './../../model/action'
import './index.less'

const { confirm } = Modal
const pageSizeList = [10, 20, 30, 40, 50, 100]
const DEFAULT_PAGE = 1

class Tables extends React.PureComponent {
  state = {
    columns: [
      {
        title: 'UID',
        dataIndex: 'uid',
        key: 'uid',
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        width: 300,
        render: (...args) => {
          const [text, record, index] = args
          return (
            <div className="operate">
              <Button
                className="ml10"
                type="primary"
                onClick={() => this.handelDetail(record)}
              >
                查看
              </Button>
              <Button
                className="ml10"
                type="primary"
                onClick={() => this.handelUpdate(record)}
              >
                修改
              </Button>
              <Button
                className="ml10"
                type="secondary"
                onClick={() => this.handelDelete(record)}
              >
                删除
              </Button>
            </div>
          )
        },
      },
    ],
  }

  handelUpdate = rows => {
    const { dispatch } = this.props
    const { date, form2 } = rows
    const params = {
      ...rows,
      date: timeToMoment(date),
      form2: form2.split(','),
    }
    dispatch(saveCreateParams(params))
    dispatch(saveCreate({ show: true, title: '修改', type: UPDATE }))
  }

  handelDelete = rows => {
    confirm({
      title: '确认删除？',
      onOk: () => {
        const { dispatch } = this.props
        const param = {
          id: rows.id,
        }
        dispatch(del(param))
      },
      onCancel: () => {
        console.log('取消')
      },
    })
  }

  handelDetail = rows => {
    const { dispatch } = this.props
    const { date, form2 } = rows
    const params = {
      ...rows,
      date: timeToMoment(date),
      form2: form2.split(','),
    }
    dispatch(saveCreateParams(params))
    dispatch(saveCreate({ show: true, title: '详情', type: DETAIL }))
  }

  handlePageChange = page => {
    const { dispatch } = this.props
    const params = {
      page,
    }
    dispatch(getTableList(params))
  }

  handleSizeChange = size => {
    const { dispatch } = this.props
    const params = {
      page: DEFAULT_PAGE,
      size,
    }
    dispatch(getTableList(params))
  }

  render () {
    const { columns } = this.state
    const { store } = this.props
    const {
      table: { data, total },
      searchParams: { page, size },
    } = store
    return (
      <div className="table-root">
        <Table
          dataSource={data}
          columns={columns}
          bordered
          rowKey={record => record.id}
          pagination={false}
        />

        <div style={styles.pageWrap}>
          <span style={styles.total}>{`共 ${total} 条`}</span>
          <Pagination
            style={styles.pagination}
            current={page}
            pageSize={size}
            total={total}
            pageSizeList={pageSizeList}
            pageSizeSelector="dropdown"
            onChange={this.handlePageChange}
            onPageSizeChange={this.handleSizeChange}
          />
        </div>
      </div>
    )
  }
}

export default connect(stores => ({
  store: stores.material,
}))(Tables)

const styles = {
  pagination: {
    display: 'inline-block',
    marginLeft: '15px'
  },
  pageWrap: {
    margin: '20px 0',
    textAlign: 'center',
  },
  total: {
    display: 'inline-block',
    verticalAlign: 'top',
    color: '#999',
    fontSize: '14px',
    lineHeight: '26px',
  },
}
