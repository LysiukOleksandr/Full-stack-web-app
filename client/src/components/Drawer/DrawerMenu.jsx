import React from 'react'
import {Button, Drawer} from "antd";
import './DrawerMenu.css'
import ModalWindow from "../Modal/Modal";

const DrawerMenu = () => {

    const [visible, setVisible] = React.useState(false)

    const onOpen = () => {
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false)
    }


    return (
        <div className='drawer'>
            <Drawer
                title="Menu"
                placement='top'
                closable={false}
                onClose={onClose}
                visible={visible}
                key='top'
                height={140}
            >
                <ModalWindow/>
            </Drawer>
            <Button className='drawer__btn' onClick={onOpen}>
                Menu
            </Button>
        </div>
    )
}

export default DrawerMenu