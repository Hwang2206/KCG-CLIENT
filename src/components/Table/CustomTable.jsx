import ReactTableUI from 'react-table-ui'
import { useRef } from 'react'

const CustomTable = ({ title, columns, data, handleUpdate, handleDelete }) => {
  const tableInstanceRef = useRef(null)
  const singleRowActions = [
    {
      id: 'update',
      onClick: (row) => handleUpdate(row),
      children: <div>📝 Cập nhật</div>
    },
    {
      id: 'delete',
      onClick: (row) => handleDelete(row),
      children: <div>❌ Xoá</div>
    },
  ]

  return (
    <ReactTableUI
    
      actionOptions={{ singleRowActions: singleRowActions }}
      title={title}
      data={data}
      columns={columns}
      tableInstanceRef={tableInstanceRef}
    />
  )
}

export default CustomTable
