import * as React from 'react'
import { Layout } from '@stardust-ui/react'
import { IChat } from './services'

import ChatPaneHeader from './chatPaneHeader'
import ChatPaneVirtualizedListContainer from './chatPaneVirtualizedContent'
import ComposeMessage from './composeMessage'

export interface IChatPaneLayoutProps {
  chat: IChat
}

const ChatPaneVirtualizedListLayout: React.SFC<IChatPaneLayoutProps> = ({
  chat,
}: IChatPaneLayoutProps) => (
  <Layout
    vertical
    start={<ChatPaneHeader chat={chat} />}
    main={<ChatPaneVirtualizedListContainer chat={chat} />}
    end={<ComposeMessage />}
    styles={{
      backgroundColor: '#f3f2f1',
      left: 0,
      paddingLeft: '250px',
      width: '100%',
      height: '100%',
      position: 'fixed',
    }}
  />
)

export default ChatPaneVirtualizedListLayout
