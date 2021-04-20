import React from 'react'
import { connect } from 'react-redux'
import { getTableList } from './model/action'
import Action from './coms/Action'
import Table from './coms/Table'
import Create from './coms/Create'

class Demo extends React.Component {
  componentDidMount () {
    this.getTableList()
  }

  getTableList = () => {
    const { dispatch } = this.props
    dispatch(getTableList())
  }

  render () {
    const { dispatch, store } = this.props
    return (
      <div>
        <Action />
        <Table />
        <Create />
      </div>
    )
  }
}

export default connect(store => ({
  store: store.material,
}))(Demo)
