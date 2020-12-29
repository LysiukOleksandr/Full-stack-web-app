import React from 'react'
import {Button, Drawer} from "antd";
import './DrawerMenu.css'
import TextEditor from "../TextEditor/TextEditor";

const DrawerMenu = () => {

    const [visible, setVisible] = React.useState(false)

    const onOpen = () => {
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false)
    }


    return(
        <div className='drawer'>
            <Drawer
                title="Menu"
                placement='top'
                closable={false}
                onClose={onClose}
                visible={visible}
                key='top'
            >
                <Button className='drawer__btn-articles'>Show acticles</Button>

                <TextEditor />
            </Drawer>
            <Button className='drawer__btn' onClick={onOpen}>
                Menu
            </Button>
        </div>
    )
}

export default DrawerMenu