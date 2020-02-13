import { Accordion, gridCellBehavior, gridRowBehavior, Table } from '@fluentui/react'
import * as React from 'react'
import { AutoSizer, List as ReactVirtualizedList, WindowScroller } from 'react-virtualized'
import getItems from './itemsGenerator'

const scrollbarOffset = 10
function VirtualizedTablesPrototype() {
  const [ref, setRef] = React.useState(null)

  const tables = [
    {
      key: 'table1',
      title: <div>Table one</div>,
      content: <VirtualizedTable scrollElementRef={ref} />,
    },
    {
      key: 'table2',
      title: <div>Custom table title</div>,
      content: <VirtualizedTable scrollElementRef={ref} />,
    },
  ]

  return (
    <div id="scrollParent" style={{ height: '700px', overflowY: 'auto' }} ref={setRef}>
      {ref != null ? <Accordion panels={tables} /> : null}
    </div>
  )
}

interface VirtualizedTableProps {
  scrollElementRef: React.RefObject<HTMLDivElement>
}

function VirtualizedTable(props: VirtualizedTableProps) {
  const { header, rows } = getItems(20, 50)
  const renderedItems = [header, ...rows]

  const accessibilityListProperties = {
    'aria-label': '',
    'aria-readonly': undefined,
    containerRole: 'presentation',
    role: 'presentation',
    tabIndex: null,
  }

  const rowGetter = ({ index }) => {
    return renderedItems[index]
  }

  const rowRenderer = ({ index, style }) => {
    const row = renderedItems[index]
    const topOffset = `${style.top}px`
    const leftOffset = `${style.left}px`
    const height = `${style.height}px`
    return (
      <Table.Row
        design={{
          top: topOffset,
          left: leftOffset,
          width: style.width,
          height,
          position: style.position,
        }}
        key={row.key}
        accessibility={gridRowBehavior}
      >
        <Table.Cell {...row.items[0]} accessibility={gridCellBehavior} />
        <Table.Cell {...row.items[1]} accessibility={gridCellBehavior} />
        <Table.Cell {...row.items[2]} accessibility={gridCellBehavior} />
        <Table.Cell {...row.items[3]} accessibility={gridCellBehavior} />
      </Table.Row>
    )
  }

  return (
    <Table>
      <WindowScroller scrollElement={props.scrollElementRef} key={props.scrollElementRef}>
        {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
          <AutoSizer disableHeight>
            {({ width }) => {
              return height ? (
                <div ref={el => registerChild(el)}>
                  <ReactVirtualizedList
                    autoHeight
                    disableHeader={true}
                    height={height}
                    rowCount={renderedItems.length}
                    width={width - scrollbarOffset}
                    onScroll={onChildScroll}
                    scrollTop={scrollTop}
                    rowHeight={80}
                    isScrolling={isScrolling}
                    rowGetter={rowGetter}
                    rowRenderer={rowRenderer}
                    overscanRowCount={20}
                    {...accessibilityListProperties}
                  />
                </div>
              ) : null
            }}
          </AutoSizer>
        )}
      </WindowScroller>
    </Table>
  )
}

export default VirtualizedTablesPrototype
