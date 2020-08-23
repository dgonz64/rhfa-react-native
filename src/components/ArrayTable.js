import React from 'react'
// import { renderLectures } from './renderLectures'

const { Column, Table, Cell } = {}

import { trField } from 'react-hook-form-auto'

const renderColumns = ({ items, subType, fieldNames }) => {
  const someItem = items[0]

  const createCellRenderer = (column, colIdx) => rowIdx => {
    return (
      <Cell key={column}>
        {items[rowIdx].inputs[colIdx]}
      </Cell>
    )
  }

  return fieldNames.map((columnName, colIdx) => {
    const displayName = trField(subType, columnName)

    return (
      <Column
        key={columnName}
        name={displayName}
        cellRenderer={createCellRenderer(columnName, colIdx)}
      />
    )
  })
}

export const ArrayTable = ({ items, schema }) => {
  const subType = schema.getType()
  const schemaDef = schema.getSchema()
  const fieldNames = Object.keys(schemaDef)

  if (items.length > 0) {
    const renderRemove = rowIdx => {
      const { idx, closeButton } = items[rowIdx]

      return (
        <Cell key="remove">
          {closeButton}
        </Cell>
      )
    }

    console.log("ITEMS", items)

    return (
      <>
        {/* renderLectures(props) */}
        <Table numRows={items.length} defaultRowHeight={31}>
          {renderColumns({ items, subType, fieldNames })}
          <Column
            key="remove"
            name=""
            cellRenderer={renderRemove}
          />
        </Table>
      </>
    )
  } else
    return null
}
