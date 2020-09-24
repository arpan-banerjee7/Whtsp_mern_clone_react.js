import React from 'react'
import "./Sidebar.css";
import DonutLarge from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from "@material-ui/icons/Chat";
import SearchOutlined from "@material-ui/icons/SearchOutlined"
import SidebarChat from './SidebarChat';

function Sidebar() {
    return (
        <div 
        className ="sidebar">
            <div className="sidebar__header">
            <Avatar src ="https://cdn.pixabay.com/photo/2016/04/01/10/04/amusing-1299757_960_720.png" />
                <div className="sidebar__headerRight">
                    <IconButton>
                         <DonutLarge />
                    </IconButton>
                    <IconButton>
                         <ChatIcon />
                    </IconButton>
                    <IconButton>
                         <MoreVertIcon />
                    </IconButton>
                    
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text"/> 
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar
